// pr09re55 static site generator. No dependencies: `node build.mjs` writes dist/.
// `node build.mjs --preview` writes relative links (works when opened from a sub-folder or a preview host).
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { UI } from './src/ui.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'dist');
const PREVIEW = process.argv.includes('--preview');
// Menu text is either one string for both languages or { hu, en }.
const tx = (v, l) => (v && typeof v === 'object') ? v[l] : (v ?? '');
const read = f => JSON.parse(readFileSync(join(ROOT, 'content', f), 'utf8'));
const SITE = read('site.json');
const PRODUCTS = read('products.json').products;
const MONTH = read('monthly.json');
const COCKTAILS = read('cocktails.json');
const MENU = read('menu.json');
const STORY = read('story.json');
const NEWS = read('news.json');
const HL = read('highlights.json');
const CATS = read('products.json').categories;
const LANGS = ['hu', 'en'];

/* ---------------- Checks: a broken content file should fail loudly, not silently ---------------- */
const slugs = new Set();
for (const p of PRODUCTS) {
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`products.json: invalid slug "${p.slug}"`);
  if (slugs.has(p.slug)) throw new Error(`products.json: duplicate slug "${p.slug}"`);
  slugs.add(p.slug);
  for (const l of LANGS) if (!p.name?.[l] || !p.description?.[l]) throw new Error(`products.json: "${p.slug}" is missing name/description in ${l}`);
  if (p.price !== null && !(Number.isInteger(p.price) && p.price > 0)) throw new Error(`products.json: "${p.slug}" price must be a whole number or null`);
  for (const im of p.images) if (!existsSync(join(ROOT, 'assets/img', im))) throw new Error(`products.json: image not found assets/img/${im}`);
}

const menuSlugs = new Set();
for (const pg of MENU.pages) {
  if (!/^[a-z0-9-]+$/.test(pg.slug) || menuSlugs.has(pg.slug)) throw new Error(`menu.json: invalid or duplicate page slug "${pg.slug}"`);
  menuSlugs.add(pg.slug);
  for (const sec of pg.sections || []) for (const it of sec.items) {
    if (!it.prices.every(n => Number.isInteger(n) && n > 0)) throw new Error(`menu.json: "${tx(it.name, 'hu')}" prices must be whole numbers`);
    if (sec.cols && sec.cols.length !== it.prices.length) throw new Error(`menu.json: "${tx(it.name, 'hu')}" needs ${sec.cols.length} price(s)`);
  }
}

// A menu item by page slug and exact name, so highlights and classics reuse the card's real names and prices.
function menuItem([pageSlug, name]) {
  const pg = MENU.pages.find(x => x.slug === pageSlug);
  for (const sec of pg?.sections || []) for (const it of sec.items) if (tx(it.name, 'hu') === name || tx(it.name, 'en') === name) return { it, sec, pg };
  throw new Error(`menu item not found: ${pageSlug} / ${name}`);
}
const img = f => { if (!existsSync(join(ROOT, 'assets/img', f))) throw new Error(`image not found assets/img/${f}`); return f; };
for (const c of CATS) { img(c.image); for (const l of LANGS) if (!/^[a-z0-9-]+$/.test(c.slug[l]) || slugs.has(c.slug[l])) throw new Error(`products.json: category slug "${c.slug[l]}" is invalid or used by a product`); }
for (const p of PRODUCTS) if (!CATS.some(c => c.key === p.category)) throw new Error(`products.json: "${p.slug}" has an unknown category "${p.category}"`);
for (const h of HL.shop) { img(h.image); if (!slugs.has(h.product)) throw new Error(`highlights.json: unknown product "${h.product}"`); }
for (const h of HL.drinks) { img(h.image); menuItem(h.menu); }
for (const c of COCKTAILS.classics) menuItem(c);

