#!/usr/bin/env python3
"""Rend transparent le blanc enfermé dans l'anse des chopes en cuivre (Moscow / Raspberry Mule).
Usage : python3 tools/clear-handle-white.py img1.webp ... (réécrit en place).
Ne touche que les grandes zones blanches (> 3000 px) ; les reflets du verre restent intacts."""
import sys
import numpy as np
from collections import deque
from PIL import Image, ImageFilter
def comps(m):
    h, w = m.shape; seen = np.zeros_like(m); out = []
    for y, x in zip(*np.nonzero(m)):
        if seen[y, x]: continue
        q = deque([(y, x)]); seen[y, x] = 1; px = []
        while q:
            cy, cx = q.popleft(); px.append((cy, cx))
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = cy+dy, cx+dx
                if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = 1; q.append((ny, nx))
        out.append(px)
    return out
for path in sys.argv[1:]:
    im = Image.open(path).convert('RGBA'); a = np.array(im)
    rgb = a[..., :3].astype(int)
    core = (rgb.min(axis=2) >= 236) & (a[..., 3] > 200)
    hole = np.zeros(core.shape, bool)
    for px in comps(core):
        if len(px) > 3000:
            for y, x in px: hole[y, x] = True
    # étend d'1-2 px pour manger la frange blanchâtre contre le métal, puis adoucit
    h = Image.fromarray((hole * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5))
    h = np.array(h.filter(ImageFilter.GaussianBlur(0.8))) / 255.0
    a[..., 3] = (a[..., 3] * (1 - h)).astype('uint8')
    Image.fromarray(a).save(path, 'WEBP', quality=88, method=6)
    print(path.split('/')[-1], int(hole.sum()), 'px rendus transparents')
