// Reconstruit les bundles Three.js minifiés, chargés à la demande :
//   assets/js/negroni3d.js  (scènes intégrées Negroni + Paradise GT)  à partir de src3d/negroni3d.js
//   assets/js/glbview.js    (lecteur de modèle GLB externe, utilisé seulement si un GLB valide est fourni)  à partir de src3d/glbview.js
// Prérequis (temporaires, hors dépôt) :  npm i --no-save three esbuild   puis   node tools/build3d.mjs
// (ESBUILD_PATH=/chemin/vers/esbuild/lib/main.js et NODE_PATH=/chemin/vers/node_modules si installés ailleurs)
const { build } = await import(process.env.ESBUILD_PATH || 'esbuild')
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, '..')
// Les deux points d'entrée partagent un seul morceau Three.js (assets/js/chunks/) : rien n'est téléchargé deux fois.
fs.rmSync(path.join(root, 'assets/js/chunks'), { recursive: true, force: true })
const r = await build({
  entryPoints: [path.join(root, 'src3d/negroni3d.js'), path.join(root, 'src3d/glbview.js')],
  outdir: path.join(root, 'assets/js'), chunkNames: 'chunks/[name]-[hash]',
  bundle: true, splitting: true, minify: true, format: 'esm', target: 'es2020', legalComments: 'none', metafile: true, logLevel: 'info', nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : []
})
for (const [f, o] of Object.entries(r.metafile.outputs)) console.log(f.replace(/^.*assets\//, 'assets/'), (o.bytes / 1024).toFixed(0), 'Ko')
