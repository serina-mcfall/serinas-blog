import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import { ArtImage } from './art-image'

function renderArt() {
  return render(
    <MemoryRouter>
      <ArtImage src="/art/piece.jpg" alt="A resin piece with swirling teal" />
    </MemoryRouter>,
  )
}

describe('ArtImage', () => {
  it('renders the artwork with its alt text', () => {
    renderArt()
    expect(
      screen.getByRole('img', { name: 'A resin piece with swirling teal' }),
    ).toBeInTheDocument()
  })

  it('shows a © badge that links to the usage policy', () => {
    renderArt()
    const badge = screen.getByRole('link', {
      name: /usage terms for this artwork/i,
    })
    expect(badge).toHaveAttribute('href', '/about#usage-policy')
  })

  it('reveals the usage terms in a tooltip when the badge is focused', async () => {
    renderArt()
    fireEvent.focus(
      screen.getByRole('link', { name: /usage terms for this artwork/i }),
    )
    const terms = await screen.findAllByText(/please ask before use/i)
    expect(terms.length).toBeGreaterThan(0)
  })

  it('has no a11y violations', async () => {
    const { container } = renderArt()
    expect((await axe(container)).violations).toEqual([])
  })
})
