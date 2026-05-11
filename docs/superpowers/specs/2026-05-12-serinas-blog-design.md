# Serina's Blog — v1 Design Spec

| | |
|---|---|
| date | 2026-05-12 |
| project | serinas-blog |
| status | spec — awaiting implementation |
| north star | [`docs/declaration/north-star.md`](../../declaration/north-star.md) |
| audience | human 70 / agent 30 |

This spec describes the implementation that satisfies the North Star. Every choice below traces to one or more declarations. Where a v1 choice does **not** fully satisfy a declaration, the gap is named explicitly with a reason.

---

## 1. Summary

A personal blog for Serina that doubles as a homepage for friends, family, future employers, and the AuDHD community. Five rooms (Writing, Art, Code, Travel & Food, Neurodivergent) of markdown-authored posts; a "this week" strip (mood + Quote of the Week + Currently Listening); three home-page featured windows; a calm, accessibility-first design honouring her AuDHD and dyslexia. Built with Vite + React + TypeScript, deployed on Vercel via `git push`.

---

## 2. Stack

| Package | Purpose |
|---|---|
| `vite`, `@vitejs/plugin-react`, `typescript` | Build tool + React + TS |
| `react`, `react-dom` | Framework |
| `react-router-dom` | Client-side routing |
| `react-markdown` | Render markdown bodies |
| `gray-matter` | Parse YAML front-matter from `.md` files |
| `vitest` | Test runner |
| `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` | Component tests |
| `vitest-axe` | Accessibility tests |
| `jsdom` | DOM in tests |

**Why this stack:** mirrors Dev Academy curriculum (Unit 02 Client-Side Rendering, Component Testing) and `serinas-universe`. Maximises Serina's ability to learn-by-doing.

---

## 3. Project layout

```
serinas-blog/
├── content/                                    ← Serina edits this
│   ├── posts/
│   │   ├── writing/<slug>/index.md             (+ co-located images)
│   │   ├── art/<slug>/index.md
│   │   ├── code/<slug>/index.md
│   │   ├── travel/<slug>/index.md
│   │   └── neurodivergent/<slug>/index.md
│   ├── now/
│   │   ├── mood.md
│   │   ├── quote.md
│   │   └── listening.md
│   └── featured/
│       ├── art.md
│       ├── writing.md
│       └── travel.md
├── public/
│   ├── images/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   │   ├── content.ts                          ← Markdown loader
│   │   └── types.ts                            ← TypeScript shape definitions
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── declaration/north-star.md
│   └── superpowers/specs/2026-05-12-serinas-blog-design.md   ← this file
├── tests/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
```

**The mental contract:** `content/` is Serina's. `src/` is the React code that reads from `content/` and renders it. The author and the developer have separate folders.

---

## 4. Content model

All editable content is **markdown with YAML front-matter** parsed by `gray-matter`. One file = one thing.

### 4.1 Blog post

`content/posts/<room>/<slug>/index.md`

```markdown
---
title: "Moonlight pour"
date: 2026-05-15
excerpt: "Six pours to get the swirl right — here's how the last one finally settled."
image: "./hero.jpg"
imageAlt: "A resin piece with swirling teal and pearlescent white"
draft: false
---

Body of the post in markdown. Images live in this same folder.

![Mid-pour](./mid-pour.jpg)
```

- Filename of the folder = URL slug (`/<room>/<slug>`).
- `excerpt` is what appears as the home-page window text and the room teaser. Falls back to first paragraph if omitted.
- `draft: true` keeps a post out of the build entirely.

### 4.2 "This week" strip

Three files in `content/now/`:

**`mood.md`**
```markdown
---
emoji: "🌸"
word: "calm"
updated: 2026-05-12
---
```

**`quote.md`**
```markdown
---
author: "Brené Brown"
source: "Dare to Lead"
updated: 2026-05-12
---

Boundaries · Reliability · Accountability · Vault · Integrity · Non-judgment · Generosity.

— BRAVING
```

**`listening.md`**
```markdown
---
title: "Cherry Blossom Lo-Fi"
artist: "Various"
url: "https://open.spotify.com/playlist/..."
type: "playlist"
updated: 2026-05-12
---
```

### 4.3 Featured pieces

Three files in `content/featured/` (`art.md`, `writing.md`, `travel.md`). Each is a pointer to a piece + a short caption.

```markdown
---
title: "Moonlight pour"
image: "/images/featured/moonlight-pour-small.jpg"
imageAlt: "A resin piece with swirling teal and pearlescent white"
link: "/art/moonlight-pour"
caption: "This one took six pours to settle the swirl"
updated: 2026-05-12
---
```

