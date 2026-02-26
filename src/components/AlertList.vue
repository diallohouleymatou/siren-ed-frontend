<template>
  <div class="alert-list">
    <AlertItem
      v-for="a in alerts"
      :key="a.id"
      :alert="a"
      @select="$emit('select', $event)"
    />
    <div v-if="alerts.length === 0" class="empty-state">
      <div class="icon">📭</div>
      <p>Aucune alerte disponible</p>
    </div>
  </div>
</template>

<script setup>
import AlertItem from './AlertItem.vue'

defineProps({
  alerts: { type: Array, default: () => [] },
})
</script>
