import { Link } from 'react-router-dom'
import type { Post } from '../../lib/types'

interface Props {
  post: Post
}

function RoomTeaser({ post }: Props) {
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

export default RoomTeaser