for (const n of NEWS.items) {
  if (!/^[a-z0-9-]+$/.test(n.slug)) throw new Error(`news.json: invalid slug "${n.slug}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(n.dateStart) || (n.dateEnd && !/^\d{4}-\d{2}-\d{2}$/.test(n.dateEnd))) throw new Error(`news.json: "${n.slug}" dates must be YYYY-MM-DD`);
  for (const l of LANGS) if (!n.title?.[l] || !n.text?.[l]) throw new Error(`news.json: "${n.slug}" is missing title/text in ${l}`);
  if (n.image && !existsSync(join(ROOT, 'assets/img', n.image))) throw new Error(`news.json: image not found assets/img/${n.image}`);
}

/* ---------------- Routes: one path per page and language ---------------- */
const ROUTES = {
  home: { hu: '', en: 'en/' },
  shop: { hu: 'butik/', en: 'en/boutique/' },
  hlShop: { hu: 'kiemelt/butik/', en: 'en/highlights/boutique/' },
  hlDrinks: { hu: 'kiemelt/italok/', en: 'en/highlights/drinks/' },
  best: { hu: 'kedvencek/', en: 'en/bestsellers/' },
  cocktails: { hu: 'koktelok/', en: 'en/cocktails/' },
  menu: { hu: 'itallap/', en: 'en/menu/' },
  story: { hu: 'tortenet/', en: 'en/story/' },
  cart: { hu: 'kosar/', en: 'en/cart/' },
  news: { hu: 'mi-ujsag/', en: 'en/whats-new/' }
};
const productRoute = slug => ({ hu: `butik/${slug}/`, en: `en/boutique/${slug}/` });
const catRoute = c => ({ hu: `butik/${c.slug.hu}/`, en: `en/boutique/${c.slug.en}/` });

// Link from the page at `from` to the page at `to` (both are route paths like 'bolt/x/').
function link(from, to, hash = '') {
  if (!PREVIEW) return '/' + to + hash;
  const rel = posix.relative('/' + from, '/' + to) || '.';
  return (rel === '.' ? '' : rel + '/') + 'index.html' + hash;
}
function asset(from, file) { return PREVIEW ? (posix.relative('/' + from, '/assets') + '/' + file).replace(/^\//, '') : '/assets/' + file; }
const abs = path => SITE.baseUrl + '/' + path;

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtPrice = (n, l) => new Intl.NumberFormat(l === 'hu' ? 'hu-HU' : 'en-GB').format(n).replace(/\s/g, ' ') + ' Ft';
const fmtDate = (iso, l) => new Intl.DateTimeFormat(l === 'hu' ? 'hu-HU' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso));
const hm = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
// The house triangle (the shop's mark), always small and quiet: a wink, never the logo.
const MARK = '<polyline points="50,74 94,10 140,74"/><polyline points="72,74 94,42 182,160 12,160 44,115"/>';
// The client's own wordmark (traced from their 80×20 mm stamp file), inlined so it inherits currentColor.
const LOGO_SVG = readFileSync(join(ROOT, 'assets/img/pr09re55-logo.svg'), 'utf8');
const LOGO_VB = LOGO_SVG.match(/viewBox="([^"]+)"/)[1], LOGO_D = LOGO_SVG.match(/ d="([^"]+)"/)[1];
const logo = (cls = '', label = '') => `<svg class="wordmark ${cls}" viewBox="${LOGO_VB}"${label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"'}><path fill="currentColor" d="${LOGO_D}"/></svg>`;
const tri = (cls = '') => `<svg class="tri ${cls}" viewBox="0 0 194 170" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="12">${MARK}</g></svg>`;
// Magazine photos come in two widths: name.webp (1400 px) and name-800.webp.
const pic = (from, name, alt, sizes = '100vw', lazy = true) => `<img src="${asset(from, 'img/' + name + '.webp')}" srcset="${asset(from, 'img/' + name + '-800.webp')} 800w, ${asset(from, 'img/' + name + '.webp')} 1400w" sizes="${sizes}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
const ICON_BAG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2L5 8Z M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';
const demoTag = t => `<span class="demo-tag" title="${esc(t.demoNote)}">${esc(t.demo)}</span>`;
const bestsellers = () => PRODUCTS.filter(p => p.bestseller).sort((a, b) => a.bestsellerOrder - b.bestsellerOrder);

const ICON = {
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V7c0-.9.4-1.5 1.6-1.5H17V2.6A20 20 0 0 0 14.8 2.5C12.4 2.5 11 4 11 6.6v1.9H8.5v3.2H11v9.8h3v-9.8h2.6l.4-3.2Z" fill="currentColor"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 13v7h14v-7" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'
};

/* ---------------- Layout ---------------- */
function page({ l, key, path, alt, title, desc, image, body, jsonld = [], bodyClass = '', noindex = false }) {
  const t = UI[l];
  const navItems = ['shop', 'best', 'cocktails', 'menu', 'story', 'news'];
  const nav = navItems.map(k => `<a href="${link(path, ROUTES[k][l])}"${key === k ? ' aria-current="page"' : ''}>${esc(t.nav[k])}</a>`).join('');
  const visit = link(path, ROUTES.home[l], '#latogatas');
  const og = image ? abs('assets/img/' + image) : abs('assets/img/facade-wide.webp');
  const ld = jsonld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">${noindex ? '\n<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${abs(path)}">
<link rel="alternate" hreflang="hu" href="${abs(alt.hu)}">
<link rel="alternate" hreflang="en" href="${abs(alt.en)}">
<link rel="alternate" hreflang="x-default" href="${abs(alt.hu)}">
<meta property="og:type" content="${key === 'product' ? 'product' : 'website'}">
<meta property="og:site_name" content="pr09re55">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${og}">
<meta property="og:locale" content="${t.locale}">
<meta name="theme-color" content="#efefed">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,300..900;1,300..600&display=swap">
<link rel="stylesheet" href="${asset(path, 'css/site.css')}">
${ld}
<script>document.documentElement.classList.add('js');try{if(!sessionStorage.getItem('pr09re55_seen'))document.documentElement.classList.add('is-loading')}catch(e){}</script>
</head>
<body class="${bodyClass}" data-lang="${l}">
<div class="loader" id="loader" aria-hidden="true"><svg class="ld-mark" viewBox="0 0 194 170"><defs><linearGradient id="ldGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9cf95"/><stop offset=".45" stop-color="#b98d4e"/><stop offset=".7" stop-color="#f0d9a2"/><stop offset="1" stop-color="#a77a3f"/></linearGradient></defs><g fill="none" stroke="url(#ldGold)" stroke-width="4">${MARK}</g></svg><span class="ld-bar"><i></i></span></div>
<a class="skip" href="#main">${esc(t.skip)}</a>
<header class="masthead" id="masthead">
  <div class="mh-row">
    <nav class="mh-nav" aria-label="${esc(t.menu)}">${nav}</nav>
    <a class="logo" href="${link(path, ROUTES.home[l])}" aria-label="pr09re55 · ${esc(t.home)}">${logo('logo-word')}${tri('logo-mark')}</a>
    <div class="mh-tools">
      <a class="mh-visit" href="${visit}">${esc(t.nav.visit)}</a>
      <a class="mh-lang" href="${link(path, alt[t.other])}" hreflang="${t.other}" lang="${t.other}" aria-label="${esc(t.otherLabel)}">${t.other.toUpperCase()}</a>
      <a class="mh-ig" href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
      <a class="mh-cart" href="${link(path, ROUTES.cart[l])}" data-cart-link aria-label="${esc(t.cart)}"${key === 'cart' ? ' aria-current="page"' : ''}>${ICON_BAG}<span class="mh-cart-n" data-cart-count hidden></span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="drawer"><span class="sr-only">${esc(t.menu)}</span><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" hidden>
  <nav aria-label="${esc(t.menu)}">${nav}<a href="${visit}">${esc(t.nav.visit)}</a></nav>
  <p class="drawer-foot"><a href="${link(path, alt[t.other])}" hreflang="${t.other}">${esc(t.otherLabel)}</a> · <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a></p>
</div>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <p class="foot-logo">${logo('logo-word', 'pr09re55')}${tri('logo-mark')}</p>
      <p class="foot-motto" lang="en">${esc(t.footerMotto)}</p>
    </div>
    <div>
      <p class="label">${esc(t.addressL)}</p>
      <p>${esc(SITE.address.street)}<br>${SITE.address.postalCode} ${esc(SITE.address.city)}</p>
      <p><a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${esc(t.route)} ↗</a></p>
    </div>
    <div>
      <p class="label">${esc(t.contactL)}</p>
      <p><a href="${SITE.phoneHref}">${esc(SITE.phone)}</a></p>
      <p><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram ↗</a><br><a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook ↗</a></p>
    </div>
    <div>
      <p class="label">${esc(t.langLabel)}</p>
      <p class="foot-lang"><a href="${link(path, alt.hu)}" hreflang="hu" lang="hu"${l === 'hu' ? ' aria-current="true"' : ''}>Magyar</a> / <a href="${link(path, alt.en)}" hreflang="en" lang="en"${l === 'en' ? ' aria-current="true"' : ''}>English</a></p>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <p>© ${new Date().getFullYear()} pr09re55 · ${esc(t.tagline)}</p>
    <p>${esc(t.madeBy)}</p>
  </div>
</footer>
<script src="${asset(path, 'js/site.js')}" defer></script>
</body>
</html>`;
}

/* ---------------- Components ---------------- */
function productCard(p, l, from, size = '') {
  const t = UI[l];
  const price = p.price ? fmtPrice(p.price, l) : t.priceOnRequest;
  return `<article class="pcard ${size}" data-cat="${esc(p.category)}">
  <a class="pcard-link" href="${link(from, productRoute(p.slug)[l])}">
    <div class="pcard-ph" style="--tone:${esc(p.tone || '#f2efea')}"><img src="${asset(from, 'img/' + p.images[0])}" alt="${esc(p.brand !== '—' ? p.brand + ' ' + p.name[l] : p.name[l])}" loading="lazy" decoding="async"></div>
    <div class="pcard-txt">
      <p class="pcard-brand">${esc(p.brand)}${p.demo ? ' ' + demoTag(t) : ''}</p>
      <h3 class="pcard-name">${esc(p.name[l])}</h3>
      <p class="pcard-price">${esc(price)}</p>
    </div>
  </a>
</article>`;
}

function hoursTable(l) {
  const t = UI[l];
  return `<table class="hours" data-hours='${JSON.stringify(SITE.hours.week)}'><caption class="sr-only">${esc(t.hoursL)}</caption><tbody>${
    SITE.hours.week.map((h, i) => `<tr data-day="${i}"><th scope="row">${esc(t.days[i])}</th><td>${hm(h[0])}–${hm(h[1])}</td></tr>`).join('')
  }</tbody></table>`;
}

function reviewsBlock(l) {
  const t = UI[l], r = SITE.rating, per = 5;
  const quote = (q, i) => {
    const showTr = q.lang !== l && q.translation?.[l];
    return `<figure class="rq">
  <blockquote lang="${q.lang}">“${esc(q.text)}”</blockquote>
  ${showTr ? `<p class="rq-tr"><span>${esc(t.translated)}:</span> ${esc(q.translation[l])}</p>` : ''}
  <figcaption>${esc(q.author)} · Google ${q.rating}/5</figcaption>
</figure>`;
  };
  const sets = [];
  for (let i = 0; i < SITE.reviews.length; i += per) sets.push(SITE.reviews.slice(i, i + per));
  return `<section class="reviews wrap" aria-labelledby="rvT">
  <header class="sec-head">
    <p class="kicker">${tri()} ${esc(t.reviewsKicker)}</p>
    <h2 id="rvT">${t.reviewsTitle}</h2>
    <p class="rating"><b>${String(r.value).replace('.', l === 'hu' ? ',' : '.')}</b> <span class="stars" aria-hidden="true">★★★★★</span><br><small>${esc(t.ratingLine(String(r.value).replace('.', l === 'hu' ? ',' : '.'), r.count, fmtDate(r.checkedOn, l)))}</small></p>
  </header>
  <div class="rq-carousel" data-reviews>
    ${sets.map((set, k) => `<div class="rq-set" id="rq-set-${k}" role="group" aria-label="${esc(t.reviewsSet(k * per + 1, k * per + set.length))}"${k ? ' data-off' : ''}>${set.map(quote).join('')}</div>`).join('')}
  </div>
  ${sets.length > 1 ? `<div class="rq-dots" hidden>${sets.map((set, k) => `<button type="button" aria-controls="rq-set-${k}" aria-pressed="${k === 0}" aria-label="${esc(t.reviewsSet(k * per + 1, k * per + set.length))}"><i></i></button>`).join('')}</div>` : ''}
</section>`;
}

function visitBlock(l, from) {
  const t = UI[l];
  return `<section class="visit" id="latogatas" aria-labelledby="viT">
  <div class="wrap visit-grid">
    <header>
      <p class="kicker">${tri()} ${esc(t.visitKicker)}</p>
      <h2 id="viT">${t.visitTitle}</h2>
      <p class="status" data-open="${esc(t.openNow)}" data-closed="${esc(t.closedNow)}"><i></i><span>${esc(t.hoursNote)}</span></p>
    </header>
    <div class="visit-col">
      <p class="label">${esc(t.addressL)}</p>
      <address>${esc(SITE.address.street)}<br>${SITE.address.postalCode} ${esc(SITE.address.city)}</address>
      <p class="muted">${esc(t.area)}</p>
      <a class="btn" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${esc(t.route)} ↗</a>
    </div>
    <div class="visit-col">
      <p class="label">${esc(t.hoursL)}</p>
      ${hoursTable(l)}
      <p class="muted small">${esc(t.hoursNote)}</p>
    </div>
    <div class="visit-col">
      <p class="label">${esc(t.contactL)}</p>
      <p class="big-link"><a href="${SITE.phoneHref}">${esc(SITE.phone)}</a></p>
      <p><a class="tlink" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram ${esc(SITE.instagramHandle)} ↗</a></p>
      <p><a class="tlink" href="${SITE.facebook}" target="_blank" rel="noopener">Facebook ↗</a></p>
      <p class="muted small">${esc(t.tableNote)}</p>
    </div>
  </div>
</section>`;
}

const LOCAL_BUSINESS = {
  '@context': 'https://schema.org', '@type': 'BarOrPub', name: 'pr09re55', alternateName: 'Progress',
  url: SITE.baseUrl + '/', telephone: SITE.phone, image: abs('assets/img/facade-wide.webp'),
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, postalCode: SITE.address.postalCode, addressLocality: SITE.address.city, addressCountry: SITE.address.country },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: hm(SITE.hours.week[0][0]), closes: hm(SITE.hours.week[0][1]) }],
  sameAs: [SITE.instagram, SITE.facebook]
};

