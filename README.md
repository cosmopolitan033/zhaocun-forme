# FORME — by zhaocun

## Version 2 — approved production experience

A digital sculpture garden with three procedural forms, chrome/copper/porcelain surfaces, reflective studio lighting, a museum setting and direct drag rotation.

Personal frontend design experiment. All sculptures and environments in this version are generated in code. No commercial clients, products or commissions are claimed.

Live: https://zhaocun-forme.netlify.app

The version 2 design was approved on 2026-10-27 and promoted to `main`. Production deployment details are recorded in `deployment.json`; `review-deployment.json` preserves the approved review snapshot.

## Run and edit

```sh
npm ci
npm run dev
npm run build
npm run preview
```

- `src/content.js`: names, text, links and scenes.
- `src/main.js`: procedural 3D geometry, materials, animation and controls.
- `src/style.css`: responsive layout and visual identity.
- `public/credits.html`: attribution and license references.

Deploy the contents of `dist/` to Netlify. `netlify.toml` declares the build command and output folder; it does not connect the Git repository automatically.

## Credits

Three.js and its included rendering utilities — MIT. Fonts — SIL Open Font License 1.1. Source notices are retained in `public/licenses/`. The earlier photographic gallery remains in Git history; its source and photo notices are retained.

## Accessibility

Controls have keyboard focus states and accessible names. Escape leaves immersive mode. Reduced-motion preference starts the animation paused. A readable fallback is shown if WebGL cannot initialize. Mobile layouts preserve normal scrolling until immersive mode is explicitly entered.

## Product presentation — October 2026

An independent digital sculpture exhibition by zhaocun. Explore three works, compare materials and curate a personal collection.

- `src/project-content.js`: editable collection, route or mission content.
- `src/project.js`: project sections and functional visitor interactions.
- `src/project.css`: responsive editorial layouts.

All mission/route settings are explicitly conceptual. FORME contains digital works, not physical editions. Export actions create local JSON files; the collection uses browser local storage. No accounts or server-side submission are required.
