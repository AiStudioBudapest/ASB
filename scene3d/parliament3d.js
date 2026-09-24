/* The Hungarian Parliament in 3D — built entirely in code (no downloaded model).
   Exterior (river front, roofs, back with the grand staircase, Kossuth square),
   plus a stylised interior (grand staircase + the domed hall with the Holy Crown).
   Scroll drives a camera that flies around the building; see PATH_* below.
   Bundled with three.js into public/alexstudio/parliament3d.js by `npm run build:3d`. */
import * as THREE from 'three';

const TAU = Math.PI * 2;
const OFF = 2000; /* the interior lives 2 km away on X so both scenes never overlap */

function rng(seed) {
  let a = seed | 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const R = rng(20260924);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

function canvasTex(w, h, draw, opts) {
  opts = opts || {};
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (opts.srgb !== false) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (opts.repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ------------------------------------------------------------------ arches */
/* Pointed (gothic) arch outline, y up, starting at the bottom-left corner.
   hw = half width, spring = height where the curve starts, k >= 1 sharpness (1 = round). */
function archOutline(hw, spring, k, n) {
  const r = hw * k, pts = [[-hw, 0], [-hw, spring]];
  const a1 = Math.acos(clamp(hw / r - 1, -1, 1));
  for (let i = 1; i <= n; i++) {
    const th = Math.PI + (a1 - Math.PI) * (i / n);
    pts.push([-hw + r + r * Math.cos(th), spring + r * Math.sin(th)]);
  }
  for (let i = n - 1; i >= 0; i--) {
    const th = Math.PI + (a1 - Math.PI) * (i / n);
    pts.push([hw - r - r * Math.cos(th), spring + r * Math.sin(th)]);
  }
  pts.push([hw, 0]);
  return pts;
}
function archApex(hw, spring, k) { return spring + hw * Math.sqrt(2 * k - 1); }

/* A rectangular panel with pointed-arch holes cut out of it. holes = [{cx, y0, hw, spring, k}] */
function archPanel(width, height, depth, holes) {
  const s = new THREE.Shape();
  s.moveTo(-width / 2, 0); s.lineTo(width / 2, 0); s.lineTo(width / 2, height); s.lineTo(-width / 2, height); s.closePath();
  holes.forEach((h) => {
    const p = new THREE.Path();
    archOutline(h.hw, h.spring, h.k, 8).forEach((pt, i) => {
      const x = h.cx + pt[0], y = h.y0 + pt[1];
      if (i === 0) p.moveTo(x, y); else p.lineTo(x, y);
    });
    p.closePath();
    s.holes.push(p);
  });
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 4 });
  g.translate(0, 0, -depth / 2);
  return g;
}

/* ------------------------------------------------------------------ textures */
function glowTexture() {
  return canvasTex(128, 128, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, 0);
    const rg = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(.25, 'rgba(255,255,255,.55)');
    rg.addColorStop(.6, 'rgba(255,255,255,.12)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, w, h); void gr;
  });
}

/* One 8 m bay x 36 m tall of the neo-Gothic facade: arcade, two window tiers, cornice.
   Painted twice: colour and emissive (the floodlit glow). */
function paintFacade(g, W, H, PX, emit) {
  const Y = (m) => H - m * PX;
  const cx = W / 2;
  if (!emit) {
    const gr = g.createLinearGradient(0, H, 0, 0);
    gr.addColorStop(0, '#f2c26e'); gr.addColorStop(.33, '#e0a653'); gr.addColorStop(.8, '#b07a38'); gr.addColorStop(1, '#8e5f2b');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(90,55,20,.17)'; g.lineWidth = 1;
    for (let m = 0; m < 36; m += .9) { g.beginPath(); g.moveTo(0, Y(m)); g.lineTo(W, Y(m)); g.stroke(); }
    for (let m = 0, row = 0; m < 36; m += .9, row++) {
      for (let x = (row % 2) * 40; x < W; x += 80) { g.beginPath(); g.moveTo(x, Y(m)); g.lineTo(x, Y(m + .9)); g.stroke(); }
    }
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = R() > .5 ? 'rgba(255,225,160,.07)' : 'rgba(70,40,10,.07)';
      g.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 2);
    }
  } else {
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    const gr = g.createLinearGradient(0, H, 0, 0);
    gr.addColorStop(0, 'rgb(118,76,28)'); gr.addColorStop(.45, 'rgb(74,46,16)'); gr.addColorStop(1, 'rgb(26,16,6)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  const path = (pts, ox, oy) => { g.beginPath(); pts.forEach((p, i) => { const x = ox + p[0] * PX, y = Y(oy + p[1]); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.closePath(); };
  const fillGrad = (y0, y1, c0, c1) => { const gr = g.createLinearGradient(0, Y(y0), 0, Y(y1)); gr.addColorStop(0, c0); gr.addColorStop(1, c1); return gr; };
  const dark = 'rgba(74,44,14,.9)';

  /* ground-floor arcade: a tall glowing pointed opening with a door */
  path(archOutline(2.7, 6.2, 1.5, 10), cx, 1);
  g.fillStyle = emit ? fillGrad(1, 10, '#ffe7ae', '#ffab45') : fillGrad(1, 10, '#ffd47c', '#ff9a38'); g.fill();
  g.lineWidth = 5; g.strokeStyle = dark; g.stroke();
  path(archOutline(1.6, 3.6, 1.6, 8), cx, 1);
  g.fillStyle = emit ? '#7a4a14' : '#5f3a12'; g.fill();
  g.strokeStyle = 'rgba(255,220,150,.6)'; g.lineWidth = 2; g.stroke();
  g.strokeStyle = dark; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, Y(1)); g.lineTo(cx, Y(5)); g.stroke();

  /* string course */
  g.fillStyle = emit ? 'rgb(140,96,40)' : '#f3d494'; g.fillRect(0, Y(10.6), W, .6 * PX);

  /* first-floor lancet pairs */
  [-1.75, 1.75].forEach((dx) => {
    path(archOutline(.75, 5.2, 1.5, 8), cx + dx * PX, 12);
    g.fillStyle = emit ? fillGrad(12, 19, '#fff0c0', '#ffc860') : fillGrad(12, 19, '#ffe08a', '#ffb650'); g.fill();
    g.lineWidth = 3; g.strokeStyle = dark; g.stroke();
    g.beginPath(); g.moveTo(cx + dx * PX, Y(12)); g.lineTo(cx + dx * PX, Y(17)); g.stroke();
  });
  /* quatrefoil */
  g.fillStyle = emit ? '#ffcf70' : '#ffd070';
  [[0, 21.4], [-.5, 21.4], [.5, 21.4], [0, 21.9], [0, 20.9]].forEach((q) => {
    g.beginPath(); g.arc(cx + q[0] * PX, Y(q[1]), .5 * PX, 0, TAU); g.fill();
  });
  g.strokeStyle = dark; g.lineWidth = 2; g.beginPath(); g.arc(cx, Y(21.4), .95 * PX, 0, TAU); g.stroke();
  /* second-floor small lancets */
  [-2.6, -.9, .9, 2.6].forEach((dx) => {
    path(archOutline(.42, 2.9, 1.5, 6), cx + dx * PX, 24.2);
    g.fillStyle = emit ? '#ffd78a' : '#ffd07a'; g.fill(); g.lineWidth = 2; g.strokeStyle = dark; g.stroke();
  });
  /* cornice + parapet */
  g.fillStyle = emit ? 'rgb(150,104,44)' : '#f6d590'; g.fillRect(0, Y(29.3), W, .9 * PX);
  g.fillStyle = dark;
  for (let x = 4; x < W; x += 14) g.fillRect(x, Y(29.3), 6, 5);
  for (let i = 0; i < 4; i++) {
    path(archOutline(.85, .7, 1.6, 5), 32 + i * 64, 30.4);
    g.lineWidth = 2; g.strokeStyle = dark; g.stroke();
  }
}

