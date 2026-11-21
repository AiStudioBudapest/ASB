// Vue éclatée 3D du Negroni : Three.js, géométrie et matières entièrement générées par code
// (aucun modèle, aucune texture à télécharger). Chargé à la demande par src/app.js.
// Reconstruire le bundle : node tools/build3d.mjs
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, LatheGeometry, CylinderGeometry, PlaneGeometry,
  ShaderMaterial, MeshStandardMaterial, MeshBasicMaterial, CanvasTexture, Vector2, Vector3, Color,
  HemisphereLight, DirectionalLight, SRGBColorSpace, BackSide, FrontSide, BufferGeometry, Line,
  LineDashedMaterial, Float32BufferAttribute, MathUtils
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// ---------- GLSL commun : un studio photo virtuel (reflets de softbox) ----------
const STUDIO = /* glsl */`
vec3 studio(vec3 r){
  vec3 col = mix(vec3(.015,.10,.075), vec3(.30,.58,.50), smoothstep(-.3,.95,r.y));
  col += vec3(1.,.97,.9) * smoothstep(.84,.92,dot(r,normalize(vec3(-.55,.6,.55)))) * 1.25;
  float strip = smoothstep(.13,.0,abs(r.x-.72)) * smoothstep(-.35,.1,r.y) * smoothstep(.95,.45,r.y);
  col += vec3(.92,1.,.96) * strip * .95;
  col += vec3(1.,.82,.62) * smoothstep(.78,.95,dot(r,normalize(vec3(.5,.25,-.8)))) * .8;
  col += vec3(.7,.9,1.) * smoothstep(.86,.95,dot(r,normalize(vec3(-.8,.1,-.5)))) * .45;
  return col;
}`
const VERT = /* glsl */`
varying vec3 vN; varying vec3 vW; varying vec3 vL;
void main(){
  vL = position;
  vec4 w = modelMatrix * vec4(position,1.);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`
const GLASS_FRAG = /* glsl */`
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vL;
uniform vec3 uTint; uniform float uBase; uniform float uFres; uniform float uMilk; uniform float uOpacity;
${STUDIO}
float h31(vec3 p){ p = fract(p*.3183099+.1); p *= 17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vn(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(mix(h31(i),h31(i+vec3(1,0,0)),f.x),mix(h31(i+vec3(0,1,0)),h31(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h31(i+vec3(0,0,1)),h31(i+vec3(1,0,1)),f.x),mix(h31(i+vec3(0,1,1)),h31(i+vec3(1,1,1)),f.x),f.y),f.z); }
void main(){
  vec3 N = normalize(vN); if(!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  float nv = clamp(dot(N,V),0.,1.);
  float fres = pow(1.-nv, 3.);
  vec3 env = studio(reflect(-V,N));
  vec3 inner = studio(refract(-V,N,.78));
  float milk = uMilk > 0. ? (vn(vL*5.)*.65 + vn(vL*13.)*.35) : 0.;
  vec3 col = uTint*.14 + env*(.18 + uFres*fres) + inner*.07 + vec3(.85,.93,1.)*milk*uMilk*.3;
  float hi = max(dot(env,vec3(.333))-.6,0.);
  float a = uBase + fres*uFres*.75 + hi*.9 + milk*uMilk*.28;
  gl_FragColor = vec4(col, clamp(a,0.,.94)*uOpacity);
}`
const LIQ_FRAG = /* glsl */`
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vL;
uniform vec3 uTop; uniform vec3 uBot; uniform float uAlpha; uniform float uY0; uniform float uY1; uniform float uGloss;
${STUDIO}
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  float nv = clamp(dot(N,V),0.,1.);
  float fres = pow(1.-nv,2.5);
  float h = clamp((vL.y-uY0)/(uY1-uY0),0.,1.);
  vec3 base = mix(uBot,uTop,smoothstep(0.,1.,h));
  vec3 env = studio(reflect(-V,N));
  vec3 col = base*(.62+.38*nv) + base*fres*.55 + env*(.10 + fres*.55)*uGloss;
  float topFace = smoothstep(.55,.92,N.y);
  col = mix(col, base*1.18 + env*.28*uGloss, topFace*.65);
  col += vec3(1.,.96,.9)*pow(max(dot(reflect(-V,N),normalize(vec3(-.55,.6,.55))),0.),48.)*.55*uGloss;
  gl_FragColor = vec4(col, uAlpha);
}`

