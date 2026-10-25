# FORME — by zhaocun

Personal creative development / frontend showcase. An interactive concept, not a commercial client commission.

Live: https://zhaocun-forme.netlify.app  
Portfolio: https://zhaocun-portfolio.netlify.app

## Run and build

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Deploy the contents of `dist/` to Netlify. The included `netlify.toml` also supports Git-connected deployment with `npm run build` and `dist`.

## Edit your content

- `src/content.js`: all main text, names, personal links and content data.
- `src/style.css`: layout, typography, colors and mobile presentation.
- `src/main.js`: interface behavior and rendering.
- `public/`: locally hosted assets and credits.

## Source and attribution

Scroll-controlled Flip gallery adapted from Codrops ScrollBasedLayoutAnimations (MIT). New editorial layout, content, filters and study viewer. Photographs licensed through Pexels; ownership remains with the credited photographers.

Original source: https://github.com/codrops/ScrollBasedLayoutAnimations

All source credits are retained in `public/credits.html` and `public/licenses/`. The code license does not replace third-party photo, font or library licenses.

## Accessibility

Keyboard-accessible controls, visible focus states, mobile layouts and reduced-motion support. WebGL pages provide a fallback when graphics cannot initialize.

Upstream reference commit: `ade47c56f8f2f756e7e6df8e578407690b2fb782`.
