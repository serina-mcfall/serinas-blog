import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import About from './About'

describe('About', () => {
  it('renders bio, usage policy, and contact placeholder headings', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Using my art/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Reaching me/ })).toBeInTheDocument()
  })

  it('renders the FAQ section with its questions', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: /A few questions/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Can I use one of your pieces/ }),
    ).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
