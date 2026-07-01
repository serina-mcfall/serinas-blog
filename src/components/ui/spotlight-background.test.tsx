import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import SpotlightBackground from './spotlight-background'

describe('SpotlightBackground', () => {
  it('renders its children on top of the decorative layer', () => {
    render(
      <SpotlightBackground>
        <p>Hello from the spotlight</p>
      </SpotlightBackground>,
    )
    expect(screen.getByText('Hello from the spotlight')).toBeInTheDocument()
  })

  it('hides the decorative light layer from assistive tech', () => {
    const { container } = render(
      <SpotlightBackground>
        <p>content</p>
      </SpotlightBackground>,
    )
    const overlay = container.querySelector('.spotlight-overlay')
    expect(overlay).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <SpotlightBackground>
        <h1>Title</h1>
        <p>Body copy</p>
      </SpotlightBackground>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