/* ---------------- Pages ---------------- */
function home(l) {
  const t = UI[l], path = ROUTES.home[l];
  const best = bestsellers().slice(0, 4);
  const month = PRODUCTS.filter(p => p.featured);
  const gallery = ['facade-portrait.webp', 'asztal-poharak.webp', 'trudon-elae.webp', 'asztal-logo.webp', 'santa-maria-novella.webp', 'interieur.webp'];
  const body = `
<section class="hero" aria-labelledby="coverT">
  <div class="hero-sheet wrap-wide">
    <h1 id="coverT" class="hero-word">${logo('hero-logo')}<span class="sr-only">pr09re55 · ${esc(t.tagline)} · Budapest</span></h1>
    <figure class="hero-ph">${pic(path, 'mag-pezsgo', l === 'hu' ? 'Pezsgő a pr09re55 magazinjából' : 'Sparkling wine, from the pr09re55 magazine', '(max-width: 820px) 70vw, 30vw', false)}</figure>
    <div class="hero-txt">
      <ul class="hero-tags"><li>Cocktail lounge <b>+</b></li><li>Concept store <b>+</b></li><li>${esc(t.city)} <span class="hero-addr">${esc(l === 'hu' ? SITE.address.street : SITE.address.street.replace(/\.$/, ''))}</span></li></ul>
      <p class="hero-line">${t.coverTitle}</p>
      <p class="hero-intro" lang="en">${esc(t.coverIntro).replace('. ', '.<br>')}</p>
      <p class="hero-ctas"><a class="btn btn-solid" href="${link(path, ROUTES.shop[l])}">${esc(t.coverCta)} ${ICON.arrow}</a><a class="btn" href="${link(path, ROUTES.menu[l])}">${esc(t.nav.menu)}</a></p>
    </div>
    <div class="hero-cards">
      <a class="hcard hc-drink" href="${link(path, ROUTES.hlDrinks[l])}"><img src="${asset(path, 'img/asztal-poharak.webp')}" alt="" loading="eager" decoding="async"><span>${esc(t.heroDrinks)} ${ICON.arrow}</span></a>
      <a class="hcard hc-shop" href="${link(path, ROUTES.hlShop[l])}"><img src="${asset(path, 'img/trudon-bougies.webp')}" alt="" loading="eager" decoding="async"><span>${esc(t.heroShop)} ${ICON.arrow}</span></a>
    </div>
  </div>
</section>

<section class="house wrap" aria-labelledby="houseT">
  <header class="house-head">
    <p class="kicker">${tri()} ${esc(t.houseKicker)}</p>
    <h2 id="houseT">${t.houseTitle}</h2>
  </header>
  <div class="house-cols">${t.houseCols.map((c, i) => `<div class="hc"><p class="hc-n">0${i + 1}</p><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p></div>`).join('')}</div>
</section>

<section class="news-teaser wrap" aria-labelledby="newsT">
  <header class="sec-head sec-head-row">
    <div><p class="kicker">${tri()} ${esc(t.newsKicker)}</p><h2 id="newsT">${esc(t.newsTitle)}</h2></div>
    <a class="tlink" href="${link(path, ROUTES.news[l])}">${esc(t.newsAll)} ${ICON.arrow}</a>
  </header>
  <div class="nt-grid">${NEWS.items.slice(0, 1).map(n => newsCard(n, l).replace('IMG', n.image ? asset(path, 'img/' + n.image) : '').replace(`id="${n.slug}"`, '')).join('')}${clubCard(l)}</div>
</section>

<section class="best wrap" aria-labelledby="bestT">
  <header class="sec-head sec-head-row">
    <div><p class="kicker">${tri()} ${esc(t.bestKicker)}</p><h2 id="bestT">${t.bestTitle}</h2></div>
    <a class="tlink" href="${link(path, ROUTES.shop[l])}">${esc(t.bestAll)} ${ICON.arrow}</a>
  </header>
  <div class="best-grid">${best.map((p, i) => productCard(p, l, path, ['b-tall', 'b-low', 'b-mid', 'b-low2'][i] || '')).join('')}</div>
</section>

<section class="place" aria-labelledby="placeT">
  <div class="place-txt wrap">
    <figure class="place-ph reveal-img">${pic(path, 'mag-terasz', l === 'hu' ? 'Négy nő egy teraszon, a pr09re55 magazinjából' : 'Four women on a terrace, from the pr09re55 magazine', '(max-width: 820px) 100vw, 40vw')}</figure>
    <p class="kicker">${tri()} ${esc(t.placeKicker)}</p>
    <h2 id="placeT" class="display">${esc(t.placeTitle)}</h2>
    <p class="lede">${esc(t.placeText)}</p>
    <blockquote class="pull" lang="en">${esc(STORY.chapters[1].quote)}<cite>Instagram ${esc(SITE.instagramHandle)}</cite></blockquote>
  </div>
</section>

<section class="cocktails wrap" aria-labelledby="ckT">
  <header class="sec-head sec-head-row">
    <div><p class="kicker">${tri()} ${esc(t.classicsKicker)}</p><h2 id="ckT">${t.cocktailsTitle}</h2></div>
    <a class="tlink" href="${link(path, ROUTES.cocktails[l])}">${esc(t.cocktailsAll)} ${ICON.arrow}</a>
  </header>
  <div class="ck-row">${COCKTAILS.classics.map((ref, i) => { const { it } = menuItem(ref); const im = COCKTAILS.items[i]?.image || 'asztal-poharak.webp'; return `<article class="ck ck-${i}">
    <figure class="reveal-img"><img src="${asset(path, 'img/' + im)}" alt="" loading="lazy"></figure>
    <p class="ck-n">N° ${i + 1}</p><h3>${esc(tx(it.name, l))}</h3>${it.desc ? `<p>${esc(tx(it.desc, l))}</p>` : ''}<p class="ck-price">${menuNum(it.prices[0])} Ft</p>
  </article>`; }).join('')}</div>
</section>

<section class="month" aria-labelledby="moT">
  <div class="wrap month-grid">
    <header class="month-head">
      <p class="kicker">${tri()} ${esc(MONTH.label[l])} · ${esc(MONTH.issue[l])} ${MONTH.demo ? demoTag(t) : ''}</p>
      <h2 id="moT" class="display">${esc(MONTH.title[l])}</h2>
      <p class="lede">${esc(MONTH.intro[l])}</p>
      <p class="label">${esc(t.brandsLabel)}</p>
      <ul class="brands">${MONTH.brands.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <a class="tlink" href="${link(path, ROUTES.shop[l])}">${esc(t.monthAll)} ${ICON.arrow}</a>
    </header>
    <div class="month-list">${month.map(p => productCard(p, l, path, 'm-card')).join('')}</div>
  </div>
</section>

<section class="menu-teaser wrap" aria-labelledby="mnT">
  <div class="mt-grid">
    <figure class="reveal-img"><img src="${asset(path, 'img/asztal-menu.webp')}" alt="${l === 'hu' ? 'Asztal felülről a pr09re55 menükártyájával' : 'A table from above with the pr09re55 menu card'}" loading="lazy"><figcaption>${l === 'hu' ? 'Fotó' : 'Photo'}: Gulyás Attila</figcaption></figure>
    <div>
      <p class="kicker">${tri()} ${esc(t.menuKicker)} ${MENU.demo ? demoTag(t) : ''}</p>
      <h2 id="mnT">${t.menuTitle}</h2>
      <ol class="mt-cats">${MENU.pages.filter(pg => pg.toc).map((pg, i) => `<li><a href="${link(path, ROUTES.menu[l], '#lap-' + pg.slug)}"><span>0${i + 1}</span>${esc(tx(pg.toc, l))}</a></li>`).join('')}</ol>
      <a class="btn" href="${link(path, ROUTES.menu[l])}">${esc(t.menuAll)} ${ICON.arrow}</a>
    </div>
  </div>
</section>

${reviewsBlock(l)}

<section class="ig wrap" aria-labelledby="igT">
  <header class="sec-head sec-head-row">
    <div><p class="kicker">${tri()} ${esc(t.igKicker)}</p><h2 id="igT">${esc(t.igTitle)}</h2><p class="muted small">${esc(t.igNote)}</p></div>
    <a class="btn" href="${SITE.instagram}" target="_blank" rel="noopener">${esc(t.igFollow)} ${esc(SITE.instagramHandle)} ↗</a>
  </header>
  <div class="ig-grid">${gallery.map(g => `<a class="ig-tile reveal-img" href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram ${esc(SITE.instagramHandle)}"><img src="${asset(path, 'img/' + g)}" alt="" loading="lazy"></a>`).join('')}</div>
</section>

${visitBlock(l, path)}`;
  return page({ l, key: 'home', path, alt: ROUTES.home, title: t.meta.home[0], desc: t.meta.home[1], body, jsonld: [LOCAL_BUSINESS], bodyClass: 'is-home' });
}

function shop(l) {
  const t = UI[l], path = ROUTES.shop[l];
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} pr09re55</p>
  <h1 class="display">${esc(t.shopTitle)}</h1>
  <p class="lede">${esc(t.shopIntro)}</p>
</section>
<nav class="cat-tiles wrap" aria-label="${esc(t.catsLabel)}">
  ${CATS.map(c => { const n = PRODUCTS.filter(p => p.category === c.key).length; return `<a class="cat-tile" href="${link(path, catRoute(c)[l])}"><img src="${asset(path, 'img/' + c.image)}" alt="" loading="lazy" decoding="async"><span class="cat-name">${esc(t.cats[c.key])}<small>${esc(t.catCount(n))}</small></span></a>`; }).join('')}
</nav>`;
  return page({ l, key: 'shop', path, alt: ROUTES.shop, title: t.meta.shop[0], desc: t.meta.shop[1], body });
}

