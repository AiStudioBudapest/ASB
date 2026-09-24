/* Geometry helpers shared by the building modules: gothic arches, panels with openings,
   batching (merge everything of one material into one mesh) and metre-based UV mapping. */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const TAU = Math.PI * 2;

/* Pointed arch outline (y up), from the bottom-left corner. hw = half width, spring = height where the
   curve starts, k >= 1 = sharpness (1 = round arch). */
export function archOutline(hw, spring, k, n) {
  const r = hw * k, pts = [[-hw, 0], [-hw, spring]];
  const a1 = Math.acos(Math.min(1, Math.max(-1, hw / r - 1)));
  n = n || 10;
  for (let i = 1; i <= n; i++) { const th = Math.PI + (a1 - Math.PI) * (i / n); pts.push([-hw + r + r * Math.cos(th), spring + r * Math.sin(th)]); }
  for (let i = n - 1; i >= 0; i--) { const th = Math.PI + (a1 - Math.PI) * (i / n); pts.push([hw - r - r * Math.cos(th), spring + r * Math.sin(th)]); }
  pts.push([hw, 0]);
  return pts;
}
export const archTop = (hw, spring, k) => spring + hw * Math.sqrt(2 * k - 1);

function pathFrom(pts, ox, oy) {
  const p = new THREE.Path();
  pts.forEach((pt, i) => { const x = ox + pt[0], y = oy + pt[1]; if (i) p.lineTo(x, y); else p.moveTo(x, y); });
  p.closePath();
  return p;
}
function holePath(h) {
  if (h.circle) { const p = new THREE.Path(); p.absarc(h.cx, h.cy, h.r, 0, TAU, true); return p; }
  return pathFrom(archOutline(h.hw, h.spring, h.k, 8), h.cx, h.y0);
}

/* rectangle (width x height, bottom edge on y = 0, extruded along z and centred on z = 0) with openings */
const memo = new Map();
function cached(key, fn) { let v = memo.get(key); if (!v) { v = fn(); memo.set(key, v); } return v; }
export function panel(width, height, depth, holes, gable) {
  return cached('P' + JSON.stringify([width, height, depth, holes, gable]), () => panelRaw(width, height, depth, holes, gable));
}
function panelRaw(width, height, depth, holes, gable) {
  const s = new THREE.Shape();
  s.moveTo(-width / 2, 0); s.lineTo(width / 2, 0); s.lineTo(width / 2, height);
  if (gable) s.lineTo(0, height + gable);
  s.lineTo(-width / 2, height); s.closePath();
  (holes || []).forEach((h) => s.holes.push(holePath(h)));
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 6 });
  g.translate(0, 0, -depth / 2);
  return g;
}
/* raised moulding around an opening (a ring of stone, f wide) */
export function frame(h, f, depth) {
  return cached('F' + JSON.stringify([h, f, depth]), () => frameRaw(h, f, depth));
}
function frameRaw(h, f, depth) {
  let outer;
  if (h.circle) { outer = new THREE.Shape(); outer.absarc(h.cx, h.cy, h.r + f, 0, TAU, false); }
  else {
    outer = new THREE.Shape();
    archOutline(h.hw + f, h.spring, h.k, 8).forEach((pt, i) => { const x = h.cx + pt[0], y = h.y0 - f * .6 + pt[1] * 1 + (pt[1] > h.spring ? f * .0 : 0); if (i) outer.lineTo(x, y); else outer.moveTo(x, y); });
    outer.closePath();
  }
  outer.holes.push(holePath(h));
  const g = new THREE.ExtrudeGeometry(outer, { depth, bevelEnabled: false, curveSegments: 6 });
  g.translate(0, 0, -depth / 2);
  return g;
}
export function paneShape(h, z) {
  return cached('S' + JSON.stringify([h, z]), () => paneShapeRaw(h, z));
}
function paneShapeRaw(h, z) {
  let g;
  if (h.circle) g = new THREE.CircleGeometry(h.r, 20).translate(h.cx, h.cy, 0);
  else { const s = new THREE.Shape(); archOutline(h.hw, h.spring, h.k, 8).forEach((pt, i) => { const x = h.cx + pt[0], y = h.y0 + pt[1]; if (i) s.lineTo(x, y); else s.moveTo(x, y); }); s.closePath(); g = new THREE.ShapeGeometry(s); }
  g.translate(0, 0, z || 0);
  return g;
}

export const M4 = (x, y, z, ry, sx, sy, sz) => new THREE.Matrix4().compose(
  new THREE.Vector3(x || 0, y || 0, z || 0), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry || 0), new THREE.Vector3(sx || 1, sy === undefined ? (sx || 1) : sy, sz === undefined ? (sx || 1) : sz));

/* per-triangle planar mapping in metres / tile (walls, roofs, mouldings): a tile spans `tile` metres */
export function planarUV(geo, tile) {
  const p = geo.attributes.position, uv = new Float32Array(p.count * 2);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3(), t = new THREE.Vector3(), bt = new THREE.Vector3(), q = new THREE.Vector3();
  for (let i = 0; i < p.count; i += 3) {
    a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); c.fromBufferAttribute(p, i + 2);
    n.subVectors(c, b).cross(q.subVectors(a, b));
    if (n.lengthSq() < 1e-12) n.set(0, 1, 0); else n.normalize();
    if (Math.abs(n.y) > .92) { t.set(1, 0, 0); bt.set(0, 0, 1); }
    else { t.set(n.z, 0, -n.x).normalize(); bt.crossVectors(n, t); }
    for (let k = 0; k < 3; k++) {
      q.fromBufferAttribute(p, i + k);
      uv[(i + k) * 2] = q.dot(t) / tile; uv[(i + k) * 2 + 1] = q.dot(bt) / tile;
    }
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

/* collects geometries (already transformed) and merges them into one mesh */
export class Batch {
  constructor(attrs) { this.g = []; this.attrs = attrs || ['position', 'normal', 'uv']; }
  add(geo, m) {
    const x = geo.index ? geo.toNonIndexed() : geo.clone();
    Object.keys(x.attributes).forEach((k) => { if (this.attrs.indexOf(k) < 0) x.deleteAttribute(k); });
    if (this.attrs.indexOf('uv') >= 0 && !x.attributes.uv) x.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(x.attributes.position.count * 2), 2));
    if (m) x.applyMatrix4(m);
    x.clearGroups();
    this.g.push(x);
  }
  mesh(material, tile) {
    if (!this.g.length) return null;
    const merged = mergeGeometries(this.g, false);
    if (tile) planarUV(merged, tile);
    merged.computeBoundingSphere();
    return new THREE.Mesh(merged, material);
  }
  get count() { return this.g.length; }
}
