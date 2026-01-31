# 🌿 Souk Beyrouth - Épicerie Fine Libanaise

Site vitrine statique pour une épicerie fine libanaise authentique.

## 📋 Description

**Souk Beyrouth** est un site vitrine statique pour une épicerie fine libanaise. Le site présente les produits, l'histoire de l'entreprise, des recettes authentiques et permet aux clients de contacter l'équipe.

### Fonctionnalités principales

- 🏠 **Page d'accueil** avec hero, produits phares et présentation de l'entreprise
- 🛍️ **Catalogue** avec filtres par catégorie et panier localStorage
- 📝 **Blog** avec recettes et actualités
- 👥 **Page À Propos** avec l'histoire et les valeurs
- 📞 **Page Contact** avec formulaire et FAQ
- 🛒 **Panier** fonctionnel avec localStorage (simulation)
- 📱 **Responsive** mobile-first
- ♿ **Accessibilité** (ARIA labels, contrastes)

## 🚀 Installation et utilisation

### Prérequis

- Un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (optionnel, pour le développement)

### Installation

1. **Cloner ou télécharger le projet**
   ```bash
   git clone <url-du-projet>
   cd souk-beyrouth
   ```

2. **Ouvrir le site**
   
   **Option A : Double-clic (simple)**
   - Ouvrez le fichier `index.html` dans votre navigateur
   
   **Option B : Serveur local (recommandé)**
   ```bash
   # Avec Python 3
   python -m http.server 8000
   
   # Avec Node.js (http-server)
   npx http-server -p 8000
   
   # Avec PHP
   php -S localhost:8000
   ```
   Puis accédez à `http://localhost:8000`

## 📁 Structure du projet

```
souk-beyrouth/
├── index.html              # Page d'accueil
├── README.md               # Ce fichier
├── css/
│   ├── variables.css       # Variables CSS (couleurs, typographie)
│   ├── base.css            # Styles de base et reset
│   ├── components.css      # Composants UI (boutons, cartes, formulaires)
│   ├── layout.css          # Layout (header, footer, grille)
│   └── pages/
│       ├── home.css        # Styles page d'accueil
│       ├── catalogue.css   # Styles page catalogue
│       ├── blog.css        # Styles page blog
│       ├── a-propos.css    # Styles page À Propos
│       └── contact.css     # Styles page Contact
├── js/
│   ├── utils.js            # Fonctions utilitaires
│   ├── cart.js             # Gestion du panier localStorage
│   ├── main.js             # Script principal
│   └── pages/
│       ├── home.js         # Scripts page d'accueil
│       ├── catalogue.js    # Scripts page catalogue
│       ├── blog.js         # Scripts page blog
│       └── contact.js      # Scripts page Contact
├── data/
│   ├── products.json       # Données des produits
│   └── blog.json           # Données des articles
├── pages/
│   ├── catalogue.html      # Page catalogue
│   ├── blog.html           # Page blog
│   ├── a-propos.html       # Page À Propos
│   └── contact.html        # Page Contact
└── assets/
    ├── images/             # Images (placeholder Unsplash)
    └── fonts/              # Fonts (Google Fonts via CDN)
```

## 🎨 Design System

### Palette de couleurs

| Couleur | Code | Utilisation |
|---------|------|-------------|
| Vert cèdre | `#00665E` | Primaire, boutons, liens |
| Terre cuite | `#C65D3B` | Secondaire, accents |
| Or vieilli | `#D4AF37` | Highlights, badges |
| Crème | `#FDF8F3` | Fond principal |
| Anthracite | `#2C2C2C` | Texte principal |

### Typographie

- **Titres** : Playfair Display (serif élégant)
- **Corps** : Inter (sans-serif lisible)

## 📝 Modification des données

### Ajouter/Modifier des produits

Éditez le fichier `data/products.json` :

```json
{
  "id": 13,
  "name": "Nouveau Produit",
  "category": "epicerie",
  "categoryLabel": "Épicerie",
  "description": "Description du produit",
  "price": 15.90,
  "unit": "500g",
  "origin": "Beyrouth, Liban",
  "image": "https://images.unsplash.com/...",
  "badge": "new", // "new", "bestseller", ou null
  "badgeLabel": "Nouveau",
  "clickCollect": true,
  "stock": 50
}
```

