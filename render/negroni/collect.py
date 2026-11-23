# Gathers the rendered chunks: WebP/JPEG sequence (full + mobile size), preview videos, stills, contact sheet.
import glob, json, os, shutil, subprocess, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
src = sys.argv[1]
OUT = os.path.join(HERE, 'out'); os.makedirs(OUT, exist_ok=True)
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
# explode sequence of the exploded view (for the site): WebP at 1080 and 720 px, assembled image 0, label anchors, preview
seq = sorted(glob.glob(os.path.join(src, 'eclate_[0-9][0-9][0-9].png')))
if seq:
    for sub in ('eclate-seq/webp', 'eclate-seq/webp-720'):
        d = os.path.join(OUT, sub); shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    a0 = os.path.join(src, 'eclate_assembled.png')
    for p in ([a0] if os.path.exists(a0) else []) + seq:
        name = os.path.splitext(os.path.basename(p))[0]; im = Image.open(p).convert('RGB')
        im.save(os.path.join(OUT, 'eclate-seq/webp', name + '.webp'), quality=84, method=6)
        sm = im.resize((720, round(720 * im.height / im.width)), Image.LANCZOS)
        sm.save(os.path.join(OUT, 'eclate-seq/webp-720', name + '.webp'), quality=82, method=6)
    lab = os.path.join(src, 'eclate_seq.labels.json')
    if os.path.exists(lab): shutil.copy(lab, os.path.join(OUT, 'eclate-seq', 'labels.json'))
    lst = os.path.join(src, 'list-seq.txt')
    with open(lst, 'w') as f:
        for p in seq + seq[::-1]: f.write("file '%s'\nduration %f\n" % (os.path.abspath(p), 1 / 24))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-vf', 'fps=24,format=yuv420p',
                    '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', os.path.join(OUT, 'eclate-seq', 'apercu.mp4')], check=True)
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
