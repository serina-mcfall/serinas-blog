import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'vitest-axe'
import Home from './Home'

describe('Home', () => {
  it('renders without crashing and has no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(container).toMatchSnapshot()
    expect((await axe(container)).violations).toEqual([])
  })
})
