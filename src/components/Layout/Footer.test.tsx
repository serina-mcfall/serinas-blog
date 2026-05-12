import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Footer from './Footer'

describe('Footer', () => {
  it('renders a copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© \d{4} Serina McFall/)).toBeInTheDocument()
  })

  it('renders an RSS link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /RSS/i })).toHaveAttribute(
      'href',
      '/feed.xml',
    )
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Footer />)
    expect((await axe(container)).violations).toEqual([])
  })
})
