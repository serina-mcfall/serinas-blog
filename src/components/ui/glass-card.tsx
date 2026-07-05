import { type ReactNode } from 'react'
import './glass-card.css'

// A frosted-glass panel in Serina's palette — the glassmorphism look from the
// 21st.dev calendar, kept as a calm, reusable container (no broken date-picker).
// Non-interactive by design: it's a styled surface you put real content inside.
export function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`glass-card ${className}`}>{children}</div>
}
