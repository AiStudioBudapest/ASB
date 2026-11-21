// Aperçu PRIVÉ d'un GLB (sans rien publier ni modifier dans le dépôt) :
//   node tools/glb-preview.mjs chemin/vers/negroni.glb [port]
// 1. contrôle le fichier ; 2. construit dist/ avec ce GLB ; 3. sert le menu sur http://localhost:<port>/ (5180 par défaut).
// Ouvrir la carte Negroni : on voit la vue assemblée, puis éclatée, avec les étiquettes. Ctrl+C pour arrêter.
// dist/ est local (ignoré par git) : rien de ce qui est vu ici n'est en ligne.
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { inspect, formatReport } from './glb-lib.mjs'

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.join(here, '..')
const file = process.argv[2], port = Number(process.argv[3] || 5180)
if (!file) { console.error('usage : node tools/glb-preview.mjs fichier.glb [port]'); process.exit(2) }
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'content/negroni-model.json'), 'utf8'))
const rep = inspect(fs.readFileSync(file), cfg)
console.log(formatReport(rep))
if (!rep.ok) process.exit(1)
const b = spawnSync(process.execPath, [path.join(root, 'build.mjs')], { cwd: root, stdio: 'inherit', env: { ...process.env, NEGRONI_GLB: path.resolve(file) } })
if (b.status) process.exit(b.status)

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.glb': 'model/gltf-binary', '.json': 'application/json', '.wasm': 'application/wasm' }
const dist = path.join(root, 'dist')
http.createServer((q, r) => {
  let f = path.join(dist, decodeURIComponent(q.url.split('?')[0]))
  if (!f.startsWith(dist)) { r.statusCode = 403; return r.end() }
  if (f.endsWith(path.sep)) f = path.join(f, 'index.html')
  fs.readFile(f, (e, d) => { if (e) { r.statusCode = 404; return r.end() } r.setHeader('content-type', mime[path.extname(f)] || 'application/octet-stream'); r.end(d) })
}).listen(port, () => console.log(`\nAperçu privé : http://localhost:${port}/  (ouvrir la carte Negroni)`))
