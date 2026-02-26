<template>
  <div class="view active" id="view-broadcast">
    <div class="page-header">
      <div>
        <div class="page-title">📢 Diffusion circulaire</div>
        <div class="page-sub">Envoi de messages à tous les niveaux de la hiérarchie</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">Nouvelle circulaire</div></div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <div class="form-label">Destinataires</div>
            <div style="display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--bg-panel);border:1px solid var(--border);border-radius:var(--r-sm)">
              <label style="display:flex;gap:10px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox" checked> Toutes les IA (16)</label>
              <label style="display:flex;gap:10px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox" checked> Toutes les IEF (47)</label>
              <label style="display:flex;gap:10px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox"> Tous les Chefs d'établissement (2 234)</label>
              <label style="display:flex;gap:10px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox"> Directeurs d'école</label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-label">Priorité du message</div>
            <select class="form-select">
              <option>🟢 Normal</option>
              <option>🟡 Urgent</option>
              <option>🔴 Très urgent — Accusé obligatoire</option>
            </select>
          </div>
          <div class="form-group">
            <div class="form-label">Objet *</div>
            <input class="form-input" placeholder="Objet de la circulaire...">
          </div>
          <div class="form-group">
            <div class="form-label">Message *</div>
            <textarea class="form-textarea" style="min-height:140px" placeholder="Rédigez ici votre circulaire ou directive..."></textarea>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="btn btn-outline">Programmer l'envoi</button>
            <button class="btn btn-primary">📢 Diffuser maintenant</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Historique des diffusions</div></div>
        <div style="display:flex;flex-direction:column;gap:10px" class="scroll-y h-400">
          <div style="padding:12px;background:var(--bg-panel);border:1px solid var(--border);border-radius:var(--r-sm)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:13px;font-weight:600">Protocole d'urgence sanitaire</span>
              <span class="chip green">Livré</span>
            </div>
            <div style="font-size:11px;color:var(--text-muted)">À : Toutes les IA + IEF · 63 destinataires</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:4px;font-family:var(--mono)">24 fév 2026 · 09h14 · Taux d'ouverture : 89%</div>
          </div>
          <div style="padding:12px;background:var(--bg-panel);border:1px solid var(--border);border-radius:var(--r-sm)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:13px;font-weight:600">Consignes examens régionaux BFEM</span>
              <span class="chip green">Livré</span>
            </div>
            <div style="font-size:11px;color:var(--text-muted)">À : Toutes les IA + Chefs Lycées</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:4px;font-family:var(--mono)">22 fév 2026 · 14h30 · Taux d'ouverture : 94%</div>
          </div>
          <div style="padding:12px;background:var(--bg-panel);border:1px solid var(--border);border-radius:var(--r-sm)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:13px;font-weight:600">Rapport mensuel absentéisme — Relance</span>
              <span class="chip orange">Partiel</span>
            </div>
            <div style="font-size:11px;color:var(--text-muted)">À : Toutes les IEF · 47 destinataires</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:4px;font-family:var(--mono)">20 fév 2026 · 08h00 · Taux d'ouverture : 72%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({})
</script>
