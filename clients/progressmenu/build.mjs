// progressmenu : menu des boissons de pr09re55, consulté en scannant un QR code.
// Générateur statique sans dépendance :  node build.mjs  ->  dist/
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(here, 'dist')
const read = f => fs.readFileSync(path.join(here, f), 'utf8')
const menu = JSON.parse(read('content/menu.json'))
const photos = JSON.parse(read('content/photos.json'))
const LANGS = ['hu', 'en', 'fr']

// ---------- petits outils ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const nbspNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const price = n => nbspNum(n) + ' Ft'
const tx = (v, l) => (typeof v === 'string' ? v : v[l])
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const slugify = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Texte multilingue : identique dans les 3 langues -> texte simple, sinon un <span> par variante.
function L(v) {
  if (typeof v === 'string') return esc(v)
  const groups = new Map()
  for (const l of LANGS) { const t = v[l]; groups.set(t, [...(groups.get(t) || []), l]) }
  if (groups.size === 1) return esc(v.hu)
  return [...groups].map(([t, ls]) => `<span data-l="${ls.join(' ')}">${esc(t)}</span>`).join('')
}

const L3 = (hu, en, fr) => L({ hu, en, fr })

// ---------- images des boissons ----------
const drinksDir = path.join(here, 'assets/img/drinks')
let manifest = {}
const mf = path.join(drinksDir, 'manifest.json')
if (fs.existsSync(mf)) {
  const raw = JSON.parse(fs.readFileSync(mf, 'utf8'))
  const entries = Array.isArray(raw) ? raw : Object.entries(raw.items || raw)
  for (const e of entries) {
    const [slug, name] = Array.isArray(e) ? e : [e.slug, e.name]
    if (slug && typeof name === 'string') manifest[norm(name)] = slug
  }
}
const slugFor = name => manifest[norm(name)] || slugify(name)
function imageFor(name) {
  const slug = slugFor(name)
  for (const ext of ['webp', 'png']) if (fs.existsSync(path.join(drinksDir, `${slug}.${ext}`))) return `assets/img/drinks/${slug}.${ext}`
  return null
}

// ---------- groupes de la carte ----------
const T = (hu, en, fr) => ({ hu, en, fr })
const GROUPS = [
  { id: 'cocktails', pages: ['koktelok'], icon: 'coupe', a: '60 240 164', title: T('Koktélok', 'Cocktails', 'Cocktails') },
  { id: 'long', pages: ['long-drinks'], icon: 'tumbler', a: '125 149 255', title: T('Long drinkek', 'Long drinks', 'Long drinks') },
  { id: 'summer', pages: ['nyari'], icon: 'coupe', a: '255 140 198', hide: ['Bloody Mary', 'Mimosa', 'Hugo Deluxe', 'Noam Bavaria Berlin'], title: T('Snackek', 'Snacks', 'En-cas') },
  // Décision du 19/11/2026 : le menu ne montre QUE cocktails, long drinks et offre d'été + snacks.
  // Les autres familles (bulles, vins, spiritueux, café, sans alcool) restent dans content/menu.json, non affichées.
]
const PAGE = Object.fromEntries(menu.pages.filter(p => p.sections).map(p => [p.slug, p]))
const cardSections = new Set(photos.cardSections)
const cardNames = new Set(photos.cardNames.map(norm))
const explode = photos.explode || {}
const explodeNames = new Set(Object.keys(explode).map(norm))
const missing = []

