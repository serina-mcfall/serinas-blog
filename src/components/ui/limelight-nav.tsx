import { useState, useRef, useLayoutEffect, type ReactElement } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './limelight-nav.css'

export type NavItem = {
  to: string
  label: string
  icon?: ReactElement
}

type LimelightNavProps = {
  items: NavItem[]
  ariaLabel?: string
  className?: string
}

// Which item best matches the current path: exact for "/", otherwise the longest
// `to` that prefixes the pathname — so /writing/my-post keeps "Writing" lit.
function activeIndexFor(items: NavItem[], pathname: string): number {
  let best = -1
  let bestLen = -1
  items.forEach((item, i) => {
    const matches =
      item.to === '/'
        ? pathname === '/'
        : pathname === item.to || pathname.startsWith(item.to + '/')
    if (matches && item.to.length > bestLen) {
      best = i
      bestLen = item.to.length
    }
  })
  return best
}

/**
 * Primary nav rendered as real NavLinks (text labels, hrefs, aria-current),
 * with a decorative "limelight" that slides beneath the active route. The links
 * carry all the accessibility; the limelight is aria-hidden and purely visual.
 */
export function LimelightNav({
  items,
  ariaLabel = 'Primary',
  className = '',
}: LimelightNavProps) {
  const { pathname } = useLocation()
  const activeIndex = activeIndexFor(items, pathname)

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const limelightRef = useRef<HTMLSpanElement | null>(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const bar = limelightRef.current
    if (!bar) return

    const active = activeIndex >= 0 ? linkRefs.current[activeIndex] : null
    if (!active) {
      bar.style.opacity = '0'
      return
    }

    bar.style.opacity = '1'
    bar.style.left = `${active.offsetLeft}px`
    bar.style.width = `${active.offsetWidth}px`

    // Enable sliding only after the first positioning, so it doesn't animate in.
    if (!ready) {
      const id = setTimeout(() => setReady(true), 50)
      return () => clearTimeout(id)
    }
  }, [activeIndex, ready, items])

  return (
    <nav aria-label={ariaLabel} className={`limelight-nav ${className}`}>
      <ul className="limelight-nav__list">
        {items.map((item, index) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              ref={(el) => {
                linkRefs.current[index] = el
              }}
              className="limelight-nav__link"
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <span
        ref={limelightRef}
        className={`limelight-nav__limelight ${ready ? 'is-ready' : ''}`}
        aria-hidden="true"
      />
    </nav>
  )
}
