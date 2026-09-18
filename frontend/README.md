# Makitii — Frontend (React + Vite)

Interface web de Makitii : parcours public des boutiques/produits, espace vendeur et espace admin.

## Stack technique

- React 19 + Vite
- React Router
- Tailwind CSS v4
- Axios

## Installation

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Configurer l'URL de l'API** : copiez `.env.example` en `.env` et ajustez si besoin :

   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

   (doit correspondre à l'URL de votre backend Laravel — sans `/api` à la fin)

3. **Démarrer le serveur de développement**

   ```bash
   npm run dev
   ```

   L'application est disponible sur `http://localhost:5173`.

4. **Build de production**

   ```bash
   npm run build
   ```

   Les fichiers statiques sont générés dans `dist/`.

## Structure du projet

```
src/
  assets/          -> logo et icônes de la marque Makitii
  components/       -> composants réutilisables (cartes, boutons, pagination...)
  context/          -> AuthContext (authentification, token, utilisateur courant)
  layouts/          -> mises en page (public, espace vendeur, espace admin)
  lib/api.js        -> client Axios configuré (token, gestion des erreurs)
  pages/
    Home.jsx, Stores.jsx, StoreDetail.jsx, Products.jsx, ProductDetail.jsx,
    Login.jsx, Register.jsx, NotFound.jsx
    vendor/          -> tableau de bord vendeur
    admin/           -> tableau de bord admin
```

## Parcours principaux

- **Visiteur** : accueil → boutiques/produits → fiche produit → bouton "Contacter sur WhatsApp"
  (ouvre `wa.me` avec un message pré-rempli mentionnant le produit et son prix).
- **Vendeur** : `/devenir-vendeur` pour créer son compte + sa boutique (statut "en attente"),
  puis `/tableau-de-bord` pour gérer son profil de boutique et ses produits une fois connecté.
- **Admin** : `/admin` pour valider/rejeter les boutiques, gérer les catégories et superviser les produits.

## Personnalisation de la marque

Les couleurs et polices de Makitii sont centralisées dans `src/index.css` (bloc `@theme`) :

- Vert `#009460`, Jaune `#fcd116`, Rouge `#ce1126` (charte officielle Makitii)
- Police principale : Montserrat
- Police décorative (slogan) : Dancing Script (alternative proche de la police "Balmoral" de la charte, non disponible sur Google Fonts)
