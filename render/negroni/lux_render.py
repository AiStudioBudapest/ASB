# Luxury studio render of the Negroni (Cycles). Loads lux-geometry.blend, builds materials, studio,
# camera and an optional turntable, renders EXR and a graded PNG.
# usage: python3 lux_render.py -- key=value ...
#   blend=.../lux-geometry.blend  out=/path/base (still)  angle=-33  res=1350  samples=128  cam=hero
#   frames=0-71 nframes=72 outdir=/path (turntable)  save=/path/scene.blend  grade=1
import bpy, math, sys, os, time, json
import numpy as np
from mathutils import Vector

A = dict(a.split('=', 1) for a in sys.argv[sys.argv.index('--') + 1:]) if '--' in sys.argv else {}
HERE = os.path.dirname(os.path.abspath(__file__))
BLEND = A.get('blend', '/mnt/project-files/negroni-3d/lux/lux-geometry.blend')
TEXDIR = A.get('tex', os.path.dirname(BLEND) + '/')
RES = int(A.get('res', 1350)); SAMPLES = int(A.get('samples', 128))
CAM = A.get('cam', 'hero'); EXPO = float(A.get('expo', 1.0))
t0 = time.time()
def log(*a): print('[%6.1fs]' % (time.time() - t0), *a, flush=True)

bpy.ops.wm.open_mainfile(filepath=BLEND)
scene = bpy.context.scene; coll = bpy.data.collections['Negroni']
P = lambda: None

# ------------------------------------------------------------------------------------------------ helpers
def new_mat(name):
    m = bpy.data.materials.get(name)
    if m is None: m = bpy.data.materials.new(name)
    m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    return m, nt, out

def principled(nt, **kw):
    b = nt.nodes.new('ShaderNodeBsdfPrincipled')
    for k, v in kw.items():
        if k in b.inputs: b.inputs[k].default_value = v
        elif k == 'sss_method': b.subsurface_method = v
        else: print('  (no input', k, ')')
    return b

def link(nt, a, b): nt.links.new(a, b)

def dielectric(name, ior, rough=0.0, tint=(1, 1, 1, 1), volume=None, bump=None, dispersion=0.0):
    m, nt, out = new_mat(name)
    b = nt.nodes.new('ShaderNodeBsdfGlass')        # Glass BSDF handles relative IOR < 1 (interfaces, air pockets)
    b.inputs['Color'].default_value = tint; b.inputs['Roughness'].default_value = rough; b.inputs['IOR'].default_value = ior
    if dispersion and 'Dispersion' in b.inputs: b.inputs['Dispersion'].default_value = dispersion
    link(nt, b.outputs[0], out.inputs['Surface'])
    if volume: link(nt, volume(nt).outputs[0], out.inputs['Volume'])
    if bump: link(nt, bump(nt).outputs[0], b.inputs['Normal'])
    return m

def tex_coord(nt): return nt.nodes.new('ShaderNodeTexCoord')

def noise_bump(scale, strength, distance, detail=3.0, rough=0.55):
    def f(nt):
        tc = tex_coord(nt); nz = nt.nodes.new('ShaderNodeTexNoise')
        nz.inputs['Scale'].default_value = scale; nz.inputs['Detail'].default_value = detail; nz.inputs['Roughness'].default_value = rough
        link(nt, tc.outputs['Object'], nz.inputs['Vector'])
        bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = strength; bp.inputs['Distance'].default_value = distance
        link(nt, nz.outputs['Fac'], bp.inputs['Height']); return bp
    return f

# liquid absorption: sigma per metre (R, G, B) -> Volume Absorption colour/density
SIG = [float(x) for x in A.get('sigma', '8,42,75').split(',')]
def liquid_volume(nt):
    d = max(SIG); a = nt.nodes.new('ShaderNodeVolumeAbsorption')
    a.inputs['Color'].default_value = (1 - SIG[0] / d, 1 - SIG[1] / d, 1 - SIG[2] / d, 1); a.inputs['Density'].default_value = d
    return a