// Modèle 3D professionnel (GLB) : utilisé seulement si assets/models/negroni.glb (ou NEGRONI_GLB=chemin) existe ET passe le contrôle.
// Sinon rien ne change : le Negroni actuel reste affiché. Voir docs/cahier-des-charges-negroni-3d.fr.md.
let glb = null
{
  const cfg = JSON.parse(read('content/negroni-model.json'))
  const src = process.env.NEGRONI_GLB ? path.resolve(process.env.NEGRONI_GLB) : path.join(here, cfg.model)
  if (fs.existsSync(src)) {
    const { inspect, formatReport } = await import('./tools/glb-lib.mjs')
    const buf = fs.readFileSync(src), rep = inspect(buf, cfg)
    console.log(`Modèle 3D ${path.relative(here, src)} :\n${formatReport(rep)}`)
    if (rep.ok) {
      const v = crypto.createHash('sha1').update(buf).update(JSON.stringify(cfg)).digest('hex').slice(0, 10)
      const present = cfg.parts.filter(p => (rep.info.parts[p.key] || []).length)
      glb = { cfg, buf, norm: norm(cfg.drink), data: { m: `assets/models/negroni.glb?v=${v}`, c: `assets/models/negroni-model.json?v=${v}`, l: present.map(p => ({ t: p.key, n: p.label })) } }
    } else console.warn('⚠ modèle 3D ignoré (voir ci-dessus) : le Negroni actuel reste affiché.')
  }
}

// Vue éclatée : couches définies dans content/photos.json ; les noms d'ingrédients doivent figurer dans la description du menu.

// Vue éclatée « photo » (Negroni) : images pré-calculées dans Blender, importées par tools/import-seq.py dans assets/seq/.
// Utilisée seulement si toutes les images sont présentes ; sinon la vue 3D actuelle reste, rien d'autre ne change.
function seqData(ent, en) {
  if (!ent || !ent.seq) return null
  const dir = ent.seq.dir.replace(/\/+$/, ''), f = path.join(here, dir, 'seq.json')
  if (!fs.existsSync(f)) return null
  const s = JSON.parse(fs.readFileSync(f, 'utf8'))
  if (s.fmt !== 2) { console.warn(`⚠ séquence ${dir} : ancien format (relancer tools/import-seq.py) : vue 3D actuelle conservée pour ${en}`); return null }
  const names = Array.from({ length: s.n }, (_, i) => String(i).padStart(2, '0'))
  const miss = s.w.flatMap(w => names.map(n => `${w}/${n}.webp`)).filter(x => !fs.existsSync(path.join(here, dir, x)))
  if (miss.length) { console.warn(`⚠ séquence ${dir} incomplète (${miss.slice(0, 3).join(', ')}…) : vue 3D actuelle conservée pour ${en}`); return null }
  for (const l of s.l) if (!ent.layers.some(x => x.t === l.k)) console.warn(`⚠ séquence ${dir} : « ${l.k} » n'a pas de nom dans content/photos.json (${en})`)
  const kb = s.w.map(w => names.reduce((t, n) => t + fs.statSync(path.join(here, dir, `${w}/${n}.webp`)).size, 0) / 1024)
  console.log(`Vue éclatée photo de ${en} : ${s.n} images, ${s.w.map((w, i) => `${w} px ${kb[i].toFixed(0)} Ko`).join(', ')}`)
  return { p: dir + '/', fmt: 2, n: s.n, w: s.w, r: s.r, v: s.v, b: s.b, l: s.l, g: s.g, bg: s.bg, st: s.st, c: ent.seq.cartoon }
}

const priceCells = (it, sec) => it.prices.map((n, k) => {
  const lab = sec.cols && sec.cols[k] ? `<small>${L(sec.cols[k])}</small>` : ''
  return `<span class="pv">${lab}<b>${price(n)}</b></span>`
}).join('')

