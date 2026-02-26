<template>
  <nav class="sidebar">
    <div class="nav-section">
      <div class="nav-label">Tableau de bord</div>
      <RouterLink to="/" class="nav-item" :class="{ active: isActive('dashboard') }" @click="notify">
        <div class="nav-icon">📊</div>
        <div class="nav-text">Vue d'ensemble</div>
      </RouterLink>
      <RouterLink to="/map" class="nav-item" :class="{ active: isActive('map') }" @click="notify">
        <div class="nav-icon">🗺️</div>
        <div class="nav-text">Carte des événements</div>
        <div class="nav-badge">10</div>
      </RouterLink>
    </div>

    <div class="nav-section">
      <div class="nav-label">Alertes & Événements</div>
      <RouterLink to="/alerts" class="nav-item" :class="{ active: isActive('alerts') }" @click="notify">
        <div class="nav-icon">🚨</div>
        <div class="nav-text">Flux d'alertes</div>
        <div class="nav-badge">3</div>
      </RouterLink>
      <RouterLink to="/report" class="nav-item" :class="{ active: isActive('report') }" @click="notify">
        <div class="nav-icon">📝</div>
        <div class="nav-text">Signaler un événement</div>
      </RouterLink>
    </div>

    <div class="nav-section">
      <div class="nav-label">Communication</div>
      <RouterLink to="/messages" class="nav-item" :class="{ active: isActive('messages') }" @click="notify">
        <div class="nav-icon">💬</div>
        <div class="nav-text">Messagerie directe</div>
        <div class="nav-badge orange">5</div>
      </RouterLink>
      <RouterLink to="/broadcast" class="nav-item" :class="{ active: isActive('broadcast') }" @click="notify">
        <div class="nav-icon">📢</div>
        <div class="nav-text">Diffusion circulaire</div>
      </RouterLink>
    </div>

    <div class="nav-section">
      <div class="nav-label">Suivi & Contrôle</div>
      <RouterLink to="/performance" class="nav-item" :class="{ active: isActive('performance') }" @click="notify">
        <div class="nav-icon">📈</div>
        <div class="nav-text">Performance IA/IEF</div>
      </RouterLink>
      <RouterLink to="/analytics" class="nav-item" :class="{ active: isActive('analytics') }" @click="notify">
        <div class="nav-icon">🔬</div>
        <div class="nav-text">Analyses & Tendances</div>
      </RouterLink>
    </div>

    <div class="nav-section">
      <div class="nav-label">Administration</div>
      <RouterLink to="/settings" class="nav-item" :class="{ active: isActive('settings') }" @click="notify">
        <div class="nav-icon">⚙️</div>
        <div class="nav-text">Paramètres système</div>
      </RouterLink>
    </div>

    <div class="sidebar-footer">
      <div class="senegal-flag">
        <div class="flag-bar" style="background:#00853F"></div>
        <div class="flag-bar" style="background:#FDEF42; display:flex;align-items:center;justify-content:center;font-size:10px;">★</div>
        <div class="flag-bar" style="background:#E31B23"></div>
      </div>
      <div style="font-size:10px;color:var(--text-dim);text-align:center">République du Sénégal<br>Un Peuple — Un But — Une Foi</div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const emit = defineEmits(['navigate'])
const route = useRoute()

function isActive(name) {
  return route.name === name
}

function notify() {
  emit('navigate')
}
</script>
