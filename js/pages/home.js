/**
 * ============================================
 * SOUK BEYROUTH - Page d'accueil
 * Scripts spécifiques à la homepage
 * ============================================
 */

ready(async () => {
  // Charger et afficher les produits phares
  await loadFeaturedProducts();
  
  // Animation des statistiques
  initStatsAnimation();
});

/**
 * Charge et affiche les produits phares (6 premiers produits)
 */
async function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;
  
  const data = await loadJSON('./data/products.json');
  if (!data || !data.products) {
    container.innerHTML = '<p class="text-center">Impossible de charger les produits.</p>';
    return;
  }
  
  // Prendre les 6 premiers produits
  const featuredProducts = data.products.slice(0, 6);
  
  // Générer le HTML
  container.innerHTML = featuredProducts.map(product => generateProductCard(product)).join('');
  
  // Réinitialiser les animations pour les nouveaux éléments
  initRevealAnimations();
}

/**
 * Animation des statistiques au scroll
 */
function initStatsAnimation() {
  const statsSection = document.querySelector('.our-story__stats');
  if (!statsSection) return;
  
  const statNumbers = statsSection.querySelectorAll('.our-story__stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          const suffix = text.replace(/[0-9]/g, '');
          
          if (number) {
            stat.textContent = '0' + suffix;
            animateCounter(stat, number, 2000);
            // Réajouter le suffixe après l'animation
            setTimeout(() => {
              stat.textContent = number + suffix;
            }, 2000);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
}
