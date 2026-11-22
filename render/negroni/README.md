# Rendu pré-calculé du Negroni (menu Progress)

Rendu photoréaliste (Blender Cycles) du Negroni : une image fixe et une rotation à 360°.
Ce dossier ne fait pas partie du site : c'est l'outil de calcul des images.

- `lux-geometry.blend` : la scène (verre ciselé, liquide en couches, glaçons, rondelle, zeste, gouttelettes).
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
