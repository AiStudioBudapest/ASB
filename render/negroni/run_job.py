# Runs one chunk of the render job described in job.json (called by the GitHub workflow).
# The first chunks each take one still (stills are heavy); the remaining chunks share the turntable frames.
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
job = json.load(open(os.path.join(HERE, 'job.json')))
k = int(sys.argv[1]); n = int(job['chunks'])
out = os.path.abspath('render-out'); os.makedirs(out, exist_ok=True)
common = job.get('common', {})
tt = job.get('turntable')
stills = job.get('stills', [])
nframes = int(tt['nframes']) if tt else 0
n_still = min(len(stills), n - 1) if nframes else n      # keep at least one chunk for the frames
mine_stills = stills[k::n_still] if k < n_still else []
mine_frames = []
if nframes and k >= n_still:
    m = n - n_still; j = k - n_still                     # balanced split: every frame chunk gets 7 or 8 frames
    mine_frames = list(range(j * nframes // m, (j + 1) * nframes // m))

# the orange-slice textures are procedural and seeded: rebuild them here instead of storing 25 MB in git
if not os.path.exists(os.path.join(HERE, 'slice_albedo.png')):
    subprocess.run([sys.executable, os.path.join(HERE, 'lux_tex.py'), HERE + '/', str(job.get('tex_res', 4096))], check=True)
base = [sys.executable, os.path.join(HERE, 'lux_render.py'), '--', 'blend=' + os.path.join(HERE, 'lux-geometry.blend'), 'tex=' + HERE + '/']
def kv(d): return ['%s=%s' % (a, b) for a, b in d.items()]
if mine_frames:
    opts = dict(common); opts.update(tt.get('opts', {}))
    opts.update({'frames': '%d-%d' % (mine_frames[0], mine_frames[-1]), 'nframes': nframes, 'outdir': out})
    print('chunk', k, 'frames', mine_frames[0], mine_frames[-1], flush=True)
    subprocess.run(base + kv(opts), check=True)
for s in mine_stills:
    opts = dict(common); opts.update({a: b for a, b in s.items() if a != 'name'}); opts['out'] = os.path.join(out, s['name'])
    print('chunk', k, 'still', s['name'], flush=True)
    subprocess.run(base + kv(opts), check=True)
print('chunk', k, 'done', flush=True)
