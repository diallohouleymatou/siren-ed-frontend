<template>
  <div class="alert-item" @click="$emit('select', alert)">
    <div class="alert-severity" :class="`sev-${alert.severity}`"></div>
    <div class="alert-body">
      <div class="alert-title">{{ alert.title }}</div>
      <div class="alert-meta">
        <span>📍 {{ alert.location }}</span>
        <span>📋 {{ alert.category }}</span>
        <span v-if="alert.people && alert.people > 0">👥 {{ alert.people }} pers.</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
      <span class="alert-tag" :class="tagClass">{{ alert.label }}</span>
      <span class="alert-time">{{ alert.time_ago }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  alert: { type: Object, required: true },
})

const tagClass = computed(() => {
  if (props.alert.severity === 'critical') return 'tag-critical'
  if (props.alert.severity === 'alert') return 'tag-alert'
  if (props.alert.severity === 'warning') return 'tag-warning'
  return 'tag-info'
})
</script>