N_GLASS, N_LIQ, N_ICE, N_WATER = 1.52, 1.34, 1.31, 1.333
M = {}
M['M_Glass'] = dielectric('M_Glass', N_GLASS, 0.0, (0.995, 1.0, 0.997, 1))
FOG = float(A.get('fog', 0.16))
if FOG > 0:
    # outer face (normal pointing away from the axis) x below the liquid line x patchy noise -> roughness
    nt = M['M_Glass'].node_tree; gb_ = [n_ for n_ in nt.nodes if n_.type == 'BSDF_GLASS'][0]
    tc = tex_coord(nt)
    sxyz = nt.nodes.new('ShaderNodeSeparateXYZ'); link(nt, tc.outputs['Object'], sxyz.inputs[0])
    rad = nt.nodes.new('ShaderNodeVectorMath'); rad.operation = 'MULTIPLY'; rad.inputs[1].default_value = (1, 1, 0)
    link(nt, tc.outputs['Object'], rad.inputs[0])
    rn = nt.nodes.new('ShaderNodeVectorMath'); rn.operation = 'NORMALIZE'; link(nt, rad.outputs[0], rn.inputs[0])
    dt = nt.nodes.new('ShaderNodeVectorMath'); dt.operation = 'DOT_PRODUCT'; link(nt, rn.outputs[0], dt.inputs[0]); link(nt, tc.outputs['Normal'], dt.inputs[1])
    outer = nt.nodes.new('ShaderNodeMapRange'); outer.inputs['From Min'].default_value = 0.35; outer.inputs['From Max'].default_value = 0.6
    link(nt, dt.outputs['Value'], outer.inputs['Value'])
    # glass object origin = bounds centre (z 0.044): liquid line 0.064 -> 0.020 local; fades out 2 mm below the line
    below = nt.nodes.new('ShaderNodeMapRange'); below.inputs['From Min'].default_value = 0.0195; below.inputs['From Max'].default_value = 0.0165
    link(nt, sxyz.outputs['Z'], below.inputs['Value'])
    nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 90.0; nz.inputs['Detail'].default_value = 4.0
    link(nt, tc.outputs['Object'], nz.inputs['Vector'])
    patch = nt.nodes.new('ShaderNodeMapRange'); patch.inputs['From Min'].default_value = 0.35; patch.inputs['From Max'].default_value = 0.65
    patch.inputs['To Min'].default_value = 0.45; patch.inputs['To Max'].default_value = 1.0; link(nt, nz.outputs['Fac'], patch.inputs['Value'])
    m1 = nt.nodes.new('ShaderNodeMath'); m1.operation = 'MULTIPLY'; link(nt, outer.outputs['Result'], m1.inputs[0]); link(nt, below.outputs['Result'], m1.inputs[1])
    m2 = nt.nodes.new('ShaderNodeMath'); m2.operation = 'MULTIPLY'; link(nt, m1.outputs[0], m2.inputs[0]); link(nt, patch.outputs['Result'], m2.inputs[1])
    m3 = nt.nodes.new('ShaderNodeMath'); m3.operation = 'MULTIPLY'; m3.inputs[1].default_value = FOG; link(nt, m2.outputs[0], m3.inputs[0])
    link(nt, m3.outputs[0], gb_.inputs['Roughness'])
M['M_LiqGlass'] = dielectric('M_LiqGlass', N_LIQ / N_GLASS, 0.0, volume=liquid_volume)
M['M_LiqAir'] = dielectric('M_LiqAir', N_LIQ, 0.0, volume=liquid_volume)
M['M_LiqIce'] = dielectric('M_LiqIce', N_LIQ / N_ICE, float(A.get('liqice_r', 0.07)), volume=liquid_volume)
M['M_LiqSlabCut'] = dielectric('M_LiqSlabCut', N_LIQ, 0.0, volume=liquid_volume)
def ice_mat(name):
    # wet, slightly melted ice: clear glass with patchy micro-roughness and a touch of frosty translucency
    m, nt, out = new_mat(name)
    g = nt.nodes.new('ShaderNodeBsdfGlass'); g.inputs['IOR'].default_value = N_ICE; g.inputs['Color'].default_value = (0.985, 0.995, 1.0, 1)
    tc = tex_coord(nt); nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 140.0; nz.inputs['Detail'].default_value = 5.0
    link(nt, tc.outputs['Object'], nz.inputs['Vector'])
    rr = nt.nodes.new('ShaderNodeMapRange'); rr.inputs['From Min'].default_value = 0.35; rr.inputs['From Max'].default_value = 0.72
    rr.inputs['To Min'].default_value = float(A.get('ice_r0', 0.04)); rr.inputs['To Max'].default_value = float(A.get('ice_r1', 0.30))
    link(nt, nz.outputs['Fac'], rr.inputs['Value']); link(nt, rr.outputs['Result'], g.inputs['Roughness'])
    bp = noise_bump(260.0, 0.06, 0.00025, 4.0)(nt); link(nt, bp.outputs[0], g.inputs['Normal'])
    tl = nt.nodes.new('ShaderNodeBsdfTranslucent'); tl.inputs['Color'].default_value = (0.95, 0.97, 1.0, 1)
    mx = nt.nodes.new('ShaderNodeMixShader'); mx.inputs['Fac'].default_value = float(A.get('ice_frost', 0.05))
    link(nt, g.outputs[0], mx.inputs[1]); link(nt, tl.outputs[0], mx.inputs[2]); link(nt, mx.outputs[0], out.inputs['Surface'])
    return m
