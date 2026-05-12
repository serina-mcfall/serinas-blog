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
    date: normaliseDate(data.date),
    excerpt,
    image: typeof data.image === 'string' ? data.image : undefined,
    imageAlt: typeof data.imageAlt === 'string' ? data.imageAlt : undefined,
    body: content,
    draft: data.draft === true,
  }
}

function normaliseDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

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

export function parseMood(raw: string): Mood {
  const { data } = matter(raw)
  return {
    emoji: String(data.emoji ?? ''),
    word: String(data.word ?? ''),
    updated: normaliseDate(data.updated),
  }
}

export function parseQuote(raw: string): Quote {
  const { data, content } = matter(raw)
  return {
    author: String(data.author ?? ''),
    source: typeof data.source === 'string' ? data.source : undefined,
    body: content,
    updated: normaliseDate(data.updated),
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
    updated: normaliseDate(data.updated),
  }
}

const moodRaw = import.meta.glob('/content/now/mood.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const quoteRaw = import.meta.glob('/content/now/quote.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const listeningRaw = import.meta.glob('/content/now/listening.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

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

export function parseFeatured(raw: string): FeaturedItem {
  const { data } = matter(raw)
  return {
    title: String(data.title ?? ''),
    image: String(data.image ?? ''),
    imageAlt: String(data.imageAlt ?? ''),
    link: typeof data.link === 'string' ? data.link : undefined,
    caption: String(data.caption ?? ''),
    updated: normaliseDate(data.updated),
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

function firstParagraph(body: string): string {
  const trimmed = body.trim()
  const firstBreak = trimmed.indexOf('\n\n')
  return firstBreak === -1 ? trimmed : trimmed.slice(0, firstBreak)
}
