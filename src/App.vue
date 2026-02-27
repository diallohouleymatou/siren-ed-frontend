<template>
  <ToastContainer :toasts="toasts" @remove="removeToast" />
  <AlertModal
    :open="modalOpen"
    :alert="selectedAlert"
    :updating="statusUpdating"
    :feedback-message="statusFeedbackMessage"
    :feedback-type="statusFeedbackType"
    @close="modalOpen = false"
    @mark-resolved="markResolved"
  />

  <div v-if="isLandingRoute">
    <RouterView />
  </div>

  <div v-else-if="isPublicRoute" class="public-layout">
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        @submit-public="submitPublicReport"
      />
    </RouterView>
  </div>

  <div v-else class="app-shell">
    <Topbar :time="clock" :stats="stats" @toggle-menu="toggleSidebar" />
    <div class="sidebar-overlay" :class="{ open: isSidebarOpen }" @click="closeSidebar"></div>
    <div class="sidebar-wrap" :class="{ open: isSidebarOpen }">
      <Sidebar @navigate="closeSidebar" />
    </div>

    <main class="main">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :alerts="alerts"
          :stats="kpi"
          :date-label="dateLabel"
          @select-alert="openAlert"
          @simulate="simulateAlert"
          @go-report="goReport"
          @go-alerts="goAlerts"
          @submit="submitReport"
        />
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'
import AlertModal from './components/AlertModal.vue'
import ToastContainer from './components/ToastContainer.vue'
import { api } from './services/api'
import { mockAlerts } from './data/mock'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(false)
const alerts = ref([])
const selectedAlert = ref(null)
const modalOpen = ref(false)
const statusUpdating = ref(false)
const statusFeedbackMessage = ref('')
const statusFeedbackType = ref('')
const clock = ref('--:--:--')
const dateLabel = ref('')
const toasts = ref([])
const isPublicRoute = computed(() => !!route.meta.public)
const isLandingRoute = computed(() => !!route.meta.landing)
const isInternalRoute = computed(() => !!route.meta.internal)

const stats = computed(() => {
  const critical = alerts.value.filter(a => a.severity === 'critical').length
  const alert = alerts.value.filter(a => a.severity === 'alert').length
  const pending = alerts.value.filter(a => ['new', 'in_progress', 'escalade', 'suivi', 'signale', 'en_attente'].includes(a.status)).length
  const total = alerts.value.length
  return { critical, alert, pending, total }
})

const kpi = computed(() => {
  const resolved = alerts.value.filter(a => ['traite', 'archive'].includes(a.status)).length
  return { ...stats.value, resolved }
})

