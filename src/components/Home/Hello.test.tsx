import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import Hello from './Hello'

describe('Hello', () => {
  it("renders an introduction with Serina's name", () => {
    render(<Hello />)
    expect(screen.getByText(/Serina/)).toBeInTheDocument()
  })

  it('mentions at least one of the things this blog is about', () => {
    render(<Hello />)
    expect(
      screen.getByText(/(art|writing|code|neurodivergent|making)/i),
    ).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Hello />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
