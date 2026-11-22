# Render-only, high-detail Negroni geometry for the pre-rendered (Cycles) version.
# Same design as the GLB (geo.py) but built for nested-dielectric rendering:
#   - glass and liquid share their contact surface (no air gap): the glass inner faces under the
#     liquid are removed and the liquid's own outer faces carry the glass->liquid interface;
#   - the ice is split at the liquid surface: above = air/ice faces, below = the liquid's hole faces;
#   - clear rounded ice with cracks, bubble veils and a faint misty core;
#   - condensation droplets on the outside of the glass; detailed orange wheel (UVs for lux_tex.py).
import bpy, bmesh, math, random, json, sys, time, os
from mathutils import Vector, Matrix, noise
from mathutils.bvhtree import BVHTree

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '/mnt/project-files/negroni-3d/lux/'
os.makedirs(OUT, exist_ok=True)
random.seed(11)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene; vl = bpy.context.view_layer
coll = bpy.data.collections.new('Negroni'); scene.collection.children.link(coll)
sim = bpy.data.collections.new('Sim'); scene.collection.children.link(sim)
t0 = time.time()
def log(*a): print('[%6.1fs]' % (time.time() - t0), *a, flush=True)

SEG = 384
Ro, Ri, H, F = 0.039, 0.034, 0.088, 0.018
RIM = (Ro - Ri) / 2
L = 0.064; ZM = L + 0.0015          # flat liquid top, meniscus contact height on the wall
NF = 24

def placeholder(name):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name); return m

def to_obj(name, bm, c=None):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); (c or coll).objects.link(ob); return ob

def arc(cx, cz, rx, rz, a0, a1, n):
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cz + rz * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]

def dedupe(P):
    out = []
    for p in P:
        if not out or abs(p[0] - out[-1][0]) + abs(p[1] - out[-1][1]) > 1e-10: out.append(p)
    return out

def revolve(profile, seg, mats=None):
    bm = bmesh.new(); rings = []
    for (r, z) in profile:
        if abs(r) < 1e-12: rings.append([bm.verts.new((0, 0, z))])
        else: rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / seg), r * math.sin(2 * math.pi * i / seg), z)) for i in range(seg)])
    for k, (a, b) in enumerate(zip(rings, rings[1:])):
        for i in range(seg):
            j = (i + 1) % seg
            quad = [a[i % len(a)], a[j % len(a)], b[j % len(b)], b[i % len(b)]]
            q = [v for kk, v in enumerate(quad) if v != quad[kk - 1]]
            if len(set(q)) >= 3:
                try:
                    f = bm.faces.new(q)
                    if mats: f.material_index = mats[k]
                except ValueError: pass
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-10)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm

def apply_mods(ob):
    vl.update()
    ev = ob.evaluated_get(bpy.context.evaluated_depsgraph_get())
    me = bpy.data.meshes.new_from_object(ev)
    ob.modifiers.clear(); old = ob.data; ob.data = me; bpy.data.meshes.remove(old)

def bool_apply(ob, cutter, op='DIFFERENCE'):
    m = ob.modifiers.new('b', 'BOOLEAN'); m.operation = op; m.solver = 'EXACT'; m.object = cutter
    m.material_mode = 'TRANSFER'
    apply_mods(ob)

def select_only(o):
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); vl.objects.active = o

def smooth(ob, angle=None):
    for p in ob.data.polygons: p.use_smooth = True
    if angle is not None:
        select_only(ob); bpy.ops.object.shade_smooth_by_angle(angle=math.radians(angle))

def tris(ob):
    ob.data.calc_loop_triangles(); return len(ob.data.loop_triangles)

def join(parts, name):
    bpy.ops.object.select_all(action='DESELECT')
    for o in parts: o.select_set(True)
    vl.objects.active = parts[0]
    bpy.ops.object.join(); parts[0].name = name; parts[0].data.name = name
    return parts[0]

