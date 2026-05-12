import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import FeaturedWindow from './FeaturedWindow'
import type { FeaturedItem } from '../../lib/types'

const item: FeaturedItem = {
  title: 'Moonlight pour',
  image: '/images/featured/moonlight-pour.jpg',
  imageAlt: 'A resin piece with swirling teal',
  link: '/art/moonlight-pour',
  caption: 'Six pours to settle the swirl',
  updated: '2026-05-12',
}

function renderWithRouter(component: React.ReactNode) {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe('FeaturedWindow', () => {
  it('renders title, image with alt text, and caption', () => {
    renderWithRouter(<FeaturedWindow kind="art" item={item} />)
    expect(screen.getByText('Moonlight pour')).toBeInTheDocument()
    expect(screen.getByAltText('A resin piece with swirling teal')).toBeInTheDocument()
    expect(screen.getByText('Six pours to settle the swirl')).toBeInTheDocument()
  })

  it('renders a Link to the item.link when provided', () => {
    renderWithRouter(<FeaturedWindow kind="art" item={item} />)
    expect(screen.getByRole('link', { name: /View more/ })).toHaveAttribute(
      'href',
      '/art/moonlight-pour',
    )
  })

  it('renders nothing when item is null', () => {
    const { container } = renderWithRouter(
      <FeaturedWindow kind="art" item={null} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('has no a11y violations', async () => {
    const { container } = renderWithRouter(
      <FeaturedWindow kind="art" item={item} />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
