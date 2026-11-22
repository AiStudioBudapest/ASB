# Orange slice textures for the pre-rendered (Cycles) Negroni: albedo, height, masks.
# Polar procedural: 10 irregular segments, curved membranes, log-polar Worley juice vesicles,
# rounded segment ends, pith ring, zest band with oil glands.
import numpy as np, sys, os
from PIL import Image, ImageFilter

OUT = sys.argv[1] if len(sys.argv) > 1 else '/mnt/project-files/negroni-3d/lux/'
N = int(sys.argv[2]) if len(sys.argv) > 2 else 4096
os.makedirs(OUT, exist_ok=True)
SPAN = 0.068
RS, R_RIND, R_PITH, R_CORE = 0.0330, 0.0309, 0.0298, 0.0024
rng = np.random.default_rng(7)
f32 = np.float32

u = ((np.arange(N, dtype=f32) + 0.5) / N - 0.5) * SPAN
X, Y = np.meshgrid(u, u)
R = np.hypot(X, Y).astype(f32) + f32(1e-7)
TH = (np.arctan2(Y, X) % (2 * np.pi)).astype(f32)
TWO_PI = f32(2 * np.pi)

def ss(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t)

def vnoise(shape_lo, seed, size):
    """smooth value noise upsampled to N x N"""
    g = np.random.default_rng(seed).random(shape_lo).astype(f32)
    im = Image.fromarray((g * 65535).astype(np.uint16), ).resize((size, size), Image.BICUBIC)
    a = np.asarray(im).astype(f32) / 65535
    return (a - a.mean()) / (a.std() + 1e-6)

lo1 = vnoise((24, 24), 1, N); lo2 = vnoise((70, 70), 2, N); lo3 = vnoise((200, 200), 3, N)

# ---------------- segments (curved boundaries)
NSEG = 10
base = np.sort((np.arange(NSEG) * 2 * np.pi / NSEG + rng.normal(0, 0.055, NSEG)) % (2 * np.pi))
phase = rng.uniform(0, 2 * np.pi, NSEG); swirl = rng.normal(0, 0.05, NSEG)
best_prev = np.full(R.shape, 10, f32); sid = np.zeros(R.shape, np.int16); best_next = np.full(R.shape, 10, f32)
for k in range(NSEG):
    bk = (base[k] + 0.030 * np.sin(2 * np.pi * R / 0.019 + phase[k]) + swirl[k] * (R / R_PITH) ** 2).astype(f32)
    d = (TH - bk) % TWO_PI                     # angle since this boundary (ccw)
    upd = d < best_prev; best_prev = np.where(upd, d, best_prev); sid = np.where(upd, k, sid)
    best_next = np.minimum(best_next, (TWO_PI - d) % TWO_PI)
frac = best_prev / (best_prev + best_next + 1e-6)       # 0..1 across the segment
d_arc = np.minimum(best_prev, best_next) * R             # metres to the nearest membrane
wm = (0.000060 + 0.00013 * (1 - np.clip(R / R_PITH, 0, 1)) ** 1.5) * (1 + 0.30 * lo2)
memb = ss(wm + 0.00007, wm - 0.00001, d_arc)            # 1 on membranes

# rounded outer ends of the segments, wavy pith boundary
seg_end = R_PITH - 0.00075 * (1 - np.sin(np.pi * np.clip(frac, 0, 1)) ** 0.6) + 0.00010 * lo2
core_r = R_CORE * (1 + 0.18 * lo2) + 0.0008 * ss(0.0009, 0.0, d_arc) * ss(0.0065, 0.0025, R)  # star lobes along membranes
pulp = (R > core_r) & (R < seg_end)
pith = (R >= seg_end) & (R < R_RIND + 0.00008 * lo2)
rind = (R >= R_RIND + 0.00008 * lo2) & (R <= RS)
core = R <= core_r

# ---------------- vesicles: log-polar Worley (cells radially elongated, aspect ~3.5)
NT = 150; K = 6.4
a = TH * f32(NT / (2 * np.pi)); b = (np.log(np.maximum(R, 0.0008) / 0.004) * K).astype(f32)
TABLE = rng.random((1 << 20, 3)).astype(f32)
def h(ia, ib): return ((ia.astype(np.int64) % NT) * 73856093 ^ (ib.astype(np.int64) + 1000) * 19349663) & ((1 << 20) - 1)
ia0 = np.floor(a).astype(np.int32); ib0 = np.floor(b).astype(np.int32)
F1 = np.full(R.shape, 1e9, f32); F2 = np.full(R.shape, 1e9, f32); cid = np.zeros(R.shape, np.int64)
wt = TWO_PI * R / NT; wr = R / K                      # metres per unit along a and b
OFF = rng.random(NT).astype(f32)                          # per-column radial phase: no concentric rows
for di in (-1, 0, 1):
    ia = ia0 + di; off = OFF[ia % NT]; ibc = np.floor(b - off).astype(np.int32)
    for dj in (-1, 0, 1):
        ib = ibc + dj; hh = h(ia, ib); jt = TABLE[hh]
        dx = a - (ia + 0.1 + 0.8 * jt[..., 0]); dy = b - (ib + off + 0.1 + 0.8 * jt[..., 1])
        dd = np.sqrt(dx * dx + dy * dy)
        closer = dd < F1
        F2 = np.where(closer, F1, np.minimum(F2, dd)); F1 = np.where(closer, dd, F1); cid = np.where(closer, hh, cid)
