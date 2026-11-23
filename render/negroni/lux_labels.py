# Typography layer of the exploded view: component names + hairlines, drawn on their own transparent layer.
# Reads the render and the anchors written by lux_eclate.stage() (<base>.labels.json); writes
#   <base>_labels.png      transparent layer (names + lines only, same size as the render)
#   <base>_labelled.png    render + layer
#   <base>_labels_px.json  final pixel positions (text boxes, line ends) for a web animation
# usage: python3 lux_labels.py -- base=/path/render [img=/path/render.png] [weight=300] [size=0.0138] ...
import sys, os, json, math
from PIL import Image, ImageDraw, ImageFont

A = dict(a.split('=', 1) for a in sys.argv[sys.argv.index('--') + 1:]) if '--' in sys.argv else {}
HERE = os.path.dirname(os.path.abspath(__file__))
base = A['base']; src = A.get('img', base + '.png')
meta = json.load(open(base + '.labels.json'))
img = Image.open(src).convert('RGBA'); W, H = img.size
SS = 4                                                     # drawn 4x larger, then reduced: clean hairlines
font_path = A.get('font', os.path.join(HERE, 'fonts', 'geist-%s.ttf' % A.get('weight', '300')))
size = float(A.get('size', 0.0160)) * H                    # cap size relative to the image height
track = float(A.get('track', 0.28))                        # letter spacing, in em
ink = tuple(int(x) for x in A.get('ink', '233,221,196').split(','))   # champagne
a_text, a_line = float(A.get('a_text', 0.94)), float(A.get('a_line', 0.62))
line_w = float(A.get('line_w', 1.0)) * H / 1500.0          # hairline width at the final size (px)
dot_r = float(A.get('dot', 2.1)) * H / 1500.0
gap_piece = float(A.get('gap_piece', 0.012)) * W           # space between a piece and the start of its line
gap_text = float(A.get('gap_text', 0.016)) * W             # space between the end of a line and its name
col = float(A.get('col', 0.105)) * W                       # distance from the column to the name column
margin = float(A.get('margin', 0.045)) * W                 # minimum outer margin

def make_font(px):
    return ImageFont.truetype(font_path, max(4, int(round(px * SS))))

def text_width(f, s):
    t = track * f.size
    return sum(f.getlength(ch) for ch in s) + t * (len(s) - 1)

labels = meta['labels']
right = [l for l in labels if l['side'] == 'right']; left = [l for l in labels if l['side'] == 'left']
px = lambda l: (l['anchor'][0] * W, l['anchor'][1] * H)
# name columns: one shared alignment line per side, outside the widest piece on that side
xr = max(px(l)[0] for l in right) + gap_piece + col if right else None
xl = min(px(l)[0] for l in left) - gap_piece - col if left else None
# shrink the type if the longest name would run into the margin
f = make_font(size)
while True:
    need_r = max((text_width(f, l['text']) / SS for l in right), default=0)
    need_l = max((text_width(f, l['text']) / SS for l in left), default=0)
    ok = (xr is None or xr + gap_text + need_r <= W - margin) and (xl is None or xl - gap_text - need_l >= margin)
    if ok or f.size <= 8 * SS: break
    f = make_font(f.size / SS * 0.96)
cap = f.getbbox('H'); cap_mid = (cap[1] + cap[3]) / 2     # vertical centre of the capitals, from the draw origin

layer = Image.new('RGBA', (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
out = {'width': W, 'height': H, 'font': os.path.basename(font_path), 'size_px': round(f.size / SS, 2),
       'tracking_em': track, 'ink': ink, 'labels': []}
for l in labels:
    ax, ay = px(l); right_side = l['side'] == 'right'
    sgn = 1 if right_side else -1
    x0 = ax + sgn * gap_piece                                # line start (dot), next to the piece
    xcol = xr if right_side else xl
    x1 = xcol                                                 # line end, at the shared name column
    tw = text_width(f, l['text']) / SS
    tx = x1 + gap_text if right_side else x1 - gap_text - tw
    # hairline + dot
    lw = max(1, int(round(line_w * SS)))
    d.line([(x0 * SS, ay * SS), (x1 * SS, ay * SS)], fill=ink + (int(255 * a_line),), width=lw)
    r = dot_r * SS
    d.ellipse([x0 * SS - r, ay * SS - r, x0 * SS + r, ay * SS + r], fill=ink + (int(255 * a_text),))
    # name, letter by letter (tracking)
    x = tx * SS; y = ay * SS - cap_mid
    for ch in l['text']:
        d.text((x, y), ch, font=f, fill=ink + (int(255 * a_text),))
        x += f.getlength(ch) + track * f.size
    out['labels'].append({'key': l['key'], 'text': l['text'], 'side': l['side'],
                          'dot': [round(x0, 1), round(ay, 1)], 'line': [[round(x0, 1), round(ay, 1)], [round(x1, 1), round(ay, 1)]],
                          'text_box': [round(tx, 1), round(ay - (cap[3] - cap[1]) / SS / 2, 1), round(tx + tw, 1), round(ay + (cap[3] - cap[1]) / SS / 2, 1)]})

layer = layer.resize((W, H), Image.LANCZOS)
layer.save(base + '_labels.png')
Image.alpha_composite(img, layer).convert('RGB').save(base + '_labelled.png')
json.dump(out, open(base + '_labels_px.json', 'w'), indent=1, ensure_ascii=False)
print('labels: %d names, %.1f px type, columns at x=%s / %s' % (len(labels), f.size / SS, xl and round(xl), xr and round(xr)))
