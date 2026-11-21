(function () {
  var d = document, de = d.documentElement
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches

  // langue
  var btns = [].slice.call(d.querySelectorAll('[data-set-l]'))
  function mark() { btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-l') === de.getAttribute('data-l'))) }) }
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-set-l')
      de.setAttribute('data-l', l); de.lang = l
      try { localStorage.setItem('pm_lang', l) } catch (e) {}
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
  if (!reduce) {
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

    // dessins des couches (viewBox 200 x 64), vus en légère perspective
    var TOP = 'M8 20a92 18 0 0 1 184 0a92 18 0 0 1-184 0Z'
    function slab(c, sp) {
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><path d="M8 20V42a92 18 0 0 0 184 0V20Z" fill="url(#xg-' + c + '-s)"/>' +
        '<path d="' + TOP + '" fill="url(#xg-' + c + '-t)" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/>' +
        '<ellipse cx="100" cy="19" rx="68" ry="10" fill="#fff" fill-opacity=".2"/>' + (sp || '') +
        '<path d="M24 36c20 10 132 10 152 0" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/></svg>'
    }
    function orange() {
      var seg = '', k, a, x, y
      for (k = 0; k < 10; k++) { a = k / 10 * Math.PI * 2; x = 100 + 70 * Math.cos(a); y = 30 + 19.500 * Math.sin(a); seg += 'M100 30L' + x.toFixed(1) + ' ' + y.toFixed(1) }
      return '<svg viewBox="0 0 200 64" aria-hidden="true"><ellipse cx="100" cy="31" rx="90" ry="26" fill="#e87a12"/><ellipse cx="100" cy="30" rx="90" ry="26" fill="#ff9d2e"/>' +
        '<ellipse cx="100" cy="30" rx="82" ry="22.500" fill="#ffe4b0"/><ellipse cx="100" cy="30" rx="75" ry="19.500" fill="url(#xg-orange-f)"/>' +
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
    var SPARK = '<circle cx="56" cy="19" r="2" fill="#fff"/><circle cx="118" cy="16" r="1.500" fill="#fff"/><circle cx="150" cy="22" r="2.200" fill="#fff"/><circle cx="90" cy="25" r="1.300" fill="#fff"/>'
    var ART = {
      orange: orange, ice: ice, glass: glassArt,
      gin: function () { return slab('gin', SPARK) }, campari: function () { return slab('campari') }, vermouth: function () { return slab('vermouth') }
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

    function open(card, btn) {
      if (st.open) return
      var img = card.querySelector('.ph img'); if (!img) return
      var data; try { data = JSON.parse(card.getAttribute('data-xv')) } catch (e) { return }
      st.open = true; st.closing = false; st.img = img; st.btn = btn
      var first = img.getBoundingClientRect()
      glass.src = img.currentSrc || img.src
      build(data, card.querySelector('h4').innerHTML)
      xv.hidden = false
      de.style.overflow = 'hidden'; main.inert = true
      try { history.pushState({ xv: 1 }, '') } catch (e) {}
      layout()
      var last = glass.getBoundingClientRect()
      img.style.visibility = 'hidden'
      st.anims = []
      var fade = [{ opacity: 0 }, { opacity: 1 }]
      if (reduce) {
        ;[bg, xbtn, head].forEach(function (e) { play(e, fade, { duration: 160, fill: 'forwards' }) })
        glass.style.opacity = 0
        st.items.forEach(function (it) { play(it.art, fade, { duration: 160, fill: 'forwards' }); play(it.t, fade, { duration: 160, fill: 'forwards' }) })
        xbtn.focus({ preventScroll: true }); return
      }
      play(bg, fade, { duration: 420, fill: 'forwards' })
      play(head, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 200, fill: 'both', easing: EASE })
      play(xbtn, fade, { duration: 300, delay: 260, fill: 'both' })
      // 1) l'illustration quitte la carte et vient se poser au centre
      var dx = first.left - last.left, dy = first.top - last.top, s = first.width / last.width
      play(glass, [{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }], { duration: 640, easing: EASE })
      // 2) elle s'efface pendant que les couches, d'abord regroupées, s'écartent les unes des autres
      play(glass, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, delay: 520, fill: 'forwards', easing: 'ease-in-out' })
      st.items.forEach(function (it, i) {
        var off = st.mid - (it.y + it.h / 2), dl = 560 + i * 70
        play(it.art, [{ opacity: 0, transform: 'translateY(' + off + 'px) scale(.78)' }, { opacity: 1, transform: 'none', offset: .25 }, { opacity: 1, transform: 'none' }], { duration: 900, delay: dl, fill: 'both', easing: EASE })
        play(it.t, [{ opacity: 0, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: dl + 520, fill: 'both', easing: EASE })
        play(it.line, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 420, delay: dl + 520, fill: 'both', easing: EASE })
      })
      xbtn.focus({ preventScroll: true })
    }

    function finish() {
      stopAll(); xv.hidden = true
      de.style.overflow = ''; main.inert = false
      glass.style.opacity = ''
      if (st.img) st.img.style.visibility = ''
      st.open = false; st.closing = false
      if (st.btn) try { st.btn.focus({ preventScroll: true }) } catch (e) {}
    }
    function close() {
      if (!st.open || st.closing) return
      st.closing = true
      if (!st.fromPop && history.state && history.state.xv) { try { history.back() } catch (e) {} }
      st.fromPop = false
      var cur = glass.getBoundingClientRect(), back = st.img.getBoundingClientRect()
      stopAll()
      if (reduce) { finish(); return }
      var out = { duration: 260, fill: 'forwards', easing: 'ease-in' }
      play(head, [{ opacity: 1 }, { opacity: 0 }], out); play(xbtn, [{ opacity: 1 }, { opacity: 0 }], out)
      var n = st.items.length
      st.items.forEach(function (it, i) {
        var off = st.mid - (it.y + it.h / 2)
        play(it.t, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })
        play(it.art, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(' + off + 'px) scale(.78)' }], { duration: 520, delay: (n - 1 - i) * 40, fill: 'forwards', easing: 'cubic-bezier(.5,0,.75,0)' })
      })
      // l'illustration réapparaît puis retourne dans sa carte
      play(glass, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 240, fill: 'forwards' })
      var dx = back.left - cur.left, dy = back.top - cur.top, s = back.width / cur.width
      var a = play(glass, [{ transform: 'none' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }], { duration: 560, delay: 380, fill: 'forwards', easing: EASE })
      play(bg, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, delay: 440, fill: 'forwards' })
      a.onfinish = finish
    }

    d.querySelectorAll('.has-xv').forEach(function (c) {
      var b = c.querySelector('.xv-open')
      if (b) b.addEventListener('click', function () { open(c, b) })
    })
    xbtn.addEventListener('click', close)
    xv.addEventListener('click', function (e) { if (e.target === xv || e.target === bg || e.target === stage || e.target === box) close() })
    addEventListener('keydown', function (e) { if (st.open && (e.key === 'Escape' || e.key === 'Esc')) close() })
    addEventListener('popstate', function () { if (st.open && !st.closing) { st.fromPop = true; close() } })
    var rt
    addEventListener('resize', function () { if (!st.open || st.closing) return; clearTimeout(rt); rt = setTimeout(layout, 120) })
  })()
})()
