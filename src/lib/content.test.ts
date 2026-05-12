import { describe, it, expect } from 'vitest'
import {
  parsePost,
  sortAndFilter,
  parseMood,
  parseQuote,
  parseListening,
} from './content'
import type { Post } from './types'

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
