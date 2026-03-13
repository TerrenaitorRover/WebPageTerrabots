# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TerraBots (Terrenaitor Rover) website — an Angular 19 SPA for a robotics team. Deployed on Netlify, with a backend email API on Render.com.

## Commands

```bash
npm start          # Dev server at localhost:4200
npm run build      # Production build (output: dist/terrenaitor-rover)
npm run watch      # Build in watch mode
npm test           # Run Karma + Jasmine tests in Chrome
```

All commands run from `WebPageTerrabots/`.

## Architecture

- **Framework:** Angular 19 with standalone components (no NgModules)
- **Styling:** Tailwind CSS 4 via PostCSS, component-scoped CSS files
- **Routing:** `src/app/app.routes.ts` — all pages are lazy-loadable body components
- **State:** No state management library; simple component state + reactive forms

### Key Files

- `src/main.ts` — bootstraps `AppComponent` with `appConfig`
- `src/app/app.config.ts` — providers: router, HttpClient, FormsModule, ReactiveFormsModule
- `src/app/app.routes.ts` — route definitions (home, about, projects, team, sponsors, events, contact, privacy, terms)
- `src/app/email.service.ts` — single service, POSTs to `servewebterrabots.onrender.com/send-email`

### Component Layout

```
src/app/components/
├── navbar/       — responsive nav with mobile burger menu
├── footer/
└── body/         — all page components (home, about, projects, team, sponsors, events, contact, privacypolicy, termsconditions)
```

Root template: navbar → router-outlet → footer.

### Styling Conventions

- Dark theme: black/gray-700 backgrounds, gold/yellow-400 accents, white text
- Custom Tailwind config is defined inline in `home.component.html` (accent color palette, fadeInUp animation)
- Responsive breakpoints use Tailwind's `md:` prefix

## TypeScript & Angular Strictness

Full strict mode enabled in `tsconfig.json` and Angular compiler options (`strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`). Do not weaken these settings.

## Local Setup

> **Important:** Do NOT run `npm install` from Google Drive (`G:\Mi unidad\`). The sync process slows installation to a crawl. Copy the project to a local path (e.g., `C:\Users\<you>\Projects\`) first.

```bash
npm install        # Installs ~800-1500 packages (Angular has many sub-dependencies)
npm start          # Dev server at http://localhost:4200
```

The `node_modules/` folder is large but fully recreatable — it should never be committed or backed up.

## Backend — Email API

The frontend is an Angular SPA (client-side only). The only backend is a separate **Node.js + Express** service hosted on **Render.com** that handles the contact form:

- **Endpoint:** `POST https://servewebterrabots.onrender.com/send-email`
- **Called from:** `src/app/email.service.ts`
- **Repo / deploy:** Managed independently on Render.com (not part of this repo)

## Deployment

Netlify with SPA redirect (all routes → `/index.html`). Config in `netlify.toml`.
