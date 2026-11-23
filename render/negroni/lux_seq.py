# Web image sequence for the Progress menu: the Negroni comes apart out of its glass.
#   python3 lux_render.py -- mode=eclate seq=0-71 nseq=72 outdir=... drops=1 fog=0.16
# Image 0 is the hero image of the assembled cocktail: same pieces, condensation, frosted glass, lights, camera, grade.
# Then each piece really leaves the glass:
#   - the orange wheel lifts off the rim (straight up until its slot is clear of the glass), then rises to the top,
#   - the ice cubes rise out of the drink, the top one first, straight up until they are clear of the rim,
#   - the liquid rises out of the glass in one piece, then splits into vermouth, Campari and gin: each slice takes
#     its own colour and the shape of its layer in the exploded view.
# The camera pulls back just enough to keep every piece in the frame, while the lights and the grade turn from those
# of the hero image into those of the exploded view: the last image is the exploded view.
# Background: the menu's green gradient, as the world seen by camera rays and by rays refracted through the glass,
# the liquid and the ice (window coordinates). Its colours are solved for each image so that the graded image shows
# the page's CSS colours: the menu draws the images over the same gradient, placed relative to the image.
import bpy, bmesh, math, json, os, tempfile
import numpy as np
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree
import __main__ as R
import lux_eclate as E

A = R.A
log = R.log
Ro, Ri, H, F, RIM, L, ZM, SEG = E.Ro, E.Ri, E.H, E.F, E.RIM, E.L, E.ZM, E.SEG
LIQS = ('Liquid_Vermouth', 'Liquid_Campari', 'Liquid_Gin')     # bottom to top
ICES = ('Ice_01', 'Ice_02', 'Ice_03')
LIGHTS = ('StripL', 'StripR', 'Top', 'Key', 'Kicker', 'Scrim', 'BackTop', 'Glint')
S = {}


def fa(k, d): return float(A.get(k, d))
def smoother(u): u = min(1.0, max(0.0, u)); return u * u * u * (u * (u * 6 - 15) + 10)
def ramp(t, a, b): return smoother((t - a) / (b - a)) if b > a else float(t >= b)
def lerp(a, b, w): return a + (b - a) * w
def trs(p, q): m = q.to_matrix().to_4x4(); m.translation = p; return m


# timeline, in fractions of the sequence (0 = hero image, 1 = exploded view)
T_OR = (fa('t_or0', 0.0), fa('t_or1', 0.42))
T_ICE = [fa('t_ice_a', 0.06), fa('t_ice_b', 0.13), fa('t_ice_c', 0.20)]      # start of each cube, top cube first
ICE_DUR = fa('t_ice_dur', 0.40)
T_RISE = (fa('t_rise0', 0.30), fa('t_rise1', 0.72)); RISE = fa('rise', 0.080)
T_SPLIT0 = fa('t_split0', 0.64)
T_SPLIT1 = {'Liquid_Gin': fa('t_gin', 0.94), 'Liquid_Campari': fa('t_campari', 0.97), 'Liquid_Vermouth': fa('t_vermouth', 1.0)}
T_LOOK = (fa('t_look0', 0.12), fa('t_look1', 0.92))
CLEAR = {'orange': fa('clear_or', 0.004), 'ice': fa('clear_ice', 0.007)}     # clearance over the rim before moving sideways
# the hero image's drink looks red mostly through its ice cubes; once they are out, plain liquid lit from behind turns
# amber. Its absorption is raised as the cubes leave so the drink stays Negroni red (x LIQ_DENS when they are all out)
LIQ_DENS = fa('liq_dens', 2.4); T_DENS = (fa('t_dens0', 0.06), fa('t_dens1', 0.36))
MORPH_GAP = fa('morph_gap', 0.008)        # a slice has its exploded shape once 8 mm away from its neighbours
MARGIN = (fa('frame_mx', 0.04), fa('frame_my', 0.045))
# the menu's background (style.css .xv-bg) placed in the frame as on a phone: centre and radii in frame widths and
# heights, y up. The page draws the same gradient relative to the image (seq.json 'bg')
GRAD = {'cx': fa('g_cx', 0.5), 'cy': fa('g_cy', 0.512), 'rx': fa('g_rx', 0.52), 'ry': fa('g_ry', 0.70),
        'stops': [(0.0, '0e6a4c'), (0.62, '073b2d'), (1.0, '052b21')]}
DIM = 0.0015                               # the studio world (diffuse and glossy rays), as in lux_render.py
ICE_H = {'r0': 0.04, 'r1': 0.30, 'frost': 0.05, 'crack': 0.45, 'mist': 0.25}            # hero image (lux_render defaults)
ICE_X = {'r0': fa('ice_r0', 0.015), 'r1': fa('ice_r1', 0.10), 'frost': fa('ice_frost', 0.0),
         'crack': fa('crack_frost', 0.30), 'mist': fa('mist', 0.07)}                    # exploded view
TMP = tempfile.gettempdir()


# ------------------------------------------------------------------------------------------------ rigs
def snap(o):
    d = o.data
    return {'loc': o.location.copy(), 'rot': o.rotation_euler.to_quaternion(), 'size': d.size, 'size_y': d.size_y,
            'energy': d.energy, 'color': Vector(d.color)}

def record_hero():
    """Lights, cards and camera of the hero image (called by lux_render.py before lux_eclate.stage() re-aims them)."""
    ob = bpy.data.objects
    S['hl'] = {n: snap(ob[n]) for n in LIGHTS if n in ob}
    S['hfill'] = {n: (ob[n].location.copy(), ob[n].scale.copy()) for n in ('Fill-1', 'Fill+1') if n in ob}
    S['hcard'] = (ob['GlowCard'].location.copy(), ob['GlowCard'].scale.copy())
    S['hcam'] = {'tgt': Vector(R.tg), 'dist': R.dist, 'el': R.e, 'lens': R.cam.data.lens,
                 'fstop': R.cam.data.dof.aperture_fstop, 'focus': Vector(R.tg) + Vector((0, -0.012, 0))}
    S['hkick'] = Vector((-0.035, 0.0, 0.10))           # what the kicker aims at in lux_render.py (the orange)