def ss(e0, e1, x):
    t = min(1.0, max(0.0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t)

# ======================================================================== GLASS
zs = set()
z = 0.0030
while z < H - RIM - 1e-6: zs.add(round(z, 7)); z += 0.0015
for a_, b_, st in ((0.0030, 0.0050, 0.0005), (0.0160, 0.0190, 0.0005), (0.0785, 0.0845, 0.0005)):
    z = a_
    while z <= b_ + 1e-9: zs.add(round(z, 7)); z += st
zs = sorted(x for x in zs if 0.003 < x < H - RIM)
P_main = [(0, 0)] + arc(Ro - 0.003, 0.003, 0.003, 0.003, -90, 0, 8) + [(Ro, z_) for z_ in zs] \
    + arc(Ro - RIM, H - RIM, RIM, RIM, 0, 180, 18) + [(Ri, ZM)]
P_sub = [(Ri, ZM), (Ri, F + 0.004)] + arc(Ri - 0.004, F + 0.004, 0.004, 0.004, 0, -90, 10) + [(0, F)]
P_main = dedupe(P_main); P_sub = dedupe(P_sub)
glass_prof = dedupe(P_main + P_sub[1:])
mats = [0] * (len(P_main) - 1) + [1] * (len(P_sub) - 1)
glass = to_obj('GlassFull', revolve(glass_prof, SEG, mats))

def flute_depth(z):
    lower = ss(0.0028, 0.0048, z); upper = 1 - ss(0.0790, 0.0838, z)
    band = 1 - ss(0.0163, 0.0187, z)
    return (0.00058 + (0.00130 - 0.00058) * band) * lower * upper
for v in glass.data.vertices:
    r = math.hypot(v.co.x, v.co.y)
    if r > Ro - 1e-6 and 0.0028 < v.co.z < 0.0840:
        th = math.atan2(v.co.y, v.co.x) % (2 * math.pi)
        uu = (th * NF / (2 * math.pi)) % 1.0
        s = 2 * uu - 1; prof = 1 - s * s
        k = (r - flute_depth(v.co.z) * prof) / r
        v.co.x *= k; v.co.y *= k
glass.data.materials.append(placeholder('M_Glass')); glass.data.materials.append(placeholder('M_GlassHidden'))
smooth(glass, 20)
log('glass tris', tris(glass))

# ======================================================================== LIQUID (full volume)
PL = dedupe([(0, F)] + arc(Ri - 0.004, F + 0.004, 0.004, 0.004, -90, 0, 10) + [(Ri, ZM)]
            + arc(Ri - 0.0025, ZM, 0.0025, 0.0015, 0, -90, 14) + [(0, L)])
iz = PL.index((Ri, ZM))
lmats = [0 if k < iz else 1 for k in range(len(PL) - 1)]
liq = to_obj('LiquidFull', revolve(PL, SEG, lmats))
liq.data.materials.append(placeholder('M_LiqGlass')); liq.data.materials.append(placeholder('M_LiqAir'))
liq.data.materials.append(placeholder('M_LiqIce'))

# ======================================================================== ICE
def axis_coords(h, rr, step=0.0011, band_n=7):
    core = h - rr; n = max(2, int(round(2 * core / step)))
    mid = [-core + 2 * core * i / n for i in range(n + 1)]
    band = [core + rr * (i / band_n) for i in range(1, band_n + 1)]
    return [-b for b in reversed(band)] + mid + band

def rounded_box(half, rr, seed):
    hx, hy, hz = half; core = Vector((hx - rr, hy - rr, hz - rr))
    cx, cy, cz = axis_coords(hx, rr), axis_coords(hy, rr), axis_coords(hz, rr)
    bm = bmesh.new()
    def face(fixed_axis, sign, A, B):
        grid = []
        for a in A:
            row = []
            for b in B:
                p = [0, 0, 0]; o = [i for i in range(3) if i != fixed_axis]
                p[fixed_axis] = sign * half[fixed_axis]; p[o[0]] = a; p[o[1]] = b
                row.append(bm.verts.new(p))
            grid.append(row)
        for i in range(len(A) - 1):
            for j in range(len(B) - 1):
                bm.faces.new([grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]])
    face(0, 1, cy, cz); face(0, -1, cy, cz); face(1, 1, cx, cz); face(1, -1, cx, cz); face(2, 1, cx, cy); face(2, -1, cx, cy)
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-9)
    off = Vector((seed * 3.7, seed * 1.3, seed * 5.1))
    for v in bm.verts:
        p = v.co.copy()
        c = Vector((max(-core.x, min(core.x, p.x)), max(-core.y, min(core.y, p.y)), max(-core.z, min(core.z, p.z))))
        d = p - c; n = d.normalized()
        q = c + n * rr
        disp = 0.00034 * noise.noise(q * 85 + off) + 0.00009 * noise.noise(q * 240 + off)
        # faces slightly concave/convex at random, edges a touch more melted
        v.co = q + n * disp
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm

def sdf_box(p, half, rr):
    q = Vector((abs(p.x) - (half[0] - rr), abs(p.y) - (half[1] - rr), abs(p.z) - (half[2] - rr)))
    out = Vector((max(q.x, 0), max(q.y, 0), max(q.z, 0)))
    return out.length + min(max(q.x, q.y, q.z), 0) - rr