function addToast(type, title, message) {
  const id = Date.now() + Math.random()
  const time = new Date().toLocaleTimeString('fr-FR')
  toasts.value.push({ id, type, title, message, time })
  setTimeout(() => removeToast(id), 5500)
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function goReport() {
  router.push('/app/report')
}

function goAlerts() {
  router.push('/app/alerts')
}

function removeToast(id) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

function openAlert(alert) {
  selectedAlert.value = alert
  modalOpen.value = true
  statusFeedbackMessage.value = ''
  statusFeedbackType.value = ''
}

async function loadAlerts() {
  try {
    const res = await api.listAlerts()
    const items = Array.isArray(res) ? res : []
    alerts.value = items.map(mapAlert)
  } catch (err) {
    alerts.value = mockAlerts
    addToast('alert', 'Mode hors API', 'Données locales chargées pour le design.')
  }
}

function mapAlert(a) {
  const severity = mapBackendSeverity(a.niveau_gravite)
  const status = mapBackendStatus(a.statut)
  return {
    id: a.idAlert,
    title: a.title || (a.description ? a.description.slice(0, 90) : 'Signalement'),
    severity,
    label: severity === 'critical' ? 'CRITIQUE' : severity === 'alert' ? 'ALERTE' : severity === 'warning' ? 'SIGNALEMENT' : 'INFORMATION',
    category: a.categorie,
    status,
    academy: a.academie,
    ief: a.ief_concerne,
    location: a.etablissement || '—',
    time: (a.date_evenement || '').toString().slice(11,16) || '--:--',
    time_ago: 'À l\'instant',
    people: Number(a.personne_affecte) || 0,
    description: a.description || '',
    actions: a.mesure_prise ? [a.mesure_prise] : [],
    icon: severity === 'critical' ? '🔴' : severity === 'alert' ? '🟠' : severity === 'warning' ? '🟡' : '🟢',
  }
}

function mapBackendSeverity(value) {
  const v = (value || '').toString().toLowerCase()
  if (v.includes('crit')) return 'critical'
  if (v.includes('aler')) return 'alert'
  if (v.includes('warn') || v.includes('sign')) return 'warning'
  return 'info'
}

function mapBackendStatus(value) {
  const map = {
    0: 'new',
    1: 'in_progress',
    2: 'escalade',
    3: 'suivi',
    4: 'signale',
    5: 'traite',
    6: 'en_attente',
    7: 'archive',
  }
  if (typeof value === 'string') {
    const v = value.toLowerCase()
    if (v.includes('nouveau')) return 'new'
    if (v.includes('encours') || v.includes('en cours')) return 'in_progress'
    if (v.includes('escalade')) return 'escalade'
    if (v.includes('suivi')) return 'suivi'
    if (v.includes('signale')) return 'signale'
    if (v.includes('traite')) return 'traite'
    if (v.includes('attente')) return 'en_attente'
    if (v.includes('archive')) return 'archive'
  }
  return map[value] || 'new'
}

async function submitReport(payload) {
  try {
    const apiPayload = {
      description: payload.description,
      niveau_gravite: payload.severity === 'critical'
        ? 'Critique'
        : payload.severity === 'alert'
          ? 'Alerte'
          : payload.severity === 'warning'
            ? 'Signalement'
            : 'Information',
      categorie: payload.category,
      niveau_declarant: payload.reporter_level,
      academie: payload.academy,
      ief_concerne: payload.ief,
      etablissement: payload.establishment,
      date_evenement: new Date(payload.event_datetime).toISOString(),
      personne_affecte: String(payload.people_affected || 0),
      mesure_prise: payload.actions || '',
      appui_requis_niveau_central: payload.support || '',
      contact_declarant: payload.contact,
    }
    const created = await api.createAlert(apiPayload)
    alerts.value.unshift(mapAlert(created))
    addToast('critical', 'Signalement transmis', 'Votre signalement a été enregistré.')
    router.push('/app/alerts')
  } catch (err) {
    const message = err instanceof Error ? err.message : "Impossible d'enregistrer le signalement."
    addToast('alert', 'Erreur API', message)
  }
}

async function submitPublicReport(payload, done) {
  try {
    const apiPayload = {
      description: payload.description,
      niveau_gravite: payload.severity === 'critical'
        ? 'Critique'
        : payload.severity === 'alert'
          ? 'Alerte'
          : payload.severity === 'warning'
            ? 'Signalement'
            : 'Information',
      categorie: payload.category,
      niveau_declarant: payload.reporter_name ? `Public - ${payload.reporter_name}` : 'Public',
      academie: payload.academy,
      ief_concerne: payload.ief,
      etablissement: payload.establishment,
      date_evenement: new Date(payload.event_datetime).toISOString(),
      personne_affecte: String(payload.people_affected || 0),
      mesure_prise: payload.actions || '',
      appui_requis_niveau_central: 'A qualifier',
      contact_declarant: payload.contact,
    }
    const created = await api.createPublicAlert(apiPayload)
    addToast('success', 'Signalement recu', 'Votre signalement a ete transmis aux services competents.')
    if (typeof done === 'function') {
      const ref = created?.idAlert ? `Reference #${created.idAlert}` : 'Merci. Votre signalement a ete enregistre.'
      done(true, ref)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Impossible de transmettre le signalement pour le moment.'
    addToast('alert', 'Envoi impossible', message)
    if (typeof done === 'function') done(false, message)
  }
}

async function markResolved(alert) {
  statusUpdating.value = true
  statusFeedbackMessage.value = ''
  statusFeedbackType.value = ''
  try {
    await api.updateAlertStatus(alert.id, 5)
    const idx = alerts.value.findIndex(a => a.id === alert.id)
    if (idx >= 0) alerts.value[idx].status = 'traite'
    if (selectedAlert.value && selectedAlert.value.id === alert.id) {
      selectedAlert.value.status = 'traite'
    }
    statusFeedbackMessage.value = 'Statut mis a jour avec succes.'
    statusFeedbackType.value = 'success'
    addToast('success', 'Statut mis à jour', 'Signalement marqué traité.')
  } catch (err) {
    statusFeedbackMessage.value = 'Echec de mise a jour du statut.'
    statusFeedbackType.value = 'error'
    const message = err instanceof Error ? err.message : "Impossible de mettre à jour le statut."
    addToast('alert', 'Erreur API', message)
  } finally {
    statusUpdating.value = false
  }
}

function simulateAlert() {
  const simulated = {
    id: Date.now(),
    title: 'Intoxication alimentaire — 8 élèves hospitalisés',
    severity: 'critical',
    label: 'CRITIQUE',
    category: 'Santé',
    status: 'new',
    academy: 'Dakar',
    ief: 'IEF Dakar-Nord',
    location: 'École Primaire Grand-Yoff, Dakar',
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    time_ago: "À l'instant",
    people: 8,
    description: 'Huit élèves ont été hospitalisés après avoir consommé des repas de la cantine.',
    actions: ['SAMU alerté', 'Parents contactés'],
    icon: '🔴',
  }
  alerts.value.unshift(simulated)
  addToast('critical', 'Nouvelle alerte', simulated.title)
}

function updateClock() {
  const now = new Date()
  clock.value = now.toLocaleTimeString('fr-FR')
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  dateLabel.value = now.toLocaleDateString('fr-FR', opts)
}

onMounted(() => {
  updateClock()
  setInterval(updateClock, 1000)
  if (isInternalRoute.value) {
    loadAlerts()
    setTimeout(() => addToast('info', 'SIREN-ED opérationnel', 'Surveillance active — 1847 établissements connectés'), 1500)
  }
})

watch(isInternalRoute, (isInternal) => {
  if (isInternal && alerts.value.length === 0) {
    loadAlerts()
  }
})
</script>