def record_exploded():
    ob = bpy.data.objects
    bpy.context.view_layer.update()      # the label empties were just created: their world matrices are not evaluated yet
    S['xl'] = {n: snap(ob[n]) for n in LIGHTS if n in ob}
    S['xfill'] = {n: (ob[n].location.copy(), ob[n].scale.copy()) for n in ('Fill-1', 'Fill+1') if n in ob}
    S['xcam'] = dict(E.CAM_X); S['xcam']['focus'] = Vector((0, 0, E.CAM_X['tgt'].z))
    mn, mx = E.world_bounds([ob['Orange_Slice'], ob['Orange_Peel']]); S['xkick'] = (mn + mx) / 2
    S['labels'] = {e.name: e.matrix_world.copy() for e in bpy.data.collections['Labels'].objects}
    log('sequence: hero and exploded rigs recorded')


# ------------------------------------------------------------------------------------------------ geometry
def revolve_m(profile, seg, mats):
    """Surface of revolution with one material index per profile segment (as lux_geo.py)."""
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
                try: bm.faces.new(q).material_index = mats[k]
                except ValueError: pass
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-10)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return bm

def glass_profile(dz):
    """The glass of the hero image; the inner wall (material 1, removed) only where the liquid, raised by dz, touches it."""
    zs = set(); z = 0.0030
    while z < H - RIM - 1e-6: zs.add(round(z, 7)); z += 0.0015
    for a_, b_, st in ((0.0030, 0.0050, 0.0005), (0.0160, 0.0190, 0.0005), (0.0785, 0.0845, 0.0005)):
        z = a_
        while z <= b_ + 1e-9: zs.add(round(z, 7)); z += st
    zs = sorted(x for x in zs if 0.003 < x < H - RIM)
    outer = [(0, 0)] + E.arc(Ro - 0.003, 0.003, 0.003, 0.003, -90, 0, 8) + [(Ro, z_) for z_ in zs] \
        + E.arc(Ro - RIM, H - RIM, RIM, RIM, 0, 180, 18)                     # ends on the inner wall at H - RIM
    lo, hi = F + 0.004 + dz, min(ZM + dz, H - RIM)
    inner = [(Ri, z_) for z_ in sorted({hi, lo}, reverse=True) if F + 0.004 + 1e-7 < z_ < H - RIM - 1e-7]
    inner += [(Ri, F + 0.004)] + E.arc(Ri - 0.004, F + 0.004, 0.004, 0.004, 0, -90, 10)[1:] + [(0, F)]
    P = E.dedupe(E.dedupe(outer) + inner)
    mats = []
    for (r0, z0), (r1, z1) in zip(P, P[1:]):
        if abs(r0 - Ri) < 1e-9 and abs(r1 - Ri) < 1e-9 and z1 < z0:                      # inner wall
            mats.append(1 if hi > lo and z1 >= lo - 1e-9 and z0 <= hi + 1e-9 else 0)
        elif r0 < Ri + 1e-9 and r1 <= r0 + 1e-12 and max(z0, z1) <= F + 0.004 + 1e-9:     # inner corner and bottom
            mats.append(1 if dz <= 1e-9 else 0)
        else: mats.append(0)
    return P, mats

def glass_bm(dz):
    P, mats = glass_profile(dz)
    bm = revolve_m(P, SEG, mats); E.flutes(bm)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index == 1], context='FACES')
    for f in bm.faces: f.material_index = 0
    bm.normal_update(); E.sharpen(bm, 20)
    bmesh.ops.translate(bm, verts=bm.verts[:], vec=-S['glass_c'])
    return bm

def fill_profile(dz):
    """Full liquid volume (no ice), raised by dz. Materials: 0 = against the glass, 1 = against the air (like lux_geo)."""
    zw = H - RIM - dz                                           # top of the glass's inner wall, in liquid coordinates
    P = [(0, F)] + E.arc(Ri - 0.004, F + 0.004, 0.004, 0.004, -90, 0, 10)
    if F + 0.004 + 1e-7 < zw < ZM - 1e-7: P.append((Ri, zw))
    P += [(Ri, ZM)] + E.arc(Ri - 0.0025, ZM, 0.0025, 0.0015, 0, -90, 14) + [(0, L)]
    P = E.dedupe(P); mats = []
    for (r0, z0), (r1, z1) in zip(P, P[1:]):
        if max(z0, z1) <= F + 0.004 + 1e-9: mats.append(0 if dz <= 1e-9 else 1)          # bottom and corner
        elif abs(r0 - Ri) < 1e-9 and abs(r1 - Ri) < 1e-9: mats.append(0 if max(z0, z1) <= zw + 1e-9 else 1)
        else: mats.append(1)                                                              # meniscus and surface
    return [(r, z + dz) for r, z in P], mats

def new_mesh(name, bm, mats):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for m in mats: me.materials.append(m)
    return me

def drop_mesh(me):
    if me is not None and me.users == 0 and me.name.startswith('Seq_'): bpy.data.meshes.remove(me)

def boolean(ob, cutters):
    for c in cutters:
        m = ob.modifiers.new('b', 'BOOLEAN'); m.operation = 'DIFFERENCE'; m.solver = 'EXACT'; m.object = c
        m.material_mode = 'TRANSFER'
    bpy.context.view_layer.update()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(bpy.context.evaluated_depsgraph_get()))
    me.name = 'Seq_' + ob.name
    ob.modifiers.clear(); old = ob.data; ob.data = me; drop_mesh(old)
    return me

def world_pts(me_pts, M):
    m = np.array(M, np.float64)
    return me_pts @ m[:3, :3].T + m[:3, 3]

def mesh_pts(me, step=1):
    co = np.empty(len(me.vertices) * 3, np.float64); me.vertices.foreach_get('co', co)
    return co.reshape(-1, 3)[::step]

def bvh(me, M):
    me.calc_loop_triangles(); co = world_pts(mesh_pts(me), M)
    return BVHTree.FromPolygons([tuple(p) for p in co], [tuple(t.vertices) for t in me.loop_triangles])


