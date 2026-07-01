import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import LampTooltipDemo from './lamp-tooltip.demo'

describe('LampTooltip', () => {
  it('renders each trigger as a focusable button with an accessible name', () => {
    render(<LampTooltipDemo />)
    expect(screen.getByRole('button', { name: 'Hover (Top)' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hover (Bottom)' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hover (Right)' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hover (Left)' })).toBeInTheDocument()
  })

  it('reveals the tooltip on keyboard focus (not hover-only)', async () => {
    const user = userEvent.setup()
    render(<LampTooltipDemo />)
    // Tab to the first trigger — a keyboard user must be able to surface the tooltip.
    await user.tab()
    // Radix renders the visible tooltip plus a visually-hidden copy for screen
    // readers, so there are two matches — both are the point.
    const tips = await screen.findAllByText('Top side tooltip')
    expect(tips.length).toBeGreaterThan(0)
  })

  it('has no a11y violations in the resting state', async () => {
    const { container } = render(<LampTooltipDemo />)
    expect((await axe(container)).violations).toEqual([])
  })
})
