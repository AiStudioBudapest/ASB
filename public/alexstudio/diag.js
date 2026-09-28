/* AiStudioBudapest — diagnostic panel. Loaded ONLY when the page is opened with ?diag=1 (see the first <script> in the
   <head> of index.html); normal visitors never download or run this file.
   It measures the visitor's own browser — GPU, connection, load timeline, frame rate, freezes, third-party reachability —
   and shows the result in a panel with a "Copy report" button. Nothing is sent anywhere by this script: the report only
   leaves the device if the visitor copies it. The only network requests it makes are the optional speed / reachability
   tests below (own origin + fonts.googleapis.com, fonts.gstatic.com and images.unsplash.com, which the demo iframes
   already contact anyway). */
(function(){
'use strict';
try{
var VERSION = 'diag v1';
var Q = window.__diagQ || (window.__diagQ = []);
var now = function(){ return performance.now(); };
function mark(k, v){ Q.push([now(), k, v == null ? '' : String(v)]); }
function sec(ms){ return (ms / 1000).toFixed(2) + ' s'; }
function pad(s, n){ s = String(s); while(s.length < n) s += ' '; return s; }
function median(a){ a = a.filter(function(x){ return x >= 0; }).sort(function(x, y){ return x - y; }); return a.length ? a[Math.floor(a.length / 2)] : -1; }
function esc(s){ return String(s).replace(/[&<>]/g, function(c){ return c === '&' ? '&amp;' : (c === '<' ? '&lt;' : '&gt;'); }); }

/* ---------- static environment ---------- */
var env = {};
(function(){
  var c = navigator.connection || {};
  env.ua = navigator.userAgent;
  env.platform = navigator.platform || '';
  env.lang = (navigator.languages || [navigator.language]).slice(0, 3).join(',');
  env.screen = screen.width + 'x' + screen.height;
  env.dpr = window.devicePixelRatio || 1;
  env.cores = navigator.hardwareConcurrency || '?';
  env.mem = navigator.deviceMemory || '?';
  env.conn = c.effectiveType ? (c.effectiveType + ', downlink ' + c.downlink + ' Mbps, rtt ' + c.rtt + ' ms, saveData ' + (c.saveData ? 'YES' : 'no')) : 'n/a (browser does not expose it)';
  env.saveData = !!c.saveData;
  env.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  env.coarse = matchMedia('(pointer:coarse)').matches;
  /* does the browser give us a real GPU? failIfMajorPerformanceCaveat makes getContext fail on software rendering */
  var cv = document.createElement('canvas'), gl = null, gl2 = false, hw = null, gpu = '', max = 0;
  try{ gl = cv.getContext('webgl2', {failIfMajorPerformanceCaveat: true}); if(gl) gl2 = true; else gl = cv.getContext('webgl', {failIfMajorPerformanceCaveat: true}); hw = !!gl; }catch(e){}
  if(!gl){ try{ var c2 = document.createElement('canvas'); gl = c2.getContext('webgl2') || c2.getContext('webgl'); gl2 = !!(gl && gl.getParameter && typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext); }catch(e){} }
  if(gl){
    try{
      var d = gl.getExtension('WEBGL_debug_renderer_info');
      gpu = d ? gl.getParameter(d.UNMASKED_VENDOR_WEBGL) + ' / ' + gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) + ' (masked)';
      max = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      var lose = gl.getExtension('WEBGL_lose_context'); if(lose) lose.loseContext();
    }catch(e){}
  }
  env.webgl = gl ? (gl2 ? 'WebGL2' : 'WebGL1') : 'NONE';
  env.hw = hw; env.gpu = gpu; env.maxTex = max;
  env.software = /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic|mesa offscreen/i.test(gpu);
})();
try{ if(navigator.getBattery) navigator.getBattery().then(function(b){ env.battery = Math.round(b.level * 100) + '% ' + (b.charging ? 'charging' : 'on battery'); }); }catch(e){}

/* ---------- long tasks (freezes) + paint timings — Chromium only ---------- */
var longTasks = [], lcp = 0, ltSupported = false;
try{
  var po = new PerformanceObserver(function(l){ l.getEntries().forEach(function(e){ longTasks.push({t: e.startTime, d: e.duration}); }); });
  po.observe({type: 'longtask', buffered: true}); ltSupported = true;
}catch(e){}
try{
  var po2 = new PerformanceObserver(function(l){ var es = l.getEntries(); if(es.length) lcp = es[es.length - 1].startTime; });
  po2.observe({type: 'largest-contentful-paint', buffered: true});
}catch(e){}

/* ---------- frame rate ---------- */
var frames = [], hiddenMs = 0, hiddenAt = 0, rafOn = false;
function rafLoop(t){
  frames.push(t);
  while(frames.length && t - frames[0] > 5000) frames.shift();
  if(!document.hidden) requestAnimationFrame(rafLoop); else rafOn = false;
}
function rafStart(){ if(!rafOn && !document.hidden){ rafOn = true; frames.length = 0; requestAnimationFrame(rafLoop); } }
document.addEventListener('visibilitychange', function(){
  if(document.hidden){ hiddenAt = now(); mark('tab-hidden'); }
  else { if(hiddenAt) hiddenMs += now() - hiddenAt; hiddenAt = 0; mark('tab-visible'); rafStart(); }
});
function fpsNow(){
  if(frames.length < 8) return null;
  var w = 0, slow = 0, i;
  for(i = 1; i < frames.length; i++){ var d = frames[i] - frames[i - 1]; if(d > w) w = d; if(d > 50) slow++; }
  return {fps: (frames.length - 1) * 1000 / (frames[frames.length - 1] - frames[0]), worst: w, slow: slow};
}

/* ---------- iframes (the three demos) ---------- */
var iframeLoads = {};
function watchIframes(){
  [].forEach.call(document.querySelectorAll('iframe'), function(f){
    if(f.__diag) return; f.__diag = true;
    var name = function(){ return (f.getAttribute('src') || '').replace(/^\/|\/?(index\.html)?(\?.*)?$/g, '') || '?'; };
    f.addEventListener('load', function(){ if(f.getAttribute('src')){ iframeLoads[name()] = now(); mark('iframe-loaded', name()); } });
    try{ new MutationObserver(function(){ if(f.getAttribute('src') && !f.__set){ f.__set = true; mark('iframe-src-set', name()); } }).observe(f, {attributes: true, attributeFilter: ['src']}); }catch(e){}
    if(f.getAttribute('src')){ f.__set = true; mark('iframe-src-set', name()); }
  });
}

/* ---------- network tests (run once the scene is up or has given up; also on demand) ---------- */
var net = {state: 'waiting', rtt: null, mbps: null, bytes: 0, tp: {}};
function probe(url){
  var t = now(), ctl = window.AbortController ? new AbortController() : null;
  var to = setTimeout(function(){ if(ctl) ctl.abort(); }, 8000);
  return fetch(url, {mode: 'no-cors', cache: 'no-store', signal: ctl ? ctl.signal : undefined}).then(function(){ return {ok: true, ms: Math.round(now() - t)}; })
    .catch(function(e){ return {ok: false, ms: Math.round(now() - t), err: (e && e.name) || 'error'}; })
    .then(function(r){ clearTimeout(to); return r; });
}
function runNet(){
  if(net.state === 'running') return;
  net = {state: 'running', rtt: null, mbps: null, bytes: 0, tp: {}};
  var rtts = [], tag = Date.now();
  function ping(i){
    var t = now();
    return fetch('/robots.txt?diag=' + tag + i, {cache: 'no-store'}).then(function(r){ return r.text(); }).then(function(){ rtts.push(now() - t); }).catch(function(){ rtts.push(-1); });
  }
  ping(1).then(function(){ return ping(2); }).then(function(){ return ping(3); }).then(function(){
    net.rtt = median(rtts);
    var t = now();
    return fetch('/alexstudio/tex/stone_c.jpg?diag=' + tag, {cache: 'no-store'}).then(function(r){ return r.arrayBuffer(); }).then(function(b){
      net.bytes = b.byteLength; net.mbps = b.byteLength * 8 / 1e6 / Math.max(.001, (now() - t) / 1000);
    }).catch(function(){ net.mbps = -1; });
  }).then(function(){
    return Promise.all([
      probe('https://fonts.googleapis.com/css2?family=Inter:wght@400'),
      probe('https://fonts.gstatic.com/'),
      probe('https://images.unsplash.com/photo-1583354608715-177553a4035e?q=40&w=64&auto=format&fit=crop') /* one of the Prémium demo's own images, tiny */
    ]);
  }).then(function(r){
    net.tp = {'fonts.googleapis.com': r[0], 'fonts.gstatic.com': r[1], 'images.unsplash.com': r[2]};
    net.state = 'done'; mark('network-test', 'done');
  }).catch(function(){ net.state = 'error'; });
}

/* ---------- scroll test: scrolls the whole page in ~24 s and records the frame rate per stretch ---------- */
var st = null, SECTIONS = ['hero', 'showcase', 'pricing', 'services', 'about+tour', 'faq', 'contact'];
function state(){ try{ return window.aisDiagState ? window.aisDiagState() : null; }catch(e){ return null; } }
function scrollTest(){
  if(st && st.running) return;
  var root = document.documentElement, max = root.scrollHeight - innerHeight;
  if(max < 100 || document.hidden) return;
  var N = 12, b = [], i;
  for(i = 0; i < N; i++) b.push({n: 0, sum: 0, max: 0, slow: 0, prog: null, interior: false});
  st = {running: true, buckets: b, done: false, note: ''};
  var prevSB = root.style.scrollBehavior; root.style.scrollBehavior = 'auto';
  var dur = 24000, t0 = null, last = 0;
  mark('scroll-test-start');
  window.scrollTo(0, 0);
  function finish(note){
    root.style.scrollBehavior = prevSB; st.running = false; st.done = true; st.note = note || '';
    mark('scroll-test-end', note || 'ok');
  }
  function step(t){
    if(document.hidden){ finish('interrupted (tab hidden)'); return; }
    if(t0 === null){ t0 = t; last = t; requestAnimationFrame(step); return; }
    var f = Math.min(1, (t - t0) / dur), dt = t - last; last = t;
    var k = Math.min(N - 1, Math.floor(f * N)), bk = b[k];
    bk.n++; bk.sum += dt; if(dt > bk.max) bk.max = dt; if(dt > 50) bk.slow++;
    var s = state(); if(s && s.info){ bk.prog = s.info.prog; bk.interior = !!s.info.interior; }
    window.scrollTo(0, Math.round(f * max));
    if(f >= 1){ finish(); return; }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- report ---------- */
function build(){
  var out = [], verdict = [], s = state() || {}, t = now(), fp = fpsNow();
  var nav = performance.getEntriesByType('navigation')[0] || {};
  var paints = performance.getEntriesByType('paint'), fcp = 0;
  paints.forEach(function(p){ if(p.name === 'first-contentful-paint') fcp = p.startTime; });
  var marks = {};
  Q.forEach(function(e){ if(marks[e[1]] === undefined) marks[e[1]] = e[0]; });

  /* ---- verdict ---- */
  var V = function(l, x){ verdict.push({l: l, x: x}); };
  if(env.webgl === 'NONE') V('bad', 'Pas de WebGL du tout : la 3D est impossible sur cet appareil/navigateur → PHOTO de repli (problème de MACHINE ou de navigateur).');
  else if(env.hw === false || env.software) V('bad', 'Rendu LOGICIEL (pas d\'accélération graphique) : la 3D sera très lente ou en repli → problème de MACHINE / pilote / navigateur, pas de réseau.');
  if(s.p3d && s.tier === 0) V('warn', 'La scène tourne au niveau de qualité MINIMAL (tier 0) : GPU trop faible pour le mode complet.');
  if(marks['fallback-trigger'] !== undefined){
    var fb = Q.filter(function(e){ return e[1] === 'fallback-trigger'; })[0];
    V('bad', 'Repli sur la photo à ' + sec(fb[0]) + ' : ' + fb[2]);
  }
  if(env.saveData) V('warn', 'Mode « économie de données » actif dans le navigateur : la 3D est volontairement désactivée.');
  if(env.reduced) V('warn', '« Réduire les animations » est actif dans le système : la 3D est volontairement désactivée.');
  if(marks['scene-ready'] !== undefined){
    if(marks['scene-ready'] > 12000) V('warn', 'Scène 3D prête seulement après ' + sec(marks['scene-ready']) + ' (chargement LENT — voir « réseau » et « gels » plus bas pour départager).');
  } else if(!s.fellBack && env.webgl !== 'NONE' && !env.saveData && !env.reduced && t > 15000) V('warn', 'La scène 3D n\'est toujours pas prête après ' + sec(t) + '.');
  if(net.state === 'done'){
    if(net.mbps > 0 && net.mbps < 3) V('warn', 'Connexion LENTE : ' + net.mbps.toFixed(1) + ' Mbit/s mesurés (le site pèse ~4–5 Mo au premier chargement).');
    if(net.rtt > 250) V('warn', 'Latence élevée : ' + Math.round(net.rtt) + ' ms vers le site.');
    Object.keys(net.tp).forEach(function(h){
      var r = net.tp[h];
      if(!r.ok) V('warn', h + ' INJOIGNABLE (' + r.err + ' après ' + sec(r.ms) + ') : les démos de la vitrine peuvent rester vides.');
      else if(r.ms > 3000) V('warn', h + ' très lent (' + sec(r.ms) + ') : les démos de la vitrine peuvent s\'afficher tard.');
    });
  }
  var bigLT = longTasks.filter(function(x){ return x.d >= 200; }), maxLT = 0, totLT = 0;
  longTasks.forEach(function(x){ if(x.d > maxLT) maxLT = x.d; totLT += x.d; });
  if(maxLT >= 800) V('warn', 'Gels du navigateur : ' + bigLT.length + ' tâche(s) ≥ 200 ms, la pire dure ' + Math.round(maxLT) + ' ms (processeur ou GPU trop lents pour la scène).');
  if(fp && fp.fps < 20 && !document.hidden) V('warn', 'Fluidité faible : ' + fp.fps.toFixed(0) + ' images/s (page). Défilez pendant quelques secondes pour une mesure représentative.');
  var lost = Q.filter(function(e){ return e[1] === 'ctx-lost'; }).length;
  if(lost) V('warn', 'Contexte WebGL perdu ' + lost + ' fois (GPU réinitialisé ou onglet en arrière-plan).');
  var errs = Q.filter(function(e){ return e[1] === 'error' || e[1] === 'rejection' || e[1] === 'resource-error'; });
  if(errs.length) V('warn', errs.length + ' erreur(s) JavaScript / ressource : voir la section ERREURS.');
  if(st && st.done){
    var worst = null;
    st.buckets.forEach(function(bk, i){ if(bk.n > 5){ var fps = bk.n * 1000 / bk.sum; if(!worst || fps < worst.fps) worst = {fps: fps, i: i, bk: bk}; } });
    if(worst && worst.fps < 24) V('warn', 'Saccades au défilement : ' + worst.fps.toFixed(0) + ' images/s vers ' + Math.round(worst.i * 100 / st.buckets.length) + '–' + Math.round((worst.i + 1) * 100 / st.buckets.length) + ' % de la page.');
  }
  if(!verdict.length) V('ok', 'Rien d\'anormal détecté pour l\'instant' + (st && st.done ? '.' : ' (lancez le test de défilement pour aller plus loin).'));

  /* ---- details ---- */
  out.push('== ENVIRONNEMENT');
  out.push('date        ' + new Date().toISOString());
  out.push('page        ' + location.origin + location.pathname + location.search);
  out.push('navigateur  ' + env.ua);
  out.push('système     ' + env.platform + '  |  langues ' + env.lang);
  out.push('écran       ' + env.screen + '  ×' + env.dpr + '  | fenêtre ' + innerWidth + 'x' + innerHeight + (env.coarse ? '  | tactile' : ''));
  out.push('processeur  ' + env.cores + ' cœurs  |  mémoire ' + env.mem + ' Go' + (env.battery ? '  |  batterie ' + env.battery : '') + (performance.memory ? '  |  JS heap ' + Math.round(performance.memory.usedJSHeapSize / 1048576) + ' Mo' : ''));
  out.push('connexion   ' + env.conn);
  out.push('');
  out.push('== GPU');
  out.push('WebGL       ' + env.webgl + '  |  accélération matérielle: ' + (env.hw === null ? '?' : (env.hw ? 'oui' : 'NON (logiciel)')) + '  |  texture max ' + (env.maxTex || '?'));
  out.push('carte       ' + (env.gpu || '?'));
  if(s.gpu && s.gpu !== env.gpu) out.push('carte scène ' + s.gpu);
  out.push('scène 3D    mode ' + (s.mode || '?') + '  |  qualité tier ' + (s.tier == null ? '?' : s.tier + '/2') + '  |  échelle ' + (s.cap != null ? s.cap : '?') + '  |  canevas ' + (s.size || '?') + '  |  textures ' + (s.tex != null ? s.tex : '?') + '  géométries ' + (s.geo != null ? s.geo : '?'));
  out.push('');
  out.push('== CHARGEMENT (secondes depuis le début de la navigation)');
  out.push('réponse HTML ' + (nav.responseStart ? sec(nav.responseStart) : '?') + '  |  1er affichage ' + (fcp ? sec(fcp) : '?') + '  |  plus grand élément ' + (lcp ? sec(lcp) : '?') + '  |  DOM prêt ' + (nav.domContentLoadedEventEnd ? sec(nav.domContentLoadedEventEnd) : '?') + '  |  load ' + (nav.loadEventEnd ? sec(nav.loadEventEnd) : '…'));
  Q.forEach(function(e){
    if(/^(error|rejection|resource-error|console-error|console-warn)$/.test(e[1])) return;
    out.push('  ' + pad(sec(e[0]), 9) + pad(e[1], 20) + e[2]);
  });
  out.push('');
  out.push('== EN DIRECT');
  out.push('images/s (5 dernières s)  ' + (fp ? fp.fps.toFixed(0) + '  |  pire image ' + Math.round(fp.worst) + ' ms  |  images > 50 ms: ' + fp.slow : (document.hidden ? 'onglet caché' : 'mesure en cours…')) + '   (au repos la scène tourne à ~30 volontairement)');
  out.push('scène  apparition ' + (s.appear != null ? s.appear : '?') + '  |  repli photo ' + (s.fellBack ? 'OUI' : 'non') + '  |  contexte perdu ' + (s.lost ? 'OUI' : 'non') + '  |  onglet caché cumulé ' + sec(hiddenMs + (hiddenAt ? now() - hiddenAt : 0)));
  if(ltSupported){
    var top = longTasks.slice().sort(function(a, b){ return b.d - a.d; }).slice(0, 3).map(function(x){ return Math.round(x.d) + ' ms @' + sec(x.t); }).join(', ');
    out.push('gels (tâches longues)  ' + longTasks.length + ' au total, cumul ' + Math.round(totLT) + ' ms' + (top ? '  |  pires: ' + top : ''));
  } else out.push('gels (tâches longues)  non mesurables sur ce navigateur');
  out.push('');
  out.push('== RÉSEAU');
  var res = performance.getEntriesByType('resource'), enc = 0, xfer = 0, cached = 0;
  res.forEach(function(r){ enc += r.encodedBodySize || 0; xfer += r.transferSize || 0; if(r.transferSize > 0 && r.transferSize < (r.encodedBodySize || 0) * .2) cached++; else if(r.transferSize === 0 && r.encodedBodySize > 0) cached++; });
  out.push('page principale  ' + res.length + ' requêtes  |  ' + (enc / 1048576).toFixed(2) + ' Mo de contenu  |  ' + (xfer / 1048576).toFixed(2) + ' Mo réellement téléchargés  |  ' + cached + ' servies par le cache');
  var slow = res.slice().sort(function(a, b){ return b.duration - a.duration; }).slice(0, 4).map(function(r){ return r.name.replace(location.origin, '').replace(/\?.*/, '') + ' ' + Math.round(r.duration) + ' ms'; });
  out.push('plus lentes  ' + slow.join('  |  '));
  if(net.state === 'waiting') out.push('tests réseau  en attente de la fin du chargement de la scène (ou bouton « Test réseau »)');
  else if(net.state === 'running') out.push('tests réseau  en cours…');
  else if(net.state === 'error') out.push('tests réseau  erreur');
  else {
    out.push('latence vers le site  ' + (net.rtt >= 0 ? Math.round(net.rtt) + ' ms (médiane de 3)' : 'échec') + '  |  débit  ' + (net.mbps > 0 ? net.mbps.toFixed(1) + ' Mbit/s (' + Math.round(net.bytes / 1024) + ' Ko)' : 'échec'));
    Object.keys(net.tp).forEach(function(h){ var r = net.tp[h]; out.push('  tiers ' + pad(h, 22) + (r.ok ? 'ok ' + r.ms + ' ms' : 'ÉCHEC (' + r.err + ') après ' + r.ms + ' ms')); });
  }
  var ifr = Object.keys(iframeLoads).map(function(k){ return k + ' @' + sec(iframeLoads[k]); });
  out.push('démos (iframes)  ' + (ifr.length ? ifr.join('  |  ') : 'aucune chargée pour l\'instant'));
  if(st){
    out.push('');
    out.push('== TEST DE DÉFILEMENT' + (st.running ? ' (en cours…)' : (st.done ? ' (terminé' + (st.note ? ' — ' + st.note : '') + ')' : '')));
    st.buckets.forEach(function(bk, i){
      if(!bk.n){ return; }
      var fps = bk.n * 1000 / bk.sum, z = bk.prog == null ? '' : (bk.interior ? 'intérieur' : SECTIONS[Math.min(6, Math.floor(bk.prog))]);
      out.push('  ' + pad(Math.round(i * 100 / st.buckets.length) + '–' + Math.round((i + 1) * 100 / st.buckets.length) + '%', 9) + pad(z, 12) + pad(fps.toFixed(0) + ' img/s', 10) + 'pire ' + Math.round(bk.max) + ' ms   >50 ms: ' + bk.slow);
    });
  }
  var problems = Q.filter(function(e){ return /^(error|rejection|resource-error|console-error|console-warn)$/.test(e[1]); });
  out.push('');
  out.push('== ERREURS / AVERTISSEMENTS (' + problems.length + ')');
  if(!problems.length) out.push('  aucun');
  problems.slice(0, 40).forEach(function(e){ out.push('  ' + pad(sec(e[0]), 9) + pad(e[1], 15) + String(e[2]).slice(0, 220)); });
  return {verdict: verdict, text: out.join('\n')};
}

/* ---------- panel ---------- */
var panel, elVerdict, elBody, minimized = false, lastReport = '';
function mount(){
  var css = document.createElement('style');
  css.textContent =
    '#aisDiag{position:fixed;top:8px;left:8px;z-index:2147483647;width:min(560px,calc(100vw - 16px));max-height:calc(100vh - 16px);overflow:auto;background:rgba(4,6,12,.95);color:#d7e2ee;' +
    'font:11px/1.45 ui-monospace,SFMono-Regular,Consolas,Menlo,monospace;border:1px solid rgba(127,233,222,.6);border-radius:10px;padding:10px;box-shadow:0 8px 40px rgba(0,0,0,.6);-webkit-text-size-adjust:none;text-align:left;letter-spacing:0;text-transform:none}' +
    '#aisDiag,#aisDiag *{cursor:auto !important;box-sizing:border-box}#aisDiag button{cursor:pointer !important}' +
    '#aisDiag .dh{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}#aisDiag .dt{flex:1 1 100%;color:#7fe9de;font-weight:700;font-size:12px}' +
    '#aisDiag button{font:inherit;color:#07080a;background:#7fe9de;border:0;border-radius:6px;padding:8px 10px;min-height:36px;font-weight:700}#aisDiag button.sec{background:#26313d;color:#d7e2ee}' +
    '#aisDiag .hint{color:#9fb0c2;margin:0 0 8px}#aisDiag .v{margin:0 0 4px;padding:6px 8px;border-radius:6px;background:#1a222c;border-left:3px solid #7fe9de;white-space:normal}' +
    '#aisDiag .v.warn{border-left-color:#ffb454}#aisDiag .v.bad{border-left-color:#ff5f6d}#aisDiag .v.ok{border-left-color:#5fe08a}' +
    '#aisDiag pre{margin:8px 0 0;white-space:pre-wrap;word-break:break-word;font:inherit;color:#c3d0dd}#aisDiag.min pre,#aisDiag.min .hint,#aisDiag.min .vs{display:none}';
  document.head.appendChild(css);
  panel = document.createElement('div'); panel.id = 'aisDiag'; panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', 'Diagnostic');
  panel.innerHTML =
    '<div class="dh"><div class="dt">AiStudioBudapest — diagnostic (' + VERSION + ')</div>' +
    '<button type="button" id="aisDiagCopy">Copier le rapport / Copy report</button>' +
    '<button type="button" class="sec" id="aisDiagScroll">▶ Test de défilement (24 s)</button>' +
    '<button type="button" class="sec" id="aisDiagNet">Test réseau</button>' +
    '<button type="button" class="sec" id="aisDiagMin">Réduire / Hide</button></div>' +
    '<p class="hint">1) Attendez la fin du chargement · 2) « Test de défilement » (ne touchez à rien 24 s) · 3) « Copier le rapport » et collez-le dans un message (ou faites une capture d\'écran). Aucune donnée n\'est envoyée automatiquement.</p>' +
    '<div class="vs" id="aisDiagV"></div><pre id="aisDiagBody"></pre>';
  document.body.appendChild(panel);
  elVerdict = panel.querySelector('#aisDiagV'); elBody = panel.querySelector('#aisDiagBody');
  panel.querySelector('#aisDiagScroll').addEventListener('click', scrollTest);
  panel.querySelector('#aisDiagNet').addEventListener('click', runNet);
  panel.querySelector('#aisDiagMin').addEventListener('click', function(){ minimized = !minimized; panel.classList.toggle('min', minimized); this.textContent = minimized ? 'Afficher / Show' : 'Réduire / Hide'; });
  var copyBtn = panel.querySelector('#aisDiagCopy');
  copyBtn.addEventListener('click', function(){
    var txt = lastReport, done = function(ok){ copyBtn.textContent = ok ? 'Copié ✓ / Copied ✓' : 'Sélectionnez le texte à la main'; setTimeout(function(){ copyBtn.textContent = 'Copier le rapport / Copy report'; }, 2500); };
    var fallback = function(){
      try{ var ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.appendChild(ta); ta.select(); var ok = document.execCommand('copy'); document.body.removeChild(ta); done(ok); }catch(e){ done(false); }
    };
    try{ if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ done(true); }, fallback); else fallback(); }catch(e){ fallback(); }
  });
}
function render(){
  if(!panel) return;
  var r = build();
  lastReport = 'VERDICT\n' + r.verdict.map(function(v){ return ' - [' + v.l.toUpperCase() + '] ' + v.x; }).join('\n') + '\n\n' + r.text;
  elVerdict.innerHTML = r.verdict.map(function(v){ return '<div class="v ' + v.l + '">' + esc(v.x) + '</div>'; }).join('');
  elBody.textContent = r.text;
}

function start(){
  mount(); watchIframes(); rafStart(); render();
  setInterval(render, 1000);
  /* network tests: once the scene is up (or the photo took over), otherwise after 25 s */
  var t25 = setTimeout(function(){ if(net.state === 'waiting') runNet(); }, 25000);
  var iv = setInterval(function(){
    if(net.state !== 'waiting'){ clearInterval(iv); return; }
    if(Q.some(function(e){ return e[1] === 'scene-ready' || e[1] === 'photo-fallback-start' || e[1] === 'photo-mode'; })){ clearInterval(iv); clearTimeout(t25); setTimeout(runNet, 2500); }
  }, 500);
  window.addEventListener('load', function(){ watchIframes(); setTimeout(watchIframes, 1500); setTimeout(watchIframes, 6000); });
}
if(document.body) start(); else document.addEventListener('DOMContentLoaded', start);
}catch(err){ try{ console.error('diag failed', err); }catch(e){} }
})();
