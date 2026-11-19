// progressmenu : menu des boissons de pr09re55, consulté en scannant un QR code.
// Générateur statique sans dépendance :  node build.mjs  ->  dist/
import fs from 'node:fs'
import path from 'node:path'
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
  { id: 'cocktails', pages: ['koktelok'], icon: 'coupe', a: '255 107 94', title: T('Koktélok', 'Cocktails', 'Cocktails') },
  { id: 'long', pages: ['long-drinks'], icon: 'tumbler', a: '56 220 205', title: T('Long drinkek', 'Long drinks', 'Long drinks') },
  { id: 'summer', pages: ['nyari'], icon: 'coupe', a: '255 200 61', title: T('Nyári ajánlat és snackek', 'Summer specials & snacks', 'Spécialités d’été et en-cas') },
  { id: 'bubbles', pages: ['pezsgok', 'prosecco'], icon: 'flute', a: '255 226 150', title: T('Pezsgők', 'Bubbles', 'Bulles') },
  { id: 'wine', pages: ['feherbor', 'roze-voros'], icon: 'wine', a: '240 110 160', title: T('Borlap', 'Wine list', 'Carte des vins') },
  { id: 'spirits', pages: ['rovidital'], icon: 'tumbler', a: '236 154 84', title: T('Röviditalok', 'Spirits', 'Spiritueux') },
  { id: 'hot', pages: ['kave-tea'], icon: 'cup', a: '255 160 70', title: T('Kávé és tea', 'Coffee & tea', 'Café et thé') },
  { id: 'zero', pages: ['alkoholmentes'], icon: 'tumbler', a: '150 230 90', title: T('Alkoholmentes', 'Alcohol-free', 'Sans alcool') },
]
const PAGE = Object.fromEntries(menu.pages.filter(p => p.sections).map(p => [p.slug, p]))
const cardSections = new Set(photos.cardSections)
const cardNames = new Set(photos.cardNames.map(norm))
const missing = []

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
  const lab = sec.cols && sec.cols.length > 1 ? '' : ''
  return `<li class="card${img ? '' : ' noimg'}" style="--a:${g.a}">
  <div class="ph">${ph}</div>
  <div class="tx"><h4>${L(it.name)}</h4>${it.desc ? `<p class="d">${L(it.desc)}</p>` : ''}<p class="pr">${priceCells(it, sec)}${lab}</p></div>
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
  const body = g.pages.map(slug => PAGE[slug].sections.map((s, i) => section(g, PAGE[slug], s, i)).join('')).join('')
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
  return `<symbol id="frond" viewBox="-40 -230 780 520"><g fill="currentColor">${paths.join('')}</g><path d="M0 0Q300-150 620 60" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/></symbol>`
}
const glyphs = `
<symbol id="g-coupe" viewBox="0 0 100 150"><path d="M10 28h80c0 30-22 52-40 52S10 58 10 28Z" fill="currentColor" fill-opacity=".8" stroke="#fff" stroke-opacity=".7" stroke-width="2.5"/><path d="M50 80v52M30 134h40" stroke="#fff" stroke-opacity=".8" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M20 36h60" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/><circle cx="64" cy="18" r="9" fill="currentColor" stroke="#fff" stroke-opacity=".7" stroke-width="2"/></symbol>
<symbol id="g-tumbler" viewBox="0 0 100 150"><path d="M22 22h56l-6 106a8 8 0 0 1-8 7H36a8 8 0 0 1-8-7Z" fill="currentColor" fill-opacity=".55" stroke="#fff" stroke-opacity=".75" stroke-width="2.5"/><path d="M26 54h48l-3 74a8 8 0 0 1-8 7H37a8 8 0 0 1-8-7Z" fill="currentColor" fill-opacity=".85"/><rect x="34" y="62" width="17" height="17" rx="3" fill="#fff" fill-opacity=".35"/><rect x="52" y="84" width="15" height="15" rx="3" fill="#fff" fill-opacity=".3"/><path d="M62 4 54 56" stroke="#fff" stroke-opacity=".85" stroke-width="4" stroke-linecap="round"/></symbol>
<symbol id="g-flute" viewBox="0 0 100 150"><path d="M36 14h28l-3 78c-.5 8-6 12-11 12s-10.500-4-11-12Z" fill="currentColor" fill-opacity=".7" stroke="#fff" stroke-opacity=".75" stroke-width="2.5"/><path d="M50 104v28M32 136h36" stroke="#fff" stroke-opacity=".8" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="46" cy="64" r="2.500" fill="#fff" fill-opacity=".8"/><circle cx="54" cy="46" r="3" fill="#fff" fill-opacity=".8"/><circle cx="47" cy="30" r="2" fill="#fff" fill-opacity=".8"/></symbol>
<symbol id="g-wine" viewBox="0 0 100 150"><path d="M28 14h44c4 40-6 70-22 70S24 54 28 14Z" fill="currentColor" fill-opacity=".7" stroke="#fff" stroke-opacity=".75" stroke-width="2.5"/><path d="M50 84v48M30 136h40" stroke="#fff" stroke-opacity=".8" stroke-width="4" stroke-linecap="round" fill="none"/></symbol>
<symbol id="g-cup" viewBox="0 0 100 150"><path d="M16 50h58v34c0 16-12 28-29 28S16 100 16 84Z" fill="currentColor" fill-opacity=".8" stroke="#fff" stroke-opacity=".75" stroke-width="2.5"/><path d="M74 60h8a10 10 0 0 1 0 22h-9" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="4"/><path d="M34 40c-5-7 5-11 0-18M52 40c-5-7 5-11 0-18" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round" fill="none"/><ellipse cx="45" cy="124" rx="38" ry="6" fill="#fff" fill-opacity=".25"/></symbol>`

