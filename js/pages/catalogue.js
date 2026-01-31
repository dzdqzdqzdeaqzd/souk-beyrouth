/**
 * ============================================
 * SOUK BEYROUTH - Page Catalogue
 * Scripts spécifiques au catalogue
 * ============================================
 */

let allProducts = [];
let categories = [];
let currentFilter = 'all';

ready(async () => {
  // Charger les données
  await loadCatalogueData();
  
  // Initialiser les filtres
  initFilters();
  
  // Vérifier s'il y a un paramètre de catégorie dans l'URL
  const params = getUrlParams();
  if (params.category) {
    filterProducts(params.category);
  } else {
    renderProducts(allProducts);
  }
  
  // Ouvrir le panier si hashtag #cart
  if (window.location.hash === '#cart') {
    setTimeout(showCartModal, 500);
  }
});

/**
 * Charge les données du catalogue
 */
async function loadCatalogueData() {
  const data = await loadJSON('../data/products.json');
  if (data) {
    allProducts = data.products || [];
    categories = data.categories || [];
  }
}

/**
 * Initialise les boutons de filtre
 */
function initFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container || categories.length === 0) return;
  
  container.innerHTML = categories.map(cat => `
    <button 
      class="filter-btn ${cat.id === 'all' ? 'active' : ''}" 
      data-category="${cat.id}"
      onclick="filterProducts('${cat.id}')"
    >
      <span class="icon">${cat.icon}</span>
      <span>${cat.label}</span>
    </button>
  `).join('');
}

/**
 * Filtre les produits par catégorie
 */
function filterProducts(category) {
  currentFilter = category;
  
  // Mettre à jour les boutons actifs
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  
  // Filtrer les produits
  const filtered = category === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === category);
  
  renderProducts(filtered);
  
  // Mettre à jour l'URL sans recharger
  const url = category === 'all' 
    ? './catalogue.html' 
    : `./catalogue.html?category=${category}`;
  window.history.replaceState({}, '', url);
}

/**
 * Affiche les produits dans la grille
 */
function renderProducts(products) {
  const container = document.getElementById('productsGrid');
  const emptyMessage = document.getElementById('emptyMessage');
  const resultsCount = document.getElementById('resultsCount');
  
  if (!container) return;
  
  // Mettre à jour le compteur
  if (resultsCount) {
    const count = products.length;
    resultsCount.textContent = `${count} produit${count > 1 ? 's' : ''}`;
  }
  
  // Afficher message vide si nécessaire
  if (products.length === 0) {
    container.innerHTML = '';
    emptyMessage.style.display = 'block';
    return;
  }
  
  emptyMessage.style.display = 'none';
  
  // Rendre les produits
  container.innerHTML = products.map(product => generateProductCard(product)).join('');
  
  // Réinitialiser les animations
  initRevealAnimations();
}

/**
 * Affiche le modal du panier
 */
function showCartModal() {
  const modal = document.getElementById('cartModal');
  const content = document.getElementById('cartContent');
  
  if (!modal || !content) return;
  
  const cart = getCart();
  
  if (cart.items.length === 0) {
    content.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty__icon">🛒</span>
        <h3>Votre panier est vide</h3>
        <p>Découvrez nos produits et commencez vos achats !</p>
        <button class="btn btn-primary" onclick="hideCartModal()">
          Continuer les achats
        </button>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="cart-items">
        ${cart.items.map(item => `
          <div class="cart-item">
            <div class="cart-item__image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item__content">
              <h4 class="cart-item__title">${item.name}</h4>
              <span class="cart-item__category">${item.category}</span>
              <div class="cart-item__footer">
                <span class="cart-item__price">${formatPrice(item.price)} × ${item.quantity}</span>
                <div class="cart-item__actions">
                  <div class="quantity-selector quantity-selector--sm">
                    <button class="quantity-selector__btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" class="quantity-selector__input" value="${item.quantity}" readonly>
                    <button class="quantity-selector__btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                  </div>
                  <button class="cart-item__remove" onclick="removeCartItem(${item.id})" aria-label="Retirer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>Sous-total</span>
          <span>${formatPrice(cart.total)}</span>
        </div>
        <div class="cart-summary__row">
          <span>Livraison</span>
          <span>${cart.total >= 50 ? 'Gratuite' : 'À calculer'}</span>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span>${formatPrice(cart.total)}</span>
        </div>
        <div class="cart-summary__actions">
          <button class="btn btn-outline" onclick="hideCartModal()">
            Continuer
          </button>
          <a href="./contact.html" class="btn btn-primary" onclick="handleCheckout()">
            Commander
          </a>
        </div>
        <p class="cart-note">
          📝 La finalisation de la commande se fera par email ou téléphone.<br>
          <a href="./contact.html">Contactez-nous</a> pour toute question.
        </p>
      </div>
    `;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Ferme le modal du panier
 */
function hideCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Met à jour la quantité d'un article dans le panier
 */
function updateCartItemQuantity(productId, quantity) {
  updateQuantity(productId, quantity);
  showCartModal(); // Rafraîchir le modal
}

/**
 * Retire un article du panier
 */
function removeCartItem(productId) {
  removeFromCart(productId);
  showCartModal(); // Rafraîchir le modal
  showToast('Article retiré du panier');
}

/**
 * Gère le clic sur le bouton commander
 */
function handleCheckout() {
  const cart = getCart();
  if (cart.items.length === 0) {
    showToast('Votre panier est vide');
    return false;
  }
  
  // Stocker les infos du panier pour la page de contact
  Storage.set('checkout_cart', cart);
  return true;
}

// Fermer le modal avec Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideCartModal();
  }
});
