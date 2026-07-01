import {
  useState,
  useRef,
  useLayoutEffect,
  cloneElement,
  type ReactElement,
  type SVGProps,
} from 'react'

// --- Internal defaults ---

const DefaultHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

export type NavItem = {
  id: string | number
  icon: ReactElement<{ className?: string }>
  label: string
  onClick?: () => void
}

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
]

type LimelightNavProps = {
  items?: NavItem[]
  defaultActiveIndex?: number
  onTabChange?: (index: number) => void
  className?: string
  limelightClassName?: string
  iconContainerClassName?: string
  iconClassName?: string
}

/**
 * Adaptive-width nav with a "limelight" that slides to the active item.
 * Items are real <button>s (keyboard-operable); active item carries aria-current.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className = '',
  limelightClassName = '',
  iconContainerClassName = '',
  iconClassName = '',
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [isReady, setIsReady] = useState(false)
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (items.length === 0) return

    const limelight = limelightRef.current
    const activeItem = navItemRefs.current[activeIndex]

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2
      limelight.style.left = `${newLeft}px`

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50)
      }
    }
  }, [activeIndex, isReady, items])

  if (items.length === 0) {
    return null
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index)
    onTabChange?.(index)
    itemOnClick?.()
  }

  return (
    <nav
      className={`relative inline-flex items-center h-16 rounded-lg bg-card text-foreground border border-border px-2 ${className}`}
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <button
          type="button"
          key={id}
          ref={(el) => {
            navItemRefs.current[index] = el
          }}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 rounded-md focus-visible:[outline:2px_solid_var(--color-link)] focus-visible:[outline-offset:2px] ${iconContainerClassName}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
          aria-current={activeIndex === index ? 'page' : undefined}
        >
          {cloneElement(icon, {
            className: `w-6 h-6 transition-opacity duration-100 ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-60'
            } ${icon.props.className ?? ''} ${iconClassName}`,
          })}
        </button>
      ))}

      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[5px] rounded-full bg-primary shadow-[0_50px_15px_var(--primary)] ${
          isReady ? 'transition-[left] duration-[400ms] ease-in-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
        aria-hidden="true"
      >
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  )
}
