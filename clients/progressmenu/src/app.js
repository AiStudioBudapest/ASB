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
})()
