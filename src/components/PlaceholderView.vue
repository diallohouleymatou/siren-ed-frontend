<template>
  <div class="view" :class="{ active: active }" :id="`view-${id}`">
    <div class="card">
      <div class="card-header">
        <div class="card-title">{{ title }}</div>
      </div>
      <div class="empty-state">
        <div class="icon">⚙️</div>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, default: 'En cours de préparation.' },
  active: { type: Boolean, default: false },
})
</script>