class Path:
    """Rigid piece: its centre rises straight up until the piece is clear of the rim, then also drifts and turns to its
    place in the exploded view (one smooth ease vertically, a second one sideways once clear)."""
    def __init__(s, p0, q0, p1, q1, win, lift, c_local):
        if q0.dot(q1) < 0: q1 = -q1
        s.p0, s.q0, s.p1, s.q1, s.win, s.c = p0, q0, p1, q1, win, c_local
        dz = p1.z - p0.z; s.uc = 0.0
        if lift > 0 and dz > 0:
            lo, hi = 0.0, 1.0
            for _ in range(50):
                m = (lo + hi) / 2
                if dz * smoother(m) < lift: lo = m
                else: hi = m
            s.uc = min(hi, 0.95)
    def ease(s, t):
        a, b = s.win; u = min(1.0, max(0.0, (t - a) / (b - a)))
        return smoother(u), smoother((u - s.uc) / (1 - s.uc))
    def at(s, t):
        ez, exy = s.ease(t)
        p = Vector((lerp(s.p0.x, s.p1.x, exy), lerp(s.p0.y, s.p1.y, exy), lerp(s.p0.z, s.p1.z, ez)))
        return trs(p, s.q0.slerp(s.q1, exy)) @ Matrix.Translation(-s.c)


# ------------------------------------------------------------------------------------------------ studio pieces
def coll_of(name, objs):
    c = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    for o in objs:
        if o.name not in c.objects: c.objects.link(o)
    return c

def emission_strength_node(mat):
    em = next(n for n in mat.node_tree.nodes if n.type == 'EMISSION')
    return em.inputs['Strength'].links[0].from_node

def make_additive(mat):
    """Backlight cards add their light and let the ray go on to the background (else their dark edges, or the cards
    of other pieces, would show as black shapes in front of the green)."""
    nt = mat.node_tree
    em = next(n for n in nt.nodes if n.type == 'EMISSION')
    mx = next(n for n in nt.nodes if n.type == 'MIX_SHADER' and n.inputs[1].links and n.inputs[1].links[0].from_node == em)
    add = nt.nodes.new('ShaderNodeAddShader'); tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    nt.links.new(em.outputs[0], add.inputs[0]); nt.links.new(tr.outputs[0], add.inputs[1]); nt.links.new(add.outputs[0], mx.inputs[1])

def s2l(c): c = np.asarray(c, np.float64); return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def css_color(d):
    st = GRAD['stops']
    rgb = lambda h: np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)])
    for (p0, c0), (p1, c1) in zip(st, st[1:]):
        if d <= p1: return rgb(c0) + (rgb(c1) - rgb(c0)) * (d - p0) / (p1 - p0)
    return rgb(st[-1][1])

def build_world():
    w = bpy.context.scene.world; nt = w.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputWorld'); bg = nt.nodes.new('ShaderNodeBackground'); bg.inputs['Strength'].default_value = 1.0
    nt.links.new(bg.outputs[0], out.inputs['Surface'])
    def mm(op, a_, b_=None):
        n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = op
        for i_, x_ in enumerate((a_, b_)):
            if x_ is None: continue
            if isinstance(x_, bpy.types.NodeSocket): nt.links.new(x_, n_.inputs[i_])
            else: n_.inputs[i_].default_value = x_
        return n_.outputs[0]
    lp = nt.nodes.new('ShaderNodeLightPath')
    seen = mm('MAXIMUM', lp.outputs['Is Camera Ray'], lp.outputs['Is Transmission Ray'])
    tc = nt.nodes.new('ShaderNodeTexCoord'); sp = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Window'], sp.inputs[0])
    dx = mm('DIVIDE', mm('SUBTRACT', sp.outputs['X'], GRAD['cx']), GRAD['rx'])
    dy = mm('DIVIDE', mm('SUBTRACT', sp.outputs['Y'], GRAD['cy']), GRAD['ry'])
    d = mm('SQRT', mm('ADD', mm('MULTIPLY', dx, dx), mm('MULTIPLY', dy, dy)))
    # rays bent sideways or backwards (strong refraction) see the outer colour, not a mirrored window position
    geo = nt.nodes.new('ShaderNodeNewGeometry'); dot = nt.nodes.new('ShaderNodeVectorMath'); dot.operation = 'DOT_PRODUCT'
    nt.links.new(geo.outputs['Incoming'], dot.inputs[0]); S['world_dot'] = dot
    back = nt.nodes.new('ShaderNodeMapRange'); back.inputs['From Min'].default_value = 0.12; back.inputs['From Max'].default_value = 0.02
    nt.links.new(dot.outputs['Value'], back.inputs['Value'])
    rp = nt.nodes.new('ShaderNodeValToRGB'); nt.links.new(mm('MAXIMUM', d, back.outputs['Result']), rp.inputs['Fac'])
    els = rp.color_ramp.elements
    els[0].position = 0.0; els[1].position = 1.0
    for i in range(1, 16): els.new(i / 16)
    S['ramp'] = rp; S['ramp_d'] = [e.position for e in els]
    mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.clamp_factor = True
    sock = lambda col, name: next(x for x in col if x.name == name and x.enabled)
    nt.links.new(seen, sock(mix.inputs, 'Factor')); sock(mix.inputs, 'A').default_value = (DIM, DIM, DIM, 1)
    nt.links.new(rp.outputs['Color'], sock(mix.inputs, 'B')); nt.links.new(sock(mix.outputs, 'Result'), bg.inputs['Color'])
    try: w.cycles.sampling_method = 'NONE'          # the dim studio world is only met by bounces, as before
    except Exception: pass
    S['css'] = np.array([css_color(p) for p in S['ramp_d']])

def solve_world(w):
    """Scene-linear colours that the image grade at look weight w turns into the CSS colours of the gradient.
    AgX mixes the channels (a red input changes the green output), so the three channels are solved together:
    Levenberg-Marquardt in log space with a finite-difference Jacobian, all ramp stops in one batch."""
    key = round(w, 4)
    if S.get('world_key') == key: return
    S['world_key'] = key
    # continuation from the hero grade (w = 0, an easy solve) in small steps: a cold start under AgX can get stuck
    # where a channel is clipped to 0. Each chunk of the render gets the same colours whatever its first image.
    if 'world_x' not in S or abs(S.get('world_w', 0.0) - w) > 0.06:
        S.pop('world_x', None)
        for ww in np.linspace(0.0, w, int(math.ceil(w / 0.05)) + 1)[:-1]: _solve(float(ww))
    _solve(w)

