# Serina's Blog v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship v1 of Serina's Blog — a calm, accessible, markdown-authored personal blog built on Vite + React + TypeScript, deployed on Vercel, satisfying the North Star at `docs/declaration/north-star.md`.

**Architecture:** Static React app with build-time markdown loading via Vite's `import.meta.glob`. Five rooms (Writing, Art, Code, Travel & Food, Neurodivergent) of markdown posts, a curated home page with a "this week" strip and three featured windows, an About page hosting the art-usage policy. No backend in v1 (heart reactions deferred to v2). Hosted on Vercel with auto-deploy on `git push`.

**Tech Stack:** Vite 6+, React 19, TypeScript 5+, React Router 6+, `react-markdown`, `gray-matter`, Vitest, `@testing-library/react`, `vitest-axe`.

---

## Working principles for this plan

- **TDD where it pays:** unit tests for pure functions (the content loaders), snapshot + a11y tests for components.
- **Frequent commits:** every task ends with a commit. Commit messages follow `<type>: <short description>` (types: `feat`, `test`, `chore`, `style`, `docs`, `fix`).
- **No `useEffect` in v1.** Data is build-time. If a task wants `useEffect`, stop and re-examine.
- **No code from outside the spec.** If a task seems to need something not in the spec, raise it before writing code.

---

## Task 1: Initialise Vite + React + TypeScript project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`, `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`
- Create: `.gitignore`

- [ ] **Step 1.1: Run the Vite scaffolder**

Run from the project root (`/home/serina/GitHub/Personal/serinas-blog/`):

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about the non-empty directory, choose **"Ignore files and continue"** — the docs and `.git` directory must be preserved.

Expected: scaffold completes; the directory now contains `package.json`, `vite.config.ts`, `src/`, `public/`, etc., alongside the existing `docs/` and `README.md`.

- [ ] **Step 1.2: Install the scaffolded dependencies**

```bash
npm install
```

Expected: `node_modules/` created without errors.

- [ ] **Step 1.3: Verify the smoke test**

```bash
npm run dev
```

Expected: Vite starts a dev server (usually on `http://localhost:5173`) and prints "ready in N ms". Open the URL in a browser — the default Vite + React + TS welcome page renders. Stop the server with `Ctrl+C`.

- [ ] **Step 1.4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

## Task 2: Install routing, markdown, and testing dependencies

**Files:**
- Modify: `package.json` (npm install adds entries)

- [ ] **Step 2.1: Install runtime dependencies**

```bash
npm install react-router-dom react-markdown gray-matter
```

Expected: `package.json` `dependencies` now includes `react-router-dom`, `react-markdown`, `gray-matter`.

- [ ] **Step 2.2: Install test and a11y dev-dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest-axe jsdom @types/node
```

Expected: `package.json` `devDependencies` now includes all six packages plus `@types/node` for path/fs typings used by config files.

- [ ] **Step 2.3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install routing, markdown, and test dependencies"
```

---

## Task 3: Configure Vitest, jest-dom matchers, and a11y testing

**Files:**
- Modify: `vite.config.ts`
- Create: `src/test-setup.ts`
- Modify: `tsconfig.json` (add `types` for vitest and jest-dom)

- [ ] **Step 3.1: Replace `vite.config.ts` with combined Vite + Vitest config**

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 3.2: Create `src/test-setup.ts`**

```typescript
import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

expect.extend(axeMatchers)
```

- [ ] **Step 3.3: Add `vitest/globals` and `vitest-axe/extend-expect` to `tsconfig.json` types**

In `tsconfig.json`, locate the `compilerOptions` object and add a `types` array:

```json
{
  "compilerOptions": {
    ...existing options...,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

- [ ] **Step 3.4: Add a placeholder smoke test**

Create `src/smoke.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 3.5: Run the test**

```bash
npx vitest run
```

Expected: 1 test passes. (If errors mention missing types, ensure step 3.3 was applied.)

- [ ] **Step 3.6: Add a `test` script to `package.json`**

In `package.json` `scripts` block:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3.7: Remove the smoke test file (it served its purpose)**

```bash
rm src/smoke.test.ts
```

- [ ] **Step 3.8: Commit**

```bash
git add -A
git commit -m "chore: configure Vitest with jsdom, jest-dom, and vitest-axe"
```

---

## Task 4: Define TypeScript types for content

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 4.1: Create `src/lib/types.ts` with all content types**

```typescript
export type Room = 'writing' | 'art' | 'code' | 'travel' | 'neurodivergent'

export const ROOMS: Room[] = ['writing', 'art', 'code', 'travel', 'neurodivergent']

export const ROOM_DISPLAY_NAMES: Record<Room, string> = {
  writing: 'Writing',
  art: 'Art',
  code: 'Code',
  travel: 'Travel & Food',
  neurodivergent: 'Neurodivergent',
}

export interface Post {
  room: Room
  slug: string
  title: string
  date: string // ISO date, e.g. "2026-05-15"
  excerpt: string
  image?: string
  imageAlt?: string
  body: string // raw markdown body
  draft: boolean
}

export interface Mood {
  emoji: string
  word: string
  updated: string
}

export interface Quote {
  author: string
  source?: string
  body: string // markdown body of the quote
  updated: string
}

export interface ListeningItem {
  title: string
  artist: string
  url: string
  type: 'playlist' | 'song' | 'album'
  updated: string
}

export interface FeaturedItem {
  title: string
  image: string
  imageAlt: string
  link?: string
  caption: string
  updated: string
}
```

- [ ] **Step 4.2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add TypeScript types for posts, now-strip, and featured items"
```

---

## Task 5: Build the post loader (TDD)

**Files:**
- Test: `src/lib/content.test.ts`
- Create: `src/lib/content.ts`

This task uses Vite's `import.meta.glob` to load all post markdown at build time. For testability we'll wrap the import in a function and use Vitest mocking.

- [ ] **Step 5.1: Write the failing test for `getAllPosts`**

Create `src/lib/content.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { parsePost } from './content'

describe('parsePost', () => {
  it('parses front-matter and body', () => {
    const raw = `---
title: "Hello world"
date: 2026-05-15
excerpt: "A first post"
draft: false
---

Body text goes here.`
    const result = parsePost(raw, 'writing', 'hello-world')
    expect(result).toEqual({
      room: 'writing',
      slug: 'hello-world',
      title: 'Hello world',
      date: '2026-05-15',
      excerpt: 'A first post',
      image: undefined,
      imageAlt: undefined,
      body: '\nBody text goes here.',
      draft: false,
    })
  })

  it('defaults draft to false when missing', () => {
    const raw = `---
title: "No draft flag"
date: 2026-05-15
excerpt: "Test"
---

Body.`
    const result = parsePost(raw, 'art', 'no-draft-flag')
    expect(result.draft).toBe(false)
  })

  it('falls back to first paragraph when excerpt is missing', () => {
    const raw = `---
title: "No excerpt"
date: 2026-05-15
---

First paragraph here.

Second paragraph here.`
    const result = parsePost(raw, 'art', 'no-excerpt')
    expect(result.excerpt).toBe('First paragraph here.')
  })

  it('treats draft true as draft', () => {
    const raw = `---
title: "A draft"
date: 2026-05-15
excerpt: "x"
draft: true
---

Body.`
    const result = parsePost(raw, 'code', 'a-draft')
    expect(result.draft).toBe(true)
  })
})
```

- [ ] **Step 5.2: Run the test — confirm failure**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 4 failing tests with "Cannot find module './content'".

- [ ] **Step 5.3: Implement `parsePost`**

Create `src/lib/content.ts`:

```typescript
import matter from 'gray-matter'
import type { Post, Room, Mood, Quote, ListeningItem, FeaturedItem } from './types'
import { ROOMS } from './types'