def crack(bm, rnd, half, rr, mat):
    for attempt in range(30):
        c = Vector((rnd.uniform(-0.45, 0.45) * half[0], rnd.uniform(-0.45, 0.45) * half[1], rnd.uniform(-0.45, 0.45) * half[2]))
        n = Vector((rnd.gauss(0, 1), rnd.gauss(0, 1), rnd.gauss(0, 1))).normalized()
        R = rnd.uniform(0.0045, 0.0085) * (0.93 ** attempt)
        t1 = n.orthogonal().normalized(); t2 = n.cross(t1)
        ph = rnd.uniform(0, 100); NS, NR = 64, 6
        outline = []
        for i in range(NS):
            a = 2 * math.pi * i / NS
            k = 0.74 + 0.22 * noise.noise(Vector((math.cos(a) * 1.2 + ph, math.sin(a) * 1.2, 0.5))) \
                + 0.06 * noise.noise(Vector((math.cos(a) * 6 + ph, math.sin(a) * 6, 2.5)))
            outline.append(R * k)
        def pt(f, i, side):
            a = 2 * math.pi * i / NS; rad = outline[i] * f
            x, y = math.cos(a) * rad, math.sin(a) * rad
            w = 0.00030 * noise.noise(Vector((x * 260 + ph, y * 260, 7.7)))
            thick = 0.000045 * math.sqrt(max(0.0, 1 - f * f))
            return c + t1 * x + t2 * y + n * (w + side * thick)
        if all(sdf_box(pt(1.0, i, 0), half, rr) < -0.0013 for i in range(NS)):
            ring_t = [[bm.verts.new(pt(k / NR, i, +1)) for i in range(NS)] for k in range(1, NR)]
            ring_b = [[bm.verts.new(pt(k / NR, i, -1)) for i in range(NS)] for k in range(1, NR)]
            rim_ = [bm.verts.new(pt(1.0, i, 0)) for i in range(NS)]
            ct = bm.verts.new(pt(0, 0, +1)); cb = bm.verts.new(pt(0, 0, -1))
            for rings, cen, flip in ((ring_t, ct, False), (ring_b, cb, True)):
                allr = rings + [rim_]
                for i in range(NS):
                    j = (i + 1) % NS
                    f_ = bm.faces.new([cen, allr[0][i], allr[0][j]] if not flip else [cen, allr[0][j], allr[0][i]]); f_.material_index = mat
                    for k in range(len(allr) - 1):
                        qd = [allr[k][i], allr[k + 1][i], allr[k + 1][j], allr[k][j]]
                        f_ = bm.faces.new(qd if not flip else qd[::-1]); f_.material_index = mat
            return True
    return False

def sphere(bm, center, r, subd, mat, squash=(1, 1, 1)):
    tmp = bmesh.new(); bmesh.ops.create_icosphere(tmp, subdivisions=subd, radius=r)
    vmap = {}
    for v in tmp.verts:
        vmap[v] = bm.verts.new(center + Vector((v.co.x * squash[0], v.co.y * squash[1], v.co.z * squash[2])))
    for f in tmp.faces:
        nf = bm.faces.new([vmap[v] for v in f.verts]); nf.material_index = mat
    tmp.free()

def ice_internals(half, rr, seed):
    rnd = random.Random(seed * 101 + 7); bm = bmesh.new()
    ncr = 2 if seed != 2 else 1
    for _ in range(ncr): crack(bm, rnd, half, rr, 0)
    # bubble veil in a thin slab near the centre (freezing plane) + a couple of bubble trails
    plane_axis = rnd.choice([0, 1, 2])
    nb = 0
    while nb < 70:
        p = [rnd.gauss(0, 0.30 * half[i]) for i in range(3)]
        p[plane_axis] = rnd.gauss(0, 0.07 * half[plane_axis]); p = Vector(p)
        r = 0.00005 + 0.00026 * rnd.random() ** 2.2
        if sdf_box(p, half, rr) < -0.0012:
            sphere(bm, p, r, 1 if r < 0.00014 else 2, 0); nb += 1
    for _ in range(2):
        a = Vector((rnd.uniform(-0.3, 0.3) * half[0], rnd.uniform(-0.3, 0.3) * half[1], rnd.uniform(-0.3, 0.3) * half[2]))
        d = Vector((rnd.gauss(0, 1), rnd.gauss(0, 1), rnd.gauss(0, 1))).normalized()
        for k in range(rnd.randint(7, 13)):
            p = a + d * (k * rnd.uniform(0.0006, 0.0011))
            r = rnd.uniform(0.00006, 0.00018)
            if sdf_box(p, half, rr) < -0.0012: sphere(bm, p, r, 1, 0)
    # faint misty core (flattened, noisy ellipsoid; rendered with a thin translucent shader)
    tmp = bmesh.new(); bmesh.ops.create_uvsphere(tmp, u_segments=40, v_segments=20, radius=1.0)
    sc = [0.46 * half[i] for i in range(3)]; sc[plane_axis] = 0.13 * half[plane_axis]
    off = Vector((seed * 2.1, seed * 4.4, seed * 0.7)); vmap = {}
    for v in tmp.verts:
        p = Vector((v.co.x * sc[0], v.co.y * sc[1], v.co.z * sc[2]))
        p *= 1 + 0.22 * noise.noise(v.co * 2.2 + off)
        vmap[v] = bm.verts.new(p)
    for f in tmp.faces:
        nf = bm.faces.new([vmap[v] for v in f.verts]); nf.material_index = 1
    tmp.free()
    return bm

ICE = [('Ice_01', (0.0160, 0.0152, 0.0145), 0.0040, 1),
       ('Ice_02', (0.0154, 0.0160, 0.0141), 0.0044, 2),
       ('Ice_03', (0.0162, 0.0150, 0.0155), 0.0037, 3)]
ices = []; inners = []
for name, half, rr, seed in ICE:
    sh = to_obj(name, rounded_box(half, rr, seed)); smooth(sh)
    sh.data.materials.append(placeholder('M_Ice')); sh.data.materials.append(placeholder('M_IceUnder'))
    inn = to_obj(name + '_Inner', ice_internals(half, rr, seed)); smooth(inn)
    inn.data.materials.append(placeholder('M_IceAir')); inn.data.materials.append(placeholder('M_IceMist'))
    ices.append(sh); inners.append(inn)
    log(name, 'shell tris', tris(sh), 'inner tris', tris(inn))

