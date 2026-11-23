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

## Vue éclatée 3D (Negroni et Paradise GT)

Un clic sur la carte d'une boisson listée dans `content/photos.json` > `explode` ouvre une vue éclatée **en 3D temps réel** (Three.js) : l'illustration passe au centre, se remplace par le modèle 3D du cocktail (verre old fashioned, trois volumes liquides, glaçons, tranche d'orange, tous générés par code, aucun modèle ni texture à télécharger), puis tout se désassemble le long de l'axe central, chaque pièce avec son annotation. On peut faire tourner la vue au doigt/à la souris, toucher la scène ou le bouton pour reconstituer/décomposer, et fermer par la croix, Échap, le fond ou le bouton retour.

- **Chargement à la demande** : `assets/js/negroni3d.js` (~570 Ko, ~120 Ko compressé ; le fichier contient les deux scènes) n'est téléchargé qu'au clic sur la carte (préchargé au survol / au toucher). Le reste du menu ne charge rien de plus ; la boucle de rendu ne tourne que pendant que la vue est ouverte (résolution réduite automatiquement si la machine rame).
- **Repli** : sans WebGL, en cas d'échec de chargement ou de contexte perdu, la version SVG en couches s'affiche à la place. `prefers-reduced-motion` : pas d'animation, vue éclatée directe.
- **Reconstruire le bundle** : source dans `src3d/negroni3d.js`, puis `npm i --no-save three esbuild && node tools/build3d.mjs` (le bundle est versionné, Vercel n'exécute que `node build.mjs`).
- **Couches** : `explode` associe chaque boisson à `{ "scene": "negroni" | "paradise", "layers": [...] }` (de haut en bas, dans l'ordre de la scène 3D) ; `t` = type de couche, `n` = nom (texte ou `{hu,en,fr}`). Negroni : `orange`, `ice`, `gin`, `campari`, `vermouth`, `glass`. Paradise GT : `straw`, `dorange`, `flowers`, `ice`, `tonic`, `gin`, `balloon`. Les noms d'ingrédients écrits tels quels doivent figurer dans la description du menu (le build avertit sinon). Pas dans le texte du menu, repris de l'illustration ou ajoutés à la demande du client : orange, glaçons, verre (Negroni) ; paille dorée, rondelle d'orange séchée, glaçons, verre ballon (Paradise GT). Épaisseurs égales : ce ne sont pas des proportions de recette. Chaque scène est une fonction de `src3d/negroni3d.js` (`negroni()`, `paradise()`) ; en ajouter une pour un autre cocktail demande de décrire ses pièces.

## Vue éclatée « photo » du Negroni (images pré-calculées dans Blender)

Depuis le 23/11/2026, la carte du Negroni ouvre une vue éclatée **photoréaliste** : 48 images calculées dans Blender (Cycles, gestion des couleurs AgX, scène et scripts dans `render/negroni/` à la racine du dépôt) et une image du cocktail assemblé avec le même cadrage. L'illustration de la carte reste la même que pour les autres boissons.

- **Déroulé** : l'illustration quitte la carte et se pose exactement sur le verre de la photo, se fond dans la photo du cocktail assemblé pendant que le fond passe au noir, puis la boisson se décompose (les pièces du haut partent en premier). Les noms apparaissent quand chaque pièce est en place : vrai texte traduit (HU/EN/FR, noms de `content/photos.json`), en capitales fines couleur champagne, positionnés d'après les repères du rendu (`seq.json`). Bouton ou toucher : décomposer / reconstituer ; glisser vers le haut ou le bas : faire avancer ou reculer l'animation. Fermer : la boisson se reconstitue, la photo redevient l'illustration, qui retourne dans sa carte.
- **Chargement** : rien n'est téléchargé tant que la carte n'est pas ouverte, sauf l'image du cocktail assemblé (une vingtaine de Ko) quand la carte approche de l'écran. Au survol à la souris, les images sont préchargées. Téléphone : série 720 px ; écran plus grand : série 1080 px. Les images décodées sont libérées 30 s après la fermeture. Économiseur de données activé : vue 3D.
- **Repli** : si une image ne se charge pas, la vue 3D actuelle prend le relais, puis la version dessinée (sans WebGL). Sans le dossier `assets/seq/negroni/` (ou s'il est incomplet), le build garde la vue 3D et l'indique.
- **Mettre à jour les images** : relancer le calcul (`render/negroni/job.json`, voir le README de ce dossier), puis `python3 clients/progressmenu/tools/import-seq.py` (copie `render/negroni/out/eclate-seq/` dans `assets/seq/negroni/` et écrit `seq.json`) et `node build.mjs`. `content/photos.json` > `explode.Negroni.seq.cartoon` donne la position du verre dans l'illustration de la carte, pour que le fondu tombe juste.
- Paradise GT garde la vue 3D temps réel.

## Modèle 3D professionnel du Negroni (GLB) : préparation

Le Negroni actuel (scène générée par code) reste affiché **tant qu'aucun GLB valide n'est présent** : rien ne change côté public. Quand l'artiste 3D livre son fichier, il suffit de le déposer ; aucun code à toucher.

- **Cahier des charges pour l'artiste** (à transmettre tel quel) : `docs/cahier-des-charges-negroni-3d.fr.md` et `docs/cahier-des-charges-negroni-3d.en.md` (noms d'objets, matériaux, dimensions, budgets, livrables, étapes et validation visuelle).
- **Configuration** : `content/negroni-model.json` — noms d'objets (provisoires, faciles à adapter), étiquettes hu/en/fr, limites de poids, déplacement par pièce (hauteur, arc, rotation, fenêtre de temps, variantes par glaçon), couleurs optionnelles assemblé/éclaté pour les liquides (`tint`). Unités de déplacement : hauteurs de verre.
- **Déposer le modèle** : `assets/models/negroni.glb`, puis `node build.mjs`. Le build contrôle le fichier (noms, poids, triangles, textures, échelle) : s'il est refusé, il est **ignoré avec un message** et le Negroni actuel reste.
- **Contrôle seul** : `node tools/glb-check.mjs fichier.glb` (code de sortie 1 si refusé).
- **Aperçu privé, sans rien publier** : `node tools/glb-preview.mjs fichier.glb` construit `dist/` (local) avec ce GLB et le sert sur http://localhost:5180/. Sert à la validation visuelle assemblé/éclaté avant tout dépôt dans `assets/models/`.
- **Fichier de test** : `node tools/make-test-glb.mjs sortie.glb` fabrique un GLB minimal de formes géométriques pour tester la chaîne. Ce n'est **pas** un modèle du Negroni : ne jamais le mettre dans `assets/models/`.
- **Fonctionnement** : `src3d/glbview.js` (bundle `assets/js/glbview.js`, chargé au clic seulement, et seulement si un GLB est présent) charge le GLB (Meshopt, Draco via `assets/vendor/draco/`), range chaque objet dans un pivot qui garde sa position d'origine exacte, l'anime avec la configuration, ajoute éclairage de studio procédural (reflets), ombre de contact et mise à l'échelle (la hauteur du verre devient une taille fixe, sans déformer le modèle). Toucher une pièce la met en avant (étiquette surlignée). Échec de chargement, nom d'objet manquant ou WebGL absent : retour à la scène actuelle, puis à la version dessinée. Les textures KTX2 ne sont pas prises en charge.
- **Réglage des trajectoires** : à faire quand le vrai modèle est là (positions d'origine des liquides, du verre…), en modifiant uniquement `negroni-model.json`.
- Reconstruire les bundles : `node tools/build3d.mjs` (deux points d'entrée qui partagent un morceau Three.js dans `assets/js/chunks/`).
