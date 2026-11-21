# Cahier des charges : modèle 3D photoréaliste du Negroni

**Projet :** menu des boissons de pr09re55 (Budapest), consulté en scannant un QR code sur téléphone.
**Livrable principal :** un fichier GLB temps réel du cocktail Negroni, avec ses composants séparés, pour une « vue éclatée » interactive.
**Version :** 1.0 — novembre 2026 — *English version : `cahier-des-charges-negroni-3d.en.md`*

---

## 1. Contexte et objectif

Dans le menu web, un clic sur le Negroni ouvre une vue 3D du cocktail. Le cocktail se démonte en composants (verre, trois liquides, glaçons, orange), qui flottent le long d'un axe vertical avec une étiquette chacun, puis se remontent à l'identique. Le visiteur peut faire tourner le modèle.

Le site (développé séparément) charge votre fichier GLB et le pilote : lumières, reflets d'environnement, ombre, déplacements et rotations des pièces. **Votre rôle est de produire le modèle 3D**, pas la page web. Le modèle actuel du site est un prototype généré par code ; il sera remplacé par le vôtre et n'est pas à imiter.

**Niveau de qualité attendu : photoréaliste.** Le rendu doit se rapprocher d'une photo publicitaire de cocktail, pas d'un modèle stylisé, simplifié ou « dessin animé ». La contrainte est que le modèle doit s'afficher en temps réel sur un téléphone, d'où les budgets techniques du chapitre 7.

## 2. Le cocktail de référence

- Negroni classique, servi sur glace dans un verre old fashioned (gobelet bas, droit, à fond épais).
- Texte du menu : *Bobby’s Dry Gin, Campari, Vermouth*.
- **Recette de référence : parts égales de gin, de Campari et de vermouth rouge (30 ml de chaque, soit 90 ml de liquide avant dilution)**, garniture d'orange. C'est la recette classique ; le bar doit confirmer la sienne (voir chapitre 12).
- Couleur de l'ensemble mélangé : rouge rubis profond, orangé en lumière traversante, translucide.

## 3. Objets à livrer (noms et rôle)

