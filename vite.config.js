import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

const root = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
      '@assets': path.resolve(root, './src/assets'),
      '@components': path.resolve(root, './src/components'),
      '@pages': path.resolve(root, './src/pages'),
      '@hooks': path.resolve(root, './src/hooks'),
      '@context': path.resolve(root, './src/context'),
      '@services': path.resolve(root, './src/services'),
      '@data': path.resolve(root, './src/data'),
      '@utils': path.resolve(root, './src/utils'),
      '@constants': path.resolve(root, './src/constants'),
      '@styles': path.resolve(root, './src/styles'),
      '@animations': path.resolve(root, './src/animations'),
      '@routes': path.resolve(root, './src/routes'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  css: {
    // This machine has a stray postcss.config.js in a parent directory
    // (outside this repo) from an unrelated project; PostCSS's config
    // search walks up the tree and would otherwise pick it up and clash
    // with @tailwindcss/vite. An explicit (empty) inline config stops that
    // upward search — Tailwind itself is handled by the Vite plugin above,
    // not PostCSS.
    postcss: {},
  },
})
