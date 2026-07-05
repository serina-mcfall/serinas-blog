import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Faq from './Faq'

describe('About FAQ', () => {
  it('renders every question as a button', () => {
    render(<Faq />)
    expect(
      screen.getByRole('button', { name: /Can I use one of your pieces/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /comments section/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /subscribe or follow/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Neurodivergent room/ }),
    ).toBeInTheDocument()
  })

  it('reveals an answer only once its question is opened', () => {
    render(<Faq />)
    expect(screen.queryByText(/all rights reserved/)).not.toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: /Can I use one of your pieces/ }),
    )
    expect(screen.getByText(/all rights reserved/)).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Faq />)
    expect((await axe(container)).violations).toEqual([])
  })
})
