# TerraBots - Robotics & Embodied AI Lab (UNI)

Official website for **TerraBots (Robotics & Embodied AI Lab - UNI)**, a multidisciplinary robotics initiative led by students, graduates, and professors from the **National University of Engineering (UNI)** in Peru.

We design and build autonomous robotic systems — including the **Terranaitor Rover** — for challenging environments, combining robotics, AI, embedded systems, and mechanical design.

## Tech Stack

- **Framework:** Angular 19 (standalone components)
- **Styling:** Tailwind CSS 4 via PostCSS
- **Language:** TypeScript (strict mode)
- **i18n:** ngx-translate (English/Spanish, runtime toggle)
- **Deployment:** Netlify (SPA redirect)
- **Backend:** Node.js + Express on Render.com (email API only)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

> **Note:** Do not run `npm install` from Google Drive — sync slows it down. Copy the project to a local path first.

## Available Scripts

| Command          | Description                          |
|------------------|--------------------------------------|
| `npm start`      | Dev server at localhost:4200         |
| `npm run build`  | Production build (dist/)             |
| `npm run watch`  | Build in watch mode                  |
| `npm test`       | Run Karma + Jasmine tests            |

## Project Structure

```
src/
├── app/
│   ├── app.component.*          # Root component (navbar + router-outlet + footer)
│   ├── app.config.ts            # Providers: router, HttpClient, Forms, TranslateModule
│   ├── app.routes.ts            # Route definitions
│   ├── email.service.ts         # Contact form API service
│   └── components/
│       ├── navbar/              # Responsive nav with mobile hamburger menu + language toggle
│       ├── footer/              # Site-wide footer
│       └── body/
│           ├── home/            # Landing page
│           ├── about/           # About us, mission, vision, pillars (i18n)
│           ├── projects/        # Rover project overview
│           ├── team/            # Team members
│           ├── sponsors/        # Sponsors & partners
│           ├── events/          # Competitions & events (ERC)
│           ├── contact/         # Donation (Yape/Plin/Bank) + contact form (i18n)
│           ├── privacy-policy/  # Privacy policy
│           └── terms-conditions/# Terms & conditions
├── assets/
│   ├── i18n/
│   │   ├── en.json              # English translations
│   │   └── es.json              # Spanish translations
│   └── ...                      # Images, logos, QR codes
├── styles.css                   # Global styles + Tailwind import
└── index.html                   # Entry point
```

## Pages & Routes

| Route               | Component             | Description                          |
|----------------------|-----------------------|--------------------------------------|
| `/home`             | HomeComponent          | Landing page with hero section       |
| `/about`            | AboutComponent         | About us, history, mission & vision  |
| `/projects`         | ProjectsComponent      | Rover project details & videos       |
| `/team`             | TeamComponent          | Team members & roles                 |
| `/sponsors`         | SponsorsComponent      | Academic & corporate partners        |
| `/events`           | EventsComponent        | Competitions (European Rover Challenge) |
| `/contact`          | ContactComponent       | Donations (QR/bank) + contact form   |
| `/privacypolicy`    | PrivacyPolicyComponent | Privacy policy                       |
| `/termsconditions`  | TermsConditionsComponent | Terms & conditions                 |

## Internationalization (i18n)

The website supports **English** and **Spanish** with runtime language switching via `@ngx-translate/core`.

- **Translation files:** `src/assets/i18n/en.json` and `src/assets/i18n/es.json`
- **Language toggle:** ES/EN button in the navbar (desktop and mobile)
- **Default language:** English
- **How it works:** Text in templates uses `{{ 'KEY' | translate }}` pipe. Placeholders use `[placeholder]="'KEY' | translate"`. Dynamic messages (toast, email status) use `TranslateService.instant()`.

### Adding translations to a new page

1. Add translation keys to both `en.json` and `es.json`
2. Import `TranslateModule` in the component's `imports` array
3. Replace hardcoded text with `{{ 'SECTION.KEY' | translate }}`
4. For `placeholder` attributes, use `[placeholder]="'KEY' | translate"`
5. For dynamic strings in TS, inject `TranslateService` and use `this.translate.instant('KEY')`

### Translated pages

- Navbar (all links)
- About (full page)
- Contact (donation section + contact form + toast notifications)

## Backend API

The frontend is a client-side SPA. The only backend is a separate service for the contact form:

- **Endpoint:** `POST https://servewebterrabots.onrender.com/send-email`
- **Called from:** `src/app/email.service.ts`
- **Hosted on:** Render.com (separate repository)

## Deployment

Deployed on **Netlify** with SPA routing configured in `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Design

- Dark theme: `#0e0e0e` backgrounds, gold `#facc15` accents, white text
- Responsive design with Tailwind's `md:` and `lg:` breakpoints
- Mobile hamburger menu (visible below 1024px)
- Toast notifications for clipboard copy actions

## License

All Rights Reserved. © 2025 TerraBots.
