#!/usr/bin/env python3
"""Génère les images TEMPORAIRES (illustrations, pas des photos) du site.
Elles sont créées de toutes pièces : aucun droit d'auteur, aucune personne réelle.
À remplacer par les vraies photos d'Anthony (voir README). Usage : python3 tools/make-placeholders.py"""
import numpy as np, os, random
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')

def grad(w, h, top, bot):
    t = np.linspace(0, 1, h)[:, None, None]
    a = np.array(top, float)[None, None, :]; b = np.array(bot, float)[None, None, :]
    return Image.fromarray((a + (b - a) * t).repeat(w, 1).astype('uint8'), 'RGB')

def glow(size, xy, r, col, strength=1.0):
    layer = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse([xy[0]-r, xy[1]-r, xy[0]+r, xy[1]+r], fill=col + (int(255*strength),))
    return layer.filter(ImageFilter.GaussianBlur(r * 0.55))

def finish(img, name, grain=7, vig=0.55, quality=80, max_w=None):
    w, h = img.size
    a = np.asarray(img.convert('RGB'), float)
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx - w/2) / (w/2))**2 + ((yy - h/2) / (h/2))**2)
    a *= (1 - vig * np.clip(d - 0.35, 0, 1)**1.6)[..., None]
    rng = np.random.default_rng(abs(hash(name)) % 2**32)
    a += rng.normal(0, grain, (h, w, 1))
    out = Image.fromarray(np.clip(a, 0, 255).astype('uint8'))
    if max_w and w > max_w: out = out.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
    path = os.path.join(OUT, name); os.makedirs(os.path.dirname(path), exist_ok=True)
    out.save(path, quality=quality, optimize=True, progressive=True); print(name, out.size, os.path.getsize(path)//1024, 'KB')

def room(w=1600, h=1000, mood='warm', furnished=True, seed=1, light=1.0, win='tall', crop=0.0):
    rnd = random.Random(seed); S = (w, h)
    warm = mood == 'warm'
    wall_t, wall_b = ((74, 66, 58), (46, 40, 35)) if warm else ((70, 72, 72), (48, 50, 50))
    img = grad(w, h, wall_t, wall_b)
    fl = int(h * 0.72)
    img.paste(grad(w, h - fl, (60, 50, 42) if warm else (52, 52, 52), (22, 19, 16)), (0, fl))
    d = ImageDraw.Draw(img, 'RGBA')
    # fenêtre
    wx0, wx1 = int(w*0.58), int(w*0.86)
    wy0 = int(h*0.10) if win == 'tall' else int(h*0.2)
    wy1 = fl - int(h*0.03)
    sky = grad(wx1-wx0, wy1-wy0, (250, 232, 200), (255, 246, 228)) if warm else grad(wx1-wx0, wy1-wy0, (190, 205, 215), (225, 232, 236))
    img.paste(sky, (wx0, wy0))
    for i in range(1, 3):
        x = wx0 + (wx1-wx0)*i//3; d.rectangle([x-3, wy0, x+3, wy1], fill=(30, 27, 24, 255))
    d.rectangle([wx0, wy0 + (wy1-wy0)//2 - 3, wx1, wy0 + (wy1-wy0)//2 + 3], fill=(30, 27, 24, 255))
    d.rectangle([wx0-6, wy0-6, wx1+6, wy1+6], outline=(24, 21, 19, 255), width=8)
    # lumière projetée au sol
    beam = Image.new('RGBA', S, (0, 0, 0, 0)); bd = ImageDraw.Draw(beam)
    bd.polygon([(wx0, fl), (wx1, fl), (int(w*0.50), h), (int(w*0.05), h)], fill=(255, 226, 170, int(70*light)))
    img = Image.alpha_composite(img.convert('RGBA'), beam.filter(ImageFilter.GaussianBlur(26)))
    img = Image.alpha_composite(img, glow(S, ((wx0+wx1)//2, (wy0+wy1)//2), int(w*0.30), (255, 226, 180), 0.35*light))
    d = ImageDraw.Draw(img, 'RGBA')
    # plinthe
    d.rectangle([0, fl-8, w, fl], fill=(28, 25, 22, 255))
    if furnished:
        # canapé
        sx0, sx1, sy = int(w*0.08), int(w*0.46), fl
        d.rounded_rectangle([sx0, sy-int(h*0.20), sx1, sy+int(h*0.02)], 28, fill=(150, 132, 108, 255))
        d.rounded_rectangle([sx0+30, sy-int(h*0.30), sx1-30, sy-int(h*0.14)], 24, fill=(168, 150, 124, 255))
        for k in range(3):
            xk = sx0+48 + k*(sx1-sx0-96)//3
            d.rounded_rectangle([xk, sy-int(h*0.17), xk+(sx1-sx0-110)//3, sy-int(h*0.04)], 16, fill=(182, 164, 138, 255))
        # tableau
        d.rectangle([int(w*0.16), int(h*0.14), int(w*0.36), int(h*0.40)], fill=(20, 18, 16, 255))
        d.rectangle([int(w*0.165), int(h*0.15), int(w*0.355), int(h*0.39)], fill=(196, 170, 130, 255))
        d.ellipse([int(w*0.20), int(h*0.19), int(w*0.31), int(h*0.35)], fill=(120, 96, 70, 255))
        # table basse
        d.rounded_rectangle([int(w*0.20), fl+int(h*0.08), int(w*0.38), fl+int(h*0.11)], 10, fill=(34, 30, 27, 255))
        # lampe
        lx = int(w*0.50)
        d.rectangle([lx-3, fl-int(h*0.34), lx+3, fl], fill=(28, 25, 22, 255))
        img = Image.alpha_composite(img, glow(S, (lx, fl-int(h*0.36)), int(h*0.22), (255, 205, 140), 0.55*light))
        d = ImageDraw.Draw(img, 'RGBA')
        d.pieslice([lx-46, fl-int(h*0.40), lx+46, fl-int(h*0.30)], 180, 360, fill=(236, 214, 180, 255))
        # plante
        px = int(w*0.93)
        d.polygon([(px-26, fl+6), (px+26, fl+6), (px+18, fl-52), (px-18, fl-52)], fill=(30, 27, 24, 255))
        for i in range(9):
            a = rnd.uniform(-0.9, 0.9); x2 = px + int(a*120); y2 = fl - 90 - rnd.randint(40, 190)
            d.line([(px, fl-50), (x2, y2)], fill=(64, 78, 58, 255), width=5)
            d.ellipse([x2-26, y2-14, x2+26, y2+14], fill=(70, 88, 62, 255))
    else:
        # état d'origine : taches, câbles, boîtes
        for _ in range(7):
            x, y = rnd.randint(int(w*0.05), int(w*0.5)), rnd.randint(int(h*0.1), int(h*0.6))
            d.ellipse([x, y, x+rnd.randint(60, 180), y+rnd.randint(40, 120)], fill=(30, 28, 24, 40))
        for i in range(3):
            bx = int(w*0.1) + i*int(w*0.13); d.rectangle([bx, fl-80-i*30, bx+110, fl+10], fill=(104, 90, 70, 255), outline=(60, 50, 38, 255), width=4)
        d.line([(int(w*0.3), int(h*0.0)), (int(w*0.33), fl)], fill=(20, 18, 16, 255), width=3)
    img = img.convert('RGB')
    if crop:
        cw = int(w*(1-crop)); ch = int(h*(1-crop)); x0 = int(w*crop*seed % (w-cw)); img = img.crop((x0, 0, x0+cw, ch)).resize(S, Image.LANCZOS)
    return img.filter(ImageFilter.GaussianBlur(1.1))

def portrait(w=1200, h=1500, seed=1, accent=(214, 190, 150), face=True):
    rnd = random.Random(seed); S = (w, h)
    img = grad(w, h, (30, 29, 28), (12, 12, 12)).convert('RGBA')
    img = Image.alpha_composite(img, glow(S, (int(w*(0.3+0.4*rnd.random())), int(h*0.35)), int(w*0.55), accent, 0.22))
    sil = Image.new('RGBA', S, (0, 0, 0, 0)); d = ImageDraw.Draw(sil)
    cx = int(w*0.5 + rnd.randint(-60, 60)); hy = int(h*0.36)
    d.ellipse([cx-int(w*0.12), hy-int(h*0.12), cx+int(w*0.12), hy+int(h*0.11)], fill=(18, 17, 16, 255))
    d.rectangle([cx-int(w*0.04), hy+int(h*0.08), cx+int(w*0.04), hy+int(h*0.17)], fill=(18, 17, 16, 255))
    d.ellipse([cx-int(w*0.42), hy+int(h*0.14), cx+int(w*0.42), hy+int(h*0.80)], fill=(18, 17, 16, 255))
    rim = sil.filter(ImageFilter.GaussianBlur(5)); mask = Image.new('RGBA', S, accent + (0,))
    edge = Image.composite(Image.new('RGBA', S, accent + (170,)), Image.new('RGBA', S), Image.eval(rim.split()[3], lambda v: 255 if 20 < v < 150 else 0))
    img = Image.alpha_composite(img, sil); img = Image.alpha_composite(img, edge.filter(ImageFilter.GaussianBlur(3)))
    return img.convert('RGB').filter(ImageFilter.GaussianBlur(1.2))

def office(w=1600, h=1000, seed=1):
    S = (w, h); img = grad(w, h, (46, 52, 58), (20, 22, 24)).convert('RGBA'); d = ImageDraw.Draw(img, 'RGBA')
    rnd = random.Random(seed)
    for i in range(14):  # skyline derrière la baie
        bw = rnd.randint(70, 150); bx = int(w*0.05) + i*(w//15); bh = rnd.randint(int(h*0.2), int(h*0.55))
        d.rectangle([bx, int(h*0.66)-bh, bx+bw, int(h*0.66)], fill=(34, 38, 42, 255))
        for _ in range(8):
            wx = rnd.randint(bx+8, bx+bw-16); wy = rnd.randint(int(h*0.66)-bh+10, int(h*0.64))
            d.rectangle([wx, wy, wx+8, wy+12], fill=(230, 200, 140, rnd.randint(50, 200)))
    d.rectangle([0, int(h*0.66), w, h], fill=(18, 18, 18, 255))
    d.rounded_rectangle([int(w*0.12), int(h*0.72), int(w*0.88), int(h*0.78)], 6, fill=(120, 106, 88, 255))
    d.rounded_rectangle([int(w*0.40), int(h*0.56), int(w*0.62), int(h*0.72)], 8, fill=(14, 14, 14, 255), outline=(70, 70, 70, 255), width=4)
    img = Image.alpha_composite(img, glow(S, (int(w*0.51), int(h*0.64)), int(w*0.2), (180, 205, 235), 0.28))
    return img.convert('RGB').filter(ImageFilter.GaussianBlur(1.2))

def bar(w=1600, h=1000, seed=1):
    S = (w, h); img = grad(w, h, (26, 20, 15), (10, 8, 6)).convert('RGBA'); d = ImageDraw.Draw(img, 'RGBA')
    rnd = random.Random(seed)
    for r in range(3):  # étagères de bouteilles
        y = int(h*(0.22 + 0.15*r)); d.rectangle([int(w*0.08), y+60, int(w*0.92), y+66], fill=(104, 80, 54, 255))
        x = int(w*0.09)
        while x < int(w*0.9):
            bw = rnd.randint(26, 44); bh = rnd.randint(70, 118)
            c = rnd.choice([(86, 62, 36, 255), (60, 78, 58, 255), (140, 100, 50, 255), (40, 40, 44, 255)])
            d.rounded_rectangle([x, y+60-bh, x+bw, y+60], 8, fill=c); d.rectangle([x+bw//3, y+60-bh-24, x+2*bw//3, y+60-bh], fill=c)
            x += bw + rnd.randint(10, 26)
    d.rectangle([0, int(h*0.74), w, h], fill=(22, 16, 11, 255)); d.rectangle([0, int(h*0.72), w, int(h*0.75)], fill=(120, 90, 58, 255))
    for i in range(4):
        px = int(w*(0.2 + 0.2*i)); d.line([(px, 0), (px, int(h*0.12))], fill=(20, 18, 16, 255), width=3)
        img = Image.alpha_composite(img, glow(S, (px, int(h*0.15)), 110, (255, 190, 110), 0.65)); d = ImageDraw.Draw(img, 'RGBA')
    return img.convert('RGB').filter(ImageFilter.GaussianBlur(1.6))

if __name__ == '__main__':
    finish(room(2400, 1350, seed=2, light=1.1), 'site/hero.jpg', max_w=2400, quality=78)
    finish(room(1600, 1200, seed=3), 'areas/real-estate.jpg')
    finish(portrait(1200, 1500, seed=4), 'areas/portraits.jpg')
    finish(office(1600, 1200, seed=5), 'areas/business.jpg')
    finish(bar(1600, 1200, seed=6), 'areas/hospitality.jpg')
    finish(portrait(1200, 1500, seed=9, accent=(190, 175, 150)), 'site/about-portrait.jpg')
    finish(room(1600, 1000, seed=7, mood='cool', furnished=False), 'projects/sample-before.jpg')
    finish(room(1600, 1000, seed=7, mood='warm', furnished=True), 'projects/sample-after.jpg')
    finish(room(1600, 1000, seed=11, mood='warm', furnished=True, crop=0.25), 'projects/sample-detail-1.jpg')
    finish(room(1600, 1000, seed=12, mood='warm', furnished=True, crop=0.35), 'projects/sample-detail-2.jpg')
    finish(room(1600, 1000, seed=13, mood='cool', furnished=False, crop=0.2), 'projects/sample-before-2.jpg')
    for i, ac in enumerate([(214, 190, 150), (200, 170, 140), (170, 180, 190), (220, 200, 170), (190, 160, 130), (210, 210, 200)]):
        finish(portrait(1200, 1500 if i % 2 == 0 else 1200, seed=20+i, accent=ac), f'projects/sample-portrait-{i+1}.jpg', quality=78)
    o = room(1200, 630, seed=2, light=1.1); finish(o, 'site/og.jpg', quality=82)