function card(it, g, sec) {
  const en = tx(it.name, 'en')
  const img = imageFor(en)
  if (!img) missing.push(en)
  const ph = img
    ? `<img src="${img}" alt="" loading="lazy" decoding="async">`
    : `<svg class="glass" viewBox="0 0 100 150" aria-hidden="true"><use href="#g-${g.icon}"/></svg>`
  const key = Object.keys(explode).find(k => norm(k) === norm(en))
  const ent = img && key ? explode[key] : null
  const layers = ent ? ent.layers : []
  const xv = layers.length > 1
  if (xv) for (const l of layers) if (typeof l.n === 'string' && !norm(tx(it.desc || '', 'en')).includes(norm(l.n))) console.warn(`⚠ vue éclatée : « ${l.n} » absent de la description de ${en}`)
  const sq = xv ? seqData(ent, en) : null
  const xvData = xv ? ` data-xv="${esc(JSON.stringify({ s: ent.scene, l: layers, ...(glb && norm(en) === glb.norm ? { g: glb.data } : {}), ...(sq ? { q: sq } : {}) }))}"` : ''
  const xvBtn = xv ? `<button type="button" class="xv-open" aria-haspopup="dialog"><span class="sr">${L3('3D modell megtekintése', 'View the 3D model', 'Voir le modèle 3D')} : ${L(it.name)}</span></button>` : ''
  const xvHint = xv ? `<p class="xvh" aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4z"/><path d="M4 7.4 12 12l8-4.6M12 12v9.2"/></svg><span>${L3('3D nézet', 'View in 3D', 'Voir en 3D')}</span></p>` : ''
  return `<li class="card${img ? '' : ' noimg'}${xv ? ' has-xv' : ''}" style="--a:${g.a}"${xvData}>
  <div class="ph">${ph}</div>
  <div class="tx"><h4>${L(it.name)}</h4>${it.desc ? `<p class="d">${L(it.desc)}</p>` : ''}<p class="pr">${priceCells(it, sec)}</p>${xvHint}</div>${xvBtn}
</li>`
}
const row = (it, sec) => `<li class="row"><div class="rn"><h4>${L(it.name)}</h4>${it.desc ? `<p class="d">${L(it.desc)}</p>` : ''}</div><p class="pr">${priceCells(it, sec)}</p></li>`

function section(g, pg, sec, idx) {
  const key = `${pg.slug}:${idx}`
  const cards = []
  const rows = []
  const out = []
  const flush = () => {
    if (cards.length) out.push(`<ul class="cards">${cards.splice(0).join('')}</ul>`)
    if (rows.length) out.push(`<ul class="rows">${rows.splice(0).join('')}</ul>`)
  }
  let last = null
  for (const it of sec.items) {
    const asCard = cardSections.has(pg.slug) || cardSections.has(key) || cardNames.has(norm(tx(it.name, 'en')))
    if (last !== null && last !== asCard) flush()
    last = asCard
    if (asCard) cards.push(card(it, g, sec)); else rows.push(row(it, sec))
  }
  flush()
  const head = sec.title ? `<h3 class="sub">${L(sec.title)}</h3>` : ''
  const cols = !out.join('').includes('class="card') && sec.cols && sec.cols.length ? '' : ''
  const note = sec.note ? `<p class="note">${L(sec.note)}</p>` : ''
  return `<div class="sec">${head}${cols}${out.join('')}${note}</div>`
}

const sections = GROUPS.map(g => {
  const keep = g.only ? new Set(g.only.map(norm)) : null
  const hide = new Set((g.hide || []).map(norm))
  const body = g.pages.map(slug => PAGE[slug].sections.map((s, i) => {
    if (hide.size) { s = { ...s, items: s.items.filter(it => !hide.has(norm(tx(it.name, 'en')))) }; if (!s.items.length) return '' }
    if (!keep) return section(g, PAGE[slug], s, i)
    const items = s.items.filter(it => keep.has(norm(tx(it.name, 'en'))))
    return items.length ? section(g, PAGE[slug], { ...s, title: null, items }, i) : ''
  }).join('')).join('')
  return `<section class="grp" id="${g.id}" style="--a:${g.a}" data-grp>
<header class="gh"><span class="gi"><svg viewBox="0 0 100 150" aria-hidden="true"><use href="#g-${g.icon}"/></svg></span><h2>${L(g.title)}</h2></header>
${body}
</section>`
}).join('\n')

const chips = GROUPS.map(g => `<a href="#${g.id}" data-chip="${g.id}" style="--a:${g.a}">${L(g.title)}</a>`).join('')

