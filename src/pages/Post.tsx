import { useParams } from 'react-router-dom'
import { ROOMS } from '../lib/types'
import type { Room as RoomType } from '../lib/types'
import { getPost } from '../lib/content'
import PostHeader from '../components/Post/PostHeader'
import Markdown from '../components/Post/Markdown'
import NotFound from './NotFound'

function Post() {
  const { room, slug } = useParams<{ room: string; slug: string }>()

  if (!room || !slug || !ROOMS.includes(room as RoomType)) {
    return <NotFound />
  }

  const post = getPost(room as RoomType, slug)
  if (!post) return <NotFound />

  return (
    <article>
      <PostHeader post={post} />
      <Markdown>{post.body}</Markdown>
    </article>
  )
}

export default Post
