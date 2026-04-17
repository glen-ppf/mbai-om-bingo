# MBAI AI Workflow Bingo

A single-page React + Vite game / interactive exercise for the MBAI program — "AI Workflow Bingo / Challenge". Renders nodes and edges (via `dagre`) with `lucide-react` icons, `motion` animations, and `canvas-confetti`.

## Claude Code Quick Start

When a Claude Code session opens in this repo, start here:

1. There is no `CLAUDE.md` — architecture is just a single Vite + React SPA; entry is `src/App.tsx`.
2. Stack: **React 18 + TypeScript 5 + Vite 6 + Tailwind v4** (via `@tailwindcss/vite`).
3. Install prereqs on the Mac: Node 18+.
4. Setup + run:
   ```bash
   npm install
   npm run dev       # Vite dev server
   ```
5. Build: `npm run build`. Type-check: `npm run lint` (runs `tsc --noEmit`).
6. No env vars required. No backend — everything runs client-side.

## Layout

```
index.html         # Vite entry
src/
├── App.tsx        # Root component
├── main.tsx       # React bootstrap
├── index.css      # Tailwind directives
├── data.ts        # Bingo/challenge data
└── components/    # UI components
public/            # Static assets
ai-workflow-bingo.jsx           # Historical single-file JSX version
ai-workflow-challenge.zip       # Packaged version
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | `tsc --noEmit` type check |