M['M_Ice'] = ice_mat('M_Ice')
# air pockets: bubbles + fracture planes, with a whitish frosty look on the fractures
m, nt, out = new_mat('M_IceAir')
tr = nt.nodes.new('ShaderNodeBsdfTransparent'); tl = nt.nodes.new('ShaderNodeBsdfTranslucent'); tl.inputs['Color'].default_value = (0.95, 0.97, 1.0, 1)
gl = nt.nodes.new('ShaderNodeBsdfGlossy'); gl.inputs['Roughness'].default_value = 0.08
mx = nt.nodes.new('ShaderNodeMixShader'); mx.inputs['Fac'].default_value = float(A.get('crack_frost', 0.45))
mx2 = nt.nodes.new('ShaderNodeMixShader'); mx2.inputs['Fac'].default_value = 0.18
link(nt, tr.outputs[0], mx.inputs[1]); link(nt, tl.outputs[0], mx.inputs[2])
link(nt, mx.outputs[0], mx2.inputs[1]); link(nt, gl.outputs[0], mx2.inputs[2]); link(nt, mx2.outputs[0], out.inputs['Surface'])
M['M_IceAir'] = m
M['M_Water'] = dielectric('M_Water', N_WATER, 0.0)

# misty core: faint translucent veil, patchy
m, nt, out = new_mat('M_IceMist')
tr = nt.nodes.new('ShaderNodeBsdfTransparent'); tl = nt.nodes.new('ShaderNodeBsdfTranslucent'); tl.inputs['Color'].default_value = (0.92, 0.95, 1.0, 1)
mix = nt.nodes.new('ShaderNodeMixShader'); tc = tex_coord(nt); nz = nt.nodes.new('ShaderNodeTexNoise')
nz.inputs['Scale'].default_value = 420.0; nz.inputs['Detail'].default_value = 6.0; nz.inputs['Roughness'].default_value = 0.6
link(nt, tc.outputs['Object'], nz.inputs['Vector'])
cr = nt.nodes.new('ShaderNodeMapRange'); cr.inputs['From Min'].default_value = 0.42; cr.inputs['From Max'].default_value = 0.75
cr.inputs['To Min'].default_value = 0.0; cr.inputs['To Max'].default_value = float(A.get('mist', 0.25))
link(nt, nz.outputs['Fac'], cr.inputs['Value']); link(nt, cr.outputs['Result'], mix.inputs['Fac'])
link(nt, tr.outputs[0], mix.inputs[1]); link(nt, tl.outputs[0], mix.inputs[2]); link(nt, mix.outputs[0], out.inputs['Surface'])
M['M_IceMist'] = m

# orange wheel cut faces: albedo + height bump + masks (pulp / pith / zest)
m, nt, out = new_mat('M_OrangePulp')
uv = nt.nodes.new('ShaderNodeUVMap'); uv.uv_map = 'UVMap'
def img(path, cs):
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(path, check_existing=True)
    t.image.colorspace_settings.name = cs; t.interpolation = 'Cubic'; link(nt, uv.outputs['UV'], t.inputs['Vector']); return t
alb = img(TEXDIR + 'slice_albedo.png', 'sRGB'); hgt = img(TEXDIR + 'slice_height.png', 'Non-Color'); msk = img(TEXDIR + 'slice_masks.png', 'Non-Color')
sep = nt.nodes.new('ShaderNodeSeparateColor'); link(nt, msk.outputs['Color'], sep.inputs['Color'])
b = principled(nt, **{'Subsurface Radius': (1.0, 0.36, 0.12), 'Subsurface Scale': float(A.get('sss', 0.0026)), 'sss_method': 'RANDOM_WALK',
                      'Coat Roughness': 0.05, 'Specular IOR Level': 0.55, 'IOR': 1.36})
link(nt, alb.outputs['Color'], b.inputs['Base Color'])
def mr(src, a0, a1, b0, b1):
    n_ = nt.nodes.new('ShaderNodeMapRange'); n_.inputs['From Min'].default_value = a0; n_.inputs['From Max'].default_value = a1
    n_.inputs['To Min'].default_value = b0; n_.inputs['To Max'].default_value = b1; link(nt, src, n_.inputs['Value']); return n_.outputs['Result']
def add(x, y):
    n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = 'ADD'; link(nt, x, n_.inputs[0]); link(nt, y, n_.inputs[1]); return n_.outputs[0]
