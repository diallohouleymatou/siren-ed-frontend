<template>
  <div class="view active" id="view-dashboard">
    <div class="page-header">
      <div>
        <div class="page-title">Vue d'ensemble nationale</div>
        <div class="page-sub">Tableau de bord — {{ dateLabel }}</div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline btn-sm" @click="$emit('simulate')">⚡ Simuler alerte</button>
        <button class="btn btn-primary btn-sm" @click="$emit('go-report')">+ Nouveau signalement</button>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card red">
        <div class="kpi-top">
          <div class="kpi-icon">🔴</div>
          <div class="kpi-trend up">↑ +2</div>
        </div>
        <div class="kpi-value">{{ stats.critical }}</div>
        <div class="kpi-label">Urgences critiques actives</div>
      </div>
      <div class="kpi-card orange">
        <div class="kpi-top">
          <div class="kpi-icon">🟠</div>
          <div class="kpi-trend up">↑ +1</div>
        </div>
        <div class="kpi-value">{{ stats.alert }}</div>
        <div class="kpi-label">Alertes en cours</div>
      </div>
      <div class="kpi-card yellow">
        <div class="kpi-top">
          <div class="kpi-icon">⚠️</div>
          <div class="kpi-trend down">↓ -3</div>
        </div>
        <div class="kpi-value">{{ stats.pending }}</div>
        <div class="kpi-label">Signalements non traités</div>
      </div>
      <div class="kpi-card green">
        <div class="kpi-top">
          <div class="kpi-icon">✅</div>
          <div class="kpi-trend down">↑ +8</div>
        </div>
        <div class="kpi-value">{{ stats.resolved }}</div>
        <div class="kpi-label">Incidents résolus (24h)</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">⚡ Alertes récentes</div>
            <div class="card-sub">Temps réel — Toutes académies</div>
          </div>
          <button class="btn btn-outline btn-sm" @click="$emit('go-alerts')">Tout voir</button>
        </div>
        <div class="scroll-y h-400">
          <AlertList :alerts="alerts.slice(0, 6)" @select="$emit('select-alert', $event)" />
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">🗺️ Répartition géographique</div>
            <div class="card-sub">Incidents actifs par académie</div>
          </div>
        </div>
        <div id="miniMap" style="position:relative;background:var(--bg-panel);border-radius:8px;border:1px solid var(--border);overflow:hidden;margin-bottom:14px;">
          <svg id="senegalMap" viewBox="0 0 500 450" style="width:100%;height:200px">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="500" height="450" fill="url(#grid)"/>
            <ellipse cx="68" cy="210" rx="28" ry="22" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="145" cy="190" rx="48" ry="38" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="200" cy="80" rx="70" ry="55" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="230" cy="170" rx="58" ry="45" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="360" cy="95" rx="65" ry="50" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="380" cy="230" rx="85" ry="70" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="410" cy="355" rx="55" ry="45" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="280" cy="360" rx="60" ry="48" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="155" cy="390" rx="52" ry="40" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="205" cy="330" rx="45" ry="38" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="145" cy="280" rx="45" ry="38" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="210" cy="255" rx="45" ry="38" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="290" cy="265" rx="48" ry="38" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <ellipse cx="175" cy="228" rx="35" ry="28" fill="#162338" stroke="#1e3050" stroke-width="1.5"/>
            <text x="68" y="214" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Dakar</text>
            <text x="145" y="193" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Thiès</text>
            <text x="200" y="83" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Saint-Louis</text>
            <text x="230" y="173" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Louga</text>
            <text x="360" y="98" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Matam</text>
            <text x="380" y="233" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Tambac.</text>
            <text x="280" y="363" text-anchor="middle" fill="#6a849e" font-size="9" font-family="Sora">Kolda</text>
            <text x="155" y="393" text-anchor="middle" fill="#6a849e" font-size="8" font-family="Sora">Ziguinchor</text>
            <text x="175" y="231" text-anchor="middle" fill="#6a849e" font-size="8" font-family="Sora">Diourbel</text>
            <text x="210" y="258" text-anchor="middle" fill="#6a849e" font-size="8" font-family="Sora">Kaolack</text>
          </svg>
          <div id="mapDots" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div class="chart-bar-row"><div class="chart-bar-label">Dakar</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:78%;background:var(--red)"></div></div><div class="chart-bar-val" style="color:var(--red)">7</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Thiès</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:55%;background:var(--orange)"></div></div><div class="chart-bar-val" style="color:var(--orange)">5</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Saint-Louis</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:33%;background:var(--yellow)"></div></div><div class="chart-bar-val" style="color:var(--yellow)">3</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Kaolack</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:22%;background:var(--yellow)"></div></div><div class="chart-bar-val" style="color:var(--yellow)">2</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Ziguinchor</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:11%;background:var(--green)"></div></div><div class="chart-bar-val" style="color:var(--green)">1</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AlertList from './AlertList.vue'

defineProps({
  alerts: { type: Array, default: () => [] },
  stats: { type: Object, default: () => ({ critical: 0, alert: 0, pending: 0, resolved: 0 }) },
  dateLabel: { type: String, default: '' },
})
</script>
