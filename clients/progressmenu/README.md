# progressmenu — menu des boissons de pr09re55 (QR code)

Site statique d'une seule page, généré par `node build.mjs` (aucune dépendance) dans `dist/`. Il est déployé comme un **projet Vercel séparé** (Root Directory `clients/progressmenu`, réglages dans `vercel.json`, `noindex`). Domaine prévu : progressmenu.com (à acheter et brancher par l'utilisateur, rien n'est acheté).

Page consultée sur téléphone en scannant un QR code : une seule requête HTML (CSS et JS intégrés, 62 Ko), polices Prata + Geist auto-hébergées. Langues HU / EN / FR dans la même page (choix mémorisé ; au premier passage : hongrois si le téléphone est en hongrois, français s'il est en français, sinon anglais).

Style volontairement différent du site pr09re55 : fond jungle (palmes dessinées par le script, 3 plans avec parallaxe au défilement, bokeh, rayons de lumière), cartes en verre sombre aux couleurs de chaque famille, image de la boisson qui dépasse de la carte (inclinaison 3D à la souris, apparition en ressort au défilement). Sur téléphone : pas de rayons, pas de flou sur les palmes ; `prefers-reduced-motion` coupe les animations.

## Contenu
**Depuis le 19/11/2026, le menu n'affiche que les cocktails, les long drinks et l'offre d'été avec snacks** (22 articles, demande de l'utilisateur) : les autres familles restent dans `content/menu.json` mais ne sont plus rendues (liste `GROUPS` dans `build.mjs`). Images cartoon disponibles : Garibaldi et Bobby's GT ; les autres cartes affichent un verre dessiné en attendant. `aperol.png` du dossier partagé est le Virgin Aperol Spritz (sans alcool), il n'est donc pas utilisé pour le Royal Aperol Spritz.

`content/menu.json` = copie de la carte de `clients/pr09re55/content/menu.json` (noms, descriptions, prix, HU/EN/FR). Si la carte change, la mettre à jour dans les deux. `content/photos.json` : quelles boissons ont une grande carte avec image (les vins, spiritueux, snacks, eaux sont de simples lignes).

## Images des boissons
Déposer des PNG ou WebP **à fond transparent** dans `assets/img/drinks/` : `<slug>.webp` ou `<slug>.png`, le slug étant le nom anglais en minuscules, sans accents, avec des tirets (`volcan-margarita.png`). S'il existe `assets/img/drinks/manifest.json` (slug → nom de la boisson), il remplace le slug automatique. Taille conseillée : ~540 × 810 px, WebP (poids léger = QR code rapide). Une boisson sans image affiche un verre dessiné aux couleurs de sa famille ; la liste des boissons sans image est affichée à chaque construction.

## Ne rien inventer
Prix, noms et descriptions viennent uniquement de la carte imprimée. Note : la phrase du café maison indique 7 280 Ft en hongrois mais 8 010 Ft en anglais/français dans la source (`menu.json`) — à confirmer avec la cliente.

## Taille uniforme des illustrations

Toutes les images de `assets/img/drinks/` sont sur le même cadre 600×800 (fond transparent), boisson posée en bas, à **hauteur égale** (les plus larges, mugs et tumblers, sont limités en largeur). Pour ajouter une image : la détourer, puis lancer `python3 clients/progressmenu/tools/normalize-drink.py assets/img/drinks/<slug>.webp` (réécrit le fichier en place, garder l'original ailleurs).

## Vue éclatée 3D (test, Negroni)

Un clic sur la carte d'une boisson listée dans `content/photos.json` > `explode` ouvre une vue éclatée **en 3D temps réel** (Three.js) : l'illustration passe au centre, se remplace par le modèle 3D du cocktail (verre old fashioned, trois volumes liquides, glaçons, tranche d'orange, tous générés par code, aucun modèle ni texture à télécharger), puis tout se désassemble le long de l'axe central, chaque pièce avec son annotation. On peut faire tourner la vue au doigt/à la souris, toucher la scène ou le bouton pour reconstituer/décomposer, et fermer par la croix, Échap, le fond ou le bouton retour.

- **Chargement à la demande** : `assets/js/negroni3d.js` (~545 Ko, ~115 Ko compressé) n'est téléchargé qu'au clic sur la carte (préchargé au survol / au toucher). Le reste du menu ne charge rien de plus ; la boucle de rendu ne tourne que pendant que la vue est ouverte (résolution réduite automatiquement si la machine rame).
- **Repli** : sans WebGL, en cas d'échec de chargement ou de contexte perdu, la version SVG en couches s'affiche à la place. `prefers-reduced-motion` : pas d'animation, vue éclatée directe.
- **Reconstruire le bundle** : source dans `src3d/negroni3d.js`, puis `npm i --no-save three esbuild && node tools/build3d.mjs` (le bundle est versionné, Vercel n'exécute que `node build.mjs`).
- **Couches** : définies dans `explode` (de haut en bas) : `t` = `orange`, `ice`, `gin`, `campari`, `vermouth`, `glass` ; `n` = nom (texte ou `{hu,en,fr}`). Les noms d'ingrédients doivent figurer dans la description du menu (le build avertit sinon). Orange, glaçons et verre ne sont pas dans le texte du menu : ajoutés à la demande du client. Épaisseurs égales : ce ne sont pas des proportions de recette. Le modèle 3D est propre au Negroni (`create()` dans `src3d/negroni3d.js`) ; le généraliser à d'autres cocktails demande de décrire leurs pièces.
