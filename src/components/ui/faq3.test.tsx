import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import Faq3Demo from './faq3.demo'

describe('Faq3', () => {
  it('renders the heading and every question as a button', () => {
    render(<Faq3Demo />)
    expect(screen.getByRole('heading', { name: 'A few questions' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Can I use one of your pieces/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Is there a comments section/ }),
    ).toBeInTheDocument()
  })

  it('keeps answers collapsed until their question is activated', () => {
    render(<Faq3Demo />)
    expect(screen.queryByText(/decide case by case/)).not.toBeInTheDocument()
  })

  it('expands an answer when its question is clicked', async () => {
    const user = userEvent.setup()
    render(<Faq3Demo />)
    await user.click(
      screen.getByRole('button', { name: /Can I use one of your pieces/ }),
    )
    expect(await screen.findByText(/decide case by case/)).toBeInTheDocument()
  })

  it('marks the open question with aria-expanded', async () => {
    const user = userEvent.setup()
    render(<Faq3Demo />)
    const trigger = screen.getByRole('button', {
      name: /Is there a comments section/,
    })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Faq3Demo />)
    expect((await axe(container)).violations).toEqual([])
  })
})
