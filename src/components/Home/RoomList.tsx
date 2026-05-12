import { Link } from 'react-router-dom'
import { ROOMS, ROOM_DISPLAY_NAMES } from '../../lib/types'

function RoomList() {
  return (
    <nav aria-label="Rooms">
      <h2>Wander into a room!</h2>
      <ul>
        {ROOMS.map((room) => (
          <li key={room}>
            <Link to={`/${room}`}>{ROOM_DISPLAY_NAMES[room]}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RoomList
