import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import RoomGalleryDemo from './room-gallery.demo'

function renderInRouter() {
  return render(
    <MemoryRouter>
      <RoomGalleryDemo />
    </MemoryRouter>,
  )
}

describe('RoomGallery', () => {
  it('renders a card per room as a real link to its route', () => {
    renderInRouter()
    const hrefs = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('/writing')
    expect(hrefs).toContain('/neurodivergent')
    expect(hrefs).toContain('/travel')
  })

  it('shows every room at once (nothing hidden behind a carousel)', () => {
    renderInRouter()
    expect(screen.getAllByRole('link')).toHaveLength(5)
  })

  it('presents the rooms as a list for screen readers', () => {
    renderInRouter()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('has no a11y violations', async () => {
    const { container } = renderInRouter()
    expect((await axe(container)).violations).toEqual([])
  })
})
