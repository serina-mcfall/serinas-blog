import { motion, useReducedMotion } from 'framer-motion'
import SpotlightBackground from './spotlight-background'

// The demo shipped with the 21st.dev component, typed and made reduced-motion aware.
export default function SpotlightBackgroundDemo() {
  const reduceMotion = useReducedMotion()

  return (
    <SpotlightBackground>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        className="spotlight-inner"
      >
        <h1 className="spotlight-title">Spotlight Background</h1>
        <p className="spotlight-description">
          A dramatic, animated background effect — tuned here to your palette.
        </p>
        <button className="spotlight-button">Get Started</button>
      </motion.div>
    </SpotlightBackground>
  )
}
