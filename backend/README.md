# Makitii — Backend (API Laravel)

API REST pour Makitii, la marketplace qui connecte boutiques/restaurants et clients, avec prise de contact directe via WhatsApp.

## Stack technique

- Laravel 11 (PHP 8.2+)
- MySQL
- Laravel Sanctum (authentification par token pour l'API)
- Stockage des images via le disque `public` de Laravel

## Installation

1. **Installer les dépendances PHP**

   ```bash
   composer install
   ```

2. **Copier le fichier d'environnement et générer la clé d'application**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configurer la base de données** dans `.env` :

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=makitii
   DB_USERNAME=root
   DB_PASSWORD=
   ```

   Créez la base `makitii` dans MySQL au préalable :

   ```sql
   CREATE DATABASE makitii CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Configurer l'URL du frontend** (pour CORS) dans `.env` :

   ```
   FRONTEND_URL=http://localhost:5173
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

5. **Lancer les migrations et les données de démonstration**

   ```bash
   php artisan migrate --seed
   ```

6. **Créer le lien symbolique de stockage** (nécessaire pour que les images uploadées soient accessibles publiquement) :

   ```bash
   php artisan storage:link
   ```

7. **Démarrer le serveur de développement**

   ```bash
   php artisan serve
   ```

   L'API est alors disponible sur `http://localhost:8000/api`.

## Comptes de démonstration (créés par le seeder)

| Rôle       | E-mail                     | Mot de passe |
|------------|-----------------------------|--------------|
| Admin      | admin@makitii.com          | password     |
| Vendeur    | mariam@makitii.com         | password     |
| Vendeur    | ibrahima@makitii.com       | password     |
| Vendeur    | fatoumata@makitii.com      | password     |

(voir `database/seeders/DemoSeeder.php` pour la liste complète — boutiques approuvées, une en attente et une rejetée, pour tester tous les cas)

**Pensez à changer ces mots de passe / supprimer ces comptes avant une mise en production.**

## Structure du projet

```
app/
  Http/
    Controllers/
      Auth/        -> inscription / connexion
      Public/       -> endpoints publics (catégories, boutiques, produits)
      Vendor/        -> espace vendeur (gestion de sa boutique et ses produits)
      Admin/        -> espace admin (validation des boutiques, catégories, stats)
    Middleware/
      EnsureUserHasRole.php  -> middleware `role:admin` / `role:vendor`
    Resources/       -> transformation des modèles en JSON
  Models/           -> User, Store, Category, Product, ProductImage
database/
  migrations/
  seeders/
routes/
  api.php           -> toutes les routes de l'API
```

## Aperçu des routes principales

Publiques (aucune authentification) :
- `GET /api/categories`
- `GET /api/stores` (recherche `?search=`, filtre `?category_id=`, pagination `?page=`)
- `GET /api/stores/{slug}`
- `GET /api/products` (mêmes filtres)
- `GET /api/products/{id}`
- `POST /api/register` (inscription vendeur + création boutique en attente)
- `POST /api/login`

Espace vendeur (`Authorization: Bearer {token}`, rôle `vendor`) :
- `GET/PUT /api/vendor/store`
- `POST /api/vendor/store/logo`, `POST /api/vendor/store/cover`
- `GET/POST /api/vendor/products`, `POST /api/vendor/products/{id}` (mise à jour), `DELETE /api/vendor/products/{id}`
- `DELETE /api/vendor/products/{id}/images/{imageId}`

Espace admin (rôle `admin`) :
- `GET /api/admin/stats`
- `GET /api/admin/stores`, `PUT /api/admin/stores/{id}/approve`, `PUT /api/admin/stores/{id}/reject`
- `GET/POST/PUT/DELETE /api/admin/categories`
- `GET/DELETE /api/admin/products`

## Notes importantes

- L'authentification utilise des **tokens Sanctum** (`Authorization: Bearer <token>`), pas de cookies/session — cela simplifie l'intégration avec le frontend React servi sur un port différent.
- Une boutique nouvellement créée a le statut `pending` et n'apparaît **pas** dans les listes publiques tant qu'un administrateur ne l'a pas approuvée.
- Les mises à jour de produits avec upload d'images utilisent `POST` (et non `PUT`) car PHP ne parse pas nativement les requêtes `multipart/form-data` en `PUT`.
