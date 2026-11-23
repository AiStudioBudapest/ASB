# Gathers the rendered chunks: WebP/JPEG sequence (full + mobile size), preview videos, stills, contact sheet.
import glob, json, os, shutil, subprocess, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
src = sys.argv[1]
OUT = os.environ.get('COLLECT_OUT') or os.path.join(HERE, 'out'); os.makedirs(OUT, exist_ok=True)   # COLLECT_OUT: local tests
frames = sorted(glob.glob(os.path.join(src, 'negroni_[0-9][0-9][0-9].png')))
if frames:
    for sub in ('turntable/webp', 'turntable/webp-720'):
        d = os.path.join(OUT, sub); shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    for p in frames:
        name = os.path.splitext(os.path.basename(p))[0]; im = Image.open(p).convert('RGB')
        im.save(os.path.join(OUT, 'turntable/webp', name + '.webp'), quality=90, method=6)
        sm = im.resize((720, round(720 * im.height / im.width)), Image.LANCZOS)
        sm.save(os.path.join(OUT, 'turntable/webp-720', name + '.webp'), quality=86, method=6)
    pat = os.path.join(src, 'negroni_%03d.png')
    # two loops so the preview plays a full turn twice
    lst = os.path.join(src, 'list.txt')
    with open(lst, 'w') as f:
        for _ in range(2):
            for p in frames: f.write("file '%s'\nduration %f\n" % (os.path.abspath(p), 1 / 30))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-vf', 'fps=30,format=yuv420p',
                    '-c:v', 'libx264', '-crf', '17', '-preset', 'slow', '-movflags', '+faststart', os.path.join(OUT, 'negroni-360.mp4')], check=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-vf', 'fps=30',
                    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30', '-row-mt', '1', os.path.join(OUT, 'negroni-360.webm')], check=True)
    # contact sheet (every 6th frame)
    pick = frames[::max(1, len(frames) // 12)][:12]
    th = [Image.open(p).convert('RGB').resize((360, 450), Image.LANCZOS) for p in pick]
    sheet = Image.new('RGB', (360 * 6, 450 * ((len(th) + 5) // 6)), (0, 0, 0))
    for i, t in enumerate(th): sheet.paste(t, ((i % 6) * 360, (i // 6) * 450))
    sheet.save(os.path.join(OUT, 'turntable_contact_sheet.jpg'), quality=90)
# explode sequence for the site (lux_seq.py: from the hero image to the exploded view, over the menu's green gradient).
# Each image is cropped to what differs from the gradient (pieces, glow) plus a margin whose outer part fades out:
# RGBA WebP at 1080 and 720 px. seq.json gives each crop's place in the frame; the page draws it there, over the same
# gradient placed relative to the frame, so the edges cannot show.
seq = sorted(glob.glob(os.path.join(src, 'eclate_[0-9][0-9][0-9].png')))
if seq:
    import numpy as np
    sj = json.load(open(os.path.join(src, 'eclate_seq.seq.json')))
    D = os.path.join(OUT, 'eclate-seq'); shutil.rmtree(D, ignore_errors=True)
    for sub in ('webp', 'webp-720'): os.makedirs(os.path.join(D, sub))
    W0, H0 = Image.open(seq[0]).size
    if W0 % 3 or H0 % 3: sys.exit('frame size %dx%d: width and height must be multiples of 3' % (W0, H0))
    def css_bg(W, H):
        bg, st = sj['bg'], sj['stops']
        y, x = np.mgrid[0:H, 0:W].astype(np.float64)
        d = np.sqrt((((x + .5) / W - bg['cx']) / bg['rx']) ** 2 + (((y + .5) / H - (1 - bg['cy'])) / bg['ry']) ** 2)
        hx = lambda h: np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], np.float64)
        P = [p_ for _, p_ in st]; C = [hx(c) for c, _ in st]; out = np.empty((H, W, 3)); out[:] = C[-1]
        for i in range(len(P) - 1):
            m = (d >= P[i]) & (d <= P[i + 1]); f = ((d[m] - P[i]) / (P[i + 1] - P[i]))[:, None]; out[m] = C[i] + (C[i + 1] - C[i]) * f
        return out
    BG = css_bg(W0, H0)
    M = int(round(0.03 * W0)) // 3 * 3                      # margin, faded out over its whole width
    crops, worst = [None] * int(sj['n']), 0.0
    for p in seq:
        f = int(os.path.basename(p)[7:10])
        im = np.asarray(Image.open(p).convert('RGB'), np.float64)
        dif = np.abs(im - BG).max(axis=2)
        sm = np.pad(dif, 1, mode='edge'); sm = sum(sm[i:i + dif.shape[0], j:j + dif.shape[1]] for i in range(3) for j in range(3)) / 9
        sm[:3] = sm[-3:] = 0; sm[:, :3] = sm[:, -3:] = 0      # lone pixels at the frame border (denoiser edge) are not content
        ys, xs = np.nonzero(sm > 2.5)                       # 8-bit rounding of the gradient stays under 1
        bx = sj['frames'][f]['box']
        x0 = min(xs.min(), int(bx[0] * W0)) - M; x1 = max(xs.max() + 1, int(np.ceil(bx[2] * W0))) + M
        y0 = min(ys.min(), int(bx[1] * H0)) - M; y1 = max(ys.max() + 1, int(np.ceil(bx[3] * H0))) + M
        x0 = max(0, x0 // 3 * 3); y0 = max(0, y0 // 3 * 3); x1 = min(W0, -(-x1 // 3) * 3); y1 = min(H0, -(-y1 // 3) * 3)
        out = np.ones(dif.shape, bool); out[y0:y1, x0:x1] = False
        if out.any(): worst = max(worst, float(dif[out].max()))
        cw, ch = x1 - x0, y1 - y0
        ex = np.minimum(np.arange(cw) + .5, cw - np.arange(cw) - .5) / max(M, 1)
        ey = np.minimum(np.arange(ch) + .5, ch - np.arange(ch) - .5) / max(M, 1)
        a = np.clip(np.minimum(ey[:, None], ex[None, :]), 0, 1); a = a * a * (3 - 2 * a)
        rgba = np.dstack([im[y0:y1, x0:x1], a * 255]); rgba = (rgba + .5).clip(0, 255).astype(np.uint8)
        c = Image.fromarray(rgba, 'RGBA'); name = 'eclate_%03d.webp' % f
        c.save(os.path.join(D, 'webp', name), quality=84, alpha_quality=70, method=6)
        c.resize((cw * 2 // 3, ch * 2 // 3), Image.LANCZOS).save(os.path.join(D, 'webp-720', name), quality=82, alpha_quality=70, method=6)
        crops[f] = [round(x0 / W0, 6), round(y0 / H0, 6), round(x1 / W0, 6), round(y1 / H0, 6)]
    sj['crop'] = crops; sj['size'] = [W0, H0]
    json.dump(sj, open(os.path.join(D, 'seq.json'), 'w'))
    lab = os.path.join(src, 'eclate_seq.labels.json')
    if os.path.exists(lab): shutil.copy(lab, os.path.join(D, 'labels.json'))
    print('sequence: %d crops, largest difference to the gradient outside the crops %.1f/255, %.0f KB (1080) + %.0f KB (720)' % (
        len(seq), worst, sum(os.path.getsize(x) for x in glob.glob(os.path.join(D, 'webp', '*'))) / 1024,
        sum(os.path.getsize(x) for x in glob.glob(os.path.join(D, 'webp-720', '*'))) / 1024))
    lst = os.path.join(src, 'list-seq.txt')
    with open(lst, 'w') as f:
        for p in seq + seq[::-1]: f.write("file '%s'\nduration %f\n" % (os.path.abspath(p), 1 / 24))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-vf', 'fps=24,format=yuv420p',
                    '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', os.path.join(D, 'apercu.mp4')], check=True)
import re
FRAME = re.compile(r'(negroni|eclate)_\d{3}|eclate_assembled|.*_labelled|.*_labels')   # sequence frames and label layers are not stills
stills = [p for p in glob.glob(os.path.join(src, '*.png')) if not FRAME.fullmatch(os.path.splitext(os.path.basename(p))[0])]
if stills:
    d = os.path.join(OUT, 'stills'); os.makedirs(d, exist_ok=True)
    for p in stills:
        base = os.path.splitext(p)[0]; name = os.path.basename(base)
        Image.open(p).convert('RGB').save(os.path.join(d, name + '.jpg'), quality=95, optimize=True)
        if os.path.exists(base + '.labels.json'):          # exploded view: names on their own layer, then the labelled image
            subprocess.run([sys.executable, os.path.join(HERE, 'lux_labels.py'), '--', 'base=' + base], check=True)
            Image.open(base + '_labelled.png').convert('RGB').save(os.path.join(d, name + '-noms.jpg'), quality=95, optimize=True)
            shutil.copy(base + '_labels.png', os.path.join(d, name + '-noms-calque.png'))
            shutil.copy(base + '_labels_px.json', os.path.join(d, name + '-noms.json'))
json.dump({'frames': len(frames), 'sequence': len(seq), 'stills': [os.path.basename(p) for p in stills]}, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
print('collected', len(frames), 'frames,', len(seq), 'sequence frames,', len(stills), 'stills')