def _solve(w):
    tgt = S['css']; k = len(tgt); h = 0.02
    u = np.log(S['world_x']) if 'world_x' in S else np.log(s2l(tgt) * 0.5 + 1e-5)
    lam = np.full(k, 1e-3)
    def ev(U):
        X = np.exp(U); P = np.stack([X] + [X * np.exp(h * np.eye(3)[c]) for c in range(3)])
        return display(P, w)
    D = ev(u); r = D[0] - tgt; err = np.abs(r).max(axis=1)
    for _ in range(int(A.get('solve_it', 60))):
        if err.max() * 255 < 0.05: break
        J = np.stack([(D[c + 1] - D[0]) / h for c in range(3)], axis=2)          # (k, out, in)
        JTJ = np.einsum('kic,kid->kcd', J, J); g = np.einsum('kic,ki->kc', J, r)
        dg = np.einsum('kcc->kc', JTJ)
        du = -np.linalg.solve(JTJ + lam[:, None, None] * np.eye(3) * (dg[:, None, :] + 1e-9), g[..., None])[..., 0]
        du = np.clip(du, -1.5, 1.5)
        Dn = ev(u + du); rn = Dn[0] - tgt; en = np.abs(rn).max(axis=1)
        ok = en < err
        u = np.where(ok[:, None], u + du, u); lam = np.where(ok, lam / 3, lam * 4).clip(1e-7, 1e6)
        D = np.where(ok[None, :, None], Dn, D); r = D[0] - tgt; err = np.minimum(err, en)
    x = np.exp(u); S['world_x'] = x; S['world_w'] = w
    for e, c in zip(S['ramp'].color_ramp.elements, x): e.color = (float(c[0]), float(c[1]), float(c[2]), 1.0)
    S['world_err'] = float(err.max() * 255)


# ------------------------------------------------------------------------------------------------ preparation
def prepare(n):
    S['n'] = n
    ob = bpy.data.objects; LY = E.LAYOUT; ROT0 = LY['rot0']; q0 = ROT0.to_quaternion(); ORIG = E.ORIG['mw']
    S['rot0'] = ROT0
    for nm in ('Glass', 'Liquid', 'Orange_Slice') + LIQS + ICES: ob[nm].animation_data_clear()
    sw = ob['Sweep']; sw.visible_camera = False; sw.visible_transmission = False      # no floor: the page is the background
    build_world()

    # glass: same object and origin; its mesh follows the liquid's contact
    S['glass_c'] = LY['glass_c']; ob['Glass'].matrix_world = ROT0 @ Matrix.Translation(S['glass_c'])
    S['glass_pts'] = mesh_pts(ob['Glass'].data, 7)                  # the closed glass, for framing
    S['glass_me0'] = ob['Glass'].data

    # cutters (not rendered): the liquid volume for the ice, each cube for the liquid
    cc = bpy.data.collections.new('SeqCutters'); bpy.context.scene.collection.children.link(cc)
    M_ = bpy.data.materials
    S['cut_fill'] = bpy.data.objects.new('Seq_CutFill', bpy.data.meshes.new('Seq_CutFill')); cc.objects.link(S['cut_fill'])
    S['cut_fill'].hide_render = True

    # ice: whole cubes with the hero image's origins (same frost and bump pattern as the hero image)
    S['ice'] = {}
    order = sorted(ICES, key=lambda k: -max(v.co.z for v in bpy.data.meshes[k + '_FullShell'].vertices))
    for k in ICES:
        full = bpy.data.meshes[k + '_FullShell']; O = ORIG[k].translation.copy()
        co = mesh_pts(full); c = Vector(((co.min(0) + co.max(0)) / 2).tolist())
        bm = bmesh.new(); bm.from_mesh(full)
        for f in bm.faces: f.material_index = 0; f.smooth = True
        bmesh.ops.translate(bm, verts=bm.verts[:], vec=-O)
        whole = bpy.data.meshes.new('Whole_' + k); bm.to_mesh(whole); bm.free(); whole.materials.append(M_['M_Ice'])
        cm = whole.copy(); cm.name = 'Cut_' + k; cm.materials.clear(); cm.materials.append(M_['M_LiqIce'])
        cut = bpy.data.objects.new('Seq_Cut_' + k, cm); cc.objects.link(cut); cut.hide_render = True
        loc1, rot1 = LY['place'][k]; i = order.index(k)
        path = Path(ROT0 @ c, q0, loc1.copy(), rot1.to_quaternion(), (T_ICE[i], T_ICE[i] + ICE_DUR),
                    (H + CLEAR['ice']) - co[:, 2].min(), c - O)
        S['ice'][k] = {'O': O, 'whole': whole, 'cut': cut, 'path': path, 'pts': mesh_pts(whole, 3), 'lo0': co[:, 2].min()}
        o = ob[k]; o.data = whole; o.matrix_world = ROT0 @ Matrix.Translation(O)
        inn = ob[k + '_Inner']; inn.parent = o; inn.matrix_parent_inverse = o.matrix_world.inverted()
        inn.matrix_basis = ROT0 @ ORIG[k + '_Inner']
    log('sequence: ice order (top first)', order, 'clear of the rim at u =', [round(S['ice'][k]['path'].uc, 3) for k in order])

    # orange wheel (peel follows): centre of slice + peel in the slice's own coordinates
    sl, pe = ob['Orange_Slice'], ob['Orange_Peel']
    Ms, Mp = ORIG['Orange_Slice'], ORIG['Orange_Peel']
    pts = np.vstack([mesh_pts(sl.data), world_pts(mesh_pts(pe.data), Ms.inverted() @ Mp)])
    c_o = Vector(((pts.min(0) + pts.max(0)) / 2).tolist())
    M0 = ROT0 @ Ms; loc1, rot1 = LY['place']['Orange_Slice']; M1 = trs(loc1, rot1.to_quaternion())
    lo0 = world_pts(pts, M0)[:, 2].min()
    S['or'] = Path(M0 @ c_o, M0.to_quaternion(), M1 @ c_o, rot1.to_quaternion(), T_OR, (H + CLEAR['orange']) - lo0, c_o)
    S['or_pts'] = pts[::5]; S['or_c'] = c_o; S['or_c0'] = S['or'].p0.copy()
    log('sequence: orange lowest point %.4f m, clear of the rim at u = %.3f' % (lo0, S['or'].uc))

    # liquid: one body (the hero image's liquid) until it has left the glass, then three slices
    S['slice'] = {}
    for k in LIQS:
        a, b = LY['ranges'][k]; cp = LY['cp'][k]; loc1, _ = LY['place'][k]
        vol = next(n for n in M_[E.LIQ_MAT[k]].node_tree.nodes if n.type == 'VOLUME_ABSORPTION')
        S['slice'][k] = {'a': a, 'b': b, 'cp': cp, 'final': loc1 - cp, 'seed': LY['seed'][k], 'base': E.liquid_profile(a, b),
                         'mat': M_[E.LIQ_MAT[k]], 'vol': vol, 'pts': mesh_pts(ob[k].data, 5), 'key': None}
    th = np.linspace(0, 2 * np.pi, 24, endpoint=False)
    S['body_ring'] = np.stack([Ri * np.cos(th), Ri * np.sin(th)], 1)

    # light: the strips stop lighting the liquid once it has left the glass (their two straight reflections on a
    # floating column read as acrylic; the exploded view does the same)
    # (the glint strip keeps lighting the hero liquid: its bright line on the surface)
    go = bpy.data.collections['GlassOnly']
    sg = coll_of('Recv_StripsGlass', [o for o in go.objects if o.name != 'Liquid'])
    rl = coll_of('Recv_LiquidStrips', [ob['Liquid']])
    for nm in ('StripL', 'StripR'):
        ob[nm].light_linking.receiver_collection = sg
        o = bpy.data.objects.new(nm + '_Liquid', ob[nm].data.copy()); bpy.data.collections['Studio'].objects.link(o)
        o.visible_camera = ob[nm].visible_camera; o.visible_glossy = ob[nm].visible_glossy
        o.light_linking.receiver_collection = rl
    # backlight cards: additive; the exploded view's cards light their own piece only, and follow it
    cards = ['GlowCard'] + [c for c in ('Back_VERMOUTH', 'Back_CAMPARI', 'Back_GIN', 'Back_ICE') if c in ob]
    E.card('Back_BODY', Vector((0, 0, (F + ZM) / 2 - 0.006)), 0.10, (ZM - F) + 0.014, 7.0, (1.0, 0.86, 0.70), 0.055)
    cards.append('Back_BODY')
    S['cards'] = {}
    for c in cards:
        make_additive(ob[c].active_material); nd = emission_strength_node(ob[c].active_material)
        S['cards'][c] = {'node': nd, 'base': nd.inputs[1].default_value, 'loc': ob[c].location.copy()}
    for k, piece in (('Back_VERMOUTH', 'Liquid_Vermouth'), ('Back_CAMPARI', 'Liquid_Campari'), ('Back_GIN', 'Liquid_Gin')):
        if k in ob: ob[k].light_linking.receiver_collection = coll_of('Recv_' + piece, [ob[piece]])
    if 'Back_ICE' in ob: ob['Back_ICE'].light_linking.receiver_collection = coll_of('Recv_Ice', [ob[k] for k in ICES])
    ob['Back_BODY'].light_linking.receiver_collection = coll_of('Recv_Body', [ob['Liquid']] + [ob[k] for k in LIQS])

    # ice materials (hero image -> exploded view)
    nt = M_['M_Ice'].node_tree
    S['ice_nodes'] = {'rr': next(n for n in nt.nodes if n.type == 'MAP_RANGE'), 'mx': next(n for n in nt.nodes if n.type == 'MIX_SHADER')}
    nt = M_['M_IceAir'].node_tree
    S['ice_nodes']['crack'] = next(n for n in nt.nodes if n.type == 'MIX_SHADER' and n.inputs[2].links and n.inputs[2].links[0].from_node.type == 'BSDF_TRANSLUCENT')
    S['ice_nodes']['mist'] = next(n for n in M_['M_IceMist'].node_tree.nodes if n.type == 'MAP_RANGE')

    # timeline: camera pull-back from the framing of every piece, then the label anchors at the final pose
    plan(n)
    pose_rigid(state(1.0))
    for name, mw in S['labels'].items():
        e = ob[name]; p = e.parent
        if p is None: continue
        bpy.context.view_layer.update()
        e.matrix_parent_inverse = p.matrix_world.inverted(); e.matrix_basis = mw
    bpy.context.view_layer.update()
    write_json()
    if A.get('seq_check', '0') == '1': check()


