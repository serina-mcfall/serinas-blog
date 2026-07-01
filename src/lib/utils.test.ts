import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('joins multiple class names into one string', () => {
    expect(cn('px-2', 'text-ink')).toBe('px-2 text-ink')
  })

  it('drops falsy / conditional values', () => {
    const isActive = false
    const isOpen = true
    expect(cn('base', isActive && 'active', isOpen && 'open')).toBe('base open')
  })

  it('flattens arrays and objects (clsx behaviour)', () => {
    expect(cn(['p-2', 'm-2'], { hidden: false, block: true })).toBe('p-2 m-2 block')
  })

  it('resolves conflicting Tailwind utilities so the last one wins (twMerge)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('keeps non-conflicting utilities alongside a resolved conflict', () => {
    expect(cn('rounded', 'px-2', 'px-4', 'font-bold')).toBe('rounded px-4 font-bold')
  })

  it('returns an empty string when given nothing', () => {
    expect(cn()).toBe('')
  })
})
