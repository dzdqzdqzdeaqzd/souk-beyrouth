/**
 * ============================================
 * SOUK BEYROUTH - Script principal
 * Initialisation globale
 * ============================================
 */

ready(() => {
  // Initialisations de base
  initHeaderScroll();
  initMobileMenu();
  initRevealAnimations();
  initLazyLoading();
  initCart();
  initNewsletterForm();
  
  // Gestion du panier dans le header
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.count === 0) {
        showToast('Votre panier est vide');
      } else {
        // Redirection vers la page catalogue avec ouverture du panier
        window.location.href = './pages/catalogue.html#cart';
      }
    });
  }
});

/**
 * Initialise le formulaire de newsletter
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const input = form.querySelector('input[type="email"]');
    const email = input.value.trim();
    
    if (!isValidEmail(email)) {
      showToast('Veuillez entrer une adresse email valide');
      return;
    }
    
    // Simulation d'inscription (à remplacer par une vraie API)
    showToast('Merci pour votre inscription !');
    input.value = '';
  });
}
