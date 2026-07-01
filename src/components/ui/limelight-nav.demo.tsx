import { Home, Feather, Palette, Code2, Plane, Sparkles } from 'lucide-react'
import { LimelightNav, type NavItem } from './limelight-nav'

// Filled with Serina's actual rooms, so this reads as a real site nav.
const items: NavItem[] = [
  { id: 'home', icon: <Home />, label: 'Home' },
  { id: 'writing', icon: <Feather />, label: 'Writing' },
  { id: 'art', icon: <Palette />, label: 'Art' },
  { id: 'code', icon: <Code2 />, label: 'Code' },
  { id: 'travel', icon: <Plane />, label: 'Travel & Food' },
  { id: 'neurodivergent', icon: <Sparkles />, label: 'Neurodivergent' },
]

export default function LimelightNavDemo() {
  return <LimelightNav items={items} />
}
