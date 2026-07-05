export type Room = 'writing' | 'art' | 'code' | 'travel' | 'neurodivergent'

export const ROOMS: Room[] = [
  'writing',
  'art',
  'code',
  'travel',
  'neurodivergent',
]

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

export interface RoomMeta {
  description: string
  cta: string
}

export const ROOM_META: Record<Room, RoomMeta> = {
  writing: {
    description: 'Stories, Half-finished and finished.',
    cta: 'Wander into the world of words.',
  },
  art: {
    description: 'Resin, ink and other creative endevours.',
    cta: 'Wonder into the world of colour and form.',
  },
  code: {
    description:
      'Code, scripts and other digital curiosities that drive my mind and my work.',
    cta: 'Wonder into the world of code and logic where a nurodivergent mind thrives.',
  },
  travel: {
    description: 'Journeys, experiences and the stories that come with them.',
    cta: 'Explore the world through my eyes.',
  },
  neurodivergent: {
    description:
      'Thoughts, experiences and perspectives unique to the neurodivergent mind of a software developer.',
    cta: 'Discover the world through a neurodivergent lens.',
  },
}