// ---------- petits outils ----------
const ss = t => (t = Math.min(1, Math.max(0, t)), t * t * (3 - 2 * t))
const eio = t => (t = Math.min(1, Math.max(0, t)), t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }

function glassMat(o) {
  return new ShaderMaterial({
    vertexShader: VERT, fragmentShader: GLASS_FRAG, transparent: true, depthWrite: false, side: o.side || FrontSide,
    uniforms: { uTint: { value: new Color(o.tint || 0xbfe8e0) }, uBase: { value: o.base }, uFres: { value: o.fres || 1 }, uMilk: { value: o.milk || 0 }, uOpacity: { value: 1 } }
  })
}
function liquidMat(o) {
  return new ShaderMaterial({
    vertexShader: VERT, fragmentShader: LIQ_FRAG, transparent: o.alpha < 1, depthWrite: o.alpha >= 1,
    uniforms: { uTop: { value: new Color(o.top) }, uBot: { value: new Color(o.bot) }, uAlpha: { value: o.alpha }, uY0: { value: -o.h / 2 }, uY1: { value: o.h / 2 }, uGloss: { value: o.gloss == null ? 1 : o.gloss } }
  })
}
function slabGeo(r, h) {
  const p = [[0, 0], [r * .93, 0], [r * .985, .03], [r, .08], [r, h - .08], [r * .985, h - .03], [r * .94, h - .004], [r * .62, h - .018], [0, h - .03]]
  const g = new LatheGeometry(p.map(a => new Vector2(a[0], a[1])), 56)
  g.translate(0, -h / 2, 0)
  return g
}
function glassGeo() {
  const p = [
    [0, -1.1], [.72, -1.1], [.86, -1.09], [.95, -1.045], [1.0, -.97], [1.03, -.8], [1.06, 1.05], [1.065, 1.1], [1.05, 1.135], [1.01, 1.145], [.97, 1.135], [.945, 1.11],
    [.93, 1.07], [.905, -.52], [.88, -.60], [.8, -.64], [.5, -.655], [0, -.665]
  ]
  return new LatheGeometry(p.map(a => new Vector2(a[0], a[1])), 80)
}

// tranche d'orange : texture peinte sur un canvas (écorce, peau blanche, quartiers, grains de pulpe)
function orangeTexture() {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S
  const x = c.getContext('2d'), R = rng(7), C = S / 2
  x.fillStyle = '#f08a14'; x.fillRect(0, 0, S, S)
  let g = x.createRadialGradient(C, C, S * .42, C, C, S * .5); g.addColorStop(0, '#ffa72e'); g.addColorStop(1, '#e8780c')
  x.fillStyle = g; x.beginPath(); x.arc(C, C, S * .5, 0, 7); x.fill()
  for (let i = 0; i < 360; i++) { const a = R() * 6.283, r = S * (.455 + R() * .03); x.fillStyle = 'rgba(190,90,0,.35)'; x.beginPath(); x.arc(C + Math.cos(a) * r, C + Math.sin(a) * r, 1.2 + R() * 1.4, 0, 7); x.fill() }
  x.fillStyle = '#fff3d0'; x.beginPath(); x.arc(C, C, S * .435, 0, 7); x.fill()
  g = x.createRadialGradient(C, C, S * .3, C, C, S * .435); g.addColorStop(0, 'rgba(255,236,190,0)'); g.addColorStop(1, 'rgba(255,225,160,.75)')
  x.fillStyle = g; x.beginPath(); x.arc(C, C, S * .435, 0, 7); x.fill()
  const N = 10, gap = .05, fr = S * .405
  for (let k = 0; k < N; k++) {
    const a0 = k / N * 6.283 + gap, a1 = (k + 1) / N * 6.283 - gap, am = (a0 + a1) / 2
    const cx = C + Math.cos(am) * 7, cy = C + Math.sin(am) * 7
    x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, fr, a0, a1); x.closePath()
    const gr = x.createRadialGradient(C, C, 10, C, C, fr); gr.addColorStop(0, '#ffc15e'); gr.addColorStop(.55, '#ff9c24'); gr.addColorStop(1, '#f27d0a')
    x.fillStyle = gr; x.fill()
    x.save(); x.clip()
    for (let i = 0; i < 150; i++) {
      const a = a0 + R() * (a1 - a0), r = 18 + R() * (fr - 20), px = C + Math.cos(a) * r, py = C + Math.sin(a) * r
      x.fillStyle = `rgba(255,${200 + (R() * 45 | 0)},${110 + (R() * 60 | 0)},${.35 + R() * .4})`
      x.beginPath(); x.ellipse(px, py, 2 + R() * 3, 6 + R() * 12, a + 1.5708, 0, 7); x.fill()
    }
    x.restore()
  }
  g = x.createRadialGradient(C, C, 0, C, C, 30); g.addColorStop(0, '#fff6dc'); g.addColorStop(1, 'rgba(255,246,220,0)')
  x.fillStyle = g; x.beginPath(); x.arc(C, C, 30, 0, 7); x.fill()
  x.fillStyle = 'rgba(255,255,255,.1)'; x.beginPath(); x.ellipse(C - 90, C - 120, 120, 50, -.6, 0, 7); x.fill()
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4
  return t
}
function shadowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(.55, 'rgba(0,0,0,.22)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  x.fillStyle = g; x.fillRect(0, 0, 128, 128)
  return new CanvasTexture(c)
}

