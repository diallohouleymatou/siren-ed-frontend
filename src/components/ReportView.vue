<template>
  <div class="view active" id="view-report">
    <div class="page-header">
      <div>
        <div class="page-title">📝 Signaler un événement</div>
        <div class="page-sub">Formulaire de remontée d'information — Accessible à tous les niveaux</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Nouveau signalement</div>
          <div class="card-sub">Remplissez tous les champs obligatoires marqués *</div>
        </div>
      </div>

      <form @submit.prevent="submit">
        <div class="form-grid">
          <div class="form-group form-full">
            <div class="form-label">Niveau de gravité *</div>
            <div class="severity-selector">
              <div class="sev-option" :class="{ selected: form.severity === 'critical' }" @click="form.severity='critical'">
                <div class="sev-option-icon">🔴</div>
                <div class="sev-option-label" style="color:var(--red)">Critique</div>
                <div class="sev-option-desc">Danger immédiat</div>
              </div>
              <div class="sev-option" :class="{ selected: form.severity === 'alert' }" @click="form.severity='alert'">
                <div class="sev-option-icon">🟠</div>
                <div class="sev-option-label" style="color:var(--orange)">Alerte</div>
                <div class="sev-option-desc">Action requise &lt; 2h</div>
              </div>
              <div class="sev-option" :class="{ selected: form.severity === 'warning' }" @click="form.severity='warning'">
                <div class="sev-option-icon">🟡</div>
                <div class="sev-option-label" style="color:var(--yellow)">Signalement</div>
                <div class="sev-option-desc">Suivi requis &lt; 24h</div>
              </div>
              <div class="sev-option" :class="{ selected: form.severity === 'info' }" @click="form.severity='info'">
                <div class="sev-option-icon">🟢</div>
                <div class="sev-option-label" style="color:var(--green)">Information</div>
                <div class="sev-option-desc">Pour information</div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">Catégorie *</div>
            <select class="form-select" v-model="form.category" required>
              <option disabled value="">Sélectionner...</option>
              <option>🔒 Sécurité / Violence</option>
              <option>🏥 Santé / Épidémie</option>
              <option>✊ Conflit social / Grève</option>
              <option>🏫 Infrastructure</option>
              <option>📚 Pédagogie / Examens</option>
              <option>👨‍👩‍👧 Protection de l'enfant</option>
              <option>🌊 Catastrophe naturelle</option>
              <option>📌 Autre</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label">Niveau déclarant *</div>
            <select class="form-select" v-model="form.reporter_level">
              <option>Chef d'établissement</option>
              <option>IEF (Inspection Education Formation)</option>
              <option>IA (Inspection d'Académie)</option>
              <option>Cellule DPTIC</option>
              <option>Autre</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label">Académie / Région *</div>
            <select class="form-select" v-model="form.academy">
              <option>Dakar</option>
              <option>Thiès</option>
              <option>Saint-Louis</option>
              <option>Kaolack</option>
              <option>Ziguinchor</option>
              <option>Diourbel</option>
              <option>Tambacounda</option>
              <option>Louga</option>
              <option>Kolda</option>
              <option>Fatick</option>
              <option>Matam</option>
              <option>Kaffrine</option>
              <option>Kédougou</option>
              <option>Sédhiou</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label">IEF concernée</div>
            <input class="form-input" v-model="form.ief" placeholder="Ex: IEF de Dakar-Plateau" type="text">
          </div>

          <div class="form-group form-full">
            <div class="form-label">Établissement(s) concerné(s)</div>
            <input class="form-input" v-model="form.establishment" placeholder="Ex: Lycée Blaise Diagne, CEM Liberté IV..." type="text">
          </div>

          <div class="form-group form-full">
            <div class="form-label">Description de l'événement *</div>
            <textarea class="form-textarea" style="min-height:120px" v-model="form.description" placeholder="Décrivez les faits de manière précise et factuelle." required></textarea>
          </div>

          <div class="form-group">
            <div class="form-label">Date & Heure de l'événement *</div>
            <input class="form-input" type="datetime-local" v-model="form.event_datetime" required>
          </div>

          <div class="form-group">
            <div class="form-label">Personnes affectées (nombre estimé)</div>
            <input class="form-input" type="number" v-model.number="form.people_affected" placeholder="0">
          </div>

          <div class="form-group form-full">
            <div class="form-label">Mesures déjà prises</div>
            <textarea class="form-textarea" v-model="form.actions" placeholder="Quelles actions ont déjà été entreprises localement ?"></textarea>
          </div>

          <div class="form-group">
            <div class="form-label">Appui requis du niveau central</div>
            <select class="form-select" v-model="form.support">
              <option>Aucun pour l'instant</option>
              <option>Intervention urgente requise</option>
              <option>Appui logistique</option>
              <option>Décision ministérielle</option>
              <option>Communication publique</option>
              <option>Médiation / Arbitrage</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label">Contact du déclarant</div>
            <input class="form-input" type="tel" v-model="form.contact" placeholder="+221 7X XXX XX XX">
          </div>
        </div>

        <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
          <button type="button" class="btn btn-outline">Sauvegarder brouillon</button>
          <button type="submit" class="btn btn-danger">🚨 Transmettre au Ministre</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({})

const emit = defineEmits(['submit'])

const form = reactive({
  severity: 'critical',
  category: '',
  reporter_level: "Chef d'établissement",
  academy: 'Dakar',
  ief: '',
  establishment: '',
  description: '',
  event_datetime: new Date().toISOString().slice(0,16),
  people_affected: 0,
  actions: '',
  support: "Aucun pour l'instant",
  contact: '',
})

function submit() {
  emit('submit', { ...form })
}
</script>
