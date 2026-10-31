# PR09RE55 — site magazine et boutique (version 4, en cours)

Style (27/10/2026, d'après 2 images Pinterest choisies par l'utilisateur) : fond gris clair, gros titres Montserrat (fin + gras), titres étroits en capitales (Bebas Neue), photos en noir et blanc (couleur au survol ; la photo de la fiche produit reste en couleur), coins arrondis, boutons en pilule, aplats de couleur fluo posés sur les photos. Tout ce style est la dernière partie de `assets/css/site.css`. L'accueil s'ouvre sur un grand « pr09re55 » avec une photo et deux cartes (boissons / boutique). L'ancien style blanc à empattements est gardé dans `../magazine-v4-serif/`.

Site statique généré par un petit script Node, sans dépendance. Hongrois par défaut (`/`), anglais sous `/en/`.

## Lancer

```bash
node build.mjs            # version en ligne : liens propres (/bolt/…), dans dist/
node build.mjs --preview  # aperçu local ou claude.ai : liens relatifs vers index.html
cd dist && python3 -m http.server 8080
```

## Modifier le contenu (sans toucher au code)

Tout est dans `content/` :

| Fichier | Contenu |
|---|---|
| `site.json` | Avis Google (`reviews`) : extraits mot pour mot de vrais avis 5 étoiles, relevés sur Google le 31/10/2026 ; l'accueil en montre 5 à la fois et passe aux 5 suivants toutes les 7 s (pause au survol). Adresse, téléphone, réseaux, horaires, note Google (avec date de vérification), avis cités, presse. Bloc `reserve` : numéro WhatsApp qui reçoit les réservations (`whatsapp`) et, en option, une adresse d'envoi de formulaire (`formEndpoint`, par ex. FormSubmit) |
| `products.json` | `categories` : une image par catégorie pour la page Butik (assombrie au survol, nom au centre), chaque catégorie a sa page (`butik/parfum/`…). Produits : marque, nom HU/EN, prix (en Ft, ou `null` = « Ár kérésre »), stock, photos, couleur de fond, `bestseller` + `bestsellerOrder`, `featured` (sélection du mois), `demo` |
| `monthly.json` | Rubrique du mois : nom de la rubrique, numéro, titre, intro, marques |
| `cocktails.json` | Cocktails signatures (à remplir avec les infos du client). `classics` : les 3 cocktails de l'accueil, pris dans la carte (nom, ingrédients, prix) ; choix à confirmer par la cliente |
| `menu.json` | Itallap page par page, recopiée de la carte imprimée (photos du 26/10/2026, transcription dans `menu-transcription-2026-10-26.md`). La dernière page (`kind: "backjacket"`) est le dos noir : un clic dessus referme le livre. La première page (`kind: "jacket"`) est la couverture : fond noir façon toile, leur triangle en doré, comme la carte imprimée (photo du 27/10/2026). Chaque autre page : titre, sections, colonnes de prix (`100 ml` / `üveg`…), prix en Ft. Sur le site, elle se feuillette comme un livre (2 pages sur ordinateur, 1 sur téléphone). |
| `story.json` | Chapitres de l'histoire, avec leur statut : vérifié, à confirmer, manquant |
| `highlights.json` | Kiemelések szezonálisan (« highlights ») : les 2 cases noir et blanc en haut de l'accueil y mènent (`kiemelt/butik/`, `kiemelt/italok/`). Boutique : des produits de `products.json` ; boissons : des articles de la carte (`menu.json`, nom exact), dont le nom, les ingrédients et le prix sont repris tels quels. Photos provisoires, à remplacer par celles du client ; à changer à chaque saison. |
| `news.json` | Rubrique « Mi újság? / What's new? » : événements et nouveautés (date de début/fin, type, titre et texte HU/EN, photo facultative), triés par date ; le premier apparaît aussi sur l'accueil. Bloc `club` : texte de la Club Card. **Aucun avantage, remise ni condition de la Club Card n'est connu : ne rien inventer**, le texte renvoie vers la boutique. |

