import { Link } from 'react-router-dom'
import type { FeaturedItem } from '../../lib/types'

interface Props {
  kind: 'art' | 'writing' | 'travel'
  item: FeaturedItem | null
}

function FeaturedWindow({ kind, item }: Props) {
  if (!item) return null
  return (
    <article aria-label={`Featured ${kind}`}>
      <h3>{item.title}</h3>
      <img src={item.image} alt={item.imageAlt} />
      <p>{item.caption}</p>
      {item.link && <Link to={item.link}>View more →</Link>}
    </article>
  )
}

export default FeaturedWindow
