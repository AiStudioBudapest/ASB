# Technical brief: photorealistic 3D model of the Negroni cocktail

**Project:** drinks menu of pr09re55 (Budapest), opened on a phone by scanning a QR code.
**Main deliverable:** a real-time GLB file of the Negroni cocktail, with separated components, for an interactive "exploded view".
**Version:** 1.0 — November 2026 — *Version française : `cahier-des-charges-negroni-3d.fr.md`*

---

## 1. Context and goal

In the web menu, tapping the Negroni opens a 3D view of the cocktail. The drink comes apart into its components (glass, three liquids, ice, orange), which float along a vertical axis with a label each, then reassemble exactly as they were. The visitor can rotate the model.

The website (developed separately) loads your GLB file and drives it: lights, environment reflections, shadow, and the movements and rotations of each piece. **Your role is to produce the 3D model**, not the web page. The site's current model is a code-generated prototype; it will be replaced by yours and must not be imitated.

**Expected quality: photorealistic.** The render must come close to an advertising photograph of a cocktail, not a stylised, simplified or cartoon-like model. The constraint is that the model must display in real time on a phone, hence the technical budgets in chapter 7.

## 2. The reference cocktail

- Classic Negroni, served on ice in an old fashioned glass (short, straight-sided tumbler with a heavy base).
- Menu text: *Bobby’s Dry Gin, Campari, Vermouth*.
- **Reference recipe: equal parts gin, Campari and red vermouth (30 ml each, i.e. 90 ml of liquid before dilution)**, orange garnish. This is the classic recipe; the bar must confirm its own (see chapter 12).
- Colour of the mixed drink: deep ruby red, orange when light passes through it, translucent.

## 3. Objects to deliver (names and role)

Each component is **a separate object, named exactly as below**, at the root of the scene (no parent object, no hierarchy). The names are provisional and can be adapted by mutual agreement: the site reads them from a configuration file.

| Object name | Content | Required |
|---|---|---|
| `Glass` | The old fashioned glass (one piece, with real thickness) | yes |
| `Liquid_Vermouth` | Bottom liquid volume (vermouth) | yes |
| `Liquid_Campari` | Middle liquid volume (Campari) | yes |
| `Liquid_Gin` | Top liquid volume (gin) | yes |
| `Ice_01` | Ice cube no. 1 | yes |
| `Ice_02`, `Ice_03` | Ice cubes no. 2 and 3 | recommended |
| `Orange_Slice` | Detailed orange slice | yes |
| `Orange_Peel` | Orange peel (twisted strip) | recommended |

No other object may be in the file (no table, backdrop, light, camera or decorative object): any extra object would stay still during the explosion.

## 4. Dimensions, scale and reference frame

- **Unit: the metre** (1 Blender unit = 1 m). Vertical axis **Y up** in the GLB (the Blender glTF exporter converts Z to Y: tick "+Y Up"). The front of the model faces +Z.
- **Glass:** height **8.5 to 9 cm** (accepted range: 7 to 11 cm), outer diameter at the rim about 7.5 to 8 cm, real wall thickness of **4 to 6 mm**, thick base of **15 to 20 mm**. Straight, smooth glass, with no engraving or facets, unless a reference photo supplied by the client shows otherwise.
- **The bottom of the glass sits at y = 0** and the glass is **centred on the vertical axis** (x = 0, z = 0).
- **Each object's origin: at the centre of its bounding box**, or at its centre of mass. All transforms (scale, rotation) are **applied** (scale 1, rotation 0) before export.
- **Liquid level:** the liquid rises to about 5.5 to 6 cm from the base, that is, below the rim, with the ice protruding above the liquid.
- All objects are in their **original assembled position** in the delivered file: this is the position the site returns them to when reassembling.

## 5. Specifications per component

### 5.1 The glass (`Glass`)
- Real wall and base thickness, closed geometry: outer face, inner face, rounded rim (real radius), not a single plane.
- Realistic transparency: **IOR 1.5**, transmission 1, very low roughness (0.02 to 0.05), slight surface imperfections (micro-scratches, marks) without making the render look dirty.
- The thick base must produce visible, real refraction.
- The glass carries no label or text.