function catPage(c, l) {
  const t = UI[l], r = catRoute(c), path = r[l], name = t.cats[c.key];
  const items = PRODUCTS.filter(p => p.category === c.key);
  const body = `
<section class="page-head wrap cat-head">
  <nav class="crumbs" aria-label="breadcrumb"><a href="${link(path, ROUTES.shop[l])}">${esc(t.shopTitle)}</a> ${tri()} <span aria-current="page">${esc(name)}</span></nav>
  <h1 class="display">${esc(name)}</h1>
  <p class="lede">${esc(t.catCount(items.length))}</p>
</section>
<section class="shop-grid wrap" aria-label="${esc(name)}">
  ${items.map((p, i) => productCard(p, l, path, ['s-a', 's-b', 's-c'][i % 3])).join('')}
</section>
<p class="center cat-more"><a class="btn" href="${link(path, ROUTES.shop[l])}">${esc(t.back)} ${ICON.arrow}</a></p>`;
  return page({ l, key: 'shop', path, alt: r, title: `${name} · ${t.meta.shop[0]}`, desc: t.meta.shop[1], body });
}

// Seasonal highlights, reached from the two black-and-white cards at the top of the home page.
function hlPage(kind, l) {
  const t = UI[l], key = kind === 'shop' ? 'hlShop' : 'hlDrinks', path = ROUTES[key][l];
  const cards = kind === 'shop'
    ? HL.shop.map(h => { const p = PRODUCTS.find(x => x.slug === h.product); return { href: link(path, productRoute(p.slug)[l]), image: h.image, kicker: p.brand, name: p.name[l], sub: t.cats[p.category], price: p.price ? fmtPrice(p.price, l) : t.priceOnRequest }; })
    : HL.drinks.map(h => { const { it, sec, pg } = menuItem(h.menu); return { href: link(path, ROUTES.menu[l], '#lap-' + pg.slug), image: h.image, kicker: tx(sec.title || pg.toc || pg.title, l), name: tx(it.name, l), sub: it.desc ? tx(it.desc, l) : '', price: it.prices.map((n, k) => (sec.cols ? tx(sec.cols[k], l) + ' ' : '') + menuNum(n) + ' Ft').join(' · ') }; });
  const all = kind === 'shop' ? ROUTES.shop : ROUTES.menu;
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} ${esc(t.hlKicker)} · ${esc(HL.season[l])} ${HL.demo ? demoTag(t) : ''}</p>
  <h1 class="display">${esc(kind === 'shop' ? t.heroShop : t.heroDrinks)}</h1>
  <p class="lede">${esc(kind === 'shop' ? t.hlShopIntro : t.hlDrinksIntro)}</p>
