# SIREN-ED Frontend

Interface web du MVP SIREN-ED.

## Stack
- Vue 3 (Vite)
- Tailwind CSS
- Vue Router

## Prerequis
- Node.js 18+
- npm

## Installation
```bash
npm install
```

## Lancer en local
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Configuration
Creer un fichier `.env.local` a la racine:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Routes
- `/`
- `/alerts`
- `/map`
- `/report`
- `/messages`
- `/broadcast`
- `/performance`
- `/analytics`
- `/settings`

## Structure
- `src/App.vue` layout principal
- `src/router/index.js` routes
- `src/components/` vues et composants UI
- `src/services/api.js` appels API
- `src/data/mock.js` donnees mock de secours

## Notes
- Le design suit le prototype HTML fourni.
- Le MVP priorise: creation, consultation et suivi de signalements.