del dx, dy, dd, closer
edge = np.clip((F2 - F1) / 0.55, 0, 1)                    # 0 on vesicle walls, ~1 at centres (cell units)
dome = np.sqrt(edge)
cr = TABLE[(cid * 7 + 3) & ((1 << 20) - 1)]

# ---------------- colours (linear)
col = np.zeros(R.shape + (3,), f32)
# pulp
pb = np.stack([0.78 + 0 * R, 0.235 + 0 * R, 0.014 + 0 * R], -1)
var = (0.88 + 0.20 * cr[..., 0])[..., None]
pb = pb * var
pb[..., 1] *= (0.92 + 0.16 * cr[..., 1])
shade = (0.64 + 0.46 * dome)[..., None] * (0.74 + 0.26 * ss(0.0, 0.3, edge))[..., None]
pulp_col = pb * shade
wall = ss(0.10, 0.0, edge)[..., None] * 0.22                 # thin translucent vesicle walls, slightly lighter
pulp_col = pulp_col * (1 - wall) + np.array([0.86, 0.50, 0.15], f32) * wall
pale = ss(0.0075, 0.0035, R)[..., None]                    # paler, yellower near the centre
pulp_col = pulp_col * (1 - 0.35 * pale) + np.array([0.70, 0.42, 0.10], f32) * 0.35 * pale
near_m = ss(0.00045, 0.0001, d_arc)[..., None]             # paler next to membranes
pulp_col = pulp_col * (1 - 0.25 * near_m) + np.array([0.82, 0.55, 0.20], f32) * 0.25 * near_m
# membranes / core / pith
cream = np.stack([0.74 + 0.02 * lo2, 0.63 + 0.02 * lo2, 0.40 + 0.03 * lo2], -1)
memb_col = np.array([0.80, 0.56, 0.26], f32) * (1 + 0.03 * lo2[..., None])
fib = vnoise((N // 64, 12), 4, N)
pith_t = np.clip((R - seg_end) / (R_RIND - seg_end + 1e-6), 0, 1)[..., None]
pith_col = cream * (0.97 + 0.03 * fib[..., None]) * (1 - 0.25 * pith_t) + np.array([0.86, 0.55, 0.12], f32) * 0.25 * pith_t
# zest band with oil glands and darker outer skin
glands = np.clip((vnoise((900, 900), 5, N) - 1.7) * 2.0, 0, 1)
zt = np.clip((R - R_RIND) / (RS - R_RIND), 0, 1)[..., None]
rind_col = np.array([0.74, 0.23, 0.013], f32) * (1 + 0.06 * lo3[..., None]) * (1 - 0.30 * zt ** 3)
rind_col = rind_col * (1 - 0.28 * glands[..., None]) + np.array([0.80, 0.42, 0.04], f32) * 0.10 * glands[..., None]

col[:] = pith_col
col = np.where(pulp[..., None], pulp_col, col)
col = np.where(rind[..., None], rind_col, col)
col = np.where(core[..., None], cream * 0.95, col)
m = (memb * (R < seg_end) * (R > core_r * 0.7))[..., None]
col = col * (1 - m) + memb_col * m
col = np.where((R > RS)[..., None], np.array([0.74, 0.23, 0.013], f32), col)

# ---------------- height (0..1, 0.5 = reference plane)
hgt = np.full(R.shape, 0.70, f32)
hgt = np.where(pulp, 0.34 + 0.24 * dome + 0.02 * lo3, hgt)
hgt = np.where(rind, 0.74 - 0.05 * glands, hgt)
hgt = np.where(core, 0.60, hgt)
hgt = hgt * (1 - m[..., 0]) + 0.64 * m[..., 0]
hgt = np.where(R > RS, 0.74, hgt)

# ---------------- masks: R = pulp, G = pith/membrane/core, B = zest
mk = np.zeros(R.shape + (3,), f32)
mk[..., 0] = pulp * (1 - m[..., 0]); mk[..., 2] = rind | (R > RS); mk[..., 1] = np.clip(1 - mk[..., 0] - mk[..., 2], 0, 1)

def save_srgb(arr, name):
    s = np.where(arr <= 0.0031308, arr * 12.92, 1.055 * np.power(np.clip(arr, 0, 1), 1 / 2.4) - 0.055)
    Image.fromarray(np.flipud((np.clip(s, 0, 1) * 255 + 0.5).astype(np.uint8))).filter(ImageFilter.GaussianBlur(0.6)).save(OUT + name)
save_srgb(col, 'slice_albedo.png')
hb = Image.fromarray(np.flipud((np.clip(hgt, 0, 1) * 65535).astype(np.uint16)), )
hb.save(OUT + 'slice_height.png')
Image.fromarray(np.flipud((mk * 255 + 0.5).astype(np.uint8))).filter(ImageFilter.GaussianBlur(0.8)).save(OUT + 'slice_masks.png')
print('textures ok', N)
