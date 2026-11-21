// Inspection d'un fichier GLB (glTF 2.0 binaire) sans aucune dépendance : noms d'objets, poids, triangles,
// dimensions, textures, extensions. Utilisé par build.mjs, tools/glb-check.mjs et tools/glb-preview.mjs.
// Lecture seule : ce module ne modifie jamais le fichier.

export function parseGlb(buf) {
  if (buf.length < 20 || buf.readUInt32LE(0) !== 0x46546c67) throw new Error('ce n’est pas un fichier GLB (en-tête « glTF » absent)')
  if (buf.readUInt32LE(4) !== 2) throw new Error('version glTF non supportée (2.0 attendu)')
  let off = 12, json = null, bin = null
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32LE(off), type = buf.readUInt32LE(off + 4)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (type === 0x4e4f534a) json = JSON.parse(data.toString('utf8'))
    else if (type === 0x004e4942 && !bin) bin = data
    off += 8 + len + ((4 - (len % 4)) % 4)
  }
  if (!json) throw new Error('bloc JSON absent')
  return { json, bin }
}

// ----- petites matrices 4x4 (colonnes, comme glTF) -----
const I = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
function mul(a, b) {
  const o = new Array(16).fill(0)
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]
  return o
}
function trs(t, q, s) {
  const [x, y, z, w] = q
  const xx = x * x, yy = y * y, zz = z * z, xy = x * y, xz = x * z, yz = y * z, wx = w * x, wy = w * y, wz = w * z
  return [
    (1 - 2 * (yy + zz)) * s[0], (2 * (xy + wz)) * s[0], (2 * (xz - wy)) * s[0], 0,
    (2 * (xy - wz)) * s[1], (1 - 2 * (xx + zz)) * s[1], (2 * (yz + wx)) * s[1], 0,
    (2 * (xz + wy)) * s[2], (2 * (yz - wx)) * s[2], (1 - 2 * (xx + yy)) * s[2], 0,
    t[0], t[1], t[2], 1
  ]
}
const local = n => n.matrix ? n.matrix.slice() : trs(n.translation || [0, 0, 0], n.rotation || [0, 0, 0, 1], n.scale || [1, 1, 1])
const apply = (m, p) => [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]]

function imageSize(b) {
  try {
    if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)]
    if (b[0] === 0xff && b[1] === 0xd8) {
      let o = 2
      while (o + 9 < b.length) {
        if (b[o] !== 0xff) { o++; continue }
        const m = b[o + 1]
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(o + 7), b.readUInt16BE(o + 5)]
        o += 2 + b.readUInt16BE(o + 2)
      }
    }
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const f = b.toString('ascii', 12, 16)
      if (f === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]
      if (f === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)] }
      if (f === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
    }
  } catch (e) { /* taille inconnue */ }
  return null
}

const SUPPORTED_EXT = new Set([
  'KHR_materials_transmission', 'KHR_materials_ior', 'KHR_materials_volume', 'KHR_materials_specular', 'KHR_materials_clearcoat',
  'KHR_materials_sheen', 'KHR_materials_emissive_strength', 'KHR_materials_iridescence', 'KHR_texture_transform', 'KHR_mesh_quantization',
  'KHR_draco_mesh_compression', 'EXT_meshopt_compression', 'EXT_texture_webp', 'KHR_materials_unlit'
])

const norm = s => String(s || '').toLowerCase()