# ======================================================================== ORANGE WHEEL (render detail)
RS, TS = 0.0330, 0.0058
FIL = 0.0009
SEG_S = 512
ring_r = [RS - FIL - (RS - FIL) * (i / 70) ** 0.85 for i in range(71)]   # outer -> centre, denser at the rim
front = [(r, TS / 2) for r in reversed(ring_r)]                            # centre -> edge (r=0 first)
side = arc(RS - FIL, TS / 2 - FIL, FIL, FIL, 90, 0, 5) + arc(RS - FIL, -TS / 2 + FIL, FIL, FIL, 0, -90, 5)
back = [(r, -TS / 2) for r in ring_r]
SP = dedupe(front + side + back)
n_front = len(dedupe(front)) - 1; n_side = len(dedupe(front + side)) - 1
smats = [0 if k < n_front or k >= n_side else 1 for k in range(len(SP) - 1)]
slice_ob = to_obj('Orange_Slice', revolve(SP, SEG_S, smats))
# height displacement of the cut faces from the same procedural map as the texture (sampled from the PNG)
try:
    import numpy as np
    from PIL import Image as PImage
    px = np.asarray(PImage.open(OUT + 'slice_height.png')).astype(np.float32) / 65535.0   # row 0 = top (+y)
    Hh, W = px.shape[:2]; SPAN = 0.068
    for v in slice_ob.data.vertices:
        if abs(abs(v.co.z) - TS / 2) < 1e-7 and math.hypot(v.co.x, v.co.y) < RS - FIL + 1e-7:
            uu = v.co.x / SPAN + 0.5; vv = v.co.y / SPAN + 0.5
            hv = px[min(Hh - 1, max(0, int((1 - vv) * Hh))), min(W - 1, max(0, int(uu * W)))]
            v.co.z += math.copysign((hv - 0.62) * 0.00045, v.co.z)
    log('slice displaced from height map', W, Hh)
except Exception as ex:
    log('no height map for displacement:', ex)
ZC = 0.101; XC = -(Ro + Ri) / 2
# slot = the rim's own profile (semicircle on top) + 0.15 mm clearance: the wheel sits ON the rim, no dark gap
SLW = RIM + 0.00022; cyl = (H - RIM) - ZC                     # slice-local y of the rim arc centre
cb = bmesh.new()
outline = [(SLW, cyl - 0.03)] + [(SLW * math.cos(math.pi * i / 24), cyl + SLW * math.sin(math.pi * i / 24)) for i in range(25)] + [(-SLW, cyl - 0.03)]
lo_ = [cb.verts.new((x_, y_, -0.015)) for x_, y_ in outline]; hi_ = [cb.verts.new((x_, y_, 0.015)) for x_, y_ in outline]
cb.faces.new(lo_[::-1]); cb.faces.new(hi_)
for i in range(len(outline)):
    j = (i + 1) % len(outline); cb.faces.new([lo_[i], lo_[j], hi_[j], hi_[i]])
bmesh.ops.recalc_face_normals(cb, faces=cb.faces[:])
cut = to_obj('cutter', cb, sim)
cut.data.materials.append(placeholder('M_OrangePulp'))
slice_ob.data.materials.append(placeholder('M_OrangePulp')); slice_ob.data.materials.append(placeholder('M_OrangeRind'))
vl.update(); bool_apply(slice_ob, cut); bpy.data.objects.remove(cut)
uvl = slice_ob.data.uv_layers.new(name='UVMap')
for poly in slice_ob.data.polygons:
    for li in poly.loop_indices:
        v = slice_ob.data.vertices[slice_ob.data.loops[li].vertex_index].co
        uvl.data[li].uv = (v.x / 0.068 + 0.5, v.y / 0.068 + 0.5)
# the brief: peel and inner orange separable for the exploded view -> Orange_Peel = rind + pith ring, Orange_Slice = pulp
R_SPLIT = 0.0295
def part(src, outer):
    b_ = bmesh.new(); b_.from_mesh(src)
    b_.faces.ensure_lookup_table()
    dead = [f for f in b_.faces if (f.calc_center_median().xy.length > R_SPLIT) != outer]
    bmesh.ops.delete(b_, geom=dead, context='FACES')
    me_ = src.copy(); b_.to_mesh(me_); b_.free(); return me_
