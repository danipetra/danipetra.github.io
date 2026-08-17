# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

Daniele Petracca's personal portfolio site, deployed at `danipetra.github.io` via GitHub Pages.
The codebase started from JavaScript Mastery's ["3D Portfolio" tutorial](https://github.com/adrianhajdin/3d-portfolio)
(README.md still documents the upstream clone/setup flow) and has since been customized with
Daniele's own content, projects and copy — it was **not** built from scratch, so expect some
tutorial-shaped patterns (generic section names, a couple of unused/commented-out sections, a
fairly monolithic constants file) rather than a from-scratch architecture. Treat inconsistencies
below as known state to gradually clean up, not as intended design.

Stack: **React 19 + Vite 6**, **Tailwind CSS 4** (CSS-first config, no `tailwind.config.js` — see
`src/index.css`), **Three.js / React Three Fiber / Drei** for the 3D hero and contact scenes,
**GSAP** (+ `@gsap/react`'s `useGSAP`) for scroll/entrance animations, **EmailJS** for the contact
form (no backend).

## Commands

```
npm install       # install dependencies
npm run dev         # Vite dev server (http://localhost:5173, or next free port)
npm run build        # production build to dist/
npm run preview       # serve the production build locally
npm run lint         # eslint .
```

No test suite / test runner configured.

Requires a `.env` (gitignored) with EmailJS credentials for the contact form to work locally:

```
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

## Structure

- **`src/App.jsx`** — assembles the page from sections, top to bottom. `LogoShowcase`,
  `FeatureCards` and `Testimonials` are currently commented out here even though their content
  still exists in `constants/index.js` and their component files are intact — decide whether to
  re-enable or delete them rather than leaving them as silent dead code.
- **`src/sections/`** — one file per page section (`Hero`, `ShowcaseSection` = the "Work" grid,
  `Experience`, `TechStack`, `SpotifySection`, `Contact`, `Footer`, plus the three disabled ones
  above). Each section owns its own GSAP/`ScrollTrigger` entrance animation via `useGSAP`.
- **`src/components/`** — shared UI (`NavBar`, `Button`, `GlowCard`, `TitleHeader`,
  `AnimatedCounter`, `ExpContent`) plus `components/models/` for R3F scenes/meshes (`hero_models/`,
  `contact/`, `tech_logos/`).
- **`src/constants/index.js`** — the single source of truth for almost all site copy and data:
  nav links, hero words, counters, company logos, abilities, tech stack, experience cards,
  testimonials, social links. **Exception:** `ShowcaseSection.jsx` defines its own `projects` and
  `filters` arrays locally instead of importing from here — every other section pulls from
  `constants/index.js`, so this one file is the odd one out. Worth moving `projects`/`filters` into
  `constants/index.js` for consistency next time that file is touched.
- **`src/index.css`** — Tailwind v4 imported directly (`@import "tailwindcss"`), design tokens
  under `@theme` (custom color scale: `white-50`, `black-50/100/200`, `blue-50/100`), and
  component classes grouped by section under `@layer components` (e.g. `.app-showcase { .work-card
  { ... } }` nesting mirrors the section structure). New section-specific classes should follow
  this same nested-under-`@layer components` pattern rather than inlining long Tailwind chains in
  JSX, to stay consistent with the rest of the file.
- **`public/`** — static assets served as-is: `images/projects/` and `videos/projects/` (work
  card media), `images/logos/`, `models/` (`.glb` for R3F), `audio/`.

## Work section (`ShowcaseSection.jsx`)

The "Selected Works" grid (`#work`) is filterable by category (`All`, `Configurators`, `Games`,
`Visualization`, `AI`) and paginated at **9 projects per page** (`PROJECTS_PER_PAGE`). Pagination
state resets to page 1 on every filter change (`handleFilterChange`), and page changes scroll the
grid back into view. Each project entry supports `image` (required — also the mobile/no-JS
fallback), an optional `video` (desktop-only, autoplays muted/looped via `<video>`, falls back to
`image` if omitted), and one of `repoUrl` / `liveUrl` / `downloadUrl` for the card's action button.
GSAP `ScrollTrigger.batch` staggers card entrance on scroll — the trigger list changes with
`[activeFilter, currentPage]`, so both filtering and pagination re-run the entrance animation for
the newly visible set.

Projects are listed newest-first; the two most recent (`Fortune Wheel`, `Drift`) were added at the
top, which is why they land on page 1 alongside the pre-existing configurator/game projects and the
two oldest (`2D Graph Viewer`, `Flappy Bird IA`) got pushed to page 2. If more projects are added,
keep newest-first ordering so pagination continues to surface recent work on page 1 by default.

## Deployment

The repo has a `gh-pages` branch on `origin` (`danipetra/danipetra.github.io`), which is what
GitHub Pages actually serves — **not** the `master` branch directly (`master` holds Vite source,
`index.html` there is the dev entry, not a built page). There is no `gh-pages` npm package in
`devDependencies`, no `deploy` script in `package.json`, and no `.github/workflows/` — meaning the
`master` → `gh-pages` publish step is currently manual or external to this repo. If you're asked to
change the deploy flow or it breaks, this is the first thing to check/fix: either add the
`gh-pages` package with a `predeploy`/`deploy` script pair, or add a GitHub Actions workflow that
builds on push to `master` and publishes `dist/` to `gh-pages`.

## Known rough edges / improvement candidates

- **Contact form error handling** (`src/sections/Contact.jsx`): a failed `emailjs.sendForm` only
  `console.error`s — the user sees no failure state, just a button that stops saying "Sending...".
  Add a visible error message/toast.
- **Bundle size**: production build currently emits a single ~1.4MB JS chunk (gzip ~458KB), flagged
  by Vite's chunk-size warning — driven by Three.js/R3F/Drei being in the main bundle even though
  the 3D hero/contact scenes are below the fold or behind interaction. `React.lazy` + dynamic
  `import()` for `HeroExperience`/`ContactExperience`/`TechIconCardExperience`, or manual chunking
  in `vite.config.js`, would be the first thing to try.
- **Constants file is a growing monolith**: `constants/index.js` mixes nav, copy, and per-section
  data arrays for every section in one ~300-line file. Fine at current size; if it keeps growing,
  consider splitting per-section (`constants/experience.js`, `constants/testimonials.js`, etc.) with
  an `index.js` barrel re-export.
- **No TypeScript, no prop validation**: plain JSX throughout, no `PropTypes` or `.tsx`. Not
  necessarily worth a full migration, but worth keeping in mind before adding more complex
  components — a bad prop shape currently fails silently or blows up at render time with no
  type-level warning.
- **Dead/disabled sections**: `LogoShowcase`, `FeatureCards`, `Testimonials` are commented out in
  `App.jsx` but still fully implemented with live data in `constants/index.js`. Either re-enable
  them or remove the components + their constants to stop the drift between "what's implemented"
  and "what's shown."
- **Heavy media assets**: some project videos in `public/videos/projects/` run several MB each
  (e.g. the VRVis clip is ~11MB) and are only lazy-loaded via `preload="none"`, not viewport-based
  lazy loading — fine for a handful of cards, but reconsider if the work grid keeps growing well
  past pagination page 1.
