# SIREN-ED Frontend

Frontend du MVP SIREN-ED (plateforme de signalement pour le Ministere de l'Education).

## Apercu
Ce projet fournit l'interface web pour :
- creer un signalement,
- consulter les alertes,
- visualiser le detail,
- mettre a jour le statut.

Le design reprend le prototype HTML de reference et reste responsive (desktop, tablette, mobile).

## Stack technique
- Vue 3
- Vite
- Tailwind CSS
- Vue Router

## Prerequis
- Node.js 18+
- npm

## Installation
```bash
npm install
```

## Demarrage en local
```bash
npm run dev
```

Application front : `http://localhost:5173`

## Build production
```bash
npm run build
npm run preview
```

## Configuration environnement
Creer `.env.local` a la racine :

```bash
VITE_API_BASE_URL=http://localhost:5017/api
```

## Backend attendu
Le frontend est aligne avec le backend ASP.NET sur les endpoints suivants :
- `GET /api/alert/getAlert`
- `GET /api/alert/{id}`
- `POST /api/alert/signalement`
- `PATCH /api/alert/status/{id}`

Important : le backend doit autoriser CORS pour `http://localhost:5173`.

## Routes front
- `/` : dashboard
- `/alerts` : liste des alertes
- `/map` : carte
- `/report` : creation signalement
- `/messages` : messagerie
- `/broadcast` : diffusion
- `/performance` : performance
- `/analytics` : analyses
- `/settings` : parametres

## Structure du projet
- `src/App.vue` : orchestration globale
- `src/router/index.js` : declaration des routes
- `src/components/` : vues et composants UI
- `src/services/api.js` : client HTTP
- `src/data/mock.js` : fallback local si API indisponible
- `src/style.css` : base visuelle issue du prototype

## Notes d'integration
- Les appels API passent en priorite sur les donnees mock.
- Le fallback mock reste present pour les endpoints non stabilises.
- Le mapping des statuts backend est gere cote frontend pour l'affichage.

## Lancement rapide (front + back)
Terminal 1 (backend):
```bash
cd /home/houleymatou-diallo/SIRENE-ED_BackEnd/SIREN-ED_BackEnd
dotnet run
```

Terminal 2 (frontend):
```bash
cd /home/houleymatou-diallo/siren-ed-frontend
npm run dev
```