// config = contenu de content/negroni-model.json
export function inspect(buf, config) {
  const errors = [], warnings = [], info = {}
  let g
  try { g = parseGlb(buf) } catch (e) { return { ok: false, errors: ['fichier illisible : ' + e.message], warnings, info } }
  const J = g.json, nodes = J.nodes || [], lim = config.limits || {}
  info.bytes = buf.length
  if (lim.maxBytes && buf.length > lim.maxBytes) errors.push(`poids ${(buf.length / 1048576).toFixed(2)} Mo > maximum ${(lim.maxBytes / 1048576).toFixed(1)} Mo`)
  else if (lim.warnBytes && buf.length > lim.warnBytes) warnings.push(`poids ${(buf.length / 1048576).toFixed(2)} Mo : au-dessus de la cible de ${(lim.warnBytes / 1048576).toFixed(1)} Mo (acceptable, mais à alléger si possible)`)

  // extensions
  const req = J.extensionsRequired || [], used = J.extensionsUsed || []
  info.extensions = used
  for (const e of req) if (!SUPPORTED_EXT.has(e)) errors.push(`extension obligatoire non supportée : ${e}` + (e === 'KHR_texture_basisu' ? ' (textures KTX2 non prises en charge : utiliser WebP, JPEG ou PNG)' : ''))
  for (const e of used) if (!SUPPORTED_EXT.has(e) && !req.includes(e)) warnings.push(`extension ignorée : ${e}`)
  if (J.cameras && J.cameras.length) warnings.push('caméra(s) dans le fichier : ignorées')
  if ((used || []).includes('KHR_lights_punctual')) warnings.push('lumières dans le fichier : ignorées (l’éclairage est réglé par le site)')
  if (J.animations && J.animations.length) warnings.push('animations dans le fichier : ignorées (le mouvement est piloté par le site)')
  if (J.skins && J.skins.length) errors.push('armature/skin non supportés : livrer des objets rigides')

  // arbre des nœuds, matrices monde
  const parent = new Array(nodes.length).fill(-1)
  nodes.forEach((n, i) => (n.children || []).forEach(c => { parent[c] = i }))
  const world = new Array(nodes.length)
  const W = i => world[i] || (world[i] = parent[i] < 0 ? local(nodes[i]) : mul(W(parent[i]), local(nodes[i])))
  const accs = J.accessors || []
  const meshBox = mesh => {
    let lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], tris = 0
    for (const p of mesh.primitives || []) {
      const pos = accs[p.attributes && p.attributes.POSITION]
      if (!pos) continue
      if (pos.min && pos.max) { lo = lo.map((v, k) => Math.min(v, pos.min[k])); hi = hi.map((v, k) => Math.max(v, pos.max[k])) }
      const mode = p.mode == null ? 4 : p.mode
      if (mode === 4) tris += (p.indices != null ? accs[p.indices].count : pos.count) / 3
    }
    return { lo, hi, tris }
  }
  const sub = i => { const o = [i]; (nodes[i].children || []).forEach(c => o.push(...sub(c))); return o }
  const objBox = i => {
    let lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], tris = 0, meshes = 0
    for (const k of sub(i)) {
      const n = nodes[k]; if (n.mesh == null) continue
      const b = meshBox(J.meshes[n.mesh]); if (!isFinite(b.lo[0])) continue
      meshes++; tris += b.tris
      const m = W(k)
      for (let c = 0; c < 8; c++) {
        const p = apply(m, [c & 1 ? b.hi[0] : b.lo[0], c & 2 ? b.hi[1] : b.lo[1], c & 4 ? b.hi[2] : b.lo[2]])
        lo = lo.map((v, q) => Math.min(v, p[q])); hi = hi.map((v, q) => Math.max(v, p[q]))
      }
    }
    return meshes ? { lo, hi, tris, meshes } : null
  }
  let total = 0
  for (const n of nodes) if (n.mesh != null) total += meshBox(J.meshes[n.mesh]).tris
  info.triangles = Math.round(total)
  if (lim.maxTriangles && total > lim.maxTriangles) errors.push(`${Math.round(total)} triangles > maximum ${lim.maxTriangles}`)

  // textures
  const tex = []
  ;(J.images || []).forEach((im, k) => {
    let size = null, mime = im.mimeType
    if (im.bufferView != null && g.bin) { const bv = J.bufferViews[im.bufferView]; size = imageSize(g.bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength)) }
    tex.push({ name: im.name || 'image_' + k, mime, size })
    if (size && lim.maxTextureSize && Math.max(size[0], size[1]) > lim.maxTextureSize) errors.push(`texture « ${im.name || k} » ${size[0]}×${size[1]} > ${lim.maxTextureSize} px`)
    if (im.uri) errors.push(`texture « ${im.name || k} » externe (uri) : tout doit être dans le GLB`)
  })
  info.textures = tex
  info.materials = (J.materials || []).map(m => ({ name: m.name, transmission: !!(m.extensions && m.extensions.KHR_materials_transmission), blend: m.alphaMode === 'BLEND' }))

  // objets attendus
  const byName = new Map(); nodes.forEach((n, i) => { const k = norm(n.name); if (k && !byName.has(k)) byName.set(k, i) })
  info.nodeNames = nodes.map(n => n.name).filter(Boolean)
  info.parts = {}
  let glass = null
  for (const part of config.parts) {
    const opt = new Set((part.optionalObjects || []).map(norm))
    const found = []
    for (const name of part.objects) {
      const i = byName.get(norm(name))
      if (i == null) {
        const near = info.nodeNames.filter(n => norm(n).startsWith(norm(name)) || norm(name).startsWith(norm(n))).slice(0, 3)
        const msg = `objet « ${name} » introuvable` + (near.length ? ` (noms proches : ${near.join(', ')})` : '')
        if (part.optional || opt.has(norm(name))) warnings.push(msg + ' — facultatif, ignoré'); else errors.push(msg + ` — requis pour « ${part.key} »`)
        continue
      }
      const b = objBox(i)
      if (!b) { errors.push(`objet « ${name} » sans géométrie`); continue }
      found.push({ name, box: b, nodeIndex: i })
      const n = nodes[i]
      if (n.scale && n.scale.some(v => Math.abs(v - 1) > 1e-4)) warnings.push(`« ${name} » : échelle ≠ 1 (appliquer les transformations dans Blender)`)
      if (n.rotation && Math.abs(Math.abs(n.rotation[3]) - 1) > 1e-4) warnings.push(`« ${name} » : rotation ≠ 0 (appliquer les transformations dans Blender)`)
    }
    info.parts[part.key] = found.map(f => ({ name: f.name, size: f.box.hi.map((v, k) => v - f.box.lo[k]), min: f.box.lo, max: f.box.hi, triangles: Math.round(f.box.tris) }))
    if (part.key === 'glass' && found[0]) glass = found[0].box
  }
  // objets nommés non prévus : ils resteraient immobiles pendant l'éclatement
  const known = new Set(config.parts.flatMap(p => p.objects.map(norm)))
  const inKnown = new Set(); config.parts.forEach(p => p.objects.forEach(o => { const i = byName.get(norm(o)); if (i != null) sub(i).forEach(k => inKnown.add(k)) }))
  const extra = nodes.map((n, i) => ({ n, i })).filter(({ n, i }) => n.mesh != null && !inKnown.has(i) && !known.has(norm(n.name))).map(({ n }) => n.name || '(sans nom)')
  if (extra.length) warnings.push(`objet(s) non prévu(s), qui resteront immobiles : ${extra.join(', ')} (les nommer comme prévu ou les retirer)`)
  if (glass) {
    const h = glass.hi[1] - glass.lo[1]
    info.glassHeight = h
    const r = lim.glassHeightMeters
    if (r && (h < r[0] || h > r[1])) warnings.push(`hauteur du verre ${(h * 100).toFixed(1)} cm hors de la plage attendue ${r[0] * 100}–${r[1] * 100} cm : vérifier l’échelle (1 unité = 1 mètre)`)
    if (Math.abs(glass.lo[1]) > 0.004) warnings.push(`le bas du verre est à y = ${(glass.lo[1] * 100).toFixed(1)} cm (attendu 0)`)
    const cx = (glass.lo[0] + glass.hi[0]) / 2, cz = (glass.lo[2] + glass.hi[2]) / 2
    if (Math.hypot(cx, cz) > 0.004) warnings.push(`le verre n’est pas centré sur l’axe vertical (décalage ${(Math.hypot(cx, cz) * 100).toFixed(1)} cm)`)
    const inside = (b, name) => { const c = [0, 1, 2].map(k => (b.lo[k] + b.hi[k]) / 2); for (const k of [0, 2]) if (c[k] < glass.lo[k] || c[k] > glass.hi[k]) warnings.push(`« ${name} » : centre hors du verre`); if (c[1] < glass.lo[1] || c[1] > glass.hi[1] + 0.03) warnings.push(`« ${name} » : centre trop haut ou trop bas par rapport au verre`) }
    for (const part of config.parts) for (const f of (info.parts[part.key] || [])) if (part.key !== 'glass' && part.key !== 'orange_peel') inside({ lo: f.min, hi: f.max }, f.name)
  }
  return { ok: errors.length === 0, errors, warnings, info }
}

export function formatReport(r) {
  const L = [], i = r.info
  if (i.bytes != null) L.push(`poids : ${(i.bytes / 1048576).toFixed(2)} Mo — triangles : ${i.triangles ?? '?'}`)
  if (i.glassHeight != null) L.push(`verre : hauteur ${(i.glassHeight * 100).toFixed(1)} cm`)
  for (const [k, v] of Object.entries(i.parts || {})) if (v.length) L.push(`  ${k} : ` + v.map(o => `${o.name} (${o.size.map(s => (s * 100).toFixed(1)).join('×')} cm, ${o.triangles} tri)`).join(' ; '))
  if (i.textures && i.textures.length) L.push('textures : ' + i.textures.map(t => `${t.name} ${t.size ? t.size.join('×') : '?'} ${t.mime || ''}`).join(' ; '))
  if (i.materials && i.materials.length) L.push('matériaux : ' + i.materials.map(m => m.name + (m.transmission ? ' [transmission]' : m.blend ? ' [alpha]' : '')).join(', '))
  r.warnings.forEach(w => L.push('⚠ ' + w))
  r.errors.forEach(e => L.push('✗ ' + e))
  L.push(r.ok ? '✓ fichier utilisable' : '✗ fichier refusé')
  return L.join('\n')
}