# ------------------------------------------------------------------------------------------------ timeline
def state(t):
    st = {'t': t, 'dz': RISE * ramp(t, *T_RISE), 'M': {}, 'wl': ramp(t, *T_LOOK)}
    st['M']['Orange_Slice'] = S['or'].at(t)
    for k in ICES: st['M'][k] = S['ice'][k]['path'].at(t)
    off, e = {}, {}
    for k in LIQS:
        e[k] = ramp(t, T_SPLIT0, T_SPLIT1[k])
        off[k] = Vector((0, 0, st['dz'])) + (S['slice'][k]['final'] - Vector((0, 0, RISE))) * e[k]
    g1 = off['Liquid_Campari'].z - off['Liquid_Vermouth'].z; g2 = off['Liquid_Gin'].z - off['Liquid_Campari'].z
    st['split'] = t >= T_SPLIT0 and min(g1, g2) >= 0.0002
    st['s'] = {'Liquid_Vermouth': min(1.0, g1 / MORPH_GAP), 'Liquid_Campari': min(1.0, min(g1, g2) / MORPH_GAP),
               'Liquid_Gin': min(1.0, g2 / MORPH_GAP)}
    st['off'], st['c'] = off, e
    st['ice_e'] = sum(S['ice'][k]['path'].ease(t)[0] for k in ICES) / 3
    st['dens'] = lerp(1.0, LIQ_DENS, ramp(t, *T_DENS))
    return st

def cam_at(wc):
    h, x = S['hcam'], S['xcam']
    tgt = h['tgt'].lerp(x['tgt'], wc); dist = lerp(h['dist'], x['dist'], wc); el = lerp(h['el'], x['el'], wc)
    loc = tgt + Vector((0, -dist * math.cos(el), dist * math.sin(el)))
    return loc, tgt, lerp(h['lens'], x['lens'], wc), lerp(h['fstop'], x['fstop'], wc), h['focus'].lerp(x['focus'], wc)

def project(pts, wc):
    loc, tgt, lens, _, _ = cam_at(wc); sc = bpy.context.scene
    fw = (tgt - loc).normalized(); rt = fw.cross(Vector((0, 0, 1))).normalized(); up = rt.cross(fw)
    d = pts - np.array(loc); z = d @ np.array(fw); x = d @ np.array(rt); y = d @ np.array(up)
    rx, ry = sc.render.resolution_x, sc.render.resolution_y
    thh = 18.0 / lens; thw = thh * rx / ry
    if rx > ry: thw = 18.0 / lens; thh = thw * ry / rx
    return np.stack([0.5 + 0.5 * x / (z * thw), 0.5 + 0.5 * y / (z * thh)], 1)

