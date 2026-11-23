# Exploded view ("vue éclatée") of the luxury Negroni. Used by lux_render.py with mode=eclate.
# The assembled scene file is not modified: the exploded pieces are built at render time from it.
#   - Glass: closed again (the inner wall under the liquid, removed for the assembled render, is rebuilt)
#   - Liquid_Vermouth / Liquid_Campari / Liquid_Gin: three clean layers of equal volume (no ice hollows),
#     each with its own ingredient colour
#   - Ice_01..03: whole cubes (full shells) with their cracks and bubbles
#   - Orange_Slice + Orange_Peel: the wheel, kept together
# The pieces are placed on a vertical axis, the studio is re-aimed at the tall composition and the
# label anchors (2D position of each piece) are written next to the render for the typography layer.
import bpy, bmesh, math, json
from mathutils import Vector, Matrix, Euler
from bpy_extras.object_utils import world_to_camera_view
import __main__ as R

A = R.A
log = R.log
SEG = 384
Ro, Ri, H, F = 0.039, 0.034, 0.088, 0.018          # same dimensions as lux_geo.py
RIM = (Ro - Ri) / 2
L = 0.064; ZM = L + 0.0015
NF = 24
GLASS_ANGLE = math.radians(float(A.get('glass_angle', -33)))    # same glass orientation as the hero image

# ingredient colours: absorption per metre (R, G, B)
SIGMA = {
    'Liquid_Gin': [float(x) for x in A.get('sig_gin', '1.6,0.8,0.5').split(',')],            # crystal clear, faint cool tint
    'Liquid_Campari': [float(x) for x in A.get('sig_campari', '3.5,64,74').split(',')],      # vivid luminous red, no pink
    'Liquid_Vermouth': [float(x) for x in A.get('sig_vermouth', '18,66,112').split(',')],   # deeper red amber
}
LIQ_MAT = {'Liquid_Gin': 'M_LiqGin', 'Liquid_Campari': 'M_LiqCampari', 'Liquid_Vermouth': 'M_LiqVermouth'}
# defaults of lux_render.py that differ for the exploded view (applied by lux_render before it builds the materials)
DEFAULTS = {
    # floating ice against black: clear (low roughness, light mist), the cracks and bubbles carry the detail
    'mist': '0.07', 'crack_frost': '0.30', 'ice_frost': '0.0', 'ice_r0': '0.015', 'ice_r1': '0.10',
    'drops': '0',      # the empty glass is shown crystal clear: its condensation stays in the scene, hidden in the render
    'fog': '0',        # and without the frosted (cold) patches of the assembled render
}
LOOK = 'AgX - Punchy'


# ------------------------------------------------------------------------------------------------ geometry helpers
def arc(cx, cz, rx, rz, a0, a1, n):
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cz + rz * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]

def dedupe(P):
    out = []
    for p in P:
        if not out or abs(p[0] - out[-1][0]) + abs(p[1] - out[-1][1]) > 1e-10: out.append(p)
    return out

def revolve(profile, seg):
    bm = bmesh.new(); rings = []
    for (r, z) in profile:
        if abs(r) < 1e-12: rings.append([bm.verts.new((0, 0, z))])
        else: rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / seg), r * math.sin(2 * math.pi * i / seg), z)) for i in range(seg)])
    for a, b in zip(rings, rings[1:]):
        for i in range(seg):
            j = (i + 1) % seg
            quad = [a[i % len(a)], a[j % len(a)], b[j % len(b)], b[i % len(b)]]
            q = [v for kk, v in enumerate(quad) if v != quad[kk - 1]]
            if len(set(q)) >= 3:
                try: bm.faces.new(q)
                except ValueError: pass
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-10)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm

