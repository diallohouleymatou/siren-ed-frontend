<template>
  <div class="view active" id="view-map">
    <div class="page-header">
      <div>
        <div class="page-title">🗺️ Carte nationale des événements</div>
        <div class="page-sub">Vue territoriale en temps réel</div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline btn-sm" @click="$emit('filter', 'all')">Tous</button>
        <button class="btn btn-sm" style="background:var(--red-bg);color:var(--red);border:1px solid var(--red)" @click="$emit('filter', 'critical')">🔴 Critique</button>
        <button class="btn btn-sm" style="background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange)" @click="$emit('filter', 'alert')">🟠 Alerte</button>
        <button class="btn btn-sm" style="background:var(--green-bg);color:var(--green);border:1px solid var(--green)" @click="$emit('filter', 'info')">🟢 Info</button>
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden;">
      <div style="position:relative;background:var(--bg-panel);">
        <svg viewBox="0 0 500 450" style="width:100%;height:480px">
          <defs>
            <pattern id="gridBig" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="500" height="450" fill="#0a1422"/>
          <rect width="500" height="450" fill="url(#gridBig)"/>
          <ellipse cx="68" cy="210" rx="30" ry="24" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="145" cy="190" rx="50" ry="40" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="200" cy="80" rx="72" ry="58" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="230" cy="172" rx="60" ry="48" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="360" cy="95" rx="68" ry="52" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="380" cy="230" rx="88" ry="72" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="410" cy="355" rx="58" ry="48" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="280" cy="360" rx="62" ry="50" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="155" cy="390" rx="54" ry="42" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="205" cy="330" rx="47" ry="40" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="145" cy="280" rx="47" ry="40" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="210" cy="258" rx="47" ry="40" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="290" cy="268" rx="50" ry="40" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
          <ellipse cx="175" cy="230" rx="37" ry="30" fill="#0d1a2e" stroke="#1e3050" stroke-width="2"/>
        </svg>
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none"></div>
        <div class="map-tooltip"></div>
      </div>
    </div>

    <div class="card" style="padding:16px">
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
        <span style="font-size:12px;font-weight:600;color:var(--text-muted)">LÉGENDE :</span>
        <span style="display:flex;gap:6px;align-items:center;font-size:12px"><span style="width:12px;height:12px;border-radius:50%;background:var(--red);display:inline-block"></span> Urgence critique</span>
        <span style="display:flex;gap:6px;align-items:center;font-size:12px"><span style="width:12px;height:12px;border-radius:50%;background:var(--orange);display:inline-block"></span> Alerte</span>
        <span style="display:flex;gap:6px;align-items:center;font-size:12px"><span style="width:12px;height:12px;border-radius:50%;background:var(--yellow);display:inline-block"></span> Signalement</span>
        <span style="display:flex;gap:6px;align-items:center;font-size:12px"><span style="width:12px;height:12px;border-radius:50%;background:var(--green);display:inline-block"></span> Information</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({})
</script>
