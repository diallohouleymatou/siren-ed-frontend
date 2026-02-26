<template>
  <div class="toast-container">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="toast"
      :class="t.type"
      @click="remove(t.id)"
    >
      <div class="toast-icon">{{ iconFor(t.type) }}</div>
      <div class="toast-body">
        <div class="toast-title">{{ t.title }}</div>
        <div class="toast-msg">{{ t.message }}</div>
        <div class="toast-time">{{ t.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toasts: { type: Array, default: () => [] },
})

const emit = defineEmits(['remove'])

function remove(id) {
  emit('remove', id)
}

function iconFor(type) {
  if (type === 'critical') return '🚨'
  if (type === 'alert') return '⚠️'
  if (type === 'success') return '✅'
  return 'ℹ️'
}
</script>