Chaque composant est **un objet séparé, nommé exactement comme ci-dessous**, placé à la racine de la scène (pas d'objet parent, pas de hiérarchie). Les noms sont provisoires et peuvent être adaptés d'un commun accord : le site les lit dans un fichier de configuration.

| Nom d'objet | Contenu | Obligatoire |
|---|---|---|
| `Glass` | Le verre old fashioned (une seule pièce, avec une vraie épaisseur) | oui |
| `Liquid_Vermouth` | Volume de liquide du bas (vermouth) | oui |
| `Liquid_Campari` | Volume de liquide du milieu (Campari) | oui |
| `Liquid_Gin` | Volume de liquide du haut (gin) | oui |
| `Ice_01` | Glaçon n° 1 | oui |
| `Ice_02`, `Ice_03` | Glaçons n° 2 et 3 | recommandé |
| `Orange_Slice` | Rondelle d'orange détaillée | oui |
| `Orange_Peel` | Zeste d'orange (lanière torsadée) | recommandé |

Aucun autre objet ne doit se trouver dans le fichier (pas de table, de fond, de lumière, de caméra ni d'objet décoratif) : tout objet supplémentaire resterait immobile pendant l'éclatement.

## 4. Dimensions, échelle et repères

- **Unité : le mètre** (1 unité Blender = 1 m). Axe vertical **Y vers le haut** dans le GLB (l'exporteur glTF de Blender convertit Z vers Y : cocher « +Y Up »). Face avant du modèle vers +Z.
- **Verre :** hauteur de **8,5 à 9 cm** (plage acceptée : 7 à 11 cm), diamètre extérieur au bord d'environ 7,5 à 8 cm, épaisseur de paroi réelle de **4 à 6 mm**, fond épais de **15 à 20 mm**. Verre droit et lisse, sans gravure ni facettes, sauf si une photo de référence fournie par le client montre autre chose.
- **Le bas du verre est à y = 0** et le verre est **centré sur l'axe vertical** (x = 0, z = 0).
- **Origine de chaque objet : au centre de sa boîte englobante**, ou à son centre de masse. Toutes les transformations (échelle, rotation) sont **appliquées** (échelle 1, rotation 0) avant l'export.
- **Niveau du liquide :** le liquide monte à environ 5,5 à 6 cm depuis la base, c'est-à-dire sous le bord, les glaçons dépassant du liquide.
- Tous les objets sont dans leur **position d'origine assemblée** dans le fichier livré : c'est à cette position que le site les ramène au remontage.

## 5. Spécifications par composant

### 5.1 Le verre (`Glass`)
- Vraie épaisseur de paroi et de fond, géométrie fermée : face extérieure, face intérieure, bord arrondi (rayon réel), pas de plan unique.
- Transparence réaliste : **IOR 1,5**, transmission 1, rugosité très faible (0,02 à 0,05), léger défaut de surface (micro-rayures, traces) sans salir le rendu.
- Le fond épais doit produire une vraie réfraction visible.
- Le verre ne contient aucune étiquette ni texte.

### 5.2 Les trois liquides (`Liquid_Vermouth`, `Liquid_Campari`, `Liquid_Gin`)
- **Volumes réalistes et proportions cohérentes avec un vrai Negroni : trois parts égales.** Ensemble, les trois volumes **reconstituent exactement le liquide du verre** : aucun jour, aucun chevauchement. Le calcul doit tenir compte des glaçons qui plongent dans le liquide.
- Ordre de bas en haut : vermouth, Campari, gin. Les trois volumes sont obtenus en **découpant le liquide par des plans horizontaux**, de sorte que leurs faces de contact soient planes et parfaitement jointes.
- Chaque volume est **fermé** (étanche), avec une face supérieure, une face inférieure et des côtés qui épousent l'intérieur du verre (sans le traverser). Le volume supérieur porte un **ménisque** léger le long de la paroi.
- Les parties de glaçon immergées sont **soustraites** des volumes (pas d'intersection de géométries).
- Chaque volume doit rester beau **vu seul**, en vue éclatée, vu légèrement de dessus et de dessous.
- Matières : liquide transparent (transmission, IOR 1,33 à 1,36, atténuation par épaisseur (`KHR_materials_volume`)). Couleur de chaque ingrédient en vue éclatée : **gin** quasi incolore (très léger reflet bleuté), **Campari** rouge vif translucide, **vermouth** ambre rougeâtre. En vue **assemblée**, l'ensemble doit se lire comme un seul Negroni rouge rubis : le chapitre 6 explique comment livrer les deux états de couleur.

### 5.3 Les glaçons (`Ice_01`, `Ice_02`, `Ice_03`)
- **Irréguliers et naturels** : arêtes arrondies par la fonte, faces légèrement bombées, fissures internes, bulles d'air et cœur légèrement nuageux. Pas de cubes parfaits.
- Transparence et reflets naturels : **IOR 1,31**, transmission élevée, surface humide et brillante.
- Trois formes différentes, de 2,5 à 3,2 cm environ, orientations variées, **posés dans le verre** sans traverser ses parois. Les parties immergées sont cohérentes avec le niveau du liquide.

### 5.4 L'orange (`Orange_Slice`, `Orange_Peel`)
- **`Orange_Slice` : rondelle détaillée**, diamètre 6 à 7 cm, épaisseur 4 à 6 mm : **peau** (zeste coloré avec texture de pores), **moelle blanche** (albedo), **quartiers** distincts (8 à 10) séparés par des membranes, **pulpe** avec vésicules de jus translucides et brillantes, cœur central. Léger relief côté coupe. Rendu translucide de la pulpe (transmission/volume ou texture de rétro-éclairage).
- Posée sur le bord du verre, légèrement inclinée, tenue par une entaille réaliste.
- **`Orange_Peel` : zeste** en lanière torsadée de 6 à 8 cm, face colorée avec pores et brillance d'huile essentielle, face blanche de moelle visible, extrémités coupées proprement. Posé dans le verre ou sur la rondelle, sans intersection.

## 6. Matières, lumière et textures

- **Format de matières : glTF 2.0 PBR (métal-rugosité)**, avec ces extensions seulement : `KHR_materials_transmission`, `KHR_materials_ior`, `KHR_materials_volume`, `KHR_materials_specular`, `KHR_materials_clearcoat`, `KHR_materials_emissive_strength`, `KHR_texture_transform`. Pas de nœuds de shader Blender non exportables : **vérifier l'export en rouvrant le GLB** (Blender, visionneuse glTF).
- **Pas de lumière, de reflet ni d'ombre « cuits » dans les textures** : le site éclaire le modèle lui-même (environnement de studio, reflets, ombre portée) et le fait tourner à 360°. Textures d'albedo propres, normales, rugosité, occlusion si besoin.
- **Textures :** maximum 2 048 × 2 048 px (1 024 recommandé pour tout sauf l'orange), formats **WebP, JPEG ou PNG** intégrés au GLB. **Le format KTX2/Basis n'est pas pris en charge.** Textures en espace colorimétrique correct (sRGB pour l'albedo, linéaire pour le reste).
- **Matières : 8 au maximum** dans le fichier, nommées (`M_Glass`, `M_Ice`, `M_Gin`, `M_Campari`, `M_Vermouth`, `M_OrangePeel`, `M_OrangePulp`...).
- **Couleurs des liquides, deux états.** Les matières du GLB sont celles de la **vue assemblée** (le mélange rouge rubis, chaque volume avec une teinte très proche). Pour la **vue éclatée**, fournir aussi, par liquide, la couleur de l'ingrédient et celle d'atténuation (valeurs hex dans le document de livraison). Le site fait glisser la couleur de l'un à l'autre pendant l'animation. Si le rendu ne fonctionne pas ainsi, voir le chapitre 12.

## 7. Budgets techniques (limites strictes)

| Élément | Limite |
|---|---|
| Poids du fichier GLB | **3 Mo maximum** ; cible **1,5 Mo** |
| Triangles, total | **60 000 maximum** ; cible 35 000 à 45 000 |
| Répartition indicative | verre ≤ 10 000 ; chaque liquide ≤ 6 000 ; chaque glaçon ≤ 4 000 ; rondelle ≤ 12 000 ; zeste ≤ 4 000 |
| Textures | 2 048 px maximum, WebP/JPEG/PNG |
| Compression de géométrie | **Meshopt recommandé** (Draco accepté) |
| À exclure | animations, caméras, lumières, armatures/skins, textures externes |

Le modèle doit rester fluide sur un téléphone milieu de gamme : pas de milliers de triangles gaspillés sur des surfaces lisses, pas de géométrie cachée inutile. L'optimisation (suppression des faces invisibles, décimation, compression) fait partie du travail.

## 8. Comment le site anime le modèle (à connaître)

- Chaque objet est **rigide** et se déplace indépendamment : montée le long de l'axe vertical, léger arc latéral, rotation douce, puis retour exact à sa position d'origine. Le verre descend ; les autres montent par ordre (zeste, rondelle, glaçons, gin, Campari, vermouth).
- Le visiteur peut faire pivoter la vue à 360°, de face, de dessus ou de dessous légèrement : **tous les objets doivent être beaux sous tous les angles**, y compris leurs faces cachées en vue assemblée (dessous des glaçons, fond des volumes de liquide).
- Aucune intersection entre objets dans l'état assemblé.

## 9. Livrables

1. `negroni.glb` : le modèle final, tel que décrit ci-dessus.
2. **Le fichier Blender source (`.blend`)**, organisé (collections nommées, textures intégrées), avec la version de Blender indiquée.
3. **Rendus de validation (PNG, 2 400 px de large minimum)** : vue **assemblée** (face, 3/4, dessus) et vue **éclatée** (face, 3/4, dessus), avec les pièces séparées le long de l'axe vertical, fond neutre.
4. Les textures sources (fichiers de travail) et la liste des matières avec leurs couleurs (hex) en état assemblé et éclaté.
5. Une courte **note de livraison** : version de Blender, extensions utilisées, nombre de triangles par objet, éventuelles limites.
6. **Droits :** œuvre originale, droits d'exploitation complets pour le client (usage commercial, modification). Toute ressource tierce (texture, modèle) doit être déclarée et libre de droits pour cet usage.

## 10. Étapes et validation visuelle

**Aucune intégration définitive sur le site avant la validation écrite du client, après examen visuel des vues assemblée ET éclatée.**

1. **Questions et références** : l'artiste valide la liste des points ouverts (chapitre 12) avec le client.
2. **Étape A : volumes en gris (blocage).** Formes et proportions de tous les objets, vue assemblée et vue éclatée en rendu gris. Validation du client : proportions, parts égales, silhouette.
3. **Étape B : matières et rendus.** Rendus photoréalistes (chapitre 9, point 3) des vues assemblée et éclatée. **Validation visuelle du client des deux vues.**
4. **Étape C : GLB optimisé.** Export, compression, vérification des budgets.
5. **Étape D : contrôle automatique et aperçu privé.** Le développeur exécute `node tools/glb-check.mjs negroni.glb` (noms, poids, triangles, échelle, position) et ouvre le modèle dans un aperçu privé du menu, hors ligne publique. Le client valide à nouveau les deux vues dans le vrai site.
6. **Étape E : intégration définitive**, après accord écrit du client.

Le nombre de tours de corrections par étape est à fixer avec le client lors de la commande.

## 11. Critères de validation (liste de contrôle)

- [ ] Noms d'objets exacts, tous à la racine, aucun objet en trop.
- [ ] Échelle en mètres, verre de 7 à 11 cm de haut, bas à y = 0, centré sur l'axe, transformations appliquées.
- [ ] Origine de chaque objet à son centre.
- [ ] Trois liquides en parts égales, étanches, jointifs, sans chevauchement, sans traverser le verre ni les glaçons.
- [ ] Glaçons irréguliers, transparents, avec reflets naturels et défauts internes.
- [ ] Verre : vraie épaisseur, fond épais, réfraction et reflets convaincants.
- [ ] Orange : peau, moelle, quartiers et pulpe visibles ; zeste détaillé.
- [ ] Rendus assemblé et éclaté fournis et validés par le client.
- [ ] Poids ≤ 3 Mo, triangles ≤ 60 000, textures ≤ 2 048 px, pas de KTX2.
- [ ] Aucune animation, caméra, lumière ni armature ; aucune lumière cuite dans les textures.
- [ ] Le contrôle automatique `node tools/glb-check.mjs` indique « fichier utilisable » sans avertissement bloquant.
- [ ] Lisible et élégant sous tous les angles de rotation.
- [ ] Fichier `.blend`, textures sources et note de livraison fournis.

## 12. Points ouverts (valeur par défaut proposée, à confirmer par le client)

1. **Recette du bar :** parts égales 30/30/30 ml par défaut. Le bar peut utiliser d'autres proportions ; à confirmer.
2. **Forme exacte du verre :** gobelet droit à fond épais par défaut. Le client peut fournir une photo du verre utilisé au bar.
3. **Couleurs des liquides :** en vue assemblée, le mélange a une teinte unique (comme un vrai Negroni) ; en vue éclatée, chaque ingrédient reprend sa couleur. **Variante :** si le client préfère voir trois couches colorées distinctes dès la vue assemblée, les trois matières restent celles de chaque ingrédient (moins réaliste, mais plus lisible). À trancher avant l'étape B.
4. **Garniture :** rondelle d'orange sur le bord + zeste, ou rondelle seule. Le zeste est facultatif (objet `Orange_Peel`).
5. **Gin :** le menu cite « Bobby’s Dry Gin » ; aucune marque, étiquette ni bouteille n'apparaît dans le modèle.

## 13. Contact et échanges techniques

Le développeur du site fournit à l'artiste, sur demande :
- le fichier de configuration `content/negroni-model.json` (noms d'objets, déplacements, limites) ;
- un contrôle automatique de chaque fichier reçu (`node tools/glb-check.mjs negroni.glb`, lancé par le développeur à réception ; il peut aussi être lancé par l'artiste s'il dispose de Node.js) ;
- un retour sur l'aperçu privé de chaque version livrée.

Tout écart avec ce cahier (noms, budgets, échelle) est à signaler avant production, pour adapter le site plutôt que découvrir un problème à la livraison.