def content(st):
    """World points of the visible pieces (decimated), for framing and cropping."""
    out = [world_pts(S['glass_pts'], S['rot0'] @ Matrix.Translation(S['glass_c']))]
    out.append(world_pts(S['or_pts'], st['M']['Orange_Slice']))
    for k in ICES: out.append(world_pts(S['ice'][k]['pts'], st['M'][k]))
    if st['split']:
        for k in LIQS: out.append(world_pts(S['slice'][k]['pts'], Matrix.Translation(S['slice'][k]['cp'] + st['off'][k])))
    else:
        r = S['body_ring']; dz = st['dz']
        for z in (F + dz, ZM + dz): out.append(np.c_[r, np.full(len(r), z)])
    return np.vstack(out)

def plan(n):
    ts = [f / (n - 1) for f in range(n)]
    mx, my = MARGIN; raw = []
    for t in ts:
        pts = content(state(t))
        def fits(w):
            uv = project(pts, w)
            return uv[:, 0].min() >= mx and uv[:, 0].max() <= 1 - mx and uv[:, 1].min() >= my and uv[:, 1].max() <= 1 - my
        if fits(0.0): raw.append(0.0); continue
        lo, hi = 0.0, 1.0
        for _ in range(24):
            m = (lo + hi) / 2
            if fits(m): hi = m
            else: lo = m
        raw.append(hi)
    raw = np.array(raw); mono = np.maximum.accumulate(raw)
    def avg(a, k):
        p = np.pad(a, (k, k), mode='edge'); return np.convolve(p, np.ones(2 * k + 1) / (2 * k + 1), 'valid')
    ahead = np.array([mono[i:i + 4].max() for i in range(n)])
    wc = np.maximum(avg(ahead, 2), mono); wc = np.maximum(avg(wc, 2), mono)
    floor = np.array([smoother((t - 0.55) / 0.45) for t in ts])
    wc = np.maximum.accumulate(np.clip(np.maximum(wc, floor), 0, 1)); wc[0] = 0.0; wc[-1] = 1.0
    S['wc'] = wc.tolist(); S['wl'] = [ramp(t, *T_LOOK) for t in ts]
    log('sequence: camera pull-back', ' '.join('%.2f' % x for x in wc[::6]))

def write_json():
    n = S['n']; ob = bpy.data.objects; frames = []
    labels = {e.name[6:]: e for e in bpy.data.collections['Labels'].objects}
    for f in range(n):
        st = state(f / (n - 1)); pose_rigid(st); bpy.context.view_layer.update(); wc = S['wc'][f]
        uv = project(content(st), wc)
        box = [float(uv[:, 0].min()), float(1 - uv[:, 1].max()), float(uv[:, 0].max()), float(1 - uv[:, 1].min())]
        an = {}
        for key, e in labels.items():
            p = project(np.array([e.matrix_world.translation]), wc)[0]; an[key] = [round(float(p[0]), 5), round(float(1 - p[1]), 5)]
        if A.get('seq_debug') and f in (0, n - 1):
            for key, e in labels.items(): log('label', key, f, e.parent.name if e.parent else None, tuple(round(v, 4) for v in e.matrix_world.translation), an[key])
        frames.append({'wc': round(wc, 4), 'wl': round(S['wl'][f], 4), 'box': [round(v, 5) for v in box], 'a': an})
    gl = project(world_pts(S['glass_pts'], S['rot0'] @ Matrix.Translation(S['glass_c'])), 0.0)
    sc = bpy.context.scene
    data = {'n': n, 'size': [sc.render.resolution_x, sc.render.resolution_y], 'frames': frames,
            'glass0': [round(float(gl[:, 0].min()), 5), round(float(1 - gl[:, 1].max()), 5), round(float(gl[:, 0].max()), 5), round(float(1 - gl[:, 1].min()), 5)],
            'bg': {k: GRAD[k] for k in ('cx', 'cy', 'rx', 'ry')}, 'stops': [['#' + c, p] for p, c in GRAD['stops']],
            'timeline': {'orange': T_OR, 'ice': [T_ICE, ICE_DUR], 'rise': T_RISE, 'split': [T_SPLIT0, T_SPLIT1], 'look': T_LOOK}}
    if 'outdir' in A: json.dump(data, open(os.path.join(A['outdir'], 'eclate_seq.seq.json'), 'w'), indent=1)
    log('sequence: frame boxes and label anchors written')

def check():
    """Design check (seq_check=1): no piece goes through another, no cube goes back into the liquid."""
    n = S['n']; ob = bpy.data.objects
    g = bvh(S['glass_me0'], S['rot0'] @ Matrix.Translation(S['glass_c']))
    orm = [ob['Orange_Slice'].data, ob['Orange_Peel'].data]
    bad = []; depth = {k: [] for k in ICES}
    for f in range(n):
        t = f / (n - 1); st = state(t); pose_rigid(st); bpy.context.view_layer.update()
        T = {k: bvh(S['ice'][k]['whole'], st['M'][k]) for k in ICES}
        T['orange'] = bvh(orm[0], ob['Orange_Slice'].matrix_world)
        T['peel'] = bvh(orm[1], ob['Orange_Peel'].matrix_world)
        names = list(T)
        for i in range(len(names)):
            if f > 0 and names[i] in ('orange', 'peel') or names[i] in ICES:
                if T[names[i]].overlap(g): bad.append((f, names[i], 'glass'))
            for j in range(i + 1, len(names)):
                if {names[i], names[j]} == {'orange', 'peel'}: continue
                if T[names[i]].overlap(T[names[j]]): bad.append((f, names[i], names[j]))
        for k in ICES:
            zlo = world_pts(S['ice'][k]['pts'], st['M'][k])[:, 2].min(); depth[k].append((ZM + st['dz']) - zlo)
    back = [(k, f) for k in ICES for f in range(1, n) if depth[k][f] > 0 and depth[k][f] > depth[k][f - 1] + 1e-5]
    log('sequence check: contacts', bad[:30], '... %d in all' % len(bad) if len(bad) > 30 else '')
    log('sequence check: cubes going back into the liquid', back[:20])


# ------------------------------------------------------------------------------------------------ one image
def pose_rigid(st):
    ob = bpy.data.objects
    for nm, M in st['M'].items(): ob[nm].matrix_world = M
    for k in LIQS: ob[k].matrix_world = Matrix.Translation(S['slice'][k]['cp'] + st['off'][k])
    for k in ICES: S['ice'][k]['cut'].matrix_world = st['M'][k]

