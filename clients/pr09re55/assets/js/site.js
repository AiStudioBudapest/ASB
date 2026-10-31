/* PR09RE55 — small enhancements; every page works without this file. */
(function(){
  'use strict';
  var $ = function(s, c){ return (c || document).querySelector(s); };
  var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Loading screen (first page of a visit only): gold triangle and a thin bar, then the site */
  var root = document.documentElement;
  if(root.classList.contains('is-loading')){
    var t0 = Date.now(), done = false;
    var hide = function(){
      if(done) return; done = true;
      setTimeout(function(){
        root.classList.add('loaded');
        try { sessionStorage.setItem('pr09re55_seen', '1'); } catch(e){}
        setTimeout(function(){ root.classList.remove('is-loading', 'loaded'); }, 700);
      }, Math.max(0, (reduce ? 300 : 1400) - (Date.now() - t0)));
    };
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(hide, hide);
    setTimeout(hide, 4000);
  }

  /* Masthead hairline once the page scrolls */
  var mh = $('#masthead');
  function onScroll(){ mh.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* Mobile drawer */
  var burger = $('.burger'), drawer = $('#drawer');
  if(burger && drawer){
    var setOpen = function(open){
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
      $('main').inert = open; $('.foot').inert = open;
    };
    burger.addEventListener('click', function(){ setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
    $$('a', drawer).forEach(function(a){ a.addEventListener('click', function(){ setOpen(false); }); });
    addEventListener('keydown', function(e){ if(e.key === 'Escape' && !drawer.hidden){ setOpen(false); burger.focus(); } });
    addEventListener('resize', function(){ if(!drawer.hidden && innerWidth > 1100) setOpen(false); });
  }

  /* Images unveil as they enter the page */
  var imgs = $$('.reveal-img');
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -6% 0px'});
    imgs.forEach(function(el){ io.observe(el); });
  } else imgs.forEach(function(el){ el.classList.add('in'); });

  /* Opening hours: highlight today and show open/closed, in Budapest time */
  var table = $('.hours[data-hours]');
  if(table){
    var week = JSON.parse(table.getAttribute('data-hours'));
    var render = function(){
      var o = {};
      new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Budapest', weekday:'short', hour:'2-digit', minute:'2-digit', hourCycle:'h23'})
        .formatToParts(new Date()).forEach(function(x){ o[x.type] = x.value; });
      var day = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(o.weekday), min = (+o.hour) * 60 + (+o.minute);
      $$('tr', table).forEach(function(tr){ tr.classList.toggle('today', +tr.getAttribute('data-day') === day); });
      var open = day > -1 && min >= week[day][0] && min < week[day][1];
      $$('.status').forEach(function(s){
        s.classList.toggle('open', open);
        $('span', s).textContent = open ? s.getAttribute('data-open') : s.getAttribute('data-closed');
      });
    };
    render(); setInterval(render, 60000);
  }

  /* Every new page opens at its top. Inside an embedding page (the preview) the scroll position could
     otherwise carry over from the previous page; back/forward and #anchors keep their usual behaviour. */
  var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  if(!location.hash && (!nav || nav.type === 'navigate') && window.top !== window){
    scrollTo(0, 0); try { document.documentElement.scrollIntoView({block:'start'}); } catch(e){}
  }
  /* The logo always brings you to the top: of this page if it is the home page, otherwise of the home page */
  var logoLink = $('.masthead .logo');
  if(logoLink) logoLink.addEventListener('click', function(e){
    var here = location.href.split('#')[0].replace(/index\.html$/, ''), to = logoLink.href.split('#')[0].replace(/index\.html$/, '');
    if(here !== to) return;
    e.preventDefault();
    scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'});
    try { document.documentElement.scrollIntoView({block:'start', behavior: reduce ? 'auto' : 'smooth'}); } catch(err){}
    if(history.replaceState) history.replaceState(null, '', to);
  });

  /* Google reviews: five at a time, the next five every few seconds (paused while read or hovered) */
  var rv = $('[data-reviews]');
  if(rv){
    var sets = $$('.rq-set', rv), dots = $$('.rq-dots button'), cur = 0, timer = null, held = false;
    var show = function(k){
      cur = (k + sets.length) % sets.length;
      sets.forEach(function(st, i){ if(i === cur) st.removeAttribute('data-off'); else st.setAttribute('data-off', ''); st.inert = i !== cur; });
      dots.forEach(function(d, i){ d.setAttribute('aria-pressed', i === cur ? 'true' : 'false'); });
    };
    var play = function(){ clearInterval(timer); if(!reduce && sets.length > 1) timer = setInterval(function(){ if(!held && !document.hidden) show(cur + 1); }, 7000); };
    if(dots.length){ dots[0].parentNode.hidden = false; }
    dots.forEach(function(d, i){ d.addEventListener('click', function(){ show(i); play(); }); });
    rv.addEventListener('mouseenter', function(){ held = true; });
    rv.addEventListener('mouseleave', function(){ held = false; });
    rv.addEventListener('focusin', function(){ held = true; });
    rv.addEventListener('focusout', function(){ held = false; });
    show(0); play();
  }

  /* Product gallery */
  $$('[data-gallery]').forEach(function(g){
    var main = $('[data-gal-main]', g), btns = $$('[data-gal-src]', g);
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        btns.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        main.classList.add('swap');
        setTimeout(function(){ main.src = b.getAttribute('data-gal-src'); main.onload = function(){ main.classList.remove('swap'); }; }, reduce ? 0 : 300);
      });
    });
  });

  /* Clipboard with a fallback for older browsers */
  function copy(text){
    if(navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function(res, rej){
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy') ? res() : rej(); }catch(e){ rej(e); }
      document.body.removeChild(ta);
    });
  }

  /* Share: native sheet when available, copy link, Instagram (copy then open; nothing is posted for the visitor) */
  $$('[data-share]').forEach(function(box){
    var url = box.getAttribute('data-url'), title = box.getAttribute('data-title'), msg = $('.share-msg', box);
    var say = function(t){ msg.textContent = t; };
    var nat = $('.share-native', box);
    if(navigator.share){
      nat.hidden = false;
      nat.addEventListener('click', function(){ navigator.share({title:title, url:url}).catch(function(){}); });
    }
    $('.share-copy', box).addEventListener('click', function(){
      copy(url).then(function(){ say(box.getAttribute('data-copied')); }, function(){ say(box.getAttribute('data-fail')); });
    });
    $('.share-ig', box).addEventListener('click', function(){
      // start the copy while the page still has focus, then open Instagram in the same gesture
      var done = copy(url);
      window.open('https://www.instagram.com/', '_blank', 'noopener');
      done.then(function(){ say(box.getAttribute('data-ighelp')); }, function(){ say(box.getAttribute('data-fail')); });
    });
  });

  /* Enquiry by Instagram message: the product link goes to the clipboard so it can be pasted */
  $$('[data-enquire]').forEach(function(a){
    a.addEventListener('click', function(){
      var share = $('[data-share]'), msg = share && $('.share-msg', share);
      copy(decodeURIComponent(a.getAttribute('data-enquire'))).then(function(){ if(msg) msg.textContent = a.getAttribute('data-enquire-msg'); }, function(){});
    });
  });

  /* Menu book: the pages become leaves turning on a spine (two pages wide, one on phones) */
  var bookRoot = $('[data-book]');
  if(bookRoot){
    var book = $('[data-pages]', bookRoot), pages = $$('.mpage', book);
    var ctrl = $('.book-ctrl', bookRoot), count = $('.book-count', bookRoot);
    var prevB = $('[data-prev]', bookRoot), nextB = $('[data-next]', bookRoot);
    var tocLinks = $$('[data-goto]', bookRoot), wide = matchMedia('(min-width: 900px)');
    var leaves = [], flips = 0, per = 2, queue = null, word = bookRoot.getAttribute('data-l-page');

    var build = function(){
      per = wide.matches ? 2 : 1;
      leaves = [];
      var frag = document.createDocumentFragment();
      for(var i = 0; i < pages.length; i += per){
        var leaf = document.createElement('div'), front = document.createElement('div'), back = document.createElement('div');
        leaf.className = 'leaf'; front.className = 'face front'; back.className = 'face back';
        front.appendChild(pages[i]);
        if(per === 2 && pages[i + 1]) back.appendChild(pages[i + 1]);
        leaf.appendChild(front); leaf.appendChild(back); frag.appendChild(leaf); leaves.push(leaf);
      }
      book.replaceChildren(frag);
      book.classList.add('is-live');
      book.classList.toggle('single', per === 1);
      ctrl.hidden = false; $('.book-hint', bookRoot).hidden = false;
    };
    // A page never scrolls inside itself: if the longest page needs more room, the whole book grows a little.
    var fit = function(){
      book.style.height = '';
      var base = book.clientHeight, need = 0;
      pages.forEach(function(p){ need = Math.max(need, p.scrollHeight); });
      if(need > base + 1) book.style.height = Math.ceil(need) + 'px';
    };
    var maxFlips = function(){ return per === 2 ? leaves.length : leaves.length - 1; };
    var flipsFor = function(p){ return per === 2 ? Math.ceil(p / 2) : p; };
    var visible = function(){ // indexes of the pages showing for the current flips
      if(per === 1) return [flips];
      return [2 * flips - 1, 2 * flips].filter(function(p){ return p >= 0 && p < pages.length; });
    };
    var paint = function(){
      leaves.forEach(function(leaf, i){
        var on = i < flips;
        leaf.classList.toggle('flipped', on);
        if(!leaf.classList.contains('turning')) leaf.style.zIndex = on ? i + 1 : leaves.length - i;
      });
      var vis = visible();
      pages.forEach(function(p, i){ var show = vis.indexOf(i) > -1; p.inert = !show; p.setAttribute('aria-hidden', show ? 'false' : 'true'); });
      book.classList.toggle('at-start', per === 2 && flips === 0);
      book.classList.toggle('at-end', per === 2 && flips === leaves.length);
      book.classList.toggle('open', per === 2 && flips > 0 && flips < leaves.length);
      prevB.disabled = flips === 0; nextB.disabled = flips >= maxFlips();
      count.textContent = vis.map(function(p){ return p + 1; }).join('–') + ' / ' + pages.length + ' ' + word;
      var cur = vis[vis.length - 1], chapter = -1;
      tocLinks.forEach(function(a, k){ if(+a.getAttribute('data-goto') <= cur) chapter = k; });
      tocLinks.forEach(function(a, k){ a.setAttribute('aria-current', k === chapter ? 'true' : 'false'); });
    };
    var turn = function(dir){ // one leaf, with its own z-order while it moves
      var i = dir > 0 ? flips : flips - 1, leaf = leaves[i];
      if(!leaf) return;
      leaf.classList.add('turning'); leaf.style.zIndex = leaves.length + 1;
      flips += dir; paint();
      clearTimeout(leaf._t);
      leaf._t = setTimeout(function(){ leaf.classList.remove('turning'); paint(); }, reduce ? 0 : 900);
    };
    var goTo = function(target){ // several leaves turn one after another
      target = Math.max(0, Math.min(maxFlips(), target));
      clearInterval(queue);
      var step = function(){ if(flips === target){ clearInterval(queue); return; } turn(target > flips ? 1 : -1); };
      step(); queue = setInterval(step, reduce ? 0 : 140);
    };
    // After turning from the bottom of a long page, bring the top of the new page back into view.
    var toTop = function(){
      var top = book.getBoundingClientRect().top, mhH = mh.offsetHeight;
      if(top < mhH) scrollTo({top: scrollY + top - mhH - 16, behavior: reduce ? 'auto' : 'smooth'});
    };
    var setHash = function(){ toTop(); var p = pages[visible().slice(-1)[0]]; if(p && history.replaceState) history.replaceState(null, '', '#' + p.id); };

    build(); fit();
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    var lastW = innerWidth;
    addEventListener('resize', function(){ if(innerWidth !== lastW){ lastW = innerWidth; fit(); } });
    var start = location.hash && document.getElementById(location.hash.slice(1));
    flips = start && pages.indexOf(start) > -1 ? flipsFor(pages.indexOf(start)) : 0;
    paint();
    if(start) setTimeout(function(){ bookRoot.scrollIntoView({block:'start'}); }, 0);

    nextB.addEventListener('click', function(){ goTo(flips + 1); setHash(); });
    prevB.addEventListener('click', function(){ goTo(flips - 1); setHash(); });
    tocLinks.forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault(); goTo(flipsFor(+a.getAttribute('data-goto')));
        if(history.replaceState) history.replaceState(null, '', a.getAttribute('href'));
      });
    });
    // Click the right-hand page to go forward, the left-hand page to go back; swipe on touch screens.
    var x0 = null, y0 = 0;
    book.addEventListener('pointerdown', function(e){ x0 = e.clientX; y0 = e.clientY; });
    book.addEventListener('click', function(e){ if(e.target.closest('[data-close-book]')){ goTo(0); setHash(); } });
    book.addEventListener('pointerup', function(e){
      if(x0 === null) return;
      if(e.target.closest('[data-close-book]')){ x0 = null; return; }
      var dx = e.clientX - x0, dy = e.clientY - y0, r = book.getBoundingClientRect(); x0 = null;
      if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { goTo(flips + (dx < 0 ? 1 : -1)); setHash(); return; }
      if(Math.abs(dx) > 6 || Math.abs(dy) > 6 || getSelection().toString()) return;
      var mid = r.left + r.width / 2;
      if(per === 1) { if(e.clientX > r.left + r.width * .72) goTo(flips + 1); else if(e.clientX < r.left + r.width * .18) goTo(flips - 1); else return; }
      else goTo(flips + (e.clientX >= mid ? 1 : -1));
      setHash();
    });
    addEventListener('keydown', function(e){
      if(e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName)) return;
      if(e.key === 'ArrowRight') { goTo(flips + 1); setHash(); }
      else if(e.key === 'ArrowLeft') { goTo(flips - 1); setHash(); }
    });
    var onMode = function(){ // keep the same page in view when the layout switches between one and two pages
      var cur = visible().slice(-1)[0] || 0;
      build(); fit(); flips = flipsFor(cur); paint();
    };
    if(wide.addEventListener) wide.addEventListener('change', onMode); else wide.addListener(onMode);
  }

  /* Reserve online, collect and pay in the shop. The bag lives only in this browser (slug -> quantity);
     nothing is paid online and nothing is presented as confirmed until the shop replies. */
  var BAG_KEY = 'pr09re55_bag';
  var readBag = function(){
    try { var b = JSON.parse(localStorage.getItem(BAG_KEY) || '{}'); return b && typeof b === 'object' ? b : {}; } catch(e){ return {}; }
  };
  var saveBag = function(b){ try { localStorage.setItem(BAG_KEY, JSON.stringify(b)); return true; } catch(e){ return false; } };
  var bagCount = function(b){ var n = 0; for(var k in b) n += b[k] | 0; return n; };
  var paintCount = function(){
    var n = bagCount(readBag());
    $$('[data-cart-count]').forEach(function(el){ el.textContent = n; el.hidden = !n; });
  };
  paintCount();
  addEventListener('storage', function(e){ if(e.key === BAG_KEY) paintCount(); });

  $$('[data-reserve]').forEach(function(box){
    var btn = $('[data-add]', box), msg = $('.reserve-msg > span', box), slug = box.getAttribute('data-reserve');
    if(!btn) return;
    btn.hidden = false;
    btn.addEventListener('click', function(){
      var b = readBag(); b[slug] = Math.min(9, (b[slug] | 0) + 1);
      if(!saveBag(b)) return; // storage blocked: the phone and Instagram buttons stay available
      paintCount(); if(msg) msg.hidden = false;
    });
  });

  var cart = $('[data-cart]');
  if(cart){
    var catalog = {}, cfg = {s:{}};
    try { catalog = JSON.parse($('[data-catalog]', cart).textContent); cfg = JSON.parse($('[data-cart-cfg]', cart).textContent); } catch(e){}
    var S = cfg.s, list = $('[data-cart-list]', cart), form = $('[data-cart-form]', cart), cmsg = $('[data-cart-msg]', cart), clearBtn = $('[data-cart-clear]', cart);
    var money = function(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, cfg.lang === 'hu' ? ' ' : ',') + ' Ft'; };
    var el = function(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; };
    var items = function(){ // only products that are still in the catalogue
      var b = readBag(), out = [];
      for(var k in b) if(catalog[k] && (b[k] | 0) > 0) out.push({slug:k, qty:Math.min(9, b[k] | 0), p:catalog[k]});
      return out;
    };
    var setQty = function(slug, q){ var b = readBag(); if(q > 0) b[slug] = Math.min(9, q); else delete b[slug]; saveBag(b); render(); paintCount(); };
    var render = function(){
      var its = items(), total = 0, onReq = 0;
      $('[data-cart-empty]', cart).hidden = !!its.length;
      $('[data-cart-full]', cart).hidden = !its.length;
      list.replaceChildren();
      its.forEach(function(it){
        var li = el('li'), img = el('img'); img.src = it.p.img; img.alt = ''; img.loading = 'lazy'; img.width = 96; img.height = 120;
        var info = el('div'), a = el('a', 'ci-name', it.p.name); a.href = it.p.url;
        info.append(el('p', 'ci-brand', it.p.brand), a, el('p', 'ci-price', it.p.price ? money(it.p.price) : S.onRequest));
        var qty = el('div', 'ci-qty'), less = el('button', '', '−'), more = el('button', '', '+'), out = el('output', '', it.qty);
        less.type = more.type = 'button'; less.setAttribute('aria-label', S.less + ': ' + it.p.name); more.setAttribute('aria-label', S.more + ': ' + it.p.name);
        out.setAttribute('aria-label', S.qty); more.disabled = it.qty >= 9;
        less.addEventListener('click', function(){ setQty(it.slug, it.qty - 1); });
        more.addEventListener('click', function(){ setQty(it.slug, it.qty + 1); });
        qty.append(less, out, more);
        var rm = el('button', 'ci-remove', S.remove); rm.type = 'button';
        rm.addEventListener('click', function(){ setQty(it.slug, 0); });
        li.append(img, info, qty, rm); list.append(li);
        if(it.p.price) total += it.p.price * it.qty; else onReq += it.qty;
      });
      $('[data-cart-total]', cart).textContent = total ? money(total) : (onReq ? S.onRequest : money(0));
      $('[data-cart-req]', cart).textContent = total && onReq ? (onReq === 1 ? S.onReqN[0] : S.onReqN[1].replace('{n}', onReq)) : '';
    };
    render();
    addEventListener('storage', function(e){ if(e.key === BAG_KEY) render(); });

    var say = function(text, err){ cmsg.textContent = text; cmsg.classList.toggle('err', !!err); };
    var orderText = function(f){
      var lines = [S.head, ''];
      items().forEach(function(it){ lines.push(it.qty + '× ' + it.p.brand + ' ' + it.p.name + ' (' + (it.p.price ? money(it.p.price) : S.onRequest) + ') – ' + it.p.abs); });
      lines.push('');
      lines.push(S.name + ': ' + f.name.value.trim());
      lines.push(S.phone + ': ' + f.phone.value.trim());
      if(f.email.value.trim()) lines.push(S.email + ': ' + f.email.value.trim());
      if(f.date.value) lines.push(S.date + ': ' + f.date.value);
      if(f.note.value.trim()) lines.push(S.note + ': ' + f.note.value.trim());
      lines.push('', S.pay);
      return lines.join('\n');
    };
    if(form){
      var dateIn = form.date, d = new Date();
      if(dateIn) dateIn.min = new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var bad = [form.name, form.phone].filter(function(i){ var v = !i.value.trim(); i.setAttribute('aria-invalid', v ? 'true' : 'false'); return v; });
        if(form.email.value.trim() && !form.email.checkValidity()) { bad.push(form.email); form.email.setAttribute('aria-invalid', 'true'); }
        if(!form.consent.checked) bad.push(form.consent);
        if(bad.length){ say(S.required, true); bad[0].focus(); return; }
        if(!items().length) { render(); return; }
        var text = orderText(form), submit = $('[type=submit]', form);
        if(cfg.endpoint){
          submit.disabled = true; say(S.sending);
          fetch(cfg.endpoint, {method:'POST', headers:{'Content-Type':'application/json', 'Accept':'application/json'},
            body: JSON.stringify({_subject: S.head, name: form.name.value.trim(), phone: form.phone.value.trim(), email: form.email.value.trim(), message: text})})
            .then(function(r){ if(!r.ok) throw new Error(r.status); return r.json().catch(function(){ return {}; }); })
            .then(function(j){
              if(j && (j.success === false || j.success === 'false')) throw new Error('rejected');
              saveBag({}); paintCount(); form.reset(); say(S.formOk);
              $('[data-cart-full]', cart).hidden = true; cart.insertBefore(cmsg, cart.firstChild.nextSibling);
            })
            .catch(function(){ say(S.formFail, true); })
            .then(function(){ submit.disabled = false; });
        } else if(cfg.wa){
          window.open('https://wa.me/' + cfg.wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
          say(S.waReady); if(clearBtn) clearBtn.hidden = false;
        }
      });
      if(clearBtn) clearBtn.addEventListener('click', function(){ saveBag({}); paintCount(); form.reset(); say(''); clearBtn.hidden = true; render(); });
    }
  }
})();
