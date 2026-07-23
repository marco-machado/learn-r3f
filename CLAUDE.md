# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check (tsc -b), then production build to dist/
npm run preview  # serve the production build
npm run lint      # eslint
```

No test suite exists in this project.

## Architecture

React Three Fiber playground: Vite + React 19 + TypeScript, with `three`, `@react-three/fiber` and `@react-three/drei`.

- `src/App.tsx` sets up the `<Canvas>`, lights, ground grid and camera controls — the scene root.
- `src/components/` holds individual R3F scene objects, e.g. `SpinningBox.tsx`, which shows the core pattern: a ref on a mesh, `useFrame` for per-frame animation, and pointer events driving React state.
- `src/index.css` makes the canvas fill the viewport.

Key R3F conventions to keep in mind when editing scene code:

- Anything inside `<Canvas>` is three.js, not the DOM. `<mesh>`, `<boxGeometry>`, `<meshStandardMaterial>`, etc. map to matching three.js classes; `args` is the constructor argument list.
- `useFrame` runs outside React's render loop, so mutate refs there instead of calling `setState`.
- The scene uses plain lights rather than drei's `<Environment preset>`, which downloads HDRIs from a CDN at runtime.

Docs: [R3F](https://r3f.docs.pmnd.rs/), [drei](https://drei.docs.pmnd.rs/), [three.js](https://threejs.org/docs/)

## Agent skills

### Issue tracker

GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
