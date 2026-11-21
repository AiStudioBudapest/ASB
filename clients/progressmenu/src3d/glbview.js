// Vue éclatée à partir d'un modèle 3D EXTERNE (GLB produit par un artiste 3D) : aucune géométrie n'est inventée ici.
// Chargé à la demande (jamais avec la page) et SEULEMENT si un GLB valide est présent (voir build.mjs).
// Les noms d'objets et les trajectoires viennent de content/negroni-model.json (copié dans dist/assets/models/).
// Reconstruire : node tools/build3d.mjs
import {
  Box3, Vector3, Group, Raycaster, MathUtils, Color, PMREMGenerator, ACESFilmicToneMapping
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// GLTFLoader nettoie les noms (espaces -> _, caractères réservés supprimés) : on applique la même règle à la configuration.
const clean = s => String(s).replace(/\s/g, '_').replace(/[\[\]\.:\/]/g, '').toLowerCase()
const BASE = './negroni3d.js'

function loadGltf(url) {
  const loader = new GLTFLoader()
  const draco = new DRACOLoader(); draco.setDecoderPath('assets/vendor/draco/') // téléchargé seulement si le GLB est compressé en Draco
  loader.setDRACOLoader(draco).setMeshoptDecoder(MeshoptDecoder)
  return loader.loadAsync(url).finally(() => draco.dispose())
}

function findObjects(root, part) {
  const idx = {}
  root.traverse(o => { if (o.name) { const k = clean(o.name); if (!idx[k]) idx[k] = o } })
  const opt = new Set((part.optionalObjects || []).map(clean))
  const objs = []
  for (const name of part.objects) {
    const o = idx[clean(name)]
    if (o) objs.push({ name, o })
    else if (!part.optional && !opt.has(clean(name))) throw new Error('objet « ' + name + ' » absent du modèle')
  }
  return objs
}

// Charge le modèle + la configuration ; échoue (=> le site garde l'expérience actuelle) si un objet requis manque.
export async function load(modelUrl, cfgUrl) {
  const eng = import(/* @vite-ignore */ BASE)
  const [cfg, gltf, m] = await Promise.all([
    fetch(cfgUrl).then(r => { if (!r.ok) throw new Error('configuration introuvable'); return r.json() }),
    loadGltf(modelUrl), eng
  ])
  const present = []
  for (const part of cfg.parts) { if (findObjects(gltf.scene, part).length) present.push(part.key) }
  if (present.indexOf('glass') < 0) throw new Error('objet verre absent')
  return {
    glb: { present, cfg },
    create(host) { return m.create(host, 'glb', { build: ctx => buildScene(ctx, cfg, gltf.scene) }) }
  }
}

const small = () => { try { return matchMedia('(pointer:coarse)').matches || innerWidth < 820 } catch (e) { return false } }

function buildScene(ctx, cfg, src) {
  const { add, root, renderer, scene, cam, lights } = ctx
  const R = cfg.render || {}, GH = cfg.glassHeightUnits || 2.6
  // rendu : exposition, reflets d'environnement (studio procédural, rien à télécharger), transmission allégée sur mobile
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = R.exposure == null ? 1 : R.exposure
  if (small() && 'transmissionResolutionScale' in renderer) renderer.transmissionResolutionScale = R.mobileTransmissionScale || .5
  const pm = new PMREMGenerator(renderer)
  scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture
  scene.environmentIntensity = R.envIntensity == null ? 1 : R.envIntensity
  pm.dispose()
  lights.hemi.intensity = .3; lights.key.intensity = 1.5

  const model = src.clone(true)
  root.add(model)
  const glassPart = cfg.parts.find(p => p.key === 'glass')
  const gObj = findObjects(model, glassPart)[0].o
  model.updateMatrixWorld(true)
  const gb = new Box3().setFromObject(gObj)
  // normalisation d'échelle : hauteur du verre = GH unités, posé en y = 0, centré sur l'axe (le modèle lui-même n'est jamais déformé)
  const s = GH / (gb.max.y - gb.min.y)
  model.scale.setScalar(s)
  model.position.set(-(gb.min.x + gb.max.x) / 2 * s, -gb.min.y * s, -(gb.min.z + gb.max.z) / 2 * s)
  root.updateMatrixWorld(true)

  const parts = [], meshes = [], tmp = new Vector3()
  let yLo = Infinity, yHi = -Infinity, wMax = 0, glassW = 0
  for (const part of cfg.parts) {
    const found = findObjects(model, part); if (!found.length) continue
    const entry = { key: part.key, move: part.move, per: part.perObject || [], tint: part.tint, objs: [], rw: 0, fp: 0 }
    found.forEach(f => {
      const box = new Box3().setFromObject(f.o), c = box.getCenter(new Vector3())
      const w = new Group(); w.position.copy(c); root.add(w); w.updateMatrixWorld(true)
      w.attach(f.o) // garde exactement la position et l'orientation d'origine
      f.o.traverse(m => { if (m.isMesh) { meshes.push(m); m.userData.__k = part.key; if (part.tint) m.material = m.material.clone() } })
      entry.objs.push({ w, c0: c.clone(), name: f.name })
      entry.rw = Math.max(entry.rw, (box.max.x - box.min.x) / 2 + .12)
      const lift = (part.move.lift || 0) * GH
      yLo = Math.min(yLo, box.min.y + lift); yHi = Math.max(yHi, box.max.y + lift)
      wMax = Math.max(wMax, box.max.x - box.min.x)
      if (part.key === 'glass') glassW = box.max.x - box.min.x
    })
    if (part.tint) { entry.ca = new Color(part.tint.assembled); entry.ce = new Color(part.tint.exploded) }
    const g = new Group(); add(part.key, g, 0, 0, { a: part.move.window[0], b: part.move.window[1], rw: entry.rw })
    parts.push(entry)
  }
  const glass = parts.find(p => p.key === 'glass')
  const ray = new Raycaster()
  let focus = null

  return {
    order: parts.map(p => p.key),
    cam: { visA: GH * 1.75, visE: (yHi - yLo) * 1.16 + .6, tyA: GH * .48, tyE: (yHi + yLo) / 2, el: .17, wmin: wMax * 1.3 },
    axis: [yLo - .4, yHi + .4],
    shadowScale: (glassW * 2.2) / 4.6,
    shadowAt: () => glass.objs[0].w.position.y - glass.objs[0].c0.y - .01,
    update(t, P) {
      parts.forEach((pt, k) => {
        const p = P[pt.key].p
        pt.fp += (((focus === pt.key && p > .98) ? 1 : 0) - pt.fp) * .14
        pt.objs.forEach((o, i) => {
          const mv = Object.assign({}, pt.move, pt.per[i] || {}), sp = Math.sin(Math.PI * p)
          const dr = mv.drift || [0, 0], en = mv.end || [0, 0], sn = mv.spin || [0, 0, 0]
          o.w.position.set(o.c0.x + (en[0] * p + dr[0] * sp) * GH, o.c0.y + (mv.lift || 0) * GH * p + Math.sin(t * 1.3 + k + i) * .02 * p, o.c0.z + (en[1] * p + dr[1] * sp) * GH)
          o.w.rotation.set(sn[0] * p, sn[1] * p, sn[2] * p)
          o.w.scale.setScalar(1 + .06 * pt.fp)
        })
        if (pt.ca) pt.objs.forEach(o => o.w.traverse(m => { if (m.isMesh) { m.material.color.lerpColors(pt.ca, pt.ce, p); if (m.material.attenuationColor) m.material.attenuationColor.lerpColors(pt.ca, pt.ce, p) } }))
      })
    },
    anchor(k) {
      const pt = parts.find(p => p.key === k); tmp.set(0, 0, 0)
      pt.objs.forEach(o => tmp.add(o.w.position)); tmp.multiplyScalar(1 / pt.objs.length)
      root.localToWorld(tmp)
      return { x: tmp.x, y: tmp.y, z: tmp.z, rw: pt.rw }
    },
    pick(x, y) {
      ray.setFromCamera({ x, y }, cam)
      const h = ray.intersectObjects(meshes, false)
      return h.length ? h[0].object.userData.__k : null
    },
    focus(k) { focus = k },
    focusKey() { return focus },
    // contrôle : positions exactes des pièces (le test vérifie le retour à l'état d'origine)
    debug() { return parts.map(p => ({ key: p.key, objs: p.objs.map(o => ({ pos: o.w.position.toArray(), rot: [o.w.rotation.x, o.w.rotation.y, o.w.rotation.z], c0: o.c0.toArray() })) })) }
  }
}