link(nt, add(mr(sep.outputs['Red'], 0, 1, 0, 0.85), mr(sep.outputs['Green'], 0, 1, 0, 0.35)), b.inputs['Subsurface Weight'])
link(nt, add(mr(sep.outputs['Red'], 0, 1, 0.42, 0.11), mr(sep.outputs['Blue'], 0, 1, 0, 0.0)), b.inputs['Roughness'])
link(nt, mr(sep.outputs['Red'], 0, 1, 0.05, 0.75), b.inputs['Coat Weight'])
bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 1.0; bp.inputs['Distance'].default_value = float(A.get('pulp_bump', 0.0008))
link(nt, hgt.outputs['Color'], bp.inputs['Height']); link(nt, bp.outputs[0], b.inputs['Normal'])
# wet film on the coat: fine irregular sparkle on top of the vesicle relief
tcw = tex_coord(nt); nzw = nt.nodes.new('ShaderNodeTexNoise'); nzw.inputs['Scale'].default_value = float(A.get('wet_scale', 2600.0)); nzw.inputs['Detail'].default_value = 4.0
link(nt, tcw.outputs['Object'], nzw.inputs['Vector'])
bpw = nt.nodes.new('ShaderNodeBump'); bpw.inputs['Strength'].default_value = float(A.get('wet', 0.45)); bpw.inputs['Distance'].default_value = 0.00006
link(nt, nzw.outputs['Fac'], bpw.inputs['Height']); link(nt, bp.outputs[0], bpw.inputs['Normal']); link(nt, bpw.outputs[0], b.inputs['Coat Normal'])
link(nt, b.outputs[0], out.inputs['Surface']); M['M_OrangePulp'] = m

def zest(name, base, pores=True, sss=0.25, rough=0.34, coat=0.35, spec=0.5):
    m, nt, out = new_mat(name)
    b = principled(nt, **{'Base Color': base, 'Roughness': rough, 'Coat Weight': coat, 'Coat Roughness': 0.10, 'Subsurface Weight': sss, 'Specular IOR Level': spec,
                          'Subsurface Radius': (1.0, 0.35, 0.1), 'Subsurface Scale': 0.002, 'sss_method': 'RANDOM_WALK'})
    if pores:
        tc = tex_coord(nt); vo = nt.nodes.new('ShaderNodeTexVoronoi'); vo.inputs['Scale'].default_value = 1300.0
        link(nt, tc.outputs['Object'], vo.inputs['Vector'])
        nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 2600.0; link(nt, tc.outputs['Object'], nz.inputs['Vector'])
        mx = nt.nodes.new('ShaderNodeMath'); mx.operation = 'MULTIPLY_ADD'; mx.inputs[1].default_value = 0.15
        link(nt, nz.outputs['Fac'], mx.inputs[0]); link(nt, vo.outputs['Distance'], mx.inputs[2])
        bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.35; bp.inputs['Distance'].default_value = 0.00012
        link(nt, mx.outputs[0], bp.inputs['Height']); link(nt, bp.outputs[0], b.inputs['Normal'])
    link(nt, b.outputs[0], out.inputs['Surface']); return m
M['M_OrangeRind'] = zest('M_OrangeRind', (0.58, 0.12, 0.005, 1), sss=0.10, rough=0.30, coat=0.12, spec=0.30)
M['M_Zest'] = zest('M_Zest', (0.62, 0.13, 0.006, 1), sss=0.08, rough=0.36, coat=0.55)
M['M_ZestPith'] = zest('M_ZestPith', (0.72, 0.60, 0.38, 1), pores=False, sss=0.35, rough=0.5, coat=0.0)

for o in coll.all_objects:
    if o.type != 'MESH': continue
    for i, slot in enumerate(o.material_slots):
        if slot.material and slot.material.name in M: slot.material = M[slot.material.name]
log('materials ok')

# ------------------------------------------------------------------------------------------------ turntable rig
tt = bpy.data.objects.new('Turntable', None); scene.collection.objects.link(tt)
for o in coll.objects:
    if o.parent is None: o.parent = tt
ANGLE = float(A.get('angle', -33))
for nm in [x for x in A.get('hide', '').split(',') if x]:
    if nm in bpy.data.objects: bpy.data.objects[nm].hide_render = True

# ------------------------------------------------------------------------------------------------ studio
studio = bpy.data.collections.new('Studio'); scene.collection.children.link(studio)
def put(o): studio.objects.link(o); return o
import bmesh
# sweep: glossy black acrylic floor curving up into the backdrop, warm emissive glow on the curve
bm = bmesh.new(); prof = [(-1.2, 0.0), (0.9, 0.0)]
RC, YC = 0.6, 0.9
for i in range(1, 25):
    a = math.radians(-90 + 90 * i / 24); prof.append((YC + RC * math.cos(a), RC + RC * math.sin(a)))
prof.append((YC + RC, 2.5))
rows = []
for xx in (-2.5, 2.5):
    rows.append([bm.verts.new((xx, y, z)) for (y, z) in prof])
for i in range(len(prof) - 1):
    bm.faces.new([rows[0][i], rows[1][i], rows[1][i + 1], rows[0][i + 1]])