// ---------- feuillage : palmes générées par code ----------
function frond() {
  const P0 = [0, 0], P1 = [300, -150], P2 = [620, 60]
  const B = t => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1]]
  const Tg = t => { const x = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]); const y = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]); const m = Math.hypot(x, y); return [x / m, y / m] }
  const f = n => n.toFixed(1)
  const paths = []
  const N = 34
  for (let i = 0; i < N; i++) {
    const t = 0.06 + (i / (N - 1)) * 0.93
    const [bx, by] = B(t), [tx_, ty] = Tg(t)
    const len = 15 + 150 * Math.sin(Math.PI * (0.12 + 0.82 * t)) * (1 - 0.35 * t)
    for (const s of [1, -1]) {
      const ang = s * (1.15 - 0.45 * t)
      const c = Math.cos(ang), sn = Math.sin(ang)
      let dx = tx_ * c - ty * sn, dy = tx_ * sn + ty * c
      const ex = bx + dx * len, ey = by + dy * len + len * 0.28
      const mx = (bx + ex) / 2, my = (by + ey) / 2
      const nx = -(ey - by), ny = ex - bx, nm = Math.hypot(nx, ny) || 1
      const w = len * 0.1
      const qa = [mx + (nx / nm) * w, my + (ny / nm) * w], qb = [mx - (nx / nm) * w, my - (ny / nm) * w]
      paths.push(`<path d="M${f(bx)} ${f(by)}Q${f(qa[0])} ${f(qa[1])} ${f(ex)} ${f(ey)}Q${f(qb[0])} ${f(qb[1])} ${f(bx)} ${f(by)}Z"${s < 0 ? ' opacity=".78"' : ''}/>`)
    }
  }
  return `<symbol id="frond" viewBox="-40 -230 780 520"><g fill="currentColor">${paths.join('')}</g><path d="M0 0Q300-150 620 60" fill="none" stroke="#111" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/></symbol>`
}
const glyphs = `
<symbol id="g-coupe" viewBox="0 0 100 150"><path d="M10 28h80c0 30-22 52-40 52S10 58 10 28Z" fill="currentColor" fill-opacity=".8" stroke="#111" stroke-opacity=".7" stroke-width="2.5"/><path d="M50 80v52M30 134h40" stroke="#111" stroke-opacity=".8" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M20 36h60" stroke="#111" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/><circle cx="64" cy="18" r="9" fill="currentColor" stroke="#111" stroke-opacity=".7" stroke-width="2"/></symbol>
<symbol id="g-tumbler" viewBox="0 0 100 150"><path d="M22 22h56l-6 106a8 8 0 0 1-8 7H36a8 8 0 0 1-8-7Z" fill="currentColor" fill-opacity=".55" stroke="#111" stroke-opacity=".75" stroke-width="2.5"/><path d="M26 54h48l-3 74a8 8 0 0 1-8 7H37a8 8 0 0 1-8-7Z" fill="currentColor" fill-opacity=".85"/><rect x="34" y="62" width="17" height="17" rx="3" fill="#fff" fill-opacity=".35"/><rect x="52" y="84" width="15" height="15" rx="3" fill="#fff" fill-opacity=".3"/><path d="M62 4 54 56" stroke="#111" stroke-opacity=".85" stroke-width="4" stroke-linecap="round"/></symbol>
<symbol id="g-flute" viewBox="0 0 100 150"><path d="M36 14h28l-3 78c-.5 8-6 12-11 12s-10.500-4-11-12Z" fill="currentColor" fill-opacity=".7" stroke="#111" stroke-opacity=".75" stroke-width="2.5"/><path d="M50 104v28M32 136h36" stroke="#111" stroke-opacity=".8" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="46" cy="64" r="2.500" fill="#fff" fill-opacity=".8"/><circle cx="54" cy="46" r="3" fill="#fff" fill-opacity=".8"/><circle cx="47" cy="30" r="2" fill="#fff" fill-opacity=".8"/></symbol>
<symbol id="g-wine" viewBox="0 0 100 150"><path d="M28 14h44c4 40-6 70-22 70S24 54 28 14Z" fill="currentColor" fill-opacity=".7" stroke="#111" stroke-opacity=".75" stroke-width="2.5"/><path d="M50 84v48M30 136h40" stroke="#111" stroke-opacity=".8" stroke-width="4" stroke-linecap="round" fill="none"/></symbol>
<symbol id="g-cup" viewBox="0 0 100 150"><path d="M16 50h58v34c0 16-12 28-29 28S16 100 16 84Z" fill="currentColor" fill-opacity=".8" stroke="#111" stroke-opacity=".75" stroke-width="2.5"/><path d="M74 60h8a10 10 0 0 1 0 22h-9" fill="none" stroke="#111" stroke-opacity=".75" stroke-width="4"/><path d="M34 40c-5-7 5-11 0-18M52 40c-5-7 5-11 0-18" stroke="#111" stroke-opacity=".6" stroke-width="3" stroke-linecap="round" fill="none"/><ellipse cx="45" cy="124" rx="38" ry="6" fill="#fff" fill-opacity=".25"/></symbol>`

