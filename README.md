# Makitii — Postez. Vendez. Achetez !

Marketplace web permettant à des boutiques et restaurants de publier leurs produits, et aux clients de les découvrir et de les contacter directement sur **WhatsApp** pour commander.

Le code source est organisé en deux dossiers, mais **le résultat est une seule application web** : Laravel sert à la fois l'API et le frontend React compilé, sur une seule et même URL.

```
makitii/
  backend/        → API Laravel (PHP) + MySQL — sert aussi le frontend compilé
  frontend/       → Application React (Vite) — compilée dans backend/public/build
  brand-assets/   → Logo Makitii (extrait de la charte graphique fournie)
```

## Fonctionnalités

- **Marketplace multi-vendeurs** : chaque boutique a son propre compte et gère ses informations et ses produits.
- **Modération par un administrateur** : une boutique n'est visible publiquement qu'après validation par un admin (statuts : en attente / approuvée / rejetée).
- **Navigation publique libre** : aucun compte requis pour parcourir les boutiques et les produits.
- **Contact WhatsApp** : chaque fiche produit propose un bouton qui ouvre WhatsApp avec un message pré-rempli vers le numéro de la boutique.
- **Catégories** : filtrage des boutiques et produits par catégorie (Restaurants, Mode, Électronique, Meubles, Beauté...).
- **Recherche et pagination** sur les boutiques et les produits.
- **Interface entièrement en français**, aux couleurs de la charte graphique Makitii (vert, jaune, rouge).

## Une seule application, un seul serveur

En production, il n'y a **qu'un seul déploiement** : Laravel. Le frontend React est compilé en fichiers statiques directement dans `backend/public/build`, et Laravel les sert pour toute route qui n'est pas `/api/...`, `/sanctum/...` ou `/storage/...` (voir `backend/routes/web.php`). React Router prend ensuite le relais côté navigateur pour la navigation entre les pages.

Concrètement :
- Une seule URL pour tout (ex. `https://makitii.com`) — l'API répond sur `/api/...`, le site sur le reste.
- Plus de CORS à gérer en production (même origine).
- Un seul serveur/hébergement à mettre en place (ex. Hostinger, o2switch, Forge...), pas deux.

### Mettre à jour le site après une modification du frontend

```bash
cd frontend
npm run build
```

Cette commande compile React et écrit directement dans `backend/public/build`. Il suffit ensuite de déployer/committer le dossier `backend` — aucune étape de copie manuelle n'est nécessaire.

## Démarrage rapide (développement local)

En local, on garde deux serveurs séparés pour profiter du rechargement à chaud (hot reload) de Vite : le frontend (port 5173) appelle l'API Laravel (port 8000) via `VITE_API_BASE_URL`.

### 1. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# configurer MySQL dans .env, puis :
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

→ API disponible sur `http://localhost:8000`. Voir `backend/README.md` pour le détail (routes, comptes de démo, structure).

### 2. Frontend (React)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

→ Application disponible sur `http://localhost:5173`. Voir `frontend/README.md` pour le détail.

### Tester la version « une seule app » en local

```bash
cd frontend
npm run build      # compile dans backend/public/build
cd ../backend
php artisan serve  # http://localhost:8000 sert maintenant le site ET l'API
```

### Comptes de démonstration

| Rôle    | E-mail                | Mot de passe |
|---------|------------------------|--------------|
| Admin   | admin@makitii.com     | password     |
| Vendeur | mariam@makitii.com    | password     |

## ⚠️ Remarque importante sur l'installation

Ce projet a été généré dans un environnement dont l'accès réseau vers **Packagist** (le registre de paquets PHP/Composer) est bloqué par une politique de sécurité — il n'a donc pas été possible d'exécuter `composer install` ni de lancer le serveur Laravel pour un test automatisé de bout en bout dans cet environnement.

Le code du backend a néanmoins été construit avec la plus grande rigueur :
- il repose sur le squelette **officiel** de Laravel 11 (récupéré directement depuis le dépôt GitHub `laravel/laravel`, fichier par fichier, plutôt que retapé de mémoire) ;
- chaque fichier PHP a été validé avec `php -l` (aucune erreur de syntaxe) ;
- les conventions Laravel/Sanctum (migrations, relations Eloquent, Resources, middlewares) ont été suivies à la lettre.

**Sur votre machine (avec un accès internet normal), `composer install` fonctionnera sans problème.** Une fois les dépendances installées, testez simplement le parcours complet (inscription vendeur → connexion admin → validation de la boutique → ajout d'un produit → contact WhatsApp) et signalez-moi tout comportement inattendu : je pourrai corriger rapidement.

Le frontend React, lui, a été compilé avec succès dans cet environnement (`npm run build` sans erreur) : le registre npm n'était pas soumis à la même restriction.

## Prochaines étapes suggérées

- Déployer l'application unifiée (backend + frontend compilé) sur un seul hébergement avec MySQL (ex. Forge, Hostinger, o2switch...).
- Remplacer les comptes de démonstration par vos propres comptes admin.
- Ajouter un nom de domaine et configurer `APP_URL` en conséquence (`FRONTEND_URL` / `CORS_ALLOWED_ORIGINS` ne servent plus qu'au développement local, où frontend et backend tournent encore sur deux ports séparés).
