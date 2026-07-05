import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import './room-gallery.css'

export interface RoomCard {
  id: string
  title: string
  description: string
  to: string
  cta?: string
  image?: string
  imageAlt?: string
}

export interface RoomGalleryProps {
  title?: string
  description?: string
  items: RoomCard[]
}

// Compact tiles modelled on the vixenz-portfolio CaseStudyTile, remapped to the
// blog's misty palette: an eyebrow ordinal, a modest-sized title (so long single
// words like "Neurodivergent" never overflow), and a blurb. The whole tile is the
// link; the first tile is "featured" with a soft left accent bar.
export function RoomGallery({ title, description, items }: RoomGalleryProps) {
  return (
    <section className="mx-auto max-w-5xl px-4">
      {(title || description) && (
        <div className="mb-8 flex flex-col gap-2">
          {title && <h2 className="font-semibold">{title}</h2>}
          {description && (
            <p className="max-w-lg text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              to={item.to}
              className={cn('room-tile', index === 0 && 'room-tile--featured')}
            >
              <span className="room-tile__ord">
                ROOM · {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="room-tile__title">{item.title}</h3>
              <p className="room-tile__blurb">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
