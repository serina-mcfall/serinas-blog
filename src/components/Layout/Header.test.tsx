import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Header from './Header'

describe('Header', () => {
  function renderHeader() {
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
  }

  it('renders the site name', () => {
    renderHeader()
    expect(screen.getByText("Serina's Blog")).toBeInTheDocument()
  })

  it('renders a link to every room and About', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/writing')
    expect(screen.getByRole('link', { name: 'Art' })).toHaveAttribute('href', '/art')
    expect(screen.getByRole('link', { name: 'Code' })).toHaveAttribute('href', '/code')
    expect(screen.getByRole('link', { name: 'Travel & Food' })).toHaveAttribute('href', '/travel')
    expect(screen.getByRole('link', { name: 'Neurodivergent' })).toHaveAttribute(
      'href',
      '/neurodivergent',
    )
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('has no a11y violations', async () => {
    const { container } = renderHeader()
    expect((await axe(container)).violations).toEqual([])
  })
})
