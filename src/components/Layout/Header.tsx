import { Link } from 'react-router-dom'
import { ROOMS, ROOM_DISPLAY_NAMES } from '../../lib/types'
import { LimelightNav } from '../ui/limelight-nav'

const navItems = [
  ...ROOMS.map((room) => ({ to: `/${room}`, label: ROOM_DISPLAY_NAMES[room] })),
  { to: '/about', label: 'About' },
]

function Header() {
  return (
    <header>
      <Link to="/">Serina's Blog</Link>
      <LimelightNav items={navItems} />
    </header>
  )
}

export default Header