def set_glass(dz):
    key = round(dz, 8)
    if S.get('glass_key') == key: return
    S['glass_key'] = key
    g = bpy.data.objects['Glass']; old = g.data
    g.data = new_mesh('Seq_Glass', glass_bm(dz), [bpy.data.materials['M_Glass']]); drop_mesh(old)

def set_liquid_and_ice(st):
    ob = bpy.data.objects; dz = st['dz']; ROT0 = S['rot0']
    key = (round(dz, 8),) + tuple(round(x, 7) for k in ICES for row in st['M'][k] for x in row)
    if S.get('geo_key') == key: return
    S['geo_key'] = key
    M_ = bpy.data.materials
    prof, mats = fill_profile(dz)
    bm = revolve_m(prof, SEG, mats)                 # flat faces, like the hero image's liquid
    fill = new_mesh('Seq_Fill', bm, [M_['M_LiqGlass'], M_['M_LiqAir'], M_['M_LiqIce']])
    cut = S['cut_fill']; old = cut.data; cm = fill.copy(); cm.name = 'Seq_CutFill'; cm.materials.clear(); cm.materials.append(E.mat('M_Cap'))
    cut.data = cm; drop_mesh(old); cut.matrix_world = ROT0
    tf = bvh(fill, ROT0); inside = []
    inv = ROT0.inverted()
    for k in ICES:
        d = S['ice'][k]; c = inv @ (st['M'][k] @ d['path'].c)
        cont = math.hypot(c.x, c.y) < Ri and F + dz < c.z < L + dz
        if cont or bvh(d['whole'], st['M'][k]).overlap(tf): inside.append(k)
    liq = ob['Liquid']; old = liq.data; liq.data = fill; liq.matrix_world = ROT0
    if old is not S.get('liq_me0'): drop_mesh(old)
    if inside: boolean(liq, [S['ice'][k]['cut'] for k in inside])
    for k in ICES:
        o = ob[k]; old = o.data; o.data = S['ice'][k]['whole']
        if old is not S['ice'][k]['whole']: drop_mesh(old)
        if k in inside:
            me = boolean(o, [cut]); cap = [i for i, m in enumerate(me.materials) if m and m.name == 'M_Cap']
            b = bmesh.new(); b.from_mesh(me)
            bmesh.ops.delete(b, geom=[f for f in b.faces if f.material_index in cap], context='FACES'); b.to_mesh(me); b.free()
    S['inside'] = inside

def set_liquid_density(m):
    if 'liq_vols' not in S:
        S['liq_vols'] = []
        for nm in ('M_LiqGlass', 'M_LiqAir', 'M_LiqIce', 'M_LiqSlabCut'):
            mat = bpy.data.materials.get(nm)
            if not mat: continue
            for n_ in mat.node_tree.nodes:
                if n_.type == 'VOLUME_ABSORPTION': S['liq_vols'].append((n_, n_.inputs['Density'].default_value))
    for n_, d0 in S['liq_vols']: n_.inputs['Density'].default_value = d0 * m

def set_slices(st):
    ob = bpy.data.objects; SIG = R.SIG
    for k in LIQS:
        d = S['slice'][k]; o = ob[k]; s = st['s'][k]; key = round(s, 5)
        if d['key'] != key:
            bm = E.puck_bm(d['a'], d['b'], d['seed'], s, d['base'])
            bmesh.ops.translate(bm, verts=bm.verts[:], vec=-d['cp'])
            old = o.data; o.data = new_mesh('Seq_' + k, bm, [d['mat']]); drop_mesh(old); d['key'] = key
        c = st['c'][k]; sig = [lerp(a * st['dens'], b, c) for a, b in zip(SIG, E.SIGMA[k])]; m = max(max(sig), 1e-6)
        d['vol'].inputs['Color'].default_value = (1 - sig[0] / m, 1 - sig[1] / m, 1 - sig[2] / m, 1)
        d['vol'].inputs['Density'].default_value = m

def set_cards(st):
    ob = bpy.data.objects; dz = st['dz']; C = S['cards']
    # the hero image's glow card rises with the liquid; its lower edge is cut back as the glass empties below it
    gc = ob['GlowCard']; loc, scl = S['hcard']; crop = 0.012 * E.ss(0.0, 0.004, dz)
    gc.location = loc + Vector((0, 0, dz + crop / 2)); gc.scale = (scl.x, scl.y - crop, 1)
    k_u = 1 - E.ss(0.045, 0.066, dz)
    C['GlowCard']['node'].inputs[1].default_value = C['GlowCard']['base'] * k_u; gc.hide_render = k_u <= 0
    c_avg = sum(st['c'].values()) / 3
    bb = ob['Back_BODY']; body = Vector((0, 0, (F + ZM) / 2 + dz)) if not st['split'] else S['slice']['Liquid_Campari']['cp'] + st['off']['Liquid_Campari']
    bb.location = body + Vector((0, 0.055, -0.006))
    C['Back_BODY']['node'].inputs[1].default_value = C['Back_BODY']['base'] * (1 - k_u) * (1 - c_avg)
    for card, k in (('Back_VERMOUTH', 'Liquid_Vermouth'), ('Back_CAMPARI', 'Liquid_Campari'), ('Back_GIN', 'Liquid_Gin')):
        if card not in C: continue
        d = S['slice'][k]; ob[card].location = C[card]['loc'] + (st['off'][k] - d['final'])
        C[card]['node'].inputs[1].default_value = C[card]['base'] * st['c'][k]
    if 'Back_ICE' in C: C['Back_ICE']['node'].inputs[1].default_value = C['Back_ICE']['base'] * st['ice_e']

