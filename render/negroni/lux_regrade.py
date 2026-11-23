# Re-grade an exploded-view EXR (AgX look, bloom, vignette) without re-rendering.
#   python3 lux_regrade.py -- exr=path/render.exr png=path/out.png look='AgX - Base Contrast' expo=1.0
import sys, time
import numpy as np
import bpy  # noqa: F401  (lux_eclate needs it)
A = dict(a.split('=', 1) for a in sys.argv[sys.argv.index('--') + 1:]) if '--' in sys.argv else {}
t0 = time.time()
def log(*a): print('[%6.1fs]' % (time.time() - t0), *a, flush=True)
def box1d(a, r, axis):
    pad = [(0, 0)] * a.ndim; pad[axis] = (r + 1, r)
    c = np.cumsum(np.pad(a, pad, mode='edge'), axis=axis, dtype=np.float64); n = a.shape[axis]
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis); lo = np.take(c, np.arange(0, n), axis=axis)
    return ((hi - lo) / (2 * r + 1)).astype(np.float32)
def blur(a, sigma):
    r = max(1, int(round(sigma)))
    for _ in range(3): a = box1d(box1d(a, r, 0), r, 1)
    return a
import lux_eclate
lux_eclate.grade_agx(A['exr'], A['png'])
log('graded', A['png'])