const xvSymbols = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="xg-gin-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4fffd"/><stop offset="1" stop-color="#b9ece4"/></linearGradient>
<linearGradient id="xg-gin-s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8fd3c9"/><stop offset=".45" stop-color="#c6f1ea"/><stop offset="1" stop-color="#7cc3b8"/></linearGradient>
<linearGradient id="xg-campari-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a68"/><stop offset="1" stop-color="#e0302b"/></linearGradient>
<linearGradient id="xg-campari-s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b3201f"/><stop offset=".45" stop-color="#e6392f"/><stop offset="1" stop-color="#9a1a1b"/></linearGradient>
<linearGradient id="xg-vermouth-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#f0ac32"/></linearGradient>
<linearGradient id="xg-vermouth-s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c98a1f"/><stop offset=".45" stop-color="#f2b840"/><stop offset="1" stop-color="#b87a17"/></linearGradient>
<linearGradient id="xg-tonic-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8dc"/><stop offset="1" stop-color="#f1dfa6"/></linearGradient>
<linearGradient id="xg-tonic-s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9c27d"/><stop offset=".45" stop-color="#f6e7b3"/><stop offset="1" stop-color="#cdb36a"/></linearGradient>
<linearGradient id="xg-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".5" stop-color="#e2ab45"/><stop offset="1" stop-color="#9a6a1a"/></linearGradient>
<radialGradient id="xg-dorange-f" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#f0bf5e"/><stop offset="1" stop-color="#c9831f"/></radialGradient>
<radialGradient id="xg-orange-f" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffc065"/><stop offset="1" stop-color="#ff8a1f"/></radialGradient>
<linearGradient id="xg-ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset="1" stop-color="#bfe6f2" stop-opacity=".4"/></linearGradient>
</defs></svg>`
const xvOverlay = `<div id="xv" class="xv" hidden role="dialog" aria-modal="true" aria-labelledby="xvt">
<div class="xv-bg"></div>
<button type="button" class="xv-x" aria-label="${esc('Bezár / Close / Fermer')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg></button>
<div class="xv-head"><h3 id="xvt"></h3></div>
<div class="xv-stage" id="xvs">
  <div class="xv-3dhost" id="xv3"></div>
  <div class="xv-layers"></div>
  <div class="xv-sq" id="xvq" hidden aria-hidden="true"><canvas></canvas><img alt="" draggable="false"><i class="xv-sqbar"></i></div>
  <img class="xv-glass" alt="">
  <div class="xv-labels" id="xvl"></div>
