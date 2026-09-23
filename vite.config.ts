import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      // The Prémium demo lives at /premium/ (premium/index.html), NOT at the
      // site root: that leaves dist/index.html absent, so vercel.json can
      // rewrite "/" to the agency page (public/alexstudio/index.html) and the
      // address bar stays on the bare domain. With a root index.html Vercel
      // serves that file before any rewrite rule is looked at.
      input: { premium: resolve(__dirname, 'premium/index.html') },
    },
  },
})