function drumPainter(g, w, h, emit) {
  g.fillStyle = emit ? '#2a1a08' : '#dfaa58'; g.fillRect(0, 0, w, h);
  if (!emit) {
    const gr = g.createLinearGradient(0, h, 0, 0); gr.addColorStop(0, '#f0c070'); gr.addColorStop(1, '#a87434'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  }
  const seg = w / 16;
  for (let i = 0; i < 16; i++) {
    const cx = i * seg + seg / 2, hw = seg * .18;
    g.beginPath();
    archOutline(hw, h * .48, 1.5, 8).forEach((p, j) => { const x = cx + p[0], y = h * .9 - p[1]; if (j) g.lineTo(x, y); else g.moveTo(x, y); });
    g.closePath();
    const gr = g.createLinearGradient(0, h * .9, 0, h * .12); gr.addColorStop(0, emit ? '#ffb850' : '#ff9d3a'); gr.addColorStop(1, emit ? '#fff0c0' : '#ffe08a');
    g.fillStyle = gr; g.fill(); g.lineWidth = 3; g.strokeStyle = 'rgba(74,44,14,.9)'; g.stroke();
  }
}

/* ------------------------------------------------------------------ materials */
function makeMaterials() {
  const facadeMap = canvasTex(256, 1152, (g, w, h) => paintFacade(g, w, h, 32, false), { repeat: true });
  const facadeEmit = canvasTex(256, 1152, (g, w, h) => paintFacade(g, w, h, 32, true), { repeat: true });
  const drumMap = canvasTex(1024, 256, (g, w, h) => drumPainter(g, w, h, false), { repeat: true });
  const drumEmit = canvasTex(1024, 256, (g, w, h) => drumPainter(g, w, h, true), { repeat: true });
  const cache = new Map();
  return {
    facadeMap, facadeEmit, drumMap, drumEmit,
    side(len, h) {
      const key = len.toFixed(2) + '|' + h.toFixed(2);
      if (cache.has(key)) return cache.get(key);
      const map = facadeMap.clone(), em = facadeEmit.clone();
      [map, em].forEach((t) => { t.repeat.set(len / 8, h / 36); t.needsUpdate = true; });
      const m = new THREE.MeshStandardMaterial({ map, emissiveMap: em, emissive: 0xffffff, emissiveIntensity: 1.5, roughness: .85, metalness: 0 });
      cache.set(key, m);
      return m;
    },
    stone: new THREE.MeshStandardMaterial({ color: 0xdcae62, emissive: 0x7a4a12, emissiveIntensity: .8, roughness: .7 }),
    stoneLight: new THREE.MeshStandardMaterial({ color: 0xf3d08e, emissive: 0x8a5a18, emissiveIntensity: .8, roughness: .7 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xf3c15a, emissive: 0xb07a1c, emissiveIntensity: .9, roughness: .4, metalness: .3, flatShading: true }),
    roof: new THREE.MeshStandardMaterial({ color: 0x33456b, roughness: .7, metalness: .15, flatShading: true, emissive: 0x101c34, emissiveIntensity: 1 }),
    dome: new THREE.MeshStandardMaterial({ color: 0xd9a24a, emissive: 0x8a5410, emissiveIntensity: 1, roughness: .55, metalness: .2, flatShading: true }),
    ground: new THREE.MeshStandardMaterial({ color: 0x1a2038, roughness: 1, emissive: 0x070a16 }),
    city: new THREE.MeshStandardMaterial({ color: 0x1d2745, roughness: 1, emissive: 0x0d1428 })
  };
}

/* ------------------------------------------------------------------ exterior */
function buildExterior(mobile) {
  const g = new THREE.Group();
  const M = makeMaterials();
  const glow = glowTexture();
  const updaters = [];

  const add = (o, x, y, z) => { if (x !== undefined) o.position.set(x, y, z); g.add(o); return o; };

  /* a lit block whose four walls carry the facade texture */
  function block(x0, x1, z0, z1, h, parent) {
    const L = x1 - x0, D = z1 - z0;
    const mats = [M.side(D, h), M.side(D, h), M.stone, M.stone, M.side(L, h), M.side(L, h)];
    const m = new THREE.Mesh(new THREE.BoxGeometry(L, h, D), mats);
    m.position.set((x0 + x1) / 2, h / 2, (z0 + z1) / 2);
    (parent || g).add(m);
    return m;
  }
  /* prism roofs: ridge along X or along Z */
  function roofX(x0, x1, z0, z1, y0, rise, mat) {
    const hw = (z1 - z0) / 2 + 1.2, s = new THREE.Shape();
    s.moveTo(-hw, 0); s.lineTo(hw, 0); s.lineTo(0, rise); s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, { depth: x1 - x0 + 2.4, bevelEnabled: false });
    geo.rotateY(Math.PI / 2);
    const m = new THREE.Mesh(geo, mat || M.roof);
    m.position.set(x0 - 1.2, y0, (z0 + z1) / 2);
    g.add(m);
    return m;
  }
  function roofZ(x0, x1, z0, z1, y0, rise, mat) {
    const hw = (x1 - x0) / 2 + 1.2, s = new THREE.Shape();
    s.moveTo(-hw, 0); s.lineTo(hw, 0); s.lineTo(0, rise); s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, { depth: z1 - z0 + 2.4, bevelEnabled: false });
    const m = new THREE.Mesh(geo, mat || M.roof);
    m.position.set((x0 + x1) / 2, y0, z0 - 1.2);
    g.add(m);
    return m;
  }
  function spire(x, y, z, r, shaft, cone) {
    const s = new THREE.Group();
    const sh = new THREE.Mesh(new THREE.CylinderGeometry(r * .72, r, shaft, 8), M.stone); sh.position.y = shaft / 2;
    const co = new THREE.Mesh(new THREE.ConeGeometry(r * 1.2, cone, 8), M.gold); co.position.y = shaft + cone / 2;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(r * .3, 8, 6), M.gold); ball.position.y = shaft + cone + r * .2;
    s.add(sh, co, ball); s.position.set(x, y, z); g.add(s);
    return s;
  }
  /* instanced pinnacles/buttresses */
  const pins = [], bux = [];

  /* ---------- ground: square (back), promenade, quay, river ---------- */
  const groundGeo = new THREE.PlaneGeometry(3200, 1500);
  groundGeo.rotateX(-Math.PI / 2);
  const ground = new THREE.Mesh(groundGeo, M.ground); ground.position.set(0, -.06, -710); g.add(ground); /* z -1460 .. 40 */
  const quay = new THREE.Mesh(new THREE.BoxGeometry(3200, 2.6, 3), new THREE.MeshStandardMaterial({ color: 0x252b3e, roughness: 1, emissive: 0x07090f }));
  quay.position.set(0, -1.3, 40.5); g.add(quay);
  /* lit promenade band in front of the building */
  const promGeo = new THREE.PlaneGeometry(300, 16); promGeo.rotateX(-Math.PI / 2);
  const prom = new THREE.Mesh(promGeo, new THREE.MeshBasicMaterial({ map: glow, color: 0x8a5a1c, transparent: true, opacity: .85, depthWrite: false, fog: false }));
  prom.position.set(0, .02, 32); g.add(prom);
  /* Kossuth square glow */
  const sqGeo = new THREE.PlaneGeometry(190, 130); sqGeo.rotateX(-Math.PI / 2);
  const sq = new THREE.Mesh(sqGeo, new THREE.MeshBasicMaterial({ map: glow, color: 0x6b4514, transparent: true, opacity: .8, depthWrite: false, fog: false }));
  sq.position.set(0, .02, -110); g.add(sq);

  /* river: dark water that glows gold under the floodlit facade */
  const waterMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying vec3 vW; void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: [
      'uniform float uTime; varying vec3 vW;',
      'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'void main(){',
      ' float d=max(vW.z-41.0,0.0);',
      ' float ax=abs(vW.x);',
      ' float prof=smoothstep(150.0,118.0,ax)*(0.55+0.45*exp(-pow(vW.x/70.0,2.0)));',
      ' float tall=exp(-pow(vW.x/30.0,2.0));',
      ' float w1=sin(vW.x*0.8+sin(vW.z*0.05-uTime*0.5)*4.0+uTime*0.3);',
      ' float w2=sin(vW.x*1.9+vW.z*0.04+uTime*0.9);',
      ' float crest=0.65+0.35*sin(vW.z*0.22-uTime*1.1+w1*2.0);',
      ' float stripe=pow(clamp(0.5+0.34*w1+0.16*w2,0.0,1.0),1.8)*crest;',
      ' float refl=prof*exp(-d*0.014)+tall*0.7*exp(-d*0.008);',
      ' vec3 base=vec3(0.006,0.011,0.030);',
      ' vec3 gold=vec3(1.0,0.58,0.16);',
      ' vec3 col=base+gold*refl*(0.18+1.1*stripe)*1.15;',
      ' float spark=step(0.985,h(floor(vec2(vW.x*0.5,vW.z*0.8)+floor(uTime*2.0))))*refl;',
      ' col+=vec3(1.0,0.8,0.5)*spark*0.8;',
      ' float dist=length(vW-cameraPosition);',
      ' float f=1.0-exp(-pow(0.0011*dist,2.0));',
      ' col=mix(col,vec3(0.0018,0.0030,0.0116),f);',
      ' gl_FragColor=vec4(col,1.0);',
      ' #include <tonemapping_fragment>',
      ' #include <colorspace_fragment>',
      '}'
    ].join('\n')
  });
  const waterGeo = new THREE.PlaneGeometry(3200, 1500); waterGeo.rotateX(-Math.PI / 2);
  const water = new THREE.Mesh(waterGeo, waterMat); water.position.set(0, -2.6, 42 + 750); g.add(water);
  updaters.push((t) => { waterMat.uniforms.uTime.value = t; });

  /* ---------- main masses ---------- */
  /* wings */
  block(-134, -42, -23, 23, 30); block(42, 134, -23, 23, 30);
  /* central hall block */
  block(-42, 42, -45, 30, 34);
  /* twin front towers: square base, flanking the front porch */
  [-24, 24].forEach((tx) => block(tx - 4.5, tx + 4.5, 26, 35, 42));
  block(-19.5, 19.5, 26, 34, 32);
  /* mid pavilions (x = +-62) and end pavilions (x = +-122) */
  [-1, 1].forEach((s) => {
    const mid = 62 * s, end = 122 * s;
    block(mid - 16, mid + 16, -27, 27.5, 35);
    roofZ(mid - 16, mid + 16, -27, 27.5, 35, 13);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach((c) => spire(mid + c[0] * 15, 35, c[1] > 0 ? 26.5 : -26, 1.1, 18, 8));
    block(end - 12, end + 12, -27, 27.5, 32);
    roofZ(end - 12, end + 12, -27, 27.5, 32, 10);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach((c) => spire(end + c[0] * 11, 32, c[1] > 0 ? 26.5 : -26, 1, 10, 7));
  });
  /* long wing roofs and central roof */
  [-1, 1].forEach((s) => roofX(s > 0 ? 42 : -134, s > 0 ? 134 : -42, -23, 23, 30, 11));
  roofX(-42, 42, -45, 30, 34, 8);
  /* gable of the front porch */
  roofZ(-19.5, 19.5, 26, 34, 32, 10);

  /* ---------- the great dome ---------- */
  const dome = new THREE.Group(); dome.position.set(0, 42, 0); g.add(dome);
  const drumMap = M.drumMap.clone(), drumEm = M.drumEmit.clone();
  const drumMat = new THREE.MeshStandardMaterial({ map: drumMap, emissiveMap: drumEm, emissive: 0xffffff, emissiveIntensity: 1.05, roughness: .8 });
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(17.5, 18.5, 14, 16, 1, true), drumMat); drum.position.y = 7;
  dome.add(drum);
  const cornice = new THREE.Mesh(new THREE.CylinderGeometry(19.3, 19.3, 1.6, 16), M.stoneLight); cornice.position.y = 14.5; dome.add(cornice);
  const profile = [];
  for (let i = 0; i <= 26; i++) {
    const t = i / 26, r = 17.4 * Math.pow(Math.cos(t * Math.PI / 2), .78) + .001;
    profile.push(new THREE.Vector2(r, 14.9 + t * 27));
  }
  const domeMesh = new THREE.Mesh(new THREE.LatheGeometry(profile, 16), M.dome); dome.add(domeMesh);
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * TAU, pts = profile.map((p) => new THREE.Vector3(Math.sin(a) * (p.x + .12), p.y, Math.cos(a) * (p.x + .12)));
    dome.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.slice(0, -1)), 30, .32, 5), M.gold));
    /* ring of pinnacles around the drum top */
    const px = Math.sin(a + Math.PI / 16) * 19.6, pz = Math.cos(a + Math.PI / 16) * 19.6;
    const pn = new THREE.Mesh(new THREE.ConeGeometry(.9, 8, 6), M.gold); pn.position.set(px, 19.2, pz); dome.add(pn);
  }
  const lant = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.2, 6, 12), drumMat); lant.position.y = 44.9; dome.add(lant);
  const top = new THREE.Mesh(new THREE.ConeGeometry(3.4, 10, 12), M.gold); top.position.y = 52.9; dome.add(top);
  const cross1 = new THREE.Mesh(new THREE.BoxGeometry(.35, 4.5, .35), M.gold); cross1.position.y = 60.4; dome.add(cross1);
  const cross2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, .35, .35), M.gold); cross2.position.y = 61.2; dome.add(cross2);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffa040, blending: THREE.AdditiveBlending, transparent: true, opacity: .35, depthWrite: false, fog: false }));
  halo.scale.set(120, 120, 1); halo.position.set(0, 26, 0); dome.add(halo);

  /* ---------- twin front towers ---------- */
  [-24, 24].forEach((tx) => {
    const t = new THREE.Group(); t.position.set(tx, 42, 30.5); g.add(t);
    const om = M.drumMap.clone(), oe = M.drumEmit.clone(); om.repeat.set(.5, 1); oe.repeat.set(.5, 1);
    const oct = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 10, 8, 1, true), new THREE.MeshStandardMaterial({ map: om, emissiveMap: oe, emissive: 0xffffff, emissiveIntensity: 1.05, roughness: .8 }));
    oct.position.y = 5; t.add(oct);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(5.1, 5.1, 1.2, 8), M.stoneLight); ring.position.y = 10.4; t.add(ring);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(4.6, 26, 8), M.dome); cone.position.y = 24; t.add(cone);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(.9, 8, 6), M.gold); ball.position.y = 37.4; t.add(ball);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach((c) => {
      const cs = new THREE.Mesh(new THREE.ConeGeometry(1, 9, 6), M.gold); cs.position.set(c[0] * 3.6, 5.5, c[1] * 3.6); t.add(cs);
    });
    const h2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffa040, blending: THREE.AdditiveBlending, transparent: true, opacity: .28, depthWrite: false, fog: false }));
    h2.scale.set(46, 46, 1); h2.position.y = 8; t.add(h2);
  });

  /* back towers */
  [-30, 30].forEach((tx) => { block(tx - 4, tx + 4, -45, -37, 38); spire(tx, 38, -41, 3.2, 8, 14); });

  /* ---------- buttresses & pinnacles along the wing facades ---------- */
  [-1, 1].forEach((s) => {
    for (let i = 0; i < 4; i++) {
      const x = s * (81 + i * 8.6);
      [[23.6, 1], [-23.6, -1]].forEach((z) => { bux.push([x, z[0]]); pins.push([x, 27, z[0]]); });
    }
    for (let i = 0; i < 3; i++) {
      const x = s * (45 + i * 6.5) + (s > 0 ? 0 : 0);
      [[23.6, 1], [-23.6, -1]].forEach((z) => { bux.push([x, z[0]]); pins.push([x, 27, z[0]]); });
    }
  });
  const bg = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 26, 1.8), M.stone, bux.length);
  bux.forEach((b, i) => { const m = new THREE.Matrix4().makeTranslation(b[0], 13, b[1]); bg.setMatrixAt(i, m); });
  g.add(bg);
  /* pinnacles on the eave line of the wings */
  for (let x = -132; x <= 132; x += 4.2) { if (Math.abs(x) < 44) continue; pins.push([x, 30.4, 22.5], [x, 30.4, -22.5]); }
  const pg = new THREE.InstancedMesh(new THREE.ConeGeometry(.6, 4, 6), M.gold, pins.length);
  pins.forEach((p, i) => pg.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p[0], p[1] + 2, p[2])));
  g.add(pg);
  /* cornices */
  [[-134, -42], [42, 134]].forEach((r) => {
    [23.5, -23.5].forEach((z) => {
      const c = new THREE.Mesh(new THREE.BoxGeometry(r[1] - r[0], 1.1, 1.6), M.stoneLight); c.position.set((r[0] + r[1]) / 2, 29.6, z); g.add(c);
    });
  });

  /* ---------- back: entrance portico, grand stairs, lions, flags ---------- */
  block(-24, 24, -52, -45, 27);
  roofZ(-24, 24, -52, -45, 27, 9);
  const doorGeo = archPanel(12, 14, .6, [{ cx: 0, y0: 0, hw: 4, spring: 6.4, k: 1.5 }]);
  const doorFrame = new THREE.Mesh(doorGeo, M.stoneLight); doorFrame.position.set(0, 0, -52.4); doorFrame.rotation.y = Math.PI; g.add(doorFrame);
  const doorGlow = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 13), new THREE.MeshBasicMaterial({ color: 0xffb04a })); doorGlow.position.set(0, 6.5, -52.1); doorGlow.rotation.y = Math.PI; g.add(doorGlow);
  const stairsInst = new THREE.InstancedMesh(new THREE.BoxGeometry(46, .2, 2), M.stoneLight, 8);
  for (let i = 0; i < 8; i++) stairsInst.setMatrixAt(i, new THREE.Matrix4().makeTranslation(0, (8 - i) * .18 - .1, -53 - i * 2));
  g.add(stairsInst);
  [-20, 20].forEach((lx) => {
    const lion = new THREE.Group();
    const pl = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 7), M.stone); pl.position.y = 1.5; lion.add(pl);
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 5), M.gold); body.position.y = 4.2; lion.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 6), M.gold); head.position.set(0, 5.3, 2.7); lion.add(head);
    lion.position.set(lx, 0, -62); g.add(lion);
  });
  /* flags */
  const flagTex = canvasTex(64, 48, (c, w, h) => { c.fillStyle = '#ce2939'; c.fillRect(0, 0, w, h / 3); c.fillStyle = '#f4f4f0'; c.fillRect(0, h / 3, w, h / 3); c.fillStyle = '#477050'; c.fillRect(0, 2 * h / 3, w, h / 3); });
  const flags = [];
  [-34, 0, 34].forEach((fx) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.18, .22, 34, 6), M.gold); pole.position.set(fx, 17, -82); g.add(pole);
    const geo = new THREE.PlaneGeometry(9, 6, 16, 8); geo.translate(4.5, 0, 0);
    const fm = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: flagTex, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: flagTex, emissiveIntensity: .35, roughness: 1 }));
    fm.position.set(fx + .2, 30, -82); g.add(fm);
    flags.push({ mesh: fm, base: geo.attributes.position.array.slice(), phase: fx * .3 });
  });
  updaters.push((t) => {
    flags.forEach((f) => {
      const pos = f.mesh.geometry.attributes.position, a = pos.array;
      for (let i = 0; i < a.length; i += 3) {
        const x = f.base[i], y = f.base[i + 1];
        a[i + 2] = Math.sin(x * .9 - t * 3.2 + y * .5 + f.phase) * .9 * (x / 9);
        a[i + 1] = y + Math.sin(x * .7 - t * 2.4 + f.phase) * .25 * (x / 9);
      }
      pos.needsUpdate = true;
    });
  });

  /* ---------- lamps along the promenade + glow points ---------- */
  const lampPts = [], lampCol = [];
  for (let x = -260; x <= 260; x += 9) { lampPts.push(x, 3.4, 37); lampCol.push(1, .72, .38); }
  for (let z = -60; z >= -240; z -= 12) { [-70, -46, 46, 70].forEach((x) => { lampPts.push(x, 3.4, z); lampCol.push(1, .72, .38); }); }
  const lampGeo = new THREE.BufferGeometry();
  lampGeo.setAttribute('position', new THREE.Float32BufferAttribute(lampPts, 3));
  lampGeo.setAttribute('color', new THREE.Float32BufferAttribute(lampCol, 3));
  g.add(new THREE.Points(lampGeo, new THREE.PointsMaterial({ size: 5, map: glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));

  /* ---------- surroundings: Pest behind, Buda across the river, a bridge ---------- */
  const nCity = mobile ? 110 : 230;
  const cityM = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), M.city, nCity);
  const winPts = [], winCol = [];
  for (let i = 0; i < nCity; i++) {
    const w = 16 + R() * 26, d = 16 + R() * 26, h = 14 + R() * 34;
    let x, z;
    for (let tries = 0; tries < 20; tries++) {
      const side = R();
      if (side < .6) { x = (R() - .5) * 1400; z = -280 - R() * 560; }
      else { x = (R() < .5 ? -1 : 1) * (175 + R() * 520); z = -230 + R() * 240; }
      if (!(Math.abs(x) < 230 && z > -330) && !(z > 8 && Math.abs(x) < 400)) break;
    }
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, h / 2, z), new THREE.Quaternion(), new THREE.Vector3(w, h, d));
    cityM.setMatrixAt(i, m);
    for (let k = 0; k < 9; k++) {
      winPts.push(x + (R() - .5) * w, 2 + R() * (h - 3), z + d / 2 + .3);
      const c = .5 + R() * .5; winCol.push(1, .78 * c, .4 * c);
    }
  }
  g.add(cityM);
  const winGeo = new THREE.BufferGeometry();
  winGeo.setAttribute('position', new THREE.Float32BufferAttribute(winPts, 3));
  winGeo.setAttribute('color', new THREE.Float32BufferAttribute(winCol, 3));
  g.add(new THREE.Points(winGeo, new THREE.PointsMaterial({ size: 2.4, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: true })));

  /* Buda hills and castle */
  const hillShape = new THREE.Shape();
  hillShape.moveTo(-1600, 0);
  for (let x = -1600; x <= 1600; x += 100) hillShape.lineTo(x, 40 + 60 * Math.sin(x * .004 + 1) + 30 * Math.sin(x * .011) + (Math.abs(x - 260) < 320 ? 50 : 0));
  hillShape.lineTo(1600, 0); hillShape.closePath();
  const hills = new THREE.Mesh(new THREE.ShapeGeometry(hillShape), new THREE.MeshBasicMaterial({ color: 0x080d1c, side: THREE.DoubleSide }));
  hills.position.set(0, -2, 760); hills.rotation.y = Math.PI; g.add(hills);
  const castleMap = M.side(220, 30);
  const castle = new THREE.Mesh(new THREE.BoxGeometry(220, 30, 40), [castleMap, castleMap, M.stone, M.stone, castleMap, castleMap]);
  castle.position.set(-260, 100, 700); g.add(castle);
  const cdome = new THREE.Mesh(new THREE.SphereGeometry(20, 14, 8, 0, TAU, 0, Math.PI / 2), M.dome); cdome.position.set(-260, 115, 700); g.add(cdome);
  const budaLights = [], budaCol = [];
  for (let x = -1400; x <= 1400; x += 14) { budaLights.push(x, 4, 690 + R() * 20); budaCol.push(1, .7, .35); }
  const budaGeo = new THREE.BufferGeometry();
  budaGeo.setAttribute('position', new THREE.Float32BufferAttribute(budaLights, 3));
  budaGeo.setAttribute('color', new THREE.Float32BufferAttribute(budaCol, 3));
  g.add(new THREE.Points(budaGeo, new THREE.PointsMaterial({ size: 9, map: glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));
  /* bridge */
  const deck = new THREE.Mesh(new THREE.BoxGeometry(14, 3, 660), new THREE.MeshStandardMaterial({ color: 0x1b2135, roughness: 1, emissive: 0x080b14 }));
  deck.position.set(-540, 8, 380); g.add(deck);
  const bpts = [];
  for (let z = 60; z <= 690; z += 10) { bpts.push(-546.5, 11, z, -533.5, 11, z); }
  for (let z = 90; z <= 650; z += 110) {
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, 12, 8), M.stone); pier.position.set(-540, 1, z); g.add(pier);
  }
  const bGeo = new THREE.BufferGeometry(); bGeo.setAttribute('position', new THREE.Float32BufferAttribute(bpts, 3));
  g.add(new THREE.Points(bGeo, new THREE.PointsMaterial({ size: 6, map: glow, color: 0xffc46a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));

  /* ---------- the sightseeing boat ---------- */
  const boat = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(36, 3, 7.5), new THREE.MeshStandardMaterial({ color: 0x1b2544, roughness: .6, emissive: 0x0a1020 })); hull.position.y = .2; boat.add(hull);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(24, 3.2, 6), new THREE.MeshStandardMaterial({ color: 0xe6eaf2, roughness: .6, emissive: 0x30364a })); cab.position.y = 3.3; boat.add(cab);
  const strip = new THREE.Mesh(new THREE.BoxGeometry(24.4, 1.5, 6.3), new THREE.MeshBasicMaterial({ color: 0xffd58a })); strip.position.y = 3.5; boat.add(strip);
  const upper = new THREE.Mesh(new THREE.BoxGeometry(13, 2.4, 4.6), new THREE.MeshStandardMaterial({ color: 0xe6eaf2, emissive: 0x30364a })); upper.position.y = 6.1; boat.add(upper);
  const bh = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffc46a, blending: THREE.AdditiveBlending, transparent: true, opacity: .55, depthWrite: false, fog: false })); bh.scale.set(52, 22, 1); bh.position.y = 3; boat.add(bh);
  boat.position.set(0, -2.2, 88); g.add(boat);
  updaters.push((t) => {
    const p = ((t * 3.6 + 330) % 720) - 360; boat.position.x = p; boat.position.y = -2.0 + Math.sin(t * .9) * .18; boat.rotation.z = Math.sin(t * .7) * .012;
  });

  /* ---------- searchlights sweeping the sky ---------- */
  const beams = [];
  [-62, 62].forEach((bx, i) => {
    const bgm = new THREE.ConeGeometry(16, 320, 20, 1, true); bgm.rotateX(Math.PI); bgm.translate(0, 160, 0);
    const beam = new THREE.Mesh(bgm, new THREE.MeshBasicMaterial({ color: 0xcfe0ff, transparent: true, opacity: .045, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));
    const pivot = new THREE.Group(); pivot.position.set(bx, 48, 0); pivot.add(beam); g.add(pivot); beams.push({ pivot, i });
  });
  updaters.push((t) => beams.forEach((b) => { b.pivot.rotation.z = Math.sin(t * .27 + b.i * 2.1) * .32 + (b.i ? -.18 : .18); b.pivot.rotation.x = Math.cos(t * .19 + b.i) * .3; }));

  /* ---------- fireworks over the Danube ---------- */
  const FW = mobile ? 0 : 1100;
  let fw = null;
  if (FW) {
    const pos = new Float32Array(FW * 3), col = new Float32Array(FW * 3), vel = new Float32Array(FW * 3), life = new Float32Array(FW);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 4.2, map: glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    pts.frustumCulled = false; g.add(pts);
    fw = { pos, col, vel, life, geo, next: 3, head: 0, base: new Float32Array(FW * 3) };
    fw.burst = (cx, cy, cz, r, gc, b) => {
      for (let n = 0; n < 220; n++) {
        const i = fw.head; fw.head = (fw.head + 1) % FW;
        const th = R() * TAU, ph = Math.acos(2 * R() - 1), sp = 24 + R() * 22;
        pos[i * 3] = cx; pos[i * 3 + 1] = cy; pos[i * 3 + 2] = cz;
        vel[i * 3] = Math.sin(ph) * Math.cos(th) * sp; vel[i * 3 + 1] = Math.cos(ph) * sp; vel[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * sp;
        fw.base[i * 3] = r; fw.base[i * 3 + 1] = gc; fw.base[i * 3 + 2] = b; life[i] = 1.6 + R() * .5;
      }
    };
    updaters.push((t, dt, active) => {
      if (!active) return;
      fw.next -= dt;
      if (fw.next < 0) {
        fw.next = 3.5 + R() * 5;
        const pal = [[1, .3, .3], [.4, .8, 1], [1, .85, .3], [.6, 1, .5], [1, .5, 1]][Math.floor(R() * 5)];
        fw.burst((R() - .5) * 340, 95 + R() * 70, 150 + R() * 150, pal[0], pal[1], pal[2]);
      }
      for (let i = 0; i < FW; i++) {
        if (life[i] <= 0) { col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = 0; continue; }
        life[i] -= dt; vel[i * 3 + 1] -= 16 * dt;
        const k = Math.max(0, life[i]) / 2.0;
        pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        vel[i * 3] *= .985; vel[i * 3 + 2] *= .985;
        col[i * 3] = fw.base[i * 3] * k; col[i * 3 + 1] = fw.base[i * 3 + 1] * k; col[i * 3 + 2] = fw.base[i * 3 + 2] * k;
      }
      geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
    });
  }

  /* ---------- lights ---------- */
  g.add(new THREE.HemisphereLight(0x4a5fae, 0x0d0b18, 1.0));
  const key = new THREE.DirectionalLight(0xffc27a, 2.2); key.position.set(-60, 40, 220); g.add(key);
  const back = new THREE.DirectionalLight(0xffb066, 1.7); back.position.set(40, 40, -220); g.add(back);
  const side = new THREE.DirectionalLight(0xffb066, .9); side.position.set(300, 60, 0); g.add(side);
  const side2 = new THREE.DirectionalLight(0xffb066, .9); side2.position.set(-300, 60, 0); g.add(side2);

  return { group: g, update(t, dt, active) { updaters.forEach((u) => u(t, dt, active)); } };
}

/* ------------------------------------------------------------------ interior */
function buildInterior(mobile) {
  const g = new THREE.Group(); g.position.set(OFF, 0, 0);
  const glow = glowTexture();
  const marble = new THREE.MeshStandardMaterial({ color: 0xe8d8b0, roughness: .5, emissive: 0x3a2a14, emissiveIntensity: .7 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xf2c65e, emissive: 0xb07a1c, emissiveIntensity: 1.1, roughness: .35, metalness: .35 });
  const bronze = new THREE.MeshStandardMaterial({ color: 0xb98a3c, emissive: 0x5a3a0a, emissiveIntensity: .8, roughness: .5, metalness: .3 });
  const updaters = [];

  /* vault texture: blue with golden shells and stars, one panel per 1/16 */
  const vaultPaint = (emit) => (c, w, h) => {
    c.fillStyle = emit ? '#0b0f26' : '#16256a'; c.fillRect(0, 0, w, h);
    c.strokeStyle = emit ? '#ffcf70' : '#f2c65e'; c.lineWidth = 3;
    for (let y = 30; y < h; y += 48) {
      for (let x = 0; x < w; x += 64) { c.beginPath(); c.arc(x + (y / 48 % 2) * 32, y, 22, 0, Math.PI, true); c.stroke(); }
    }
    c.fillStyle = emit ? '#ffe9a8' : '#ffd77a';
    for (let i = 0; i < 40; i++) { c.beginPath(); c.arc(R() * w, R() * h, 1.5 + R() * 2, 0, TAU); c.fill(); }
  };
  const vaultMap = canvasTex(256, 512, vaultPaint(false), { repeat: true });
  const vaultEm = canvasTex(256, 512, vaultPaint(true), { repeat: true });
  [vaultMap, vaultEm].forEach((t) => t.repeat.set(16, 1));
  const vaultMat = new THREE.MeshStandardMaterial({ map: vaultMap, emissiveMap: vaultEm, emissive: 0xffffff, emissiveIntensity: .9, roughness: .8, side: THREE.DoubleSide });

  /* ---- floor of the domed hall ---- */
  const floorTex = canvasTex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#e7d9b6'; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(120,90,40,.25)'; c.lineWidth = 1;
    for (let i = 0; i <= 16; i++) { c.beginPath(); c.moveTo(i * 64, 0); c.lineTo(i * 64, h); c.moveTo(0, i * 64); c.lineTo(w, i * 64); c.stroke(); }
    const cx = w / 2, cy = h / 2;
    [[470, '#7a1414'], [430, '#e7d9b6'], [420, '#c99a3a'], [330, '#7a1414'], [300, '#e7d9b6'], [290, '#c99a3a']].forEach((r) => { c.fillStyle = r[1]; c.beginPath(); c.arc(cx, cy, r[0], 0, TAU); c.fill(); });
    c.fillStyle = '#c99a3a';
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * TAU; c.beginPath(); c.moveTo(cx + Math.cos(a - .09) * 60, cy + Math.sin(a - .09) * 60);
      c.lineTo(cx + Math.cos(a) * 285, cy + Math.sin(a) * 285); c.lineTo(cx + Math.cos(a + .09) * 60, cy + Math.sin(a + .09) * 60); c.fill();
    }
    c.fillStyle = '#7a1414'; c.beginPath(); c.arc(cx, cy, 70, 0, TAU); c.fill(); c.fillStyle = '#e7d9b6'; c.beginPath(); c.arc(cx, cy, 52, 0, TAU); c.fill();
  });
  const floorGeo = new THREE.CircleGeometry(15.4, 64); floorGeo.rotateX(-Math.PI / 2);
  const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ map: floorTex, roughness: .28, metalness: .1 })); floor.position.y = 0; g.add(floor);

  /* ---- 16 piers, statues, arched wall panels ---- */
  const HALL_R = 14.2, WALL_H = 16;
  const apothem = HALL_R * Math.cos(Math.PI / 16);
  const chord = 2 * HALL_R * Math.sin(Math.PI / 16);
  const panelGeo = archPanel(chord, WALL_H, .9, [
    { cx: 0, y0: 0, hw: 1.55, spring: 6.4, k: 1.5 },
    { cx: -1.05, y0: 11, hw: .42, spring: 2.2, k: 1.5 },
    { cx: 1.05, y0: 11, hw: .42, spring: 2.2, k: 1.5 }
  ]);
  const backGlow = new THREE.MeshBasicMaterial({ color: 0xffa640 });
  for (let j = 0; j < 16; j++) {
    const phi = j / 16 * TAU, ux = Math.sin(phi), uz = -Math.cos(phi);
    const p = new THREE.Mesh(panelGeo, marble); p.position.set(ux * apothem, 0, uz * apothem); p.rotation.y = -phi; g.add(p);
    if (j !== 0) { /* every arch except the staircase door glows */
      const bgp = new THREE.Mesh(new THREE.PlaneGeometry(chord * .9, WALL_H), backGlow);
      bgp.position.set(ux * (apothem + 1.4), WALL_H / 2, uz * (apothem + 1.4)); bgp.rotation.y = -phi; g.add(bgp);
    }
    /* pier + statue at the vertex between panels */
    const th = (j + .5) / 16 * TAU, px = Math.sin(th) * HALL_R, pz = -Math.cos(th) * HALL_R;
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(.75, .9, 18, 10), marble); pier.position.set(px, 9, pz); g.add(pier);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.25, .8, 1.4, 10), gold); cap.position.set(px, 16.4, pz); g.add(cap);
    const band = new THREE.Mesh(new THREE.TorusGeometry(.95, .09, 6, 14), gold); band.rotation.x = Math.PI / 2; band.position.set(px, 9, pz); g.add(band);
    const sx = Math.sin(th) * (HALL_R - 1.5), sz = -Math.cos(th) * (HALL_R - 1.5);
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.6, 1.1), marble); plinth.position.set(sx, 1.8, sz); plinth.rotation.y = -th; g.add(plinth);
    const fig = new THREE.Mesh(new THREE.CapsuleGeometry(.34, 1.5, 4, 8), bronze); fig.position.set(sx, 5.0, sz); g.add(fig);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.28, 8, 6), bronze); head.position.set(sx, 6.2, sz); g.add(head);
  }
  const ringC = new THREE.Mesh(new THREE.TorusGeometry(HALL_R + .5, .22, 6, 64), gold); ringC.rotation.x = Math.PI / 2; ringC.position.y = WALL_H; g.add(ringC);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(HALL_R + .5, .16, 6, 64), gold); ringB.rotation.x = Math.PI / 2; ringB.position.y = 10.4; g.add(ringB);

  /* ---- vault ---- */
  const vp = [];
  for (let i = 0; i <= 26; i++) {
    const t = i / 26, r = (HALL_R + .6) * Math.pow(Math.cos(t * Math.PI / 2), .82);
    if (r < 1.9) break;
    vp.push(new THREE.Vector2(r, WALL_H + t * 22));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(vp, 16), vaultMat));
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * TAU + Math.PI / 16;
    const pts = vp.map((p) => new THREE.Vector3(Math.sin(a) * (p.x - .1), p.y, -Math.cos(a) * (p.x - .1)));
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 30, .24, 5), gold));
  }
  const top = vp[vp.length - 1];
  const oculus = new THREE.Mesh(new THREE.CircleGeometry(top.x, 20), new THREE.MeshBasicMaterial({ color: 0xdfe9ff, side: THREE.DoubleSide }));
  oculus.rotation.x = Math.PI / 2; oculus.position.y = top.y + .02; g.add(oculus);
  const shaftGeo = new THREE.CylinderGeometry(top.x, 4.2, top.y, 24, 1, true); shaftGeo.translate(0, top.y / 2, 0);
  const shaft = new THREE.Mesh(shaftGeo, new THREE.MeshBasicMaterial({ color: 0xbfd6ff, transparent: true, opacity: .09, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  g.add(shaft);
  const og = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xcfe0ff, blending: THREE.AdditiveBlending, transparent: true, opacity: .8, depthWrite: false })); og.scale.set(14, 14, 1); og.position.y = top.y - 1; g.add(og);

  /* ---- the Holy Crown on its pedestal ---- */
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 1.2, 20), marble); ped.position.y = .6; g.add(ped);
  const pedTop = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, .18, 20), gold); pedTop.position.y = 1.29; g.add(pedTop);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 1.5), new THREE.MeshStandardMaterial({ color: 0xbfd8ff, transparent: true, opacity: .16, roughness: .05, depthWrite: false }));
  glass.position.y = 2.05; g.add(glass);
  const crown = new THREE.Group(); crown.position.y = 1.7; g.add(crown);
  const cband = new THREE.Mesh(new THREE.CylinderGeometry(.36, .38, .17, 24), gold); crown.add(cband);
  [0, Math.PI / 2].forEach((ry) => { const a = new THREE.Mesh(new THREE.TorusGeometry(.35, .03, 6, 20, Math.PI), gold); a.rotation.y = ry; a.position.y = .08; crown.add(a); });
  const cx1 = new THREE.Mesh(new THREE.BoxGeometry(.035, .2, .035), gold); cx1.position.y = .5; crown.add(cx1);
  const cx2 = new THREE.Mesh(new THREE.BoxGeometry(.12, .035, .035), gold); cx2.position.y = .53; crown.add(cx2);
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU, gm = new THREE.Mesh(new THREE.SphereGeometry(.035, 6, 5), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff3344 : 0x4aa8ff }));
    gm.position.set(Math.cos(a) * .375, 0, Math.sin(a) * .375); crown.add(gm);
  }
  const cg = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffc860, blending: THREE.AdditiveBlending, transparent: true, opacity: .8, depthWrite: false })); cg.scale.set(5, 5, 1); cg.position.y = 1.9; g.add(cg);
  updaters.push((t) => { crown.rotation.y = t * .5; cg.material.opacity = .65 + Math.sin(t * 2) * .12; });

  /* carpet from the centre to the staircase door */
  const carpetTex = canvasTex(128, 512, (c, w, h) => {
    c.fillStyle = '#7d1616'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e2b34c'; c.lineWidth = 8; c.strokeRect(8, 0, w - 16, h);
    c.lineWidth = 3; c.strokeRect(22, 0, w - 44, h);
    c.fillStyle = '#e2b34c'; for (let y = 20; y < h; y += 44) { c.beginPath(); c.arc(w / 2, y, 9, 0, TAU); c.fill(); }
  });
  const carpetGeo = new THREE.PlaneGeometry(4.6, 15); carpetGeo.rotateX(-Math.PI / 2);
  const carpet = new THREE.Mesh(carpetGeo, new THREE.MeshStandardMaterial({ map: carpetTex, roughness: .9 })); carpet.position.set(0, .03, -7.6); carpet.rotation.y = 0; g.add(carpet);

  /* ---- grand staircase (z = -50 .. -14, rising 8 m) ---- */
  const STEPS = 32, RISE = .25;
  const steps = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), marble, STEPS);
  for (let i = 0; i < STEPS; i++) {
    const hh = (i + 1) * RISE + .2;
    steps.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(0, -8.2 + hh / 2, -46 + i + .5), new THREE.Quaternion(), new THREE.Vector3(13, hh, 1)));
  }
  g.add(steps);
  const landing = new THREE.Mesh(new THREE.BoxGeometry(13, .4, 8), marble); landing.position.set(0, -8.2, -50); g.add(landing);
  const slope = Math.atan2(8, 32), slen = Math.hypot(32, 8);
  const scTex = canvasTex(128, 512, (c, w, h) => {
    c.fillStyle = '#8a1818'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e2b34c'; c.lineWidth = 7; c.strokeRect(6, 0, w - 12, h);
  });
  const sc = new THREE.Mesh(new THREE.PlaneGeometry(5, slen), new THREE.MeshStandardMaterial({ map: scTex, roughness: .9 }));
  sc.rotation.x = -Math.PI / 2 - slope; sc.position.set(0, -4 + .27, -30); g.add(sc);
  /* side arcades, vaulted ceiling, balustrades */
  const sideGeo = archPanel(4, 16, .8, [{ cx: 0, y0: 0, hw: 1.5, spring: 6.4, k: 1.5 }, { cx: 0, y0: 10.6, hw: .7, spring: 2.6, k: 1.5 }]);
  for (let i = 0; i < 9; i++) {
    [-1, 1].forEach((sd) => {
      const p = new THREE.Mesh(sideGeo, marble); p.position.set(sd * 6.9, -8 + i, -46 + i * 4); p.rotation.y = -sd * Math.PI / 2; g.add(p);
      const bgp = new THREE.Mesh(new THREE.PlaneGeometry(4, 16), backGlow); bgp.position.set(sd * 8.6, p.position.y + 8, p.position.z); bgp.rotation.y = -sd * Math.PI / 2; g.add(bgp);
    });
  }
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 36, 28, 1, true, Math.PI / 2, Math.PI), vaultMat.clone());
  barrel.material.map = vaultMap.clone(); barrel.material.map.repeat.set(1, 6); barrel.material.map.needsUpdate = true;
  barrel.material.emissiveMap = vaultEm.clone(); barrel.material.emissiveMap.repeat.set(1, 6); barrel.material.emissiveMap.needsUpdate = true;
  barrel.rotation.x = Math.PI / 2; barrel.position.set(0, 14, -32); g.add(barrel);
  [-1, 1].forEach((sd) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.18, .18, slen), gold); rail.rotation.x = -slope; rail.position.set(sd * 2.7, -4 + 1.3, -30); g.add(rail);
    for (let i = 0; i <= 16; i++) { const post = new THREE.Mesh(new THREE.BoxGeometry(.14, 1.05, .14), gold); post.position.set(sd * 2.7, -8 + i * 2 * RISE + .75, -46 + i * 2); g.add(post); }
  });
  /* hanging lamps along the staircase and the hall */
  const lampPos = [[-3, 9, -44], [3, 9, -38], [-3, 11, -32], [3, 11, -26], [-3, 12, -20]];
  const lg = new THREE.Group(); g.add(lg);
  lampPos.forEach((lp) => {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.5, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffe0a0 })); bulb.position.set(lp[0], lp[1], lp[2]); lg.add(bulb);
    const chain = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, 4, 4), gold); chain.position.set(lp[0], lp[1] + 2.3, lp[2]); lg.add(chain);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffc866, blending: THREE.AdditiveBlending, transparent: true, opacity: .7, depthWrite: false })); s.scale.set(6, 6, 1); s.position.set(lp[0], lp[1], lp[2]); lg.add(s);
  });
  /* big stained-glass window at the foot of the stairs */
  const glassTex = canvasTex(256, 384, (c, w, h) => {
    c.fillStyle = '#1a2a70'; c.fillRect(0, 0, w, h);
    const cols = ['#e03a3a', '#f2c65e', '#3a7ae0', '#3aa86a', '#e07a3a'];
    for (let y = 0; y < h; y += 48) for (let x = 0; x < w; x += 48) { c.fillStyle = cols[Math.floor(R() * cols.length)]; c.fillRect(x + 3, y + 3, 42, 42); }
    c.strokeStyle = '#161006'; c.lineWidth = 5; c.strokeRect(2, 2, w - 4, h - 4);
  });
  const win = new THREE.Mesh(new THREE.PlaneGeometry(10, 15), new THREE.MeshBasicMaterial({ map: glassTex }));
  win.position.set(0, -8 + 8.5, -53.9); g.add(win);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(16, 26, 1), marble); wall.position.set(0, 2, -54.5); g.add(wall);
  const ceilFlat = new THREE.Mesh(new THREE.PlaneGeometry(16, 40), new THREE.MeshStandardMaterial({ color: 0x2a2018 })); ceilFlat.rotation.x = Math.PI / 2; ceilFlat.position.set(0, 24, -34); g.add(ceilFlat);

  /* ---- dust drifting in the light ---- */
  const nDust = mobile ? 120 : 320, dp = new Float32Array(nDust * 3);
  for (let i = 0; i < nDust; i++) { dp[i * 3] = (R() - .5) * 20; dp[i * 3 + 1] = R() * 30; dp[i * 3 + 2] = (R() - .5) * 20; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ size: .18, color: 0xffe8b8, transparent: true, opacity: .7, depthWrite: false, blending: THREE.AdditiveBlending }));
  g.add(dust);
  updaters.push((t, dt) => {
    for (let i = 0; i < nDust; i++) { dp[i * 3 + 1] += dt * (.25 + (i % 5) * .05); dp[i * 3] += Math.sin(t * .4 + i) * dt * .12; if (dp[i * 3 + 1] > 30) dp[i * 3 + 1] = 0; }
    dg.attributes.position.needsUpdate = true;
  });

  /* ---- lights ---- */
  g.add(new THREE.HemisphereLight(0xffe4b8, 0x3a2010, .9));
  const hallL = new THREE.PointLight(0xffd08a, 900, 70, 1.6); hallL.position.set(0, 13, 0); g.add(hallL);
  const crownL = new THREE.PointLight(0xffc860, 260, 24, 1.8); crownL.position.set(0, 3, 0); g.add(crownL);
  const stairL = new THREE.PointLight(0xffc477, 700, 60, 1.6); stairL.position.set(0, 8, -32); g.add(stairL);
  const stairL2 = new THREE.PointLight(0xffb060, 700, 40, 1.6); stairL2.position.set(0, 4, -44); g.add(stairL2);

  return { group: g, update(t, dt) { updaters.forEach((u) => u(t, dt)); } };
}

