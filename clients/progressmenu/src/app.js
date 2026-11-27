(function () {
  var d = document, de = d.documentElement
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches

  // langue
  var btns = [].slice.call(d.querySelectorAll('[data-set-l]'))
  var siteBtn = d.querySelector('[data-site-btn]'), SITE = { hu: 'https://pr09re55.vercel.app/', en: 'https://pr09re55.vercel.app/en/', fr: 'https://pr09re55.vercel.app/fr/' }
  function mark() {
    if (siteBtn) siteBtn.href = SITE[de.getAttribute('data-l')] || SITE.hu
 btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-l') === de.getAttribute('data-l'))) }) }
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-set-l')
      de.setAttribute('data-l', l); de.lang = l
      mark()
    })
  })
  mark()

  // apparition des cartes
  var cards = [].slice.call(d.querySelectorAll('.card'))
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('in', e.isIntersecting) })
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 })
    cards.forEach(function (c) { io.observe(c) })
  } else cards.forEach(function (c) { c.classList.add('in') })

  // puce active
  var chips = {}
  ;[].slice.call(d.querySelectorAll('[data-chip]')).forEach(function (a) { chips[a.getAttribute('data-chip')] = a })
  var bar = d.querySelector('.chips-in')
  if ('IntersectionObserver' in window) {
    var cur = null
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return
        var a = chips[e.target.id]
        if (!a || a === cur) return
        if (cur) cur.classList.remove('on')
        a.classList.add('on'); cur = a
        var left = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2
        bar.scrollTo ? bar.scrollTo({ left: left, behavior: reduce ? 'auto' : 'smooth' }) : (bar.scrollLeft = left)
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;[].slice.call(d.querySelectorAll('[data-grp]')).forEach(function (s) { io2.observe(s) })
  }

  // parallaxe du feuillage (une seule écriture par image, transforms uniquement)
  var lyrs = [].slice.call(d.querySelectorAll('.lyr')).map(function (el) { return { el: el, p: parseFloat(el.getAttribute('data-p')) } })
  var y = 0, tick = false, px = 0, py = 0
  function paint() {
    tick = false
    lyrs.forEach(function (l) { l.el.style.transform = 'translate3d(' + (px * l.p * 30).toFixed(1) + 'px,' + (-y * l.p + py * l.p * 20).toFixed(1) + 'px,0)' })
  }
  var touch = matchMedia('(hover:none),(pointer:coarse)').matches
  if (!reduce && !touch) {
    addEventListener('scroll', function () { y = Math.min(scrollY, 4000); if (!tick) { tick = true; requestAnimationFrame(paint) } }, { passive: true })
    if (fine) addEventListener('pointermove', function (e) { px = e.clientX / innerWidth - .5; py = e.clientY / innerHeight - .5; if (!tick) { tick = true; requestAnimationFrame(paint) } }, { passive: true })
  }

  // inclinaison 3D des cartes à la souris
  if (fine && !reduce) {
    cards.forEach(function (c) {
      var ph = c.querySelector('.ph')
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect()
        var x = (e.clientX - r.left) / r.width - .5, yy = (e.clientY - r.top) / r.height - .5
        ph.style.transform = 'rotateY(' + (x * 18).toFixed(1) + 'deg) rotateX(' + (-yy * 14).toFixed(1) + 'deg)'
      })
      c.addEventListener('pointerleave', function () { ph.style.transform = '' })
    })
  }

  // ---------- vue éclatée (test) : un clic sur une carte « has-xv » décompose la boisson en couches ----------
  var xv = d.getElementById('xv')
  if (xv && d.querySelector('.has-xv') && xv.animate) (function () {
    var stage = d.getElementById('xvs'), glass = xv.querySelector('.xv-glass'), box = xv.querySelector('.xv-layers')
    var bg = xv.querySelector('.xv-bg'), xbtn = xv.querySelector('.xv-x'), head = xv.querySelector('.xv-head')
    var main = d.querySelector('main')
    var st = { open: false, closing: false, img: null, btn: null, items: [], anims: [], fromPop: false, mid: 0 }
    var EASE = 'cubic-bezier(.22,1,.36,1)'
    function lang() { return de.getAttribute('data-l') || 'hu' }
    function play(el, kf, o) { var a = el.animate(kf, o); st.anims.push(a); return a }
    function stopAll() { st.anims.forEach(function (a) { try { a.cancel() } catch (e) {} }); st.anims = [] }
    function cancelOn(el) { st.anims = st.anims.filter(function (a) { if (a.effect && a.effect.target === el) { try { a.cancel() } catch (e) {} return false } return true }) }

    // dessins des couches (viewBox 200 x 64), vus en légère perspective
    var TOP = 'M8 20a92 18 0 0 1 184 0a92 18 0 0 1-184 0Z'
    function slab(c, sp) {
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><path d="M8 20V42a92 18 0 0 0 184 0V20Z" fill="url(#xg-' + c + '-s)"/>' +
        '<path d="' + TOP + '" fill="url(#xg-' + c + '-t)" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/>' +
        '<ellipse cx="100" cy="19" rx="68" ry="10" fill="#fff" fill-opacity=".2"/>' + (sp || '') +
        '<path d="M24 36c20 10 132 10 152 0" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/></svg>'
    }
    function orange(dr) {
      var seg = '', k, a, x, y
      for (k = 0; k < 10; k++) { a = k / 10 * Math.PI * 2; x = 100 + 70 * Math.cos(a); y = 30 + 19.500 * Math.sin(a); seg += 'M100 30L' + x.toFixed(1) + ' ' + y.toFixed(1) }
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><ellipse cx="100" cy="31" rx="90" ry="26" fill="' + (dr ? '#a8671a' : '#e87a12') + '"/><ellipse cx="100" cy="30" rx="90" ry="26" fill="' + (dr ? '#d9982f' : '#ff9d2e') + '"/>' +
        '<ellipse cx="100" cy="30" rx="82" ry="22.500" fill="#ffe4b0"/><ellipse cx="100" cy="30" rx="75" ry="19.500" fill="url(#' + (dr ? 'xg-dorange-f' : 'xg-orange-f') + ')"/>' +
        '<path d="' + seg + '" stroke="#ffe4b0" stroke-width="2.600" stroke-linecap="round" fill="none"/><ellipse cx="100" cy="30" rx="6" ry="2.500" fill="#ffe4b0"/>' +
        '<ellipse cx="74" cy="22" rx="14" ry="3.500" fill="#fff" fill-opacity=".35"/></svg>'
    }
    function cube(x, y, w, r) {
      return '<g transform="rotate(' + r + ' ' + (x + w / 2) + ' ' + (y + w / 2) + ')"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + w + '" rx="8" fill="url(#xg-ice)" stroke="#fff" stroke-opacity=".85" stroke-width="1.4"/>' +
        '<path d="M' + (x + 7) + ' ' + (y + w - 9) + 'V' + (y + 9) + 'Q' + (x + 7) + ' ' + (y + 7) + ' ' + (x + 10) + ' ' + (y + 7) + 'H' + (x + w - 12) + '" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="2.200" stroke-linecap="round"/>' +
        '<rect x="' + (x + w * .55) + '" y="' + (y + w * .5) + '" width="' + (w * .25) + '" height="' + (w * .22) + '" rx="3" fill="#fff" fill-opacity=".3"/></g>'
    }
    function ice() { return '<svg viewBox="0 0 200 64" aria-hidden="true">' + cube(20, 16, 40, -9) + cube(78, 8, 44, 8) + cube(138, 17, 40, -4) + '</svg>' }
    function glassArt() {
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><path d="M8 14V44a92 17 0 0 0 184 0V14Z" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".6" stroke-width="1.600"/>' +
        '<ellipse cx="100" cy="14" rx="92" ry="14" fill="#fff" fill-opacity=".08" stroke="#fff" stroke-opacity=".7" stroke-width="1.600"/>' +
        '<ellipse cx="100" cy="46" rx="70" ry="9" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.200"/><path d="M20 24v16" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/></svg>'
    }
    function balloonArt() {
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><path d="M14 12C14 44 52 60 100 60S186 44 186 12Z" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/>' +
        '<ellipse cx="100" cy="12" rx="86" ry="10" fill="#fff" fill-opacity=".08" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/><path d="M30 24c6 14 20 22 34 25" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/></svg>'
    }
    function strawArt() {
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><path d="M22 52 150 22q16-4 24 4" fill="none" stroke="url(#xg-gold)" stroke-width="9" stroke-linecap="round"/><path d="M26 49 148 20" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" fill="none"/></svg>'
    }
    function flowersArt() {
      var c = ['#d9708f', '#f0b2c6', '#8e3b63', '#7a4a2a'], pts = [[40, 34, -20], [72, 22, 15], [100, 38, 0], [128, 24, -12], [158, 36, 25], [86, 30, 40], [118, 34, -35], [58, 40, 10]], o = ''
      pts.forEach(function (p, i) { o += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="15" ry="6" fill="' + c[i % 4] + '" transform="rotate(' + p[2] + ' ' + p[0] + ' ' + p[1] + ')"/>' })
      return '<svg viewBox="0 0 200 64" aria-hidden="true">' + o + '</svg>'
    }
    var SPARK = '<circle cx="56" cy="19" r="2" fill="#fff"/><circle cx="118" cy="16" r="1.500" fill="#fff"/><circle cx="150" cy="22" r="2.200" fill="#fff"/><circle cx="90" cy="25" r="1.300" fill="#fff"/>'
    var ART = {
      orange: function () { return orange(false) }, dorange: function () { return orange(true) }, ice: ice, glass: glassArt, balloon: balloonArt, straw: strawArt, flowers: flowersArt,
      gin: function () { return slab('gin', SPARK) }, tonic: function () { return slab('tonic', SPARK) }, campari: function () { return slab('campari') }, vermouth: function () { return slab('vermouth') }
    }

    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight, n = st.items.length
      var sw = W < 520 ? Math.min(W * .5, 200) : Math.min(W * .46, 280)
      sw = Math.min(sw, H * .55)
      var ah = sw * .32, pitch = Math.min((H * .9 - ah) / Math.max(1, n - 1), ah * 1.8)
      var top0 = (H - (pitch * (n - 1) + ah)) / 2
      var cx = W < 520 ? W * .33 : W * .36, left = cx - sw / 2
      var lx = left + sw + 26, lw = Math.max(96, W - lx - 4)
      st.mid = top0 + (pitch * (n - 1) + ah) / 2
      st.g = { cx: cx, cy: H / 2 }
      var gw = sw * 1.25, gh = gw * 4 / 3
      glass.style.width = gw + 'px'; glass.style.height = gh + 'px'
      glass.style.left = (cx - gw / 2) + 'px'; glass.style.top = (st.mid - gh / 2) + 'px'
      st.items.forEach(function (it, i) {
        var y = top0 + i * pitch
        it.y = y; it.h = ah
        it.el.style.zIndex = n - i
        it.el.style.transform = 'translate(' + left + 'px,' + y + 'px)'
        it.art.style.width = sw + 'px'; it.art.style.height = ah + 'px'
        it.t.style.left = (sw + 8) + 'px'; it.t.style.top = (ah / 2 - 13) + 'px'; it.t.style.width = (lw + 18) + 'px'
        it.line.style.width = '18px'
      })
    }

    function build(layers, title) {
      d.getElementById('xvt').innerHTML = title
      box.innerHTML = ''
      var L = lang()
      st.items = layers.map(function (x, i) {
        var el = d.createElement('div'); el.className = 'xl'
        el.innerHTML = '<div class="xl-art" style="--d:' + (-i * .6) + 's">' + (ART[x.t] ? ART[x.t]() : '') + '</div><div class="xl-t"><i></i><span></span></div>'
        var nm = typeof x.n === 'string' ? x.n : (x.n[L] || x.n.en || x.n.hu)
        el.querySelector('span').textContent = nm
        box.appendChild(el)
        return { el: el, art: el.firstChild, t: el.lastChild, line: el.querySelector('i') }
      })
    }

    // ----- 3D (Three.js, chargé seulement au premier besoin) -----
    var host3 = d.getElementById('xv3'), lab3 = d.getElementById('xvl'), tg = xv.querySelector('.xv-tg'), tip = xv.querySelector('.xv-tip')

    // ----- vue éclatée « photo » : séquence d'images pré-calculées dans Blender (data-xv > q), lue dans un canvas -----
    // Le dessin de la carte se pose sur le verre de la photo et se fond dans la première image (le cocktail tel que
    // sur la photo d'accueil), puis les ingrédients sortent du verre jusqu'à la vue éclatée. Glisser vers le haut ou
    // le bas fait avancer ou reculer l'animation. Chaque image est recadrée sur les pièces (bords fondus) et posée à
    // sa place dans le cadre (q.b) ; le fond de la page reprend le dégradé des images, placé par rapport au cadre (q.bg).
    // En cas d'échec (réseau), retour à la vue 3D, puis à la version dessinée.
    var sqHost = d.getElementById('xvq'), tipQ = xv.querySelector('.xv-tipq')
    var sqCv = sqHost && sqHost.querySelector('canvas'), sqA = sqHost && sqHost.querySelector('img'), sqBar = sqHost && sqHost.querySelector('.xv-sqbar')
    var SQC = {}, sqFree = 0, sq = null
    function seqOk(q) {
      if (!q || q.fmt !== 2 || !sqHost || !sqCv.getContext || !window.fetch || !window.Promise || !q.n || !q.w || !q.w.length) return false
      var c = navigator.connection
      return !(c && c.saveData)
    }
    function sqPickW(q) {
      var ws = q.w.slice().sort(function (a, b) { return a - b })
      if (Math.min(screen.width || 1e4, screen.height || 1e4) < 520) return ws[0] // téléphone : la plus petite série (mémoire)
      var H = Math.min(innerHeight - 170, 940), iw = Math.min(H / q.r, innerWidth * .94 / .66)
      var need = iw * Math.min(window.devicePixelRatio || 1, 2) * .9
      for (var i = 0; i < ws.length; i++) if (ws[i] >= need) return ws[i]
      return ws[ws.length - 1]
    }
    function sqUrl(q, w, name) { return q.p + w + '/' + name + '.webp?v=' + q.v }
    function sqLoad(q, w) {
      var key = sqUrl(q, w, '')
      if (SQC[key]) return SQC[key]
      var c = SQC[key] = { frames: new Array(q.n), done: 0, onprog: null }
      // image 0 : le cocktail dans son verre, affiché pendant que le reste arrive
      c.a = new Promise(function (res, rej) {
        var im = new Image()
        im.onload = function () { (im.decode ? im.decode() : Promise.resolve()).then(function () { res(im) }, function () { res(im) }) }
        im.onerror = function () { rej(new Error('image 0')) }
        im.src = sqUrl(q, w, '00')
      })
      function bitmap(b) {
        if (window.createImageBitmap) return createImageBitmap(b)
        return new Promise(function (res, rej) { var im = new Image(); im.onload = function () { res(im) }; im.onerror = rej; im.src = URL.createObjectURL(b) })
      }
      var ps = [c.a.then(function (im) { c.frames[0] = im; c.done++; if (c.onprog) c.onprog(c.done / q.n) })]
      for (var i = 1; i < q.n; i++) (function (i) {
        ps.push(fetch(sqUrl(q, w, (i < 10 ? '0' : '') + i)).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob() }).then(bitmap).then(function (b) {
          c.frames[i] = b; c.done++
          if (c.onprog) c.onprog(c.done / q.n)
        }))
      })(i)
      c.all = Promise.all(ps)
      function forget() { if (SQC[key] === c) delete SQC[key] } // un nouvel essai repartira de zéro
      c.all.catch(forget); c.a.catch(forget)
      return c
    }
    function sqRelease() { // libère la mémoire des images décodées (30 s après la fermeture)
      Object.keys(SQC).forEach(function (k) {
        var c = SQC[k]
        c.all.then(function () { c.frames.forEach(function (b) { if (b && b.close) b.close() }) }, function () {})
        delete SQC[k]
      })
    }
    function sqGeom(q) {
      // la photo occupe toute la hauteur de la scène ; sur téléphone ses bords (fond noir) sortent de l'écran
      var W = stage.clientWidth, H = stage.clientHeight, ih = H, iw = ih / q.r
      if (iw * .66 > W) { iw = W / .66; ih = iw * q.r }
      var sr = stage.getBoundingClientRect(), vw = xv.clientWidth || innerWidth
      return { W: W, H: H, iw: iw, ih: ih, ix: (W - iw) / 2, iy: (H - ih) / 2, vl: 12 - sr.left, vr: vw - sr.left - 12 }
    }
    function sqBegin(q, data) {
      clearTimeout(sqFree)
      sq = { q: q, p: 0, dir: 1, fi: -1, li: -1, labels: [], shown: false, ready: false, aOn: true, tok: 0, raf: 0 }
      var w = sqPickW(q), b0 = q.b[0]
      sqCv.width = w; sqCv.height = Math.round(w * q.r)
      sq.ctx = sqCv.getContext('2d')
      // l'image 0 (balise img) se pose à la place de son recadrage, comme le canvas la dessinera
      sqA.style.left = b0[0] * 100 + '%'; sqA.style.top = b0[1] * 100 + '%'
      sqA.style.width = (b0[2] - b0[0]) * 100 + '%'; sqA.style.height = (b0[3] - b0[1]) * 100 + '%'
      sq.set = sqLoad(q, w)
      sqLabels(data)
      sqLayout()
    }
    function sqLayout() {
      if (!sq) return
      var q = sq.q, g = sq.g = sqGeom(q)
      sqHost.style.left = g.ix + 'px'; sqHost.style.top = g.iy + 'px'; sqHost.style.width = g.iw + 'px'; sqHost.style.height = g.ih + 'px'
      // l'illustration de la carte se pose exactement sur le verre de la photo (même largeur, même base)
      var b = q.g, c = q.c || [.2217, .86, .7667]
      var cw = (b[2] - b[0]) * g.iw / (c[2] - c[0]), ch = cw * 4 / 3
      glass.style.width = cw + 'px'; glass.style.height = ch + 'px'
      glass.style.left = (g.ix + (b[0] + b[2]) / 2 * g.iw - (c[0] + c[2]) / 2 * cw) + 'px'
      glass.style.top = (g.iy + b[3] * g.ih - c[1] * ch) + 'px'
      // le dégradé du fond de la page, placé par rapport au cadre des images : il prolonge exactement le leur
      var sr = stage.getBoundingClientRect(), xr = xv.getBoundingClientRect(), B = q.bg
      var fx = sr.left - xr.left + g.ix, fy = sr.top - xr.top + g.iy
      bg.style.backgroundImage = 'radial-gradient(' + (B[2] * g.iw).toFixed(1) + 'px ' + (B[3] * g.ih).toFixed(1) + 'px at ' +
        (fx + B[0] * g.iw).toFixed(1) + 'px ' + (fy + B[1] * g.ih).toFixed(1) + 'px,' +
        q.st.map(function (x) { return x[0] + ' ' + (x[1] * 100).toFixed(1) + '%' }).join(',') + ')'
      sqLabelsLayout()
    }
    function sqLabels(layers) {
      var L = lang()
      lab3.innerHTML = ''
      sq.labels = sq.q.l.map(function (l) {
        var x = null
        layers.forEach(function (y) { if (y.t === l.k) x = y })
        var el = d.createElement('div'); el.className = 'xsl ' + (l.s === 'l' ? 'xsl-l' : 'xsl-r')
        el.innerHTML = '<i></i><b></b><span></span>'
        el.lastChild.textContent = !x ? l.k : typeof x.n === 'string' ? x.n : (x.n[L] || x.n.en || x.n.hu)
        lab3.appendChild(el)
        return { el: el, l: l, on: false }
      })
    }
    function sqLabelsLayout() {
      var g = sq.g, n = sq.q.n
      lab3.style.setProperty('--fs', Math.max(10, Math.min(14, g.ih * .0175)).toFixed(1) + 'px')
      var gap = Math.max(5, g.iw * .012), seg = Math.max(16, g.iw * .045), tg = 8
      // une colonne de noms par côté, alignée juste après la pièce la plus large de ce côté dans la vue éclatée
      // (comme sur l'image imprimée) ; chaque trait part de sa pièce, qui bouge encore un peu à l'arrivée
      var xr = -1e9, xl = 1e9
      sq.labels.forEach(function (o) { var x = g.ix + o.l.p[n - 1][0] * g.iw; if (o.l.s === 'l') xl = Math.min(xl, x); else xr = Math.max(xr, x) })
      xr += gap + seg; xl -= gap + seg
      sq.lay = { gap: gap, xl: xl, xr: xr }
      sq.labels.forEach(function (o) {
        var left = o.l.s === 'l', x1 = left ? xl : xr, sp = o.el.lastChild
        if (left) { sp.style.left = 'auto'; sp.style.right = (g.W - x1 + tg).toFixed(1) + 'px'; sp.style.maxWidth = Math.max(40, x1 - tg - g.vl).toFixed(0) + 'px' }
        else { sp.style.right = 'auto'; sp.style.left = (x1 + tg).toFixed(1) + 'px'; sp.style.maxWidth = Math.max(40, g.vr - x1 - tg).toFixed(0) + 'px' }
      })
      sq.li = -1; sqLabelsAt(Math.max(0, sq.fi))
    }
    function sqLabelsAt(i) { // place les traits sur les pièces de l'image i
      if (i === sq.li || !sq.lay) return
      sq.li = i
      var g = sq.g, L = sq.lay
      sq.labels.forEach(function (o) {
        var a = o.l.p[i], ax = g.ix + a[0] * g.iw, ay = g.iy + a[1] * g.ih, left = o.l.s === 'l'
        var x0 = left ? ax - L.gap : ax + L.gap, x1 = left ? L.xl : L.xr
        var line = o.el.firstChild, dot = line.nextSibling
        o.el.style.transform = 'translateY(' + ay.toFixed(1) + 'px)'
        dot.style.left = x0.toFixed(1) + 'px'
        line.style.left = Math.min(x0, x1).toFixed(1) + 'px'; line.style.width = Math.abs(x1 - x0).toFixed(1) + 'px'
      })
    }
    function sqDraw(p) {
      var n = sq.q.n, i = Math.max(0, Math.min(n - 1, Math.round(p * (n - 1)))), f = sq.set.frames[i]
      if (i !== sq.fi && f) {
        // chaque image recadrée est posée à sa place dans le cadre ; autour, le canvas reste transparent (fond de la page)
        var cw = sqCv.width, ch = sqCv.height, b = sq.q.b[i], x0 = Math.round(b[0] * cw), y0 = Math.round(b[1] * ch)
        sq.ctx.clearRect(0, 0, cw, ch)
        sq.ctx.drawImage(f, x0, y0, Math.round(b[2] * cw) - x0, Math.round(b[3] * ch) - y0)
        sq.fi = i
      }
      sq.p = p
      sqLabelsAt(Math.max(0, sq.fi)) // les traits suivent l'image affichée
      var show = st.exploded && sq.dir >= 0
      sq.labels.forEach(function (o) { var on = show && p >= o.l.at - 1e-3; if (on !== o.on) { o.on = on; o.el.classList.toggle('on', on) } })
    }
    function sqRun(to, ms) { // joue la séquence jusqu'à « to » (0 ou 1) ; ms = durée d'un parcours complet
      cancelAnimationFrame(sq.raf)
      var s0 = sq, from = sq.p, span = Math.abs(to - from), tok = ++sq.tok
      if (to !== from) sq.dir = to > from ? 1 : -1
      if (!span || reduce || !ms) { sqDraw(to); return Promise.resolve() }
      var dur = ms * span, t0 = 0
      return new Promise(function (res) {
        function step(t) {
          if (sq !== s0 || s0.tok !== tok) return res()
          if (!t0) t0 = t
          var u = Math.min(1, (t - t0) / dur)
          sqDraw(from + (to - from) * u)
          if (u < 1) s0.raf = requestAnimationFrame(step); else res()
        }
        s0.raf = requestAnimationFrame(step)
      })
    }
    function sqShowA(on) { if (sq.aOn !== on) { sq.aOn = on; sqA.style.opacity = on ? 1 : 0 } }
    function sqSet(on) { // décomposer (on) ou reconstituer la boisson
      if (!sq || !sq.ready || st.closing) return
      st.exploded = on
      tg.classList.toggle('ex', on); tg.setAttribute('aria-pressed', String(on))
      var s0 = sq
      if (on) {
        sqShowA(false) // la balise img laisse la place au canvas, qui affiche la même image, puis les pièces sortent du verre
        sqRun(sq.p, 0)
        wait(reduce || sq.p > 0 ? 0 : 160).then(function () { if (sq === s0 && st.exploded) sqRun(1, 3400) })
        return
      }
      sqRun(0, 2400).then(function () { if (sq === s0 && !st.exploded && sq.p === 0 && !st.closing) sqShowA(true) })
    }
    function sqHide() { // retire la photo (repli ou fermeture)
      if (!sqHost) return
      if (sq) { cancelAnimationFrame(sq.raf); sq.tok++ }
      sqHost.hidden = true; sqA.style.opacity = ''; sqA.removeAttribute('src'); sqBar.classList.remove('on'); sqBar.style.transform = ''
      tipQ.hidden = true
    }
    function runSeq(intro, raw, data, kind, token) {
      var q = raw.q, c = sq.set, s0 = sq
      function ok() { return st.open && !st.closing && st.token === token && sq === s0 }
      var timeout = new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')) }, 12000) })
      var loading = setTimeout(function () { if (ok()) glass.classList.add('xv-wait') }, 900)
      Promise.all([intro, Promise.race([c.a, timeout])]).then(function (r) {
        clearTimeout(loading); glass.classList.remove('xv-wait')
        if (!ok()) return
        // 2) le dessin devient photo : fondu enchaîné pendant que la lumière baisse
        sqA.src = r[1].src; sqA.style.opacity = 1; sq.aOn = true
        sqHost.hidden = false; sq.shown = true
        var f = reduce ? 1 : 0
        play(sqHost, [{ opacity: 0 }, { opacity: 1 }], { duration: f || 560, fill: 'forwards', easing: 'ease-in-out' })
        play(glass, [{ opacity: 1 }, { opacity: 0 }], { duration: f || 520, delay: f ? 0 : 80, fill: 'both', easing: 'ease-in-out' })
        var barT = setTimeout(function () { if (ok() && !sq.ready) sqBar.classList.add('on') }, 800)
        c.onprog = function (x) { sqBar.style.transform = 'scaleX(' + x.toFixed(3) + ')' }
        c.onprog(c.done / q.n)
        return Promise.all([wait(reduce ? 0 : 760), c.all]).then(function () {
          clearTimeout(barT); sqBar.classList.remove('on'); c.onprog = null
          if (!ok()) return
          // 3) la boisson se décompose
          sq.ready = true; sq.fi = -1; sqDraw(0)
          tg.hidden = false; tipQ.hidden = false
          return wait(reduce ? 0 : 200).then(function () { if (ok() && !st.exploded) sqSet(true) })
        })
      }).catch(function (e) {
        try { console.warn('vue éclatée photo indisponible, vue 3D :', e && e.message) } catch (x) {}
        clearTimeout(loading); glass.classList.remove('xv-wait')
        if (!ok()) return
        // repli : l'illustration revient au centre, puis la vue 3D (ou dessinée) prend le relais
        var shown = sq.shown
        sqHide(); sq = null
        cancelOn(glass)
        var r0 = glass.getBoundingClientRect()
        layout()
        var r1 = glass.getBoundingClientRect()
        var fl = done(play(glass, [{ opacity: shown ? 0 : 1, transform: 'translate(' + (r0.left - r1.left) + 'px,' + (r0.top - r1.top) + 'px) scale(' + (r0.width / r1.width) + ')' }, { opacity: 1, transform: 'none' }], { duration: reduce ? 1 : 460, easing: EASE }))
        if (!glOk()) { st.mode = 'svg'; box.hidden = false; lab3.hidden = true; lab3.innerHTML = ''; fl.then(function () { if (st.open && !st.closing && st.token === token) playSvg(0) }); return }
        st.mode = '3d'
        var useGlb = !!raw.g && !glbBad
        run3d(fl, load3d(raw), useGlb, data, kind, token)
      })
    }
    var modP = null, scene = null, hasGL = null
    function glOk() {
      if (hasGL !== null) return hasGL
      try { var c = d.createElement('canvas'); hasGL = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))) } catch (e) { hasGL = false }
      return hasGL
    }
    function warm() { if (!modP && glOk()) { modP = import('./assets/js/negroni3d.js'); modP.catch(function () { modP = null; hasGL = false }) } return modP }
    // modèle 3D professionnel (GLB) : chargé seulement si le build en a trouvé un de valide (data-xv > g) ; sinon rien de tout ça ne sert.
    var glbMod = null, glbP = {}, glbBad = false
    function warmGlb() { if (!glbMod) { glbMod = import('./assets/js/glbview.js'); glbMod.catch(function () { glbMod = null }) } return glbMod }
    function loadGlb(g) {
      if (!glbP[g.m]) glbP[g.m] = warmGlb().then(function (m) { return m.load(g.m, g.c) })
      return glbP[g.m]
    }
    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms) }) }
    function done(a) { return new Promise(function (r) { a.onfinish = r; a.oncancel = r }) }

    function buildLabels(layers) {
      var L = lang()
      lab3.innerHTML = ''
      return layers.map(function (x) {
        var el = d.createElement('div'); el.className = 'x3l'
        el.innerHTML = '<i></i><span></span>'
        el.lastChild.textContent = typeof x.n === 'string' ? x.n : (x.n[L] || x.n.en || x.n.hu)
        lab3.appendChild(el)
        return { el: el, line: el.firstChild, key: x.t, on: false, x: -1, y: -1, w: -1 }
      })
    }
    function onFrame(info) {
      var ls = st.labels3; if (!ls) return
      var colX = info.colX + 34
      info.parts.forEach(function (p, i) {
        var l = st.byKey ? st.byKey[p.k] : ls[i]; if (!l) return
        var x = Math.round(p.edge + 10), y = Math.round(p.sy - 13), w = Math.max(18, Math.round(colX - x))
        if (x !== l.x || y !== l.y) { l.el.style.transform = 'translate(' + x + 'px,' + y + 'px)'; l.x = x; l.y = y }
        if (w !== l.w) { l.line.style.width = w + 'px'; var sp = l.el.lastChild; sp.style.left = (w + 10) + 'px'; sp.style.maxWidth = Math.max(60, info.W - x - w - 14) + 'px'; l.w = w }
        var on = st.exploded && p.p > .93
        if (on !== l.on) { l.on = on; l.el.classList.toggle('on', on) }
      })
    }
    function setExploded(on, instant) {
      st.exploded = on
      tg.classList.toggle('ex', on)
      tg.setAttribute('aria-pressed', String(on))
      if (!on && st.labels3) st.labels3.forEach(function (l) { l.on = false; l.el.classList.remove('on') })
      if (!on && scene.clearFocus) scene.clearFocus()
      scene.setTarget(on ? 1 : 0, instant || reduce ? 0 : (on ? 2900 : 2300))
    }
    function mount3d(m, data, kind) {
      var layers = data
      if (m.glb) { kind = 'glb'; layers = st.glb.l.filter(function (x) { return m.glb.present.indexOf(x.t) >= 0 }) }
      if (scene && scene.kind !== kind) { scene.dispose(); scene = null }
      if (!scene) {
        scene = m.create(host3, kind)
        scene.onFrame = onFrame
        scene.onTap = function () { if (st.open && !st.closing && st.mode === '3d') setExploded(!st.exploded) }
        scene.onLost = function () { if (st.open && st.mode === '3d') toSvg() }
        scene.kind = kind
        scene.onFocus = function (k) { if (st.labels3) st.labels3.forEach(function (l) { l.el.classList.toggle('sel', !!k && l.key === k); l.el.classList.toggle('dim', !!k && l.key !== k) }) }
      }
      if (/[?&]xvdebug/.test(location.search)) window.__xv = { scene: scene } // contrôle automatique uniquement
      sizeScene()
      st.labels3 = buildLabels(layers)
      st.byKey = null
      if (m.glb) { st.byKey = {}; st.labels3.forEach(function (l) { st.byKey[l.key] = l }) }
      scene.setTarget(0, 0); scene.start()
    }
    function sizeScene() {
      if (!scene) return
      var W = stage.clientWidth, H = stage.clientHeight
      scene.resize(W, H, W < 520 ? W * .31 : W * .36)
    }
    function toSvg() {
      // repli : pas de WebGL (ou échec) -> version SVG en couches
      st.mode = 'svg'
      if (scene) scene.stop()
      host3.classList.remove('on'); tg.hidden = true; tip.hidden = true; lab3.hidden = true
      box.hidden = false
      glass.getAnimations && glass.getAnimations().forEach(function (a) { a.cancel() })
      playSvg(0)
    }
    function playSvg(base) {
      play(glass, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, delay: base + 520, fill: 'forwards', easing: 'ease-in-out' })
      st.items.forEach(function (it, i) {
        var off = st.mid - (it.y + it.h / 2), dl = base + 560 + i * 70
        play(it.art, [{ opacity: 0, transform: 'translateY(' + off + 'px) scale(.78)' }, { opacity: 1, transform: 'none', offset: .25 }, { opacity: 1, transform: 'none' }], { duration: 900, delay: dl, fill: 'both', easing: EASE })
        play(it.t, [{ opacity: 0, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: dl + 520, fill: 'both', easing: EASE })
        play(it.line, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 420, delay: dl + 520, fill: 'both', easing: EASE })
      })
    }

    function open(card, btn) {
      if (st.open) return
      var img = card.querySelector('.ph img'); if (!img) return
      var data, kind, raw; try { raw = JSON.parse(card.getAttribute('data-xv')); data = raw.l; kind = raw.s } catch (e) { return }
      st.open = true; st.closing = false; st.img = img; st.btn = btn; st.exploded = false; st.data = data; st.glb = raw.g || null
      var q = seqOk(raw.q) ? raw.q : null
      var try3d = glOk()
      st.mode = q ? 'seq' : try3d ? '3d' : 'svg'
      var useGlb = try3d && !!raw.g && !glbBad
      var mp = q || !try3d ? null : load3d(raw)
      var first = img.getBoundingClientRect()
      glass.src = img.currentSrc || img.src
      build(data, card.querySelector('h4').innerHTML)
      xv.hidden = false
      de.style.overflow = 'hidden'; main.inert = true
      try { history.pushState({ xv: 1 }, '') } catch (e) {}
      box.hidden = st.mode !== 'svg'; lab3.hidden = st.mode === 'svg'; tg.hidden = true; tip.hidden = true; tipQ.hidden = true
      layout()
      if (q) sqBegin(q, data) // l'illustration se posera directement sur le verre de la photo
      var last = glass.getBoundingClientRect()
      img.style.visibility = 'hidden'
      st.anims = []
      var fade = [{ opacity: 0 }, { opacity: 1 }]
      var intro
      if (reduce) {
        ;[bg, xbtn, head].forEach(function (e) { play(e, fade, { duration: 160, fill: 'forwards' }) })
        intro = wait(60)
      } else {
        play(bg, fade, { duration: 420, fill: 'forwards' })
        play(head, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 200, fill: 'both', easing: EASE })
        play(xbtn, fade, { duration: 300, delay: 260, fill: 'both' })
        // 1) l'illustration quitte la carte et vient se poser au centre
        var dx = first.left - last.left, dy = first.top - last.top, s = first.width / last.width
        intro = done(play(glass, [{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }], { duration: 640, easing: EASE }))
      }
      xbtn.focus({ preventScroll: true })
      var token = st.token = (st.token || 0) + 1
      if (q) { runSeq(intro, raw, data, kind, token); return }
      if (!try3d) { if (reduce) { glass.style.opacity = 0; st.items.forEach(function (it) { play(it.art, fade, { duration: 160, fill: 'forwards' }); play(it.t, fade, { duration: 160, fill: 'forwards' }) }) } else playSvg(0); return }
      run3d(intro, mp, useGlb, data, kind, token)
    }
    function load3d(raw) {
      return raw.g && !glbBad
        ? loadGlb(raw.g).catch(function (e) { glbBad = true; try { console.warn('modèle 3D indisponible, expérience actuelle conservée :', e && e.message) } catch (x) {} return warm() })
        : warm()
    }
    function run3d(intro, mp, useGlb, data, kind, token) {
      // 2) la 3D remplace l'illustration puis la boisson se désassemble
      var timeout = new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')) }, useGlb ? 25000 : 9000) })
      var loading = setTimeout(function () { if (st.open && st.token === token) glass.classList.add('xv-wait') }, 900)
      Promise.all([intro, Promise.race([mp, timeout])]).then(function (r) {
        clearTimeout(loading); glass.classList.remove('xv-wait')
        if (!st.open || st.closing || st.token !== token) return
        mount3d(r[1], data, kind)
        host3.classList.add('on')
        return wait(reduce ? 0 : 480).then(function () {
          if (!st.open || st.closing || st.token !== token) return
          play(glass, [{ opacity: 1 }, { opacity: 0 }], { duration: reduce ? 1 : 300, fill: 'forwards' })
          tg.hidden = false; tip.hidden = false
          return wait(reduce ? 0 : 320).then(function () { if (st.open && !st.closing && st.token === token) setExploded(true) })
        })
      }).catch(function (e) {
        try { console.warn('vue 3D indisponible, version dessinée :', e && e.message) } catch (x) {}
        clearTimeout(loading); glass.classList.remove('xv-wait')
        if (st.open && !st.closing && st.token === token) toSvg()
      })
    }

    function finish() {
      stopAll(); xv.hidden = true
      de.style.overflow = ''; main.inert = false
      glass.style.opacity = ''; glass.classList.remove('xv-wait')
      host3.classList.remove('on'); tg.hidden = true; tip.hidden = true
      if (scene) scene.stop()
      if (sq) { sqHide(); sq = null; clearTimeout(sqFree); sqFree = setTimeout(sqRelease, 30000) }
      bg.style.backgroundImage = ''
      if (st.img) st.img.style.visibility = ''
      st.open = false; st.closing = false
      if (st.btn) try { st.btn.focus({ preventScroll: true }) } catch (e) {}
    }
    function close() {
      if (!st.open || st.closing) return
      st.closing = true; st.token = (st.token || 0) + 1
      if (!st.fromPop && history.state && history.state.xv) { try { history.back() } catch (e) {} }
      st.fromPop = false
      if (st.mode === 'seq' && sq) {
        tg.hidden = true; tipQ.hidden = true; st.exploded = false
        sq.dir = -1; sqDraw(sq.p)
        if (!sq.ready) { back('seq'); return }
        var s0 = sq
        sqRun(0, reduce ? 0 : 1200).then(function () {
          if (sq !== s0) return
          sqShowA(true)
          return wait(reduce ? 0 : 420).then(function () { if (sq === s0) back('seq') })
        })
        return
      }
      if (st.mode === '3d' && scene && host3.classList.contains('on')) {
        // reconstitution fluide de la boisson, puis retour de l'illustration vers sa carte
        tg.hidden = true; tip.hidden = true
        if (st.labels3) st.labels3.forEach(function (l) { l.on = false; l.el.classList.remove('on') })
        st.exploded = false
        if (scene.clearFocus) scene.clearFocus()
        var dur = reduce ? 0 : 1500 * Math.max(.35, scene.u)
        scene.setTarget(0, dur)
        wait(dur + 80).then(function () { back3d() })
        return
      }
      back(false)
    }
    function back3d() { back(true) }
    function back(threeD) {
      var cur = glass.getBoundingClientRect(), bk = st.img.getBoundingClientRect()
      stopAll()
      if (reduce) { finish(); return }
      var out = { duration: 260, fill: 'forwards', easing: 'ease-in' }
      play(head, [{ opacity: 1 }, { opacity: 0 }], out); play(xbtn, [{ opacity: 1 }, { opacity: 0 }], out)
      var n = st.items.length
      var photo = threeD === 'seq'
      if (photo) {
        if (sq && sq.shown) {
          play(sqHost, [{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards', easing: 'ease-in-out' })
          play(glass, [{ opacity: 0 }, { opacity: 1 }], { duration: 380, fill: 'forwards', easing: 'ease-in-out' })
        }
      } else if (threeD) {
        host3.classList.remove('on')
        play(glass, [{ opacity: 0 }, { opacity: 1 }], { duration: 320, fill: 'forwards' })
      } else {
        st.items.forEach(function (it, i) {
          var off = st.mid - (it.y + it.h / 2)
          play(it.t, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })
          play(it.art, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(' + off + 'px) scale(.78)' }], { duration: 520, delay: (n - 1 - i) * 40, fill: 'forwards', easing: 'cubic-bezier(.5,0,.75,0)' })
        })
        play(glass, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 240, fill: 'forwards' })
      }
      // l'illustration retourne dans sa carte
      var base = photo ? (sq && sq.shown ? 360 : 0) : threeD ? 300 : 380
      var dx = bk.left - cur.left, dy = bk.top - cur.top, s = bk.width / cur.width
      var a = play(glass, [{ transform: 'none' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }], { duration: 560, delay: base, fill: 'forwards', easing: EASE })
      play(bg, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, delay: base + 60, fill: 'forwards' })
      a.onfinish = finish
    }

    d.querySelectorAll('.has-xv').forEach(function (c) {
      var b = c.querySelector('.xv-open')
      if (b) {
        b.addEventListener('click', function () { open(c, b) })
        var raw = {}
        try { raw = JSON.parse(c.getAttribute('data-xv')) || {} } catch (e) {}
        var q = seqOk(raw.q) ? raw.q : null
        // préchargement : vue 3D au survol ou au toucher ; images de la photo seulement au survol à la souris (pas au défilement sur téléphone)
        ;['pointerenter', 'touchstart', 'focus'].forEach(function (ev) {
          b.addEventListener(ev, function h(e) {
            if (!q) { warm(); if (raw.g) warmGlb() } else if (ev === 'focus' || e.pointerType === 'mouse') sqLoad(q, sqPickW(q)); else return
            b.removeEventListener(ev, h)
          }, { passive: true })
        })
        if (q && 'IntersectionObserver' in window) {
          var pio = new IntersectionObserver(function (es) {
            if (!es.some(function (x) { return x.isIntersecting })) return
            pio.disconnect(); new Image().src = sqUrl(q, sqPickW(q), '00')
          }, { rootMargin: '400px 0px' })
          pio.observe(c)
        }
      }
    })
    tg.addEventListener('click', function () {
      if (!st.open || st.closing) return
      if (st.mode === 'seq') sqSet(!st.exploded)
      else if (st.mode === '3d' && scene) setExploded(!st.exploded)
    })
    // photo : toucher = décomposer / reconstituer ; glisser vers le haut ou le bas = avancer / reculer l'animation
    if (sqHost) (function () {
      var dr = null
      sqHost.addEventListener('pointerdown', function (e) {
        if (!sq || !sq.ready || st.closing || (e.pointerType === 'mouse' && e.button !== 0)) return
        dr = { id: e.pointerId, y: e.clientY, p: sq.p, moved: false }
        try { sqHost.setPointerCapture(e.pointerId) } catch (x) {}
      })
      sqHost.addEventListener('pointermove', function (e) {
        if (!dr || e.pointerId !== dr.id || !sq) return
        var dy = dr.y - e.clientY
        if (!dr.moved) {
          if (Math.abs(dy) < 8) return
          dr.moved = true; dr.y = e.clientY; dr.p = sq.p; dy = 0
          cancelAnimationFrame(sq.raf); sq.tok++
          sqShowA(false); st.exploded = true
          tg.classList.add('ex'); tg.setAttribute('aria-pressed', 'true')
        }
        var p = Math.max(0, Math.min(1, dr.p + dy / (sq.g.ih * .5)))
        if (p !== sq.p) sq.dir = p > sq.p ? 1 : -1
        sqDraw(p)
      })
      function end(e) {
        if (!dr || e.pointerId !== dr.id) return
        var r = dr; dr = null
        if (!sq || !sq.ready || st.closing) return
        if (!r.moved) { if (e.type === 'pointerup') sqSet(!st.exploded); return }
        sqSet(sq.dir > 0 ? sq.p > .2 : sq.p > .8) // l'animation se termine dans le sens du geste
      }
      sqHost.addEventListener('pointerup', end); sqHost.addEventListener('pointercancel', end)
      sqHost.addEventListener('dragstart', function (e) { e.preventDefault() })
    })()
    xbtn.addEventListener('click', close)
    xv.addEventListener('click', function (e) { if (e.target === xv || e.target === bg || e.target === stage || e.target === box) close() })
    addEventListener('keydown', function (e) { if (st.open && (e.key === 'Escape' || e.key === 'Esc')) close() })
    addEventListener('popstate', function () { if (st.open && !st.closing) { st.fromPop = true; close() } })
    var rt
    addEventListener('resize', function () { if (!st.open || st.closing) return; clearTimeout(rt); rt = setTimeout(function () { layout(); sizeScene(); sqLayout() }, 120) })
  })()
})()
