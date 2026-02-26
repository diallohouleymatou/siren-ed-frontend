# SIREN-ED Frontend

Frontend web du MVP **SIREN-ED**, plateforme de signalement et de suivi d'evenements.

## Sommaire
- [Presentation](#presentation)
- [Fonctionnalites](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Prerequis](#prerequis)
- [Installation](#installation)
- [Execution](#execution)
- [Configuration](#configuration)
- [API backend attendue](#api-backend-attendue)
- [Routes applicatives](#routes-applicatives)
- [Structure du projet](#structure-du-projet)
- [Notes d'integration](#notes-dintegration)

## Presentation
Cette application permet aux utilisateurs autorises de :
- declarer un signalement,
- suivre les alertes,
- consulter les details,
- mettre a jour les statuts,
- naviguer sur les vues operationnelles du systeme.

## Fonctionnalites
- Creation d'un signalement
- Liste des alertes
- Detail d'une alerte
- Mise a jour de statut
- Navigation multi-vues (dashboard, carte, messagerie, diffusion, analytics, parametres)
- Interface responsive (desktop, tablette, mobile)

## Stack technique
- `Vue 3`
- `Vite`
- `Tailwind CSS`
- `Vue Router`

## Prerequis
- `Node.js` 18+
- `npm`

## Installation
```bash
npm install
```

## Execution
Mode developpement :
```bash
npm run dev
```

Build production :
```bash
npm run build
npm run preview
```

## Configuration
Creer un fichier `.env.local` a la racine :

```bash
VITE_API_BASE_URL=http://localhost:5017/api
```

## API backend attendue
Le frontend est aligne avec les endpoints suivants :

- `GET /api/alert/getAlert`
- `GET /api/alert/{id}`
- `POST /api/alert/signalement`
- `PATCH /api/alert/status/{id}`

## Routes applicatives
| Route | Description |
|---|---|
| `/` | Dashboard |
| `/alerts` | Liste des alertes |
| `/map` | Carte |
| `/report` | Nouveau signalement |
| `/messages` | Messagerie |
| `/broadcast` | Diffusion |
| `/performance` | Performance |
| `/analytics` | Analyses |
| `/settings` | Parametres |

## Structure du projet
```text
src/
  App.vue
  main.js
  style.css
  router/
    index.js
  components/
    ...
  services/
    api.js
  data/
    mock.js
```

## Notes d'integration
- Le frontend utilise l'API reelle en priorite.
- Les donnees mock restent disponibles en fallback si l'API est indisponible.
- Le backend doit autoriser CORS pour l'origine du frontend (exemple: `http://localhost:5173`).
