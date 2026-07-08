import { LimelightNav, type NavItem } from './limelight-nav'

// The reworked, route-aware nav filled with Serina's real rooms. A distinct
// aria-label so it doesn't clash with the site header's "Primary" landmark on
// the /lab page.
const items: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/writing', label: 'Writing' },
  { to: '/art', label: 'Art' },
  { to: '/code', label: 'Code' },
  { to: '/travel', label: 'Travel & Food' },
  { to: '/neurodivergent', label: 'Neurodivergent' },
]

export default function LimelightNavDemo() {
  return <LimelightNav items={items} ariaLabel="Lab demo nav" />
}
