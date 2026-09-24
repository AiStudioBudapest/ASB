/* The Parliament building itself, modelled with real relief: recessed arcades and windows with mouldings,
   mullions and glowing panes, stepped buttresses crowned by statues, corbelled cornices, openwork parapets,
   gabled pavilions with corner turrets, twin towers with ribbed spires, dormers and the 16-sided ribbed dome.
   Everything is merged per material (stone / roof / gold / dark metal / glass): five meshes. */
import * as THREE from 'three';
import { Batch, panel, frame, paneShape, M4, archTop, TAU } from './arch.js';

const mul = (a, b) => new THREE.Matrix4().multiplyMatrices(a, b);
/* transform putting a local module (facing +z, front plane on z = 0) onto the ground at (x, z), turned by `dir` radians */
export const at = (x, z, dir) => new THREE.Matrix4().compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dir || 0), new THREE.Vector3(1, 1, 1));

export function buildBuilding(mats, opts) {
  opts = opts || {};
  const mobile = !!opts.mobile, R = opts.rand || Math.random;
  const B = { stone: new Batch(), roof: new Batch(), gold: new Batch(), dark: new Batch(), glass: new Batch(['position', 'normal', 'color']) };
  const add = (name, geo, t, local) => B[name].add(geo, local ? mul(t, local) : t);
  const box = (name, t, w, h, d, x, y, z) => add(name, new THREE.BoxGeometry(w, h, d), t, M4(x, y, z));
  const I = new THREE.Matrix4();
  const XW = [-1, 1];

  /* ---------- glowing pane: vertex colours carry the warm gradient (values > 1 feed the bloom) ---------- */
  function paneGeo(h, k) {
    const g = paneShape(h, 0);
    const pos = g.attributes.position, col = new Float32Array(pos.count * 3);
    const y0 = h.circle ? h.cy - h.r : h.y0, hh = h.circle ? h.r * 2 : archTop(h.hw, h.spring, h.k);
    for (let i = 0; i < pos.count; i++) {
      const v = Math.min(1, Math.max(0, (pos.getY(i) - y0) / hh)), f = k * (1.15 - .42 * v);
      col[i * 3] = f; col[i * 3 + 1] = f * .47; col[i * 3 + 2] = f * .12;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }
  const glass = (t, h, z, k) => add('glass', paneGeo(h, k), t, M4(0, 0, z));

  /* mullions, a transom and a tracery ring for one opening */
  function bars(t, h, z, tall) {
    if (h.circle) {
      add('dark', new THREE.BoxGeometry(h.r * 2, .07, .12), t, M4(h.cx, h.cy, z + .02));
      add('dark', new THREE.BoxGeometry(.07, h.r * 2, .12), t, M4(h.cx, h.cy, z + .02));
      return;
    }
    const top = archTop(h.hw, h.spring, h.k), n = h.hw > 1.6 ? 2 : 1, hh = h.spring + (top - h.spring) * .55;
    for (let i = 1; i <= n; i++) add('dark', new THREE.BoxGeometry(.09, hh, .14), t, M4(h.cx - h.hw + 2 * h.hw * i / (n + 1), h.y0 + hh / 2, z + .02));
    if (tall) add('dark', new THREE.BoxGeometry(h.hw * 2, .08, .14), t, M4(h.cx, h.y0 + h.spring * .55, z + .02));
    add('dark', new THREE.BoxGeometry(h.hw * 2, .08, .14), t, M4(h.cx, h.y0 + h.spring, z + .02));
    if (h.hw > .55) add('dark', new THREE.TorusGeometry(h.hw * .42, .045, 5, 14), t, M4(h.cx, h.y0 + h.spring + (top - h.spring) * .42, z + .03));
  }
  /* a wall face: extruded panel with openings + raised mouldings + panes */
  function wall(t, W, H, holes, gable, o) {
    o = o || {};
    const T = o.thick || 1.2;
    add('stone', panel(W, H, T, holes, gable), t, M4(0, 0, -T / 2));
    holes.forEach((h) => {
      add('stone', frame(h, o.fr || .28, .36), t, M4(0, 0, .18));
      if (h.open) return; /* a real doorway: the page code fits leaves and the glowing hall behind */
      glass(t, h, -T * .42, .75 + R() * .5);
      bars(t, h, -T * .42, h.tall);
      if (!h.circle && h.y0 > 5) add('stone', new THREE.BoxGeometry(h.hw * 2 + .8, .28, .5), t, M4(h.cx, h.y0 - .16, .2));
    });
  }

  /* ---------- statue of a ruler on a buttress ---------- */
  const statueParts = (() => {
    const lathe = new THREE.LatheGeometry([[0, 0], [.55, 0], [.62, .3], [.5, 1.5], [.36, 2.3], [.3, 2.55], [0, 2.62]].map((p) => new THREE.Vector2(p[0], p[1])), mobile ? 6 : 10);
    return [
      ['stone', new THREE.BoxGeometry(1.2, 1.0, 1.2), M4(0, .5, 0)],
      ['stone', lathe, M4(0, 1.0, 0)],
      ['stone', new THREE.SphereGeometry(.3, 8, 6), M4(0, 3.95, 0)],
      ['gold', new THREE.ConeGeometry(.34, .34, 6), M4(0, 4.35, 0)],
      ['stone', new THREE.BoxGeometry(.2, 1.0, .2), M4(.55, 2.3, .15)],
      ['gold', new THREE.CylinderGeometry(.03, .03, 2.2, 5), M4(-.5, 2.6, .3)]
    ];
  })();
  const statue = (t, x, y, z) => statueParts.forEach((p) => add(p[0], p[1], t, mul(M4(x, y, z), p[2])));

  /* ---------- buttress: two set-backs, a pyramid cap, and a statue on top ---------- */
  function buttress(t, H) {
    box('stone', t, 1.7, 10, 2.1, 0, 5, 1.05);
    box('stone', t, 1.45, 10, 1.7, 0, 15, .85);
    box('stone', t, 1.2, H - 21.5, 1.35, 0, 20 + (H - 21.5) / 2, .68);
    add('stone', new THREE.ConeGeometry(1.0, 1.6, 4).rotateY(Math.PI / 4), t, M4(0, H - .7, .68));
    box('stone', t, 1.5, .35, 1.7, 0, 10.05, .85);
    box('stone', t, 1.75, .35, 2.0, 0, 20.05, .75);
    statue(t, 0, H + .1, .68);
  }

  /* ---------- horizontal mouldings ---------- */
  function cornice(t, W, y, z) {
    box('stone', t, W, 1.0, 1.7, 0, y, z + .35);
    box('stone', t, W, .35, 1.2, 0, y - .65, z + .1);
    if (!mobile) for (let x = -W / 2 + .4; x < W / 2 - .2; x += .7) box('stone', t, .3, .42, .45, x, y - .95, z - .05);
  }
  function parapet(t, W, y, z) {
    const n = Math.max(1, Math.round(W / 1.0)), w = W / n;
    for (let i = 0; i < n; i++) add('stone', panel(w - .04, 1.9, .34, mobile ? [] : [{ cx: 0, y0: .3, hw: w * .3, spring: .55, k: 1.6 }]), t, M4(-W / 2 + w * (i + .5), y, z));
    box('stone', t, W, .3, .5, 0, y + 1.95, z);
  }
  const stringCourse = (t, W, y) => { box('stone', t, W, .5, .5, 0, y, .22); box('stone', t, W, .22, .32, 0, y - .34, .12); };

  /* ---------- an arcade bay of the wings (W wide, 30 high) ---------- */
  function bay(t, W) {
    const holes = [
      { cx: 0, y0: 1.1, hw: W * .3, spring: 6.0, k: 1.5, tall: true },
      { cx: -W * .23, y0: 12.2, hw: .72, spring: 5.0, k: 1.6 }, { cx: W * .23, y0: 12.2, hw: .72, spring: 5.0, k: 1.6 },
      { circle: true, cx: 0, cy: 21.8, r: .95 },
      { cx: -W * .37, y0: 24.4, hw: .4, spring: 2.4, k: 1.6 }, { cx: -W * .12, y0: 24.4, hw: .4, spring: 2.4, k: 1.6 },
      { cx: W * .12, y0: 24.4, hw: .4, spring: 2.4, k: 1.6 }, { cx: W * .37, y0: 24.4, hw: .4, spring: 2.4, k: 1.6 }
    ];
    wall(t, W, 30, holes);
    stringCourse(t, W, 10.7); stringCourse(t, W, 19.6);
    cornice(t, W, 29.4, 0);
    parapet(t, W, 30.2, .1);
  }

  /* ---------- gabled pavilion / porch face ---------- */
  function pavFace(t, W, H, rise, holes) {
    const s = W / 32;
    holes = holes || [
      { cx: -W * .3, y0: 1.1, hw: 2.4 * s, spring: 6.5, k: 1.5, tall: true }, { cx: 0, y0: 1.1, hw: 2.7 * s, spring: 6.8, k: 1.5, tall: true }, { cx: W * .3, y0: 1.1, hw: 2.4 * s, spring: 6.5, k: 1.5, tall: true },
      { cx: 0, y0: 13.4, hw: 2.1 * s, spring: 7.4, k: 1.4, tall: true },
      { cx: -W * .2, y0: 12.4, hw: .95, spring: 6.0, k: 1.6 }, { cx: W * .2, y0: 12.4, hw: .95, spring: 6.0, k: 1.6 },
      { cx: -W * .37, y0: 12.6, hw: .62, spring: 4.2, k: 1.6 }, { cx: W * .37, y0: 12.6, hw: .62, spring: 4.2, k: 1.6 },
      { circle: true, cx: 0, cy: H - 5.4, r: 1.7 },
      { cx: -W * .2, y0: H - 8, hw: .6, spring: 3.4, k: 1.6 }, { cx: W * .2, y0: H - 8, hw: .6, spring: 3.4, k: 1.6 },
      { circle: true, cx: 0, cy: H + rise * .42, r: 1.15 }
    ];
    wall(t, W, H, holes, rise, { thick: 1.4 });
    stringCourse(t, W, 10.9); stringCourse(t, W, 21.4);
    box('stone', t, W + .6, .8, 1.5, 0, H - .2, .4);
    if (!mobile) for (let i = 0; i < 8; i++) { const f = (i + .5) / 8; XW.forEach((sg) => add('stone', new THREE.ConeGeometry(.28, 1.2, 4), t, M4(sg * (W / 2) * (1 - f), H + rise * f + .5, .2))); }
    add('gold', new THREE.ConeGeometry(.6, 3.2, 6), t, M4(0, H + rise + 1.3, 0));
  }

  /* ---------- octagonal turret with a gilded spire (base at y = 0 of the given transform) ---------- */
  function turret(t, x, z, shaft, r, cone) {
    add('stone', new THREE.CylinderGeometry(r * .9, r, shaft, 8), t, M4(x, shaft / 2, z));
    for (let i = 0; i < 8; i++) {
      if (mobile && i % 2) continue;
      const a = i / 8 * TAU + TAU / 16;
      const g = paneShape({ cx: 0, y0: 0, hw: .2, spring: 1.6, k: 1.6 }, 0), pos = g.attributes.position;
      g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(pos.count * 3).fill(1.7), 3));
      add('glass', g, t, mul(M4(x, shaft * .5, z), mul(new THREE.Matrix4().makeRotationY(a), M4(0, 0, r * .93))));
    }
    add('stone', new THREE.CylinderGeometry(r * 1.3, r * 1.3, .7, 8), t, M4(x, shaft + .1, z));
    add('gold', new THREE.ConeGeometry(r * 1.25, cone, 8), t, M4(x, shaft + .45 + cone / 2, z));
    add('gold', new THREE.SphereGeometry(r * .3, 8, 6), t, M4(x, shaft + .5 + cone, z));
  }

  /* ---------- ribbed spire cone with crockets ---------- */
  function ribbedSpire(t, x, y, z, r, h) {
    add('gold', new THREE.ConeGeometry(r, h, 8), t, M4(x, y + h / 2, z));
    if (mobile) return;
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * TAU + TAU / 16;
      for (let k = 1; k <= 6; k++) {
        const f = k / 7, rr = r * (1 - f);
        add('gold', new THREE.ConeGeometry(.28 * (1 - f * .5), .9, 4), t, M4(x + Math.sin(a) * rr, y + h * f, z + Math.cos(a) * rr));
      }
    }
  }

  /* ---------- steep roofs (prisms) ---------- */
  function prism(x0, x1, z0, z1, y0, rise, alongX) {
    const hw = (alongX ? z1 - z0 : x1 - x0) / 2 + 1.2, s = new THREE.Shape();
    s.moveTo(-hw, 0); s.lineTo(hw, 0); s.lineTo(0, rise); s.closePath();
    const len = (alongX ? x1 - x0 : z1 - z0) + 2.4;
    const geo = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false });
    if (alongX) { geo.rotateY(Math.PI / 2); add('roof', geo, I, M4(x0 - 1.2, y0, (z0 + z1) / 2)); }
    else add('roof', geo, I, M4((x0 + x1) / 2, y0, z0 - 1.2));
    /* gilded cresting along the ridge */
    if (alongX) for (let x = x0; x <= x1; x += 3) add('gold', new THREE.ConeGeometry(.35, 1.1, 4), I, M4(x, y0 + rise + .3, (z0 + z1) / 2));
    else for (let z = z0; z <= z1; z += 3) add('gold', new THREE.ConeGeometry(.35, 1.1, 4), I, M4((x0 + x1) / 2, y0 + rise + .3, z));
  }
  function dormer(t) {
    box('stone', t, 1.9, 2.6, 1.7, 0, 1.3, -.8);
    add('roof', new THREE.ConeGeometry(1.6, 1.5, 4).rotateY(Math.PI / 4), t, M4(0, 3.3, -.8));
    const g = paneGeo({ cx: 0, y0: .35, hw: .5, spring: 1.1, k: 1.6 }, 1); add('glass', g, t, M4(0, 0, .06));
    box('dark', t, .08, 1.8, .1, 0, 1.25, .08);
  }

  /* ===================================================================== */
  /*                             THE BUILDING                                */
  /* ===================================================================== */
  /* hidden bulk behind the faces */
  const solid = (x0, x1, z0, z1, h) => add('stone', new THREE.BoxGeometry(x1 - x0, h, z1 - z0), I, M4((x0 + x1) / 2, h / 2, (z0 + z1) / 2));
  /* the bulk stops behind every glazed face (panel back = front - thickness) so the panes stay visible */
  solid(-134, 134, -21.6, 21.6, 30);
  solid(-42, 42, -43.6, 21.6, 34);
  XW.forEach((s) => { solid(s * 61 - 14.6, s * 61 + 14.6, -25.9, 25.9, 35); solid(s * 119.5 - 13.3, s * 119.5 + 13.3, -25.9, 25.9, 32); });
  solid(-19.5, 19.5, 21.6, 32.4, 32);

  /* front (+z) and back (-z) elevations */
  [[1, 0], [-1, Math.PI]].forEach(([sg, dir]) => {
    const wallZ = 23 * sg, pavZ = 27.5 * sg;
    XW.forEach((s) => {
      [33, 41].forEach((xc) => bay(at(s * xc, wallZ, dir), 8));
      [81.67, 91, 100.33].forEach((xc) => bay(at(s * xc, wallZ, dir), 9.33));
      [29, 37, 45, 77, 86.33, 95.67, 105].forEach((xb) => buttress(at(s * xb, wallZ, dir), 30));
      pavFace(at(s * 61, pavZ, dir), 32, 35, 13);
      pavFace(at(s * 119.5, pavZ, dir), 29, 32, 10);
      /* corner turrets of the pavilions */
      XW.forEach((c) => {
        turret(M4(0, 35, 0), s * 61 + c * 14.4, (pavZ - sg * 1.2), 16, 1.5, 11);
        turret(M4(0, 32, 0), s * 119.5 + c * 13.2, (pavZ - sg * 1.2), 10, 1.4, 8);
      });
      /* dormers on the long wing roofs */
      [33, 41, 81.67, 91, 100.33].forEach((xc) => dormer(at(s * xc, 14.5 * sg, dir).multiply(M4(0, 34.2, 0))));
    });
  });

  /* pavilion side faces (x = +-45, +-77, +-105, +-134) */
  XW.forEach((s) => [[61, 16, 35], [119.5, 14.5, 32]].forEach(([cx, half, H]) => {
    [-1, 1].forEach((e) => {
      const holes = [
        { cx: -7, y0: 1.1, hw: 1.6, spring: 6, k: 1.5, tall: true }, { cx: 0, y0: 1.1, hw: 1.6, spring: 6, k: 1.5, tall: true }, { cx: 7, y0: 1.1, hw: 1.6, spring: 6, k: 1.5, tall: true },
        { cx: -7, y0: 12.4, hw: .8, spring: 5.4, k: 1.6 }, { cx: 0, y0: 12.4, hw: .8, spring: 5.4, k: 1.6 }, { cx: 7, y0: 12.4, hw: .8, spring: 5.4, k: 1.6 },
        { cx: -7, y0: 22, hw: .55, spring: 3.6, k: 1.6 }, { cx: 0, y0: 22, hw: .55, spring: 3.6, k: 1.6 }, { cx: 7, y0: 22, hw: .55, spring: 3.6, k: 1.6 }
      ];
      const face = at(s * cx + e * half, 0, e * Math.PI / 2);
      wall(face, 54, H, holes, 0, { thick: 1.2 });
      stringCourse(face, 54, 10.9); cornice(face, 54, H - .6, 0);
    });
  }));

  /* central porch (river side): three great portals under a gable */
  pavFace(at(0, 34, 0), 39, 32, 10, [
    { cx: -11.5, y0: 1.1, hw: 3.4, spring: 8.4, k: 1.5, tall: true }, { cx: 0, y0: 1.1, hw: 3.8, spring: 9, k: 1.5, tall: true }, { cx: 11.5, y0: 1.1, hw: 3.4, spring: 8.4, k: 1.5, tall: true },
    { cx: -11.5, y0: 15, hw: 1.3, spring: 6.4, k: 1.6 }, { cx: -5.6, y0: 15, hw: 1.3, spring: 6.4, k: 1.6 }, { cx: 5.6, y0: 15, hw: 1.3, spring: 6.4, k: 1.6 }, { cx: 11.5, y0: 15, hw: 1.3, spring: 6.4, k: 1.6 },
    { cx: 0, y0: 14.5, hw: 1.8, spring: 7.2, k: 1.5, tall: true },
    { circle: true, cx: 0, cy: 27.4, r: 1.8 }, { cx: -9, y0: 24, hw: .8, spring: 3.2, k: 1.6 }, { cx: 9, y0: 24, hw: .8, spring: 3.2, k: 1.6 },
    { circle: true, cx: 0, cy: 34.2, r: 1.2 }
  ]);
  /* back portico (Kossuth square side): tall entrance under a gable */
  /* the bulk is carved for the great doorway: a lit vestibule (built by the page code) runs through it */
  solid(-24, -4.8, -50.2, -44.6, 27); solid(4.8, 24, -50.2, -44.6, 27);
  add('stone', new THREE.BoxGeometry(9.6, 10.4, 5.6), I, M4(0, 21.8, -47.4));
  wall(at(0, -52, Math.PI), 48, 27, [
    { cx: 0, y0: 0, hw: 4.6, spring: 9.5, k: 1.5, tall: true, open: true }, { cx: -14, y0: 1.5, hw: 2.4, spring: 6.5, k: 1.5, tall: true }, { cx: 14, y0: 1.5, hw: 2.4, spring: 6.5, k: 1.5, tall: true },
    { cx: -14, y0: 14, hw: .9, spring: 5.5, k: 1.6 }, { cx: -7, y0: 14, hw: .9, spring: 5.5, k: 1.6 }, { cx: 7, y0: 14, hw: .9, spring: 5.5, k: 1.6 }, { cx: 14, y0: 14, hw: .9, spring: 5.5, k: 1.6 },
    { circle: true, cx: 0, cy: 21, r: 1.6 }
  ], 9, { thick: 1.6 });
  prism(-24, 24, -52, -44.6, 27, 9, false);
  XW.forEach((s) => { const tw = at(s * 31, -44.5, Math.PI); solid(s * 31 - 4, s * 31 + 4, -43.3, -37, 38); wall(tw, 8, 38, [{ cx: 0, y0: 3, hw: .9, spring: 6, k: 1.5, tall: true }, { cx: 0, y0: 15, hw: .9, spring: 6, k: 1.5 }, { cx: 0, y0: 26, hw: .7, spring: 4.4, k: 1.6 }], 0, { thick: 1 }); turret(M4(0, 38, 0), s * 31, -41, 9, 3.0, 14); });

  /* roofs */
  prism(-134, 134, -22.6, 22.6, 30, 11, true);
  prism(-42, 42, -44.6, 22.6, 34, 8, true);
  prism(-19.5, 19.5, 22.6, 33.6, 32, 10, false);
  XW.forEach((s) => { prism(s * 61 - 16, s * 61 + 16, -27.1, 27.1, 35, 13, false); prism(s * 119.5 - 14.5, s * 119.5 + 14.5, -27.1, 27.1, 32, 10, false); });

  /* twin towers flanking the porch */
  XW.forEach((s) => {
    const cx = s * 24, cz = 29;
    solid(cx - 3.1, cx + 3.1, 22.6, 33.6, 42);
    const holes = [
      { cx: -2.2, y0: 2, hw: .9, spring: 6, k: 1.6, tall: true }, { cx: 2.2, y0: 2, hw: .9, spring: 6, k: 1.6, tall: true },
      { cx: -2.2, y0: 16, hw: .9, spring: 6, k: 1.6 }, { cx: 2.2, y0: 16, hw: .9, spring: 6, k: 1.6 },
      { cx: 0, y0: 29, hw: 1.3, spring: 7.5, k: 1.5, tall: true }
    ];
    wall(at(cx, 35, 0), 9, 42, holes, 0, { thick: 1.3 });
    wall(at(cx + s * 4.5, cz, s * Math.PI / 2), 12, 42, [{ cx: -2.5, y0: 2, hw: .9, spring: 6, k: 1.6 }, { cx: 2.5, y0: 2, hw: .9, spring: 6, k: 1.6 }, { cx: -2.5, y0: 16, hw: .9, spring: 6, k: 1.6 }, { cx: 2.5, y0: 16, hw: .9, spring: 6, k: 1.6 }, { cx: 0, y0: 29, hw: 1.2, spring: 7, k: 1.5 }], 0, { thick: 1.3 });
    stringCourse(at(cx, 35, 0), 9, 14); stringCourse(at(cx, 35, 0), 9, 28); cornice(at(cx, 35, 0), 9, 41.4, 0);
    /* octagonal lantern stage */
    for (let j = 0; j < 8; j++) {
      const ph = j * TAU / 8, ap = 4.34;
      wall(mul(M4(0, 42, 0), at(cx + Math.sin(ph) * ap, cz + Math.cos(ph) * ap, ph)), 3.6, 12, [{ cx: 0, y0: 1.8, hw: .7, spring: 5.6, k: 1.5, tall: true }], 0, { thick: .8 });
    }
    add('stone', new THREE.CylinderGeometry(5.3, 5.3, 1.0, 8), I, M4(cx, 54.4, cz));
    ribbedSpire(I, cx, 54.9, cz, 4.7, 21.1);
    add('gold', new THREE.SphereGeometry(.9, 8, 6), I, M4(cx, 76.4, cz));
    XW.forEach((a) => XW.forEach((b) => turret(M4(0, 42, 0), cx + a * 3.9, cz + b * 3.9 + (b > 0 ? 2.5 : 0), 5.5, 1.0, 7)));
  });

  /* ---------- the great dome (16 sides) ---------- */
  const DR = 17.6, dAp = DR * Math.cos(Math.PI / 16), dCh = 2 * DR * Math.sin(Math.PI / 16);
  for (let j = 0; j < 16; j++) {
    const ph = j * TAU / 16;
    wall(mul(M4(0, 42, 0), at(Math.sin(ph) * dAp, Math.cos(ph) * dAp, ph)), dCh, 14, [{ cx: 0, y0: 2.2, hw: 1.0, spring: 6.2, k: 1.5, tall: true }], 0, { thick: .9 });
    const pv = ph + Math.PI / 16;
    add('stone', new THREE.BoxGeometry(1.1, 15.2, 1.6), I, mul(at(Math.sin(pv) * (DR + .15), Math.cos(pv) * (DR + .15), pv), M4(0, 42 + 7.6, 0)));
    add('gold', new THREE.ConeGeometry(.75, 5.2, 6), I, mul(at(Math.sin(pv) * (DR + .15), Math.cos(pv) * (DR + .15), pv), M4(0, 42 + 17.8, 0)));
  }
  add('stone', new THREE.CylinderGeometry(DR + .9, DR + .9, 1.6, 16), I, M4(0, 42.8, 0));
  add('stone', new THREE.CylinderGeometry(DR + 1.5, DR + 1.5, 1.4, 16), I, M4(0, 56.7, 0));
  add('stone', new THREE.CylinderGeometry(DR + .8, DR + 1.2, .7, 16), I, M4(0, 55.9, 0));
  const prof = [];
  for (let i = 0; i <= 26; i++) { const tt = i / 26, rr = 17.4 * Math.pow(Math.cos(tt * Math.PI / 2), .78) + .001; prof.push(new THREE.Vector2(rr, 57.4 + tt * 26.6)); }
  add('stone', new THREE.LatheGeometry(prof, 16), I);
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * TAU;
    const pts = prof.map((p) => new THREE.Vector3(Math.sin(a) * (p.x + .14), p.y, Math.cos(a) * (p.x + .14)));
    add('gold', new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.slice(0, -1)), mobile ? 14 : 30, .34, 5), I);
    /* lucarne (dormer window) on every second rib gap */
    if (!mobile && i % 2 === 0) {
      const b = a + Math.PI / 16, rr = 15.2, y = 67;
      const lt = mul(at(Math.sin(b) * rr, Math.cos(b) * rr, b), M4(0, y, 0));
      box('stone', lt, 1.6, 2.6, 1.2, 0, 1.3, .3);
      add('gold', new THREE.ConeGeometry(1.3, 1.6, 4).rotateY(Math.PI / 4), lt, M4(0, 3.4, .3));
      add('glass', paneGeo({ cx: 0, y0: .3, hw: .5, spring: 1.2, k: 1.6 }, 1), lt, M4(0, 0, .95));
    }
  }
  add('stone', new THREE.CylinderGeometry(3.0, 3.4, 6.4, 8), I, M4(0, 87, 0));
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU + TAU / 16, g = paneShape({ cx: 0, y0: 0, hw: .5, spring: 2.6, k: 1.5 }, 0), pos = g.attributes.position;
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(pos.count * 3).fill(2.0), 3));
    add('glass', g, I, mul(M4(0, 84.8, 0), mul(new THREE.Matrix4().makeRotationY(a), M4(0, 0, 3.05))));
  }
  add('stone', new THREE.CylinderGeometry(3.7, 3.7, .8, 8), I, M4(0, 90.5, 0));
  add('gold', new THREE.ConeGeometry(3.4, 6.5, 8), I, M4(0, 94.2, 0));
  add('gold', new THREE.SphereGeometry(.7, 8, 6), I, M4(0, 97.9, 0));
  box('gold', I, .35, 4.2, .35, 0, 100.4, 0); box('gold', I, 2.0, .35, .35, 0, 101.2, 0);

  /* ---------- build the meshes ---------- */
  const g = new THREE.Group();
  const mk = (name, material, tile) => {
    const m = B[name].mesh(material, tile);
    if (!m) return;
    m.castShadow = name !== 'glass'; m.receiveShadow = name !== 'glass';
    g.add(m);
  };
  mk('stone', mats.stone, mats.stoneTile || 1.5);
  mk('roof', mats.roof, mats.roofTile || 3);
  mk('gold', mats.gold, mats.goldTile || 1);
  mk('dark', mats.dark, 0);
  mk('glass', mats.glass, 0);
  return g;
}
