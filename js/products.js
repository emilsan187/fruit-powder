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
    id: 'tropical-mix',
    name: 'Tropical Mix',
    description: 'Tropischer Fruchtmix für Urlaubsfeeling.',
    details: 'Ananas, Mango und Papaya mit einem Hauch Kokos',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFB347/ffffff?text=Tropical+Mix',
    gradient: ['#FFB347', '#FFDA47'],
    featured: false,
    isNew: false
  },
  {
    id: 'strawberry-kiwi',
    name: 'Strawberry Kiwi',
    description: 'Fruchtige Kombination aus Erdbeere und Kiwi.',
    details: 'Saftige Erdbeeren mit erfrischender Kiwi',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF69B4/ffffff?text=Strawberry+Kiwi',
    gradient: ['#FF69B4', '#98FB98'],
    featured: false,
    isNew: false
  },
  {
    id: 'grape-elderflower',
    name: 'Grape & Elderflower',
    description: 'Elegante Mischung aus Traube und Holunderblüte.',
    details: 'Weiße Trauben verfeinert mit floraler Holunderblüte',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/DDA0DD/ffffff?text=Grape+Elder',
    gradient: ['#DDA0DD', '#E6E6FA'],
    featured: false,
    isNew: false
  },
  {
    id: 'watermelon-mint',
    name: 'Watermelon Mint',
    description: 'Erfrischende Wassermelone mit Minze.',
    details: 'Saftige Wassermelone mit frischer Minznote',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF6B6B/ffffff?text=Watermelon',
    gradient: ['#FF6B6B', '#98FB98'],
    featured: false,
    isNew: false
  },
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
  // === BASICS ===
  {
    id: 'classic-lemon',
    name: 'Classic Lemon',
    description: 'Der Klassiker: Erfrischende Zitrone, perfekt für jeden Tag.',
    details: 'Natürliches Zitronenaroma mit ausgewogener Säure und feiner Süße aus Stevia',
    category: 'basics',
    price: 12.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFF44F/ffffff?text=Classic+Lemon',
    gradient: ['#FFF44F', '#FFDB58'],
    featured: true,
    isNew: false
  },
  {
    id: 'fresh-orange',
    name: 'Fresh Orange',
    description: 'Sonnengereifter Orangengeschmack für den perfekten Start.',
    details: 'Natürliches Orangenaroma mit einem Hauch von Mandarine',
    category: 'basics',
    price: 12.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFA500/ffffff?text=Fresh+Orange',
    gradient: ['#FFA500', '#FFD700'],
    featured: false,
    isNew: false
  },
  {
    id: 'wild-berry',
    name: 'Wild Berry',
    description: 'Intensive Beerenmischung aus Waldfrüchten.',
    details: 'Kombination aus Himbeeren, Brombeeren und schwarzen Johannisbeeren',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B0000/ffffff?text=Wild+Berry',
    gradient: ['#8B0000', '#FF69B4'],
    featured: false,
    isNew: false
  },
  {
    id: 'green-apple',
    name: 'Green Apple',
    description: 'Erfrischend spritziger Apfelgeschmack.',
    details: 'Frischer grüner Apfel mit leichter Säure',
    category: 'basics',
    price: 12.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/90EE90/ffffff?text=Green+Apple',
    gradient: ['#90EE90', '#98FB98'],
    featured: false,
    isNew: false
  },
  {
    id: 'peach-passion',
    name: 'Peach Passion',
    description: 'Süße Pfirsiche mit exotischer Passionsfrucht.',
    details: 'Saftige Pfirsiche verfeinert mit tropischer Passionsfrucht',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFDAB9/ffffff?text=Peach+Passion',
    gradient: ['#FFDAB9', '#FFA07A'],
    featured: false,
    isNew: false
  },
  {
    id: 'cucumber-lime',
    name: 'Cucumber Lime',
    description: 'Erfrischende Gurke mit spritziger Limette.',
    details: 'Erfrischende Gurkennote mit Limette und Minze',
    category: 'basics',
    price: 13.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Erfrischend', 'Vegan'],
    image: 'https://placehold.co/400x400/90EE90/ffffff?text=Cucumber+Lime',
    gradient: ['#90EE90', '#98FB98'],
    featured: false,
    isNew: false
  },
  {
    id: 'pomegranate-berry',
    name: 'Pomegranate Berry',
    description: 'Granatapfel mit gemischten Beeren.',
    details: 'Granatapfel kombiniert mit Himbeeren und Brombeeren',
    category: 'basics',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/C71585/ffffff?text=Pomegranate',
    gradient: ['#C71585', '#FF69B4'],
    featured: false,
    isNew: false
  },
  {
    id: 'berry-boost',
    name: 'Berry Boost',
    description: 'Natürliche Energie aus Beeren und Superfoods.',
    details: 'Belebende Mischung aus Goji-Beeren, Acai und Himbeeren, angereichert mit B-Vitaminen aus Quinoa',
    category: 'vitality',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit B-Vitaminen', 'Reich an Antioxidantien', 'Vegan'],
    image: 'https://placehold.co/400x400/FF4D92/ffffff?text=Berry+Boost',
    gradient: ['#FF4D92', '#FFB86B'],
    featured: true,
    isNew: true
  },
  {
    id: 'mint-matcha',
    name: 'Mint Matcha',
    description: 'Erfrischender Matcha-Drink mit Minze für natürliche Fokussierung.',
    details: 'Premium Matcha aus Japan mit erfrischender Minze und L-Theanin für sanfte Energie',
    category: 'focus',
    price: 16.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an L-Theanin', 'Natürliches Koffein', 'Vegan'],
    image: 'https://placehold.co/400x400/90EE90/ffffff?text=Mint+Matcha',
    gradient: ['#90EE90', '#4AB3FF'],
    featured: true,
    isNew: false
  },
  {
    id: 'golden-glow',
    name: 'Golden Glow',
    description: 'Immunstärkender Kurkuma-Ingwer Drink mit Zitrusnote.',
    details: 'Harmonische Mischung aus Kurkuma, Ingwer und Zitrusfrüchten mit schwarzem Pfeffer für beste Bioverfügbarkeit',
    category: 'wellness',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Kurkumin', 'Immunstärkend', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Golden+Glow',
    gradient: ['#FFD700', '#FF7F50'],
    featured: false,
    isNew: true
  },
  {
    id: 'calm-lavender',
    name: 'Calm Lavender',
    description: 'Entspannender Abenddrink mit Lavendel und Kamille.',
    details: 'Beruhigende Mischung aus Lavendel, Kamille und Passionsblume, angereichert mit Magnesium',
    category: 'relax',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Magnesium', 'Entspannend', 'Vegan'],
    image: 'https://placehold.co/400x400/E6E6FA/ffffff?text=Calm+Lavender',
    gradient: ['#E6E6FA', '#DDA0DD'],
    featured: false,
    isNew: false
  },
  {
    id: 'coconut-dreams',
    name: 'Coconut Dreams',
    description: 'Tropischer Kokos-Drink mit Adaptogenen für Balance.',
    details: 'Cremige Kokosnote mit Ashwagandha und Reishi für natürliche Stressresistenz',
    category: 'wellness',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Adaptogenen', 'Stressreduzierend', 'Vegan'],
    image: 'https://placehold.co/400x400/FFFFFF/000000?text=Coconut+Dreams',
    gradient: ['#FFFFFF', '#FFD700'],
    featured: true,
    isNew: false
  },
  {
    id: 'green-energy',
    name: 'Green Energy',
    description: 'Vitalisierender Grüntee-Drink mit Supergreens.',
    details: 'Belebende Mischung aus Grüntee, Chlorella, Spirulina und Moringa für nachhaltige Energie',
    category: 'vitality',
    price: 16.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Reich an Chlorophyll', 'Entgiftend', 'Vegan'],
    image: 'https://placehold.co/400x400/98FB98/ffffff?text=Green+Energy',
    gradient: ['#98FB98', '#3CB371'],
    featured: false,
    isNew: true
  },
  // === EXOTIC BLENDS ===
  {
    id: 'dragon-fruit-dream',
    name: 'Dragon Fruit Dream',
    description: 'Exotischer Mix mit Drachenfrucht und Litschi.',
    details: 'Tropische Kombination aus Drachenfrucht, Litschi und einem Hauch Rosenblüten',
    category: 'exotic',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Exotische Früchte', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF69B4/ffffff?text=Dragon+Fruit',
    gradient: ['#FF69B4', '#FFB6C1'],
    featured: true,
    isNew: true
  },
  {
    id: 'mango-chili',
    name: 'Mango Chili',
    description: 'Süße Mango trifft auf sanfte Chilinote.',
    details: 'Reife Alphonso-Mango mit feiner Cayenneschärfe und Limette',
    category: 'exotic',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Cayenne', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Mango+Chili',
    gradient: ['#FFD700', '#FF4500'],
    featured: false,
    isNew: true
  },
  {
    id: 'sakura-plum',
    name: 'Sakura Plum',
    description: 'Japanische Kirschblüte mit saftiger Pflaume.',
    details: 'Inspiriert von japanischen Frühlingsfesten: Kirschblüte, Pflaume und grüner Tee',
    category: 'exotic',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Matcha', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFB7C5/ffffff?text=Sakura+Plum',
    gradient: ['#FFB7C5', '#DDA0DD'],
    featured: false,
    isNew: true
  },
  // === SEASONAL EDITIONS ===
  {
    id: 'winter-punch',
    name: 'Winter Punch',
    description: 'Wärmender Gewürzpunsch für kalte Tage.',
    details: 'Zimt, Nelken, Orange und Apfel mit wärmender Gewürzmischung',
    category: 'seasonal',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Wärmende Gewürze', 'Limited Edition', 'Vegan'],
    image: 'https://placehold.co/400x400/8B4513/ffffff?text=Winter+Punch',
    gradient: ['#8B4513', '#D2691E'],
    featured: false,
    isNew: true
  },
  {
    id: 'summer-mojito',
    name: 'Summer Mojito',
    description: 'Alkoholfreier Mojito-Style Drink mit frischer Minze.',
    details: 'Erfrischende Kombination aus Limette, Minze und Rum-Aroma',
    category: 'seasonal',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Alkoholfrei', 'Limited Edition', 'Vegan'],
    image: 'https://placehold.co/400x400/98FF98/ffffff?text=Summer+Mojito',
    gradient: ['#98FF98', '#00FF7F'],
    featured: true,
    isNew: true
  },
  // === IMMUNITY BOOSTERS ===
  {
    id: 'elderberry-zinc',
    name: 'Elderberry Zinc',
    description: 'Immunstärkender Holunderbeeren-Drink mit Zink.',
    details: 'Schwarzer Holunder, Zink und Vitamin C für das Immunsystem',
    category: 'immunity',
    price: 16.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Zink', 'Immunstärkend', 'Vegan'],
    image: 'https://placehold.co/400x400/4B0082/ffffff?text=Elderberry',
    gradient: ['#4B0082', '#8B008B'],
    featured: false,
    isNew: false
  },
  {
    id: 'ginger-lemon',
    name: 'Ginger Lemon',
    description: 'Klassische Ingwer-Zitronen Kombination.',
    details: 'Scharfer Ingwer mit Zitrone und Honiggeschmack',
    category: 'immunity',
    price: 14.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Ingwer', 'Vitamin C', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Ginger+Lemon',
    gradient: ['#FFD700', '#FFA07A'],
    featured: false,
    isNew: false
  },
  // === FOCUS & PERFORMANCE ===
  {
    id: 'brain-boost-blueberry',
    name: 'Brain Boost Blueberry',
    description: 'Konzentrationsfördernder Drink mit Heidelbeeren.',
    details: 'Wilde Heidelbeeren mit Lion\'s Mane und Ginkgo für mentale Leistung',
    category: 'focus',
    price: 17.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Nootropics', 'Brain Food', 'Vegan'],
    image: 'https://placehold.co/400x400/00008B/ffffff?text=Brain+Boost',
    gradient: ['#00008B', '#4169E1'],
    featured: false,
    isNew: true
  },
  {
    id: 'focus-coffee',
    name: 'Focus Coffee',
    description: 'Cold Brew Style Kaffeedrink mit L-Theanin.',
    details: 'Kaltgebrühter Arabica-Kaffee mit L-Theanin für fokussierte Energie',
    category: 'focus',
    price: 16.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit L-Theanin', 'Cold Brew Style', 'Vegan'],
    image: 'https://placehold.co/400x400/8B4513/ffffff?text=Focus+Coffee',
    gradient: ['#8B4513', '#A0522D'],
    featured: true,
    isNew: false
  },
  // === RELAX & UNWIND ===
  {
    id: 'sleep-well',
    name: 'Sleep Well',
    description: 'Entspannender Drink für erholsamen Schlaf.',
    details: 'Beruhigende Mischung aus Lavendel, Kamille und Baldrian mit Magnesium',
    category: 'relax',
    price: 15.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Magnesium', 'Schlaffördernd', 'Vegan'],
    image: 'https://placehold.co/400x400/E6E6FA/ffffff?text=Sleep+Well',
    gradient: ['#E6E6FA', '#D8BFD8'],
    featured: false,
    isNew: false
  },
  {
    id: 'evening-cacao',
    name: 'Evening Cacao',
    description: 'Entspannender Kakao mit Ashwagandha.',
    details: 'Hochwertiger Kakao mit Ashwagandha und Zimt für einen ruhigen Abend',
    category: 'relax',
    price: 16.99,
    size: '400g',
    servings: 20,
    features: ['Ohne Zucker', 'Mit Ashwagandha', 'Beruhigend', 'Vegan'],
    image: 'https://placehold.co/400x400/D2691E/ffffff?text=Evening+Cacao',
    gradient: ['#D2691E', '#8B4513'],
    featured: false,
    isNew: true
  }
];