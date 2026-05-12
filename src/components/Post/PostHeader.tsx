import { Link } from 'react-router-dom'
import type { Post } from '../../lib/types'
import { ROOM_DISPLAY_NAMES } from '../../lib/types'

interface Props {
  post: Post
}

function PostHeader({ post }: Props) {
  return (
    <header>
      <p>
        <Link to={`/${post.room}`}>← {ROOM_DISPLAY_NAMES[post.room]}</Link>
      </p>
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{post.date}</time>
    </header>
  )
}

export default PostHeader