### 5.2 The three liquids (`Liquid_Vermouth`, `Liquid_Campari`, `Liquid_Gin`)
- **Realistic volumes and proportions consistent with a real Negroni: three equal parts.** Together, the three volumes **exactly rebuild the liquid in the glass**: no gap, no overlap. The calculation must account for the ice cubes that sink into the liquid.
- Order from bottom to top: vermouth, Campari, gin. The three volumes are obtained by **slicing the liquid with horizontal planes**, so that their contact faces are flat and perfectly joined.
- Each volume is **closed** (watertight), with a top face, a bottom face and sides that follow the inside of the glass (without crossing it). The top volume has a slight **meniscus** along the wall.
- The submerged parts of the ice cubes are **subtracted** from the volumes (no intersecting geometry).
- Each volume must look good **on its own**, in the exploded view, seen slightly from above and from below.
- Materials: transparent liquid (transmission, IOR 1.33 to 1.36, attenuation by thickness (`KHR_materials_volume`)). Colour of each ingredient in the exploded view: **gin** almost colourless (very slight bluish tint), **Campari** vivid translucent red, **vermouth** reddish amber. In the **assembled** view, the whole must read as one ruby-red Negroni: chapter 6 explains how to deliver the two colour states.

### 5.3 The ice cubes (`Ice_01`, `Ice_02`, `Ice_03`)
- **Irregular and natural**: edges rounded by melting, slightly bulging faces, internal cracks, air bubbles and a slightly cloudy core. No perfect cubes.
- Natural transparency and reflections: **IOR 1.31**, high transmission, wet and shiny surface.
- Three different shapes, about 2.5 to 3.2 cm, varied orientations, **resting in the glass** without crossing its walls. The submerged parts are consistent with the liquid level.

### 5.4 The orange (`Orange_Slice`, `Orange_Peel`)
- **`Orange_Slice`: detailed slice**, diameter 6 to 7 cm, thickness 4 to 6 mm: **skin** (coloured zest with pore texture), **white pith** (albedo), distinct **segments** (8 to 10) separated by membranes, **pulp** with translucent, glistening juice vesicles, central core. Slight relief on the cut side. Translucent look of the pulp (transmission/volume or a backlight texture).
- Resting on the rim of the glass, slightly tilted, held by a realistic notch.
- **`Orange_Peel`: peel** as a twisted strip of 6 to 8 cm, coloured side with pores and essential-oil sheen, visible white pith side, cleanly cut ends. Placed in the glass or on the slice, without intersection.

## 6. Materials, lighting and textures

- **Material format: glTF 2.0 PBR (metallic-roughness)**, with only these extensions: `KHR_materials_transmission`, `KHR_materials_ior`, `KHR_materials_volume`, `KHR_materials_specular`, `KHR_materials_clearcoat`, `KHR_materials_emissive_strength`, `KHR_texture_transform`. No Blender shader nodes that cannot be exported: **check the export by reopening the GLB** (Blender, glTF viewer).
- **No baked light, reflections or shadows in the textures**: the site lights the model itself (studio environment, reflections, cast shadow) and rotates it through 360°. Clean albedo textures, plus normal, roughness and occlusion maps if needed.
- **Textures:** maximum 2,048 × 2,048 px (1,024 recommended for everything except the orange), **WebP, JPEG or PNG** embedded in the GLB. **KTX2/Basis is not supported.** Correct colour space (sRGB for albedo, linear for the rest).
- **Materials: at most 8** in the file, named (`M_Glass`, `M_Ice`, `M_Gin`, `M_Campari`, `M_Vermouth`, `M_OrangePeel`, `M_OrangePulp`...).
- **Liquid colours, two states.** The GLB materials are those of the **assembled view** (the ruby-red mix, each volume with a very close tint). For the **exploded view**, also supply, for each liquid, the ingredient colour and the attenuation colour (hex values in the delivery document). The site slides the colour from one to the other during the animation. If the look does not work this way, see chapter 12.

## 7. Technical budgets (hard limits)

| Item | Limit |
|---|---|
| GLB file weight | **3 MB maximum**; target **1.5 MB** |
| Triangles, total | **60,000 maximum**; target 35,000 to 45,000 |
| Indicative split | glass ≤ 10,000; each liquid ≤ 6,000; each ice cube ≤ 4,000; slice ≤ 12,000; peel ≤ 4,000 |
| Textures | 2,048 px maximum, WebP/JPEG/PNG |
| Geometry compression | **Meshopt recommended** (Draco accepted) |
| Exclude | animations, cameras, lights, armatures/skins, external textures |

The model must stay smooth on a mid-range phone: no thousands of triangles wasted on smooth surfaces, no needless hidden geometry. Optimisation (removing invisible faces, decimation, compression) is part of the job.

