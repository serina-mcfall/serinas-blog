import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import ThisWeek from './ThisWeek'
import type { Mood, Quote, ListeningItem } from '../../lib/types'

const mood: Mood = { emoji: '🌸', word: 'calm', updated: '2026-05-12' }
const quote: Quote = {
  author: 'Brené Brown',
  source: 'Dare to Lead',
  body: '\nBRAVING.',
  updated: '2026-05-12',
}
const listening: ListeningItem = {
  title: 'Cherry Blossom Lo-Fi',
  artist: 'Various',
  url: 'https://open.spotify.com/playlist/xyz',
  type: 'playlist',
  updated: '2026-05-12',
}

describe('ThisWeek', () => {
  it('renders mood, quote, and listening when all are present', () => {
    render(<ThisWeek mood={mood} quote={quote} listening={listening} />)
    expect(screen.getByText('calm')).toBeInTheDocument()
    expect(screen.getByText(/Brené Brown/)).toBeInTheDocument()
    expect(screen.getByText('Cherry Blossom Lo-Fi')).toBeInTheDocument()
  })

  it('omits missing items gracefully when their data is null', () => {
    render(<ThisWeek mood={null} quote={quote} listening={null} />)
    expect(screen.queryByText('calm')).not.toBeInTheDocument()
    expect(screen.getByText(/Brené Brown/)).toBeInTheDocument()
  })

  it('links the listening item to its URL', () => {
    render(<ThisWeek mood={null} quote={null} listening={listening} />)
    expect(
      screen.getByRole('link', { name: /Cherry Blossom Lo-Fi/ }),
    ).toHaveAttribute('href', listening.url)
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <ThisWeek mood={mood} quote={quote} listening={listening} />,
    )
    expect((await axe(container)).violations).toEqual([])
  })
})
