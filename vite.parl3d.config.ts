import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Builds the 3D Parliament (scene3d/parliament3d.js + three.js) into ONE
// self-contained file served as a static asset by the agency page:
//   npm run build:3d  ->  public/alexstudio/parliament3d.js
// The result is committed, so the normal `npm run build` (Vercel) never needs
// to rebuild it; only re-run this after editing scene3d/.
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'public/alexstudio',
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'scene3d/parliament3d.js'),
      formats: ['es'],
      fileName: () => 'parliament3d.js',
    },
    rollupOptions: {
      output: {
        // `/*!` comments survive minification. The full MIT text sits next to the
        // bundle in public/alexstudio/parliament3d.LICENSE.txt (copied from node_modules/three/LICENSE).
        banner: '/*! Parliament 3D scene (AiStudioBudapest). Includes three.js, MIT License, (c) three.js authors, see parliament3d.LICENSE.txt */',
      },
    },
  },
})