</section>
<section class="hl-grid wrap" aria-label="${esc(t.hlKicker)}">
  ${cards.map((c, i) => `<a class="hl-card hl-${i}" href="${c.href}">
    <figure class="reveal-img"><img src="${asset(path, 'img/' + c.image)}" alt="" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"></figure>
    <p class="hl-kicker">${esc(c.kicker)}</p><h2>${esc(c.name)}</h2>${c.sub ? `<p class="hl-sub">${esc(c.sub)}</p>` : ''}<p class="hl-price">${esc(c.price)}</p>
  </a>`).join('')}
</section>
<p class="center hl-all"><a class="btn btn-solid" href="${link(path, all[l])}">${esc(t.hlSeeAll)} ${ICON.arrow}</a></p>`;
  return page({ l, key, path, alt: ROUTES[key], title: t.meta[key][0], desc: t.meta[key][1], body });
}

function bestPage(l) {
  const t = UI[l], path = ROUTES.best[l];
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} pr09re55</p>
  <h1 class="display">${esc(t.bestPageTitle)}</h1>
  <p class="lede">${esc(t.bestPageIntro)}</p>
</section>
<section class="best-list wrap" aria-label="${esc(t.bestPageTitle)}">
  ${bestsellers().map((p, i) => `<div class="bl-row"><p class="bl-n">${String(i + 1).padStart(2, '0')}</p>${productCard(p, l, path, 'bl-card')}</div>`).join('')}
</section>`;
  return page({ l, key: 'best', path, alt: ROUTES.best, title: t.meta.best[0], desc: t.meta.best[1], body });
}

