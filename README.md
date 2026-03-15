# TerraBots - Robotics & Embodied AI Lab (UNI)

Official website for **TerraBots (Robotics & Embodied AI Lab - UNI)**, a multidisciplinary robotics initiative led by students, graduates, and professors from the **National University of Engineering (UNI)** in Peru.

We design and build autonomous robotic systems — including the **Terranaitor Rover** — for challenging environments, combining robotics, AI, embedded systems, and mechanical design.

## Tech Stack

- **Framework:** Angular 19 (standalone components)
- **Styling:** Tailwind CSS 4 via PostCSS
- **Language:** TypeScript (strict mode)
- **i18n:** ngx-translate (English/Spanish, runtime toggle)
- **Deployment:** Netlify (SPA redirect)
- **Backend:** Netlify Function → Google Apps Script → Gmail (contact form)

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
│   ├── email.service.ts         # Contact form API service (POST /.netlify/functions/contact)
│   └── components/
│       ├── navbar/              # Responsive nav with mobile hamburger menu + language toggle
│       ├── footer/              # Site-wide footer
│       └── body/
│           ├── home/            # Landing page
│           ├── about/           # About us, mission, vision, pillars (i18n)
│           ├── news/            # News & milestones (ERC results, media coverage) (i18n)
│           ├── projects/        # Rover subsystems, dev process, results (i18n)
│           ├── team/            # Team members
│           ├── sponsors/        # Sponsors & partners
│           ├── contact/         # Contact form, location map, social links, donations (i18n)
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

| Route               | Component               | Description                                        |
|----------------------|-------------------------|----------------------------------------------------|
| `/home`             | HomeComponent            | Landing page with hero section                     |
| `/about`            | AboutComponent           | About us, history, mission & vision                |
| `/news`             | NewsComponent            | Milestones, competition results, media coverage    |
| `/projects`         | ProjectsComponent        | Dev process, subsystems, results & progress        |
| `/team`             | TeamComponent            | Team members & roles                               |
| `/sponsors`         | SponsorsComponent        | Academic & corporate partners                      |
| `/contact`          | ContactComponent         | Contact form, location, social links, donations    |
| `/privacypolicy`    | PrivacyPolicyComponent   | Privacy policy                                     |
| `/termsconditions`  | TermsConditionsComponent | Terms & conditions                                 |

**Navigation order:** Home, About, News, Projects, Team, Sponsors, Contact

## Page Details

### News
Single featured milestone card highlighting the lab's 5th place worldwide result at the European Rover Challenge 2025 (Remote Edition), with integrated Andina News Agency media coverage. Designed as a milestone-focused page, not an event listing.

### Projects
- **Development Process:** Strategic Planning, Prototype Engineering, Field Validation (3-card grid)
- **Rover Subsystems:** Control & Navigation, Mechanics, Electronics, Artificial Intelligence (2x2 grid)
- **Results & Progress:** Autonomous Navigation Test, Full System Integration, AI Terrain Classification

### Contact
Two-column layout on desktop (stacked on mobile):
- **Left:** Contact form (email, subject, message → backend API)
- **Right:** Location card with embedded Google Maps (Pabellón Q — FIEE, Campus UNI)
- **Below:** Compact social links row (GitHub, LinkedIn, Instagram, Facebook, YouTube, WhatsApp)
- **Bottom:** Support section with Yape/Plin QR codes and bank transfer details

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
- News (full page)
- Projects (full page)
- Contact (form, location, social links, donations, toast notifications)

### Not yet translated

- Home, Team, Sponsors, Footer, Privacy Policy, Terms & Conditions

## Contact Form Architecture

The contact form uses a three-layer architecture for security and reliability:

```
Frontend Form → Netlify Function → Google Apps Script → Gmail
```

### Flow

1. User fills form + completes Cloudflare Turnstile verification
2. Frontend sends `{ email, subject, message, website, startedAt, turnstileToken }` to `/.netlify/functions/contact`
3. Netlify Function validates: honeypot, timing, Turnstile token, required fields
4. If valid, forwards `{ email, subject, message }` to Google Apps Script Web App
5. Apps Script sends email to lab inbox + auto-reply to sender via Gmail

### Anti-spam layers

- **Honeypot field:** Hidden `website` input — bots auto-fill it, humans don't see it
- **Timing check:** Rejects submissions under 3 seconds (bot speed)
- **Cloudflare Turnstile:** Server-side token validation before forwarding
- **Apps Script URL hidden:** Never exposed in frontend code

### Key files

- `netlify/functions/contact.mjs` — Netlify serverless function (validation + forwarding)
- `src/app/email.service.ts` — Angular service, POSTs to `/.netlify/functions/contact`
- `src/app/components/body/contact/contact.component.ts` — Form logic, Turnstile integration

### Environment variables (Netlify)

- `APPS_SCRIPT_URL` — Google Apps Script Web App deployment URL
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key

### Frontend config

- Turnstile site key in `contact.component.ts` auto-switches via `isDevMode()` (test key for localhost, production key for deploy)
- Frontend timeout: 20s via RxJS `timeout()` operator

## Local Development with Netlify Functions

To test the contact form locally, use `netlify dev`:

```powershell
# Set env vars locally (PowerShell) — use Cloudflare test keys for localhost
$env:TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"
$env:APPS_SCRIPT_URL="<your Apps Script URL>"
netlify dev
```

Open `http://localhost:8888` (not 4200) — Netlify proxies Angular + Functions through this port. The Turnstile site key auto-switches to Cloudflare's test key in dev mode.

## Deployment

Deployed on **Netlify** with SPA routing and serverless functions:

```toml
[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Brand Naming

- **Official name:** Robotics & Embodied AI Lab — UNI
- **Short name:** R-EAI Lab — UNI
- **Alias:** TerraBots (original founding name)
- **Rover:** Terranaitor (V1: 2024, V2: 2025) — refers to the rover only, not the team

## Design

- Dark theme: `#0e0e0e` backgrounds, gold `#facc15` accents, white text
- Responsive design with Tailwind's `md:` and `lg:` breakpoints
- Mobile hamburger menu (visible below 1024px)
- Toast notifications for clipboard copy actions
- Cards use `bg-[#141414]` with `border-gray-800`

## License

All Rights Reserved. © 2025 TerraBots.
