<template>
  <div class="modal-overlay" :class="{ open: open }" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title">{{ alertTitle }}</span>
        <button class="modal-close" @click="close">✕</button>
      </div>
      <div v-if="alert">
        <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
          <span class="chip" :class="severityChip">{{ alert.label }}</span>
          <span class="chip blue">{{ alert.category }}</span>
          <span v-if="alert.people && alert.people > 0" class="chip orange">👥 {{ alert.people }} personnes</span>
          <span class="chip" :class="statusChip">{{ statusLabel }}</span>
        </div>
        <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:16px">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Description</div>
          <p style="font-size:13px;line-height:1.7;color:var(--text-prime)">{{ alert.description }}</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
          <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">LOCALISATION</div><div style="font-size:13px">📍 {{ alert.location }}</div></div>
          <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">IEF CONCERNÉE</div><div style="font-size:13px">🏛️ {{ alert.ief }}</div></div>
          <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">HEURE</div><div style="font-size:13px;font-family:var(--mono)">{{ alert.time }}</div></div>
          <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:8px;padding:12px"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">CATÉGORIE</div><div style="font-size:13px">{{ alert.category }}</div></div>
        </div>
        <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:16px">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Mesures déjà prises</div>
          <div v-for="(ac, idx) in alert.actions" :key="idx" style="display:flex;gap:8px;align-items:center;font-size:13px;padding:6px 0;border-bottom:1px solid var(--border)">
            <span style="color:var(--green)">✓</span>{{ ac }}
          </div>
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;padding-top:4px">
          <button class="btn btn-outline btn-sm" @click="close">Fermer</button>
          <button class="btn btn-primary btn-sm" @click="$emit('mark-resolved', alert)">✓ Marquer traité</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  alert: { type: Object, default: null },
})

const emit = defineEmits(['close', 'mark-resolved'])

function close() {
  emit('close')
}

const alertTitle = computed(() => props.alert ? `${props.alert.icon || ''} ${props.alert.title}`.trim() : 'Détail de l\'alerte')

const severityChip = computed(() => {
  if (!props.alert) return 'red'
  if (props.alert.severity === 'critical') return 'red'
  if (props.alert.severity === 'alert') return 'orange'
  if (props.alert.severity === 'warning') return 'yellow'
  return 'green'
})

const statusChip = computed(() => {
  if (!props.alert) return 'yellow'
  if (props.alert.status === 'new') return 'red'
  if (props.alert.status === 'in_progress') return 'orange'
  if (props.alert.status === 'resolved') return 'green'
  return 'yellow'
})

const statusLabel = computed(() => {
  if (!props.alert) return ''
  if (props.alert.status === 'new') return 'Nouveau'
  if (props.alert.status === 'in_progress') return 'En cours'
  if (props.alert.status === 'resolved') return 'Traité'
  return props.alert.status
})
</script>
