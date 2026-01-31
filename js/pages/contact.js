/**
 * ============================================
 * SOUK BEYROUTH - Page Contact
 * Scripts spécifiques à la page Contact
 * ============================================
 */

ready(() => {
  initContactForm();
  initFAQ();
});

/**
 * Initialise le formulaire de contact
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value.trim();
    
    if (!name || !email || !subject || !message) {
      showToast('Veuillez remplir tous les champs');
      return;
    }
    
    if (!isValidEmail(email)) {
      showToast('Veuillez entrer une adresse email valide');
      return;
    }
    
    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Envoi en cours...';
    
    // Vérifier si Formspree est configuré
    const formAction = form.getAttribute('action');
    
    if (formAction.includes('YOUR_FORM_ID')) {
      // Mode démo : simuler l'envoi
      setTimeout(() => {
        showToast('Message envoyé avec succès ! (Mode démo - configurez Formspree)');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
      return;
    }
    
    // Envoi réel via Formspree
    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showToast('Message envoyé avec succès ! Nous vous répondrons sous 24h.');
        form.reset();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      showToast('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/**
 * Initialise l'accordéon FAQ
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item__question');
  
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isExpanded = item.getAttribute('aria-expanded') === 'true';
      
      // Fermer tous les autres
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle l'item cliqué
      item.setAttribute('aria-expanded', !isExpanded);
    });
  });
}
