import { cn } from '@/lib/utils'
import SpotlightBackgroundDemo from '@/components/ui/spotlight-background.demo'

export default function Lab() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="mb-8">
        <h1>Lab</h1>
        <p className="text-muted-foreground">
          Playground for 21st.dev components. Dev-only - this route never ships
          to the live site.
        </p>
      </header>
      {/* Smoke test: proves Tailwind utilities render in your palette */}
      <section
        className={cn('max-w-md rounded-lg p-6 bg-card text-card-foreground')}
      >
        <p>
          If this card has a soft paper background, a faint border, and rounded
          corners, Tailwind is working - and pulling your colours.
        </p>
        <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
          Primary button
        </button>
      </section>

      {/* 21st.dev — Spotlight Background */}
      <section className="mt-12">
        <h2 className="mb-4 text-muted-foreground">
          Spotlight Background (21st.dev)
        </h2>
        <SpotlightBackgroundDemo />
      </section>
    </div>
  )
}
