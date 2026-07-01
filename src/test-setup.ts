import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement matchMedia. framer-motion's useReducedMotion (and any
// prefers-reduced-motion checks) call it, so provide a minimal stub. Defaults to
// "no preference" (matches: false) — individual tests can override if needed.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom doesn't implement IntersectionObserver. framer-motion's `whileInView`
// relies on it, so provide a no-op stub.
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }
  window.IntersectionObserver = MockIntersectionObserver
}
