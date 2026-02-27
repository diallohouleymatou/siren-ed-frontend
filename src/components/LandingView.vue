<template>
  <div class="landing-wrapper">
    <div class="landing-card">
      <div class="landing-brand">SIREN-ED</div>
      <div class="landing-title">Plateforme nationale de signalement et de suivi</div>
      <div class="landing-sub">Ministere de l'Education - Republique du Senegal</div>

      <div class="landing-actions">
        <RouterLink to="/signaler" class="btn btn-danger landing-btn">Faire un signalement</RouterLink>
        <RouterLink to="/app/dashboard" class="btn btn-primary landing-btn">Espace interne</RouterLink>
      </div>

      <div class="landing-note">
        Le portail public permet de soumettre un signalement. L'espace interne est reserve aux services autorises.
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: radial-gradient(circle at 10% 0%, rgba(32, 136, 232, .2), transparent 40%), var(--bg-deep);
}

.landing-card {
  width: 100%;
  max-width: 760px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 36px;
}

.landing-brand {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
}

.landing-title {
  font-size: 18px;
  font-weight: 700;
}

.landing-sub {
  margin-top: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.landing-actions {
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.landing-btn {
  text-decoration: none;
}

.landing-note {
  margin-top: 18px;
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .landing-card {
    padding: 24px;
  }

  .landing-actions {
    flex-direction: column;
  }
}
</style>
