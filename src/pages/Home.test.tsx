import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Home from './Home'

describe('Home', () => {
  it('renders without crashing and has no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(container).toMatchSnapshot()
    expect((await axe(container)).violations).toEqual([])
  })

  it('wraps the masthead in a decorative, aria-hidden ambient glow', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(container.querySelector('.spotlight-container')).not.toBeNull()
    expect(container.querySelector('.spotlight-overlay')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
    // The masthead heading still lives inside the glow panel.
    expect(container.querySelector('.spotlight-container h1')).toHaveTextContent(
      /Hi, I'm Serina/,
    )
  })
})
