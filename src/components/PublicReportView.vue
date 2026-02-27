<template>
  <div class="public-wrapper">
    <div class="public-header">
      <div class="brand">SIREN-ED</div>
      <div class="subtitle">Portail public de signalement - Ministere de l'Education</div>
      <RouterLink to="/" class="public-back">Retour a l'accueil</RouterLink>
    </div>

    <div class="card public-card">
      <div class="card-header">
        <div>
          <div class="card-title">Signaler un evenement</div>
          <div class="card-sub">Ce formulaire est accessible au public. Les informations seront verifiees par les services competents.</div>
        </div>
      </div>

      <form @submit.prevent="submitPublic">
        <div class="form-grid">
          <div class="form-group form-full">
            <div class="form-label">Niveau de gravite *</div>
            <div class="severity-selector">
              <div class="sev-option" :class="{ selected: form.severity === 'critical' }" @click="form.severity='critical'">
                <div class="sev-option-icon">🔴</div>
                <div class="sev-option-label" style="color:var(--red)">Critique</div>
                <div class="sev-option-desc">Danger immediat</div>
              </div>
              <div class="sev-option" :class="{ selected: form.severity === 'alert' }" @click="form.severity='alert'">
                <div class="sev-option-icon">🟠</div>
                <div class="sev-option-label" style="color:var(--orange)">Alerte</div>
                <div class="sev-option-desc">Action rapide requise</div>
              </div>
              <div class="sev-option" :class="{ selected: form.severity === 'warning' }" @click="form.severity='warning'">
                <div class="sev-option-icon">🟡</div>
                <div class="sev-option-label" style="color:var(--yellow)">Signalement</div>
                <div class="sev-option-desc">Suivi necessaire</div>
              </div>
              <div class="sev-option" :class="{ selected: form.severity === 'info' }" @click="form.severity='info'">
                <div class="sev-option-icon">🟢</div>
                <div class="sev-option-label" style="color:var(--green)">Information</div>
                <div class="sev-option-desc">Information generale</div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">Categorie *</div>
            <select class="form-select" v-model="form.category" required>
              <option disabled value="">Selectionner...</option>
              <option>Securite / Violence</option>
              <option>Sante / Epidemie</option>
              <option>Conflit social / Greve</option>
              <option>Infrastructure</option>
              <option>Pedagogie / Examens</option>
              <option>Protection de l'enfant</option>
              <option>Catastrophe naturelle</option>
              <option>Autre</option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-label">Academie / Region *</div>
            <input class="form-input" v-model="form.academy" placeholder="Ex: Dakar" required>
          </div>

          <div class="form-group">
            <div class="form-label">IEF concernee</div>
            <input class="form-input" v-model="form.ief" placeholder="Ex: IEF Dakar-Plateau">
          </div>

          <div class="form-group">
            <div class="form-label">Etablissement concerne</div>
            <input class="form-input" v-model="form.establishment" placeholder="Ex: Lycee Blaise Diagne">
          </div>

          <div class="form-group form-full">
            <div class="form-label">Description de l'evenement *</div>
            <textarea class="form-textarea" style="min-height:130px" v-model="form.description" required placeholder="Decrire les faits de maniere precise : qui, quoi, quand, ou, combien de personnes concernees."></textarea>
          </div>

          <div class="form-group">
            <div class="form-label">Date et heure *</div>
            <input class="form-input" type="datetime-local" v-model="form.event_datetime" required>
          </div>

          <div class="form-group">
            <div class="form-label">Nombre de personnes affectees</div>
            <input class="form-input" type="number" min="0" v-model.number="form.people_affected">
          </div>

          <div class="form-group form-full">
            <div class="form-label">Mesures deja prises</div>
            <textarea class="form-textarea" v-model="form.actions" placeholder="Actions deja entreprises sur place"></textarea>
          </div>

          <div class="form-group">
            <div class="form-label">Contact declarant *</div>
            <input class="form-input" v-model="form.contact" required placeholder="Telephone ou email">
          </div>

          <div class="form-group">
            <div class="form-label">Nom declarant (optionnel)</div>
            <input class="form-input" v-model="form.reporter_name" placeholder="Nom complet">
          </div>
        </div>

        <div class="public-info">
          En soumettant ce formulaire, vous acceptez que ces informations soient analysees par les autorites competentes.
        </div>

        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">
          <button class="btn btn-outline" type="button" @click="resetForm">Reinitialiser</button>
          <button class="btn btn-danger" type="submit" :disabled="submitting">
            {{ submitting ? 'Envoi en cours...' : 'Envoyer le signalement' }}
          </button>
        </div>
      </form>

      <div v-if="resultMessage" :style="{ marginTop: '12px', color: resultType === 'success' ? 'var(--green)' : 'var(--red)', fontSize: '13px' }">
        {{ resultMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['submit-public'])

const submitting = ref(false)
const resultMessage = ref('')
const resultType = ref('')

const form = reactive({
  severity: 'warning',
  category: '',
  academy: '',
  ief: '',
  establishment: '',
  description: '',
  event_datetime: new Date().toISOString().slice(0,16),
  people_affected: 0,
  actions: '',
  contact: '',
  reporter_name: '',
})

async function submitPublic() {
  submitting.value = true
  resultMessage.value = ''
  resultType.value = ''
  try {
    await emit('submit-public', { ...form }, done)
  } finally {
    submitting.value = false
  }
}

function done(ok, message) {
  resultType.value = ok ? 'success' : 'error'
  resultMessage.value = message
  if (ok) resetForm()
}

function resetForm() {
  form.severity = 'warning'
  form.category = ''
  form.academy = ''
  form.ief = ''
  form.establishment = ''
  form.description = ''
  form.event_datetime = new Date().toISOString().slice(0,16)
  form.people_affected = 0
  form.actions = ''
  form.contact = ''
  form.reporter_name = ''
}
</script>

<style scoped>
.public-wrapper {
  min-height: 100vh;
  padding: 24px;
  background: radial-gradient(circle at 20% 0%, rgba(32, 136, 232, 0.15), transparent 40%), var(--bg-deep);
}

.public-header {
  max-width: 980px;
  margin: 0 auto 16px;
}

.brand {
  font-size: 24px;
  font-weight: 800;
}

.subtitle {
  color: var(--text-muted);
  font-size: 13px;
  margin-top: 4px;
}

.public-back {
  display: inline-block;
  margin-top: 10px;
  color: var(--accent);
  text-decoration: none;
  font-size: 12px;
}

.public-card {
  max-width: 980px;
  margin: 0 auto;
}

.public-info {
  margin-top: 14px;
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 720px) {
  .public-wrapper {
    padding: 14px;
  }
}
</style>