/* ------------------------------------------------------------------ camera path */
/* waypoints: [page progress, position, look-at, fov]; progress 0..6 = hero, vitrine,
   prix, services, à propos, FAQ, contact (see PARL_STOPS in the page). */
const PATH_A = [
  [0, [0, 26, 190], [0, 100, 0], 40],
  [1, [-172, 58, 190], [0, 40, 0], 44],
  [2, [-104, 17, 86], [-70, 31, 0], 46],
  [3, [12, 124, 88], [0, 56, -6], 48],
  [3.5, [205, 84, -20], [0, 44, 0], 46],
  [4, [66, 30, -168], [0, 30, -44], 44],
  [4.6, [0, 7, -104], [0, 9, -52], 52]
];
const PATH_I = [
  [4.66, [OFF, -6.2, -47.5], [OFF, -1, -26], 62],
  [4.85, [OFF, -3.0, -33], [OFF, 4, -12], 62],
  [5.0, [OFF, .7, -19], [OFF, 11, 4], 66],
  [5.3, [OFF, 5.5, -7], [OFF, 26, 2], 72],
  [5.65, [OFF + 3.5, 3.2, 5], [OFF, 1.4, 0], 52]
];
const PATH_C = [
  [5.75, [38, 2.8, 142], [6, 28, 24], 52],
  [6.0, [-6, 30, 214], [0, 46, 0], 40]
];
const CUT1 = 4.63, CUT2 = 5.72, CUTW = .07;