</div>
<p class="xv-tip" hidden>${L3('Húzd az ujjad a forgatáshoz', 'Drag to rotate', 'Glissez pour faire tourner')}</p>
<p class="xv-tip xv-tipq" hidden>${L3('Húzd az ujjad fel vagy le', 'Drag up or down', 'Glissez vers le haut ou le bas')}</p>
<button type="button" class="xv-tg" hidden aria-pressed="false"><span class="t-ex">${L3('Szétszed', 'Explode', 'Décomposer')}</span><span class="t-re">${L3('Összerak', 'Reassemble', 'Reconstituer')}</span></button>
</div>`

const use = (c, cls, style) => (style = style.replace(/width:(\d+)%/, (m, p) => `width:min(${p}%,${Math.round(p * 7.5)}px)`), `<svg class="leaf ${cls}" viewBox="-40 -230 780 520" style="color:${c};${style}" aria-hidden="true"><use href="#frond"/></svg>`)
const jungle = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${glyphs}</defs></svg>`

// ---------- page ----------
const css = read('src/style.css')
const js = read('src/app.js')
const contact = menu.pages.find(p => p.kind === 'cover').contact
const addr = contact[0]
const insta = contact.find(c => c.startsWith('Instagram'))?.replace('Instagram: ', '')

const html = `<!doctype html>
<html lang="hu" data-l="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>pr09re55 · Koktélkártya / Menu</title>
<meta name="description" content="pr09re55 koktélkártya · cocktail menu · carte des cocktails — Pozsonyi út 43, Budapest.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#efefed">
<link rel="preload" href="assets/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/bebas-neue-latin.woff2" as="font" type="font/woff2" crossorigin>
<script>(function(){var d=document.documentElement,l;try{l=localStorage.getItem('pm_lang')}catch(e){}if(!/^(hu|en|fr)$/.test(l||'')){var n=(navigator.language||'hu').slice(0,2).toLowerCase();l=n==='hu'?'hu':n==='fr'?'fr':'en'}d.setAttribute('data-l',l);d.lang=l})()</script>
<style>${css}</style>
</head>
<body>
${jungle}
${xvSymbols}
<main>
<header class="hero">
  <div class="topbar"><span class="brand" role="img" aria-label="pr09re55"></span>
    <div class="lang" role="group" aria-label="Language / Nyelv / Langue"><button type="button" data-set-l="hu">HU</button><button type="button" data-set-l="en">EN</button><button type="button" data-set-l="fr">FR</button></div></div>
  <p class="kick">${L3('Pozsonyi út 43 · Budapest', 'Pozsonyi út 43 · Budapest', 'Pozsonyi út 43 · Budapest')}</p>
  <h1>${L3('Koktélkártya', 'The cocktail menu', 'La carte des cocktails')}</h1>
  <p class="lede">${L3('Koktélok, long drinkek és snackek.', 'Cocktails, long drinks and snacks.', 'Cocktails, long drinks et en-cas.')}</p>
  <a class="go" href="#cocktails">${L3('Nézzük meg', 'Let’s explore', 'Découvrir')}<span aria-hidden="true">↓</span></a>
</header>
<nav class="chips" aria-label="${esc('Menu')}"><div class="chips-in">${chips}</div></nav>
<div class="wrap">
${sections}
</div>
<footer class="foot"><a class="site-btn" href="https://pr09re55.vercel.app/fr/"><span>${L3('A pr09re55 weboldala', 'Visit our website', 'Découvrir notre site')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a><p>${esc(addr)}</p><p>${insta ? esc(insta) : ''}</p></footer>
</main>
${xvOverlay}
<script>${js}</script>
</body>
</html>`

// ---------- écriture ----------
fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })
fs.writeFileSync(path.join(dist, 'index.html'), html)
fs.cpSync(path.join(here, 'assets'), path.join(dist, 'assets'), { recursive: true, filter: s => !s.endsWith('.gitkeep') })
if (glb) {
  fs.mkdirSync(path.join(dist, 'assets/models'), { recursive: true })
  fs.writeFileSync(path.join(dist, 'assets/models/negroni.glb'), glb.buf)
  const { _doc, ...pub } = glb.cfg
  fs.writeFileSync(path.join(dist, 'assets/models/negroni-model.json'), JSON.stringify(pub))
}
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
console.log(`✓ dist/index.html (${(html.length / 1024).toFixed(0)} Ko) — ${missing.length} carte(s) sans image : ${missing.join(', ') || '—'}`)