bmesh.ops.subdivide_edges(bm, edges=[e for e in bm.edges if abs(e.verts[0].co.x - e.verts[1].co.x) > 1], cuts=16)
me = bpy.data.meshes.new('Sweep'); bm.to_mesh(me); bm.free()
sweep = put(bpy.data.objects.new('Sweep', me)); sweep.location.z = -0.00004
for p_ in me.polygons: p_.use_smooth = True
m, nt, out = new_mat('M_Sweep')
b = principled(nt, **{'Base Color': (0.006, 0.006, 0.007, 1), 'Roughness': 0.5, 'Coat Weight': float(A.get('floor_coat', 0.6)), 'Coat Roughness': float(A.get('floor_rough', 0.05)), 'Coat IOR': 1.5,
                      'Specular IOR Level': 0.05})
tc = tex_coord(nt)
# glow = exp(-|p - c|^2 / s^2) on world position
sub = nt.nodes.new('ShaderNodeVectorMath'); sub.operation = 'SUBTRACT'; sub.inputs[1].default_value = (0.0, float(A.get('glow_y', 1.30)), float(A.get('glow_z', 0.30)))
link(nt, tc.outputs['Object'], sub.inputs[0])
sc_ = nt.nodes.new('ShaderNodeVectorMath'); sc_.operation = 'MULTIPLY'; sc_.inputs[1].default_value = (0.55, 1.0, 1.0)
link(nt, sub.outputs[0], sc_.inputs[0])
ln = nt.nodes.new('ShaderNodeVectorMath'); ln.operation = 'DOT_PRODUCT'; link(nt, sc_.outputs[0], ln.inputs[0]); link(nt, sc_.outputs[0], ln.inputs[1])
dv = nt.nodes.new('ShaderNodeMath'); dv.operation = 'MULTIPLY'; dv.inputs[1].default_value = -1.0 / float(A.get('glow_s', 0.18)) ** 2
link(nt, ln.outputs['Value'], dv.inputs[0])
ex = nt.nodes.new('ShaderNodeMath'); ex.operation = 'EXPONENT'; link(nt, dv.outputs[0], ex.inputs[0])
st = nt.nodes.new('ShaderNodeMath'); st.operation = 'MULTIPLY'; st.inputs[1].default_value = float(A.get('glow', 0.55))
link(nt, ex.outputs[0], st.inputs[0])
b.inputs['Emission Color'].default_value = tuple(float(x) for x in A.get('glow_col', '1.0,0.48,0.20').split(',')) + (1,)
link(nt, st.outputs[0], b.inputs['Emission Strength'])
link(nt, b.outputs[0], out.inputs['Surface']); me.materials.append(m)

w = bpy.data.worlds.new('w'); w.use_nodes = True; scene.world = w
w.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1)
w.node_tree.nodes['Background'].inputs['Strength'].default_value = float(A.get('world', 0.0015))

def area(name, loc, target, sx, sy, power, color=(1, 1, 1), receivers=None, cam_vis=False, glossy=True):
    d = bpy.data.lights.new(name, 'AREA'); d.shape = 'RECTANGLE'; d.size = sx; d.size_y = sy
    d.energy = power; d.color = color
    o = put(bpy.data.objects.new(name, d)); o.location = loc
    o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    o.visible_camera = cam_vis; o.visible_glossy = glossy
    if receivers is not None: o.light_linking.receiver_collection = receivers
    return o
K = float(A.get('lights', 1.0))
# the edge strips are for the glass: keep them off the fruit (their reflection washed the peel out)
glass_only = bpy.data.collections.new('GlassOnly')
for o in coll.all_objects:
    if o.name not in ('Orange_Slice', 'Orange_Peel'): glass_only.objects.link(o)
STRIPS = glass_only if A.get('strip_fruit', '0') == '0' else coll
area('StripL', (-0.30, 0.22, 0.11), (0, 0, 0.05), 0.035, 0.50, 26 * K, (0.92, 0.95, 1.0), receivers=STRIPS)
area('StripR', (0.31, 0.20, 0.11), (0, 0, 0.05), 0.035, 0.50, 26 * K, (1.0, 0.95, 0.90), receivers=STRIPS)
area('Top', (0.02, 0.06, 0.46), (0, 0.01, 0.07), 0.36, 0.30, float(A.get('top', 5.0)) * K, (1.0, 0.98, 0.95))
area('Key', (-0.40, -0.42, 0.26), (0, 0, 0.07), 0.45, 0.45, float(A.get('key', 1.5)) * K, (1.0, 0.96, 0.92))
area('Kicker', (-0.22, 0.26, 0.24), (-0.035, 0, 0.10), 0.16, 0.16, float(A.get('kick', 2.0)) * K, (1.0, 0.86, 0.70), receivers=coll)
# large overhead scrim: something bright for the ice, the liquid surface and the rim to see (not the camera)
area('Scrim', (0.0, 0.05, 0.55), (0, 0.02, 0.07), 0.75, 0.75, float(A.get('scrim', 4.0)) * K, (1.0, 0.98, 0.96), receivers=coll)
# soft box behind and above: sheen on the ice tops and on the far side of the liquid surface
area('BackTop', (0.0, 0.40, 0.25), (0, 0, 0.075), 0.50, 0.18, float(A.get('backtop', 1.8)) * K, (1.0, 0.97, 0.93), receivers=coll)
# low wide strip far behind: mirrored by the liquid surface (bright glint line) and backlights the ice above the liquid
if float(A.get('glint', 0.15)) > 0:
    area('Glint', (0.0, float(A.get('glint_y', 0.45)), float(A.get('glint_z', 0.14))), (0, 0, 0.066), float(A.get('glint_w', 0.40)), float(A.get('glint_h', 0.07)),
         float(A.get('glint', 0.15)) * K, (1.0, 0.95, 0.88), receivers=glass_only)
