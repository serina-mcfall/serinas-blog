import { RoomGallery, type RoomCard } from './room-gallery'

// Serina's five rooms as door-cards — descriptions in her voice, CTAs that invite
// rather than sell.
const items: RoomCard[] = [
  {
    id: 'writing',
    title: 'Writing',
    description: 'Stories, half-finished and finished.',
    to: '/writing',
    cta: 'Wander in',
  },
  {
    id: 'art',
    title: 'Art',
    description: 'Resin, ink, and whatever else I end up pouring.',
    to: '/art',
    cta: 'Take a look',
  },
  {
    id: 'code',
    title: 'Code',
    description: "What I'm learning to build, in the open.",
    to: '/code',
    cta: 'Peek inside',
  },
  {
    id: 'travel',
    title: 'Travel & Food',
    description: 'Places I went, and the things I ate there.',
    to: '/travel',
    cta: 'Come along',
  },
  {
    id: 'neurodivergent',
    title: 'Neurodivergent',
    description: 'Writing about being AuDHD — plainly, not euphemised.',
    to: '/neurodivergent',
    cta: 'Read along',
  },
]

export default function RoomGalleryDemo() {
  return (
    <RoomGallery
      title="The rooms"
      description="Five spaces to wander into — pick whichever calls to you."
      items={items}
    />
  )
}
