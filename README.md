# learn-r3f

A React Three Fiber playground: Vite + React 19 + TypeScript, with `three`, `@react-three/fiber` and `@react-three/drei`.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check, then production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint
```

## Layout

- `src/App.tsx` sets up the `<Canvas>`, lights, ground grid and camera controls.
- `src/components/SpinningBox.tsx` shows the core R3F pattern: a ref on a mesh, `useFrame` for per-frame animation, and pointer events driving React state.
- `src/index.css` makes the canvas fill the viewport.

## Notes

- Anything inside `<Canvas>` is three.js, not the DOM. `<mesh>`, `<boxGeometry>` and `<meshStandardMaterial>` map to the matching three.js classes; `args` is the constructor argument list.
- `useFrame` runs outside React's render loop, so mutate refs there instead of calling `setState`.
- The scene uses plain lights rather than drei's `<Environment preset>`, which downloads HDRIs from a CDN at runtime.

Docs: [R3F](https://r3f.docs.pmnd.rs/), [drei](https://drei.docs.pmnd.rs/), [three.js](https://threejs.org/docs/)
