# Runs one chunk of the render job described in job.json (called by the GitHub workflow).
# The first chunks each take one still (stills are heavy); the remaining chunks share the turntable frames.
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
job = json.load(open(os.path.join(HERE, 'job.json')))
k = int(sys.argv[1]); n = int(job['chunks'])
out = os.path.abspath('render-out'); os.makedirs(out, exist_ok=True)
common = job.get('common', {})
tt = job.get('turntable')
seq = job.get('eclate_seq')                              # explode sequence of the exploded view (for the site)
stills = job.get('stills', [])
nframes = int(tt['nframes']) if tt else 0
nseq = int(seq['nframes']) if seq else 0
total = nframes + nseq                                   # frame tasks: turntable frames, then sequence frames
n_still = min(len(stills), n - 1) if total else n        # keep at least one chunk for the frames
mine_stills = stills[k::n_still] if k < n_still else []
mine_frames, mine_seq = [], []
if total and k >= n_still:
    m = n - n_still; j = k - n_still                     # balanced split of all frame tasks over the frame chunks
    tasks = range(j * total // m, (j + 1) * total // m)
    mine_frames = [i for i in tasks if i < nframes]
    mine_seq = [i - nframes for i in tasks if i >= nframes]

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
if mine_seq:
    opts = dict(common); opts.update(seq.get('opts', {})); opts['mode'] = 'eclate'
    opts.update({'seq': '%d-%d' % (mine_seq[0], mine_seq[-1]), 'nseq': nseq, 'outdir': out})
    print('chunk', k, 'sequence frames', mine_seq[0], mine_seq[-1], flush=True)
    subprocess.run(base + kv(opts), check=True)
if seq and seq.get('assembled') and k == n - 1:          # image 0 of the sequence: the assembled cocktail
    opts = dict(common); opts.update(seq.get('opts', {})); opts.update({'mode': 'eclate', 'view': 'assembled', 'out': os.path.join(out, 'eclate_assembled')})
    print('chunk', k, 'assembled image', flush=True)
    subprocess.run(base + kv(opts), check=True)
for s in mine_stills:
    opts = dict(common); opts.update({a: b for a, b in s.items() if a != 'name'}); opts['out'] = os.path.join(out, s['name'])
    print('chunk', k, 'still', s['name'], flush=True)
    subprocess.run(base + kv(opts), check=True)
print('chunk', k, 'done', flush=True)