peel_me = part(slice_ob.data, True); pulp_me = part(slice_ob.data, False)
old_me = slice_ob.data; slice_ob.data = pulp_me; bpy.data.meshes.remove(old_me)
peel = bpy.data.objects.new('Orange_Peel', peel_me); coll.objects.link(peel)
pulp_me.name = 'Orange_Slice'; peel_me.name = 'Orange_Peel'
# not a flat disc: slightly irregular outline, gentle cupping, juice sacs sagging between the firmer membranes.
# Pure function of the original position, applied to both parts, so their shared edge stays closed.
from PIL import ImageFilter
_mk = PImage.open(OUT + 'slice_masks.png').convert('RGB').split()[0]
_pb = np.asarray(_mk.filter(ImageFilter.GaussianBlur(28))).astype(np.float32) / 255.0      # ~0.5 mm blur: smooth dish per segment
_ph, _pw = _pb.shape
def deform(co):
    x, y, z = co.x, co.y, co.z; r = math.hypot(x, y); th = math.atan2(y, x)
    d = abs((th + math.pi / 2 + math.pi) % (2 * math.pi) - math.pi)                         # angular distance from the slot (-y)
    taper = ss(0.30, 0.65, d)
    w = 0.55 * math.sin(3 * th + 1.3) + 0.35 * math.sin(5 * th + 4.1) + 0.25 * math.sin(2 * th + 0.4)
    k = 1 + 0.011 * w * taper * (r / RS) ** 2
    nz = z
    if abs(z) > TS / 2 - 0.0005 and r < RS - FIL + 1e-6:                                     # cut faces: sag the pulp
        uu = x / 0.068 + 0.5; vv = y / 0.068 + 0.5
        pv = _pb[min(_ph - 1, max(0, int((1 - vv) * _ph))), min(_pw - 1, max(0, int(uu * _pw)))]
        nz = z - math.copysign(0.00034 * pv + 0.00018 * ss(0.0035, 0.0, r), z)
    nz += 0.00075 * (x / RS) ** 2 + 0.00025 * (x / RS) * (y / RS)                            # cupping + a little twist (zero at the slot)
    return Vector((x * k, y * k, nz))
for ob_ in (slice_ob, peel):
    for v in ob_.data.vertices: v.co = deform(v.co)
    smooth(ob_, 50)
    ob_.rotation_euler = (math.pi / 2, 0, 0); ob_.location = (XC, 0, ZC)
vl.update()
log('slice tris', tris(slice_ob), 'peel tris', tris(peel))

# ======================================================================== SETTLE ICE + PEEL (rigid body, 20x scale copies)
S = 20.0
scene.frame_start = 1; scene.frame_end = 240
bpy.ops.rigidbody.world_add()
rbw = scene.rigidbody_world; rbw.substeps_per_frame = 30; rbw.solver_iterations = 40
starts = [((-0.0160, -0.006, 0.040), (0.3, 0.5, 0.2)), ((0.0165, 0.005, 0.043), (0.6, 0.2, 0.9)), ((0.001, 0.0, 0.092), (0.4, 0.7, 0.3))]
for ob, inn, (loc, rot) in zip(ices, inners, starts):
    ob.rotation_euler = rot; ob.location = loc
vl.update()

def proxy(ob, shape, kind, data=None):
    p = bpy.data.objects.new('px_' + ob.name, data or ob.data.copy()); sim.objects.link(p); vl.update()
    p.matrix_world = Matrix.Scale(S, 4) @ ob.matrix_world
    select_only(p); bpy.ops.rigidbody.object_add(type=kind)
    rb = p.rigid_body; rb.collision_shape = shape
    if shape == 'MESH': rb.mesh_source = 'BASE'
    rb.friction = 0.55; rb.restitution = 0.0; rb.collision_margin = 0.002; rb.use_margin = True
    if kind == 'ACTIVE': rb.mass = 1.0; rb.linear_damping = 0.3; rb.angular_damping = 0.4
    return p
# low-res collision proxies (Bullet convex-hull cost grows with the vertex count)
gsim = bpy.data.meshes.new('glass_sim'); revolve(glass_prof, 96).to_mesh(gsim)
pg = proxy(glass, 'MESH', 'PASSIVE', gsim)
dbm = bmesh.new(); bmesh.ops.create_cone(dbm, cap_ends=True, segments=64, radius1=RS, radius2=RS, depth=TS)
dme = bpy.data.meshes.new('disc'); dbm.to_mesh(dme); dbm.free()
ps = proxy(slice_ob, 'CONVEX_HULL', 'PASSIVE', dme)
def lowres_ice(half, rr, seed):
    me_ = bpy.data.meshes.new('ice_sim'); b_ = rounded_box(half, rr, seed)
    b_.to_mesh(me_); b_.free(); return me_
_saved_axis = axis_coords
def axis_coords(h, rr, step=0.0040, band_n=2): return _saved_axis(h, rr, step, band_n)
LOWICE = [lowres_ice(half, rr, seed) for (nm, half, rr, seed) in ICE]
axis_coords = _saved_axis
pi_ = [proxy(o, 'CONVEX_HULL', 'ACTIVE', lm.copy()) for o, lm in zip(ices, LOWICE)]
def groups(p, idx): p.rigid_body.collision_collections = [i in idx for i in range(20)]
for f in range(1, 241): scene.frame_set(f)
dg = bpy.context.evaluated_depsgraph_get()
def pull(p, ob):
    m = p.evaluated_get(dg).matrix_world.copy()
    ob.rotation_mode = 'QUATERNION'; ob.rotation_quaternion = m.to_quaternion(); ob.location = m.translation / S