### Ajouter/Modifier des articles de blog

Éditez le fichier `data/blog.json` :

```json
{
  "id": 7,
  "title": "Titre de l'article",
  "slug": "titre-article",
  "category": "recettes",
  "categoryLabel": "Recettes Saisonnières",
  "excerpt": "Résumé de l'article...",
  "content": "Contenu complet...",
  "image": "https://images.unsplash.com/...",
  "author": "Nour",
  "date": "2024-01-30",
  "readTime": "5 min",
  "featured": true
}
```

## 🔧 Configuration du formulaire de contact

Le formulaire de contact utilise **Formspree** par défaut.

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire et récupérez votre ID
3. Remplacez `YOUR_FORM_ID` dans `pages/contact.html` :
   ```html
   <form action="https://formspree.io/f/VOTRE_ID" method="POST">
   ```

**Alternative : Netlify Forms**
Si vous déployez sur Netlify, ajoutez simplement `netlify` à votre formulaire :
```html
<form name="contact" netlify>
```

## 🛒 Fonctionnement du panier

Le panier fonctionne entièrement en **frontend** avec localStorage :

1. Les produits sont ajoutés au panier via JavaScript
2. Les données sont stockées dans le navigateur (localStorage)
3. Le badge du panier se met à jour automatiquement
4. **Important** : La finalisation de commande redirige vers la page contact

Pour connecter à une vraie solution de paiement :
- Intégrez Shopify Buy Button
- Utilisez Snipcart
- Développez une API backend

## 🚀 Déploiement

### Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier du projet
3. Votre site est en ligne !

### Vercel

1. Installez Vercel CLI : `npm i -g vercel`
2. Dans le dossier projet : `vercel`
3. Suivez les instructions

### GitHub Pages

1. Poussez le projet sur GitHub
2. Allez dans Settings > Pages
3. Sélectionnez la branche main
4. Votre site est disponible sur `https://votre-username.github.io/souk-beyrouth`

### FTP classique

1. Compressez tous les fichiers
2. Envoyez-les sur votre serveur via FTP
3. Le site est accessible à la racine de votre domaine

## 🔮 Connexion future à l'app de vente

Ce site est conçu comme un **site vitrine statique**. Pour connecter à une application de vente :

1. **Option recommandée** : Intégrez Shopify Buy Button
   - Créez un compte Shopify
   - Générez un Buy Button
   - Intégrez le code dans les pages produits

2. **Option alternative** : Utilisez Snipcart
   - Ajoutez le script Snipcart
   - Ajoutez des attributs `data-item-*` aux boutons

3. **Option développement** : Créez une API
   - Développez un backend (Node.js, Python, etc.)
   - Connectez-le au frontend via fetch API

## ♿ Accessibilité

Le site respecte les bonnes pratiques d'accessibilité :
- Attributs ARIA sur les éléments interactifs
- Contraste de couleurs conforme WCAG AA
- Navigation au clavier possible
- Images avec attributs alt
- Formulaires avec labels associés

## 📱 Responsive

Le site est responsive et s'adapte à tous les écrans :
- Mobile : < 640px
- Tablette : 640px - 1024px
- Desktop : > 1024px

## 🐛 Dépannage

### Les images ne s'affichent pas
- Vérifiez votre connexion internet (images Unsplash)
- Vérifiez que vous utilisez un serveur local (pas file://)

### Le panier ne fonctionne pas
- Vérifiez que localStorage est activé dans votre navigateur
- Ouvrez la console (F12) pour voir les erreurs

### Les filtres ne fonctionnent pas
- Vérifiez que le fichier `data/products.json` est accessible
- Vérifiez la console pour les erreurs de chargement

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 👥 Crédits

- Design & Développement : Souk Beyrouth
- Images : Unsplash
- Icônes : Lucide (via SVG)
- Fonts : Google Fonts (Playfair Display, Inter)

---

**Souk Beyrouth** - L'authenticité libanaise livrée chez vous 🇱🇧