// ---------- la scène ----------
export function create(host) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = SRGBColorSpace
  const dprMax = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(dprMax)
  const canvas = renderer.domElement
  canvas.className = 'xv-3d'
  host.appendChild(canvas)

  const scene = new Scene()
  const cam = new PerspectiveCamera(26, 1, .1, 200)
  scene.add(new HemisphereLight(0xffffff, 0x1d4a3d, 1.05))
  const key = new DirectionalLight(0xfff1dd, 2.1); key.position.set(-3, 5, 6); scene.add(key)

  const root = new Group(); scene.add(root)
  const parts = {}
  const add = (k, g, y0, y1, w) => { const o = { k, g, y0, y1, p: 0, w, rw: w.rw }; parts[k] = o; root.add(g); return o }

  // verre old fashioned (face arrière + face avant, pour une vraie transparence épaisse)
  const gGeo = glassGeo(), glassG = new Group()
  const gBack = new Mesh(gGeo, glassMat({ side: BackSide, base: .05, fres: .7, tint: 0xa8d6cc })); gBack.renderOrder = 3
  const gFront = new Mesh(gGeo, glassMat({ side: FrontSide, base: .035, fres: 1.1, tint: 0xcdeee6 })); gFront.renderOrder = 4
  glassG.add(gBack, gFront)
  add('glass', glassG, 0, -2.45, { a: .28, b: 1, rw: 1.06 })

  // trois volumes liquides
  const H = .42, LR = .888
  const lg = slabGeo(LR, H)
  const mk = (o, ro) => { const m = new Mesh(lg, liquidMat(Object.assign({ h: H }, o))); m.renderOrder = ro; return m }
  const vermouth = mk({ top: 0xf2b53c, bot: 0x7a3e08, alpha: 1, gloss: .85 }, 0)
  const campari = mk({ top: 0xff4a3a, bot: 0x7d0b12, alpha: 1, gloss: .9 }, 0)
  const gin = mk({ top: 0xe8fbf7, bot: 0xa9e2d9, alpha: .36, gloss: 1.3 }, 1)
  add('vermouth', vermouth, -.41, -.38, { a: .24, b: .93, rw: LR })
  add('campari', campari, .01, .88, { a: .18, b: .86, rw: LR })
  add('gin', gin, .43, 2.12, { a: .12, b: .78, rw: LR })

  // glaçons : cubes arrondis translucides, givrés à cœur
  const ice = new Group(), iceSpecs = [
    { s: .62, a: [.42, .25, .1], r: [.32, .6, -.2], ang: 0 }, { s: .56, a: [.15, -.35, .4], r: [-.5, .2, .55], ang: 2.1 }, { s: .6, a: [-.3, .5, -.25], r: [.2, -.7, .35], ang: 4.2 }]
  const iceMeshes = iceSpecs.map(sp => {
    const geo = new RoundedBoxGeometry(sp.s, sp.s, sp.s, 3, .085)
    const g = new Group()
    const b = new Mesh(geo, glassMat({ side: BackSide, base: .16, fres: .9, milk: .8, tint: 0xcfe9f4 })); b.renderOrder = 5
    const f = new Mesh(geo, glassMat({ side: FrontSide, base: .12, fres: 1.1, milk: .8, tint: 0xe3f4fb })); f.renderOrder = 6
    g.add(b, f); ice.add(g); return { g, sp }
  })
  add('ice', ice, .75, 3.35, { a: .06, b: .7, rw: .95 })

  // tranche d'orange
  const tex = orangeTexture()
  const capM = new MeshStandardMaterial({ map: tex, roughness: .5, metalness: 0, emissive: 0x401a00, emissiveMap: tex, emissiveIntensity: .5 })
  const sideM = new MeshStandardMaterial({ color: 0xee8412, roughness: .62 })
  const orange = new Mesh(new CylinderGeometry(.92, .92, .1, 72, 1, false), [sideM, capM, capM])
  const orangeG = new Group(); orangeG.add(orange)
  add('orange', orangeG, 1.3, 4.7, { a: 0, b: .62, rw: .92 })

  // ombre de contact sous le verre
  const shadow = new Mesh(new PlaneGeometry(4.2, 4.2), new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity: .6 }))
  shadow.rotation.x = -Math.PI / 2; shadow.renderOrder = -1; root.add(shadow)

  // axe central pointillé
  const axG = new BufferGeometry(); axG.setAttribute('position', new Float32BufferAttribute([0, -3.9, 0, 0, 5.3, 0], 3))
  const axis = new Line(axG, new LineDashedMaterial({ color: 0xffffff, dashSize: .1, gapSize: .1, transparent: true, opacity: 0, depthWrite: false })); axis.computeLineDistances(); axis.renderOrder = 7
  root.add(axis)

  const order = ['orange', 'ice', 'gin', 'campari', 'vermouth', 'glass']
  const st = { W: 0, H: 0, cx: 0, u: 0, from: 0, to: 0, t0: 0, dur: 0, yaw: 0, pitch: 0, vyaw: 0, drag: false, idle: 0, run: false, raf: 0, frames: 0, acc: 0, lowered: false, onFrame: null, onTap: null, onLost: null }
  const lastP = {}

  function layoutCam() {
    const aspect = st.W / st.H
    st.camAspect = aspect
  }
  function resize(W, H, cx) {
    st.W = W; st.H = H; st.cx = cx
    renderer.setSize(W, H, false)
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
    cam.aspect = W / H
    cam.setViewOffset(W, H, W / 2 - cx, 0, W, H)
    cam.updateProjectionMatrix()
  }
  const camDist = vis => vis / (2 * Math.tan(MathUtils.degToRad(cam.fov / 2)))

  const v3 = new Vector3()
  function frame(now) {
    if (!st.run) return
    st.raf = requestAnimationFrame(frame)
    const t = now / 1000
    if (st.dur > 0) { const k = Math.min(1, (now - st.t0) / st.dur); st.u = st.from + (st.to - st.from) * k; if (k >= 1) st.dur = 0 } else st.u = st.to
    const u = st.u
    // interaction : inertie, puis retour doux vers la vue de face
    if (!st.drag) {
      st.yaw += st.vyaw; st.vyaw *= .93
      if (now - st.idle > 2200) { st.yaw += (0 - st.yaw) * .035; st.pitch += (0 - st.pitch) * .05 }
    }
    root.rotation.y = st.yaw + Math.sin(t * .55) * .07
    root.rotation.x = st.pitch
    // positions pièce par pièce (du haut vers le bas au démontage, l'inverse au remontage)
    order.forEach((k, i) => {
      const o = parts[k], p = eio((u - o.w.a) / (o.w.b - o.w.a)); o.p = p
      const y = o.y0 + (o.y1 - o.y0) * p + Math.sin(t * 1.3 + i) * .028 * p
      o.g.position.set(0, y, 0)
      lastP[k] = y
    })
    const po = parts.orange.p, pi = parts.ice.p
    orangeG.rotation.set(.43 + (1.0 - .43) * po, po * .6, 0)
    iceMeshes.forEach((m, i) => {
      const sp = m.sp
      m.g.position.set(sp.a[0] * (1 - pi) + Math.cos(sp.ang + .5) * .46 * pi, (sp.a[1] - .5) * (1 - pi) * .35 + Math.sin(t * 1.1 + i * 2) * .02 * pi, sp.a[2] * (1 - pi) + Math.sin(sp.ang + .5) * .46 * pi)
      m.g.rotation.set(sp.r[0] + pi * 1.2, sp.r[1] + pi * .8 + t * .05 * pi, sp.r[2])
    })
    shadow.position.set(0, parts.glass.g.position.y - 1.115, 0)
    shadow.material.opacity = .55 - ss(u) * .15
    axis.material.opacity = .32 * ss((u - .35) / .5)
    // caméra : cadrage serré sur le verre, puis recul pour embrasser la vue éclatée
    const aspect = st.W / st.H, cu = ss(u)
    const visA = Math.max(4.2, 2.5 / (aspect * .52)), visE = Math.max(10.9, 2.5 / (aspect * .5))
    const d = camDist(visA + (visE - visA) * cu), ty = .35 + (.62 - .35) * cu, el = .17
    cam.position.set(0, ty + Math.sin(el) * d, Math.cos(el) * d)
    cam.lookAt(0, ty, 0)
    cam.updateMatrixWorld()
    renderer.render(scene, cam)
    // adaptation : si la machine rame, on baisse la résolution de rendu (une seule fois)
    if (!st.lowered && u > .15) {
      st.frames++; st.acc += 16 // estimation via dt réel ci-dessous
    }
    if (st.last) { const dt = now - st.last; if (u > .1 && !st.lowered) { st.acc += dt - 16; if (st.frames > 45) { if (st.acc / st.frames > 14 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(1); renderer.setSize(st.W, st.H, false); st.lowered = true } st.frames = 0; st.acc = 0 } } }
    st.last = now
    if (st.onFrame) {
      const info = { u, W: st.W, H: st.H, parts: [], colX: 0 }
      let maxEdge = 0
      order.forEach(k => {
        const o = parts[k]
        v3.set(0, lastP[k], 0).project(cam)
        const sx = (v3.x * .5 + .5) * st.W, sy = (-v3.y * .5 + .5) * st.H
        v3.set(o.rw, lastP[k], 0).project(cam)
        const ex = (v3.x * .5 + .5) * st.W
        maxEdge = Math.max(maxEdge, ex)
        info.parts.push({ k, sx, sy, edge: ex, p: o.p })
      })
      info.colX = maxEdge
      st.onFrame(info)
    }
  }
  function start() { if (st.run) return; st.run = true; st.last = 0; st.raf = requestAnimationFrame(frame) }
  function stop() { st.run = false; cancelAnimationFrame(st.raf) }
  function setTarget(to, dur) { st.from = st.u; st.to = to; st.t0 = performance.now(); st.dur = dur; if (!dur) st.u = to }

  // glisser = tourner la vue ; toucher sans glisser = démonter / remonter
  let sx0 = 0, sy0 = 0, t0 = 0, moved = 0, lx = 0, ly = 0
  canvas.style.touchAction = 'none'
  canvas.addEventListener('pointerdown', e => { st.drag = true; st.vyaw = 0; sx0 = lx = e.clientX; sy0 = ly = e.clientY; t0 = performance.now(); moved = 0; try { canvas.setPointerCapture(e.pointerId) } catch (x) {} })
  canvas.addEventListener('pointermove', e => {
    if (!st.drag) return
    const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY
    moved = Math.max(moved, Math.hypot(e.clientX - sx0, e.clientY - sy0))
    st.yaw = Math.max(-1.6, Math.min(1.6, st.yaw + dx * .009)); st.vyaw = dx * .0016
    st.pitch = Math.max(-.22, Math.min(.3, st.pitch + dy * .004)); st.idle = performance.now()
  })
  const up = () => { if (!st.drag) return; st.drag = false; st.idle = performance.now(); if (moved < 7 && performance.now() - t0 < 350 && st.onTap) st.onTap() }
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', () => { st.drag = false })
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); if (st.onLost) st.onLost() })

  return {
    canvas, resize, start, stop, setTarget,
    get u() { return st.u }, get target() { return st.to },
    set onFrame(f) { st.onFrame = f }, set onTap(f) { st.onTap = f }, set onLost(f) { st.onLost = f },
    dispose() { stop(); renderer.dispose(); try { renderer.forceContextLoss() } catch (e) {} canvas.remove() }
  }
}
