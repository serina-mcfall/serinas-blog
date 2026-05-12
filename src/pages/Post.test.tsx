import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Post from './Post'
import * as content from '../lib/content'
import type { Post as PostType } from '../lib/types'

const postFixture: PostType = {
  room: 'art',
  slug: 'moonlight-pour',
  title: 'Moonlight pour',
  date: '2026-05-15',
  excerpt: 'Excerpt.',
  body: '## A subheading\n\nBody paragraph.',
  draft: false,
}

function renderPost(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:room/:slug" element={<Post />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Post', () => {
  beforeEach(() => {
    vi.spyOn(content, 'getPost').mockImplementation((room, slug) =>
      room === 'art' && slug === 'moonlight-pour' ? postFixture : undefined,
    )
  })

  it('renders the post header and the rendered markdown body', () => {
    renderPost('/art/moonlight-pour')
    expect(screen.getByRole('heading', { level: 1, name: 'Moonlight pour' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'A subheading' })).toBeInTheDocument()
    expect(screen.getByText('Body paragraph.')).toBeInTheDocument()
  })

  it('renders NotFound when post is missing', () => {
    renderPost('/art/does-not-exist')
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = renderPost('/art/moonlight-pour')
    expect((await axe(container)).violations).toEqual([])
  })
})
