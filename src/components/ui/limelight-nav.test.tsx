import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import { LimelightNav, type NavItem } from './limelight-nav'

const items: NavItem[] = [
  { to: '/writing', label: 'Writing' },
  { to: '/art', label: 'Art' },
  { to: '/about', label: 'About' },
]

function renderNav(initialPath = '/art') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <LimelightNav items={items} />
    </MemoryRouter>,
  )
}

describe('LimelightNav', () => {
  it('renders a labelled link to every item', () => {
    renderNav()
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute(
      'href',
      '/writing',
    )
    expect(screen.getByRole('link', { name: 'Art' })).toHaveAttribute(
      'href',
      '/art',
    )
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    )
  })

  it('marks the current route with aria-current', () => {
    renderNav('/art')
    expect(screen.getByRole('link', { name: 'Art' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Writing' })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('keeps a room lit on its post pages', () => {
    renderNav('/writing/some-post')
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('exposes a labelled navigation landmark', () => {
    renderNav()
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBeInTheDocument()
  })

  it('the limelight bar is hidden from assistive tech', () => {
    const { container } = renderNav()
    expect(
      container.querySelector('.limelight-nav__limelight'),
    ).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no a11y violations', async () => {
    const { container } = renderNav()
    expect((await axe(container)).violations).toEqual([])
  })
})
