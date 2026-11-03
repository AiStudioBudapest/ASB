// Garde-fou mobile / tablette : ouvre chaque page dans des tailles de téléphone
// et de tablette, à plusieurs positions de défilement, et échoue si :
//  - la page peut défiler à droite (débordement horizontal),
//  - un élément visible dépasse l'écran à droite,
//  - la balise viewport manque, ou une erreur JS apparaît.
// Usage : npm run check:mobile   (après `npm run build`, sert le dossier dist/)
//         node scripts/check-mobile.mjs --dir public   (pages statiques seulement)
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
let chromium
try { ({ chromium } = require('playwright')) } catch {
  console.error('Playwright est introuvable. Lancez : npm i -D playwright && npx playwright install chromium')
  process.exit(2)
}

const args = process.argv.slice(2)
const dirArg = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : 'dist'
const root = path.resolve(dirArg)
if (!fs.existsSync(root)) { console.error(`Dossier introuvable : ${root} (lancez d'abord npm run build)`); process.exit(2) }

// Site principal : liste fixe. Autre dossier (ex. clients/pr09re55/dist) : toutes les
// pages trouvées, au plus 3 par dossier de premier niveau (fiches produit identiques).
function discover(dir) {
  const out = []
  const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name)
    if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) out.push('/' + path.relative(dir, f).split(path.sep).join('/'))
  } }
  walk(dir)
  const seen = {}
  return out.sort().filter(p => { const k = p.split('/')[1]; seen[k] = (seen[k] || 0) + 1; return seen[k] <= 3 })
}
const MAIN = [
  '/alexstudio/index.html',
  '/alexstudio/impresszum.html',
  '/alexstudio/adatvedelem.html',
  '/alexstudio/aszf.html',
  '/alexstudio/cookie-tajekoztato.html',
  '/esszencia/index.html',
  '/presztizs/index.html',
  '/premium/index.html',
]
const PAGES = fs.existsSync(path.join(root, 'alexstudio/index.html'))
  ? MAIN.filter(p => fs.existsSync(path.join(root, p)))
  : discover(root)

const SIZES = [
  { name: 'tel-320', width: 320, height: 640, touch: true },
  { name: 'tel-375', width: 375, height: 740, touch: true },
  { name: 'tel-430', width: 430, height: 900, touch: true },
  { name: 'tablette-768', width: 768, height: 1024, touch: true },
  { name: 'tablette-1024', width: 1024, height: 768, touch: true },
  { name: 'tel-paysage', width: 740, height: 360, touch: true },
]
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.json': 'application/json', '.txt': 'text/plain' }

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  let f = path.join(root, p)
  if (!f.startsWith(root)) { res.writeHead(403); return res.end() }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html')
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end('not found') }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' })
  fs.createReadStream(f).pipe(res)
})
await new Promise(r => server.listen(0, r))
const base = `http://localhost:${server.address().port}`

const browser = await chromium.launch()
const failures = []
const LANGS = ['hu', 'en', 'fr', 'es', 'de']
const RUNS = PAGES.flatMap(p => p === '/alexstudio/index.html' ? LANGS.map(l => ({ page: p, lang: l })) : [{ page: p }])
for (const { page: basePage, lang } of RUNS) {
  const page = basePage
  const label = lang ? `${page}[${lang}]` : page
  for (const s of SIZES) {
    const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, hasTouch: s.touch, isMobile: true, deviceScaleFactor: 1 })
    const pg = await ctx.newPage()
    if (lang) await pg.addInitScript(l => { try { localStorage.setItem('aistudio_lang', l) } catch {} }, lang)
    const errs = []
    pg.on('pageerror', e => errs.push(String(e)))
    await pg.route(/^https?:\/\/(?!localhost)/, r => r.abort()) // pas de réseau externe
    await pg.goto(base + page + '?embed=1', { waitUntil: 'load' }).catch(() => {})
    await pg.waitForTimeout(1500)
    const hasViewport = await pg.evaluate(() => !!document.querySelector('meta[name=viewport]'))
    if (!hasViewport) failures.push(`${label} @${s.name}: balise viewport manquante`)
    const smallInputs = await pg.evaluate(() => [...document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=submit]), textarea, select')]
      .filter(e => e.getBoundingClientRect().width > 0 && parseFloat(getComputedStyle(e).fontSize) < 16)
      .map(e => (e.id ? '#' + e.id : e.tagName.toLowerCase()) + ' ' + getComputedStyle(e).fontSize))
    if (smallInputs.length) failures.push(`${label} @${s.name}: champ de formulaire < 16px (zoom automatique iOS) : ${smallInputs.join(', ')}`)
    const total = await pg.evaluate(() => document.documentElement.scrollHeight)
    const steps = Math.min(8, Math.ceil(total / s.height))
    for (let i = 0; i <= steps; i++) {
      await pg.evaluate(y => window.scrollTo(0, y), Math.round((total - s.height) * i / Math.max(1, steps)))
      await pg.waitForTimeout(250)
      const r = await pg.evaluate(iw => {
        const de = document.documentElement
        const bad = []
        if (de.scrollWidth > iw + 1) {
          for (const el of document.querySelectorAll('body *')) {
            const b = el.getBoundingClientRect()
            if (b.width === 0 || b.height === 0) continue
            if (getComputedStyle(el).position === 'fixed') continue // calé sur le viewport déjà élargi : simple symptôme
            if (b.right > iw + 1) {
              // ignorer ce qui est coupé par un parent qui défile ou clippe
              let p = el.parentElement, clipped = false
              while (p && p !== document.body) {
                const o = getComputedStyle(p)
                if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clipped = true; break }
                p = p.parentElement
              }
              if (!clipped) bad.push((el.id ? '#' + el.id : el.tagName.toLowerCase()) + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '') + ' droite=' + Math.round(b.right))
            }
          }
        }
        return { sw: de.scrollWidth, iw, bad: bad.slice(0, 5) }
      }, s.width) // largeur réelle de l'appareil : sur mobile, innerWidth grandit avec le débordement
      if (r.sw > r.iw + 1) { failures.push(`${label} @${s.name} scrollY~${i}/${steps}: scrollWidth ${r.sw} > ${r.iw} ; ${r.bad.join(' | ')}`); break }
    }
    errs.forEach(e => failures.push(`${label} @${s.name}: erreur JS ${e}`))
    await ctx.close()
  }
}
await browser.close(); server.close()
if (failures.length) {
  console.error('\n❌ Problèmes mobile/tablette :\n' + [...new Set(failures)].map(f => ' - ' + f).join('\n'))
  process.exit(1)
}
console.log(`✅ ${PAGES.length} pages × ${SIZES.length} tailles : aucun débordement horizontal.`)
