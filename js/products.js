// Produktdaten - später vom Server
// Hilfsfunktionen für Produktfilterung
function getNewProducts() {
  return PRODUCTS.filter(p => p.isNew);
}

function getPopularProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function getAllProducts() {
  return PRODUCTS;
}

function renderProductsFromArray(containerId, products, detailed = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = products.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image" style="background-image: linear-gradient(45deg, ${product.gradient[0]}, ${product.gradient[1]});">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.isNew ? '<div class="product-badge new">Neu</div>' : ''}
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        ${detailed ? `
          <div class="product-details">
            <p class="small">${product.details}</p>
            <ul class="features">
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="product-meta">
              <span class="size">${product.size}</span>
              <span class="servings">${product.servings} Portionen</span>
            </div>
          </div>
        ` : ''}
        <div class="product-footer">
          <div class="price">${product.price.toFixed(2)}€</div>
          <button class="button" onclick="addToCart('${product.id}')">In den Warenkorb</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Produktkategorien:
// basics - Klassische Geschmacksrichtungen
// vitality - Energie und Vitalität
// wellness - Gesundheit und Wohlbefinden
// relax - Entspannung
// focus - Konzentration
// immunity - Immunsystem
// exotic - Besondere Geschmackserlebnisse
// seasonal - Saisonale Editionen

const PRODUCTS = [
  // === MEHR BASICS ===
  {
    id: 'blood-orange',
    name: 'Blood Orange',
    description: 'Intensive Blutorange mit leichter Bitternote.',
    details: 'Sizilianische Blutorangen mit charakteristischer Färbung',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF4500/ffffff?text=Blood+Orange',
    gradient: ['#FF4500', '#FF6347'],
    featured: false,
    isNew: false
  },
  {
    id: 'lemon-lime',
    name: 'Lemon Lime',
    description: 'Erfrischende Mischung aus Zitrone und Limette.',
    details: 'Spritzige Zitrusnoten für den perfekten Durstlöscher',
    category: 'basics',
    price: 12.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/ADFF2F/ffffff?text=Lemon+Lime',
    gradient: ['#ADFF2F', '#32CD32'],
    featured: false,
    isNew: false
  },
  {
    id: 'grapefruit',
    name: 'Grapefruit',
    description: 'Herbe Grapefruit mit süßlicher Note.',
    details: 'Frisch gepresste Grapefruits für einen belebenden Geschmack',
    category: 'basics',
    price: 13.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF69B4/ffffff?text=Grapefruit',
    gradient: ['#FF69B4', '#FF1493'],
    featured: true,
    isNew: false
  },
  {
    id: 'tropical-punch',
    name: 'Tropical Punch',
    description: 'Exotische Mischung aus Ananas, Mango und Papaya.',
    details: 'Sonnengereifte Früchte für ein tropisches Geschmackserlebnis',
    category: 'basics',
    price: 14.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Vitaminen', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFA500/ffffff?text=Tropical+Punch',
    gradient: ['#FFA500', '#FF8C00'],
    featured: false,
    isNew: true
  }
];