## 8. How the site animates the model (good to know)

- Each object is **rigid** and moves independently: it rises along the vertical axis with a slight sideways arc and a gentle rotation, then returns exactly to its original position. The glass goes down; the others rise in order (peel, slice, ice, gin, Campari, vermouth).
- The visitor can rotate the view through 360°, from the front, slightly above or below: **all objects must look good from every angle**, including faces hidden in the assembled view (underside of the ice, base of the liquid volumes).
- No intersection between objects in the assembled state.

## 9. Deliverables

1. `negroni.glb`: the final model, as described above.
2. **The Blender source file (`.blend`)**, organised (named collections, embedded textures), with the Blender version stated.
3. **Validation renders (PNG, at least 2,400 px wide)**: **assembled** view (front, 3/4, top) and **exploded** view (front, 3/4, top), with the pieces separated along the vertical axis, neutral background.
4. The source textures (working files) and the list of materials with their colours (hex) in assembled and exploded states.
5. A short **delivery note**: Blender version, extensions used, triangle count per object, any limitations.
6. **Rights:** original work, full exploitation rights for the client (commercial use, modification). Any third-party resource (texture, model) must be declared and cleared for this use.

## 10. Stages and visual validation

**No final integration into the site before the client's written approval, after a visual review of both the assembled AND exploded views.**

1. **Questions and references**: the artist goes through the open points (chapter 12) with the client.
2. **Stage A: grey volumes (blockout).** Shapes and proportions of all objects, assembled view and exploded view in a grey render. Client validation: proportions, equal parts, silhouette.
3. **Stage B: materials and renders.** Photorealistic renders (chapter 9, item 3) of the assembled and exploded views. **Client visual validation of both views.**
4. **Stage C: optimised GLB.** Export, compression, budget check.
5. **Stage D: automatic check and private preview.** The developer runs `node tools/glb-check.mjs negroni.glb` (names, weight, triangles, scale, position) and opens the model in a private preview of the menu, not public. The client validates both views again in the real site.
6. **Stage E: final integration**, after the client's written approval.

The number of correction rounds per stage is to be agreed with the client when ordering.

## 11. Validation criteria (checklist)

- [ ] Exact object names, all at the root, no extra objects.
- [ ] Scale in metres, glass 7 to 11 cm tall, bottom at y = 0, centred on the axis, transforms applied.
- [ ] Each object's origin at its centre.
- [ ] Three liquids in equal parts, watertight, joined, not overlapping, not crossing the glass or the ice.
- [ ] Ice cubes irregular, transparent, with natural reflections and internal flaws.
- [ ] Glass: real thickness, thick base, convincing refraction and reflections.
- [ ] Orange: skin, pith, segments and pulp visible; detailed peel.
- [ ] Assembled and exploded renders supplied and approved by the client.
- [ ] Weight ≤ 3 MB, triangles ≤ 60,000, textures ≤ 2,048 px, no KTX2.
- [ ] No animation, camera, light or armature; no baked light in the textures.
- [ ] The automatic check `node tools/glb-check.mjs` reports "usable file" with no blocking warning.
- [ ] Clean and elegant from every rotation angle.
- [ ] `.blend` file, source textures and delivery note supplied.

## 12. Open points (proposed default, to be confirmed by the client)

1. **The bar's recipe:** equal parts 30/30/30 ml by default. The bar may use other proportions; to be confirmed.
2. **Exact shape of the glass:** straight tumbler with a thick base by default. The client can supply a photo of the glass used at the bar.
3. **Liquid colours:** in the assembled view, the mix has a single tint (like a real Negroni); in the exploded view, each ingredient takes back its colour. **Alternative:** if the client prefers to see three distinct coloured layers from the assembled view, the three materials stay those of each ingredient (less realistic, but easier to read). To be decided before stage B.
4. **Garnish:** orange slice on the rim plus peel, or slice only. The peel is optional (`Orange_Peel` object).
5. **Gin:** the menu mentions "Bobby’s Dry Gin"; no brand, label or bottle appears in the model.

## 13. Contact and technical exchanges

The site developer supplies the artist, on request, with:
- the configuration file `content/negroni-model.json` (object names, movements, limits);
- an automatic check of each file received (`node tools/glb-check.mjs negroni.glb`, run by the developer on receipt; the artist can also run it if Node.js is installed);
- feedback on the private preview of each delivered version.

Any deviation from this brief (names, budgets, scale) should be reported before production, so the site can be adapted rather than discovering a problem at delivery.