Updating a featured piece = edit the file, swap the image path, commit, push. Satisfies *Keeping it alive #3*.

---

## 5. Routing

| URL | Component | Purpose |
|---|---|---|
| `/` | `Home` | Hello + ThisWeek + 3 FeaturedWindows + RoomList |
| `/about` | `About` | Bio + full UsagePolicy + ContactPlaceholder |
| `/writing` | `Room` | List of Writing posts + UniverseDoor |
| `/art` | `Room` | List of Art posts |
| `/code` | `Room` | List of Code posts |
| `/travel` | `Room` | List of Travel & Food posts (display name "Travel & Food") |
| `/neurodivergent` | `Room` | List of Neurodivergent posts |
| `/<room>/<slug>` | `Post` | Individual post page |
| `/feed.xml` | (generated) | RSS feed, built at build-time |
| `*` | `NotFound` | 404 |

**Notes on routing decisions:**
- No date in URLs (clean URLs, no rename needed when fixing typos in titles).
- `/neurodivergent` spelled out, not abbreviated (Identity declaration #4).
- `/travel` URL kept short; display name is "Travel & Food" (room combines both per Serina's 2026-05-12 decision).
- The Writing room shows a single clear `UniverseDoor` link to `serinas-universe` (Reading & going deeper #5).

---

## 6. Component architecture

```
App
└── Layout
    ├── Header   (nav: Writing · Art · Code · Travel & Food · Neurodivergent · About · RSS)
    ├── <Outlet />
    └── Footer  (© notice + RSS icon)

Pages:
  Home
    ├── Hello
    ├── ThisWeek
    │   ├── MoodChip
    │   ├── QuoteOfTheWeek
    │   └── CurrentlyListening
    ├── FeaturedWindow × 3
    └── RoomList
  About
    ├── Bio
    ├── UsagePolicy
    └── ContactPlaceholder
  Room
    ├── RoomHeader
    ├── RoomTeaser × N
    └── UniverseDoor   (only inside /writing)
  Post
    ├── PostHeader
    └── Markdown
  NotFound
```

**Helpers (not components):**
- `lib/content.ts` — loads all markdown via Vite's `import.meta.glob`, parses front-matter with `gray-matter`, returns typed arrays.
- `lib/types.ts` — `Post`, `Quote`, `Mood`, `ListeningItem`, `FeaturedItem`, `Room`.

**No `useEffect`, no `Context`, no custom hooks in v1.** Data flows from `lib/content.ts` (build-time imports) → through props → into components. Pure-props tree. Aligns with Serina's current React knowledge (functional components + props + state, no async loading patterns yet).

---

## 7. Data flow

1. **Build time:** Vite's `import.meta.glob('/content/**/*.md', { eager: true, as: 'raw' })` reads every markdown file.
2. **`lib/content.ts`:** parses each file with `gray-matter`, validates against a TypeScript type, sorts posts by date desc, filters drafts.
3. **Routes import content:** e.g. `Room` imports `getPostsByRoom(room)` and renders `RoomTeaser` for each.
4. **No runtime fetch.** No spinner. No "loading…" state. The site is pre-rendered at build.

---

## 8. Image handling & protection

**Resolution discipline** (Protecting #2). Serina resizes manually before adding:
- Hero images ≤ 1600 px wide
- In-post images ≤ 1200 px wide
- Featured-window images ≤ 800 px wide

Master files stay offline.

**Watermarks** (Protecting #3). Serina adds a visible signature/watermark in her image editor before placing the file in the project. Not automated — creative call per piece.

**EXIF copyright metadata.** Set in image editor at export time.

**AI crawler opt-out** (Protecting #4):

`public/robots.txt`:
```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Bytespider
Disallow: /
```

Plus per-page meta in `index.html`:
```html
<meta name="robots" content="noai, noimageai" />
```

**Hot-link prevention** (Protecting #5). In `vercel.json`:
```json
{
  "redirects": [{
    "source": "/images/(.*)",
    "has": [{
      "type": "header",
      "key": "referer",
      "value": "(?!https://<own-host>/.*).*"
    }],
    "destination": "/images/placeholder.jpg"
  }]
}
```

The `<own-host>` value is replaced at deploy time with the actual hostname(s) Vercel assigns (initially `serinas-blog.vercel.app`, later any custom domain). When a custom domain is added, this regex must be updated to include it — captured in the build-time open questions list.

**Usage policy reachability** (Protecting #6). Every image displays a small `©` indicator that links to `/about#usage-policy`.

---

## 9. Hosting & deployment

**Vercel.** Repo connected to Vercel; every push to `main` triggers a build and deploy. Preview deploys on feature branches happen automatically. HTTPS automatic, free tier covers the expected traffic.

**Why Vercel** (Serina's 2026-05-12 choice): best React DX of the realistic options; smooth path to v2 hearts via Vercel Functions + Vercel KV (same dashboard); auto-deploy on git push satisfies *Keeping it alive #2*.

**Custom domain:** deferred until Serina picks a final user-facing site name. Defaults to `serinas-blog.vercel.app` until then.

---

## 10. Testing

**Stack:** `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, `jsdom`.

**What we test in v1:**

1. **`lib/content.ts` unit tests** — pure-function checks where real bugs live:
   - Loads all posts.
   - Parses front-matter correctly.
   - Sorts by date descending.
   - Excludes drafts.
   - Falls back to first paragraph when `excerpt` missing.
2. **Snapshot tests** — one per building-block component, one per page (`Hello`, `ThisWeek`, `FeaturedWindow`, `RoomList`, `RoomTeaser`, `PostHeader`, `Markdown`, `UniverseDoor`, `Home`, `Room`, `Post`, `About`, `NotFound`).
3. **Accessibility audits** — each page snapshot includes `expect(await axe(container)).toHaveNoViolations()`. Catches missing alt text, missing labels, low contrast, broken landmarks. Directly tests the Accessibility & quiet design declarations.

**Pre-push command:** `npm test && npm run build`. If either fails, don't push.

**Deliberate non-goals in v1:** pixel-perfect visual tests, performance benchmarks (Vercel reports these), end-to-end browser tests.

---

## 11. v1 scope & known gaps

### In v1
- All five rooms with markdown-authored posts.
- Home page with Hello, ThisWeek strip, three FeaturedWindows, RoomList.
- About page with Bio, UsagePolicy, ContactPlaceholder.
- RSS feed auto-generated at build.
- robots.txt + meta tags blocking AI crawlers.
- vercel.json blocking hot-linking.
- Test suite covering content loader + snapshots + a11y audits.

### Deferred to v2 (with reasons)
- **Heart reactions.** Reason: requires a backend (Vercel Function + KV); Serina hasn't yet covered Express APIs in Dev Academy (Unit 04). v2 build, by her, with full understanding. Declaration *Appreciation #1* is not met in v1 — known gap.
- **Real contact channel** (for art-licensing requests). Reason: Serina's "minimal disturbance" constraint deserves a careful channel choice; placeholder in v1, real channel in v2. Declaration *Protecting #6* has a placeholder, not a working path, in v1.

### Open at build time (not blocking the spec)
- **Visual design** — specific colour palette, typography pairings, spacing scale. Constraints: muted/non-oppressive, WCAG AA contrast minimum, dyslexia-aware sans-serif body, line-height ≥ 1.6, xianxia/watercolour aesthetic consistent with `serinas-universe`. To be nailed in context during build.
- **Final user-facing site name** — working title "Serina's Blog"; directory + repo are `serinas-blog`. Real name TBD.
- **Custom domain** — deferred until final name picked. When added, the `vercel.json` hot-link regex must be updated to include it alongside the default `*.vercel.app` host.
- **`vite-imagetools` for auto-image-processing** — possible v1.5 addition if manual sizing becomes a chore.
- **Git pre-push hook** — possible quality-of-life addition that runs `npm test && npm run build` automatically.
- **Empty-state handling for `content/`** — graceful behaviour when, e.g., no posts exist yet in a room, or `mood.md` is empty. Implementation detail; the loader should return sensible empty arrays / null rather than crashing.

---

## 12. Implementation plan

The next step is to invoke the `writing-plans` skill to break this spec into ordered, ticketable implementation tasks. The plan should sequence:

1. Project bootstrap (Vite + React + TS + Router + dependencies).
2. Type definitions (`lib/types.ts`).
3. Content loader (`lib/content.ts`) with unit tests.
4. Layout + Header + Footer (with five-room navigation).
5. Home page + its sub-components.
6. Room page + RoomTeaser + UniverseDoor.
7. Post page + Markdown rendering.
8. About page + UsagePolicy + ContactPlaceholder.
9. NotFound.
10. RSS feed generator.
11. robots.txt + meta tags + vercel.json.
12. Visual design pass (palette, type, spacing).
13. Snapshot + a11y tests across all pages.
14. Vercel deploy + first push.

Visual design lands as step 12, after structure is in place — easier to evaluate calm/contrast in context.
