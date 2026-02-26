# SIREN‑ED Frontend (Vue + Tailwind)

## Objectif
Frontend MVP pour la plateforme SIREN‑ED. Priorité: SSO + signaler + consulter + statut.

## Stack
- Vue 3 + Vite + Vue Router
- Tailwind CSS (design intact via CSS source)

## Lancer le projet
```bash
cd /home/houleymatou-diallo/siren-ed-frontend
npm install
npm run dev
```

## Configuration API
Définir la base URL API:
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:5000/api
```

## Auth (SSO)
Le frontend envoie le token via:
- `Authorization: Bearer <access_token>`

Le token est lu depuis:
- `localStorage.getItem('access_token')`

## Structure
- `src/App.vue`: layout principal + orchestration
- `src/components/`: composants UI
- `src/router/index.js`: routes
- `src/services/api.js`: client API
- `src/data/mock.js`: fallback si API indisponible

## Routes
- `/` dashboard
- `/alerts`
- `/map`
- `/report`
- `/messages`
- `/broadcast`
- `/performance`
- `/analytics`
- `/settings`

## Contrat API (rappel)
- `GET /api/alerts`
- `GET /api/alerts/{id}`
- `POST /api/alerts`
- `PATCH /api/alerts/{id}/status`

## Notes
- Le design est basé directement sur le HTML initial.
- Les vues non MVP sont en placeholder, prêtes à être remplacées.