function cr(p0, p1, p2, p3, u) {
  const u2 = u * u, u3 = u2 * u;
  return .5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
}
function samplePath(path, prog, out) {
  const n = path.length;
  if (prog <= path[0][0]) { out.p.set(...path[0][1]); out.t.set(...path[0][2]); out.fov = path[0][3]; return; }
  if (prog >= path[n - 1][0]) { out.p.set(...path[n - 1][1]); out.t.set(...path[n - 1][2]); out.fov = path[n - 1][3]; return; }
  let k = 0;
  while (k < n - 2 && prog > path[k + 1][0]) k++;
  const u = (prog - path[k][0]) / (path[k + 1][0] - path[k][0]);
  const a = path[Math.max(0, k - 1)], b = path[k], c = path[k + 1], d = path[Math.min(n - 1, k + 2)];
  for (let i = 0; i < 3; i++) {
    out.p.setComponent(i, cr(a[1][i], b[1][i], c[1][i], d[1][i], u));
    out.t.setComponent(i, cr(a[2][i], b[2][i], c[2][i], d[2][i], u));
  }
  out.fov = b[3] + (c[3] - b[3]) * u;
}

/* ------------------------------------------------------------------ public API */
export function createParliament(canvas, opts) {
  opts = opts || {};
  const mobile = !!opts.mobile;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060a1c, .0011);
  const camera = new THREE.PerspectiveCamera(40, 1, .5, 6000);
  const ext = buildExterior(mobile), inn = buildInterior(mobile);
  scene.add(ext.group, inn.group);

  const pose = { p: new THREE.Vector3(), t: new THREE.Vector3(), fov: 40 };
  const tmp = { p: new THREE.Vector3(), t: new THREE.Vector3(), fov: 40 };
  const state = { W: 1, H: 1, last: 0, fade: 1, inInterior: false, dbg: null };
  let meteor = null, nextMeteor = 4;
  const meteorTex = canvasTex(128, 8, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.85, 'rgba(210,225,255,.8)'); gr.addColorStop(1, 'rgba(255,255,255,1)');
    c.fillStyle = gr; c.fillRect(0, h / 2 - 1.5, w, 3);
  });
  const meteorMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: meteorTex, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, fog: false }));
  meteorMesh.visible = false; meteorMesh.renderOrder = 10; scene.add(meteorMesh);

  function resize(w, h, dpr) {
    state.W = w; state.H = h;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render(now, prog, o) {
    o = o || {};
    const t = now / 1000, dt = Math.min(.05, state.last ? t - state.last : .016); state.last = t;
    let interior, fade = 1;
    if (state.dbg) {
      pose.p.set(...state.dbg.p); pose.t.set(...state.dbg.t); pose.fov = state.dbg.fov || 45; interior = !!state.dbg.interior;
    } else {
      if (prog <= CUT1) samplePath(PATH_A, prog, pose);
      else if (prog < CUT2) samplePath(PATH_I, prog, pose);
      else samplePath(PATH_C, prog, pose);
      interior = prog > CUT1 && prog < CUT2;
      const dc = Math.min(Math.abs(prog - CUT1), Math.abs(prog - CUT2));
      fade = smooth(0, CUTW, dc);
    }
    if (interior !== state.inInterior || state.first !== true) { state.inInterior = interior; state.first = true; ext.group.visible = !interior; inn.group.visible = interior; }
    /* life: slow drift + mouse parallax */
    const mx = o.mx || 0, my = o.my || 0;
    camera.position.copy(pose.p);
    camera.position.x += Math.sin(t * .17) * 1.6 + mx * 3.2 * (interior ? .25 : 1);
    camera.position.y += Math.sin(t * .13) * .7 - my * 1.6 * (interior ? .25 : 1);
    camera.position.z += Math.cos(t * .11) * 1.4;
    camera.lookAt(pose.t);
    const asp = state.W / state.H;
    camera.fov = pose.fov * clamp(1 + (1.3 - asp) * .6, 1, 1.6);
    camera.updateProjectionMatrix();
    renderer.toneMappingExposure = clamp(1.9 - (o.dim || 0) * 1.1, .6, 2) * (interior ? .42 : 1);
    canvas.style.opacity = String(fade * (state.dbg || o.appear === undefined ? 1 : o.appear));

    ext.update(t, dt, !interior);
    inn.update(t, dt);

    /* shooting stars */
    if (!interior && !mobile) {
      nextMeteor -= dt;
      if (nextMeteor < 0 && !meteor) {
        nextMeteor = 6 + R() * 8;
        const yaw = (R() - .5) * 1.6, el = .25 + R() * .3, dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        const base = Math.atan2(dir.x, dir.z) + yaw;
        const c = new THREE.Vector3(Math.sin(base) * Math.cos(el), Math.sin(el), Math.cos(base) * Math.cos(el)).multiplyScalar(2600).add(camera.position);
        meteor = { c, vx: (R() < .5 ? -1 : 1) * (900 + R() * 500), vy: -(200 + R() * 200), life: 1 };
      }
      if (meteor) {
        meteor.life -= dt * 1.1;
        meteor.c.x += meteor.vx * dt; meteor.c.y += meteor.vy * dt;
        meteorMesh.visible = meteor.life > 0;
        meteorMesh.position.copy(meteor.c); meteorMesh.lookAt(camera.position);
        meteorMesh.scale.set(260, 5, 1); meteorMesh.material.opacity = clamp(meteor.life, 0, 1);
        meteorMesh.rotateZ(Math.atan2(meteor.vy, meteor.vx));
        if (meteor.life <= 0) meteor = null;
      }
    } else meteorMesh.visible = false;

    state.info = { prog: prog, interior: interior, fade: fade, p: camera.position.toArray().map(Math.round), fov: Math.round(camera.fov) };
    renderer.render(scene, camera);
  }

  return {
    render, resize,
    debug(d) { state.dbg = d; },
    info() { return state.info; },
    dispose() { renderer.dispose(); },
    renderer
  };
}