export function parsePost(raw: string, room: Room, slug: string): Post {
  const { data, content } = matter(raw)

  const excerpt =
    typeof data.excerpt === 'string' && data.excerpt.length > 0
      ? data.excerpt
      : firstParagraph(content)

  return {
    room,
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    excerpt,
    image: typeof data.image === 'string' ? data.image : undefined,
    imageAlt: typeof data.imageAlt === 'string' ? data.imageAlt : undefined,
    body: content,
    draft: data.draft === true,
  }
}

function firstParagraph(body: string): string {
  const trimmed = body.trim()
  const firstBreak = trimmed.indexOf('\n\n')
  return firstBreak === -1 ? trimmed : trimmed.slice(0, firstBreak)
}
```

- [ ] **Step 5.4: Run the test — confirm pass**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 5.5: Add `getAllPosts` and `getPostsByRoom` tests**

Append to `src/lib/content.test.ts`:

```typescript
import { sortAndFilter } from './content'
import type { Post } from './types'

describe('sortAndFilter', () => {
  const posts: Post[] = [
    { room: 'art', slug: 'a', title: 'A', date: '2026-01-01', excerpt: '', body: '', draft: false },
    { room: 'art', slug: 'b', title: 'B', date: '2026-05-01', excerpt: '', body: '', draft: false },
    { room: 'art', slug: 'c', title: 'C', date: '2026-03-01', excerpt: '', body: '', draft: true },
    { room: 'art', slug: 'd', title: 'D', date: '2026-04-01', excerpt: '', body: '', draft: false },
  ]

  it('sorts by date descending', () => {
    const result = sortAndFilter(posts)
    expect(result.map(p => p.slug)).toEqual(['b', 'd', 'a'])
  })

  it('excludes drafts', () => {
    const result = sortAndFilter(posts)
    expect(result.find(p => p.slug === 'c')).toBeUndefined()
  })
})
```

- [ ] **Step 5.6: Run the new tests — confirm failure**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 2 new failing tests.

- [ ] **Step 5.7: Implement `sortAndFilter`, `getAllPosts`, `getPostsByRoom`**

Append to `src/lib/content.ts`:

```typescript
export function sortAndFilter(posts: Post[]): Post[] {
  return posts
    .filter(p => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

const postModules = import.meta.glob('/content/posts/*/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export function getAllPosts(): Post[] {
  const parsed: Post[] = []
  for (const [path, raw] of Object.entries(postModules)) {
    // path format: /content/posts/<room>/<slug>/index.md
    const match = path.match(/\/content\/posts\/([^/]+)\/([^/]+)\/index\.md$/)
    if (!match) continue
    const [, room, slug] = match
    if (!ROOMS.includes(room as Room)) continue
    parsed.push(parsePost(raw, room as Room, slug))
  }
  return sortAndFilter(parsed)
}

export function getPostsByRoom(room: Room): Post[] {
  return getAllPosts().filter(p => p.room === room)
}

export function getPost(room: Room, slug: string): Post | undefined {
  return getAllPosts().find(p => p.room === room && p.slug === slug)
}
```

- [ ] **Step 5.8: Run tests — confirm all pass**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 6 tests pass.

- [ ] **Step 5.9: Commit**

```bash
git add src/lib/content.ts src/lib/content.test.ts
git commit -m "feat: add post loader with front-matter parsing, draft filtering, date sort"
```

---

## Task 6: Build the "now" loader (TDD)

**Files:**
- Modify: `src/lib/content.test.ts`
- Modify: `src/lib/content.ts`

- [ ] **Step 6.1: Add tests for mood / quote / listening parsers**

Append to `src/lib/content.test.ts`:

```typescript
import { parseMood, parseQuote, parseListening } from './content'

describe('parseMood', () => {
  it('parses mood file', () => {
    const raw = `---
emoji: "🌸"
word: "calm"
updated: 2026-05-12
---
`
    expect(parseMood(raw)).toEqual({
      emoji: '🌸',
      word: 'calm',
      updated: '2026-05-12',
    })
  })
})

describe('parseQuote', () => {
  it('parses quote with body', () => {
    const raw = `---
author: "Brené Brown"
source: "Dare to Lead"
updated: 2026-05-12
---

BRAVING.`
    const result = parseQuote(raw)
    expect(result.author).toBe('Brené Brown')
    expect(result.source).toBe('Dare to Lead')
    expect(result.body).toBe('\nBRAVING.')
    expect(result.updated).toBe('2026-05-12')
  })

  it('treats missing source as undefined', () => {
    const raw = `---
author: "Anon"
updated: 2026-05-12
---

A quote.`
    const result = parseQuote(raw)
    expect(result.source).toBeUndefined()
  })
})

describe('parseListening', () => {
  it('parses listening file', () => {
    const raw = `---
title: "Cherry Blossom Lo-Fi"
artist: "Various"
url: "https://open.spotify.com/playlist/xyz"
type: "playlist"
updated: 2026-05-12
---
`
    expect(parseListening(raw)).toEqual({
      title: 'Cherry Blossom Lo-Fi',
      artist: 'Various',
      url: 'https://open.spotify.com/playlist/xyz',
      type: 'playlist',
      updated: '2026-05-12',
    })
  })
})
```

- [ ] **Step 6.2: Run tests — confirm failure**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 4 new failing tests.

- [ ] **Step 6.3: Implement the three parsers**

Append to `src/lib/content.ts`:

```typescript
export function parseMood(raw: string): Mood {
  const { data } = matter(raw)
  return {
    emoji: String(data.emoji ?? ''),
    word: String(data.word ?? ''),
    updated: String(data.updated ?? ''),
  }
}

export function parseQuote(raw: string): Quote {
  const { data, content } = matter(raw)
  return {
    author: String(data.author ?? ''),
    source: typeof data.source === 'string' ? data.source : undefined,
    body: content,
    updated: String(data.updated ?? ''),
  }
}

export function parseListening(raw: string): ListeningItem {
  const { data } = matter(raw)
  const type = data.type === 'song' || data.type === 'album' ? data.type : 'playlist'
  return {
    title: String(data.title ?? ''),
    artist: String(data.artist ?? ''),
    url: String(data.url ?? ''),
    type,
    updated: String(data.updated ?? ''),
  }
}

const moodRaw = import.meta.glob('/content/now/mood.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
const quoteRaw = import.meta.glob('/content/now/quote.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
const listeningRaw = import.meta.glob('/content/now/listening.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

export function getMood(): Mood | null {
  const raw = Object.values(moodRaw)[0]
  return raw ? parseMood(raw) : null
}

export function getQuote(): Quote | null {
  const raw = Object.values(quoteRaw)[0]
  return raw ? parseQuote(raw) : null
}

export function getListening(): ListeningItem | null {
  const raw = Object.values(listeningRaw)[0]
  return raw ? parseListening(raw) : null
}
```

- [ ] **Step 6.4: Run tests — confirm pass**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 10 tests pass total.

- [ ] **Step 6.5: Commit**

```bash
git add src/lib/content.ts src/lib/content.test.ts
git commit -m "feat: add now-strip parsers for mood, quote, and listening"
```

---

## Task 7: Build the featured-items loader (TDD)

**Files:**
- Modify: `src/lib/content.test.ts`
- Modify: `src/lib/content.ts`

- [ ] **Step 7.1: Add tests for `parseFeatured`**

Append to `src/lib/content.test.ts`:

```typescript
import { parseFeatured } from './content'

describe('parseFeatured', () => {
  it('parses featured-item file', () => {
    const raw = `---
title: "Moonlight pour"
image: "/images/featured/moonlight-pour.jpg"
imageAlt: "A resin piece with swirling teal"
link: "/art/moonlight-pour"
caption: "Six pours to settle the swirl"
updated: 2026-05-12
---
`
    expect(parseFeatured(raw)).toEqual({
      title: 'Moonlight pour',
      image: '/images/featured/moonlight-pour.jpg',
      imageAlt: 'A resin piece with swirling teal',
      link: '/art/moonlight-pour',
      caption: 'Six pours to settle the swirl',
      updated: '2026-05-12',
    })
  })

  it('treats missing link as undefined', () => {
    const raw = `---
title: "No link"
image: "/x.jpg"
imageAlt: "x"
caption: "x"
updated: 2026-05-12
---
`
    expect(parseFeatured(raw).link).toBeUndefined()
  })
})
```

- [ ] **Step 7.2: Run tests — confirm failure**

```bash
npx vitest run src/lib/content.test.ts
```

- [ ] **Step 7.3: Implement `parseFeatured` and the loader**

Append to `src/lib/content.ts`:

```typescript
export function parseFeatured(raw: string): FeaturedItem {
  const { data } = matter(raw)
  return {
    title: String(data.title ?? ''),
    image: String(data.image ?? ''),
    imageAlt: String(data.imageAlt ?? ''),
    link: typeof data.link === 'string' ? data.link : undefined,
    caption: String(data.caption ?? ''),
    updated: String(data.updated ?? ''),
  }
}

const featuredRaw = import.meta.glob('/content/featured/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

type FeaturedKind = 'art' | 'writing' | 'travel'

export function getFeatured(kind: FeaturedKind): FeaturedItem | null {
  const path = `/content/featured/${kind}.md`
  const raw = featuredRaw[path]
  return raw ? parseFeatured(raw) : null
}
```

- [ ] **Step 7.4: Run tests — confirm pass**

```bash
npx vitest run src/lib/content.test.ts
```

Expected: 12 tests pass total.

- [ ] **Step 7.5: Commit**

```bash
git add src/lib/content.ts src/lib/content.test.ts
git commit -m "feat: add featured-items loader for home-page windows"
```

---

## Task 8: Layout shell — Header and Footer

**Files:**
- Create: `src/components/Layout/Layout.tsx`
- Create: `src/components/Layout/Header.tsx`
- Create: `src/components/Layout/Footer.tsx`
- Test: `src/components/Layout/Header.test.tsx`
- Test: `src/components/Layout/Footer.test.tsx`

- [ ] **Step 8.1: Write the Header test**

Create `src/components/Layout/Header.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Header from './Header'

describe('Header', () => {
  function renderHeader() {
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
  }

  it('renders the site name', () => {
    renderHeader()
    expect(screen.getByText("Serina's Blog")).toBeInTheDocument()
  })

  it('renders a link to every room and About', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/writing')
    expect(screen.getByRole('link', { name: 'Art' })).toHaveAttribute('href', '/art')
    expect(screen.getByRole('link', { name: 'Code' })).toHaveAttribute('href', '/code')
    expect(screen.getByRole('link', { name: 'Travel & Food' })).toHaveAttribute('href', '/travel')
    expect(screen.getByRole('link', { name: 'Neurodivergent' })).toHaveAttribute('href', '/neurodivergent')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('has no a11y violations', async () => {
    const { container } = renderHeader()
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 8.2: Run the test — confirm failure**

```bash
npx vitest run src/components/Layout/Header.test.tsx
```

Expected: failures on missing `./Header` module.

- [ ] **Step 8.3: Implement `Header`**

Create `src/components/Layout/Header.tsx`:

```tsx
import { Link, NavLink } from 'react-router-dom'
import { ROOMS, ROOM_DISPLAY_NAMES } from '../../lib/types'

export default function Header() {
  return (
    <header>
      <Link to="/">Serina's Blog</Link>
      <nav aria-label="Primary">
        <ul>
          {ROOMS.map(room => (
            <li key={room}>
              <NavLink to={`/${room}`}>{ROOM_DISPLAY_NAMES[room]}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 8.4: Run the test — confirm pass**

```bash
npx vitest run src/components/Layout/Header.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 8.5: Write the Footer test**

Create `src/components/Layout/Footer.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Footer from './Footer'

describe('Footer', () => {
  it('renders a copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© Serina McFall/)).toBeInTheDocument()
  })

  it('renders an RSS link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /RSS/i })).toHaveAttribute('href', '/feed.xml')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Footer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 8.6: Run the test — confirm failure**

```bash
npx vitest run src/components/Layout/Footer.test.tsx
```

- [ ] **Step 8.7: Implement `Footer`**

Create `src/components/Layout/Footer.tsx`:

```tsx
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>© {year} Serina McFall · All rights reserved.</p>
      <p>
        <a href="/feed.xml">RSS</a>
      </p>
    </footer>
  )
}
```

- [ ] **Step 8.8: Run Footer test — confirm pass**

```bash
npx vitest run src/components/Layout/Footer.test.tsx
```

- [ ] **Step 8.9: Implement `Layout` (the shell that wraps `Header` + `Outlet` + `Footer`)**

Create `src/components/Layout/Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 8.10: Commit**

```bash
git add src/components/Layout/
git commit -m "feat: add Layout shell with Header navigation and Footer"
```

---

## Task 9: Wire up routing with placeholder pages

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Create: `src/pages/Home.tsx`
- Create: `src/pages/Room.tsx`
- Create: `src/pages/Post.tsx`
- Create: `src/pages/About.tsx`
- Create: `src/pages/NotFound.tsx`

- [ ] **Step 9.1: Create placeholder `Home`**

Create `src/pages/Home.tsx`:

```tsx
export default function Home() {
  return <h1>Home (placeholder)</h1>
}
```

- [ ] **Step 9.2: Create placeholder `Room`**

Create `src/pages/Room.tsx`:

```tsx
import { useParams } from 'react-router-dom'

export default function Room() {
  const { room } = useParams()
  return <h1>Room: {room} (placeholder)</h1>
}
```

- [ ] **Step 9.3: Create placeholder `Post`**

Create `src/pages/Post.tsx`:

```tsx
import { useParams } from 'react-router-dom'

export default function Post() {
  const { room, slug } = useParams()
  return <h1>Post: {room}/{slug} (placeholder)</h1>
}
```

- [ ] **Step 9.4: Create placeholder `About`**

Create `src/pages/About.tsx`:

```tsx
export default function About() {
  return <h1>About (placeholder)</h1>
}
```

- [ ] **Step 9.5: Create `NotFound`**

Create `src/pages/NotFound.tsx`:

```tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>This page hasn't been written yet.</h1>
      <p>
        <Link to="/">Return home</Link>.
      </p>
    </section>
  )
}
```

- [ ] **Step 9.6: Replace `src/App.tsx` with the router**

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Room from './pages/Room'
import Post from './pages/Post'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/:room" element={<Room />} />
        <Route path="/:room/:slug" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 9.7: Wrap `App` in `BrowserRouter` in `main.tsx`**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 9.8: Verify in the browser**

```bash
npm run dev
```

Open `http://localhost:5173`. Click each nav link. Verify:
- `/` shows "Home (placeholder)"
- `/writing`, `/art`, `/code`, `/travel`, `/neurodivergent` each show "Room: <name> (placeholder)"
- `/about` shows "About (placeholder)"
- `/writing/some-slug` shows "Post: writing/some-slug (placeholder)"
- `/totally-bogus-url` shows the NotFound page

Stop with `Ctrl+C`.

- [ ] **Step 9.9: Commit**

```bash
git add src/
git commit -m "feat: wire React Router with placeholder pages for all routes"
```

---

## Task 10: Home page — Hello component

**Files:**
- Create: `src/components/Home/Hello.tsx`
- Test: `src/components/Home/Hello.test.tsx`

- [ ] **Step 10.1: Write the Hello test**

Create `src/components/Home/Hello.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Hello from './Hello'

describe('Hello', () => {
  it('renders an introduction with Serina\'s name', () => {
    render(<Hello />)
    expect(screen.getByText(/Serina/)).toBeInTheDocument()
  })

  it('describes what the blog is about', () => {
    render(<Hello />)
    expect(screen.getByText(/(making|art|writing|code)/i)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Hello />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 10.2: Implement `Hello`**

Create `src/components/Home/Hello.tsx`:

```tsx
export default function Hello() {
  return (
    <section aria-label="Introduction">
      <h1>Serina's Blog</h1>
      <p>
        Serina here — artist, learner, mother, and curious soul. This is where I share what I'm
        making — art, writing, code I'm learning, places I've wandered to, and bits of what it's
        like inside my neurodivergent brain.
      </p>
    </section>
  )
}
```

(Serina can rewrite the prose later — keeping it generic for v1.)

- [ ] **Step 10.3: Run tests — confirm pass**

```bash
npx vitest run src/components/Home/Hello.test.tsx
```

- [ ] **Step 10.4: Commit**

```bash
git add src/components/Home/
git commit -m "feat: add Hello introduction component for home page"
```

---

## Task 11: Home page — ThisWeek strip (MoodChip, QuoteOfTheWeek, CurrentlyListening)

**Files:**
- Create: `src/components/Home/MoodChip.tsx`
- Create: `src/components/Home/QuoteOfTheWeek.tsx`
- Create: `src/components/Home/CurrentlyListening.tsx`
- Create: `src/components/Home/ThisWeek.tsx`
- Test: `src/components/Home/ThisWeek.test.tsx`

- [ ] **Step 11.1: Write ThisWeek tests**

Create `src/components/Home/ThisWeek.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import ThisWeek from './ThisWeek'
import type { Mood, Quote, ListeningItem } from '../../lib/types'

const mood: Mood = { emoji: '🌸', word: 'calm', updated: '2026-05-12' }
const quote: Quote = {
  author: 'Brené Brown',
  source: 'Dare to Lead',
  body: '\nBRAVING.',
  updated: '2026-05-12',
}
const listening: ListeningItem = {
  title: 'Cherry Blossom Lo-Fi',
  artist: 'Various',
  url: 'https://open.spotify.com/playlist/xyz',
  type: 'playlist',
  updated: '2026-05-12',
}

describe('ThisWeek', () => {
  it('renders mood, quote, and listening when all present', () => {
    render(<ThisWeek mood={mood} quote={quote} listening={listening} />)
    expect(screen.getByText('calm')).toBeInTheDocument()
    expect(screen.getByText(/Brené Brown/)).toBeInTheDocument()
    expect(screen.getByText('Cherry Blossom Lo-Fi')).toBeInTheDocument()
  })

  it('omits missing items gracefully', () => {
    render(<ThisWeek mood={null} quote={quote} listening={null} />)
    expect(screen.queryByText('calm')).not.toBeInTheDocument()
    expect(screen.getByText(/Brené Brown/)).toBeInTheDocument()
  })

  it('links the listening item to its URL', () => {
    render(<ThisWeek mood={null} quote={null} listening={listening} />)
    expect(screen.getByRole('link', { name: /Cherry Blossom Lo-Fi/ })).toHaveAttribute(
      'href',
      listening.url,
    )
  })

  it('has no a11y violations', async () => {
    const { container } = render(<ThisWeek mood={mood} quote={quote} listening={listening} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 11.2: Implement `MoodChip`**

Create `src/components/Home/MoodChip.tsx`:

```tsx
import type { Mood } from '../../lib/types'

interface Props {
  mood: Mood
}

export default function MoodChip({ mood }: Props) {
  return (
    <div aria-label="Today's mood">
      <span aria-hidden="true">{mood.emoji}</span>
      <span>{mood.word}</span>
    </div>
  )
}
```

- [ ] **Step 11.3: Implement `QuoteOfTheWeek`**

Create `src/components/Home/QuoteOfTheWeek.tsx`:

```tsx
import ReactMarkdown from 'react-markdown'
import type { Quote } from '../../lib/types'

interface Props {
  quote: Quote
}

export default function QuoteOfTheWeek({ quote }: Props) {
  return (
    <figure aria-label="Quote of the week">
      <blockquote>
        <ReactMarkdown>{quote.body}</ReactMarkdown>
      </blockquote>
      <figcaption>
        — {quote.author}
        {quote.source && <span>, {quote.source}</span>}
      </figcaption>
    </figure>
  )
}
```

- [ ] **Step 11.4: Implement `CurrentlyListening`**

Create `src/components/Home/CurrentlyListening.tsx`:

```tsx
import type { ListeningItem } from '../../lib/types'

interface Props {
  listening: ListeningItem
}

export default function CurrentlyListening({ listening }: Props) {
  return (
    <div aria-label="Currently listening">
      <span>Listening: </span>
      <a href={listening.url} rel="noopener noreferrer">
        {listening.title}
      </a>
      {listening.artist && <span> · {listening.artist}</span>}
    </div>
  )
}
```

- [ ] **Step 11.5: Implement `ThisWeek`**

Create `src/components/Home/ThisWeek.tsx`:

```tsx
import type { Mood, Quote, ListeningItem } from '../../lib/types'
import MoodChip from './MoodChip'
import QuoteOfTheWeek from './QuoteOfTheWeek'
import CurrentlyListening from './CurrentlyListening'

interface Props {
  mood: Mood | null
  quote: Quote | null
  listening: ListeningItem | null
}

export default function ThisWeek({ mood, quote, listening }: Props) {
  return (
    <section aria-label="This week">
      {mood && <MoodChip mood={mood} />}
      {quote && <QuoteOfTheWeek quote={quote} />}
      {listening && <CurrentlyListening listening={listening} />}
    </section>
  )
}
```

- [ ] **Step 11.6: Run tests — confirm pass**

```bash
npx vitest run src/components/Home/ThisWeek.test.tsx
```

- [ ] **Step 11.7: Commit**

```bash
git add src/components/Home/
git commit -m "feat: add ThisWeek strip with mood, quote, and listening"
```

---

## Task 12: Home page — FeaturedWindow

**Files:**
- Create: `src/components/Home/FeaturedWindow.tsx`
- Test: `src/components/Home/FeaturedWindow.test.tsx`

- [ ] **Step 12.1: Write tests**

Create `src/components/Home/FeaturedWindow.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import FeaturedWindow from './FeaturedWindow'
import type { FeaturedItem } from '../../lib/types'

const item: FeaturedItem = {
  title: 'Moonlight pour',
  image: '/images/featured/moonlight-pour.jpg',
  imageAlt: 'A resin piece with swirling teal',
  link: '/art/moonlight-pour',
  caption: 'Six pours to settle the swirl',
  updated: '2026-05-12',
}

function renderWithRouter(component: React.ReactNode) {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe('FeaturedWindow', () => {
  it('renders title, image with alt text, and caption', () => {
    renderWithRouter(<FeaturedWindow kind="art" item={item} />)
    expect(screen.getByText('Moonlight pour')).toBeInTheDocument()
    expect(screen.getByAltText('A resin piece with swirling teal')).toBeInTheDocument()
    expect(screen.getByText('Six pours to settle the swirl')).toBeInTheDocument()
  })

  it('links to the linked URL when one is provided', () => {
    renderWithRouter(<FeaturedWindow kind="art" item={item} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/art/moonlight-pour')
  })

  it('renders nothing visually when item is null', () => {
    const { container } = renderWithRouter(<FeaturedWindow kind="art" item={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('has no a11y violations', async () => {
    const { container } = renderWithRouter(<FeaturedWindow kind="art" item={item} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 12.2: Implement `FeaturedWindow`**

Create `src/components/Home/FeaturedWindow.tsx`:

```tsx
import { Link } from 'react-router-dom'
import type { FeaturedItem } from '../../lib/types'

interface Props {
  kind: 'art' | 'writing' | 'travel'
  item: FeaturedItem | null
}

export default function FeaturedWindow({ kind, item }: Props) {
  if (!item) return null
  const inner = (
    <article aria-label={`Featured ${kind}: ${item.title}`}>
      <img src={item.image} alt={item.imageAlt} />
      <h3>{item.title}</h3>
      <p>{item.caption}</p>
    </article>
  )
  return item.link ? <Link to={item.link}>{inner}</Link> : inner
}
```

- [ ] **Step 12.3: Run tests — confirm pass**

```bash
npx vitest run src/components/Home/FeaturedWindow.test.tsx
```

- [ ] **Step 12.4: Commit**

```bash
git add src/components/Home/
git commit -m "feat: add FeaturedWindow component for home-page featured pieces"
```

---

## Task 13: Home page — RoomList and full Home composition

**Files:**
- Create: `src/components/Home/RoomList.tsx`
- Test: `src/components/Home/RoomList.test.tsx`
- Modify: `src/pages/Home.tsx`
- Test: `src/pages/Home.test.tsx`

- [ ] **Step 13.1: Write RoomList tests**

Create `src/components/Home/RoomList.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import RoomList from './RoomList'

describe('RoomList', () => {
  function renderRoomList() {
    return render(
      <MemoryRouter>
        <RoomList />
      </MemoryRouter>,
    )
  }

  it('lists all five rooms', () => {
    renderRoomList()
    expect(screen.getByRole('link', { name: /Writing/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Art/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Code/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Travel & Food/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Neurodivergent/ })).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderRoomList()
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 13.2: Implement `RoomList`**

Create `src/components/Home/RoomList.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { ROOMS, ROOM_DISPLAY_NAMES } from '../../lib/types'

export default function RoomList() {
  return (
    <nav aria-label="Rooms">
      <h2>Wander into a room</h2>
      <ul>
        {ROOMS.map(room => (
          <li key={room}>
            <Link to={`/${room}`}>{ROOM_DISPLAY_NAMES[room]}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 13.3: Compose the Home page**

Replace `src/pages/Home.tsx`:

```tsx
import Hello from '../components/Home/Hello'
import ThisWeek from '../components/Home/ThisWeek'
import FeaturedWindow from '../components/Home/FeaturedWindow'
import RoomList from '../components/Home/RoomList'
import { getMood, getQuote, getListening, getFeatured } from '../lib/content'

export default function Home() {
  const mood = getMood()
  const quote = getQuote()
  const listening = getListening()
  const featuredArt = getFeatured('art')
  const featuredWriting = getFeatured('writing')
  const featuredTravel = getFeatured('travel')

  return (
    <>
      <Hello />
      <ThisWeek mood={mood} quote={quote} listening={listening} />
      <section aria-label="Featured this week">
        <FeaturedWindow kind="art" item={featuredArt} />
        <FeaturedWindow kind="writing" item={featuredWriting} />
        <FeaturedWindow kind="travel" item={featuredTravel} />
      </section>
      <RoomList />
    </>
  )
}
```

- [ ] **Step 13.4: Write a Home snapshot + a11y test**

Create `src/pages/Home.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Home from './Home'

describe('Home', () => {
  it('renders without crashing and has no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(container).toMatchSnapshot()
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 13.5: Run all tests**

```bash
npm test
```

Expected: every test passes. A snapshot file is created the first run.

- [ ] **Step 13.6: Commit**

```bash
git add src/
git commit -m "feat: compose Home page with Hello, ThisWeek, featured windows, and RoomList"
```

---

## Task 14: Room page (RoomHeader + RoomTeaser + UniverseDoor)

**Files:**
- Create: `src/components/Room/RoomHeader.tsx`
- Create: `src/components/Room/RoomTeaser.tsx`
- Create: `src/components/Room/UniverseDoor.tsx`
- Modify: `src/pages/Room.tsx`
- Test: `src/pages/Room.test.tsx`

- [ ] **Step 14.1: Implement `RoomHeader`**

Create `src/components/Room/RoomHeader.tsx`:

```tsx
import type { Room } from '../../lib/types'
import { ROOM_DISPLAY_NAMES } from '../../lib/types'

const DESCRIPTIONS: Record<Room, string> = {
  writing: 'Stories in progress, drafts, and notes from inside the work.',
  art: 'Resin, diamond art, digital, and the experiments in between.',
  code: 'What I am learning as a Dev Academy student — wins, stumbles, what surprised me.',
  travel: 'Places I have been, things I have eaten, and what stayed with me.',
  neurodivergent: 'Notes from an AuDHD brain. The hard days and the bright ones.',
}

interface Props {
  room: Room
}

export default function RoomHeader({ room }: Props) {
  return (
    <header>
      <h1>{ROOM_DISPLAY_NAMES[room]}</h1>
      <p>{DESCRIPTIONS[room]}</p>
    </header>
  )
}
```

- [ ] **Step 14.2: Implement `RoomTeaser`**

Create `src/components/Room/RoomTeaser.tsx`:

```tsx
import { Link } from 'react-router-dom'
import type { Post } from '../../lib/types'

interface Props {
  post: Post
}

export default function RoomTeaser({ post }: Props) {
  return (
    <article>
      <h2>
        <Link to={`/${post.room}/${post.slug}`}>{post.title}</Link>
      </h2>
      <time dateTime={post.date}>{post.date}</time>
      <p>{post.excerpt}</p>
    </article>
  )
}
```

- [ ] **Step 14.3: Implement `UniverseDoor`**

Create `src/components/Room/UniverseDoor.tsx`:

```tsx
export default function UniverseDoor() {
  return (
    <aside aria-label="Where Petals Fall — the universe">
      <h2>Step into the Where Petals Fall universe</h2>
      <p>
        A larger world beyond this room — the world the writing lives inside. You are leaving the
        blog and entering the world bible.
      </p>
      <p>
        <a href="https://serinas-universe.example.com" rel="external">
          Open the universe →
        </a>
      </p>
    </aside>
  )
}
```

(URL is a placeholder — replace with real `serinas-universe` deployed URL when ready.)

- [ ] **Step 14.4: Write Room tests**

Create `src/pages/Room.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Room from './Room'
import * as content from '../lib/content'
import type { Post } from '../lib/types'

const postFixture: Post = {
  room: 'writing',
  slug: 'finding-my-voice',
  title: 'Finding my voice',
  date: '2026-05-15',
  excerpt: 'Notes from the first week.',
  body: 'body',
  draft: false,
}

function renderRoom(roomPath: string) {
  return render(
    <MemoryRouter initialEntries={[roomPath]}>
      <Routes>
        <Route path="/:room" element={<Room />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Room', () => {
  beforeEach(() => {
    vi.spyOn(content, 'getPostsByRoom').mockReturnValue([postFixture])
  })

  it('renders the room header and a teaser for each post', () => {
    renderRoom('/writing')
    expect(screen.getByText('Writing')).toBeInTheDocument()
    expect(screen.getByText('Finding my voice')).toBeInTheDocument()
  })

  it('shows the UniverseDoor on the writing room only', () => {
    renderRoom('/writing')
    expect(screen.getByText(/Step into the Where Petals Fall universe/)).toBeInTheDocument()
  })

  it('does not show the UniverseDoor on the art room', () => {
    renderRoom('/art')
    expect(screen.queryByText(/Where Petals Fall universe/)).not.toBeInTheDocument()
  })

  it('renders NotFound for an unknown room', () => {
    renderRoom('/unknown')
    expect(screen.getByText(/hasn't been written yet/i)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderRoom('/writing')
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 14.5: Implement `Room` page**

Replace `src/pages/Room.tsx`:

```tsx
import { useParams } from 'react-router-dom'
import { ROOMS } from '../lib/types'
import type { Room as RoomType } from '../lib/types'
import { getPostsByRoom } from '../lib/content'
import RoomHeader from '../components/Room/RoomHeader'
import RoomTeaser from '../components/Room/RoomTeaser'
import UniverseDoor from '../components/Room/UniverseDoor'
import NotFound from './NotFound'

export default function Room() {
  const { room } = useParams<{ room: string }>()

  if (!room || !ROOMS.includes(room as RoomType)) {
    return <NotFound />
  }

  const roomTyped = room as RoomType
  const posts = getPostsByRoom(roomTyped)

  return (
    <>
      <RoomHeader room={roomTyped} />
      <ol aria-label={`Posts in ${roomTyped}`}>
        {posts.map(post => (
          <li key={post.slug}>
            <RoomTeaser post={post} />
          </li>
        ))}
      </ol>
      {roomTyped === 'writing' && <UniverseDoor />}
    </>
  )
}
```

- [ ] **Step 14.6: Run tests — confirm pass**

```bash
npm test
```

- [ ] **Step 14.7: Commit**

```bash
git add src/
git commit -m "feat: implement Room page with header, teasers, and writing-room universe door"
```

---

## Task 15: Post page (PostHeader + Markdown rendering)

**Files:**
- Create: `src/components/Post/PostHeader.tsx`
- Create: `src/components/Post/Markdown.tsx`
- Modify: `src/pages/Post.tsx`
- Test: `src/pages/Post.test.tsx`

- [ ] **Step 15.1: Implement `PostHeader`**

Create `src/components/Post/PostHeader.tsx`:

```tsx
import { Link } from 'react-router-dom'
import type { Post } from '../../lib/types'
import { ROOM_DISPLAY_NAMES } from '../../lib/types'

interface Props {
  post: Post
}

export default function PostHeader({ post }: Props) {
  return (
    <header>
      <p>
        <Link to={`/${post.room}`}>← {ROOM_DISPLAY_NAMES[post.room]}</Link>
      </p>
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{post.date}</time>
    </header>
  )
}
```

- [ ] **Step 15.2: Implement `Markdown` wrapper**

Create `src/components/Post/Markdown.tsx`:

```tsx
import ReactMarkdown from 'react-markdown'

interface Props {
  children: string
}

export default function Markdown({ children }: Props) {
  return (
    <div className="prose">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  )
}
```

- [ ] **Step 15.3: Write Post tests**

Create `src/pages/Post.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Post from './Post'
import * as content from '../lib/content'
import type { Post as PostType } from '../lib/types'

const postFixture: PostType = {
  room: 'art',
  slug: 'moonlight-pour',
  title: 'Moonlight pour',
  date: '2026-05-15',
  excerpt: 'Excerpt.',
  body: '## A subheading\n\nBody paragraph.',
  draft: false,
}

function renderPost(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:room/:slug" element={<Post />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Post', () => {
  beforeEach(() => {
    vi.spyOn(content, 'getPost').mockImplementation((room, slug) =>
      room === 'art' && slug === 'moonlight-pour' ? postFixture : undefined,
    )
  })

  it('renders the post header and rendered markdown body', () => {
    renderPost('/art/moonlight-pour')
    expect(screen.getByRole('heading', { level: 1, name: 'Moonlight pour' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'A subheading' })).toBeInTheDocument()
    expect(screen.getByText('Body paragraph.')).toBeInTheDocument()
  })

  it('renders NotFound when post is missing', () => {
    renderPost('/art/does-not-exist')
    expect(screen.getByText(/hasn't been written yet/i)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderPost('/art/moonlight-pour')
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 15.4: Implement `Post` page**

Replace `src/pages/Post.tsx`:

```tsx
import { useParams } from 'react-router-dom'
import { ROOMS } from '../lib/types'
import type { Room as RoomType } from '../lib/types'
import { getPost } from '../lib/content'
import PostHeader from '../components/Post/PostHeader'
import Markdown from '../components/Post/Markdown'
import NotFound from './NotFound'

export default function Post() {
  const { room, slug } = useParams<{ room: string; slug: string }>()

  if (!room || !slug || !ROOMS.includes(room as RoomType)) {
    return <NotFound />
  }

  const post = getPost(room as RoomType, slug)
  if (!post) return <NotFound />

  return (
    <article>
      <PostHeader post={post} />
      <Markdown>{post.body}</Markdown>
    </article>
  )
}
```

- [ ] **Step 15.5: Run tests — confirm pass**

```bash
npm test
```

- [ ] **Step 15.6: Commit**

```bash
git add src/
git commit -m "feat: implement Post page with header and rendered markdown body"
```

---

## Task 16: About page (Bio + UsagePolicy + ContactPlaceholder)

**Files:**
- Create: `src/components/About/Bio.tsx`
- Create: `src/components/About/UsagePolicy.tsx`
- Create: `src/components/About/ContactPlaceholder.tsx`
- Modify: `src/pages/About.tsx`
- Test: `src/pages/About.test.tsx`

- [ ] **Step 16.1: Implement `Bio`**

Create `src/components/About/Bio.tsx`:

```tsx
export default function Bio() {
  return (
    <section aria-labelledby="bio-heading">
      <h1 id="bio-heading">About</h1>
      <p>
        Serina. Artist, learner, mother. Originally from Canada, living in New Zealand.
      </p>
      <p>
        I make art across mediums — resin, diamond art, digital, acrylic, watercolour. I'm a
        Dev Academy student learning to code. I'm autistic and ADHD, and that's part of what
        I share here.
      </p>
      <p>
        This blog is a quiet place to share what I'm making and where I've been. There are no
        comments, no newsletter, no popups. If something here meant something to you, that's
        enough.
      </p>
    </section>
  )
}
```

- [ ] **Step 16.2: Implement `UsagePolicy`**

Create `src/components/About/UsagePolicy.tsx`:

```tsx
export default function UsagePolicy() {
  return (
    <section aria-labelledby="usage-policy-heading" id="usage-policy">
      <h2 id="usage-policy-heading">Using my art</h2>
      <p>
        All artwork on this site is © Serina McFall, all rights reserved.
      </p>
      <p>
        I'm not against my work being used — but please ask first. If you'd like to use a
        piece, message me. I decide case by case: sometimes free use, sometimes a small
        licensing fee, occasionally no.
      </p>
      <p>
        No commercial use, no AI training, and no redistribution are granted by default.
      </p>
    </section>
  )
}
```

- [ ] **Step 16.3: Implement `ContactPlaceholder`**

Create `src/components/About/ContactPlaceholder.tsx`:

```tsx
export default function ContactPlaceholder() {
  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">Reaching me</h2>
      <p>
        A direct contact channel is coming soon. If you'd like to ask about using a piece of
        my work in the meantime, please hold on — I'm working out the calmest way to make
        that conversation possible.
      </p>
    </section>
  )
}
```

- [ ] **Step 16.4: Write About tests**

Create `src/pages/About.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import About from './About'

describe('About', () => {
  it('renders bio, usage policy, and contact placeholder', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Using my art/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Reaching me/ })).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

- [ ] **Step 16.5: Implement `About` page**

Replace `src/pages/About.tsx`:

```tsx
import Bio from '../components/About/Bio'
import UsagePolicy from '../components/About/UsagePolicy'
import ContactPlaceholder from '../components/About/ContactPlaceholder'

export default function About() {
  return (
    <>
      <Bio />
      <UsagePolicy />
      <ContactPlaceholder />
    </>
  )
}
```

- [ ] **Step 16.6: Run tests**

```bash
npm test
```

- [ ] **Step 16.7: Commit**

```bash
git add src/
git commit -m "feat: implement About page with bio, usage policy, and contact placeholder"
```

---

## Task 17: robots.txt and meta tags (AI crawler opt-out)

**Files:**
- Create: `public/robots.txt`
- Modify: `index.html`

- [ ] **Step 17.1: Create `public/robots.txt`**

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

User-agent: PerplexityBot
Disallow: /

User-agent: Omgilibot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: ImagesiftBot
Disallow: /

User-agent: cohere-ai
Disallow: /
```

- [ ] **Step 17.2: Add meta tags to `index.html`**

In `index.html`, inside `<head>`, after the existing `<meta>` tags, add:

```html
<meta name="robots" content="noai, noimageai" />
<meta name="copyright" content="© Serina McFall, all rights reserved" />
<meta name="description" content="Serina's Blog — art, writing, code, travel, and notes from a neurodivergent brain." />
```

Also update the `<title>` to `Serina's Blog`.

- [ ] **Step 17.3: Commit**

```bash
git add public/robots.txt index.html
git commit -m "feat: add robots.txt and meta tags opting out of AI training crawlers"
```

---

## Task 18: vercel.json — hot-link prevention

**Files:**
- Create: `vercel.json`

- [ ] **Step 18.1: Create `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "redirects": [
    {
      "source": "/images/(.*)",
      "has": [
        {
          "type": "header",
          "key": "referer",
          "value": "(?!https://(serinas-blog\\.vercel\\.app|localhost)/.*).*"
        }
      ],
      "destination": "/images/placeholder.jpg"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

(When a custom domain is added, include it in the regex alternatives.)

- [ ] **Step 18.2: Add a placeholder image**

Place a small `placeholder.jpg` at `public/images/placeholder.jpg`. (Use any small, visibly-marked "Where Petals Fall" image — Serina can replace later.) For now, create a minimal stand-in with a tiny generator or copy an existing image she's comfortable with.

Until Serina supplies a real one, a 1×1 transparent PNG renamed to `placeholder.jpg` will pass the build. Document this clearly:

Create `public/images/.placeholder-note.md`:

```markdown
Replace `placeholder.jpg` with a small, watermarked "see this image on Serina's Blog" placeholder before launch.
```

- [ ] **Step 18.3: Commit**

```bash
git add vercel.json public/images/
git commit -m "feat: add vercel.json with hot-link prevention and security headers"
```

---

## Task 19: RSS feed generator (build-time)

**Files:**
- Create: `scripts/generate-rss.ts`
- Modify: `package.json` (add a `build` script that runs RSS gen + Vite build)
- Modify: `tsconfig.node.json` (include `scripts/`)

- [ ] **Step 19.1: Install Node dependencies for the script**

```bash
npm install -D tsx
```

- [ ] **Step 19.2: Create `scripts/generate-rss.ts`**

```typescript
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const POSTS_DIR = join(ROOT, 'content', 'posts')
const PUBLIC_DIR = join(ROOT, 'public')
const ROOMS = ['writing', 'art', 'code', 'travel', 'neurodivergent'] as const
const SITE_URL = process.env.SITE_URL ?? 'https://serinas-blog.vercel.app'
const SITE_TITLE = "Serina's Blog"
const SITE_DESCRIPTION = 'Art, writing, code, travel, and notes from a neurodivergent brain.'

interface PostMeta {
  room: string
  slug: string
  title: string
  date: string
  excerpt: string
}

function collectPosts(): PostMeta[] {
  const posts: PostMeta[] = []
  for (const room of ROOMS) {
    const roomPath = join(POSTS_DIR, room)
    if (!existsSync(roomPath)) continue
    for (const slug of readdirSync(roomPath)) {
      const indexPath = join(roomPath, slug, 'index.md')
      if (!existsSync(indexPath)) continue
      const raw = readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(raw)
      if (data.draft === true) continue
      const excerpt =
        typeof data.excerpt === 'string'
          ? data.excerpt
          : content.trim().split('\n\n')[0] ?? ''
      posts.push({
        room,
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ''),
        excerpt,
      })
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildXml(posts: PostMeta[]): string {
  const items = posts
    .map(
      p => `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE_URL}/${p.room}/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${p.room}/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape(p.excerpt)}</description>
    </item>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escape(SITE_DESCRIPTION)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
}

const posts = collectPosts()
const xml = buildXml(posts)
if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true })
writeFileSync(join(PUBLIC_DIR, 'feed.xml'), xml, 'utf-8')
console.log(`Wrote feed.xml with ${posts.length} post(s).`)
```

- [ ] **Step 19.3: Update `package.json` `build` script to run RSS generation first**

In `package.json` `scripts`:

```json
"prebuild": "tsx scripts/generate-rss.ts",
"build": "tsc -b && vite build"
```

(`prebuild` runs automatically before `build`.)

- [ ] **Step 19.4: Verify locally**

```bash
npm run build
```

Expected: console shows "Wrote feed.xml with 0 post(s)." (or N if sample content exists), then `tsc` + `vite build` complete without errors. A `public/feed.xml` exists.

- [ ] **Step 19.5: Commit**

```bash
git add scripts/ package.json package-lock.json
git commit -m "feat: generate RSS feed at build time from markdown posts"
```

---

## Task 20: Visual design pass — palette, typography, base styles

**Files:**
- Modify: `src/index.css`
- Create: `src/styles/tokens.css`

This pass sets the global aesthetic — muted teals and dusty pinks, dyslexia-aware sans-serif body type, generous spacing. **Decision points within this task are intentionally inline** so the visual choice is captured alongside the code.

- [ ] **Step 20.1: Create design tokens at `src/styles/tokens.css`**

```css
:root {
  /* Palette — xianxia meets watercolour, muted not oppressive */
  --color-bg: #1b3a4b;           /* deep teal night */
  --color-bg-elevated: #244a5e;
  --color-text: #f5ede0;          /* warm cream */
  --color-text-muted: #c9bfae;
  --color-accent: #d8a7b1;        /* dusty pink */
  --color-accent-strong: #c08591;
  --color-link: #f5d6a0;          /* warm gold */
  --color-link-hover: #ffe5b8;
  --color-border: #2f5d75;

  /* Type — dyslexia-aware: sans-serif, generous line-height */
  --font-body: 'Atkinson Hyperlegible', 'Inter', system-ui, sans-serif;
  --font-display: 'Atkinson Hyperlegible', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Scale */
  --size-step-0: 1rem;
  --size-step-1: 1.25rem;
  --size-step-2: 1.6rem;
  --size-step-3: 2rem;
  --size-step-4: 2.6rem;

  /* Spacing scale */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;

  /* Line height — dyslexia-aware ≥ 1.6 */
  --line-body: 1.65;
  --line-display: 1.2;

  /* Max content width — comfortable line length on phones and desktop */
  --measure: 66ch;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 20.2: Replace `src/index.css` with base styles**

```css
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');
@import './styles/tokens.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background: var(--color-bg);
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  font-size: var(--size-step-0);
  line-height: var(--line-body);
  color: var(--color-text);
  background: var(--color-bg);
}

main {
  max-width: var(--measure);
  margin: 0 auto;
  padding: var(--space-3) var(--space-2);
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  line-height: var(--line-display);
  margin-block: var(--space-3) var(--space-2);
}

h1 {
  font-size: var(--size-step-4);
}
h2 {
  font-size: var(--size-step-3);
}
h3 {
  font-size: var(--size-step-2);
}

a {
  color: var(--color-link);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

a:hover,
a:focus-visible {
  color: var(--color-link-hover);
}

a:focus-visible {
  outline: 2px solid var(--color-link-hover);
  outline-offset: 3px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

header[role='banner'],
header:first-of-type {
  padding: var(--space-2);
  border-bottom: 1px solid var(--color-border);
}

header nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

footer {
  margin-top: var(--space-5);
  padding: var(--space-3) var(--space-2);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  text-align: center;
}
```

- [ ] **Step 20.3: Verify in the browser**

```bash
npm run dev
```

Open `http://localhost:5173`. Check:
- Background is calm deep teal, text is warm cream.
- Headings use Atkinson Hyperlegible.
- Links are warm gold and have an underline.
- Focus ring appears when tabbing through links.
- No animations on page change.

Stop with `Ctrl+C`.

- [ ] **Step 20.4: Run tests**

```bash
npm test
```

Snapshots may need updating once after this visual change:

```bash
npm test -- -u
```

(Re-run `npm test` to confirm green.)

- [ ] **Step 20.5: Commit**

```bash
git add src/
git commit -m "style: add design tokens and base palette (muted teal + dusty pink + Atkinson Hyperlegible)"
```

---

## Task 21: Sample content to make the site real

**Files:**
- Create: `content/now/mood.md`, `content/now/quote.md`, `content/now/listening.md`
- Create: `content/featured/art.md`, `content/featured/writing.md`, `content/featured/travel.md`
- Create: one sample post per room (`content/posts/<room>/hello-from-this-room/index.md`)
- Add: any placeholder images Serina is comfortable with (or use a single shared `placeholder.jpg`)

- [ ] **Step 21.1: Create the "this week" files**

`content/now/mood.md`:

```markdown
---
emoji: "🌸"
word: "calm"
updated: 2026-05-12
---
```

`content/now/quote.md`:

```markdown
---
author: "Brené Brown"
source: "Dare to Lead"
updated: 2026-05-12
---

Boundaries · Reliability · Accountability · Vault · Integrity · Non-judgment · Generosity.

— BRAVING
```

`content/now/listening.md`:

```markdown
---
title: "Cherry Blossom Lo-Fi"
artist: "Various"
url: "https://open.spotify.com/playlist/replace-with-real-url"
type: "playlist"
updated: 2026-05-12
---
```

- [ ] **Step 21.2: Create three placeholder featured files**

`content/featured/art.md`:

```markdown
---
title: "Moonlight pour"
image: "/images/featured/moonlight-pour.jpg"
imageAlt: "A resin piece with swirling teal and pearlescent white"
link: "/art/hello-from-this-room"
caption: "Six pours to settle the swirl."
updated: 2026-05-12
---
```

`content/featured/writing.md`:

```markdown
---
title: "From a story in progress"
image: "/images/featured/writing-snippet.jpg"
imageAlt: "An open notebook on a wooden desk"
link: "/writing/hello-from-this-room"
caption: "The first line of something larger."
updated: 2026-05-12
---
```

`content/featured/travel.md`:

```markdown
---
title: "Wellington harbour at dawn"
image: "/images/featured/wellington-dawn.jpg"
imageAlt: "Calm water reflecting pink-violet sky"
link: "/travel/hello-from-this-room"
caption: "I forgot how quiet the city is at five am."
updated: 2026-05-12
---
```

- [ ] **Step 21.3: Create one sample post in each room**

For each room in `writing`, `art`, `code`, `travel`, `neurodivergent`, create `content/posts/<room>/hello-from-this-room/index.md`:

```markdown
---
title: "Hello from this room"
date: 2026-05-12
excerpt: "A first post to make this room real."
draft: false
---

This is the first post in this room. Future posts will replace it.

You can write in markdown — **bold**, *italic* (sparingly), [links](https://example.com), and `inline code`.

## A subheading

Lists, too:

- one
- two
- three
```

(Repeat for all five rooms — same content for now; Serina will replace.)

- [ ] **Step 21.4: Verify locally**

```bash
npm run dev
```

Open `/`, the rooms, and one post in each. Confirm everything renders. Featured images will show broken icons until real images are added — that's fine.

```bash
npm run build
```

Expected: clean build, `feed.xml` has 5 entries.

- [ ] **Step 21.5: Run all tests**

```bash
npm test
```

- [ ] **Step 21.6: Commit**

```bash
git add content/
git commit -m "feat: add initial sample content (now-strip, featured items, one post per room)"
```

---

## Task 22: Deploy to Vercel

**Files:**
- (Vercel project settings, not files)

- [ ] **Step 22.1: Create the GitHub repository**

In the browser, go to `https://github.com/new`. Create a new repository named `serinas-blog`, owned by Serina's account, public or private as she prefers. **Do not** initialise with a README, .gitignore, or licence — the local repo already has those.

- [ ] **Step 22.2: Add the remote and push**

```bash
git remote add origin git@github.com:serina-mcfall/serinas-blog.git
git push -u origin main
```

(Replace `serina-mcfall` if her GitHub username differs.)

- [ ] **Step 22.3: Import the repo to Vercel**

In the browser, go to `https://vercel.com/new`. Sign in with GitHub if not already. Click "Import" on the `serinas-blog` repository.

Settings:
- Framework Preset: **Vite**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `dist` (auto-detected)
- Install Command: `npm install` (auto-detected)
- Environment Variable: add `SITE_URL` with the value Vercel will assign (initially `https://serinas-blog.vercel.app` — you can update this after the first deploy if Vercel assigns a different host).

Click **Deploy**.

- [ ] **Step 22.4: Verify the live deploy**

After build completes (~1–2 minutes), open the assigned URL. Walk through:
- Home renders with all sections
- Each room renders with one post
- Each post renders
- About renders
- `/feed.xml` returns valid RSS

- [ ] **Step 22.5: Smoke-check the protection layer**

In the browser dev tools, request `/images/featured/moonlight-pour.jpg` directly (paste the full URL) — it should load. Then try embedding it from a different host (e.g. an HTML file on `localhost:8080`) — it should serve the placeholder, not the asset.

- [ ] **Step 22.6: First-deploy commit (no code change, just a marker)**

```bash
git commit --allow-empty -m "chore: first Vercel deploy live"
git push
```

---

## Done

v1 of Serina's Blog is live.

Next things to schedule for v1.x and v2:
- **v1.x:** replace placeholder featured images with watermarked real pieces; replace sample posts with real first posts; pick a final user-facing name and (if desired) a custom domain.
- **v2:** build the heart-reactions backend (Dev Academy Unit 04 territory); design and wire the real contact channel.

---

## Self-review notes

- Spec coverage check:
  - Stack (spec §2) → Task 1, 2, 3.
  - Project layout (spec §3) → Tasks 1, 8, 9, 17, 18, 19, 20, 21.
  - Content model (spec §4) → Tasks 4–7, 21.
  - Routing (spec §5) → Task 9.
  - Component architecture (spec §6) → Tasks 8, 10–16.
  - Data flow (spec §7) → Tasks 5–7, 13.
  - Image handling & protection (spec §8) → Tasks 17, 18.
  - Hosting & deployment (spec §9) → Task 22.
  - Testing (spec §10) → embedded throughout (every component task has tests).
  - v1 scope & known gaps (spec §11) → no tasks for hearts/contact (deferred); other open items captured in v1.x notes.
- No placeholders or `TBD` remain in implementation steps.
- Type names match between tasks (`Post`, `Room`, `Mood`, `Quote`, `ListeningItem`, `FeaturedItem`).
- Function names are consistent across tasks (`parsePost`, `sortAndFilter`, `getAllPosts`, `getPostsByRoom`, `getPost`, `parseMood`, `parseQuote`, `parseListening`, `parseFeatured`, `getMood`, `getQuote`, `getListening`, `getFeatured`).
