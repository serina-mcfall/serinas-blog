import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Lab from './Lab'

describe('Lab', () => {
  it('renders the playground heading and dev-only intro', () => {
    render(<Lab />)
    expect(screen.getByRole('heading', { level: 1, name: 'Lab' })).toBeInTheDocument()
    expect(screen.getByText(/Playground for 21st\.dev components/i)).toBeInTheDocument()
  })

  it('renders the Tailwind smoke-test card and button', () => {
    render(<Lab />)
    expect(screen.getByRole('button', { name: /Primary button/i })).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Lab />)
    expect((await axe(container)).violations).toEqual([])
  })
})
