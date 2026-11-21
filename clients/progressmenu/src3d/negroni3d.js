// Vue éclatée 3D du Negroni : Three.js, géométrie et matières entièrement générées par code
// (aucun modèle, aucune texture à télécharger). Chargé à la demande par src/app.js.
// Reconstruire le bundle : node tools/build3d.mjs
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, LatheGeometry, CylinderGeometry, PlaneGeometry,
  ShaderMaterial, MeshStandardMaterial, MeshBasicMaterial, CanvasTexture, Vector2, Vector3, Color,
  HemisphereLight, DirectionalLight, SRGBColorSpace, BackSide, FrontSide, BufferGeometry, Line,
  LineDashedMaterial, Float32BufferAttribute, MathUtils, TubeGeometry, CatmullRomCurve3, SphereGeometry, Points, PointsMaterial, DoubleSide
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

const METAL_FRAG = /* glsl */`
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vL;
uniform vec3 uColor;
${STUDIO}
void main(){
  vec3 N = normalize(vN); if(!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  float nv = clamp(dot(N,V),0.,1.);
  vec3 env = studio(reflect(-V,N));
  vec3 col = uColor*(.16 + env*1.0) + vec3(1.,.97,.9)*pow(max(dot(env,vec3(.333))-.62,0.),2.)*1.6 + uColor*pow(1.-nv,3.)*.35;
  gl_FragColor = vec4(col,1.);
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
function orangeTexture(dried) {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S
  const x = c.getContext('2d'), R = rng(7), C = S / 2
  const P = dried ? { rind: '#c9831f', a: '#dc9a2c', b: '#b8720f', pith: '#f5dfa8', pith2: 'rgba(240,210,140,.8)', f0: '#f0b650', f1: '#e19a2a', f2: '#c97a12', v: '255,205,110' } : { rind: '#f08a14', a: '#ffa72e', b: '#e8780c', pith: '#fff3d0', pith2: 'rgba(255,225,160,.75)', f0: '#ffc15e', f1: '#ff9c24', f2: '#f27d0a', v: '255,215,130' }
  x.fillStyle = P.rind; x.fillRect(0, 0, S, S)
  let g = x.createRadialGradient(C, C, S * .42, C, C, S * .5); g.addColorStop(0, P.a); g.addColorStop(1, P.b)
  x.fillStyle = g; x.beginPath(); x.arc(C, C, S * .5, 0, 7); x.fill()
  for (let i = 0; i < 360; i++) { const a = R() * 6.283, r = S * (.455 + R() * .03); x.fillStyle = 'rgba(190,90,0,.35)'; x.beginPath(); x.arc(C + Math.cos(a) * r, C + Math.sin(a) * r, 1.2 + R() * 1.4, 0, 7); x.fill() }
  x.fillStyle = P.pith; x.beginPath(); x.arc(C, C, S * .435, 0, 7); x.fill()
  g = x.createRadialGradient(C, C, S * .3, C, C, S * .435); g.addColorStop(0, 'rgba(255,236,190,0)'); g.addColorStop(1, P.pith2)
  x.fillStyle = g; x.beginPath(); x.arc(C, C, S * .435, 0, 7); x.fill()
  const N = 10, gap = .05, fr = S * .405
  for (let k = 0; k < N; k++) {
    const a0 = k / N * 6.283 + gap, a1 = (k + 1) / N * 6.283 - gap, am = (a0 + a1) / 2
    const cx = C + Math.cos(am) * 7, cy = C + Math.sin(am) * 7
    x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, fr, a0, a1); x.closePath()
    const gr = x.createRadialGradient(C, C, 10, C, C, fr); gr.addColorStop(0, P.f0); gr.addColorStop(.55, P.f1); gr.addColorStop(1, P.f2)
    x.fillStyle = gr; x.fill()
    x.save(); x.clip()
    for (let i = 0; i < 150; i++) {
      const a = a0 + R() * (a1 - a0), r = 18 + R() * (fr - 20), px = C + Math.cos(a) * r, py = C + Math.sin(a) * r
      x.fillStyle = `rgba(${P.v},${(dried ? .18 : .35) + R() * .4})`
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

// ---------- ingrédients communs ----------
function metalMat(color) {
  return new ShaderMaterial({ vertexShader: VERT, fragmentShader: METAL_FRAG, side: DoubleSide, uniforms: { uColor: { value: new Color(color) } } })
}
function iceCluster(specs, ry) {
  const ice = new Group()
  const meshes = specs.map(sp => {
    const geo = new RoundedBoxGeometry(sp.s, sp.s, sp.s, 3, .085 * sp.s / .6)
    const g = new Group()
    const b = new Mesh(geo, glassMat({ side: BackSide, base: .16, fres: .9, milk: .8, tint: 0xcfe9f4 })); b.renderOrder = 5
    const f = new Mesh(geo, glassMat({ side: FrontSide, base: .12, fres: 1.1, milk: .8, tint: 0xe3f4fb })); f.renderOrder = 6
    g.add(b, f); ice.add(g); return { g, sp }
  })
  return { ice, meshes }
}
function dotTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 32
  const x = c.getContext('2d'), g = x.createRadialGradient(16, 16, 0, 16, 16, 16)
  g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(.55, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 32, 32)
  return new CanvasTexture(c)
}

// ---------- scène « Negroni » : verre old fashioned, 3 volumes liquides, glaçons, orange ----------
function negroni(c) {
  const { add, root } = c
  const gGeo = glassGeo(), glassG = new Group()
  const gBack = new Mesh(gGeo, glassMat({ side: BackSide, base: .05, fres: .7, tint: 0xa8d6cc })); gBack.renderOrder = 3
  const gFront = new Mesh(gGeo, glassMat({ side: FrontSide, base: .035, fres: 1.1, tint: 0xcdeee6 })); gFront.renderOrder = 4
  glassG.add(gBack, gFront)
  add('glass', glassG, 0, -2.45, { a: .28, b: 1, rw: 1.06 })

  const H = .42, LR = .888, lg = slabGeo(LR, H)
  const mk = (o, ro) => { const m = new Mesh(lg, liquidMat(Object.assign({ h: H }, o))); m.renderOrder = ro; return m }
  add('vermouth', mk({ top: 0xf2b53c, bot: 0x7a3e08, alpha: 1, gloss: .85 }, 0), -.41, -.38, { a: .24, b: .93, rw: LR })
  add('campari', mk({ top: 0xff4a3a, bot: 0x7d0b12, alpha: 1, gloss: .9 }, 0), .01, .88, { a: .18, b: .86, rw: LR })
  add('gin', mk({ top: 0xe8fbf7, bot: 0xa9e2d9, alpha: .36, gloss: 1.3 }, 1), .43, 2.12, { a: .12, b: .78, rw: LR })

  const { ice, meshes } = iceCluster([
    { s: .62, a: [.42, .25, .1], r: [.32, .6, -.2], ang: 0 }, { s: .56, a: [.15, -.35, .4], r: [-.5, .2, .55], ang: 2.1 }, { s: .6, a: [-.3, .5, -.25], r: [.2, -.7, .35], ang: 4.2 }])
  add('ice', ice, .75, 3.35, { a: .06, b: .7, rw: .95 })

  const tex = orangeTexture(false)
  const capM = new MeshStandardMaterial({ map: tex, roughness: .5, metalness: 0, emissive: 0x401a00, emissiveMap: tex, emissiveIntensity: .5 })
  const sideM = new MeshStandardMaterial({ color: 0xee8412, roughness: .62 })
  const orangeG = new Group(); orangeG.add(new Mesh(new CylinderGeometry(.92, .92, .1, 72, 1, false), [sideM, capM, capM]))
  add('orange', orangeG, 1.3, 4.7, { a: 0, b: .62, rw: .92 })

  return {
    order: ['orange', 'ice', 'gin', 'campari', 'vermouth', 'glass'],
    cam: { visA: 4.2, visE: 10.9, tyA: .35, tyE: .62, el: .17 },
    shadowY: -1.115, shadowFollow: 'glass', axis: [-3.9, 5.3],
    update(t, P) {
      const po = P.orange.p, pi = P.ice.p
      orangeG.rotation.set(.43 + (1.0 - .43) * po, po * .6, 0)
      meshes.forEach((m, i) => {
        const sp = m.sp
        m.g.position.set(sp.a[0] * (1 - pi) + Math.cos(sp.ang + .5) * .46 * pi, (sp.a[1] - .5) * (1 - pi) * .35 + Math.sin(t * 1.1 + i * 2) * .02 * pi, sp.a[2] * (1 - pi) + Math.sin(sp.ang + .5) * .46 * pi)
        m.g.rotation.set(sp.r[0] + pi * 1.2, sp.r[1] + pi * .8 + t * .05 * pi, sp.r[2])
      })
    }
  }
}

// ---------- scène « Paradise GT » : verre ballon, gin, tonic, glace, pétales, orange séchée, paille dorée ----------
function paradise(c) {
  const { add } = c
  const CY = 2.85, RXo = 1.3, RYo = 1.28, RXi = 1.245, RYi = 1.225
  // verre ballon : pied, tige fine, bol arrondi, bord resserré
  const P = [[0, 0], [1.18, 0], [1.22, .035], [1.21, .085], [.9, .12], [.45, .17], [.17, .26], [.1, .45], [.09, .9], [.09, 1.35], [.12, 1.46], [.18, 1.53]]
  for (let th = -80; th <= 44; th += 4) { const r = th * Math.PI / 180; P.push([RXo * Math.cos(r), CY + RYo * Math.sin(r)]) }
  P.push([.94, 3.77], [.905, 3.795], [.87, 3.775])
  for (let th = 44; th >= -86; th -= 4) { const r = th * Math.PI / 180; P.push([RXi * Math.cos(r), CY + RYi * Math.sin(r)]) }
  P.push([0, 1.63])
  const gGeo = new LatheGeometry(P.map(a => new Vector2(a[0], a[1])), 88)
  const glassG = new Group()
  const gBack = new Mesh(gGeo, glassMat({ side: BackSide, base: .05, fres: .7, tint: 0xa8d6cc })); gBack.renderOrder = 3
  const gFront = new Mesh(gGeo, glassMat({ side: FrontSide, base: .035, fres: 1.1, tint: 0xcdeee6 })); gFront.renderOrder = 4
  glassG.add(gBack, gFront)
  add('glass', glassG, 0, 0, { a: 0, b: 1, rw: 1.3 }, 1.9)

  // tranches de liquide épousant l'intérieur du bol
  const RXl = RXi - .018, RYl = RYi - .018
  const rAt = y => RXl * Math.sqrt(Math.max(0, 1 - Math.pow((y - CY) / RYl, 2)))
  function slice(y0, y1, first) {
    const pts = [], n = 16
    if (first) { y0 = CY - RYl * .985; pts.push([0, y0]) } else { pts.push([0, y0], [rAt(y0) * .94, y0]) }
    for (let k = first ? 1 : 0; k <= n; k++) { const y = y0 + (y1 - y0) * k / n; pts.push([rAt(y), y]) }
    pts.push([rAt(y1) * .95, y1 - .006], [rAt(y1) * .6, y1 - .02], [0, y1 - .032])
    return new LatheGeometry(pts.map(a => new Vector2(a[0], a[1])), 72)
  }
  const mkL = (y0, y1, first, o, ro) => { const m = new Mesh(slice(y0, y1, first), liquidMat(Object.assign({ h: y1 - y0 }, o))); m.material.uniforms.uY0.value = y0; m.material.uniforms.uY1.value = y1; m.renderOrder = ro; return m }
  add('gin', mkL(1.64, 2.25, true, { top: 0xe8fbf7, bot: 0xa9e2d9, alpha: .36, gloss: 1.3 }, 1), 0, 2.815, { a: .24, b: .93, rw: .95 }, 1.945)
  const tonic = mkL(2.25, 3.35, false, { top: 0xf6e7b0, bot: 0xdcc070, alpha: .46, gloss: 1.3 }, 2)
  // bulles dans le tonic
  const bp = [], R2 = rng(11)
  for (let k = 0; k < 46; k++) { const y = 2.3 + R2() * 1.0, r = rAt(y) * .86 * Math.sqrt(R2()), a = R2() * 6.283; bp.push(Math.cos(a) * r, y, Math.sin(a) * r) }
  const bg = new BufferGeometry(); bg.setAttribute('position', new Float32BufferAttribute(bp, 3))
  const bubbles = new Points(bg, new PointsMaterial({ map: dotTexture(), size: .09, transparent: true, depthWrite: false, opacity: .9, sizeAttenuation: true })); bubbles.renderOrder = 3
  const tg = new Group(); tg.add(tonic, bubbles)
  add('tonic', tg, 0, 3.47, { a: .18, b: .86, rw: 1.1 }, 2.8)

  const { ice, meshes } = iceCluster([
    { s: .5, a: [.32, 3.28, .12], r: [.32, .6, -.2], ang: 0 }, { s: .46, a: [-.12, 3.18, .4], r: [-.5, .2, .55], ang: 2.1 }, { s: .48, a: [-.34, 3.3, -.22], r: [.2, -.7, .35], ang: 4.2 }])
  add('ice', ice, 0, 4.445, { a: .12, b: .78, rw: .85 }, 3.3)

  // pétales et épices : petites pièces plates, rose / prune / brun
  const fl = new Group(), R3 = rng(5)
  const pm = [0xd9708f, 0xf0b2c6, 0x8e3b63, 0x7a4a2a].map(col => new MeshStandardMaterial({ color: col, roughness: .75 }))
  const pg = new SphereGeometry(1, 10, 6), petals = []
  for (let k = 0; k < 20; k++) {
    const m = new Mesh(pg, pm[k % 7 === 6 ? 3 : k % 3 === 2 ? 2 : k % 2]); const sc = .06 + R3() * .06
    m.scale.set(sc * 1.4, sc * .28, sc); const a = R3() * 6.283, r = .15 + Math.sqrt(R3()) * .72
    m.position.set(Math.cos(a) * r, 3.36 + R3() * .03, Math.sin(a) * r); m.rotation.set(R3() * .8, R3() * 6, R3() * .8)
    fl.add(m); petals.push(m)
  }
  add('flowers', fl, 0, 5.435, { a: .08, b: .72, rw: .85 }, 3.36)

  // orange séchée appuyée dans le verre
  const tex = orangeTexture(true)
  const capM = new MeshStandardMaterial({ map: tex, roughness: .6, metalness: 0, emissive: 0x3a1c00, emissiveMap: tex, emissiveIntensity: .45 })
  const sideM = new MeshStandardMaterial({ color: 0xc98a22, roughness: .7 })
  const og = new Group(), orange = new Mesh(new CylinderGeometry(.62, .62, .07, 64, 1, false), [sideM, capM, capM]); og.add(orange)
  add('orange', og, 0, 6.62, { a: .04, b: .66, rw: .66 }, 3.45)

  // paille dorée (métal poli), appuyée dans le verre, coudée en haut
  const L = 3.2
  const path = new CatmullRomCurve3([new Vector3(0, -L / 2, 0), new Vector3(0, L / 2 - .55, 0), new Vector3(.06, L / 2 - .26, 0), new Vector3(.3, L / 2 - .08, 0), new Vector3(.62, L / 2 - .1, 0)])
  const straw = new Mesh(new TubeGeometry(path, 48, .05, 10, false), metalMat(0xd9a441))
  const sg = new Group(); sg.add(straw)
  add('straw', sg, 0, 9.52, { a: 0, b: .6, rw: .6 }, 3.3)

  return {
    order: ['straw', 'orange', 'flowers', 'ice', 'tonic', 'gin', 'glass'],
    cam: { visA: 5.8, visE: 15.9, tyA: 2.3, tyE: 7.15, el: .15 },
    shadowY: -.012, shadowFollow: null, axis: [-.6, 15.1],
    update(t, P) {
      const ps = P.straw.p, po = P.orange.p, pi = P.ice.p, pf = P.flowers.p
      straw.position.set(.2 * (1 - ps), 3.3, 0); straw.rotation.set(0, 0, -.2 * (1 - ps))
      orange.position.set(.52 * (1 - po), 3.5, 0); orange.rotation.set(.3 + (1.0 - .3) * po, po * .5, -.95 * (1 - po))
      meshes.forEach((m, i) => {
        const sp = m.sp
        m.g.position.set(sp.a[0] * (1 - pi) + Math.cos(sp.ang + .5) * .4 * pi, sp.a[1] + Math.sin(t * 1.1 + i * 2) * .02 * pi, sp.a[2] * (1 - pi) + Math.sin(sp.ang + .5) * .4 * pi)
        m.g.rotation.set(sp.r[0] + pi * 1.2, sp.r[1] + pi * .8 + t * .05 * pi, sp.r[2])
      })
      fl.rotation.y = t * .12 * pf
      petals.forEach((m, i) => { m.position.y = 3.36 + (i % 5) * .012 * pf + Math.sin(t * 1.2 + i) * .01 * pf })
    }
  }
}
const BUILD = { negroni, paradise }

// ---------- la scène ----------
// kind : 'negroni' | 'paradise' (scènes intégrées) ou 'glb' (modèle externe : extra.build(ctx) fournit le constructeur, voir glbview.js)
export function create(host, kind, extra) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  const canvas = renderer.domElement
  canvas.className = 'xv-3d'
  host.appendChild(canvas)

  const scene = new Scene()
  const cam = new PerspectiveCamera(26, 1, .1, 300)
  const hemi = new HemisphereLight(0xffffff, 0x1d4a3d, 1.05); scene.add(hemi)
  const key = new DirectionalLight(0xfff1dd, 2.1); key.position.set(-3, 5, 6); scene.add(key)

  const root = new Group(); scene.add(root)
  const parts = {}
  const add = (k, g, y0, y1, w, c0) => { const o = { k, g, y0, y1, p: 0, w, rw: w.rw, c: c0 || 0 }; parts[k] = o; root.add(g); return o }
  const B = (kind === 'glb' ? extra.build : (BUILD[kind] || negroni))({ add, root, renderer, scene, cam, lights: { hemi, key } })
  const order = B.order, CAM = B.cam

  // ombre de contact sous le verre
  const shadow = new Mesh(new PlaneGeometry(4.6, 4.6), new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity: .6 }))
  shadow.rotation.x = -Math.PI / 2; shadow.renderOrder = -1; root.add(shadow)

  // axe central pointillé
  const axG = new BufferGeometry(); axG.setAttribute('position', new Float32BufferAttribute([0, B.axis[0], 0, 0, B.axis[1], 0], 3))
  const axis = new Line(axG, new LineDashedMaterial({ color: 0xffffff, dashSize: .1, gapSize: .1, transparent: true, opacity: 0, depthWrite: false })); axis.computeLineDistances(); axis.renderOrder = 7
  root.add(axis)

  const st = { W: 0, H: 0, cx: 0, u: 0, from: 0, to: 0, t0: 0, dur: 0, yaw: 0, pitch: 0, vyaw: 0, drag: false, idle: 0, run: false, raf: 0, frames: 0, acc: 0, lowered: false, onFrame: null, onTap: null, onLost: null, onFocus: null }
  const lastP = {}

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
      lastP[k] = y + o.c
    })
    B.update(t, parts)
    shadow.position.set(0, B.shadowAt ? B.shadowAt() : B.shadowY + (B.shadowFollow ? parts[B.shadowFollow].g.position.y : 0), 0)
    if (B.shadowScale) shadow.scale.setScalar(B.shadowScale)
    shadow.material.opacity = .55 - ss(u) * .15
    axis.material.opacity = .32 * ss((u - .35) / .5)
    // caméra : cadrage serré sur le verre, puis recul pour embrasser la vue éclatée
    const aspect = st.W / st.H, cu = ss(u)
    const wmin = CAM.wmin || 2.5 * (CAM.visE / 10.9)
    const visA = Math.max(CAM.visA, wmin / (aspect * .52)), visE = Math.max(CAM.visE, wmin / (aspect * .5))
    const d = camDist(visA + (visE - visA) * cu), ty = CAM.tyA + (CAM.tyE - CAM.tyA) * cu, el = CAM.el
    cam.position.set(0, ty + Math.sin(el) * d, Math.cos(el) * d)
    cam.lookAt(0, ty, 0)
    cam.updateMatrixWorld()
    renderer.render(scene, cam)
    // adaptation : si la machine rame, on baisse la résolution de rendu (une seule fois)
    if (st.last && u > .1 && !st.lowered) {
      st.frames++; st.acc += (now - st.last) - 16
      if (st.frames > 45) { if (st.acc / st.frames > 14 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(1); renderer.setSize(st.W, st.H, false); st.lowered = true } st.frames = 0; st.acc = 0 }
    }
    st.last = now
    if (st.onFrame) {
      const info = { u, W: st.W, H: st.H, parts: [], colX: 0 }
      let maxEdge = 0
      order.forEach(k => {
        const o = parts[k]
        const an = B.anchor ? B.anchor(k) : null
        v3.set(an ? an.x : 0, an ? an.y : lastP[k], an ? an.z : 0).project(cam)
        const sx = (v3.x * .5 + .5) * st.W, sy = (-v3.y * .5 + .5) * st.H
        v3.set(an ? an.x + an.rw : o.rw, an ? an.y : lastP[k], an ? an.z : 0).project(cam)
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
  const up = e => {
    if (!st.drag) return
    st.drag = false; st.idle = performance.now()
    if (!(moved < 7 && performance.now() - t0 < 350)) return
    // modèle externe : toucher une pièce la met en avant (interaction par composant) ; toucher le fond la relâche, puis démonte/remonte
    if (B.pick && st.u > .85 && e && e.clientX != null) {
      const r = canvas.getBoundingClientRect(), k = B.pick(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      if (k) { B.focus(B.focusKey() === k ? null : k); if (st.onFocus) st.onFocus(B.focusKey()); return }
      if (B.focusKey()) { B.focus(null); if (st.onFocus) st.onFocus(null); return }
    }
    if (st.onTap) st.onTap()
  }
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', () => { st.drag = false })
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); if (st.onLost) st.onLost() })

  return {
    canvas, resize, start, stop, setTarget,
    get u() { return st.u }, get target() { return st.to },
    set onFrame(f) { st.onFrame = f }, set onTap(f) { st.onTap = f }, set onLost(f) { st.onLost = f }, set onFocus(f) { st.onFocus = f },
    clearFocus() { if (B.focus) { B.focus(null); if (st.onFocus) st.onFocus(null) } }, debug: B.debug || null,
    dispose() { st.onLost = null; stop(); renderer.dispose(); try { renderer.forceContextLoss() } catch (e) {} canvas.remove() }
  }
}
