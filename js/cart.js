/**
 * ============================================
 * SOUK BEYROUTH - Gestion du Panier
 * localStorage-based cart system
 * ============================================
 */

// Clé de stockage
const CART_KEY = 'souk_beyrouth_cart';

// Panier par défaut
const DEFAULT_CART = {
  items: [],
  total: 0,
  count: 0
};

/**
 * Récupère le panier depuis le localStorage
 * @returns {Object} Le panier
 */
function getCart() {
  return Storage.get(CART_KEY, DEFAULT_CART);
}

/**
 * Sauvegarde le panier dans le localStorage
 * @param {Object} cart - Le panier à sauvegarder
 */
function saveCart(cart) {
  Storage.set(CART_KEY, cart);
  updateCartBadge();
}

/**
 * Ajoute un produit au panier
 * @param {Object} product - Le produit à ajouter
 * @param {number} quantity - La quantité (défaut: 1)
 */
function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.items.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.categoryLabel,
      quantity: quantity
    });
  }
  
  recalculateCart(cart);
  saveCart(cart);
  
  showToast(`${product.name} ajouté au panier`);
  
  // Événement personnalisé
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

/**
 * Retire un produit du panier
 * @param {number} productId - L'ID du produit à retirer
 */
function removeFromCart(productId) {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.id !== productId);
  
  recalculateCart(cart);
  saveCart(cart);
  
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

/**
 * Met à jour la quantité d'un produit
 * @param {number} productId - L'ID du produit
 * @param {number} quantity - La nouvelle quantité
 */
function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.items.find(item => item.id === productId);
  
  if (!item) return;
  
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  item.quantity = quantity;
  recalculateCart(cart);
  saveCart(cart);
  
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

/**
 * Recalcule le total et le nombre d'articles
 * @param {Object} cart - Le panier à recalculer
 */
function recalculateCart(cart) {
  cart.count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Vide le panier
 */
function clearCart() {
  saveCart(DEFAULT_CART);
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: DEFAULT_CART }));
}

/**
 * Met à jour le badge du panier dans le header
 */
function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('cartBadge');
  
  if (!badge) return;
  
  if (cart.count > 0) {
    badge.textContent = cart.count > 99 ? '99+' : cart.count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

/**
 * Génère le HTML d'une carte produit
 * @param {Object} product - Le produit
 * @returns {string} Le HTML de la carte
 */
function generateProductCard(product) {
  const badges = [];
  
  if (product.badge) {
    badges.push(`<span class="badge badge--${product.badge}">${product.badgeLabel}</span>`);
  }
  
  if (product.clickCollect) {
    badges.push(`<span class="badge badge--click-collect">📍 Click & Collect</span>`);
  }
  
  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-card__badge">
          ${badges.join('')}
        </div>
      </div>
      <div class="product-card__content">
        <span class="product-card__category">${product.categoryLabel}</span>
        <h3 class="product-card__title">${product.name}</h3>
        <span class="product-card__origin">${product.origin}</span>
        <p class="product-card__description" style="font-size: var(--text-sm); color: var(--anthracite-light); margin-bottom: var(--space-3); line-height: 1.5;">${product.description}</p>
        <div class="product-card__footer">
          <span class="product-card__price">
            ${formatPrice(product.price)}
            <span class="product-card__price-unit">/${product.unit}</span>
          </span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initialise les gestionnaires d'événements pour les cartes produits
 */
function initProductCards() {
  document.addEventListener('click', async (e) => {
    // Bouton ajouter au panier
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      const productId = parseInt(addBtn.dataset.productId);
      const card = addBtn.closest('.product-card');
      const quantityInput = card.querySelector('.quantity-selector__input');
      const quantity = parseInt(quantityInput?.value) || 1;
      
      // Charger les données produits
      const data = await loadJSON('./data/products.json');
      if (!data) return;
      
      const product = data.products.find(p => p.id === productId);
      if (product) {
        addToCart(product, quantity);
        // Réinitialiser la quantité
        if (quantityInput) quantityInput.value = 1;
      }
      return;
    }
    
    // Boutons quantité
    const qtyBtn = e.target.closest('.quantity-selector__btn');
    if (qtyBtn) {
      const input = qtyBtn.parentElement.querySelector('.quantity-selector__input');
      const action = qtyBtn.dataset.action;
      let value = parseInt(input.value) || 1;
      
      if (action === 'increase') {
        value = Math.min(value + 1, 99);
      } else if (action === 'decrease') {
        value = Math.max(value - 1, 1);
      }
      
      input.value = value;
    }
  });
}

/**
 * Initialise le panier au chargement de la page
 */
function initCart() {
  updateCartBadge();
  initProductCards();
}
