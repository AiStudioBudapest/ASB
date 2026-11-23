# Importe dans le menu la séquence pré-calculée du Negroni (rendu Blender, dossier render/negroni du dépôt) :
# le cocktail de l'image d'accueil, puis ses ingrédients qui sortent du verre, jusqu'à la vue éclatée.
#
#   python3 clients/progressmenu/tools/import-seq.py [source]
#
# source (par défaut render/negroni/out/eclate-seq) = résultat de render/negroni/collect.py :
#   webp/ (1080 px) et webp-720/ : une image par étape, recadrée sur les pièces, bords fondus (transparence) ;
#   seq.json : place de chaque image dans le cadre, dégradé du fond, position des pièces image par image ;
#   labels.json : côté (gauche / droite) de chaque nom.
# Écrit assets/seq/negroni/<largeur>/00.webp ... et assets/seq/negroni/seq.json.
# Le menu (build.mjs) n'utilise la séquence que si toutes les images sont présentes ; sinon la vue 3D reste.
import glob, hashlib, json, os, shutil, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
MENU = os.path.dirname(HERE)
ROOT = os.path.dirname(os.path.dirname(MENU))
src = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(ROOT, 'render/negroni/out/eclate-seq')
dst = os.path.join(MENU, 'assets/seq/negroni')

# Moment (0 = cocktail dans son verre, 1 = vue éclatée) où chaque nom apparaît : un peu avant la fin du trajet de
# sa pièce (calendrier de render/negroni/lux_seq.py : orange 0-0,42 ; glaçons jusqu'à 0,60 ; le liquide quitte
# le verre à 0,72 ; gin, campari et vermouth arrivent à 0,94 / 0,97 / 1).
AT = {'orange': 0.40, 'ice': 0.58, 'glass': 0.72, 'gin': 0.90, 'campari': 0.93, 'vermouth': 0.96}

meta_p, lab_p = os.path.join(src, 'seq.json'), os.path.join(src, 'labels.json')
for p in (meta_p, lab_p):
    if not os.path.exists(p): sys.exit('fichier manquant : %s' % p)
meta = json.load(open(meta_p)); labels = json.load(open(lab_p))
n = meta['n']; crops = meta.get('crop')
if not crops or len(crops) != n: sys.exit('seq.json sans recadrage image par image (crop) : relancer render/negroni/collect.py')
if n > 100: sys.exit('trop d’images (%d)' % n)

sets = {}  # largeur du cadre complet -> images
for sub, scale in (('webp', 1.0), ('webp-720', 2 / 3)):
    fr = sorted(glob.glob(os.path.join(src, sub, 'eclate_[0-9][0-9][0-9].webp')))
    if not fr: continue
    if len(fr) != n: sys.exit('%s : %d images au lieu de %d' % (sub, len(fr), n))
    sets[round(meta['size'][0] * scale)] = fr
if not sets: sys.exit('aucune image eclate_NNN.webp dans %s' % src)

shutil.rmtree(dst, ignore_errors=True)
h = hashlib.sha1()
for w, fr in sorted(sets.items()):
    out = os.path.join(dst, str(w)); os.makedirs(out)
    for i, p in enumerate(fr):
        b = crops[i]; im = Image.open(p)
        ew, eh = round((b[2] - b[0]) * w), round((b[3] - b[1]) * w * meta['size'][1] / meta['size'][0])
        if abs(im.width - ew) > 1 or abs(im.height - eh) > 1: sys.exit('%s : %dx%d au lieu de %dx%d' % (p, im.width, im.height, ew, eh))
        shutil.copyfile(p, os.path.join(out, '%02d.webp' % i))      # déjà compressée : pas de seconde perte
        h.update(open(p, 'rb').read())

side = {l['key'].lower(): ('l' if l['side'] == 'left' else 'r') for l in labels['labels']}
lab = []
for k, s in side.items():
    if k not in AT: sys.exit('nom inconnu dans %s : %s' % (lab_p, k))
    pts = [[round(f['a'][k.upper()][0], 4), round(f['a'][k.upper()][1], 4)] for f in meta['frames']]
    lab.append({'k': k, 's': s, 'at': AT[k], 'p': pts})
bg = meta['bg']
seq = {'fmt': 2, 'n': n, 'w': sorted(sets), 'r': round(meta['size'][1] / meta['size'][0], 4), 'v': h.hexdigest()[:10],
       'b': [[round(v, 6) for v in b] for b in crops], 'l': lab, 'g': [round(v, 4) for v in meta['glass0']],
       'bg': [bg['cx'], round(1 - bg['cy'], 4), bg['rx'], bg['ry']], 'st': meta['stops']}
json.dump(seq, open(os.path.join(dst, 'seq.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
size = sum(os.path.getsize(f) for f in glob.glob(os.path.join(dst, '*', '*.webp')))
print('✓ %d images, largeurs %s, %.1f Mo au total -> %s' % (n, seq['w'], size / 1e6, os.path.relpath(dst, ROOT)))
for w in seq['w']:
    s = sum(os.path.getsize(f) for f in glob.glob(os.path.join(dst, str(w), '*.webp')))
    print('  %d px : %.0f Ko' % (w, s / 1024))
