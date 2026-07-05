import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Lab from './Lab'

// Lab now hosts demos that use react-router <Link>, so it needs a Router in tests.
function renderLab() {
  return render(
    <MemoryRouter>
      <Lab />
    </MemoryRouter>,
  )
}

describe('Lab', () => {
  it('renders the playground heading and dev-only intro', () => {
    renderLab()
    expect(screen.getByRole('heading', { level: 1, name: 'Lab' })).toBeInTheDocument()
    expect(screen.getByText(/Playground for 21st\.dev components/i)).toBeInTheDocument()
  })

  it('renders the Tailwind smoke-test card and button', () => {
    renderLab()
    expect(screen.getByRole('button', { name: /Primary button/i })).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderLab()
    expect((await axe(container)).violations).toEqual([])
  })
})
