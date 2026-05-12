import { useParams } from 'react-router-dom'
import { ROOMS } from '../lib/types'
import type { Room as RoomType } from '../lib/types'
import { getPostsByRoom } from '../lib/content'
import RoomHeader from '../components/Room/RoomHeader'
import RoomTeaser from '../components/Room/RoomTeaser'
import UniverseDoor from '../components/Room/UniverseDoor'
import NotFound from './NotFound'

function Room() {
  const { room } = useParams<{ room: string }>()

  if (!room || !ROOMS.includes(room as RoomType)) {
    return <NotFound />
  }

  const roomTyped = room as RoomType
  const posts = getPostsByRoom(roomTyped)

  return (
    <>
      <RoomHeader room={roomTyped} />
      <ol aria-label={`Posts in ${roomTyped}`}>
        {posts.map(post => (
          <li key={post.slug}>
            <RoomTeaser post={post} />
          </li>
        ))}
      </ol>
      {roomTyped === 'writing' && <UniverseDoor />}
    </>
  )
}

export default Room
