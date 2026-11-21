// Génère un GLB MINIMAL DE TEST (formes géométriques simples) pour vérifier la chaîne d'intégration :
//   node tools/make-test-glb.mjs sortie.glb
// Ce n'est PAS un modèle du Negroni : il ne doit jamais être mis dans assets/models/ ni publié.
import fs from 'node:fs'

const meshes = [], nodes = [], materials = []
const bufs = []
let byteLen = 0
const views = [], accessors = []
function addAcc(arr, type, comp, target, ct) {
  const b = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength)
  const pad = (4 - (byteLen % 4)) % 4
  if (pad) { bufs.push(Buffer.alloc(pad)); byteLen += pad }
  views.push({ buffer: 0, byteOffset: byteLen, byteLength: b.length, target })
  bufs.push(b); byteLen += b.length
  const a = { bufferView: views.length - 1, componentType: ct, count: arr.length / comp, type }
  if (type === 'VEC3' && ct === 5126) { const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity]; for (let i = 0; i < arr.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], arr[i + k]); hi[k] = Math.max(hi[k], arr[i + k]) } a.min = lo; a.max = hi }
  accessors.push(a); return accessors.length - 1
}
function addMesh(name, pos, nor, idx, mat) {
  const p = addAcc(new Float32Array(pos), 'VEC3', 3, 34962, 5126), n = addAcc(new Float32Array(nor), 'VEC3', 3, 34962, 5126), i = addAcc(new Uint16Array(idx), 'SCALAR', 1, 34963, 5123)
  meshes.push({ name, primitives: [{ attributes: { POSITION: p, NORMAL: n }, indices: i, material: mat }] })
  nodes.push({ name, mesh: meshes.length - 1 })
}
function cylinder(r0, r1, y0, y1, seg = 48, open = false) {
  const pos = [], nor = [], idx = []
  for (let s = 0; s <= seg; s++) { const a = s / seg * Math.PI * 2, c = Math.cos(a), z = Math.sin(a); pos.push(c * r0, y0, z * r0, c * r1, y1, z * r1); nor.push(c, 0, z, c, 0, z) }
  for (let s = 0; s < seg; s++) { const a = s * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2) }
  if (!open) for (const [y, ny, r] of [[y0, -1, r0], [y1, 1, r1]]) {
    const base = pos.length / 3; pos.push(0, y, 0); nor.push(0, ny, 0)
    for (let s = 0; s <= seg; s++) { const a = s / seg * Math.PI * 2; pos.push(Math.cos(a) * r, y, Math.sin(a) * r); nor.push(0, ny, 0) }
    for (let s = 0; s < seg; s++) idx.push(...(ny > 0 ? [base, base + s + 2, base + s + 1] : [base, base + s + 1, base + s + 2]))
  }
  return [pos, nor, idx]
}
function box(cx, cy, cz, s) {
  const pos = [], nor = [], idx = [], F = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]], [[-1, 0, 0], [0, 0, 1], [0, 1, 0]], [[0, 1, 0], [0, 0, 1], [1, 0, 0]], [[0, -1, 0], [1, 0, 0], [0, 0, 1]], [[0, 0, 1], [1, 0, 0], [0, 1, 0]], [[0, 0, -1], [0, 1, 0], [1, 0, 0]]]
  F.forEach(([n, u, v]) => { const b = pos.length / 3; for (const [a, c] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { pos.push(cx + (n[0] + u[0] * a + v[0] * c) * s / 2, cy + (n[1] + u[1] * a + v[1] * c) * s / 2, cz + (n[2] + u[2] * a + v[2] * c) * s / 2); nor.push(...n) } idx.push(b, b + 1, b + 2, b, b + 2, b + 3) })
  return [pos, nor, idx]
}
const mat = (name, base, ext) => { materials.push(Object.assign({ name, pbrMetallicRoughness: { baseColorFactor: base, metallicFactor: 0, roughnessFactor: .08 } }, ext ? { extensions: ext } : {})); return materials.length - 1 }
const glassM = mat('TEST_glass', [1, 1, 1, 1], { KHR_materials_transmission: { transmissionFactor: 1 }, KHR_materials_ior: { ior: 1.5 } })
const iceM = mat('TEST_ice', [.9, .97, 1, 1], { KHR_materials_transmission: { transmissionFactor: .9 } })
const gM = mat('TEST_gin', [.9, .98, .95, 1], { KHR_materials_transmission: { transmissionFactor: .9 } })
const cM = mat('TEST_campari', [.75, .05, .08, 1], { KHR_materials_transmission: { transmissionFactor: .6 } })
const vM = mat('TEST_vermouth', [.8, .5, .1, 1], { KHR_materials_transmission: { transmissionFactor: .6 } })
const oM = mat('TEST_orange', [.95, .5, .08, 1])
// unités = mètres ; verre de 9 cm posé en y = 0 (formes volontairement grossières)
addMesh('Glass', ...cylinder(.032, .038, 0, .09, 48, true), glassM)
addMesh('Liquid_Vermouth', ...cylinder(.03, .033, .006, .028), vM)
addMesh('Liquid_Campari', ...cylinder(.033, .0345, .028, .05), cM)
addMesh('Liquid_Gin', ...cylinder(.0345, .036, .05, .072), gM)
addMesh('Ice_01', ...box(.009, .06, .004, .026), iceM)
addMesh('Ice_02', ...box(-.01, .052, -.006, .024), iceM)
addMesh('Ice_03', ...box(.002, .07, -.014, .022), iceM)
addMesh('Orange_Slice', ...cylinder(.032, .032, .088, .091), oM)
addMesh('Orange_Peel', ...box(.02, .096, .01, .014), oM)

const bin = Buffer.concat(bufs); const binPad = (4 - (bin.length % 4)) % 4
const json = { asset: { version: '2.0', generator: 'make-test-glb (TEST, pas un modèle réel)' }, extensionsUsed: ['KHR_materials_transmission', 'KHR_materials_ior'], scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes, materials, accessors, bufferViews: views, buffers: [{ byteLength: bin.length + binPad }] }
let js = Buffer.from(JSON.stringify(json)); const jp = (4 - (js.length % 4)) % 4; js = Buffer.concat([js, Buffer.alloc(jp, 0x20)])
const total = 12 + 8 + js.length + 8 + bin.length + binPad
const h = Buffer.alloc(12); h.writeUInt32LE(0x46546c67, 0); h.writeUInt32LE(2, 4); h.writeUInt32LE(total, 8)
const c1 = Buffer.alloc(8); c1.writeUInt32LE(js.length, 0); c1.writeUInt32LE(0x4e4f534a, 4)
const c2 = Buffer.alloc(8); c2.writeUInt32LE(bin.length + binPad, 0); c2.writeUInt32LE(0x004e4942, 4)
fs.writeFileSync(process.argv[2] || 'test.glb', Buffer.concat([h, c1, js, c2, bin, Buffer.alloc(binPad)]))
console.log('GLB de test écrit :', process.argv[2] || 'test.glb')
