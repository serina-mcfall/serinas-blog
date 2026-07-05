import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import GlassCardDemo from './glass-card.demo'

describe('GlassCard', () => {
  it('renders its content', () => {
    render(<GlassCardDemo />)
    expect(screen.getByText('This week')).toBeInTheDocument()
    expect(screen.getByText(/BRAVING/)).toBeInTheDocument()
    expect(screen.getByText('Cherry Blossom Lo-Fi')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<GlassCardDemo />)
    expect((await axe(container)).violations).toEqual([])
  })
})
