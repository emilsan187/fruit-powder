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
  },
  {
    id: 'pommeflower',
    name: 'Pommeflower',
    description: 'Frischer Granatapfel mit leichter Holunder-Note.',
    details: 'Aromatischer Granatapfel kombiniert mit blumigen Holunderaromen',
    category: 'basics',
    price: 15.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8A2BE2/ffffff?text=Pommeflower',
    gradient: ['#8A2BE2', '#4B0082'],
    featured: true,
    isNew: true
  },
  {
    id: 'cucumber-mint',
    name: 'Cucumber Mint',
    description: 'Erfrischende Gurke mit kühler Minznote.',
    details: 'Kühle Gurkenaromen kombiniert mit frischer Minze für ein belebendes Erlebnis',
    category: 'basics',
    price: 12.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/00CED1/ffffff?text=Cucumber+Mint',
    gradient: ['#00CED1', '#20B2AA'],
    featured: false,
    isNew: false
  },
  {
    id: 'firework',
    name: 'Firework',
    description: 'Eine Geschmacksbombe aus verschiedenen Früchten.',
    details: 'Kombination aus Beeren, Zitrusfrüchten und tropischen Aromen für ein intensives Geschmackserlebnis',
    category: 'basics',
    price: 16.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Vitaminen', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF4500/ffffff?text=Firework',
    gradient: ['#FF4500', '#FF69B4'],
    featured: true,
    isNew: true
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    description: 'Intensive Beerenmischung mit süßer Note.',
    details: 'Saftige Erdbeeren, Himbeeren und Blaubeeren für ein fruchtiges Erlebnis',
    category: 'basics',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B0000/ffffff?text=Berry+Blast',
    gradient: ['#8B0000', '#FF1493'],
    featured: false,
    isNew: false
  },
  {
    id: 'kiwi-lime',
    name: 'Kiwi Lime',
    description: 'Exotische Kiwi mit spritziger Limette.',
    details: 'Frische Kiwis kombiniert mit der Säure von Limetten für ein belebendes Geschmackserlebnis',
    category: 'basics',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/32CD32/ffffff?text=Kiwi+Lime',
    gradient: ['#32CD32', '#ADFF2F'],
    featured: true,
    isNew: false
  },
  {
    id: 'mango-passion',
    name: 'Mango Passion',
    description: 'Süße Mango mit exotischer Passionsfrucht.',
    details: 'Reife Mangos kombiniert mit der tropischen Note der Passionsfrucht für ein intensives Geschmackserlebnis',
    category: 'basics',
    price: 16.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Vitaminen', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Mango+Passion',
    gradient: ['#FFD700', '#FFA500'],
    featured: false,
    isNew: true
  },
  {
    id: 'peach-ginger',
    name: 'Peach Ginger',
    description: 'Süßer Pfirsich mit würziger Ingwer-Note.',
    details: 'Saftige Pfirsiche kombiniert mit der Schärfe von Ingwer für ein einzigartiges Geschmackserlebnis',
    category: 'basics',
    price: 15.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFB6C1/ffffff?text=Peach+Ginger',
    gradient: ['#FFB6C1', '#FF69B4'],
    featured: true,
    isNew: false
  },
  
  // === VITALITY SORTEN ===
  {
    id: 'energy-berries',
    name: 'Energy Berries',
    description: 'Power-Mix aus Acai, Goji und Guarana.',
    details: 'Superfood Beeren mit natürlichem Energiekick für maximale Ausdauer',
    category: 'vitality',
    price: 17.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Guarana', 'Natürliche Aromen', 'Vegan', 'Energiebooster'],
    image: 'https://placehold.co/400x400/8B008B/ffffff?text=Energy+Berries',
    gradient: ['#8B008B', '#FF1493'],
    featured: true,
    isNew: true
  },
  {
    id: 'citrus-kick',
    name: 'Citrus Kick',
    description: 'Belebende Zitrusfrüchte mit Matcha-Extrakt.',
    details: 'Frische Orangen, Zitronen und grüner Tee für nachhaltigen Energiekick',
    category: 'vitality',
    price: 16.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Matcha', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Citrus+Kick',
    gradient: ['#FFD700', '#FF8C00'],
    featured: false,
    isNew: true
  },
  
  // === WELLNESS SORTEN ===
  {
    id: 'calm-chamomile',
    name: 'Calm Chamomile',
    description: 'Beruhigendes Kamille mit Apfel und Honig.',
    details: 'Sanfte Kamillenblüten mit süßem Apfel für innere Ruhe und Entspannung',
    category: 'wellness',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Kamillenblüten', 'Natürliche Aromen', 'Vegan', 'Beruhigend'],
    image: 'https://placehold.co/400x400/F0E68C/ffffff?text=Calm+Chamomile',
    gradient: ['#F0E68C', '#FFD700'],
    featured: true,
    isNew: true
  },
  {
    id: 'turmeric-glow',
    name: 'Turmeric Glow',
    description: 'Goldene Kurkuma mit Kokos und schwarzem Pfeffer.',
    details: 'Entzündungshemmende Kurkuma kombiniert mit Kokos für inneres Gleichgewicht',
    category: 'wellness',
    price: 18.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Kurkuma', 'Natürliche Aromen', 'Vegan', 'Anti-entzündlich'],
    image: 'https://placehold.co/400x400/FF8C00/ffffff?text=Turmeric+Glow',
    gradient: ['#FF8C00', '#FFD700'],
    featured: false,
    isNew: true
  },
  
  // === FOCUS SORTEN ===
  {
    id: 'brain-boost',
    name: 'Brain Boost',
    description: 'Konzentrations-Mix mit Blaubeere und Ginkgo.',
    details: 'Unterstützt die Konzentration mit natürlichen Inhaltsstoffen für mentale Leistung',
    category: 'focus',
    price: 19.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Ginkgo', 'Natürliche Aromen', 'Vegan', 'Konzentrationshilfe'],
    image: 'https://placehold.co/400x400/4169E1/ffffff?text=Brain+Boost',
    gradient: ['#4169E1', '#1E90FF'],
    featured: true,
    isNew: true
  },
  {
    id: 'coffee-coconut',
    name: 'Coffee Coconut',
    description: 'Echter Kaffee mit cremiger Kokosnote.',
    details: 'Hochwertige Arabica-Kaffeebohnen mit natürlichem Kokosfett für Fokus und Geschmack',
    category: 'focus',
    price: 15.99,
    size: '400g',
    servings: 16,
    features: ['Ohne Zucker', 'Mit Kaffee', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B4513/ffffff?text=Coffee+Coconut',
    gradient: ['#8B4513', '#D2691E'],
    featured: false,
    isNew: true
  },
  
  // === IMMUNITY SORTEN ===
  {
    id: 'immune-shield',
    name: 'Immune Shield',
    description: 'Immunschutz mit Zink, Vitamin C und Holunder.',
    details: 'Mit Holunderbeeren, Ingwer und Zink für ein starkes Immunsystem',
    category: 'immunity',
    price: 19.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Zink', 'Mit Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/00CED1/ffffff?text=Immune+Shield',
    gradient: ['#00CED1', '#20B2AA'],
    featured: true,
    isNew: true
  },
  {
    id: 'ginger-lemon-boost',
    name: 'Ginger Lemon Boost',
    description: 'Klassisches Gesundheitsgetränk mit Ingwer und Zitrone.',
    details: 'Probiertes Mittel für das Immunsystem mit frischem Zitronensaft und scharfem Ingwer',
    category: 'immunity',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Ingwer', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFFF00/ffffff?text=Ginger+Lemon',
    gradient: ['#FFFF00', '#FFD700'],
    featured: false,
    isNew: true
  },
  
  // === EXOTIC SORTEN ===
  {
    id: 'lychee-rose',
    name: 'Lychee Rose',
    description: 'Exotische Lychee mit feiner Rosennote.',
    details: 'Süße Lychee-Früchte kombiniert mit zartem Rosenblüten-Aroma',
    category: 'exotic',
    price: 18.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Rosenblüten', 'Natürliche Aromen', 'Vegan', 'Exotisch'],
    image: 'https://placehold.co/400x400/FF69B4/ffffff?text=Lychee+Rose',
    gradient: ['#FF69B4', '#FF1493'],
    featured: true,
    isNew: true
  },
  {
    id: 'dragon-fruit-magic',
    name: 'Dragon Fruit Magic',
    description: 'Magische Drachenfrucht mit Limes und Kokosnuss.',
    details: 'Das exotische Superfood für ein unvergessliches Geschmackserlebnis',
    category: 'exotic',
    price: 19.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF00FF/ffffff?text=Dragon+Fruit',
    gradient: ['#FF00FF', '#FF1493'],
    featured: false,
    isNew: true
  },
  {
    id: 'guava-hibiscus',
    name: 'Guava Hibiscus',
    description: 'Tropische Guave mit blumiger Hibiskus-Note.',
    details: 'Süßliche Guave-Früchte mit intensivem Hibiskus-Geschmack für tropisches Flair',
    category: 'exotic',
    price: 17.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Hibiskus', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF6347/ffffff?text=Guava+Hibiscus',
    gradient: ['#FF6347', '#FF69B4'],
    featured: true,
    isNew: true
  },
  
  // === SEASONAL SORTEN ===
  {
    id: 'winter-spice',
    name: 'Winter Spice',
    description: 'Wärmender Mix aus Zimt, Nelke und Orange.',
    details: 'Saisonale Spezialität mit traditionellen Winteraromen für gemütliche Stunden',
    category: 'seasonal',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Zimt & Nelken', 'Natürliche Aromen', 'Vegan', 'Wärmend'],
    image: 'https://placehold.co/400x400/8B4513/ffffff?text=Winter+Spice',
    gradient: ['#8B4513', '#D2691E'],
    featured: false,
    isNew: true
  },
  {
    id: 'summer-mojito',
    name: 'Summer Mojito',
    description: 'Sommerliches Mojito-Getränk mit Limette und Minze.',
    details: 'Erfrischende Sommererfrischung ohne Alkohol - perfekt für heiße Tage',
    category: 'seasonal',
    price: 14.49,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan', 'Erfrischend'],
    image: 'https://placehold.co/400x400/00FF00/ffffff?text=Summer+Mojito',
    gradient: ['#00FF00', '#20B2AA'],
    featured: true,
    isNew: true
  }
];