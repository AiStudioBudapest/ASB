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

  // ---------- vue éclatée (test) : un clic sur une carte « has-xv » ----------
  var xv = d.getElementById('xv')
  if (xv && d.querySelector('.has-xv') && xv.animate) (function () {
    var stage = d.getElementById('xvs'), glass = xv.querySelector('.xv-glass'), ring = xv.querySelector('.xv-ring')
    var lines = xv.querySelector('.xv-lines'), scan = xv.querySelector('.xv-scan'), partsBox = xv.querySelector('.xv-parts')
    var bg = xv.querySelector('.xv-bg'), xbtn = xv.querySelector('.xv-x'), head = xv.querySelector('.xv-head')
    var main = d.querySelector('main'), NS = 'http://www.w3.org/2000/svg'
    var st = { open: false, closing: false, card: null, img: null, btn: null, items: [], anims: [], g: null, fromPop: false }
    var EASE = 'cubic-bezier(.2,.85,.2,1)', POP = 'cubic-bezier(.2,.9,.25,1.25)'
    function lang() { return de.getAttribute('data-l') || 'hu' }
    function play(el, kf, o) { var a = el.animate(kf, o); st.anims.push(a); return a }
    function stopAll() { st.anims.forEach(function (a) { try { a.cancel() } catch (e) {} }); st.anims = [] }

    // positions (px dans le repère de la scène)
    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight, wide = W / H > 1.2
      var gh = wide ? H * .62 : W < 520 ? H * .46 : Math.min(H * .6, W * .85), gw = gh * .75
      var gcx = W / 2, gcy = H / 2 + (wide ? 0 : 6), vh = gw * (W < 520 ? .4 : .42)
      var colW = Math.max(70, Math.min(140, W / 2 - vh - 4))
      var d0 = Math.min(vh + colW / 2 + 18, W / 2 - colW / 2 - 2)
      glass.style.width = gw + 'px'; glass.style.height = gh + 'px'
      glass.style.left = (gcx - gw / 2) + 'px'; glass.style.top = (gcy - gh / 2) + 'px'
      var rr = gh * .62
      ring.style.width = ring.style.height = (rr * 2) + 'px'; ring.style.left = (gcx - rr) + 'px'; ring.style.top = (gcy - rr) + 'px'
      scan.style.width = (gw * .9) + 'px'; scan.style.left = (gcx - gw * .45) + 'px'; scan.style.top = (gcy - gh / 2) + 'px'
      lines.setAttribute('viewBox', '0 0 ' + W + ' ' + H)
      var n = st.items.length, sides = [[], []]
      st.items.forEach(function (it, i) { sides[i % 2].push(it) })
      sides.forEach(function (arr, s) {
        arr.forEach(function (it, j) {
          var k = arr.length
          var fr = k === 1 ? (s ? .64 : .34) : .17 + (j + (s ? .5 : 0)) / k * .62
          var cy = Math.min(H * .86, Math.max(H * .12, H * fr)), cx = gcx + (s ? 1 : -1) * d0
          it.x = cx; it.y = cy; it.w = colW; it.side = s
          it.el.style.width = colW + 'px'
          it.el.style.transform = 'translate(' + (cx - colW / 2) + 'px,' + (cy - 24) + 'px)'
          var ay = Math.max(gcy - gh * .3, Math.min(gcy + gh * .3, cy)), ax = gcx + (s ? 1 : -1) * vh * .5
          var ex = cx + (s ? -1 : 1) * 24, bx = ex + (s ? -1 : 1) * Math.min(34, Math.abs(ax - ex) * .5)
          it.line.setAttribute('d', 'M' + ax + ' ' + ay + 'L' + bx + ' ' + cy + 'L' + ex + ' ' + cy)
          it.dot.setAttribute('cx', ax); it.dot.setAttribute('cy', ay)
          var len = it.line.getTotalLength ? it.line.getTotalLength() : 200
          it.line.style.strokeDasharray = len; it.len = len
        })
      })
      st.g = { gcx: gcx, gcy: gcy, gw: gw, gh: gh }
    }

    function build(data, name) {
      d.getElementById('xvt').innerHTML = name
      d.getElementById('xvn').textContent = data.length
      partsBox.innerHTML = ''; lines.innerHTML = ''
      st.items = data.map(function (x, i) {
        var el = d.createElement('div'); el.className = 'xp'
        el.innerHTML = '<div class="xp-in"><div class="xp-o" style="--c:' + x.c + ';--d:' + (-i * .7) + 's"><svg viewBox="0 0 40 40" aria-hidden="true"><use href="#x-' + x.k + '"/></svg><b>' + (i + 1) + '</b></div><div class="xp-l"></div></div>'
        el.querySelector('.xp-l').textContent = x.n
        partsBox.appendChild(el)
        var line = d.createElementNS(NS, 'path'), dot = d.createElementNS(NS, 'circle')
        line.setAttribute('stroke', 'rgb(' + x.c.split(' ').join(',') + ')'); dot.setAttribute('r', 3.5); dot.setAttribute('fill', 'rgb(' + x.c.split(' ').join(',') + ')')
        lines.appendChild(line); lines.appendChild(dot)
        return { el: el, inn: el.firstChild, line: line, dot: dot }
      })
    }

    function open(card, btn) {
      if (st.open) return
      var img = card.querySelector('.ph img'); if (!img) return
      var data; try { data = JSON.parse(card.getAttribute('data-xv')) } catch (e) { return }
      st.open = true; st.closing = false; st.card = card; st.img = img; st.btn = btn
      var first = img.getBoundingClientRect()
      glass.src = img.currentSrc || img.src
      build(data, card.querySelector('h4').innerHTML.replace(/<span data-l="[^"]*">/g, function (m) { return m }))
      xv.hidden = false
      de.classList.add('xv-on'); de.style.overflow = 'hidden'
      main.inert = true
      try { history.pushState({ xv: 1 }, '') } catch (e) {}
      layout()
      var last = glass.getBoundingClientRect()
      img.style.visibility = 'hidden'
      st.anims = []
      var t = reduce ? 1 : 1
      if (reduce) {
        ;[bg, xbtn, head, ring].forEach(function (e) { play(e, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, fill: 'forwards' }) })
        st.items.forEach(function (it) { play(it.inn, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, fill: 'forwards' }); it.line.style.strokeDashoffset = 0 })
        xbtn.focus(); return
      }
      play(bg, [{ opacity: 0 }, { opacity: 1 }], { duration: 380, fill: 'forwards' })
      play(head, [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 160, fill: 'both', easing: EASE })
      play(xbtn, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: 220, fill: 'both', easing: POP })
      // l'illustration quitte la carte et grandit au centre
      var dx = first.left - last.left, dy = first.top - last.top, s = first.width / last.width
      play(glass, [{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }], { duration: 640, easing: EASE })
      // anneaux HUD + balayage
      play(ring, [{ opacity: 0, transform: 'scale(.55)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 280, fill: 'both', easing: EASE })
      var g = st.g
      play(scan, [{ opacity: 0, transform: 'translateY(0)' }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .85 }, { opacity: 0, transform: 'translateY(' + g.gh + 'px)' }], { duration: 900, delay: 380, easing: 'ease-in-out' })
      // pièces détachées qui s'écartent du verre, une à une
      st.items.forEach(function (it, i) {
        var sx = g.gcx - it.x, sy = g.gcy - it.y, dl = 420 + i * 130
        play(it.inn, [{ opacity: 0, transform: 'translate(' + sx + 'px,' + sy + 'px) scale(.2) rotate(' + (it.side ? 140 : -140) + 'deg)' }, { opacity: 1, transform: 'none' }], { duration: 760, delay: dl, fill: 'both', easing: POP })
        it.line.style.strokeDashoffset = it.len; it.dot.style.opacity = 0
        play(it.line, [{ strokeDashoffset: it.len }, { strokeDashoffset: 0 }], { duration: 520, delay: dl + 380, fill: 'both', easing: 'ease-out' })
        play(it.dot, [{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 260, delay: dl + 700, fill: 'both' })
      })
      xbtn.focus({ preventScroll: true })
    }

    function finish() {
      stopAll(); xv.hidden = true
      de.classList.remove('xv-on'); de.style.overflow = ''
      main.inert = false
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
      var out = { duration: 300, fill: 'forwards', easing: 'ease-in' }
      play(head, [{ opacity: 1 }, { opacity: 0 }], out); play(xbtn, [{ opacity: 1 }, { opacity: 0 }], out)
      play(ring, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.6)' }], out)
      var g = st.g
      st.items.forEach(function (it, i) {
        var sx = g.gcx - it.x, sy = g.gcy - it.y
        play(it.inn, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translate(' + sx + 'px,' + sy + 'px) scale(.2)' }], { duration: 380, delay: i * 40, fill: 'forwards', easing: 'cubic-bezier(.5,0,.8,.4)' })
        play(it.line, [{ opacity: .9 }, { opacity: 0 }], out); play(it.dot, [{ opacity: 1 }, { opacity: 0 }], out)
      })
      var dx = back.left - cur.left, dy = back.top - cur.top, s = back.width / cur.width
      var a = play(glass, [{ transform: 'none' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }], { duration: 520, delay: 140, fill: 'forwards', easing: EASE })
      play(bg, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, delay: 160, fill: 'forwards' })
      a.onfinish = finish
    }

    d.querySelectorAll('.has-xv').forEach(function (c) {
      var b = c.querySelector('.xv-open')
      if (b) b.addEventListener('click', function () { open(c, b) })
    })
    xbtn.addEventListener('click', close)
    xv.addEventListener('click', function (e) { if (e.target === xv || e.target === bg || e.target === stage) close() })
    addEventListener('keydown', function (e) { if (st.open && (e.key === 'Escape' || e.key === 'Esc')) close() })
    addEventListener('popstate', function () { if (st.open && !st.closing) { st.fromPop = true; close() } })
    var rt
    addEventListener('resize', function () { if (!st.open || st.closing) return; clearTimeout(rt); rt = setTimeout(function () { layout() }, 120) })
  })()
})()
