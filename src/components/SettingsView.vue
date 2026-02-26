<template>
  <div class="view active" id="view-settings">
    <div class="page-header">
      <div><div class="page-title">⚙️ Paramètres système</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">Notifications & Alertes</div></div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:13px;font-weight:600">Alertes push critiques</div>
              <div style="font-size:11px;color:var(--text-muted)">Notification immédiate sur téléphone</div>
            </div>
            <div style="width:44px;height:24px;background:var(--green);border-radius:12px;cursor:pointer;position:relative;">
              <div style="width:18px;height:18px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;"></div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:13px;font-weight:600">SMS de secours</div>
              <div style="font-size:11px;color:var(--text-muted)">Via Sonatel pour zones sans internet</div>
            </div>
            <div style="width:44px;height:24px;background:var(--green);border-radius:12px;cursor:pointer;position:relative;">
              <div style="width:18px;height:18px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;"></div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:13px;font-weight:600">Email récapitulatif quotidien</div>
              <div style="font-size:11px;color:var(--text-muted)">Rapport automatique à 07h00</div>
            </div>
            <div style="width:44px;height:24px;background:var(--border);border-radius:12px;cursor:pointer;position:relative;">
              <div style="width:18px;height:18px;background:#555;border-radius:50%;position:absolute;top:3px;left:3px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Délais d'escalade automatique</div></div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="form-group"><div class="form-label">Urgence critique → Escalade si non traité en</div><select class="form-select"><option>15 minutes</option><option>30 minutes</option><option>1 heure</option></select></div>
          <div class="form-group"><div class="form-label">Alerte → Escalade si non traitée en</div><select class="form-select"><option>1 heure</option><option>2 heures</option><option>4 heures</option></select></div>
          <div class="form-group"><div class="form-label">Signalement → Escalade si non traité en</div><select class="form-select"><option>12 heures</option><option>24 heures</option><option>48 heures</option></select></div>
          <button class="btn btn-primary btn-sm">Sauvegarder</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({})
</script>
