# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

Daniele Petracca's personal portfolio site, deployed at `danipetra.github.io` via GitHub Pages.
The codebase started from JavaScript Mastery's ["3D Portfolio" tutorial](https://github.com/adrianhajdin/3d-portfolio)
(README.md still documents the upstream clone/setup flow) and has since been customized with
Daniele's own content, projects and copy — it was **not** built from scratch, so expect some
tutorial-shaped patterns (generic section names, a fairly monolithic constants file) rather than a
from-scratch architecture. A first cleanup pass already removed the tutorial's unused sections and
fixed several leftover bugs (see git history on this file and the "Known rough edges" section below
for what's still open).

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

- **`src/App.jsx`** — assembles the page from sections, top to bottom: `Hero`, `ShowcaseSection`,
  `Experience`, `TechStack`, `SpotifySection`, `Contact`, `Footer`. `LogoShowcase`, `FeatureCards`
  and `Testimonials` (tutorial leftovers, never populated with real content) were removed entirely,
  along with their constants data — don't recreate them from git history without real content to
  put in them.
- **`src/sections/`** — one file per page section. Each section owns its own GSAP/`ScrollTrigger`
  entrance animation via `useGSAP`.
- **`src/components/`** — shared UI (`NavBar`, `Button`, `GlowCard`, `TitleHeader`,
  `AnimatedCounter`, `ExpContent`) plus `components/models/` for R3F scenes/meshes (`hero_models/`,
  `contact/`, `tech_logos/`). `GlowCard` takes a single `card` prop and holds one internal ref per
  instance — no `index` prop, don't reintroduce one; each caller renders its own `GlowCard`.
- **`src/constants/index.js`** — the single source of truth for site copy and data: nav links, hero
  words, counters, tech stack, experience cards, social links, and the Work grid's `projects`/
  `workFilters`. Every section sources its content from here — if you add a new section with any
  amount of repeatable data, put it here too rather than inlining it in the section file.
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

## Experience section (`Experience.jsx`)

Each timeline entry has an `xl:w-2/6` column on desktop that's currently **intentionally empty** —
a `GlowCard` showing `card.imgPath` (a company/role image) plus the card's `review` quote is written
but commented out. This was a deliberate call, not an oversight: leave it commented out unless
asked to change it again.

## 3D scenes: pause-off-screen + shadow refresh (Hero/Contact)

Both `HeroExperience` and `ContactExperience` (`src/components/models/`) use
`src/hooks/useInView.js` (`IntersectionObserver`-based) to set `frameloop={inView ? "always" :
"never"}` on their `<Canvas>` — rendering fully stops while either is scrolled off-screen, which is
what fixed a serious lag complaint (both scenes previously rendered continuously forever,
postprocessing/shadows included, regardless of visibility). Both also cap `dpr={[1, 1.5]}`. Don't
remove this without a specific reason — it's load-bearing for perceived performance.

`ContactExperience`'s desk scene never animates, so its shadow map doesn't need to recompute every
frame either. `Computer.jsx` takes a `refreshShadow` prop (`ContactExperience` passes its `inView`
state) and, each time it flips to `true`, sets `gl.shadowMap.autoUpdate = false` +
`gl.shadowMap.needsUpdate = true` + calls `invalidate()` to force one fresh render. This
recomputes-on-every-return-to-view instead of recomputing only once ever on mount, specifically
because the first version (compute-once-forever) was suspected to cause an intermittent "desk model
renders once then goes blank" bug after the canvas had been paused off-screen — recomputing on each
visibility return closes that gap. If shadow-related visual bugs ever reappear here, this is the
first place to look.

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

- **`TechIconCardExperience.jsx`** (a third R3F scene, per-tech-icon 3D models) is unused —
  `TechStack.jsx` renders static `<img>`s instead (the 3D version is commented out there). It never
  got the `useInView`/`dpr` treatment the other two scenes did, since it isn't reachable — if it's
  ever re-enabled, apply the same pattern documented above first.
- **Constants file will keep growing**: `constants/index.js` mixes nav, copy, and per-section data
  arrays for every section in one file (~250 lines currently). Fine at this size; if it keeps
  growing, consider splitting per-section (`constants/experience.js`, `constants/work.js`, etc.)
  with an `index.js` barrel re-export.
- **No TypeScript, no prop validation**: plain JSX throughout, no `PropTypes` or `.tsx`. Not
  necessarily worth a full migration, but worth keeping in mind before adding more complex
  components — a bad prop shape currently fails silently or blows up at render time with no
  type-level warning.
- **Heavy media assets**: some project videos in `public/videos/projects/` run several MB each
  (e.g. the VRVis clip is ~11MB) and are only lazy-loaded via `preload="none"`, not viewport-based
  lazy loading — fine for a handful of cards, but reconsider if the work grid keeps growing well
  past pagination page 1.
- **`NavBar.jsx`'s scroll listener** is unthrottled (`window.addEventListener("scroll", ...)` firing
  on every scroll event). It's a cheap boolean comparison, so not urgent, but worth throttling if
  more work gets added to that handler later.
