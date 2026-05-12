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
  date: string
  excerpt: string
  image?: string
  imageAlt?: string
  body: string
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
  body: string
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
