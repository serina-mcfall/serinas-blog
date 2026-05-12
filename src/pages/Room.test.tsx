import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Room from './Room'
import * as content from '../lib/content'
import type { Post } from '../lib/types'

const postFixture: Post = {
  room: 'writing',
  slug: 'finding-my-voice',
  title: 'Finding my voice',
  date: '2026-05-15',
  excerpt: 'Notes from the first week.',
  body: 'body',
  draft: false,
}

function renderRoom(roomPath: string) {
  return render(
    <MemoryRouter initialEntries={[roomPath]}>
      <Routes>
        <Route path="/:room" element={<Room />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Room', () => {
  beforeEach(() => {
    vi.spyOn(content, 'getPostsByRoom').mockReturnValue([postFixture])
  })

  it('renders the room header and a teaser for each post', () => {
    renderRoom('/writing')
    expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument()
    expect(screen.getByText('Finding my voice')).toBeInTheDocument()
  })

  it('shows the UniverseDoor on the writing room only', () => {
    renderRoom('/writing')
    expect(screen.getByText(/Step into the Where Petals Fall universe/)).toBeInTheDocument()
  })

  it('does not show the UniverseDoor on the art room', () => {
    renderRoom('/art')
    expect(screen.queryByText(/Where Petals Fall universe/)).not.toBeInTheDocument()
  })

  it('renders NotFound for an unknown room', () => {
    renderRoom('/unknown')
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderRoom('/writing')
    expect((await axe(container)).violations).toEqual([])
  })
})
