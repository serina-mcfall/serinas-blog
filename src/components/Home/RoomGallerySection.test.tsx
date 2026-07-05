import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import RoomGallerySection from './RoomGallerySection'
import { ROOMS, ROOM_DISPLAY_NAMES } from '../../lib/types'

function renderSection() {
  return render(
    <MemoryRouter>
      <RoomGallerySection />
    </MemoryRouter>,
  )
}

describe('RoomGallerySection', () => {
  it('renders a card for every room, linking to its route', () => {
    renderSection()
    for (const room of ROOMS) {
      const link = screen.getByRole('link', {
        name: new RegExp(ROOM_DISPLAY_NAMES[room], 'i'),
      })
      expect(link).toHaveAttribute('href', `/${room}`)
    }
  })

  it('shows the section heading', () => {
    renderSection()
    expect(
      screen.getByRole('heading', { name: /the rooms/i }),
    ).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderSection()
    expect((await axe(container)).violations).toEqual([])
  })
})
