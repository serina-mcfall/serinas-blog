import { type ReactNode } from 'react'
import { motion, useReducedMotion, type MotionProps } from 'framer-motion'
import './spotlight-background.css'

type SpotlightProps = MotionProps & { className?: string }

// A single blurred, drifting light.
function Spotlight({ className = '', ...props }: SpotlightProps) {
  return <motion.div className={`spotlight ${className}`} {...props} />
}

export default function SpotlightBackground({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  // When the reader prefers reduced motion, drop the looping animation and render
  // the lights static. Accessibility rule: motion never runs against the reader's wishes.
  const drift = (
    animate: MotionProps['animate'],
    transition: MotionProps['transition'],
  ): MotionProps => (reduceMotion ? {} : { animate, transition })

  return (
    <div className="spotlight-container">
      {/* Purely decorative — hidden from assistive tech. */}
      <div className="spotlight-overlay" aria-hidden="true">
        <Spotlight
          className="spotlight-left"
          initial={{ x: '-50%', y: '-50%', rotate: '0deg' }}
          {...drift(
            {
              x: ['-50%', '-30%', '-70%', '-50%'],
              y: ['-50%', '-70%', '-30%', '-50%'],
              rotate: ['0deg', '15deg', '-15deg', '0deg'],
            },
            { duration: 12, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
          )}
        />
        <Spotlight
          className="spotlight-mid"
          initial={{ x: '0%', y: '0%', rotate: '-20deg' }}
          {...drift(
            {
              x: ['0%', '20%', '-20%', '0%'],
              y: ['0%', '30%', '10%', '0%'],
              rotate: ['-20deg', '0deg', '20deg', '-20deg'],
            },
            { duration: 15, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 3 },
          )}
        />
        <Spotlight
          className="spotlight-right"
          initial={{ x: '0%', y: '0%', rotate: '10deg' }}
          {...drift(
            {
              x: ['0%', '-30%', '10%', '0%'],
              y: ['0%', '-20%', '20%', '0%'],
              rotate: ['10deg', '-10deg', '25deg', '10deg'],
            },
            { duration: 18, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 5 },
          )}
        />
      </div>

      <div className="spotlight-content">{children}</div>
    </div>
  )
}