Photos du magazine pr09re55 (`assets/img/mag-*.webp`, reçues le 26/10/2026) : photos au téléphone de pages imprimées, redressées, détourées, nettoyées et agrandies (agrandissement classique, pas d'IA). Utilisées sur l'accueil (section magazine), en haut de la boutique et dans l'Histoire ; `mag-asztal` est prête mais pas encore placée. Photographes et droits à confirmer avec le client ; les fichiers d'origine des photographes donneraient un meilleur résultat.

Photos : les déposer dans `assets/img/` puis les citer par leur nom. Relancer `node build.mjs` : le script refuse de construire si un produit a un identifiant en double, une traduction manquante, un prix invalide ou une photo introuvable.

Mise à jour du mois : modifier `monthly.json`, cocher `featured`/`bestseller` dans `products.json`, relancer la construction. Une interface d'administration (par ex. Decap CMS sur ces mêmes fichiers) pourra être ajoutée une fois l'hébergement choisi : elle n'existe pas encore.

## Pages générées

Écran de chargement (triangle doré + petite barre, seulement à la première page de la visite, `sessionStorage` `pr09re55_seen`). Accueil, Butik / Boutique (`butik/`, `en/boutique/` : les images des catégories, puis une page par catégorie), Kiemelések / Highlights (2 pages), une page par produit, Kosár / Bag (réservation, hors sitemap et `noindex`), Kedvencek / Bestsellers, Koktélok / Cocktails, Itallap / Menu, Történet / Story, Mi újság? / What's new (`mi-ujsag/`, `en/whats-new/`). Chaque page a son URL dans les deux langues, `hreflang`, `canonical`, Open Graph, données structurées (BarOrPub sur l'accueil, Product sur les fiches ; l'offre de prix n'apparaît que si un prix est saisi). `sitemap.xml` et `robots.txt` sont générés.

## Ce qui est volontairement absent

- Paiement en ligne : aucun. Mode choisi le 26/10/2026 : réserver en ligne, retirer et payer en boutique. Chaque fiche produit a « Félreteszem, átvétel a boltban » ; le panier est gardé dans le navigateur du visiteur (`localStorage`, clé `pr09re55_bag`). La page Kosár envoie la demande par un message WhatsApp prérempli (le visiteur appuie lui-même sur Envoyer) ; si `formEndpoint` est rempli, elle l'envoie au formulaire et n'affiche « reçu » que si le serveur répond OK. La réservation n'est valable qu'une fois confirmée par la boutique. Aucun stock en temps réel, aucune base de données. Avant la mise en ligne : politique de confidentialité et conditions (ÁSZF) à rédiger, avec les vraies infos de l'entreprise.
- La fiche produit garde aussi « Üzenet Instagramon » et l'appel.
- Partage Instagram : le site copie le lien puis ouvre Instagram ; il ne publie rien automatiquement (impossible sans autorisations Meta).
- Logo : le logo original du client (tampon PDF reçu le 27/10/2026), vectorisé dans `assets/img/pr09re55-logo.svg` et intégré partout par la fonction `logo()` de `build.mjs` (couleur = celle du texte). Leur triangle reste en petit à côté (`MARK`). Ne pas remplacer par un logo redessiné.
- Tout contenu marqué « Mintaadat / Sample data » est temporaire.

## Hébergement (Vercel)

Ce dossier est un projet Vercel à part, distinct du site AiStudioBudapest, même s'il vit dans le même dépôt GitHub. Réglages du projet Vercel : *Root Directory* = `clients/pr09re55`, *Framework Preset* = Other ; le reste est lu dans `vercel.json` (construction `node build.mjs`, dossier publié `dist`). Chaque fusion sur `main` remet le site à jour.

Tant que le site n'est pas lancé officiellement, `vercel.json` envoie l'en-tête `X-Robots-Tag: noindex` (Google ne l'indexe pas : il contient encore des contenus provisoires). Au lancement, avec le nom de domaine du client : supprimer ce bloc `headers` et vérifier `baseUrl` dans `content/site.json`.
