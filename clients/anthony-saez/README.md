# Anthony Saez — site portfolio (photo · film · property styling)

Site statique **Next.js + React + TypeScript + Tailwind**, en 3 langues : anglais (par défaut, à la racine `/`), français (`/fr/`) et hongrois (`/hu/`). Projet Vercel **séparé** de celui d'AiStudioBudapest (comme `clients/pr09re55`).

## Voir le site

```bash
cd clients/anthony-saez
npm install
npm run dev        # http://localhost:3000
npm run build      # génère le site complet dans out/
```

## Remplacer les images (le plus important)

Toutes les images actuelles sont des **illustrations provisoires** générées par `tools/make-placeholders.py` (aucun droit d'auteur, aucune vraie personne). Pour les remplacer : déposer vos photos **avec le même nom de fichier** dans `public/images/` (ou changer le chemin dans le fichier de contenu).

| Fichier | Où il apparaît |
|---|---|
| `public/images/site/hero.jpg` (2400×1350) | grand visuel d'accueil |
| `public/images/site/about-portrait.jpg` (1200×1500) | portrait de la page « À propos » |
| `public/images/site/og.jpg` (1200×630) | aperçu sur WhatsApp, Facebook, LinkedIn |
| `public/images/areas/real-estate.jpg`, `portraits.jpg`, `business.jpg`, `hospitality.jpg` | les 4 grands blocs (accueil, services) |

Conseils : JPEG, 2000 px de large maximum, 300 à 500 Ko par image (le site reste rapide). Une fois les vrais visuels en place, passez `"temporaryImages"` à `false` dans `content/site.json` (retire la mention « images provisoires » du pied de page). Les domaines Business et Hospitality gardent le badge « Image illustrative » tant qu'ils n'ont pas de vrais projets.

## Ajouter un projet au portfolio

1. Créer un dossier `public/portfolio/mon-projet/` et y déposer les photos.
2. Copier `content/projects/sample-property-transformation.json` (transformation d'un bien) ou `sample-portrait-series.json` (portraits) vers `content/projects/mon-projet.json`.
3. Modifier le texte : chaque texte existe en `en`, `fr`, `hu`. Mettre `"placeholder": false` (ou supprimer la ligne), `"slug"` = le nom du fichier sans `.json`, `"category"` = `real-estate` ou `portraits`, `"featured": true` pour l'afficher sur l'accueil.
4. Pour un projet de transformation : remplir `before`, `transformation` (avec `steps`), `after`, `beforeAfter` (curseur avant/après) et `film`. Les rubriques absentes ne s'affichent pas.
5. Vidéo : coller le lien YouTube ou Vimeo dans `film.video.url` (elle ne se charge qu'au clic), ou déposer un `.mp4` léger dans `public/` et mettre son chemin (`/portfolio/mon-projet/film.mp4`).
6. Les deux projets d'exemple (`placeholder: true`) sont à supprimer une fois les vrais projets ajoutés.

Les fichiers dont le nom commence par `_` sont ignorés.

## Réglages (`content/site.json`)

| Champ | Rôle |
|---|---|
| `baseUrl` | adresse finale du site (SEO, sitemap, aperçus) — à mettre à jour avec le vrai domaine |
| `email`, `phone`, `instagram` | affichés dans le pied de page et la page Contact **seulement s'ils sont remplis** (rien n'est inventé) |
| `formEndpoint` | adresse qui reçoit le formulaire de contact (voir ci-dessous) |
| `heroVideo` | chemin d'une vidéo d'accueil en boucle (ex. `/video/hero.mp4`, ≤ 3 Mo conseillé) ; vide = image |
| `analytics.googleAnalyticsId` | identifiant `G-XXXXXXX` pour activer Google Analytics |
| `analytics.googleSearchConsoleToken` | code de vérification Google Search Console |

## Formulaire de contact

Le formulaire vérifie les champs (nom, e-mail, message) et envoie en JSON vers `formEndpoint`. Tant qu'il est vide, le formulaire est en **mode aperçu** : il affiche un message clair et n'envoie rien. Pour le brancher en 2 minutes : créer un compte gratuit sur FormSubmit (`https://formsubmit.co/ajax/VOTRE@EMAIL`) ou Formspree, copier l'adresse dans `formEndpoint`, envoyer un premier message pour activer. Un vrai service d'e-mail (Resend, etc.) pourra remplacer cela plus tard sans toucher au reste.

## Modifier les textes

Tous les textes de l'interface sont dans `content/i18n/en.json`, `fr.json`, `hu.json` (même structure dans les trois : toujours modifier les trois). Le contenu des 4 services (description, bénéfices, livrables) est aussi dans ces fichiers, sous `services.items`. Aucun prix n'est affiché : devis sur demande.

## Règles de contenu

Ne jamais inventer de clients, avis, récompenses ni références. Business & Corporate et Hospitality & Gastronomie sont présentés comme des **services en développement**, séparés des travaux existants, avec des images marquées « illustratives ».

## SEO

Titres et descriptions par page et par langue, liens `hreflang`, `canonical`, Open Graph, données structurées (ProfessionalService, Budapest), `sitemap.xml`, `robots.txt`, textes alternatifs, chargement différé des images. Le site est en `noindex` (en-tête dans `vercel.json`) **tant qu'il n'est pas lancé** : retirer le bloc `headers` de `vercel.json` au lancement.

## Publier (Vercel)

1. Fusionner la PR sur GitHub (« Merge pull request » puis « Confirm merge »).
2. Sur vercel.com : **Add New… → Project**, choisir le dépôt `AiStudioBudapest/ASB`.
3. **Root Directory** : `clients/anthony-saez`. Le reste est lu dans `vercel.json` (Next.js détecté automatiquement). Cliquer **Deploy**.
4. Domaine : **Settings → Domains**, ajouter le domaine acheté, puis recopier chez le vendeur les réglages DNS que Vercel affiche. Mettre ce domaine dans `baseUrl`.
5. Au lancement : retirer le `noindex`, ajouter le site dans Google Search Console (jeton dans `site.json`), envoyer `/sitemap.xml`.

## Contrôle mobile / tablette

```bash
npm run build && node ../../scripts/check-mobile.mjs --dir out
```
Le même contrôle tourne automatiquement sur chaque PR (`.github/workflows/mobile-check.yml`). Toute grille doit rester une colonne sur mobile (règle de base dans `app/globals.css`) ; ne pas retirer.