for p, o in zip(pi_, ices): pull(p, o)
for p in pi_ + [pg, ps]: bpy.data.objects.remove(p)
bpy.ops.rigidbody.world_remove(); scene.frame_set(1); vl.update()
for o in ices: o.scale = (0.99, 0.99, 0.99)
vl.update()
for o, inn in zip(ices, inners):
    inn.matrix_world = o.matrix_world.copy()
    log(o.name, [round(x, 4) for x in o.location])
for o in [slice_ob, peel] + ices + inners:
    select_only(o); bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
vl.update()

# ======================================================================== interference checks (world space)
def bvh(o):
    vs = [o.matrix_world @ v.co for v in o.data.vertices]
    o.data.calc_loop_triangles(); return BVHTree.FromPolygons(vs, [tuple(t.vertices) for t in o.data.loop_triangles])
# nudge any ice that grazes the glass (hi-res shapes vs the low-res collision proxies) toward the axis
gb = bvh(glass)
for _pass in range(3):
    for ic, inn in zip(ices, inners):
        others = [bvh(o) for o in ices if o is not ic] + [bvh(slice_ob)]
        steps = 0
        while gb.overlap(bvh(ic)) and steps < 40:
            c = sum((v.co for v in ic.data.vertices), Vector()) / len(ic.data.vertices)
            d = Vector((-c.x, -c.y, 0.0)).normalized() * 0.00006 + Vector((0, 0, 0.00002))
            for v in ic.data.vertices: v.co += d
            for v in inn.data.vertices: v.co += d
            steps += 1
        if steps: log(ic.name, 'nudged', steps, 'steps; still touching others:', any(bvh(ic).overlap(o) for o in others))
bv = {o.name: bvh(o) for o in [glass, slice_ob, peel] + ices}
names = list(bv); bad = []
for i in range(len(names)):
    for j in range(i + 1, len(names)):
        ov = bv[names[i]].overlap(bv[names[j]])
        if ov and {names[i], names[j]} != {'Orange_Slice', 'Orange_Peel'}: bad.append((names[i], names[j], len(ov)))
log('interferences:', bad)

# ======================================================================== LIQUID minus ice (hole faces -> M_LiqIce), ice split at the surface
for ic in ices:
    ic.data.materials[0] = placeholder('M_LiqIce')        # temporarily: cutter faces transfer as M_LiqIce
liq_net = liq.copy(); liq_net.data = liq.data.copy(); liq_net.name = 'Liquid'; coll.objects.link(liq_net)
for ic in ices: bool_apply(liq_net, ic)
for ic in ices: ic.data.materials[0] = placeholder('M_Ice')
bm = bmesh.new(); bm.from_mesh(liq_net.data); V_tot = bm.calc_volume()
log('liquid net volume ml', round(V_tot * 1e6, 3), 'non-manifold edges', sum(1 for e in bm.edges if not e.is_manifold)); bm.free()
mi = {m.name: i for i, m in enumerate(liq_net.data.materials)}
log('liquid materials', mi, 'faces per mat', [sum(1 for p in liq_net.data.polygons if p.material_index == i) for i in range(len(mi))])

# ice above the liquid: shell minus full liquid volume, then drop the cap faces that came from the liquid
liq_cut = liq.copy(); liq_cut.data = liq.data.copy(); liq_cut.name = 'LiqCutter'; sim.objects.link(liq_cut)
liq_cut.data.materials.clear(); liq_cut.data.materials.append(placeholder('M_Cap'))
for ic in ices:
    full = ic.data.copy(); full.name = ic.name + '_FullShell'
    bool_apply(ic, liq_cut)
    cap = [i for i, m in enumerate(ic.data.materials) if m and m.name == 'M_Cap']
    bm = bmesh.new(); bm.from_mesh(ic.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index in cap], context='FACES')
    bm.to_mesh(ic.data); bm.free()
    ic['full_shell'] = full.name; full.use_fake_user = True
    log(ic.name, 'above-liquid faces', len(ic.data.polygons))
bpy.data.objects.remove(liq_cut)

# ======================================================================== three equal-volume slabs (for the exploded view later)
def box(zlo, zhi):
    b = bmesh.new(); bmesh.ops.create_cube(b, size=1.0)
    ob = to_obj('box', b, sim); ob.scale = (0.2, 0.2, zhi - zlo); ob.location = (0, 0, (zlo + zhi) / 2)
    ob.data.materials.append(placeholder('M_LiqSlabCut')); vl.update(); return ob
def slab(src, zlo, zhi, name):
    ob = src.copy(); ob.data = src.data.copy(); ob.name = name; coll.objects.link(ob)
    bx = box(zlo, zhi); bool_apply(ob, bx, 'INTERSECT'); bpy.data.objects.remove(bx); return ob
def vol(ob):
    b = bmesh.new(); b.from_mesh(ob.data); v = b.calc_volume(); b.free(); return v
zc = []
for target in (V_tot / 3, 2 * V_tot / 3):
    lo, hi = F, L
    for _ in range(16):
        mid = (lo + hi) / 2; t = slab(liq_net, 0.0, mid, 'tmp'); v = vol(t); bpy.data.objects.remove(t)
        if v < target: lo = mid
        else: hi = mid
    zc.append((lo + hi) / 2)
