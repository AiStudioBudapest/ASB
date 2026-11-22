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
stills = [p for p in glob.glob(os.path.join(src, '*.png')) if not os.path.basename(p).startswith('negroni_')]
if stills:
    d = os.path.join(OUT, 'stills'); os.makedirs(d, exist_ok=True)
    for p in stills:
        Image.open(p).convert('RGB').save(os.path.join(d, os.path.splitext(os.path.basename(p))[0] + '.jpg'), quality=95, optimize=True)
json.dump({'frames': len(frames), 'stills': [os.path.basename(p) for p in stills]}, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
print('collected', len(frames), 'frames,', len(stills), 'stills')
