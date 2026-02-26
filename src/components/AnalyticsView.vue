<template>
  <div class="view active" id="view-analytics">
    <div class="page-header">
      <div>
        <div class="page-title">🔬 Analyses & Tendances</div>
        <div class="page-sub">Visualisation des données agrégées — 30 derniers jours</div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">Évolution hebdomadaire des incidents</div></div>
        <div style="display:flex;flex-direction:column;gap:10px;padding-top:8px">
          <div style="display:flex;gap:8px;align-items:flex-end;height:120px">
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1" v-for="(v, i) in weekData" :key="i">
              <div style="font-size:11px;font-family:var(--mono);color:var(--text-muted)">{{ v }}</div>
              <div :style="barStyle(v)"></div>
              <div style="font-size:10px;color:var(--text-dim)">{{ days[i] }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Répartition par type d'incident</div></div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="chart-bar-row"><div class="chart-bar-label">🔒 Sécurité</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:38%;background:var(--red)"></div></div><div class="chart-bar-val">38%</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">🏥 Santé</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:24%;background:var(--orange)"></div></div><div class="chart-bar-val">24%</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">✊ Social</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:18%;background:var(--yellow)"></div></div><div class="chart-bar-val">18%</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">🏫 Infra</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:12%;background:var(--blue)"></div></div><div class="chart-bar-val">12%</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">📚 Pédago</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:8%;background:var(--green)"></div></div><div class="chart-bar-val">8%</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Académies les plus actives</div></div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="chart-bar-row"><div class="chart-bar-label">Dakar</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:85%;background:linear-gradient(90deg,var(--accent),#e06010)"></div></div><div class="chart-bar-val">85</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Thiès</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:62%;background:linear-gradient(90deg,var(--accent),#e06010)"></div></div><div class="chart-bar-val">62</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Saint-Louis</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:48%;background:linear-gradient(90deg,var(--accent),#e06010)"></div></div><div class="chart-bar-val">48</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Kaolack</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:35%;background:linear-gradient(90deg,var(--accent),#e06010)"></div></div><div class="chart-bar-val">35</div></div>
          <div class="chart-bar-row"><div class="chart-bar-label">Diourbel</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:28%;background:linear-gradient(90deg,var(--accent),#e06010)"></div></div><div class="chart-bar-val">28</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Heure des signalements (24h)</div></div>
        <div style="display:flex;gap:4px;align-items:flex-end;height:100px;padding-top:8px">
          <div v-for="(v, i) in hourData" :key="i" :style="hourStyle(v)"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:10px;color:var(--text-dim);font-family:var(--mono)">
          <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({})

const weekData = [12, 18, 9, 22, 15, 28, 19]
const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const hourData = [1,0,0,1,2,4,8,12,10,7,6,8,9,11,8,7,5,4,6,7,5,3,2,1]

function barStyle(v) {
  const maxV = Math.max(...weekData)
  const h = (v / maxV) * 70
  return `width:100%;height:${h}px;background:linear-gradient(180deg,var(--accent),#c06010);border-radius:4px 4px 0 0;transition:height .6s ease`
}

function hourStyle(v) {
  const maxH = Math.max(...hourData)
  const h = Math.max(4, (v / maxH) * 90)
  const color = v > 8 ? 'var(--red)' : v > 5 ? 'var(--orange)' : 'var(--blue)'
  return `flex:1;background:${color};height:${h}px;border-radius:2px 2px 0 0;opacity:.8`
}
</script>