def set_lights(st, wl):
    ob = bpy.data.objects
    oc = st['M']['Orange_Slice'] @ S['or_c']
    for nm in LIGHTS:
        if nm not in S['hl']: continue
        h, x = S['hl'][nm], S['xl'][nm]; o = ob[nm]; d = o.data
        if nm == 'Kicker':            # follows the orange; exactly the hero image's kicker at the start
            o.location = oc + (h['loc'] - S['or_c0']).lerp(x['loc'] - S['xkick'], wl)
            aim_ = oc + (S['hkick'] - S['or_c0']) * (1 - wl)
            o.rotation_euler = (aim_ - o.location).to_track_quat('-Z', 'Y').to_euler()
        else:
            o.location = h['loc'].lerp(x['loc'], wl); o.rotation_euler = h['rot'].slerp(x['rot'], wl).to_euler()
        d.size = lerp(h['size'], x['size'], wl); d.size_y = lerp(h['size_y'], x['size_y'], wl)
        d.energy = lerp(h['energy'], x['energy'], wl); d.color = h['color'].lerp(x['color'], wl)
    fade = 1 - smoother(st['dz'] / 0.02)
    for nm in ('StripL', 'StripR'):
        o, src = ob[nm + '_Liquid'], ob[nm]
        o.matrix_world = src.matrix_world.copy(); o.data.size, o.data.size_y = src.data.size, src.data.size_y
        o.data.color = src.data.color; o.data.energy = src.data.energy * fade; o.hide_render = fade <= 0
    for nm, (hl, hs) in S['hfill'].items():
        xl, xs = S['xfill'][nm]; ob[nm].location = hl.lerp(xl, wl); ob[nm].scale = hs.lerp(xs, wl)

def set_camera(wc):
    loc, tgt, lens, fst, focus = cam_at(wc); cam = R.cam
    cam.location = loc; cam.rotation_euler = (tgt - loc).to_track_quat('-Z', 'Y').to_euler(); cam.data.lens = lens
    cam.data.dof.aperture_fstop = fst; cam.data.dof.focus_distance = (focus - loc).length
    S['world_dot'].inputs[1].default_value = tuple(-(tgt - loc).normalized())

def set_ice_look(wl):
    v = {k: lerp(ICE_H[k], ICE_X[k], wl) for k in ICE_H}; n = S['ice_nodes']
    n['rr'].inputs['To Min'].default_value = v['r0']; n['rr'].inputs['To Max'].default_value = v['r1']
    n['mx'].inputs['Fac'].default_value = v['frost']; n['crack'].inputs['Fac'].default_value = v['crack']
    n['mist'].inputs['To Max'].default_value = v['mist']

def pose(f):
    """Sets image f of the sequence; returns its look weight (for the grade)."""
    n = S['n']; t = f / (n - 1); st = state(t); wl, wc = S['wl'][f], S['wc'][f]
    ob = bpy.data.objects
    if 'liq_me0' not in S: S['liq_me0'] = ob['Liquid'].data
    pose_rigid(st); bpy.context.view_layer.update()
    set_glass(st['dz']); set_liquid_and_ice(st); set_liquid_density(st['dens'])
    ob['Liquid'].hide_render = st['split']
    for k in LIQS: ob[k].hide_render = not st['split']
    if st['split']: set_slices(st)
    set_cards(st); set_lights(st, wl); set_camera(wc); set_ice_look(wl); solve_world(wl)
    bpy.context.view_layer.update()
    log('sequence image %d: t %.3f, liquid raised %.1f mm, %s, cubes in the liquid %s, camera %.3f, look %.3f, background error %.2f/255'
        % (f, t, st['dz'] * 1000, 'split' if st['split'] else 'one body', S.get('inside'), wc, wl, S.get('world_err', 0)))
    return wl


# ------------------------------------------------------------------------------------------------ grade
def hero_disp(x):
    """The hero image's grade (lux_render.grade) without its vignette, top shade and grain: ACES-like curve, sRGB,
    saturation 0.94."""
    x = np.maximum(x, 0); t = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14)
    sr = np.where(t <= 0.0031308, 12.92 * t, 1.055 * np.power(np.clip(t, 0, 1), 1 / 2.4) - 0.055)
    l_ = (sr * np.array([0.2126, 0.7152, 0.0722])).sum(axis=-1, keepdims=True)
    return l_ + 0.94 * (sr - l_)

def agx_disp(rgb):
    """Blender's AgX view transform with the exploded view's look (display-referred values)."""
    h_, w_ = rgb.shape[:2]; sc = bpy.context.scene
    im = bpy.data.images.new('seq_agx', w_, h_, float_buffer=True, alpha=True)
    px = np.ones((h_, w_, 4), np.float32); px[..., :3] = rgb; im.pixels.foreach_set(px.ravel())
    vs = sc.view_settings; old = (vs.view_transform, vs.look, vs.exposure)
    vs.view_transform = 'AgX'; vs.look = A.get('look', E.LOOK); vs.exposure = 0.0
    fm = sc.render.image_settings; oldf = (fm.file_format, fm.color_depth, fm.color_mode)
    fm.file_format = 'PNG'; fm.color_depth = '16'; fm.color_mode = 'RGB'
    p = os.path.join(TMP, 'seq_agx_%d.png' % os.getpid()); im.save_render(p, scene=sc); bpy.data.images.remove(im)
    fm.file_format, fm.color_depth, fm.color_mode = oldf; vs.view_transform, vs.look, vs.exposure = old
    t = bpy.data.images.load(p); t.colorspace_settings.name = 'Non-Color'
    d = np.empty(w_ * h_ * 4, np.float32); t.pixels.foreach_get(d); bpy.data.images.remove(t); os.remove(p)
    return d.reshape(h_, w_, 4)[..., :3].astype(np.float64)

def display(x, w):
    x = np.asarray(x, np.float64)
    if w <= 0: return hero_disp(x)
    if w >= 1: return agx_disp(x)
    return (1 - w) * hero_disp(x) + w * agx_disp(x)

def grade(exr, png, w):
    """Linear EXR -> soft bloom -> hero grade / AgX blended by the look weight -> 8-bit PNG (no vignette or grain:
    the background must stay the page's exact colours)."""
    im = bpy.data.images.load(exr); w_, h_ = im.size
    arr = np.empty(w_ * h_ * 4, np.float32); im.pixels.foreach_get(arr); bpy.data.images.remove(im)
    P = arr.reshape(h_, w_, 4)[::-1, :, :3].astype(np.float64)
    s = h_ / 1350.0; lum = P.max(axis=2, keepdims=True)
    hi = (P * np.clip((lum - float(A.get('bthr', 1.5))) / 2.0, 0, 1)).astype(np.float32)
    bloom = 0.55 * R.blur(hi, 2.5 * s) + 0.30 * R.blur(hi, 9 * s) + 0.15 * R.blur(hi, 28 * s)
    P = P + lerp(0.04, 0.03, w) * bloom
    D = display(P, w)
    from PIL import Image
    Image.fromarray((np.clip(D, 0, 1) * 255 + 0.5).astype(np.uint8)).save(png)
