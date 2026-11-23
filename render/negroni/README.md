# Rendu pré-calculé du Negroni (menu Progress)

Rendu photoréaliste (Blender Cycles) du Negroni : une image fixe et une rotation à 360°.
Ce dossier ne fait pas partie du site : c'est l'outil de calcul des images.

- `lux-geometry.blend` : la scène (verre ciselé, liquide en 3 couches, glaçons, rondelle d'orange dont l'écorce est séparable, buée et coulures).
- `lux_geo.py` : construit cette scène (`python3 lux_geo.py -- ./`, après les textures) ; inutile de le relancer pour un rendu.
- `lux_tex.py` : génère les textures de la rondelle d'orange (procédurales, identiques à chaque fois).
- `lux_render.py` : matériaux, studio, lumières, caméra, rendu et étalonnage.
- `job.json` : ce qu'il faut calculer (nombre d'images de la rotation, images fixes, réglages).
- `run_job.py` / `collect.py` : découpage du calcul en morceaux, puis assemblage.

Le calcul tourne sur GitHub (workflow « Rendu Negroni 360 », `.github/workflows/negroni-render.yml`),
uniquement sur la branche de travail du rendu, jamais sur `main`. Modifier `job.json` et pousser relance le calcul.
Le résultat arrive dans `out/` : images WebP de la rotation (pleine taille et 720 px), vidéos d'aperçu
MP4/WebM, planche contact et images fixes en JPEG.

En local : `pip install bpy==5.3.0 numpy pillow`, puis
`python3 lux_tex.py ./ 4096` et `python3 lux_render.py -- blend=lux-geometry.blend tex=./ out=/tmp/test res=1080 samples=32`.

## Vue éclatée

`python3 lux_render.py -- mode=eclate blend=lux-geometry.blend tex=./ out=/tmp/eclate res=1500 samples=128`,
puis `python3 lux_labels.py -- base=/tmp/eclate` pour les noms des composants.

- `lux_eclate.py` : construit les pièces fermées à partir de la scène assemblée, sans la modifier :
  - le verre refermé ;
  - les 3 couches de liquide de même volume (gin, Campari, vermouth) ;
  - les glaçons entiers et la rondelle avec son écorce.
  Il les place sur un axe vertical, éclaire et cadre la composition, et gère les couleurs en AgX (look « Punchy »).
  Les positions « assemblé » (image 1) et « éclaté » (image 100) sont enregistrées en images clés pour une future animation.
- `lux_labels.py` : les noms et les lignes, sur un calque transparent séparé, avec un JSON des positions en pixels.
  La police Geist Light (`fonts/`, licence OFL) est fournie dans le dossier.
- `lux_regrade.py` : refait l'étalonnage AgX d'un EXR sans relancer le calcul.
- `save_steps=<dossier>` enregistre une version `.blend` de la scène à chaque étape. Les collections y sont rangées par composant, et des repères `Label_*` y sont rattachés aux pièces.
