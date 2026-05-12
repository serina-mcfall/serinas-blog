import { Link, NavLink } from 'react-router-dom'
import { ROOMS, ROOM_DISPLAY_NAMES } from '../../lib/types'

function Header() {
  return (
    <header>
      <Link to="/">Serina's Blog</Link>
      <nav aria-label="Primary">
        <ul>
          {ROOMS.map(room => (
            <li key={room}>
              <NavLink to={`/${room}`}>{ROOM_DISPLAY_NAMES[room]}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