const use = (c, cls, style) => (style = style.replace(/width:(\d+)%/, (m, p) => `width:min(${p}%,${Math.round(p * 7.5)}px)`), `<svg class="leaf ${cls}" viewBox="-40 -230 780 520" style="color:${c};${style}" aria-hidden="true"><use href="#frond"/></svg>`)
const jungle = `
<div class="bg" aria-hidden="true">
<svg width="0" height="0" style="position:absolute"><defs>${frond()}${glyphs}</defs></svg>
<div class="rays"></div>
<div class="lyr l1" data-p=".10">${use('#0d6a4c', 'sway', 'left:-30%;top:2%;width:110%;--r:18deg')}${use('#0a5a43', 'sway s2', 'right:-45%;top:30%;width:120%;--r:-205deg')}${use('#117a56', 'sway', 'left:-40%;top:62%;width:115%;--r:-12deg')}</div>
<div class="lyr l2" data-p=".22">${use('#17935f', 'sway s2', 'right:-35%;top:-6%;width:105%;--r:200deg')}${use('#1ba56c', 'sway', 'left:-50%;top:44%;width:105%;--r:8deg')}${use('#139058', 'sway s3', 'right:-40%;top:78%;width:110%;--r:-170deg')}</div>
<div class="lyr l3" data-p=".40">${use('#052e22', 'sway s3', 'left:-62%;top:18%;width:125%;--r:-18deg')}${use('#06382a', 'sway', 'right:-70%;top:56%;width:130%;--r:192deg')}</div>
<i class="bk b1"></i><i class="bk b2"></i><i class="bk b3"></i><i class="bk b4"></i><i class="bk b5"></i>
</div>`

// ---------- page ----------
const css = read('src/style.css')
const js = read('src/app.js')
const L3 = (hu, en, fr) => L({ hu, en, fr })
const contact = menu.pages.find(p => p.kind === 'cover').contact
const addr = contact[0]
const insta = contact.find(c => c.startsWith('Instagram'))?.replace('Instagram: ', '')

const html = `<!doctype html>
<html lang="hu" data-l="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>pr09re55 · Itallap / Menu</title>
<meta name="description" content="pr09re55 itallap · drink menu · carte des boissons — Pozsonyi út 43, Budapest.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#073b2d">
<link rel="preload" href="assets/fonts/prata-400-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
<script>(function(){var d=document.documentElement,l;try{l=localStorage.getItem('pm_lang')}catch(e){}if(!/^(hu|en|fr)$/.test(l||'')){var n=(navigator.language||'hu').slice(0,2).toLowerCase();l=n==='hu'?'hu':n==='fr'?'fr':'en'}d.setAttribute('data-l',l);d.lang=l})()</script>
<style>${css}</style>
</head>
<body>
${jungle}
<main>
<header class="hero">
  <div class="topbar"><span class="brand" role="img" aria-label="pr09re55"></span>
    <div class="lang" role="group" aria-label="Language / Nyelv / Langue"><button type="button" data-set-l="hu">HU</button><button type="button" data-set-l="en">EN</button><button type="button" data-set-l="fr">FR</button></div></div>
  <p class="kick">${L3('Pozsonyi út 43 · Budapest', 'Pozsonyi út 43 · Budapest', 'Pozsonyi út 43 · Budapest')}</p>
  <h1>${L3('Itallap', 'The drinks menu', 'La carte des boissons')}</h1>
  <p class="lede">${L3('Koktélok, bubik és minden, ami kell egy jó estéhez.', 'Cocktails, bubbles and everything a good evening needs.', 'Cocktails, bulles et tout ce qu’il faut pour une bonne soirée.')}</p>
  <a class="go" href="#cocktails">${L3('Nézzük meg', 'Let’s explore', 'Découvrir')}<span aria-hidden="true">↓</span></a>
</header>
<nav class="chips" aria-label="${esc('Menu')}"><div class="chips-in">${chips}</div></nav>
<div class="wrap">
${sections}
</div>
<footer class="foot"><p>${esc(addr)}</p><p>${insta ? esc(insta) : ''}</p></footer>
</main>
<script>${js}</script>
</body>
</html>`

// ---------- écriture ----------
fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })
fs.writeFileSync(path.join(dist, 'index.html'), html)
fs.cpSync(path.join(here, 'assets'), path.join(dist, 'assets'), { recursive: true, filter: s => !s.endsWith('.gitkeep') })
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
console.log(`✓ dist/index.html (${(html.length / 1024).toFixed(0)} Ko) — ${missing.length} carte(s) sans image : ${missing.join(', ') || '—'}`)
