# Importe dans le menu la vue éclatée pré-calculée du Negroni (rendu Blender, dossier render/negroni du dépôt).
#
#   python3 clients/progressmenu/tools/import-seq.py [source]
#
# source (par défaut render/negroni/out/eclate-seq) :
#   - soit le résultat du calcul sur GitHub : webp/ (1080 px) + webp-720/ + labels.json ;
#   - soit un dossier de rendu local : eclate_000.png ... + eclate_assembled.png + eclate_seq.labels.json.
# Écrit assets/seq/negroni/<largeur>/00.webp ... (une image par étape de l'animation), a.webp (le cocktail
# assemblé, même cadrage) et assets/seq/negroni/seq.json (nombre d'images, largeurs, position des noms).
# Le menu (build.mjs) n'utilise la séquence que si toutes les images sont présentes ; sinon la vue 3D actuelle reste.
import glob, hashlib, json, os, shutil, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
MENU = os.path.dirname(HERE)
ROOT = os.path.dirname(os.path.dirname(MENU))
src = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(ROOT, 'render/negroni/out/eclate-seq')
dst = os.path.join(MENU, 'assets/seq/negroni')

# Moment (0 = cocktail assemblé, 1 = vue éclatée) où chaque nom apparaît : un peu avant la fin du trajet
# de sa pièce. Fenêtres de temps reprises de render/negroni/lux_eclate.py (GROUPS_SEQ) ; le verre ne bouge pas.
AT = {'orange': 0.72, 'ice': 0.78, 'gin': 0.84, 'campari': 0.89, 'vermouth': 0.94, 'glass': 0.5}


def frames_in(folder, ext):
    return sorted(glob.glob(os.path.join(folder, 'eclate_[0-9][0-9][0-9].' + ext)))


sets = {}  # largeur -> (liste des images, image assemblée)
if os.path.isdir(os.path.join(src, 'webp')):
    for sub in ('webp', 'webp-720'):
        fr = frames_in(os.path.join(src, sub), 'webp')
        if fr:
            w = Image.open(fr[0]).width
            sets[w] = (fr, os.path.join(src, sub, 'eclate_assembled.webp'))
    labels = os.path.join(src, 'labels.json')
else:
    fr = frames_in(src, 'png')
    if fr:
        w = Image.open(fr[0]).width
        sets[w] = (fr, os.path.join(src, 'eclate_assembled.png'))
    labels = os.path.join(src, 'eclate_seq.labels.json')
if not sets: sys.exit('aucune image eclate_NNN dans %s' % src)
n = len(next(iter(sets.values()))[0])
for w, (fr, a) in sets.items():
    if len(fr) != n: sys.exit('nombre d’images différent selon la taille (%d / %d)' % (len(fr), n))
    if not os.path.exists(a): sys.exit('image assemblée manquante : %s' % a)
if n > 100: sys.exit('trop d’images (%d)' % n)

shutil.rmtree(dst, ignore_errors=True)
h = hashlib.sha1()
ratio = None
for w, (fr, a) in sorted(sets.items()):
    out = os.path.join(dst, str(w)); os.makedirs(out)
    for i, p in enumerate(fr + [a]):
        name = ('a' if i == len(fr) else '%02d' % i) + '.webp'
        im = Image.open(p)
        ratio = ratio or im.height / im.width
        if p.endswith('.webp'): shutil.copyfile(p, os.path.join(out, name))     # déjà compressée : pas de seconde perte
        else: im.convert('RGB').save(os.path.join(out, name), quality=84, method=6)
        h.update(open(os.path.join(out, name), 'rb').read())

meta = json.load(open(labels))
lab = []
glass = None
for l in meta['labels']:
    k = l['key'].lower()
    if k not in AT: sys.exit('nom inconnu dans %s : %s' % (labels, l['key']))
    lab.append({'k': k, 's': 'l' if l['side'] == 'left' else 'r', 'a': [round(v, 4) for v in l['anchor']], 'at': AT[k]})
    if k == 'glass': glass = [round(v, 4) for v in l['box']]
if not glass: sys.exit('position du verre absente de %s' % labels)
seq = {'n': n, 'w': sorted(sets), 'r': round(ratio, 4), 'v': h.hexdigest()[:10], 'l': lab, 'g': glass}
json.dump(seq, open(os.path.join(dst, 'seq.json'), 'w'), ensure_ascii=False)
size = sum(os.path.getsize(f) for f in glob.glob(os.path.join(dst, '*', '*.webp')))
print('✓ %d images + image assemblée, largeurs %s, %.1f Mo au total -> %s' % (n, seq['w'], size / 1e6, os.path.relpath(dst, ROOT)))
for w in seq['w']:
    s = sum(os.path.getsize(f) for f in glob.glob(os.path.join(dst, str(w), '*.webp')))
    print('  %d px : %.0f Ko' % (w, s / 1024))
