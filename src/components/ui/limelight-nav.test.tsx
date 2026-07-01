import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import LimelightNavDemo from './limelight-nav.demo'

describe('LimelightNav', () => {
  it('renders each room as a real, named button', () => {
    render(<LimelightNavDemo />)
    // Buttons (not hrefless anchors) so keyboard users can reach them.
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Writing' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Neurodivergent' })).toBeInTheDocument()
  })

  it('marks the active item with aria-current for screen readers', async () => {
    const user = userEvent.setup()
    render(<LimelightNavDemo />)

    const home = screen.getByRole('button', { name: 'Home' })
    const art = screen.getByRole('button', { name: 'Art' })

    // First item active by default.
    expect(home).toHaveAttribute('aria-current', 'page')
    expect(art).not.toHaveAttribute('aria-current')

    await user.click(art)
    expect(art).toHaveAttribute('aria-current', 'page')
    expect(home).not.toHaveAttribute('aria-current')
  })

  it('is operable by keyboard (Tab to focus, Enter to activate)', async () => {
    const user = userEvent.setup()
    render(<LimelightNavDemo />)

    await user.tab()
    expect(screen.getByRole('button', { name: 'Home' })).toHaveFocus()

    // Tab to the second item and activate it with the keyboard.
    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Writing' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('has no a11y violations', async () => {
    const { container } = render(<LimelightNavDemo />)
    expect((await axe(container)).violations).toEqual([])
  })
})
