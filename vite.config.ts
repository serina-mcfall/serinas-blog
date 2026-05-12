/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // gray-matter (used to parse markdown front-matter in the browser) depends on
      // Node's Buffer global. Polyfill Buffer (and other Node globals) for the
      // browser bundle so gray-matter works at runtime.
      globals: { Buffer: true, global: true, process: true },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
