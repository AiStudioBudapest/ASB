// Reconstruit assets/js/negroni3d.js (bundle Three.js minifié, chargé à la demande) à partir de src3d/negroni3d.js.
// Prérequis (temporaires, hors dépôt) :  npm i --no-save three esbuild   puis   node tools/build3d.mjs
// (ESBUILD_PATH=/chemin/vers/esbuild/lib/main.js et NODE_PATH=/chemin/vers/node_modules si installés ailleurs)
const { build } = await import(process.env.ESBUILD_PATH || 'esbuild')
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, '..')
const r = await build({
  entryPoints: [path.join(root, 'src3d/negroni3d.js')],
  outfile: path.join(root, 'assets/js/negroni3d.js'),
  bundle: true, minify: true, format: 'esm', target: 'es2020', legalComments: 'none', metafile: true, logLevel: 'info', nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : []
})
const out = Object.values(r.metafile.outputs)[0]
console.log('bundle :', (out.bytes / 1024).toFixed(0), 'Ko')