slabs = [slab(liq_net, 0.0, zc[0], 'Liquid_Vermouth'), slab(liq_net, zc[0], zc[1], 'Liquid_Campari'), slab(liq_net, zc[1], 0.2, 'Liquid_Gin')]
for s_ in slabs: s_.hide_render = True
log('slab cuts', [round(z_, 6) for z_ in zc], 'volumes ml', [round(vol(s_) * 1e6, 3) for s_ in slabs])

# ======================================================================== render glass (inner faces under the liquid removed)
bm = bmesh.new(); bm.from_mesh(glass.data)
bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index == 1], context='FACES')
gme = bpy.data.meshes.new('Glass'); bm.to_mesh(gme); bm.free()
gme.materials.append(placeholder('M_Glass'))
grender = bpy.data.objects.new('Glass', gme); coll.objects.link(grender)
for p in grender.data.polygons: p.use_smooth = True
glass.hide_render = True; glass.hide_viewport = True
log('render glass faces', len(gme.polygons))

# ======================================================================== condensation droplets on the outer wall
rnd = random.Random(23)
gm = grender.data; gm.calc_loop_triangles()
cand = []; areas = []
for t in gm.loop_triangles:
    c = Vector(t.center); n = Vector(t.normal)
    r = math.hypot(c.x, c.y)
    if r > Ro - 0.0016 and abs(n.z) < 0.25 and 0.0035 < c.z < 0.0815 and Vector((c.x, c.y, 0)).normalized().dot(n) > 0.6:
        cand.append(t); areas.append(t.area)
import itertools
cum = list(itertools.accumulate(areas)); TOT = cum[-1]
import bisect
def dens(z):
    lowband = 0.55 + 0.45 * ss(0.010, 0.022, z)            # the solid base stays a little clearer
    return lowband * (1.0 if z < L - 0.002 else (0.02 + 0.98 * (1 - ss(L - 0.002, L + 0.003, z))))
cell = 0.0024; grid = {}; RUN_BEADS = []
def ok(p, a):
    gx, gy, gz = int(math.floor(p.x / cell)), int(math.floor(p.y / cell)), int(math.floor(p.z / cell))
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for dz in (-1, 0, 1):
                for (q, b) in grid.get((gx + dx, gy + dy, gz + dz), ()):
                    if (p - q).length < (a + b) * 1.08: return False
    return True
def add(p, a):
    grid.setdefault((int(math.floor(p.x / cell)), int(math.floor(p.y / cell)), int(math.floor(p.z / cell))), []).append((p, a))
dbm = bmesh.new(); placed = 0
verts_of = gm.vertices
# runs: a drop grew heavy and slid down, leaving a thin film lane that ends in a bead (and sweeps other drops away)
bvg = BVHTree.FromPolygons([v.co.copy() for v in gm.vertices], [tuple(p.vertices) for p in gm.polygons])
def on_glass(phi, z):
    o_ = Vector((0.07 * math.cos(phi), 0.07 * math.sin(phi), z)); d_ = Vector((-math.cos(phi), -math.sin(phi), 0.0))
    hit = bvg.ray_cast(o_, d_, 0.1)
    return (hit[0], hit[1].normalized()) if hit[0] is not None else (None, None)
