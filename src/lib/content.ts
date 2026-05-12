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

function firstParagraph(body: string): string {
  const trimmed = body.trim()
  const firstBreak = trimmed.indexOf('\n\n')
  return firstBreak === -1 ? trimmed : trimmed.slice(0, firstBreak)
}
