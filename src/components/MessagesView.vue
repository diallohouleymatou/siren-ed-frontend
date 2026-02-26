<template>
  <div class="view active" id="view-messages">
    <div class="page-header">
      <div>
        <div class="page-title">💬 Messagerie directe</div>
        <div class="page-sub">Communication sécurisée Ministre ↔ IA/IEF</div>
      </div>
      <button class="btn btn-primary btn-sm">+ Nouveau message</button>
    </div>

    <div class="card" style="padding:0;overflow:hidden;">
      <div class="msg-layout">
        <div class="msg-list-panel">
          <div style="padding:12px 16px;border-bottom:1px solid var(--border);">
            <input class="form-input" style="width:100%;padding:8px 12px;font-size:12px" placeholder="🔍 Rechercher...">
          </div>
          <div>
            <div
              v-for="c in contacts"
              :key="c.id"
              class="msg-item"
              :class="{ active: c.id === currentContact }"
              @click="selectContact(c.id)"
            >
              <div style="display:flex;gap:10px;align-items:flex-start">
                <div
                  style="width:34px;height:34px;background:linear-gradient(135deg,#0044aa,#002266);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;"
                  :style="{ border: '2px solid ' + (c.online ? 'var(--green)' : 'var(--border)') }"
                >{{ c.id <= 3 ? '🏛️' : '📋' }}</div>
                <div style="flex:1;min-width:0">
                  <div class="msg-item-name">{{ c.name }}</div>
                  <div class="msg-item-preview">{{ c.preview }}</div>
                  <div class="msg-item-time" style="margin-top:2px">{{ c.online ? 'En ligne' : 'Hors ligne' }}</div>
                </div>
              </div>
              <div v-if="c.unread > 0" class="msg-unread">{{ c.unread }}</div>
            </div>
          </div>
        </div>

        <div class="msg-chat-panel">
          <div class="msg-chat-header">
            <div style="width:36px;height:36px;background:linear-gradient(135deg,#0044aa,#002266);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;">🏛️</div>
            <div>
              <div style="font-size:14px;font-weight:600">{{ currentContactName }}</div>
              <div class="status-dot online" style="font-size:11px;color:var(--green)">En ligne</div>
            </div>
            <div style="margin-left:auto;display:flex;gap:8px">
              <button class="btn btn-outline btn-sm">📞 Appel</button>
              <button class="btn btn-danger btn-sm">🚨 Urgence</button>
            </div>
          </div>

          <div class="msg-chat-body">
            <div v-for="(m, idx) in currentMessages" :key="idx">
              <div class="msg-bubble" :class="m.sent ? 'sent' : 'received'">{{ m.text }}</div>
              <div class="msg-bubble-meta" :style="m.sent ? 'text-align:right' : ''">{{ m.from }} · {{ m.time }}</div>
            </div>
          </div>

          <div class="msg-input-row">
            <input class="msg-input" v-model="draft" placeholder="Écrire un message au terrain..." @keydown.enter="sendMessage">
            <button class="btn btn-primary" @click="sendMessage">Envoyer ↑</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

defineProps({})

const contacts = ref([
  { id: 1, name: 'IA de Dakar', sub: 'M. Abdoulaye Diallo', unread: 2, online: true, preview: 'La situation au lycée est stabilisée...' },
  { id: 2, name: 'IA de Thiès', sub: 'Mme Fatou Sall', unread: 1, online: true, preview: 'Rapport d\'avancement transmis' },
  { id: 3, name: 'IA de Kaolack', sub: 'Mme Rokhaya Dieng', unread: 2, online: false, preview: 'En attente de votre réponse...' },
  { id: 4, name: 'IEF Dakar-Plateau', sub: 'Mme Astou Diagne', unread: 0, online: true, preview: 'Le SAMU est arrivé, situation sous contrôle' },
  { id: 5, name: 'IEF Pikine', sub: 'M. Babacar Fall', unread: 0, online: true, preview: 'Bonsoir Monsieur le Ministre...' },
])

const messages = ref({
  1: [
    { from: 'IA de Dakar', text: 'Monsieur le Ministre, je vous informe que la situation au Lycée Blaise Diagne est en cours de stabilisation.', time: '08:18', sent: false },
    { from: 'Ministre', text: 'Bien reçu. Quelle est l\'état de santé de l\'élève ?', time: '08:22', sent: true },
    { from: 'IA de Dakar', text: 'L\'élève a été transporté au CHU A. Le Diop. Son état est sérieux mais stable.', time: '08:25', sent: false },
  ],
  2: [
    { from: 'IA de Thiès', text: 'Bonjour Monsieur le Ministre. Suite à la grève, nous avons mobilisé les enseignants non-grévistes.', time: '09:15', sent: false },
    { from: 'Ministre', text: 'Bien. Assurez-vous que les élèves de Terminale ne soient pas pénalisés.', time: '09:18', sent: true },
  ],
  3: [
    { from: 'IA de Kaolack', text: 'Concernant l\'épidémie présumée, nous avons contacté le médecin-chef.', time: '09:05', sent: false },
  ],
})

const currentContact = ref(1)
const draft = ref('')

const currentContactName = computed(() => {
  const c = contacts.value.find(x => x.id === currentContact.value)
  return c ? c.name : 'Contact'
})

const currentMessages = computed(() => messages.value[currentContact.value] || [])

function selectContact(id) {
  currentContact.value = id
}

function sendMessage() {
  if (!draft.value.trim()) return
  const now = new Date()
  const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0')
  if (!messages.value[currentContact.value]) messages.value[currentContact.value] = []
  messages.value[currentContact.value].push({ from: 'Ministre', text: draft.value, time, sent: true })
  draft.value = ''
}
</script>
