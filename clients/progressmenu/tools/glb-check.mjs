// Contrôle d'un GLB livré par l'artiste 3D :  node tools/glb-check.mjs chemin/vers/negroni.glb
// Vérifie les noms d'objets (content/negroni-model.json), le poids, les triangles, les textures, l'échelle et la position.
// Code de sortie 1 si le fichier est refusé.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { inspect, formatReport } from './glb-lib.mjs'
const here = path.dirname(fileURLToPath(import.meta.url))
const file = process.argv[2]
if (!file) { console.error('usage : node tools/glb-check.mjs fichier.glb'); process.exit(2) }
const config = JSON.parse(fs.readFileSync(path.join(here, '../content/negroni-model.json'), 'utf8'))
const r = inspect(fs.readFileSync(file), config)
console.log(formatReport(r))
process.exit(r.ok ? 0 : 1)
