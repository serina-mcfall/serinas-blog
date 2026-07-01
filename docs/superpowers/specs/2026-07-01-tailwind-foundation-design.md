# Tailwind + 21st.dev Foundation — Design Spec

| | |
|---|---|
| date | 2026-07-01 |
| project | serinas-blog |
| status | spec — approved, awaiting build |
| north star | [`docs/declaration/north-star.md`](../../declaration/north-star.md) |
| author of code | Serina (Claude provides skeletons + owns tests; see working agreement) |

---

## 1. Goal

Wire Tailwind CSS into the blog so that React components from [21st.dev](https://21st.dev) can be dropped in and previewed, **without changing anything on the live site**. This is the *foundation* step. Actually adopting specific components onto real pages is deferred to later, per-component cycles.

## 2. Why this shape

Serina wants to explore the full range of 21st.dev components (decorative, interactive, layout). Rather than spec a specific redesign she hasn't seen yet, the first deliverable is the reusable foundation + a **dev-only playground** (`/lab`) where any component can be pasted and seen live against her real palette. This maximises safe experimentation and defers the hard calls (accessibility hardening, North Star amendments, "does it fit the vibe") until she's found components she wants to keep.

## 3. Non-negotiables carried in

- **Live site unchanged.** Home, Rooms, Posts, About render byte-for-byte as they do today after Tailwind lands. Proven by re-running the existing snapshot + a11y suite.
- **Accessibility stays non-negotiable** (Serina's standing rule, independent of the North Star). Third-party interactive widgets get audited against the relevant W3C APG pattern *before* they move from `/lab` onto a real page — not in this foundation step, but as the gate for step 2.
- **North Star may be amended, but only explicitly.** If a kept component conflicts with a declaration (e.g. motion), we amend the North Star in writing with a reason — never silently.

## 4. Decisions

- **Tailwind v4** (via `@tailwindcss/vite`), CSS-first config. (Revisit if Dev Academy curriculum uses v3.)
- **No global Preflight.** Import Tailwind's `theme` + `utilities` layers only, omitting the `preflight` reset — so Tailwind's base reset never restyles the live pages. If a lab component needs reset behaviour, add it scoped to `/lab`.
- **21st.dev compatibility scaffolding:** the `cn()` helper (`clsx` + `tailwind-merge`), an `@/` path alias, and mapping Serina's existing design tokens into both Tailwind's `@theme` colour names and the shadcn CSS-variable names (`--background`, `--foreground`, `--primary`, `--border`, etc.) that most 21st.dev components reference — so pasted components inherit the misty-morning palette instead of default blue/white.
- **`/lab` is dev-only:** the route renders only when `import.meta.env.DEV` is true, so it never appears on the deployed Vercel site.

## 5. Pieces (Serina types these; Claude supplies exact code)

1. **Install** — `tailwindcss`, `@tailwindcss/vite`, `clsx`, `tailwind-merge`.
2. **`vite.config.ts`** — add `tailwindcss()` plugin; add `@` → `src` alias (via `fileURLToPath` for ESM safety). Alias also serves vitest.
3. **`tsconfig.app.json`** — add `baseUrl` + `paths` so `@/*` resolves in the editor/type-checker.
4. **`src/lib/utils.ts`** — the `cn()` helper (typed for `verbatimModuleSyntax`).
5. **`src/index.css`** — selective Tailwind layer imports (no preflight) + token/shadcn-variable mapping.
6. **`src/pages/Lab.tsx` + `src/App.tsx`** — a plain playground page + a dev-only route ranked ahead of `/:room`.

## 6. Testing (Claude owns)

- Unit test for `cn()` (class merge/conflict resolution).
- Smoke test that `/lab` renders in a dev-like environment.
- **Regression proof:** re-run the existing snapshot + `vitest-axe` suite to confirm the live pages are unchanged after Tailwind is wired in. This is the safety net for the "live site unchanged" promise.

## 7. Out of scope (later cycles)

- Adopting any specific 21st.dev component onto a real page.
- Accessibility hardening / motion review of individual components (happens when a component graduates from `/lab`).
- Any North Star amendment (happens per-component, in writing, if needed).
- Removing/replacing the existing hand-crafted CSS.
