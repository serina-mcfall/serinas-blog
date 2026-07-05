import { GlassCard } from './glass-card'

// Glass applied to something real: a "This week" panel, mirroring the home page's
// mood + quote + listening — so you can see the aesthetic doing an actual job.
export default function GlassCardDemo() {
  return (
    <div className="glass-stage">
      <GlassCard className="w-full max-w-sm p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          This week
        </p>
        <p className="mt-3 text-2xl font-semibold">🌸 calm</p>
        <p className="mt-4 leading-relaxed">
          Boundaries · Reliability · Accountability · Vault · Integrity ·
          Non-judgment · Generosity.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          — BRAVING, Brené Brown
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Listening to{' '}
          <span className="text-foreground">Cherry Blossom Lo-Fi</span>
        </p>
      </GlassCard>
    </div>
  )
}
