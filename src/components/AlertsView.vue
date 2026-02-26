<template>
  <div class="view active" id="view-alerts">
    <div class="page-header">
      <div>
        <div class="page-title">🚨 Flux d'alertes en temps réel</div>
        <div class="page-sub">Toutes les remontées du terrain — Classées par priorité</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <select class="form-select" style="width:auto;padding:8px 12px" v-model="severity">
          <option value="all">Tous les niveaux</option>
          <option value="critical">🔴 Critique uniquement</option>
          <option value="alert">🟠 Alerte</option>
          <option value="warning">🟡 Signalement</option>
          <option value="info">🟢 Information</option>
        </select>
        <select class="form-select" style="width:auto;padding:8px 12px" v-model="academy">
          <option value="all">Toutes académies</option>
          <option>Dakar</option>
          <option>Thiès</option>
          <option>Saint-Louis</option>
          <option>Kaolack</option>
          <option>Ziguinchor</option>
          <option>Diourbel</option>
          <option>Tambacounda</option>
          <option>Louga</option>
          <option>Kolda</option>
          <option>Fatick</option>
          <option>Matam</option>
          <option>Kaffrine</option>
          <option>Kédougou</option>
          <option>Sédhiou</option>
        </select>
      </div>
    </div>

    <div class="card">
      <AlertList :alerts="filtered" @select="$emit('select-alert', $event)" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AlertList from './AlertList.vue'

const props = defineProps({
  alerts: { type: Array, default: () => [] },
})

const severity = ref('all')
const academy = ref('all')

const filtered = computed(() => {
  return props.alerts.filter(a => {
    const sevOk = severity.value === 'all' || a.severity === severity.value
    const acadOk = academy.value === 'all' || (a.academy || '').toLowerCase() === academy.value.toLowerCase()
    return sevOk && acadOk
  })
})
</script>