# glow card behind the glass: seen only through refractive surfaces (makes the liquid luminous). Like a photographer's
# card cut to the liquid's shape: its top edge stops where the empty part of the glass would see it (else blown out)
gc = bpy.data.meshes.new('GlowCard'); bm = bmesh.new()
bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5); bm.to_mesh(gc); bm.free()
card = put(bpy.data.objects.new('GlowCard', gc)); card.scale = (float(A.get('card_w', 0.070)), float(A.get('card_h', 0.062)), 1)
card.location = (0, float(A.get('card_y', 0.085)), float(A.get('card_z', 0.015))); card.rotation_euler = (math.radians(90), 0, 0)
m, nt, out = new_mat('M_GlowCard')
em = nt.nodes.new('ShaderNodeEmission'); tc = tex_coord(nt)
# profile: horizontal falloff (1 - u^2)^p keeps the glass edges dark; soft-edged but even vertically
sp_ = nt.nodes.new('ShaderNodeSeparateXYZ'); link(nt, tc.outputs['Generated'], sp_.inputs[0])
def _mr(src, a0, a1, b0=0.0, b1=1.0, interp='LINEAR'):
    n_ = nt.nodes.new('ShaderNodeMapRange'); n_.interpolation_type = interp
    n_.inputs['From Min'].default_value = a0; n_.inputs['From Max'].default_value = a1; n_.inputs['To Min'].default_value = b0; n_.inputs['To Max'].default_value = b1
    link(nt, src, n_.inputs['Value']); return n_.outputs['Result']
def _math(op, a_, b_=None, bv=None):
    n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = op; link(nt, a_, n_.inputs[0])
    if b_ is not None: link(nt, b_, n_.inputs[1])
    elif bv is not None: n_.inputs[1].default_value = bv
    return n_.outputs[0]
uu_ = _mr(sp_.outputs['X'], 0.0, 1.0, -1.0, 1.0)
hz_ = _math('POWER', _mr(_math('MULTIPLY', uu_, uu_), 0.0, 1.0, 1.0, 0.0), bv=float(A.get('card_pow', 0.8)))
vt_ = _math('MULTIPLY', _mr(sp_.outputs['Y'], 0.0, 0.22, interp='SMOOTHSTEP'), _mr(sp_.outputs['Y'], 1.0, float(A.get('card_top', 0.86)), interp='SMOOTHSTEP'))
prof_ = _math('MULTIPLY', hz_, vt_)
pw = nt.nodes.new('ShaderNodeMath'); pw.operation = 'MULTIPLY'; pw.inputs[1].default_value = 1.0; link(nt, prof_, pw.inputs[0])
ms = nt.nodes.new('ShaderNodeMath'); ms.operation = 'MULTIPLY'; ms.inputs[1].default_value = float(A.get('card', 7.0)); link(nt, pw.outputs[0], ms.inputs[0])
em.inputs['Color'].default_value = (1.0, 0.86, 0.70, 1); link(nt, ms.outputs[0], em.inputs['Strength'])
# rays that were mirrored by the liquid surface (or any glossy bounce) pass through the card, so the liquid
# surface can reflect the glint strip behind it instead of the dim top edge of the card
lp = nt.nodes.new('ShaderNodeLightPath'); gt = nt.nodes.new('ShaderNodeMath'); gt.operation = 'GREATER_THAN'; gt.inputs[1].default_value = 0.5
link(nt, lp.outputs['Glossy Depth'], gt.inputs[0])
trc = nt.nodes.new('ShaderNodeBsdfTransparent'); mxc = nt.nodes.new('ShaderNodeMixShader')
link(nt, gt.outputs[0], mxc.inputs['Fac']); link(nt, em.outputs[0], mxc.inputs[1]); link(nt, trc.outputs[0], mxc.inputs[2])
link(nt, mxc.outputs[0], out.inputs['Surface']); gc.materials.append(m)
card.visible_camera = A.get('card_cam', '0') == '1'; card.visible_glossy = False; card.visible_diffuse = False; card.visible_shadow = False
card.visible_volume_scatter = False; card.visible_transmission = True

