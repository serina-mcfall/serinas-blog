import { useParams } from 'react-router-dom'

function Room() {
  const { room } = useParams()
  return <h1>Room: {room} (placeholder)</h1>
}

export default Room
