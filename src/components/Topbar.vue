<template>
  <header class="topbar">
    <button class="menu-btn" type="button" @click="$emit('toggle-menu')">
      ☰
    </button>
    <div class="topbar-brand">
      <div class="brand-icon">🛡️</div>
      <div class="brand-text">
        <div class="brand-name">SIREN-ED</div>
        <div class="brand-sub">Ministère Éducation Nationale · Sénégal</div>
      </div>
    </div>

    <div class="topbar-live">
      <div class="live-dot"></div>
      <div class="live-text">Surveillance active</div>
    </div>

    <div class="topbar-stats">
      <div class="tstat">
        <div class="tstat-val" style="color:var(--red)">{{ stats.critical }}</div>
        <div class="tstat-lbl">Critiques</div>
      </div>
      <div class="tstat">
        <div class="tstat-val" style="color:var(--orange)">{{ stats.alert }}</div>
        <div class="tstat-lbl">Alertes</div>
      </div>
      <div class="tstat">
        <div class="tstat-val" style="color:var(--yellow)">{{ stats.pending }}</div>
        <div class="tstat-lbl">En attente</div>
      </div>
      <div class="tstat">
        <div class="tstat-val" style="color:var(--green)">{{ stats.total }}</div>
        <div class="tstat-lbl">Total aujourd'hui</div>
      </div>
    </div>

    <div class="topbar-right">
      <div class="topbar-time">{{ time }}</div>
      <div class="minister-badge">
        <div class="minister-avatar">🎖️</div>
        <div class="minister-info">
          <div class="minister-name">S.E. Ministre</div>
          <div class="minister-role">Accès Niveau 1 — Confidentiel</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  time: { type: String, default: '--:--:--' },
  stats: {
    type: Object,
    default: () => ({ critical: 0, alert: 0, pending: 0, total: 0 }),
  },
})
</script>