def ss(e0, e1, x):
    t = min(1.0, max(0.0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t)

def sharpen(bm, angle_deg):
    # same result as "shade smooth by angle": smooth faces, edges sharper than the angle stay crisp
    lim = math.radians(angle_deg)
    for f in bm.faces: f.smooth = True
    for e in bm.edges:
        if len(e.link_faces) == 2 and e.link_faces[0].normal.angle(e.link_faces[1].normal, 0) > lim: e.smooth = False

def bm_volume(bm): return abs(bm.calc_volume(signed=True))

def mat(name): return bpy.data.materials.get(name) or bpy.data.materials.new(name)

def put_mesh(ob, bm, name, mats):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for m in mats: me.materials.append(mat(m))
    ob.data = me
    return me

def recentre(ob):
    # origin at the centre of the bounding box, world position unchanged
    me = ob.data
    xs = [v.co.x for v in me.vertices]; ys = [v.co.y for v in me.vertices]; zs = [v.co.z for v in me.vertices]
    c = Vector(((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, (min(zs) + max(zs)) / 2))
    me.transform(Matrix.Translation(-c)); ob.matrix_world = ob.matrix_world @ Matrix.Translation(c)

def world_bounds(obs):
    pts = []
    for o in obs:
        mw = o.matrix_world
        pts += [mw @ v.co for v in o.data.vertices]
    mn = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    mx = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    return mn, mx


# ------------------------------------------------------------------------------------------------ pieces
def build_glass_bm():
    zs = set(); z = 0.0030
    while z < H - RIM - 1e-6: zs.add(round(z, 7)); z += 0.0015
    for a_, b_, st in ((0.0030, 0.0050, 0.0005), (0.0160, 0.0190, 0.0005), (0.0785, 0.0845, 0.0005)):
        z = a_
        while z <= b_ + 1e-9: zs.add(round(z, 7)); z += st
    zs = sorted(x for x in zs if 0.003 < x < H - RIM)
    P_main = [(0, 0)] + arc(Ro - 0.003, 0.003, 0.003, 0.003, -90, 0, 8) + [(Ro, z_) for z_ in zs] \
        + arc(Ro - RIM, H - RIM, RIM, RIM, 0, 180, 18) + [(Ri, ZM)]
    P_sub = [(Ri, ZM), (Ri, F + 0.004)] + arc(Ri - 0.004, F + 0.004, 0.004, 0.004, 0, -90, 10) + [(0, F)]
    bm = revolve(dedupe(dedupe(P_main) + dedupe(P_sub)[1:]), SEG)
    def flute_depth(z):
        lower = ss(0.0028, 0.0048, z); upper = 1 - ss(0.0790, 0.0838, z)
        band = 1 - ss(0.0163, 0.0187, z)
        return (0.00058 + (0.00130 - 0.00058) * band) * lower * upper
    for v in bm.verts:
        r = math.hypot(v.co.x, v.co.y)
        if r > Ro - 1e-6 and 0.0028 < v.co.z < 0.0840:
            th = math.atan2(v.co.y, v.co.x) % (2 * math.pi)
            uu = (th * NF / (2 * math.pi)) % 1.0
            s = 2 * uu - 1; prof = 1 - s * s
            k = (r - flute_depth(v.co.z) * prof) / r
            v.co.x *= k; v.co.y *= k
    bm.normal_update(); sharpen(bm, 20)
    return bm

def liquid_profile(z0, z1):
    # slice of the liquid between two heights (cuts are in the straight part of the wall)
    if z0 <= F + 1e-9: p = [(0, F)] + arc(Ri - 0.004, F + 0.004, 0.004, 0.004, -90, 0, 10)
    else: p = [(0, z0), (Ri, z0)]
    if z1 >= ZM - 1e-9: p += [(Ri, ZM)] + arc(Ri - 0.0025, ZM, 0.0025, 0.0015, 0, -90, 14) + [(0, L)]
    else: p += [(Ri, z1), (0, z1)]
    return dedupe(p)

def liquid_bm(z0, z1):
    bm = revolve(liquid_profile(z0, z1), SEG); bm.normal_update(); sharpen(bm, 30); return bm

def puck_bm(z0, z1, seed):
    # the exploded layer: same radius and height as its slice of the drink, but with the soft rounded edge and
    # slightly domed faces of liquid held by surface tension, plus a faint frozen ripple on the top surface
    rf = min(float(A.get('puck_fillet', 0.0045)), (z1 - z0) * 0.42); dome = float(A.get('puck_dome', 0.0007))
    rr = Ri - rf; n_face, n_arc = 22, 14
    p = [(rr * i / n_face, z0 - dome * (1 - (i / n_face) ** 2)) for i in range(n_face + 1)]
    p += arc(rr, z0 + rf, rf, rf, -90, 0, n_arc)[1:]
    p += [(Ri, z0 + rf + (z1 - z0 - 2 * rf) * t / 4) for t in range(1, 4)]
    p += arc(rr, z1 - rf, rf, rf, 0, 90, n_arc)
    p += [(rr * (1 - i / n_face), z1 + dome * (1 - (1 - i / n_face) ** 2)) for i in range(1, n_face + 1)]
    bm = revolve(dedupe(p), SEG)
    # liquid, not acrylic: gentle frozen waves on both faces, carried into the rounded edge, and a slow wobble of the rim
    rnd = __import__('random').Random(seed)
    amp_t, amp_b, amp_r = float(A.get('ripple', 0.00045)), float(A.get('ripple_b', 0.00030)), float(A.get('wobble', 0.00050))
    def waves(n):
        return [(2 * math.pi / lam, rnd.uniform(0, 2 * math.pi), rnd.uniform(0, 2 * math.pi)) for lam in n]
    wt, wb = waves((0.0150, 0.0205, 0.0265)), waves((0.0170, 0.0240))
    lobes = [(k, rnd.uniform(0, 2 * math.pi), a) for k, a in ((3, 1.0), (5, 0.55), (8, 0.30))]
    zmid = (z0 + z1) / 2
    def field(x, y, W):
        return sum(math.sin(k * (x * math.cos(a) + y * math.sin(a)) + ph) for k, a, ph in W) / len(W)
    for v in bm.verts:
        x, y, z = v.co; r = math.hypot(x, y)
        e = ss(rr * 0.35, Ri, r)                      # 0 in the middle of a face, 1 on the edge
        if z > zmid: v.co.z += amp_t * field(x, y, wt) * (1 - 0.45 * e)
        else: v.co.z -= amp_b * field(x, y, wb) * (1 - 0.45 * e)
        if r > 1e-9:
            th = math.atan2(y, x); k_ = 1 + amp_r * e * sum(a * math.sin(n * th + ph) for n, ph, a in lobes) / 1.85 / max(r, 1e-6)
            v.co.x *= k_; v.co.y *= k_
    bm.normal_update(); sharpen(bm, 60)
    return bm

def equal_cuts():
    # V(F..z) is linear above the rounded bottom corner: two samples give the exact cut heights
    def v_to(z): b = liquid_bm(F, z); v = bm_volume(b); b.free(); return v
    b = liquid_bm(F, ZM); vt = bm_volume(b); b.free()
    za, zb = 0.030, 0.050; va, vb = v_to(za), v_to(zb); k = (vb - va) / (zb - za)
    cuts = [za + (vt * f - va) / k for f in (1 / 3, 2 / 3)]
    return cuts, vt


def build():
    """Replaces the assembled pieces by closed, standalone ones and places them (called before materials are assigned)."""
    coll = R.coll
    ROT0 = Matrix.Rotation(GLASS_ANGLE, 4, 'Z')          # hero orientation of the assembled cocktail
    original = {o.name: o.matrix_world.copy() for o in coll.objects}
    ORIG.clear(); ORIG['mw'] = original
    ORIG['mesh'] = {n: bpy.data.objects[n].data for n in ('Glass', 'Ice_01', 'Ice_02', 'Ice_03')}

    # glass, closed again; the condensation follows it
    glass = bpy.data.objects['Glass']; glass.matrix_world = Matrix.Identity(4)
    put_mesh(glass, build_glass_bm(), 'Glass_Closed', ['M_Glass']); recentre(glass)
    drops = bpy.data.objects['Condensation']
    drops.parent = glass; drops.matrix_parent_inverse = glass.matrix_world.inverted()
    if A.get('drops', '1') == '0': drops.hide_render = True

    # clean liquid layers
    (z1, z2), vt = equal_cuts()
    log('liquid layers: cuts at %.5f / %.5f m, %.1f ml each' % (z1, z2, vt * 1e6 / 3))
    bpy.data.objects['Liquid'].hide_render = True
    ranges = {'Liquid_Vermouth': (F, z1), 'Liquid_Campari': (z1, z2), 'Liquid_Gin': (z2, ZM)}
    for i, (nm, (a, b)) in enumerate(ranges.items()):
        ob = bpy.data.objects[nm]; ob.matrix_world = Matrix.Identity(4); ob.hide_render = False
        bm = puck_bm(a, b, 11 + i) if A.get('puck', '1') == '1' else liquid_bm(a, b)
        put_mesh(ob, bm, nm + '_Layer', [LIQ_MAT[nm]]); recentre(ob)

    # whole ice cubes, with their inner cracks / bubbles attached
    for nm in ('Ice_01', 'Ice_02', 'Ice_03'):
        ob = bpy.data.objects[nm]; ob.matrix_world = Matrix.Identity(4)
        bm = bmesh.new(); bm.from_mesh(bpy.data.meshes[nm + '_FullShell']); bm.normal_update()
        for f in bm.faces: f.material_index = 0; f.smooth = True
        put_mesh(ob, bm, nm + '_Whole', ['M_Ice']); recentre(ob)
        inn = bpy.data.objects[nm + '_Inner']; inn.parent = ob; inn.matrix_parent_inverse = ob.matrix_world.inverted()

    # orange wheel: peel and pulp move together
    sl, pe = bpy.data.objects['Orange_Slice'], bpy.data.objects['Orange_Peel']
    pe.parent = sl; pe.matrix_parent_inverse = sl.matrix_world.inverted()

    # ---------------------------------------------------------------- composition (vertical axis, camera looks along +y)
    pieces = ['Glass', 'Liquid_Vermouth', 'Liquid_Campari', 'Liquid_Gin', 'Ice_01', 'Ice_02', 'Ice_03', 'Orange_Slice']
    assembled = {}
    for nm in pieces:
        ob = bpy.data.objects[nm]
        assembled[nm] = ROT0 @ ob.matrix_world          # where the piece sits in the assembled hero cocktail
    g_glass = float(A.get('gap_glass', 0.024)); g_liq = float(A.get('gap_liq', 0.018))
    g_ice = float(A.get('gap_ice', 0.015)); g_or = float(A.get('gap_orange', 0.020))
    place = {}
    place['Glass'] = (Vector((0, 0, bpy.data.objects['Glass'].location.z)), Euler((0, 0, GLASS_ANGLE)))
    zb = H + g_glass
    for nm in ('Liquid_Vermouth', 'Liquid_Campari', 'Liquid_Gin'):
        o = bpy.data.objects[nm]; mn, mx = world_bounds([o]); c = o.location
        place[nm] = (Vector((0, 0, zb + (c.z - mn.z))), Euler((0, 0, 0)))
        zb = zb + (mx.z - mn.z) + g_liq
    gin_top = zb - g_liq
    zi = gin_top + g_ice
    ICE_LAYOUT = {   # offset from the axis (x, y), lift above the cluster base, rotation (deg)
        'Ice_01': ((-0.0235, -0.0050), 0.0190, (11, -14, 27)),
        'Ice_02': ((0.0240, -0.0035), 0.0175, (-13, 9, -21)),
        'Ice_03': ((0.0010, 0.0230), 0.0290, (23, 12, 46)),
    }
    from mathutils.bvhtree import BVHTree
    def bvh(o):
        mw = o.matrix_world; o.data.calc_loop_triangles()
        return BVHTree.FromPolygons([mw @ v.co for v in o.data.vertices], [tuple(t.vertices) for t in o.data.loop_triangles])
    lift3 = ICE_LAYOUT['Ice_03'][1]; spread = 0.0
    for it in range(40):          # lift the back cube / spread the front pair until no cube touches another
        for nm, ((x, y), lift, rot) in ICE_LAYOUT.items():
            if nm == 'Ice_03': lift = lift3
            else: x = x + math.copysign(spread, x)
            place[nm] = (Vector((x, y, zi + lift)), Euler(tuple(math.radians(r) for r in rot)))
            bpy.data.objects[nm].location, bpy.data.objects[nm].rotation_euler = place[nm]
        bpy.context.view_layer.update()
        t = {n: bvh(bpy.data.objects[n]) for n in ('Ice_01', 'Ice_02', 'Ice_03')}
        hit3 = t['Ice_03'].overlap(t['Ice_01']) or t['Ice_03'].overlap(t['Ice_02']); hit12 = t['Ice_01'].overlap(t['Ice_02'])
        if not hit3 and not hit12: break
        if hit3: lift3 += 0.0015
        if hit12: spread += 0.0015
    log('ice cluster: back cube lift %.4f, spread %.4f (%d steps)' % (lift3, spread, it))
    ice_top = world_bounds([bpy.data.objects[n] for n in ('Ice_01', 'Ice_02', 'Ice_03')])[1].z
    yaw, tilt = math.radians(float(A.get('orange_yaw', 32))), math.radians(float(A.get('orange_tilt', 12)))
    sl.rotation_mode = 'ZXY'; sl.location = (0, 0, 0); sl.rotation_euler = Euler((tilt, 0, yaw), 'ZXY'); bpy.context.view_layer.update()
    mn, mx = world_bounds([sl, pe])
    place['Orange_Slice'] = (Vector((-(mn.x + mx.x) / 2, -(mn.y + mx.y) / 2, ice_top + g_or - mn.z)), Euler((tilt, 0, yaw), 'ZXY'))

    # assembled pose at frame 1, exploded pose at frame 100 (ready for an animation); the render uses frame 100
    sc = bpy.context.scene
    for nm in pieces:
        ob = bpy.data.objects[nm]
        ob.rotation_mode = 'ZXY' if nm == 'Orange_Slice' else 'XYZ'
        loc, rot, _ = assembled[nm].decompose()
        ob.location = loc; ob.rotation_euler = rot.to_euler(ob.rotation_mode)
        ob.keyframe_insert('location', frame=1); ob.keyframe_insert('rotation_euler', frame=1)
        ob['assembled_location'] = list(loc); ob['assembled_rotation'] = list(ob.rotation_euler)
        loc, rot = place[nm]
        ob.location = loc; ob.rotation_euler = rot
        ob.keyframe_insert('location', frame=100); ob.keyframe_insert('rotation_euler', frame=100)
    sc.frame_start, sc.frame_end = 1, 100; sc.frame_set(100)
    bpy.context.view_layer.update()

    # no piece may touch another
    objs = pieces + ['Orange_Peel']; trees = {n: bvh(bpy.data.objects[n]) for n in objs}; bad = []
    for i in range(len(objs)):
        for j in range(i + 1, len(objs)):
            if {objs[i], objs[j]} == {'Orange_Slice', 'Orange_Peel'}: continue
            if trees[objs[i]].overlap(trees[objs[j]]): bad.append((objs[i], objs[j]))
    log('exploded layout: overlaps', bad)
    for nm in pieces:
        mn, mx = world_bounds([bpy.data.objects[nm]] + ([pe] if nm == 'Orange_Slice' else []))
        log('  %-16s z %.4f .. %.4f' % (nm, mn.z, mx.z))
    prepare_sequence(pe)


# ------------------------------------------------------------------------------------------------ explode sequence (web)
# The site plays a short image sequence: the pieces leave a tight stack just above the glass and spread to the exploded
# layout, the top ones first (gaps only grow: no piece ever touches another). Each piece also turns a little about the
# vertical axis (z extents unchanged). The camera and the lights stay those of the exploded view.
SEQ = {}
ORIG = {}          # assembled scene, kept for the first image of the sequence
GROUPS_SEQ = [  # bottom to top: objects moving together, extra gap in the tight stack, turn (deg), time window
    (['Liquid_Vermouth'], 0.0030, -18, (0.22, 1.00)),
    (['Liquid_Campari'], 0.0030, -24, (0.16, 0.95)),
    (['Liquid_Gin'], 0.0030, -30, (0.10, 0.90)),
    (['Ice_01', 'Ice_02', 'Ice_03'], 0.0050, -25, (0.04, 0.84)),
    (['Orange_Slice'], 0.0040, -40, (0.00, 0.78)),
]
CARD_OF = {'Back_VERMOUTH': 'Liquid_Vermouth', 'Back_CAMPARI': 'Liquid_Campari', 'Back_GIN': 'Liquid_Gin', 'Back_ICE': 'Ice_01'}

def prepare_sequence(peel):
    ob = bpy.data.objects; cur = H; SEQ.clear(); SEQ['pieces'] = {}
    for names, gap, turn, win in GROUPS_SEQ:
        obs = [ob[n] for n in names] + ([peel] if 'Orange_Slice' in names else [])
        mn, mx = world_bounds(obs)
        dz = (cur + gap) - mn.z; cur = mx.z + dz
        piv = Vector(((mn.x + mx.x) / 2, (mn.y + mx.y) / 2, 0)) if len(names) > 1 else None
        for n in names:
            m1 = ob[n].matrix_world.copy()
            SEQ['pieces'][n] = {'m1': m1, 'dz': dz, 'turn': math.radians(turn), 'win': win,
                                'pivot': piv if piv is not None else Vector((m1.translation.x, m1.translation.y, 0))}
    log('sequence: tight stack %.3f m high, exploded %.3f m' % (cur, world_bounds([ob['Orange_Slice'], peel])[1].z))

def assembled_view():
    """Image 0 of the web sequence: the real assembled cocktail (original meshes and liquid interfaces) seen with the
    camera, lights and AgX look of the exploded view. The empty-glass look (no condensation, no frost) is kept, so
    the glass is the same before and after the pieces lift out."""
    ob = bpy.data.objects; ROT0 = Matrix.Rotation(GLASS_ANGLE, 4, 'Z')
    for n, me in ORIG['mesh'].items(): ob[n].data = me
    for n in ('Liquid_Vermouth', 'Liquid_Campari', 'Liquid_Gin'): ob[n].hide_render = True
    ob['Liquid'].hide_render = False
    for n, mw in ORIG['mw'].items():
        o = ob.get(n)
        if o is None or n == 'Condensation': continue
        o.animation_data_clear(); tt = o.parent if o.parent and o.parent.name == 'Turntable' else None
        o.parent = tt; o.matrix_parent_inverse = Matrix.Identity(4); o.matrix_world = ROT0 @ mw
    for c in list(CARD_OF) + ['Glint']:
        if c in ob and c.startswith('Back_'): ob[c].hide_render = True
    ob['GlowCard'].hide_render = False
    bpy.context.view_layer.update()
    log('assembled view: original cocktail, exploded-view camera and lights')

def seq_ease(u):
    u = min(1.0, max(0.0, u)); return u * u * u * (u * (u * 6 - 15) + 10)

def seq_start():
    """Before rendering the sequence: the keyframes (assembled / exploded, kept in the saved scenes) would override
    the poses set here, and the backlight cards must follow their liquid."""
    ob = bpy.data.objects
    for n in SEQ['pieces']: ob[n].animation_data_clear()
    SEQ['cards'] = {c: (ob[c].location.copy(), p) for c, p in CARD_OF.items() if c in ob and p in SEQ['pieces']}

def pose(t):
    ob = bpy.data.objects; shift = {}
    for n, d in SEQ['pieces'].items():
        a, b = d['win']; u = seq_ease((t - a) / (b - a))
        ang = d['turn'] * (1 - u); pv = d['pivot']
        T = Matrix.Translation((pv.x, pv.y, 0)) @ Matrix.Rotation(ang, 4, 'Z') @ Matrix.Translation((-pv.x, -pv.y, 0))
        m = T @ d['m1']; m.translation.z += d['dz'] * (1 - u)
        ob[n].matrix_world = m; shift[n] = d['dz'] * (1 - u)
    for c, (loc, p) in SEQ.get('cards', {}).items():
        ob[c].location = loc + Vector((0, 0, shift[p]))
    bpy.context.view_layer.update()


def liquid_materials(M):
    """Per-ingredient liquid materials (liquid / air), added to lux_render's material table."""
    for nm, sig in SIGMA.items():
        d = max(max(sig), 1e-6)
        def vol(nt, sig=sig, d=d):
            a = nt.nodes.new('ShaderNodeVolumeAbsorption')
            a.inputs['Color'].default_value = (1 - sig[0] / d, 1 - sig[1] / d, 1 - sig[2] / d, 1); a.inputs['Density'].default_value = d
            return a
        M[LIQ_MAT[nm]] = R.dielectric(LIQ_MAT[nm], R.N_LIQ, 0.0, volume=vol)


# ------------------------------------------------------------------------------------------------ studio for the tall composition
def card(name, centre, w, h, strength, color, y_back):
    """Backlight card: emitter seen only through refractive surfaces (like the assembled render's glow card)."""
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.data.collections['Studio'].objects.link(o)
    o.scale = (w, h, 1); o.location = (centre.x, centre.y + y_back, centre.z); o.rotation_euler = (math.radians(90), 0, 0)
    m, nt, out = R.new_mat('M_' + name)
    em = nt.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = tuple(color) + (1,)
    tc = nt.nodes.new('ShaderNodeTexCoord'); sp = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Generated'], sp.inputs[0])
    def mr(src, a0, a1, b0=0.0, b1=1.0, interp='LINEAR'):
        n_ = nt.nodes.new('ShaderNodeMapRange'); n_.interpolation_type = interp
        n_.inputs['From Min'].default_value = a0; n_.inputs['From Max'].default_value = a1; n_.inputs['To Min'].default_value = b0; n_.inputs['To Max'].default_value = b1
        nt.links.new(src, n_.inputs['Value']); return n_.outputs['Result']
    def math_(op, a_, b_=None, bv=None):
        n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = op; nt.links.new(a_, n_.inputs[0])
        if b_ is not None: nt.links.new(b_, n_.inputs[1])
        elif bv is not None: n_.inputs[1].default_value = bv
        return n_.outputs[0]
    u = mr(sp.outputs['X'], 0.0, 1.0, -1.0, 1.0)
    hz = math_('POWER', mr(math_('MULTIPLY', u, u), 0.0, 1.0, 1.0, 0.0), bv=float(A.get('card_pow', 0.8)))
    vt = math_('MULTIPLY', mr(sp.outputs['Y'], 0.0, 0.25, interp='SMOOTHSTEP'), mr(sp.outputs['Y'], 1.0, 0.75, interp='SMOOTHSTEP'))
    nt.links.new(math_('MULTIPLY', math_('MULTIPLY', hz, vt), bv=strength), em.inputs['Strength'])
    lp = nt.nodes.new('ShaderNodeLightPath'); gt = math_('GREATER_THAN', lp.outputs['Glossy Depth'], bv=0.5)
    tr = nt.nodes.new('ShaderNodeBsdfTransparent'); mx = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(gt, mx.inputs['Fac']); nt.links.new(em.outputs[0], mx.inputs[1]); nt.links.new(tr.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs['Surface']); me.materials.append(m)
    o.visible_camera = False; o.visible_glossy = False; o.visible_diffuse = False; o.visible_shadow = False
    o.visible_volume_scatter = False; o.visible_transmission = True
    return o

def backdrop(cam):
    """Sweep emission = anthracite base + warm elliptical glow placed in the camera's frame. Projected from the camera,
    the glow is a clean gradient behind the column whatever the floor / wall curve does (no horizon band)."""
    m = bpy.data.materials['M_Sweep']; nt = m.node_tree
    b = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    for l in list(b.inputs['Emission Strength'].links) + list(b.inputs['Emission Color'].links): nt.links.remove(l)
    sc = bpy.context.scene; mw = cam.matrix_world
    C = mw.translation; Rt = mw.col[0].xyz.normalized(); Up = mw.col[1].xyz.normalized(); Fw = -mw.col[2].xyz.normalized()
    thh = 18.0 / cam.data.lens; thw = thh * sc.render.resolution_x / sc.render.resolution_y
    if sc.render.resolution_x > sc.render.resolution_y: thw = 18.0 / cam.data.lens; thh = thw * sc.render.resolution_y / sc.render.resolution_x
    def vm(op, a_, b_):
        n_ = nt.nodes.new('ShaderNodeVectorMath'); n_.operation = op; nt.links.new(a_, n_.inputs[0])
        if isinstance(b_, bpy.types.NodeSocket): nt.links.new(b_, n_.inputs[1])
        else: n_.inputs[1].default_value = b_
        return n_.outputs['Value'] if op == 'DOT_PRODUCT' else n_.outputs['Vector']
    def mm(op, a_, b_=None):
        n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = op
        for i_, x_ in enumerate((a_, b_)):
            if x_ is None: continue
            if isinstance(x_, bpy.types.NodeSocket): nt.links.new(x_, n_.inputs[i_])
            else: n_.inputs[i_].default_value = x_
        return n_.outputs[0]
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    d = vm('SUBTRACT', geo.outputs['Position'], C)
    f = mm('MAXIMUM', vm('DOT_PRODUCT', d, Fw), 1e-3)
    x = mm('DIVIDE', vm('DOT_PRODUCT', d, Rt), mm('MULTIPLY', f, thw))
    y = mm('DIVIDE', vm('DOT_PRODUCT', d, Up), mm('MULTIPLY', f, thh))
    cx, cy = float(A.get('bg_cx', 0.0)), float(A.get('bg_cy', 0.12)); sx, sy = float(A.get('bg_sx', 0.75)), float(A.get('bg_sy', 0.90))
    q = mm('ADD', mm('POWER', mm('DIVIDE', mm('SUBTRACT', x, cx), sx), 2.0), mm('POWER', mm('DIVIDE', mm('SUBTRACT', y, cy), sy), 2.0))
    g = mm('EXPONENT', mm('MULTIPLY', q, -1.0))
    warm = [float(v) for v in A.get('bg_col', '1.0,0.68,0.40').split(',')]; peak = float(A.get('bg', 0.045))
    base = [float(v) for v in A.get('bg_base_col', '0.80,0.86,1.0').split(',')]; bs = float(A.get('bg_base', 0.0022))
    mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'; mix.clamp_factor = True
    nt.links.new(g, mix.inputs['Factor'])
    mix.inputs['A'].default_value = tuple(c * bs for c in base) + (1,)
    mix.inputs['B'].default_value = tuple(c * peak + cb * bs for c, cb in zip(warm, base)) + (1,)
    nt.links.new(mix.outputs['Result'], b.inputs['Emission Color']); b.inputs['Emission Strength'].default_value = 1.0
    log('backdrop: warm glow %.3f at (%.2f, %.2f) of the frame, base %.4f' % (peak, cx, cy, bs))

def aim(o, loc, target):
    o.location = loc; o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()

def stage():
    """Re-aims lights and camera at the exploded composition; writes the label anchors."""
    organise(); save_step(A.get('step_tag', 'controle') + '-1-composition')
    ob = bpy.data.objects
    pieces = {'GLASS': ['Glass'], 'VERMOUTH': ['Liquid_Vermouth'], 'CAMPARI': ['Liquid_Campari'], 'GIN': ['Liquid_Gin'],
              'ICE': ['Ice_01', 'Ice_02', 'Ice_03'], 'ORANGE': ['Orange_Slice', 'Orange_Peel']}
    bounds = {k: world_bounds([ob[n] for n in v]) for k, v in pieces.items()}
    z_top = bounds['ORANGE'][1].z; zc = (z_top + 0.0) / 2
    K = float(A.get('lights', 1.0))
    # rim strips: tall, cover the whole column; they draw the glass and the ice, not the liquids
    # (on the liquid layers their two straight reflections read as acrylic)
    if A.get('strip_liquid', '0') == '0' and 'GlassOnly' in bpy.data.collections:
        go = bpy.data.collections['GlassOnly']
        for n in ('Liquid_Vermouth', 'Liquid_Campari', 'Liquid_Gin'):
            if ob[n].name in go.objects: go.objects.unlink(ob[n])
    sh = float(A.get('strip_h', 0.85)); sp = float(A.get('strip', 46.0)) * K
    for nm, x, y in (('StripL', -0.32, 0.24), ('StripR', 0.33, 0.22)):
        aim(ob[nm], (x, y, zc), (0, 0, zc)); ob[nm].data.size, ob[nm].data.size_y = 0.040, sh; ob[nm].data.energy = sp
    aim(ob['Top'], (0.02, 0.06, z_top + 0.36), (0, 0.01, z_top - 0.06)); ob['Top'].data.energy = float(A.get('top_e', 4.0)) * K
    aim(ob['Key'], (-0.46, -0.52, zc + 0.26), (0, 0, zc + 0.03)); ob['Key'].data.size = ob['Key'].data.size_y = 0.55
    ob['Key'].data.energy = float(A.get('key_e', 3.0)) * K
    oc = (bounds['ORANGE'][0] + bounds['ORANGE'][1]) / 2
    aim(ob['Kicker'], (oc.x - 0.22, oc.y + 0.26, oc.z + 0.14), oc); ob['Kicker'].data.energy = float(A.get('kick_e', 3.5)) * K
    aim(ob['Scrim'], (0, 0.05, z_top + 0.45), (0, 0.02, zc)); ob['Scrim'].data.size = ob['Scrim'].data.size_y = 0.9
    ob['Scrim'].data.energy = float(A.get('scrim_e', 3.2)) * K
    aim(ob['BackTop'], (0, 0.42, zc + 0.20), (0, 0, zc)); ob['BackTop'].data.energy = float(A.get('backtop_e', 1.8)) * K
    # glint panel behind: what the tops of the liquid layers mirror (glossy only, never a backlight)
    lz = [bounds[k][1].z for k in ('VERMOUTH', 'CAMPARI', 'GIN')]
    if 'Glint' in ob:
        g = ob['Glint']; gz = (min(lz) + max(lz)) / 2 + 0.055
        aim(g, (0, 0.50, gz), (0, 0, (min(lz) + max(lz)) / 2)); g.data.size, g.data.size_y = 0.40, 0.10 + (max(lz) - min(lz))
        g.data.energy = float(A.get('glint_e', 0.12)) * K; g.data.color = (1.0, 0.93, 0.84); g.visible_transmission = False; g.visible_diffuse = False
    # the assembled glow card would light the empty glass: off. One backlight card per liquid layer instead
    ob['GlowCard'].hide_render = True
    for s in (-1, 1):
        n_ = 'Fill%+d' % s
        if n_ in ob:
            f = ob[n_]; f.location = (s * float(A.get('fill_x', 0.15)), 0.0, zc); f.scale = (0.14, float(A.get('fill_h', 0.40)), 1)
    BACK = {'VERMOUTH': (float(A.get('card_v', 7.0)), (1.0, 0.82, 0.62)), 'CAMPARI': (float(A.get('card_c', 9.5)), (1.0, 0.86, 0.74)),
            'GIN': (float(A.get('card_g', 1.2)), (0.92, 0.96, 1.0))}
    for k, (stren, col) in BACK.items():
        mn, mx = bounds[k]; c = (mn + mx) / 2
        if stren > 0: card('Back_' + k, Vector((c.x, c.y, c.z - float(A.get('card_drop', 0.006)))), float(A.get('card_w', 0.10)),
                           (mx.z - mn.z) + float(A.get('card_extra', 0.014)), stren, col, float(A.get('card_back', 0.055)))
    if float(A.get('card_i', 0.35)) > 0:
        mn, mx = bounds['ICE']; c = (mn + mx) / 2
        card('Back_ICE', Vector((c.x, c.y, c.z)), (mx.x - mn.x) + 0.02, (mx.z - mn.z) + 0.01, float(A.get('card_i', 0.35)), (0.94, 0.97, 1.0), 0.07)

    # camera: slightly telephoto, slight elevation, framed on the column with room for the labels
    cam = bpy.context.scene.camera
    lens = float(A.get('lens', 105)); el = math.radians(float(A.get('el', 10.0)))
    z_lo = -float(A.get('floor_show', 0.035)); z_hi = z_top + float(A.get('head', 0.030))
    tgt = Vector((0, 0, (z_lo + z_hi) / 2 + float(A.get('tz_off', 0.0))))
    fov = 2 * math.atan(18.0 / lens); dist = float(A.get('dist', ((z_hi - z_lo) / 2) / math.tan(fov / 2) * float(A.get('frame', 1.06))))
    cam.location = tgt + Vector((0, -dist * math.cos(el), dist * math.sin(el)))
    cam.rotation_euler = (tgt - cam.location).to_track_quat('-Z', 'Y').to_euler()
    cam.data.lens = lens; cam.data.sensor_width = 36; cam.data.sensor_fit = 'AUTO'; cam.data.clip_start = 0.01
    cam.data.dof.use_dof = A.get('dof', '1') == '1'
    cam.data.dof.focus_distance = (Vector((0, 0, tgt.z)) - cam.location).length
    cam.data.dof.aperture_fstop = float(A.get('fstop', 8.0))
    bpy.context.view_layer.update()
    backdrop(cam)
    log('camera: lens %.0f mm, distance %.3f m, target z %.3f, column 0 .. %.3f m' % (lens, dist, tgt.z, z_top))

    # label anchors: the outer edge of each piece at its own height, alternately right / left
    sc = bpy.context.scene
    SIDE = {'ORANGE': 1, 'ICE': -1, 'GIN': 1, 'CAMPARI': -1, 'VERMOUTH': 1, 'GLASS': -1}
    NAME = {'ORANGE': 'ORANGE', 'ICE': 'ICE', 'GIN': 'BOBBY’S DRY GIN', 'CAMPARI': 'CAMPARI', 'VERMOUTH': 'VERMOUTH', 'GLASS': 'GLASS'}
    labels = []
    for k, names in pieces.items():
        pts = []
        for n in names:
            mw = ob[n].matrix_world
            vs = ob[n].data.vertices
            pts += [world_to_camera_view(sc, cam, mw @ vs[i].co) for i in range(0, len(vs), 3)]
        ys = [p.y for p in pts]; ymid = (min(ys) + max(ys)) / 2; band = 0.18 * (max(ys) - min(ys))
        near = [p for p in pts if abs(p.y - ymid) < band] or pts
        x = max(p.x for p in near) if SIDE[k] > 0 else min(p.x for p in near)
        labels.append({'key': k, 'text': NAME[k], 'side': 'right' if SIDE[k] > 0 else 'left',
                       'anchor': [round(x, 5), round(1 - ymid, 5)],
                       'box': [round(min(p.x for p in pts), 5), round(1 - max(ys), 5), round(max(p.x for p in pts), 5), round(1 - min(ys), 5)]})
    if 'out' in A:
        json.dump({'width': sc.render.resolution_x, 'height': sc.render.resolution_y, 'labels': labels},
                  open(A['out'] + '.labels.json', 'w'), indent=1, ensure_ascii=False)
    log('labels', [(l['key'], l['anchor']) for l in labels])
    label_anchors(labels); organise()


# ------------------------------------------------------------------------------------------------ scene file
GROUPS = {'Negroni_Glass': ['Glass', 'Condensation'],
          'Negroni_Liquids': ['Liquid_Vermouth', 'Liquid_Campari', 'Liquid_Gin', 'Liquid'],
          'Negroni_Ice': ['Ice_01', 'Ice_01_Inner', 'Ice_02', 'Ice_02_Inner', 'Ice_03', 'Ice_03_Inner'],
          'Negroni_Orange': ['Orange_Slice', 'Orange_Peel']}
LABEL_PIECE = {'ORANGE': 'Orange_Slice', 'ICE': 'Ice_01', 'GIN': 'Liquid_Gin', 'CAMPARI': 'Liquid_Campari',
               'VERMOUTH': 'Liquid_Vermouth', 'GLASS': 'Glass'}

def organise():
    """One sub-collection per component (object names unchanged, for the GLB export), studio split into lights /
    backdrop / backlight cards. Light linking follows nested collections, so the render is unchanged."""
    root = R.coll
    for cname, names in GROUPS.items():
        c = bpy.data.collections.get(cname) or bpy.data.collections.new(cname)
        if c.name not in root.children: root.children.link(c)
        for n in names:
            o = bpy.data.objects.get(n)
            if o is None: continue
            if o.name not in c.objects: c.objects.link(o)
            if o.name in root.objects: root.objects.unlink(o)
    st = bpy.data.collections['Studio']
    sub = {'Studio_Lights': lambda o: o.type == 'LIGHT',
           'Studio_Backlight_Cards': lambda o: o.name.startswith('Back_') or o.name in ('GlowCard',) or o.name.startswith('Fill'),
           'Studio_Backdrop': lambda o: o.type == 'MESH'}
    for cname, test in sub.items():
        c = bpy.data.collections.get(cname) or bpy.data.collections.new(cname)
        if c.name not in st.children: st.children.link(c)
        for o in list(st.objects):
            if test(o): c.objects.link(o); st.objects.unlink(o)

def label_anchors(labels):
    """Empties at each label anchor, parented to their piece: they follow the assembled -> exploded animation, so a
    web page can read where each name points at any frame. The names themselves stay a separate 2D layer."""
    c = bpy.data.collections.get('Labels') or bpy.data.collections.new('Labels')
    if c.name not in bpy.context.scene.collection.children: bpy.context.scene.collection.children.link(c)
    sc = bpy.context.scene; cam = sc.camera
    for l in labels:
        piece = bpy.data.objects[LABEL_PIECE[l['key']]]
        # back-project the 2D anchor onto the plane through the piece centre, facing the camera
        x, y = l['anchor'][0], 1 - l['anchor'][1]
        frame = [cam.matrix_world @ v for v in cam.data.view_frame(scene=sc)]   # tr, br, bl, tl
        tl, tr, bl = frame[3], frame[0], frame[2]
        p_img = bl + (tr - tl) * x + (tl - bl) * y
        ray = (p_img - cam.matrix_world.translation).normalized(); fw = -cam.matrix_world.col[2].xyz.normalized()
        t = (piece.matrix_world.translation - cam.matrix_world.translation).dot(fw) / ray.dot(fw)
        pos = cam.matrix_world.translation + ray * t
        nm = 'Label_' + l['key']
        e = bpy.data.objects.get(nm) or bpy.data.objects.new(nm, None)
        if e.name not in c.objects: c.objects.link(e)
        e.empty_display_type = 'SPHERE'; e.empty_display_size = 0.002
        e.parent = piece; e.matrix_parent_inverse = piece.matrix_world.inverted(); e.location = pos
        e['text'] = l['text']; e['side'] = l['side']

def save_step(tag):
    """Copy of the scene at this step (save_steps=<folder>): texture paths relative, AgX colour management on."""
    d = A.get('save_steps')
    if not d: return
    import os
    os.makedirs(d, exist_ok=True)
    path = os.path.join(d, 'negroni-eclate-%s.blend' % tag)
    paths = {}
    for im in bpy.data.images:
        if im.filepath and not im.filepath.startswith('//') and im.source == 'FILE':
            paths[im.name] = im.filepath; im.filepath = bpy.path.relpath(bpy.path.abspath(im.filepath), start=d)
    vs = bpy.context.scene.view_settings; old = (vs.view_transform, vs.look)
    vs.view_transform = 'AgX'; vs.look = A.get('look', LOOK)
    bpy.context.preferences.filepaths.save_version = 0          # no .blend1 backups next to the versions
    bpy.ops.wm.save_as_mainfile(filepath=path, copy=True, relative_remap=False)
    vs.view_transform, vs.look = old
    for n, fp in paths.items(): bpy.data.images[n].filepath = fp      # this session keeps reading the originals
    log('saved', path)


# ------------------------------------------------------------------------------------------------ AgX output
def grade_agx(exr, png):
    """Linear EXR -> soft bloom (linear) -> Blender's AgX view transform -> gentle vignette (display space)."""
    import numpy as np
    sc = bpy.context.scene
    im = bpy.data.images.load(exr); w_, h_ = im.size
    arr = np.empty(w_ * h_ * 4, np.float32); im.pixels.foreach_get(arr)
    a = arr.reshape(h_, w_, 4)
    rgb = a[..., :3] * float(A.get('expo', 1.0))
    s = h_ / 1350.0
    lum = rgb.max(axis=2, keepdims=True)
    hi = rgb * np.clip((lum - float(A.get('bthr', 1.5))) / 2.0, 0, 1)
    bloom = 0.55 * R.blur(hi, 2.5 * s) + 0.30 * R.blur(hi, 9 * s) + 0.15 * R.blur(hi, 28 * s)
    a[..., :3] = rgb + float(A.get('bloom', 0.03)) * bloom
    im.pixels.foreach_set(a.ravel())
    vs = sc.view_settings; vs.view_transform = 'AgX'; vs.look = A.get('look', LOOK); vs.exposure = 0.0
    fmt = sc.render.image_settings; old = (fmt.file_format, fmt.color_depth)
    fmt.file_format = 'PNG'; fmt.color_depth = '16'; fmt.color_mode = 'RGB'
    tmp = png[:-4] + '_agx.png'; im.save_render(tmp, scene=sc); bpy.data.images.remove(im)
    fmt.file_format, fmt.color_depth = old
    vs.view_transform = 'Standard'; vs.look = 'None'
    from PIL import Image
    # PIL silently reads 16-bit RGB PNGs as 8-bit: read the display-referred file back through Blender, untouched
    t = bpy.data.images.load(tmp); t.colorspace_settings.name = 'Non-Color'
    d = np.empty(w_ * h_ * 4, np.float32); t.pixels.foreach_get(d); bpy.data.images.remove(t)
    d = d.reshape(h_, w_, 4)[::-1, :, :3].copy()          # Blender rows run bottom-up
    hh, ww = d.shape[:2]
    yy, xx = np.mgrid[0:hh, 0:ww].astype(np.float32)
    v = ((xx - ww / 2) / (ww / 2)) ** 2 * 0.8 + ((yy - hh * 0.5) / (hh / 2)) ** 2
    d = d * (1 - float(A.get('vig', 0.25)) * np.clip(v - 0.30, 0, 1.5) ** 1.2)[..., None]
    d = d + np.random.default_rng(1).normal(0, 0.0018, d.shape).astype(np.float32)
    Image.fromarray((np.clip(d, 0, 1) * 255 + 0.5).astype(np.uint8)).save(png)
    import os; os.remove(tmp)
