import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const POSTS_DIR = join(ROOT, 'content', 'posts')
const PUBLIC_DIR = join(ROOT, 'public')
const ROOMS = ['writing', 'art', 'code', 'travel', 'neurodivergent'] as const
const SITE_URL = process.env.SITE_URL ?? 'https://serinas-blog.vercel.app'
const SITE_TITLE = "Serina's Blog"
const SITE_DESCRIPTION =
  'Art, writing, code, travel, and notes from a neurodivergent brain.'

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
          : (content.trim().split('\n\n')[0] ?? '')
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