# side fill cards (like white reflector boards just out of frame), seen only through glass / ice / liquid:
# rays that total-internal-reflect sideways out of the ice find something soft instead of the black studio
FILL = float(A.get('fill', 0.5))
if FILL > 0:
    for sx in (-1, 1):
        fm = bpy.data.meshes.new('Fill'); bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5); bm.to_mesh(fm); bm.free()
        fo = put(bpy.data.objects.new('Fill%+d' % sx, fm)); fo.scale = (float(A.get('fill_w', 0.14)), float(A.get('fill_h', 0.10)), 1)
        fo.location = (sx * float(A.get('fill_x', 0.15)), float(A.get('fill_y', 0.0)), float(A.get('fill_z', 0.085)))
        fo.rotation_euler = (0, math.radians(90), 0)
        m, nt, out = new_mat('M_Fill'); em2 = nt.nodes.new('ShaderNodeEmission'); em2.inputs['Strength'].default_value = FILL
        em2.inputs['Color'].default_value = (1.0, 0.93, 0.85, 1); link(nt, em2.outputs[0], out.inputs['Surface']); fm.materials.append(m)
        fo.visible_camera = False; fo.visible_glossy = A.get('fill_glossy', '0') == '1'; fo.visible_diffuse = False; fo.visible_shadow = False
        fo.visible_volume_scatter = False; fo.visible_transmission = True

# light pad under the glass (like a bar's lit acrylic), seen only through the glass and liquid: lights the bottom of
# the drink, which otherwise looks down into the black floor through the thick base
UNDER = float(A.get('under', 0))
if UNDER > 0:
    bm = bmesh.new(); bmesh.ops.create_circle(bm, cap_ends=True, segments=64, radius=float(A.get('under_r', 0.036)))
    um = bpy.data.meshes.new('UnderPad'); bm.to_mesh(um); bm.free()
    uo = put(bpy.data.objects.new('UnderPad', um)); uo.location = (0, 0, -0.00002)
    m, nt, out = new_mat('M_UnderPad'); e3 = nt.nodes.new('ShaderNodeEmission'); e3.inputs['Strength'].default_value = UNDER
    e3.inputs['Color'].default_value = (1.0, 0.84, 0.66, 1); link(nt, e3.outputs[0], out.inputs['Surface']); um.materials.append(m)
    uo.visible_camera = False; uo.visible_glossy = False; uo.visible_diffuse = False; uo.visible_shadow = False
    uo.visible_volume_scatter = False; uo.visible_transmission = True

# ------------------------------------------------------------------------------------------------ camera
cam = put(bpy.data.objects.new('Camera', bpy.data.cameras.new('Camera'))); scene.camera = cam
CAMS = {  # elevation deg, distance m, target, lens, fstop
    'hero': (10.0, 0.56, (0, 0, 0.066), 100, 16.0),
    'close_ice': (34.0, 0.27, (0.0, 0.0, 0.074), 100, 22.0),
    'close_orange': (8.0, 0.25, (-0.030, 0.0, 0.098), 100, 22.0),
    'close_glass': (6.0, 0.25, (0.0, 0.0, 0.036), 100, 22.0),
    'top': (55.0, 0.50, (0, 0, 0.06), 100, 11.0),
}
el, dist, tgt, lens, fst = CAMS[CAM]
dist = float(A.get('dist', dist)); el = float(A.get('el', el))
if 'tz' in A: tgt = (float(A.get('tx', tgt[0])), tgt[1], float(A['tz']))
az = math.radians(float(A.get('az', 0.0))); e = math.radians(el); tg = Vector(tgt)
cam.location = tg + Vector((dist * math.cos(e) * math.sin(az), -dist * math.cos(e) * math.cos(az), dist * math.sin(e)))
cam.rotation_euler = (tg - cam.location).to_track_quat('-Z', 'Y').to_euler()
cam.data.lens = float(A.get('lens', lens)); cam.data.sensor_width = 36; cam.data.clip_start = 0.005
cam.data.dof.use_dof = A.get('dof', '1') == '1'
cam.data.dof.focus_distance = (tg + Vector((0, -0.012 if CAM == 'hero' else 0.0, 0)) - cam.location).length
cam.data.dof.aperture_fstop = float(A.get('fstop', fst))

