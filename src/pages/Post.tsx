import { useParams } from 'react-router-dom'

function Post() {
  const { room, slug } = useParams()
  return (
    <h1>
      Post: {room}/{slug} (placeholder)
    </h1>
  )
}
export default Post
