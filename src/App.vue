<template>
  <ToastContainer :toasts="toasts" @remove="removeToast" />
  <AlertModal
    :open="modalOpen"
    :alert="selectedAlert"
    @close="modalOpen = false"
    @mark-resolved="markResolved"
  />

  <div class="app-shell">
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
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'
import AlertModal from './components/AlertModal.vue'
import ToastContainer from './components/ToastContainer.vue'
import { api } from './services/api'
import { mockAlerts } from './data/mock'

const router = useRouter()
const isSidebarOpen = ref(false)
const alerts = ref([])
const selectedAlert = ref(null)
const modalOpen = ref(false)
const clock = ref('--:--:--')
const dateLabel = ref('')
const toasts = ref([])

const stats = computed(() => {
  const critical = alerts.value.filter(a => a.severity === 'critical').length
  const alert = alerts.value.filter(a => a.severity === 'alert').length
  const pending = alerts.value.filter(a => a.status === 'new' || a.status === 'in_progress').length
  const total = alerts.value.length
  return { critical, alert, pending, total }
})

const kpi = computed(() => {
  const resolved = alerts.value.filter(a => a.status === 'resolved').length
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
  router.push('/report')
}

function goAlerts() {
  router.push('/alerts')
}

function removeToast(id) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

function openAlert(alert) {
  selectedAlert.value = alert
  modalOpen.value = true
}

async function loadAlerts() {
  try {
    const res = await api.listAlerts({ page: 1, page_size: 50 })
    const items = res.items || []
    alerts.value = items.map(mapAlert)
  } catch (err) {
    alerts.value = mockAlerts
    addToast('alert', 'Mode hors API', 'Données locales chargées pour le design.')
  }
}

function mapAlert(a) {
  return {
    id: a.id,
    title: a.title,
    severity: a.severity,
    label: a.severity === 'critical' ? 'CRITIQUE' : a.severity === 'alert' ? 'ALERTE' : a.severity === 'warning' ? 'SIGNALEMENT' : 'INFORMATION',
    category: a.category,
    status: a.status,
    academy: a.academy,
    ief: a.ief,
    location: a.establishment || a.location || '—',
    time: (a.event_datetime || '').toString().slice(11,16) || '--:--',
    time_ago: 'À l\'instant',
    people: a.people_affected || a.people || 0,
    description: a.description || '',
    actions: a.actions || [],
    icon: a.severity === 'critical' ? '🔴' : a.severity === 'alert' ? '🟠' : a.severity === 'warning' ? '🟡' : '🟢',
  }
}

async function submitReport(payload) {
  try {
    const apiPayload = {
      title: payload.description?.slice(0, 80) || 'Signalement',
      description: payload.description,
      severity: payload.severity,
      category: payload.category,
      academy: payload.academy,
      ief: payload.ief,
      establishment: payload.establishment,
      event_datetime: new Date(payload.event_datetime).toISOString(),
      people_affected: payload.people_affected || 0,
      contact: payload.contact,
    }
    const created = await api.createAlert(apiPayload)
    alerts.value.unshift(mapAlert(created))
    addToast('critical', 'Signalement transmis', 'Votre signalement a été enregistré.')
    router.push('/alerts')
  } catch (err) {
    addToast('alert', 'Erreur API', "Impossible d'enregistrer le signalement.")
  }
}

async function markResolved(alert) {
  try {
    await api.updateAlertStatus(alert.id, 'resolved')
    const idx = alerts.value.findIndex(a => a.id === alert.id)
    if (idx >= 0) alerts.value[idx].status = 'resolved'
    modalOpen.value = false
    addToast('success', 'Statut mis à jour', 'Signalement marqué traité.')
  } catch (err) {
    addToast('alert', 'Erreur API', "Impossible de mettre à jour le statut.")
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
  loadAlerts()
  setTimeout(() => addToast('info', 'SIREN-ED opérationnel', 'Surveillance active — 1847 établissements connectés'), 1500)
})
</script>