# ------------------------------------------------------------------------------------------------ render settings
sc = scene; sc.render.engine = 'CYCLES'; cy = sc.cycles; cy.device = 'CPU'
cy.samples = SAMPLES; cy.use_adaptive_sampling = True; cy.adaptive_threshold = float(A.get('noise', 0.012))
cy.use_denoising = True; cy.denoiser = 'OPENIMAGEDENOISE'; cy.denoising_input_passes = 'RGB_ALBEDO_NORMAL'; cy.denoising_prefilter = 'ACCURATE'
cy.max_bounces = 40; cy.transmission_bounces = 32; cy.glossy_bounces = 10; cy.diffuse_bounces = 3; cy.volume_bounces = 2; cy.transparent_max_bounces = 24
cy.caustics_reflective = False; cy.caustics_refractive = False; cy.sample_clamp_indirect = float(A.get('clamp', 12)); cy.blur_glossy = 0.4
sc.render.resolution_y = RES; sc.render.resolution_x = int(round(RES * float(A.get('aspect', 0.8)))); sc.render.resolution_percentage = 100
sc.render.film_transparent = False
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'; sc.view_settings.exposure = 0.0
sc.render.image_settings.file_format = 'OPEN_EXR'; sc.render.image_settings.color_depth = '16'; sc.render.image_settings.exr_codec = 'ZIP'
sc.render.use_persistent_data = True

# ------------------------------------------------------------------------------------------------ grading (numpy)
def box1d(a, r, axis):
    pad = [(0, 0)] * a.ndim; pad[axis] = (r + 1, r)
    c = np.cumsum(np.pad(a, pad, mode='edge'), axis=axis, dtype=np.float64); n = a.shape[axis]
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis); lo = np.take(c, np.arange(0, n), axis=axis)
    return ((hi - lo) / (2 * r + 1)).astype(np.float32)
def blur(a, sigma):
    r = max(1, int(round(sigma)))
    for _ in range(3): a = box1d(box1d(a, r, 0), r, 1)
    return a
def grade(exr, png, expo=EXPO):
    im = bpy.data.images.load(exr); w_, h_ = im.size
    arr = np.empty(w_ * h_ * 4, np.float32); im.pixels.foreach_get(arr); bpy.data.images.remove(im)
    a = arr.reshape(h_, w_, 4)[::-1, :, :3] * expo
    s = h_ / 1350.0
    lum = a.max(axis=2, keepdims=True)
    hi = a * np.clip((lum - float(A.get('bthr', 1.5))) / 2.0, 0, 1)
    bloom = 0.55 * blur(hi, 2.5 * s) + 0.30 * blur(hi, 9 * s) + 0.15 * blur(hi, 28 * s)
    a = a + float(A.get('bloom', 0.04)) * bloom
    x = np.maximum(a, 0)
    t = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14)
    sr = np.where(t <= 0.0031308, 12.92 * t, 1.055 * np.power(np.clip(t, 0, 1), 1 / 2.4) - 0.055)
    yy, xx = np.mgrid[0:h_, 0:w_].astype(np.float32)
    v = ((xx - w_ / 2) / (w_ / 2)) ** 2 * 0.8 + ((yy - h_ * 0.52) / (h_ / 2)) ** 2
    top = float(A.get('top', 0.35)) * np.clip(1 - yy / (h_ * 0.35), 0, 1) ** 1.5
    sr = sr * ((1 - float(A.get('vig', 0.30)) * np.clip(v - 0.25, 0, 1.5) ** 1.2) * (1 - top))[..., None]
    l_ = (sr * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(axis=2, keepdims=True)
    sr = l_ + float(A.get('sat', 0.94)) * (sr - l_)
    sr = sr + np.random.default_rng(1).normal(0, 0.0022, sr.shape).astype(np.float32)
    from PIL import Image
    Image.fromarray((np.clip(sr, 0, 1) * 255 + 0.5).astype(np.uint8)).save(png)

def render_to(base):
    sc.render.filepath = base + '.exr'
    bpy.ops.render.render(write_still=True)
    if A.get('grade', '1') == '1': grade(base + '.exr', base + '.png')

for nm in [x for x in A.get('off', '').split(',') if x]:                 # diagnostics: switch studio pieces off
    for ob_ in list(studio.objects):
        if ob_.name.startswith(nm): ob_.hide_render = True
bpy.context.view_layer.update()
log('card dims', tuple(round(x, 4) for x in card.dimensions), 'loc', tuple(card.location))
if 'save' in A: bpy.ops.wm.save_as_mainfile(filepath=A['save'])
if 'frames' in A:
    f0, f1 = (int(x) for x in A['frames'].split('-')); NFR = int(A.get('nframes', 72)); OD = A['outdir']; os.makedirs(OD, exist_ok=True)
    for f in range(f0, f1 + 1):
        tt.rotation_euler.z = math.radians(ANGLE + 360.0 * f / NFR)
        render_to(os.path.join(OD, 'negroni_%03d' % f)); log('frame', f)
else:
    tt.rotation_euler.z = math.radians(ANGLE)
    out_base = A.get('out', '/tmp/lux_test')
    os.makedirs(os.path.dirname(out_base), exist_ok=True)
    render_to(out_base); log('rendered', out_base)
