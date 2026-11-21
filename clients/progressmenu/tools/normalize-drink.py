#!/usr/bin/env python3
"""Met toutes les images de boissons détourées (WebP/PNG transparent) sur le même cadre 600x800,
à HAUTEUR égale (tous les verres ont la même hauteur), sauf les plus larges qui sont limités en largeur. Base alignée en bas, centrée. Usage : python3 tools/normalize-drink.py img1.webp img2.webp ...
(les fichiers sont réécrits en place ; garder les originaux ailleurs)."""
import sys, math
from PIL import Image
CW, CH = 600, 800
HEIGHT = 650           # hauteur cible de la boisson dans le cadre
MARGIN_B, MARGIN_X, MARGIN_T = 26, 24, 14
for path in sys.argv[1:]:
    im = Image.open(path).convert('RGBA')
    im = im.crop(im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
    w, h = im.size
    s = min(HEIGHT / h, (CW - 2 * MARGIN_X) / w, 1.6)
    nw, nh = max(1, round(w * s)), max(1, round(h * s))
    im = im.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
    canvas.paste(im, ((CW - nw) // 2, CH - MARGIN_B - nh), im)
    canvas.save(path, 'WEBP', quality=88, method=6)
    print(path.split('/')[-1], (w, h), '->', (nw, nh), 'x%.2f' % s)
