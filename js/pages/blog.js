/**
 * ============================================
 * SOUK BEYROUTH - Page Blog
 * Scripts spécifiques au blog
 * ============================================
 */

let allPosts = [];
let currentPostFilter = 'all';

ready(async () => {
  // Charger les données
  await loadBlogData();
  
  // Afficher les articles
  renderFeaturedPosts();
  renderAllPosts();
});

/**
 * Charge les données du blog
 */
async function loadBlogData() {
  const data = await loadJSON('../data/blog.json');
  if (data) {
    allPosts = data.articles || [];
  }
}

/**
 * Affiche les articles en vedette
 */
function renderFeaturedPosts() {
  const container = document.getElementById('featuredPosts');
  if (!container) return;
  
  // Prendre les articles marqués comme featured
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 3);
  
  if (featuredPosts.length === 0) {
    container.innerHTML = '<p>Aucun article en vedette.</p>';
    return;
  }
  
  container.innerHTML = featuredPosts.map((post, index) => generateBlogCard(post, index === 0)).join('');
}

/**
 * Affiche tous les articles (ou filtrés)
 */
function renderAllPosts() {
  const container = document.getElementById('postsGrid');
  if (!container) return;
  
  const filtered = currentPostFilter === 'all' 
    ? allPosts 
    : allPosts.filter(p => p.category === currentPostFilter);
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="catalogue__empty" style="grid-column: 1/-1;">
        <span class="catalogue__empty-icon">📝</span>
        <h3>Aucun article dans cette catégorie</h3>
        <button class="btn btn-primary" onclick="filterPosts('all')">
          Voir tous les articles
        </button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(post => generateBlogCard(post, false)).join('');
  
  // Réinitialiser les animations
  initRevealAnimations();
}

/**
 * Filtre les articles par catégorie
 */
function filterPosts(category) {
  currentPostFilter = category;
  
  // Mettre à jour les boutons actifs
  const buttons = document.querySelectorAll('.blog-filters .filter-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  
  renderAllPosts();
}

/**
 * Génère le HTML d'une carte d'article
 */
function generateBlogCard(post, isFeatured = false) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return `
    <article class="blog-card ${isFeatured ? 'blog-card--featured' : ''}">
      <div class="blog-card__image">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
        <span class="blog-card__category">${post.categoryLabel}</span>
      </div>
      <div class="blog-card__content">
        <div class="blog-card__meta">
          <span>📅 ${formattedDate}</span>
          <span>⏱️ ${post.readTime}</span>
        </div>
        <h3 class="blog-card__title">${post.title}</h3>
        <p class="blog-card__excerpt">${post.excerpt}</p>
        <div class="blog-card__author">
          <div class="blog-card__author-avatar">
            ${post.author.charAt(0).toUpperCase()}
          </div>
          <span class="blog-card__author-name">${post.author}</span>
        </div>
      </div>
    </article>
  `;
}