RUNS = [(-1.40, 0.0585, 0.0265, 0.21), (-0.62, 0.0505, 0.0315, 0.62), (2.65, 0.0610, 0.0225, 1.7)]
for (phi0, z0, z1, seed_) in RUNS:
    N_ = 110; K_ = 7; secs_ = []; last = None
    for i in range(N_ + 1):
        tt_ = i / N_; z = z0 + (z1 - z0) * tt_
        phi = phi0 + 0.0075 * noise.noise(Vector((tt_ * 3.0, seed_, 0.5)))                  # slight meander
        w = 0.00012 + 0.00030 * ss(0.0, 0.35, tt_) * (0.85 + 0.3 * noise.noise(Vector((tt_ * 7.0, seed_, 2.0))))
        hfilm = 0.00006 + 0.00004 * ss(0.0, 0.4, tt_)
        row = []
        for j in range(K_):
            t_ = -1 + 2 * j / (K_ - 1)
            p_, n_ = on_glass(phi + t_ * w / Ro, z)
            if p_ is None: break
            row.append((p_, n_, hfilm * (1 - t_ * t_) - 0.00001))
        if len(row) == K_: secs_.append(row); last = (phi, z, w)
    top_ = [[dbm.verts.new(p_ + n_ * h_) for (p_, n_, h_) in row] for row in secs_]
    bot_ = [[dbm.verts.new(p_ - n_ * 0.00002) for (p_, n_, h_) in row] for row in secs_]
    for a_, b_ in zip(range(len(secs_) - 1), range(1, len(secs_))):
        for j in range(K_ - 1):
            dbm.faces.new([top_[a_][j], top_[b_][j], top_[b_][j + 1], top_[a_][j + 1]])
            dbm.faces.new([bot_[a_][j + 1], bot_[b_][j + 1], bot_[b_][j], bot_[a_][j]])
        dbm.faces.new([top_[a_][0], bot_[a_][0], bot_[b_][0], top_[b_][0]])
        dbm.faces.new([top_[a_][-1], top_[b_][-1], bot_[b_][-1], bot_[a_][-1]])
    for row_t, row_b, flip in ((top_[0], bot_[0], True), (top_[-1], bot_[-1], False)):
        for j in range(K_ - 1):
            q = [row_t[j], row_t[j + 1], row_b[j + 1], row_b[j]]
            dbm.faces.new(q[::-1] if flip else q)
    for row in secs_[::3]:                                                                   # keep the lane clear
        p_, n_, h_ = row[K_ // 2]; add(p_, last[2] + 0.0004)
    bead_p, bead_n = on_glass(last[0], last[1] - 0.0007)
    RUN_BEADS.append((bead_p, bead_n, 0.0009 + 0.0003 * (seed_ % 1)))
log('runs', len(RUNS))
def candidates():
    for (bp, bn, ba) in RUN_BEADS:
        if bp is not None: yield bp, bn, ba, True
    for attempt in range(int(os.environ.get('DROPS', 9000))):
        t = cand[bisect.bisect_left(cum, rnd.random() * TOT)]
        u_, v_ = rnd.random(), rnd.random()
        if u_ + v_ > 1: u_, v_ = 1 - u_, 1 - v_
        A, B, Cc = (Vector(verts_of[i].co) for i in t.vertices)
        p = A + (B - A) * u_ + (Cc - A) * v_
        if rnd.random() > dens(p.z): continue
        if p.x < -0.028 and abs(p.y) < 0.0058 and p.z > 0.0655: continue      # keep clear of the orange slot
        x = rnd.random()
        a = (0.00008 + 0.00012 * rnd.random() if x < 0.50 else 0.00020 + 0.00035 * rnd.random() if x < 0.88 else
             0.00055 + 0.00065 * rnd.random() if x < 0.98 else 0.00120 + 0.00070 * rnd.random())
        yield p, Vector(t.normal).normalized(), a, False
for (p, n, a, forced) in candidates():
    if not forced and not ok(p, a): continue
    add(p, a); placed += 1
    hcap = a * rnd.uniform(0.42, 0.58)                     # contact angle ~ 45-60 deg
    Rsph = (a * a + hcap * hcap) / (2 * hcap)
    amax = math.acos(max(-1.0, min(1.0, (Rsph - hcap) / Rsph)))
    embed = max(0.000015, 0.05 * a)
    t1 = n.orthogonal().normalized(); t2 = n.cross(t1)
    ns = 8 if a < 0.00022 else (12 if a < 0.0005 else 18); nr = 2 if a < 0.00022 else (3 if a < 0.0005 else 5)
    sag = (0.25 * rnd.random() if a > 0.0005 else 0.0) if not forced else 0.35
    Cs = p - n * (Rsph - hcap)
    Z = Vector((0, 0, 1))
    def P(alpha, phi, down=0.0):
        q = Cs + n * (Rsph * math.cos(alpha)) + (t1 * math.cos(phi) + t2 * math.sin(phi)) * (Rsph * math.sin(alpha)) - n * down
        if sag > 0:
            dz = (q - p).dot(Z)
            if dz < 0: q = q + Z * (dz * sag)
        return q
    top = dbm.verts.new(P(0, 0))
    rings = [[dbm.verts.new(P(amax * k / nr, 2 * math.pi * i / ns)) for i in range(ns)] for k in range(1, nr + 1)]
    rings.append([dbm.verts.new(P(amax, 2 * math.pi * i / ns, embed)) for i in range(ns)])   # skirt into the glass
    for i in range(ns):
        j = (i + 1) % ns
        dbm.faces.new([top, rings[0][i], rings[0][j]])
        for k in range(len(rings) - 1):
            dbm.faces.new([rings[k][i], rings[k + 1][i], rings[k + 1][j], rings[k][j]])
    bot = dbm.verts.new(p - n * embed)
    for i in range(ns):
        j = (i + 1) % ns
        dbm.faces.new([bot, rings[-1][j], rings[-1][i]])
bmesh.ops.recalc_face_normals(dbm, faces=dbm.faces[:])
drops = to_obj('Condensation', dbm); smooth(drops)
drops.data.materials.append(placeholder('M_Water'))
log('droplets', placed, 'tris', tris(drops))

# ======================================================================== origins at bounds centres, transforms record
final = [grender, liq_net] + slabs + ices + inners + [slice_ob, peel, drops]
for o in final:
    select_only(o); bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
rec = {o.name: {'location_blender_m': [round(c, 6) for c in o.location], 'triangles': tris(o)} for o in final}
rec['_cuts'] = {'z1': zc[0], 'z2': zc[1], 'liquid_net_ml': V_tot * 1e6, 'interferences': bad}
json.dump(rec, open(OUT + 'lux-transforms.json', 'w'), indent=1)
for o in [glass, liq]:
    bpy.data.objects.remove(o)
bpy.data.collections.remove(sim)
bpy.ops.wm.save_as_mainfile(filepath=OUT + 'lux-geometry.blend')
log('saved; total tris', sum(rec[k]['triangles'] for k in rec if not k.startswith('_')))
