<template>
  <div class="view active" id="view-performance">
    <div class="page-header">
      <div>
        <div class="page-title">📈 Performance des gestionnaires</div>
        <div class="page-sub">Taux de signalement, réactivité et conformité — IA & IEF</div>
      </div>
      <button class="btn btn-outline btn-sm">📥 Exporter rapport</button>
    </div>

    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Inspections d'Académie (IA)</div><div class="card-sub">16 académies — Score de performance sur 100</div></div>
      </div>
      <div class="scroll-y">
        <table class="perf-table">
          <thead>
            <tr>
              <th>Académie</th>
              <th>Responsable</th>
              <th>Statut</th>
              <th>Signalements (30j)</th>
              <th>Délai moyen</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, idx) in iaData" :key="idx">
              <td style="font-weight:600">{{ d.name }}</td>
              <td style="color:var(--text-muted)">{{ d.resp }}</td>
              <td><span class="status-dot" :class="d.status">{{ statusLabel(d.status) }}</span></td>
              <td style="font-family:var(--mono);text-align:center">{{ d.reports }}</td>
              <td style="font-family:var(--mono)">{{ d.delay }}</td>
              <td>
                <div class="score-bar">
                  <div class="score-track"><div class="score-fill" :style="`width:${d.score}%;background:${scoreColor(d.score)}`"></div></div>
                  <div class="score-label" :style="`color:${scoreColor(d.score)}`">{{ d.score }}</div>
                </div>
              </td>
              <td><button class="btn btn-outline btn-sm">💬</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Inspections de l'Éducation et de la Formation (IEF)</div><div class="card-sub">Top 15 IEF par niveau de performance</div></div>
      </div>
      <div class="scroll-y">
        <table class="perf-table">
          <thead>
            <tr>
              <th>IEF</th>
              <th>Académie</th>
              <th>Connexion</th>
              <th>Signalements</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, idx) in iefData" :key="idx">
              <td style="font-weight:600">{{ d.name }}</td>
              <td><span class="chip blue" style="font-size:10px">{{ d.acad }}</span></td>
              <td style="font-family:var(--mono);font-size:12px;color:var(--text-muted)">{{ d.online }}</td>
              <td style="font-family:var(--mono);text-align:center">{{ d.reports }}</td>
              <td>
                <div class="score-bar">
                  <div class="score-track"><div class="score-fill" :style="`width:${d.score}%;background:${scoreColor(d.score)}`"></div></div>
                  <div class="score-label" :style="`color:${scoreColor(d.score)}`">{{ d.score }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({})

const iaData = [
  { name: 'Académie de Dakar', resp: 'M. Abdoulaye Diallo', status: 'online', reports: 23, delay: '14 min', score: 94 },
  { name: 'Académie de Thiès', resp: 'Mme Fatou Sall', status: 'online', reports: 15, delay: '28 min', score: 87 },
  { name: 'Académie de Saint-Louis', resp: 'M. Mamadou Ndiaye', status: 'online', reports: 12, delay: '35 min', score: 82 },
  { name: 'Académie de Kaolack', resp: 'Mme Rokhaya Dieng', status: 'late', reports: 9, delay: '1h12', score: 64 },
  { name: 'Académie de Ziguinchor', resp: 'M. Lansana Badji', status: 'online', reports: 7, delay: '42 min', score: 78 },
  { name: 'Académie de Diourbel', resp: 'Mme Aminata Fall', status: 'online', reports: 11, delay: '52 min', score: 74 },
  { name: 'Académie de Tambacounda', resp: 'M. Ousmane Camara', status: 'offline', reports: 3, delay: '3h40', score: 41 },
  { name: 'Académie de Louga', resp: 'Mme Ndèye Mbaye', status: 'online', reports: 8, delay: '1h05', score: 72 },
  { name: 'Académie de Kolda', resp: 'M. Ibrahima Baldé', status: 'late', reports: 5, delay: '2h15', score: 55 },
  { name: 'Académie de Matam', resp: 'Mme Marième Sy', status: 'offline', reports: 2, delay: '5h', score: 28 },
]

const iefData = [
  { name: 'IEF Dakar-Plateau', acad: 'Dakar', online: '08:42', reports: 8, score: 97 },
  { name: 'IEF Dakar-Centre', acad: 'Dakar', online: '07:15', reports: 7, score: 93 },
  { name: 'IEF Thiès-Nord', acad: 'Thiès', online: '08:05', reports: 5, score: 89 },
  { name: 'IEF Pikine-Guédiawaye', acad: 'Dakar', online: '07:58', reports: 6, score: 88 },
  { name: 'IEF Saint-Louis', acad: 'Saint-Louis', online: '09:10', reports: 4, score: 84 },
  { name: 'IEF Rufisque', acad: 'Thiès', online: '08:30', reports: 3, score: 81 },
  { name: 'IEF Diourbel', acad: 'Diourbel', online: '08:55', reports: 3, score: 77 },
  { name: 'IEF Kaolack', acad: 'Kaolack', online: '10:22', reports: 3, score: 68 },
  { name: 'IEF Ziguinchor', acad: 'Ziguinchor', online: '09:45', reports: 2, score: 65 },
  { name: 'IEF Louga', acad: 'Louga', online: '11:00', reports: 2, score: 60 },
  { name: 'IEF Tambacounda', acad: 'Tambacounda', online: 'Hors ligne', reports: 1, score: 42 },
  { name: 'IEF Kolda', acad: 'Kolda', online: 'Hors ligne', reports: 1, score: 38 },
]

function scoreColor(score) {
  if (score >= 80) return 'var(--green)'
  if (score >= 60) return 'var(--yellow)'
  return 'var(--red)'
}

function statusLabel(status) {
  if (status === 'online') return 'En ligne'
  if (status === 'offline') return 'Hors ligne'
  return 'Retard'
}
</script>