function product(p, l) {
  const t = UI[l], r = productRoute(p.slug), path = r[l];
  const price = p.price ? fmtPrice(p.price, l) : t.priceOnRequest;
  const title = `${p.brand !== '—' ? p.brand + ' · ' : ''}${p.name[l]} · pr09re55`;
  const related = PRODUCTS.filter(x => x.slug !== p.slug && x.category === p.category).concat(PRODUCTS.filter(x => x.slug !== p.slug && x.category !== p.category)).slice(0, 3);
  const msg = encodeURIComponent((l === 'hu' ? 'Szia! Érdekelne: ' : 'Hello! I’m interested in: ') + `${p.brand !== '—' ? p.brand + ' ' : ''}${p.name[l]} – ${abs(path)}`);
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name[l], brand: { '@type': 'Brand', name: p.brand }, description: p.description[l], image: p.images.map(i => abs('assets/img/' + i)), url: abs(path) };
  if (p.price) ld.offers = { '@type': 'Offer', price: p.price, priceCurrency: p.currency, availability: { in: 'https://schema.org/InStock', low: 'https://schema.org/LimitedAvailability', out: 'https://schema.org/OutOfStock' }[p.stock] || 'https://schema.org/InStoreOnly', url: abs(path) };
  const body = `
<article class="product wrap" style="--tone:${esc(p.tone || '#f2efea')}">
  <nav class="crumbs" aria-label="breadcrumb"><a href="${link(path, ROUTES.shop[l])}">${esc(t.shopTitle)}</a> ${tri()} <span aria-current="page">${esc(p.name[l])}</span></nav>
  <div class="product-grid">
    <div class="gallery" data-gallery>
      <div class="gal-main"><img src="${asset(path, 'img/' + p.images[0])}" alt="${esc(p.brand + ' ' + p.name[l])}" data-gal-main></div>
      ${p.images.length > 1 ? `<div class="gal-thumbs">${p.images.map((im, i) => `<button type="button" aria-pressed="${i === 0}" data-gal-src="${asset(path, 'img/' + im)}"><img src="${asset(path, 'img/' + im)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
    </div>
    <div class="pinfo">
      <p class="kicker">${esc(p.brand)} ${p.demo ? demoTag(t) : ''}</p>
      <h1 class="display">${esc(p.name[l])}</h1>
      <p class="pprice">${esc(price)}</p>
      <p class="pstock stock-${esc(p.stock)}">${esc(t.stock[p.stock] || '')}</p>
      <p class="lede">${esc(p.description[l])}</p>
      <dl class="pdetails"><dt>${esc(t.brand)}</dt><dd>${esc(p.brand)}</dd><dt>${esc(t.details)}</dt><dd>${p.details[l].map(esc).join(' · ')}</dd></dl>
      ${p.demo ? `<p class="demo-note">${esc(t.demoNote)}</p>` : ''}
      ${p.stock !== 'out' ? `<div class="reserve" data-reserve="${esc(p.slug)}">
        <button class="btn btn-solid" type="button" data-add hidden>${ICON_BAG} ${esc(t.reserve)}</button>
        <p class="reserve-how">${esc(t.reserveHow)}</p>
        <p class="reserve-msg" role="status" aria-live="polite"><span hidden>${esc(t.reserveAdded)} <a href="${link(path, ROUTES.cart[l])}">${esc(t.reserveView)}</a></span></p>
      </div>` : ''}
      <div class="pactions">
        <a class="btn" href="https://ig.me/m/${SITE.instagramHandle.replace('@', '')}" target="_blank" rel="noopener" data-enquire="${msg}" data-enquire-msg="${esc(t.enquireCopied)}">${esc(t.enquireIg)} ↗</a>
        <a class="btn" href="${SITE.phoneHref}">${esc(t.enquirePhone)} · ${esc(SITE.phone)}</a>
      </div>
      <div class="share" data-share data-url="${abs(path)}" data-title="${esc(title)}" data-copied="${esc(t.copied)}" data-fail="${esc(t.copyFail)}" data-ighelp="${esc(t.igHelp)}">
        <p class="label">${esc(t.share)}</p>
        <button type="button" class="share-native" hidden>${ICON.share}<span>${esc(t.shareNative)}</span></button>
        <button type="button" class="share-copy">${ICON.link}<span>${esc(t.copyLink)}</span></button>
        <button type="button" class="share-ig">${ICON.ig}<span>${esc(t.shareIg)}</span></button>
        <p class="share-msg" role="status" aria-live="polite"></p>
      </div>
    </div>
  </div>
</article>
<section class="related wrap" aria-labelledby="relT">
  <h2 id="relT" class="h-small">${esc(t.related)}</h2>
  <div class="related-grid">${related.map(x => productCard(x, l, path)).join('')}</div>
</section>`;
  return page({ l, key: 'product', path, alt: r, title, desc: p.description[l], image: p.images[0], body, jsonld: [ld] });
}

function cocktailsPage(l) {
  const t = UI[l], path = ROUTES.cocktails[l];
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} ${esc(t.cocktailsKicker)} ${COCKTAILS.demo ? demoTag(t) : ''}</p>
  <h1 class="display">${t.cocktailsTitle}</h1>
  <p class="lede">${esc(t.cocktailsPageIntro)}</p>
</section>
<section class="ck-spreads wrap">
  ${COCKTAILS.items.map((c, i) => `<article class="spread ${i % 2 ? 'spread-r' : ''}">
    <figure class="reveal-img"><img src="${asset(path, 'img/' + c.image)}" alt="" loading="lazy"></figure>
    <div><p class="ck-n">N° ${i + 1}</p><h2>${esc(c.name[l])}</h2><p class="lede">${esc(c.story[l])}</p>
    ${c.ingredients[l].length ? `<p class="label">${esc(t.ingredients)}</p><p>${c.ingredients[l].map(esc).join(' · ')}</p>` : ''}</div>
  </article>`).join('')}
</section>`;
  return page({ l, key: 'cocktails', path, alt: ROUTES.cocktails, title: t.meta.cocktails[0], desc: t.meta.cocktails[1], body });
}

// Prices on the menu read like the printed card: "2 180", forints stated once on the page.
const menuNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');

function menuSection(sec, l) {
  const cols = sec.cols || [];
  const head = sec.title || cols.length ? `<div class="ms-head">${sec.title ? `<h3>${esc(tx(sec.title, l))}</h3>` : '<span></span>'}${cols.map(c => `<span class="ms-col">${esc(tx(c, l))}</span>`).join('')}</div>` : '';
  const items = sec.items.map(it => {
    const prices = it.prices.map(n => `<span class="mi-p">${menuNum(n)}${it.unit ? `<small>${esc(tx(it.unit, l))}</small>` : ''}</span>`).join('');
    return sec.layout === 'centered'
      ? `<li><p class="mi-n">${esc(tx(it.name, l))}</p>${it.desc ? `<p class="mi-d">${esc(tx(it.desc, l))}</p>` : ''}${prices}</li>`
      : `<li style="--c:${it.prices.length}"><span class="mi-n"><span>${esc(tx(it.name, l))}${it.desc ? ` <small>${esc(tx(it.desc, l))}</small>` : ''}</span></span>${prices}</li>`;
  }).join('');
  return `<section class="ms${sec.layout === 'centered' ? ' ms-c' : ''}" style="--cols:${Math.max(cols.length, 1)}">${head}<ul>${items}</ul>${sec.note ? `<p class="ms-note">${esc(tx(sec.note, l))}</p>` : ''}</section>`;
}

function menuLeaf(pg, i, l, t) {
  const n = i + 1, id = 'lap-' + pg.slug;
  const brand = `<p class="mp-brand" aria-hidden="true">${logo()}</p>`;
  let inner;
  if (pg.kind === 'jacket') { // the black linen cover of the printed menu, with the gold triangle
    inner = `<div class="mp-jacket"><h2 id="${id}-h" class="sr-only">pr09re55 · ${esc(t.nav.menu)}</h2><svg class="jk-mark" viewBox="0 0 194 170" aria-hidden="true"><defs><linearGradient id="jkGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9cf95"/><stop offset=".45" stop-color="#b98d4e"/><stop offset=".7" stop-color="#f0d9a2"/><stop offset="1" stop-color="#a77a3f"/></linearGradient></defs><g fill="none" stroke="url(#jkGold)" stroke-width="3.4">${MARK}</g></svg></div>`;
  } else if (pg.kind === 'backjacket') { // the back of the printed menu: click it to close the book
    inner = `<div class="mp-jacket mp-back"><h2 id="${id}-h" class="sr-only">${esc(t.menuEnd)}</h2><button type="button" class="jk-close" data-close-book><span class="sr-only">${esc(t.menuClose)}</span><svg class="jk-mini" viewBox="0 0 194 170" aria-hidden="true"><g fill="none" stroke="#b98d4e" stroke-width="7">${MARK}</g></svg></button></div>`;
  } else if (pg.kind === 'cover') {
    inner = `<div class="mp-cover"><p class="mp-cover-logo">${logo('', 'pr09re55')}</p>
      <h2 id="${id}-h" class="mp-tag" lang="en">${esc(pg.tagline)}</h2><p class="mp-sub" lang="en">${esc(pg.sub)}</p>
      <ul class="mp-cats" lang="en">${pg.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <address class="mp-addr" lang="en">${pg.contact.map(esc).join('<br>')}</address></div>`;
  } else if (pg.kind === 'letter') {
    inner = `${brand}<div class="mp-letter" lang="${pg.lang}"><h2 id="${id}-h" class="sr-only">${l === 'hu' ? 'Zita levele' : 'A letter from Zita'}</h2>${pg.text.map(p => `<p>${esc(p)}</p>`).join('')}<p class="mp-sign">${esc(pg.sign)}</p></div>`;
  } else {
    inner = `${brand}<h2 id="${id}-h" class="mp-title">${esc(tx(pg.title, l))}</h2><div class="mp-body">${pg.sections.map(sec => menuSection(sec, l)).join('')}</div>`;
  }
  return `<article class="mpage mpage-${pg.kind || 'list'}" id="${id}" data-page="${n}" aria-labelledby="${id}-h">${inner}${/jacket/.test(pg.kind) ? '' : `<p class="mp-foot" aria-hidden="true">${n - 1}</p>`}</article>`;
}

function menuPage(l) {
  const t = UI[l], path = ROUTES.menu[l];
  const toc = MENU.pages.map((pg, i) => pg.toc ? `<li><a href="#lap-${pg.slug}" data-goto="${i}"><span>${i + 1}</span>${esc(tx(pg.toc, l))}</a></li>` : '').join('');
  const body = `
<section class="page-head wrap menu-head">
  <p class="kicker">${tri()} ${esc(t.menuKicker)} ${MENU.demo ? demoTag(t) : ''}</p>
  <h1 class="display">${t.menuTitle}</h1>
  <p class="lede">${esc(t.menuPageIntro)}</p>
</section>
<section class="menu-book wrap-wide" data-book aria-label="${esc(t.menuBook)}" data-l-page="${esc(t.menuPage)}">
  <nav class="book-toc" aria-label="${esc(t.menuToc)}"><p class="label">${esc(t.menuToc)}</p><ol>${toc}</ol></nav>
  <div class="book-stage">
    <div class="book" data-pages>
${MENU.pages.map((pg, i) => menuLeaf(pg, i, l, t)).join('\n')}
    </div>
  </div>
  <div class="book-ctrl" hidden>
    <button class="book-btn" type="button" data-prev aria-label="${esc(t.menuPrev)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg></button>
    <p class="book-count" aria-live="polite"></p>
    <button class="book-btn" type="button" data-next aria-label="${esc(t.menuNext)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg></button>
  </div>
  <p class="book-hint muted small" hidden>${esc(t.menuHint)}</p>
  <p class="book-meta muted small">${esc(t.menuPrices)}${MENU.updated ? ` · ${esc(t.menuUpdated)}: ${fmtDate(MENU.updated, l)}` : ''}</p>
</section>`;
  return page({ l, key: 'menu', path, alt: ROUTES.menu, title: t.meta.menu[0], desc: t.meta.menu[1], body, bodyClass: 'is-menu' });
}

function storyPage(l) {
  const t = UI[l], path = ROUTES.story[l];
  const status = c => c.status === 'verified' ? `${esc(t.storySource)}: ${esc(c.source)}` : c.status === 'tbc' ? `${esc(t.storySource)}: ${esc(c.source)} · ${esc(t.storyTbc)}` : esc(t.storyMissing);
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} pr09re55</p>
  <h1 class="display">${esc(t.storyTitle)}</h1>
  <p class="lede">${esc(t.storyIntro)}</p>
</section>
<section class="story wrap">
  ${STORY.chapters.map((c, i) => `<article class="chapter chapter-${c.key}${c.image ? '' : ' no-img'}">
    <p class="ch-n">${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</p>
    <div class="ch-txt">
      <h2>${esc(c.title[l])}</h2>
      ${c.quote ? `<blockquote class="pull" lang="en">${esc(c.quote)}</blockquote>` : ''}
      <p class="${i === 0 ? 'dropcap ' : ''}lede">${esc(c.text[l])}</p>
      <p class="ch-status st-${c.status}">${status(c)}</p>
    </div>
    ${c.image ? `<figure class="reveal-img"><img src="${asset(path, 'img/' + c.image)}" alt="" loading="lazy"></figure>` : ''}
  </article>`).join('')}
</section>`;
  return page({ l, key: 'story', path, alt: ROUTES.story, title: t.meta.story[0], desc: t.meta.story[1], body });
}

/* ---------------- What's new: events and news ---------------- */
const MONTHS = { hu: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
const MON3 = { hu: ['JAN', 'FEB', 'MÁR', 'ÁPR', 'MÁJ', 'JÚN', 'JÚL', 'AUG', 'SZEP', 'OKT', 'NOV', 'DEC'], en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'] };
const ymd = iso => iso.split('-').map(Number);
function newsDate(n, l) { // "2026. november 20–22." / "20–22 November 2026"
  const [y, m, d] = ymd(n.dateStart), [y2, m2, d2] = n.dateEnd ? ymd(n.dateEnd) : [y, m, d];
  if (l === 'hu') return m === m2 ? `${y}. ${MONTHS.hu[m - 1]} ${d}${d2 !== d ? '–' + d2 : ''}.` : `${y}. ${MONTHS.hu[m - 1]} ${d}. – ${MONTHS.hu[m2 - 1]} ${d2}.`;
  return m === m2 ? `${d}${d2 !== d ? '–' + d2 : ''} ${MONTHS.en[m - 1]} ${y}` : `${d} ${MONTHS.en[m - 1]} – ${d2} ${MONTHS.en[m2 - 1]} ${y}`;
}
function newsCard(n, l) {
  const [, m, d] = ymd(n.dateStart), d2 = n.dateEnd ? ymd(n.dateEnd)[2] : null;
  return `<article class="news-card" id="${esc(n.slug)}">
  <p class="nc-date" aria-hidden="true"><b>${d}${d2 && d2 !== d ? '–' + d2 : ''}</b><span>${MON3[l][m - 1]}</span></p>
  <div class="nc-txt">
    <p class="kicker">${tri()} ${esc(tx(n.kind, l))} · <time datetime="${n.dateStart}">${esc(newsDate(n, l))}</time></p>
    <h3>${esc(n.title[l])}</h3>
    <p>${esc(n.text[l])}</p>
  </div>
  ${n.image ? `<figure class="nc-ph"><img src="IMG" alt="" loading="lazy"></figure>` : ''}
</article>`;
}
function clubCard(l) {
  const t = UI[l], c = NEWS.club;
  return `<aside class="club" aria-labelledby="clubT-${l}">
  <div class="club-card" aria-hidden="true"><svg class="cc-mark" viewBox="0 0 194 170"><g fill="none" stroke="#d6b77c" stroke-width="7">${MARK}</g></svg>${logo('cc-logo')}<span class="cc-name">CLUB CARD</span></div>
  <div class="club-txt">
    <p class="kicker">${tri()} ${esc(t.clubKicker)}</p>
    <h3 id="clubT-${l}">${esc(c.title[l])}</h3>
    <p>${esc(c.text[l])}</p>
    <a class="tlink" href="#latogatas">${esc(t.clubAsk)} ${ICON.arrow}</a>
  </div>
</aside>`;
}
function newsPage(l) {
  const t = UI[l], path = ROUTES.news[l];
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} ${esc(t.newsKicker)}</p>
  <h1 class="display">${esc(t.newsTitle)}</h1>
  <p class="lede">${esc(t.newsIntro)}</p>
</section>
<section class="news wrap">
  <div class="news-list">${NEWS.items.length ? NEWS.items.map(n => newsCard(n, l).replace('IMG', n.image ? asset(path, 'img/' + n.image) : '')).join('') : `<p class="lede">${esc(t.newsEmpty)}</p>`}</div>
  ${clubCard(l).replace('href="#latogatas"', `href="${link(path, ROUTES.home[l], '#latogatas')}"`)}
</section>`;
  return page({ l, key: 'news', path, alt: ROUTES.news, title: t.meta.news[0], desc: t.meta.news[1], body });
}

function cartPage(l) {
  const t = UI[l], path = ROUTES.cart[l];
  // The cart only stores slugs and quantities in the browser; names, prices and photos come from this catalogue.
  const catalog = Object.fromEntries(PRODUCTS.filter(p => p.stock !== 'out').map(p => [p.slug, { brand: p.brand, name: p.name[l], price: p.price, img: asset(path, 'img/' + p.images[0]), url: link(path, productRoute(p.slug)[l]), abs: abs(productRoute(p.slug)[l]) }]));
  const R = SITE.reserve;
  const cfg = { lang: l, wa: R.whatsapp ? R.whatsapp.replace(/[^0-9]/g, '') : '', endpoint: R.formEndpoint || '',
    s: { remove: t.cartRemove, less: t.cartLess, more: t.cartMore, qty: t.cartQty, onRequest: t.priceOnRequest, onReqN: [t.cartOnRequest(1), t.cartOnRequest(99).replace('99', '{n}')], required: t.fRequired, sending: t.fSending, waReady: t.waReady, formOk: t.formOk, formFail: t.formFail,
      head: t.orderHead, name: t.orderName, phone: t.orderPhone, email: t.orderEmail, date: t.orderDate, note: t.orderNote, pay: t.orderPay } };
  const body = `
<section class="page-head wrap">
  <p class="kicker">${tri()} ${esc(t.cart)}</p>
  <h1 class="display">${esc(t.cartTitle)}</h1>
  <p class="lede">${esc(t.cartIntro)}</p>
</section>
<section class="cart wrap" data-cart>
  <script type="application/json" data-catalog>${JSON.stringify(catalog).replace(/</g, '\\u003c')}</script>
  <script type="application/json" data-cart-cfg>${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script>
  <noscript><p class="lede">${esc(t.cartNoJs)} <a href="${SITE.phoneHref}">${esc(SITE.phone)}</a></p></noscript>
  <div class="cart-empty" data-cart-empty hidden><p class="lede">${esc(t.cartEmpty)}</p><a class="btn" href="${link(path, ROUTES.shop[l])}">${esc(t.cartBrowse)} ${ICON.arrow}</a></div>
  <div class="cart-grid" data-cart-full hidden>
    <div>
      <ul class="cart-list" data-cart-list></ul>
      <div class="cart-sum"><p><span>${esc(t.cartTotal)}</span><strong data-cart-total></strong></p><p class="muted small" data-cart-req></p><p class="small">${esc(t.cartPayNote)}</p></div>
    </div>
    <form class="cart-form" data-cart-form novalidate>
      <div class="field"><label for="cf-name">${esc(t.fName)} *</label><input id="cf-name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="cf-phone">${esc(t.fPhone)} *</label><input id="cf-phone" name="phone" type="tel" autocomplete="tel" required></div>
      <div class="field"><label for="cf-email">${esc(t.fEmail)}</label><input id="cf-email" name="email" type="email" autocomplete="email"></div>
      <div class="field"><label for="cf-date">${esc(t.fDate)}</label><input id="cf-date" name="date" type="date"></div>
      <div class="field"><label for="cf-note">${esc(t.fNote)}</label><textarea id="cf-note" name="note" rows="3"></textarea></div>
      <label class="consent"><input type="checkbox" name="consent" required> <span>${esc(t.fConsent)} *</span></label>
      <button class="btn btn-solid" type="submit">${esc(R.formEndpoint ? t.fSendForm : t.fSendWa)} ${ICON.arrow}</button>
      <p class="cart-msg" role="status" aria-live="polite" data-cart-msg></p>
      <button class="tlink" type="button" data-cart-clear hidden>${esc(t.waClear)}</button>
    </form>
  </div>
</section>`;
  return page({ l, key: 'cart', path, alt: ROUTES.cart, title: t.meta.cart[0], desc: t.meta.cart[1], body, noindex: true });
}

/* ---------------- Write ---------------- */
rmSync(OUT, { recursive: true, force: true });
const urls = [];
function emit(path, html, listed = true) {
  const file = join(OUT, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (listed) urls.push(path);
}
for (const l of LANGS) {
  emit(ROUTES.home[l], home(l));
  emit(ROUTES.shop[l], shop(l));
  for (const c of CATS) emit(catRoute(c)[l], catPage(c, l));
  emit(ROUTES.hlShop[l], hlPage('shop', l));
  emit(ROUTES.hlDrinks[l], hlPage('drinks', l));
  emit(ROUTES.best[l], bestPage(l));
  emit(ROUTES.cocktails[l], cocktailsPage(l));
  emit(ROUTES.menu[l], menuPage(l));
  emit(ROUTES.story[l], storyPage(l));
  emit(ROUTES.news[l], newsPage(l));
  emit(ROUTES.cart[l], cartPage(l), false); // personal page, kept out of the sitemap
  for (const p of PRODUCTS) emit(productRoute(p.slug)[l], product(p, l));
}
cpSync(join(ROOT, 'assets'), join(OUT, 'assets'), { recursive: true });
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${abs(u)}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.baseUrl}/sitemap.xml\n`);
console.log(`Built ${urls.length} pages${PREVIEW ? ' (preview links)' : ''} into dist/`);
