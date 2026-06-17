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
  // === BASICS ===
  {
    id: 'blood-orange',
    name: 'Blood Orange',
    description: 'Spritzige Blutorange mit einer leicht bitteren Note für echte Feinschmecker.',
    details: 'Herbe Blutorange',
    category: 'basics',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF4500/ffffff?text=Blood+Orange',
    gradient: ['#FF4500', '#FF6347'],
    featured: false,
    isNew: false
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    description: 'Ein kraftvoller Boost aus wilden Blaubeeren, saftigen Erdbeeren und frischen Himbeeren für deinen Fokus.',
    details: 'Der ultimative Waldbeeren-Mix',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Reich an Antioxidantien', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B0000/ffffff?text=Berry+Blast',
    gradient: ['#FF3B30', '#8B0000'],
    featured: false,
    isNew: false
  },
  {
    id: 'honeymelon',
    name: 'Honeymelon',
    description: 'Vollreife Honigmelone, verfeinert mit einem Spritzer Zitrone für die perfekte Balance.',
    details: 'Süße der Honigmelone',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/32CD32/ffffff?text=Honeymelon',
    gradient: ['#32CD32', '#7FFF00'],
    featured: false,
    isNew: true
  },
  {
    id: 'apple-zen',
    name: 'Apple Zen',
    description: 'Der reine Geschmack von grünem Apfel mit einer dezenten Note von weißem Tee.',
    details: 'Knackig & Klar',
    category: 'basics',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Weißer Tee Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/7FFF00/ffffff?text=Apple+Zen',
    gradient: ['#7FFF00', '#00FF00'],
    featured: false,
    isNew: false
  },
  {
    id: 'cherry-bomb',
    name: 'Cherry Bomb',
    description: 'Tiefrote Sauerkirschen vereint mit einem süßen Kern aus Amarena.',
    details: 'Explosive Kirsche 🍒',
    category: 'basics',
    price: 12.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Amarena-Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B0000/ffffff?text=Cherry+Bomb',
    gradient: ['#8B0000', '#DC143C'],
    featured: false,
    isNew: false
  },
  {
    id: 'midnight-grape',
    name: 'Midnight Grape',
    description: 'Süße dunkle Trauben mit einem geheimnisvollen Twist aus Brombeere.',
    details: 'Dunkle Versuchung',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/4B0082/ffffff?text=Midnight+Grape',
    gradient: ['#4B0082', '#483D8B'],
    featured: false,
    isNew: false
  },
  {
    id: 'peach-perfect',
    name: 'Peach Perfect',
    description: 'Saftiger Weinbergpfirsich, der auf der Zunge zergeht. Süß, mild und erfrischend.',
    details: 'Samtiges Pfirsich-Aroma',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFDAB9/ffffff?text=Peach+Perfect',
    gradient: ['#FFDAB9', '#FFA07A'],
    featured: false,
    isNew: true
  },
  {
    id: 'watermelon-chill',
    name: 'Watermelon Chill',
    description: 'Eiskalte Wassermelone – der Klassiker für jede Gaming-Session oder Trainingseinheit.',
    details: 'Saftiger Durstlöscher',
    category: 'basics',
    price: 9.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan', 'Kühle-Effekt'],
    image: 'https://placehold.co/400x400/FF4500/ffffff?text=Watermelon+Chill',
    gradient: ['#FF4500', '#FF6347'],
    featured: false,
    isNew: false
  },
  {
    id: 'kiwi-spark',
    name: 'Kiwi Spark',
    description: 'Säuerliche grüne Kiwi trifft auf eine süße Stachelbeeren-Note.',
    details: 'Prickelnde Kiwi',
    category: 'basics',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/ADFF2F/ffffff?text=Kiwi+Spark',
    gradient: ['#ADFF2F', '#9ACD32'],
    featured: false,
    isNew: true
  },
  {
    id: 'wild-strawberry',
    name: 'Wild Strawberry',
    description: 'Der authentische Geschmack kleiner Walderdbeeren – süß und intensiv.',
    details: 'Frisch vom Feld',
    category: 'basics',
    price: 10.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/DC143C/ffffff?text=Wild+Strawberry',
    gradient: ['#DC143C', '#FF69B4'],
    featured: false,
    isNew: true
  },
  {
    id: 'pear-paradise',
    name: 'Pear Paradise',
    description: 'Zarte Williams-Christ-Birne mit einem Hauch von Vanille abgerundet.',
    details: 'Edle Birne',
    category: 'basics',
    price: 12.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Echte Bourbon-Vanille Noten', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/D2691E/ffffff?text=Pear+Paradise',
    gradient: ['#D2691E', '#F4A460'],
    featured: false,
    isNew: true
  },
  {
    id: 'banana-bliss',
    name: 'Banana Bliss',
    description: 'Süße Banane, so cremig wie ein Milchshake, aber leicht wie Wasser.',
    details: 'Cremiger Bananen-Traum',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFE135/ffffff?text=Banana+Bliss',
    gradient: ['#FFE135', '#FFF700'],
    featured: false,
    isNew: false
  },
  {
    id: 'raspberry-rebel',
    name: 'Raspberry Rebel',
    description: 'Reife Himbeeren, die durch die feine Bitternote von Tonic Water perfekt kontrastiert werden.',
    details: 'Süß-Herbe Himbeere',
    category: 'basics',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Tonic-Aroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF1493/ffffff?text=Raspberry+Rebel',
    gradient: ['#FF1493', '#C71585'],
    featured: false,
    isNew: true
  },
  {
    id: 'lemon-shakedown',
    name: 'Lemon Shakedown',
    description: 'Trübe, hausgemachte Zitronenlimonade mit reichlich Fruchtfleisch-Aroma und viel Süße.',
    details: 'Echte Jahrmarkt-Limonade',
    category: 'basics',
    price: 9.99,
    size: '400g',
    servings: 45,
    features: ['Ohne Zucker', 'Extra viele Portionen', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFF700/ffffff?text=Lemon+Shakedown',
    gradient: ['#FFF700', '#FFD700'],
    featured: false,
    isNew: false
  },
  {
    id: 'bubble-gum',
    name: 'Bubble Gum',
    description: 'Der unverkennbare, süße Geschmack von rosa Kaugummistreifen aus den 90ern.',
    details: 'Kaugummi-Kult',
    category: 'basics',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Retro-Aroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF69B4/ffffff?text=Bubble+Gum',
    gradient: ['#FF69B4', '#FF1493'],
    featured: false,
    isNew: false
  },
  {
    id: 'grapefruit-glow',
    name: 'Grapefruit Glow',
    description: 'Sonnengereifte, leicht bittere Pink Grapefruit, gepaart mit einer Note von süßer Blutorange.',
    details: 'Herbe Frische',
    category: 'basics',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Vitamin-Komplex', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/E9967A/ffffff?text=Grapefruit+Glow',
    gradient: ['#E9967A', '#FF6347'],
    featured: false,
    isNew: true
  },
  {
    id: 'caramel-crush',
    name: 'Caramel Crush',
    description: 'Intensiv süßes, leicht salziges Butterkaramell, das wie ein flüssiges Dessert schmeckt.',
    details: 'Süße Sünde',
    category: 'basics',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Salted Caramel Geschmack', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/D2691E/ffffff?text=Caramel+Crush',
    gradient: ['#D2691E', '#8B4513'],
    featured: false,
    isNew: false
  },
  {
    id: 'cranberry-crush',
    name: 'Cranberry Crush',
    description: 'Erfrischend herbe Cranberries, perfekt ausbalanciert mit einem süßen Hauch von rotem Apfel.',
    details: 'Herbe Eleganz',
    category: 'basics',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Cranberry-Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/A52A2A/ffffff?text=Cranberry+Crush',
    gradient: ['#A52A2A', '#DC143C'],
    featured: false,
    isNew: true
  },
  {
    id: 'vanilla-viper',
    name: 'Vanilla Viper',
    description: 'Edle Bourbon-Vanille gepaart mit einem überraschend spritzigen Schuss Rhabarber.',
    details: 'Süßer Biss',
    category: 'basics',
    price: 13.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Bourbon-Vanille Aroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/F3E5AB/ffffff?text=Vanilla+Viper',
    gradient: ['#F3E5AB', '#E0115F'],
    featured: false,
    isNew: false
  },
  {
    id: 'rhubarb-radness',
    name: 'Rhubarb Radness',
    description: 'Der pure, intensiv-säuerliche Geschmack von frischem Rhabarber – wie frisch geerntet.',
    details: 'Säuerlicher Kulthit',
    category: 'basics',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/E0115F/ffffff?text=Rhubarb+Radness',
    gradient: ['#E0115F', '#FF69B4'],
    featured: false,
    isNew: true
  },
  {
    id: 'wild-blueberry',
    name: 'Wild Blueberry',
    description: 'Gepflückte Blaubeeren aus tiefen Wäldern mit einer intensiv-fruchtigen Süße.',
    details: 'Die wilde Blaubeere',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Waldbeer-Extrakte', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/4682B4/ffffff?text=Wild+Blueberry',
    gradient: ['#4682B4', '#000080'],
    featured: false,
    isNew: true
  },
  {
    id: 'spiced-apple',
    name: 'Spiced Apple',
    description: 'Würziger, roter Apfel verfeinert mit feinstem Ceylon-Zimt für kältere Tage.',
    details: 'Apfel-Zimt-Traum',
    category: 'basics',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Echter Ceylon-Zimt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/CD5C5C/ffffff?text=Spiced+Apple',
    gradient: ['#CD5C5C', '#8B4513'],
    featured: false,
    isNew: false
  },
  {
    id: 'purple-rain',
    name: 'Purple Rain',
    description: 'Eine geheimnisvolle Komposition aus Heidelbeeren, Brombeeren und einem Schuss schwarzer Johannisbeere.',
    details: 'Dunkler Frucht-Mix',
    category: 'basics',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Anthocyan-Booster', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/800080/ffffff?text=Purple+Rain',
    gradient: ['#800080', '#4B0082'],
    featured: false,
    isNew: false
  },
  {
    id: 'sweet-cherry',
    name: 'Sweet Cherry',
    description: 'Der herrlich unkomplizierte Geschmack von prallen, tiefroten Sommer-Kirschen.',
    details: 'Süßkirschen-Traum',
    category: 'basics',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/B22222/ffffff?text=Sweet+Cherry',
    gradient: ['#B22222', '#8B0000'],
    featured: false,
    isNew: false
  },
  {
    id: 'blackcurrent-bite',
    name: 'Blackcurrent Bite',
    description: 'Intensiv herbe schwarze Johannisbeere, abgerundet mit der Süße von reifen Heidelbeeren.',
    details: 'Schwarze Johannisbeere',
    category: 'basics',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Reich an Vitamin C', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/4B0082/ffffff?text=Blackcurrent+Bite',
    gradient: ['#4B0082', '#2E0854'],
    featured: false,
    isNew: true
  },
  {
    id: 'citrus-circle',
    name: 'Citrus Circle',
    description: 'Ein spritziger Mix aus limette, Zitrone und pinker Grapefruit für den ultimativen Frischekick.',
    details: 'Dreifache Zitruspower',
    category: 'basics',
    price: 10.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Zitrus-Öle', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/F0E68C/ffffff?text=Citrus+Circle',
    gradient: ['#F0E68C', '#FFD700'],
    featured: false,
    isNew: false
  },

  // === VITALITY SORTEN ===
  {
    id: 'citrus-kick',
    name: 'Citrus Kick',
    description: 'Die perfekte Erfrischung aus sonnengereifter Zitrone, süßer Mandarine und der exotischen Yuzu-Frucht.',
    details: 'Sauer macht lustig & wach! 😜',
    category: 'vitality',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Mit Matcha', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Citrus+Kick',
    gradient: ['#FFD700', '#FF8C00'],
    featured: true,
    isNew: false
  },
  {
    id: 'blue-ice',
    name: 'Blue Ice',
    description: 'Blaue Himbeere mit einem extremen Menthol-Kick für maximale Kühlung.',
    details: 'Gletscher-Frische 🧊',
    category: 'vitality',
    price: 14.29,
    size: '400g',
    servings: 45,
    features: ['Ohne Zucker', 'Menthol-Schub', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/00BFFF/ffffff?text=Blue+Ice',
    gradient: ['#00BFFF', '#0000FF'],
    featured: true,
    isNew: false
  },
  {
    id: 'mango-madness',
    name: 'Mango Madness',
    description: 'Vollreife, indische Mango in ihrer reinsten und süßesten Form.',
    details: 'Die Mango-Explosion',
    category: 'vitality',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Indische Edel-Mango', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFA500/ffffff?text=Mango+Madness',
    gradient: ['#FFA500', '#FF8C00'],
    featured: false,
    isNew: false
  },
  {
    id: 'sour-power',
    name: 'Sour Power',
    description: 'Eine ultra-saure Kombination aus grünem Apfel, saurer Johannisbeere und spritziger Limette.',
    details: 'Extrem Sauer! ⚡️',
    category: 'vitality',
    price: 14.29,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Extra Sauer', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/9ACD32/ffffff?text=Sour+Power',
    gradient: ['#9ACD32', '#ADFF2F'],
    featured: true,
    isNew: true
  },
  {
    id: 'mystic-blue',
    name: 'Mystic Blue',
    description: 'Geheimnisvolle blaue Waldbeeren, wilde Brombeeren und ein Hauch von Lavendel-Aroma.',
    details: 'Beeren aus dem Zauberwald',
    category: 'vitality',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Lavendel-Note', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/1E90FF/ffffff?text=Mystic+Blue',
    gradient: ['#1E90FF', '#4B0082'],
    featured: false,
    isNew: false
  },
  {
    id: 'lime-lightning',
    name: 'Lime Lightning',
    description: 'Pure, ungefilterte Limettenfrische, die dir sofort einen ordentlichen Energie-Kick verpasst.',
    details: 'Saurer Limetten-Schock',
    category: 'vitality',
    price: 10.29,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Elektrolyt-Matrix', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/00FF00/ffffff?text=Lime+Lightning',
    gradient: ['#00FF00', '#006400'],
    featured: false,
    isNew: true
  },
  {
    id: 'kiwi-berry',
    name: 'Kiwi Berry',
    description: 'Die perfekte Fusion aus spritziger grüner Kiwi und der vollen Süße reifer Gartenerdbeeren.',
    details: 'Kiwi trifft Erdbeere',
    category: 'vitality',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Performance-Mischung', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/90EE90/ffffff?text=Kiwi+Berry',
    gradient: ['#90EE90', '#FF1493'],
    featured: true,
    isNew: true
  },
  {
    id: 'mango-mint',
    name: 'Mango Mint',
    description: 'Saftige indische Mango, perfekt kontrastiert mit marokkanischer Minze.',
    details: 'Süß trifft Kühl',
    category: 'vitality',
    price: 12.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Echte Marokkanische Minze', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF8C00/ffffff?text=Mango+Mint',
    gradient: ['#FF8C00', '#00EEAA'],
    featured: true,
    isNew: true
  },

  // === WELLNESS SORTEN ===
  {
    id: 'summer-mint-special',
    name: 'Summer Mint',
    description: 'Ein kühler Mix aus frischer Minze, spritziger Zitrone und einem Hauch Gurke für heiße Somterrstage.',
    details: 'Eiskalte Erfrischung!',
    category: 'wellness',
    price: 9.99,
    size: '400g',
    servings: 35,
    features: ['Ohne Zucker', 'Hydrations-Unterstützung', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/00EEAA/ffffff?text=Summer+Mint',
    gradient: ['#00EEAA', '#00CED1'],
    featured: true,
    isNew: true
  },
  {
    id: 'cactus-core',
    name: 'Cactus Core',
    description: 'Der milde, extrem feuchtigkeitsspendende Geschmack von Kaktusfeige mit einem Spritzer Limette.',
    details: 'Wüsten-Erfrischung',
    category: 'wellness',
    price: 13.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Kaktusfeigen-Konzentrat', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/00FF7F/ffffff?text=Cactus+Core',
    gradient: ['#00FF7F', '#20B2AA'],
    featured: false,
    isNew: true
  },
  {
    id: 'coconut-cloud',
    name: 'Coconut Cloud',
    description: 'Cremiges Kokoswasser mit einer samtigen Note von weißem Pfirsich für den sanften Genuss.',
    details: 'Sanfte Kokos-Brise',
    category: 'wellness',
    price: 13.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Echtes Kokoswasserpulver', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFFDD0/ffffff?text=Coconut+Cloud',
    gradient: ['#FFFDD0', '#FFDAB9'],
    featured: false,
    isNew: true
  },
  {
    id: 'green-horizon',
    name: 'Green Horizon',
    description: 'Der ultimative Hydrations-Mix aus knackiger Gurke, saurer Limette und Honigmelone.',
    details: 'Gurke-Limette-Melone',
    category: 'wellness',
    price: 10.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Super-Hydration', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/20B2AA/ffffff?text=Green+Horizon',
    gradient: ['#20B2AA', '#90EE90'],
    featured: false,
    isNew: true
  },

  // === FOCUS SORTEN ===
  {
    id: 'matcha-mystic',
    name: 'Matcha Mystic',
    description: 'Feinstes japanisches Matcha-Grünteepulver mit einer dezent cremigen Vanillenote.',
    details: 'Der grüne Fokus',
    category: 'focus',
    price: 16.49,
    size: '400g',
    servings: 30,
    features: ['Ohne Zucker', 'Japanisches Matcha-Pulver', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/419873/ffffff?text=Matcha+Mystic',
    gradient: ['#419873', '#8FBC8F'],
    featured: true,
    isNew: true
  },
  {
    id: 'hazelnut-horizon',
    name: 'Hazelnut Horizon',
    description: 'Feine, geröstete Haselnüsse auf einer cremigen Basis – schmeckt fast wie ein flüssiger Snack.',
    details: 'Nussiges Dessert',
    category: 'focus',
    price: 13.99,
    size: '400g',
    servings: 30,
    features: ['Ohne Zucker', 'Geröstetes Nuss-Aroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B4513/ffffff?text=Hazelnut+Horizon',
    gradient: ['#8B4513', '#CD853F'],
    featured: true,
    isNew: true
  },

  // === IMMUNITY SORTEN ===
  {
    id: 'pomegranate-power',
    name: 'Pomegranate Power',
    description: 'Antioxidative Kraft des Granatapfels mit einer leicht herben Johannisbeer-Note.',
    details: 'Herbe Granatapfel-Power',
    category: 'immunity',
    price: 13.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Antioxidantien-Schub', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/B22222/ffffff?text=Pomegranate+Power',
    gradient: ['#B22222', '#8B0000'],
    featured: false,
    isNew: true
  },
  {
    id: 'acai-advanced',
    name: 'Acai Advanced',
    description: 'Die dunkle, nussig-beerenartige Acai-Beere gemixt mit Heidelbeeren und Granatapfel.',
    details: 'Superfood-Power',
    category: 'immunity',
    price: 15.49,
    size: '400g',
    servings: 30,
    features: ['Ohne Zucker', 'Premium Acai Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/58113A/ffffff?text=Acai+Advanced',
    gradient: ['#58113A', '#4A0E2E'],
    featured: true,
    isNew: true
  },
  {
    id: 'ginger-glow',
    name: 'Ginger Glow',
    description: 'Scharfer Ingwer harmonisch abgerundet mit süßem Waldhonig und frischer Zitrone.',
    details: 'Würzige Energie',
    category: 'immunity',
    price: 11.99,
    size: '400g',
    servings: 35,
    features: ['Ohne Zucker', 'Natürliches Ingwer-Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/D2B48C/ffffff?text=Ginger+Glow',
    gradient: ['#D2B48C', '#FFD700'],
    featured: false,
    isNew: false
  },

  // === EXOTIC SORTEN ===
  {
    id: 'dragon-fuel',
    name: 'Dragon Fuel',
    description: 'Die pure Energie der Drachenfrucht kombiniert mit einer spritzigen Limetten-Note.',
    details: 'Exotische Drachenfrucht',
    category: 'exotic',
    price: 13.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Drachenfrucht-Aroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF1493/ffffff?text=Dragon+Fuel',
    gradient: ['#FF1493', '#FF4500'],
    featured: true,
    isNew: true
  },
  {
    id: 'lychee-love',
    name: 'Lychee Love',
    description: 'Die exotische Süße der Lychee vereint mit einer dezenten floralen Note.',
    details: 'Zarte Lychee-Blüte',
    category: 'exotic',
    price: 13.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Florale Essenzen', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFC0CB/ffffff?text=Lychee+Love',
    gradient: ['#FFC0CB', '#FF69B4'],
    featured: true,
    isNew: true
  },
  {
    id: 'passion-punch',
    name: 'Passion Punch',
    description: 'Ein tropisches Feuerwerk aus Maracuja, Passionsfrucht und einer feinen Note von Papaya.',
    details: 'Exotischer Fruchtalarm',
    category: 'exotic',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Tropen-Mix', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF6347/ffffff?text=Passion+Punch',
    gradient: ['#FF6347', '#FFA500'],
    featured: true,
    isNew: false
  },
  {
    id: 'guava-galaxy',
    name: 'Guava Galaxy',
    description: 'Rosa Guave gepaart mit einer spritzigen Note von Limette und Sternfrucht.',
    details: 'Intergalaktische Guave',
    category: 'exotic',
    price: 12.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Sternfrucht-Aroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FA8072/ffffff?text=Guava+Galaxy',
    gradient: ['#FA8072', '#DA70D6'],
    featured: true,
    isNew: false
  },
  {
    id: 'maracuja-madness',
    name: 'Maracuja Madness',
    description: 'Sonnengereifte Maracujas in ihrer intensivsten Form – tropisch, sauer und unvergesslich.',
    details: 'Die Tropen-Explosion',
    category: 'exotic',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Maracuja-Auszüge', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFD700/ffffff?text=Maracuja+Madness',
    gradient: ['#FFD700', '#FF8C00'],
    featured: true,
    isNew: false
  },

  // === RELAX SORTEN ===
  {
    id: 'chai-charge',
    name: 'Chai Charge',
    description: 'Traditionelle Gewürze wie Zimt, Kardamom und Nelken auf einer kräftigen Schwarztee-Basis.',
    details: 'Würziger Energizer',
    category: 'relax',
    price: 14.99,
    size: '400g',
    servings: 30,
    features: ['Ohne Zucker', 'Mit echten Chai-Gewürzen', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/8B4513/ffffff?text=Chai+Charge',
    gradient: ['#8B4513', '#A0522D'],
    featured: false,
    isNew: false
  },

  // === SEASONAL SORTEN ===
  {
    id: 'summer-mojito',
    name: 'Summer Mojito',
    description: 'Erfrischende, zerstoßene Minze gepaart mit spritzigem Limettensaft und feiner brauner Rohrzuckernote.',
    details: 'Karibischer Cocktail-Flair 🍃',
    category: 'seasonal',
    price: 12.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Echter Minz-Extrakt', 'Natürliche Aromen', 'Vegan', 'Erfrischend'],
    image: 'https://placehold.co/400x400/00FF00/ffffff?text=Summer+Mojito',
    gradient: ['#9EFD38', '#20B2AA'],
    featured: true,
    isNew: true
  },
  {
    id: 'tropical-wave-pack',
    name: 'Tropical Wave',
    description: 'Exotische Ananas trifft auf cremige Kokosnuss und einen Hauch von Passionsfrucht.',
    details: 'Urlaub im Glas 🏝️',
    category: 'seasonal',
    price: 15.99,
    size: '500g',
    servings: 50,
    features: ['Ohne Zucker', 'Extra grande Packung', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF8C00/ffffff?text=Tropical+Wave',
    gradient: ['#FF8C00', '#FFA500'],
    featured: true,
    isNew: false
  },
  {
    id: 'ice-tea-peach',
    name: 'Ice Tea Peach',
    description: 'Klassischer, tiefschwarzer Tee, kalt aufgebrüht und mit süßem Pfirsichsaft verfeinert.',
    details: 'Der Sommerklassiker',
    category: 'seasonal',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Echter Schwarztee-Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/CD853F/ffffff?text=Ice+Tea+Peach',
    gradient: ['#CD853F', '#D2691E'],
    featured: true,
    isNew: false
  },
  {
    id: 'ice-tea-lemon',
    name: 'Ice Tea Lemon',
    description: 'Erfrischender Eistee auf Ceylon-Schwarztee-Basis mit einem kräftigen Schuss Zitronensaft.',
    details: 'Der Durstlöscher',
    category: 'seasonal',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Ceylon-Tee Extrakt', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/DEB887/ffffff?text=Ice+Tea+Lemon',
    gradient: ['#DEB887', '#F5DEB3'],
    featured: false,
    isNew: false
  },
  {
    id: 'candy-cotton',
    name: 'Candy Cotton',
    description: 'Zuckersüßer Jahrmarkt-Traum, der Erinnerungen weckt. Extrem süß, beerig und intensiv.',
    details: 'Flüssige Zuckerwatte 🍭',
    category: 'seasonal',
    price: 13.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Jahrmarkt-Spezialaroma', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFB6C1/ffffff?text=Candy+Cotton',
    gradient: ['#FFB6C1', '#FF69B4'],
    featured: true,
    isNew: true
  },
  {
    id: 'blackberry-blizzard',
    name: 'Blackberry Blizzard',
    description: 'Dunkle, reife Brombeeren mit einer intensiven Menthol-Frische für den absoluten Kälte-Schock.',
    details: 'Eisige Brombeere',
    category: 'seasonal',
    price: 12.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Menthol-Kick', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/4E085C/ffffff?text=Blackberry+Blizzard',
    gradient: ['#4E085C', '#8A2BE2'],
    featured: false,
    isNew: true
  },
  {
    id: 'pina-colada',
    name: 'Pina Colada',
    description: 'Cremige Kokosmilch trifft auf den herrlich süßen Saft reifer Ananas.',
    details: 'Alkoholfreier Klassiker 🍍',
    category: 'seasonal',
    price: 15.99,
    size: '500g',
    servings: 50,
    features: ['Ohne Zucker', 'Familienpackung', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FFF8DC/ffffff?text=Pina+Colada',
    gradient: ['#FFF8DC', '#FFA500'],
    featured: false,
    isNew: true
  },
  {
    id: 'red-ruby',
    name: 'Red Ruby',
    description: 'Roter Rhabarber harmonisch kombiniert mit der milden Süße weißer Weintrauben.',
    details: 'Erfrischender Rhabarber-Mix',
    category: 'seasonal',
    price: 11.99,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Weintrauben-Konzentrat', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/FF69B4/ffffff?text=Red+Ruby',
    gradient: ['#FF69B4', '#FF4500'],
    featured: false,
    isNew: false
  },
  {
    id: 'plum-frost',
    name: 'Plum Frost',
    description: 'Süße, dunkle Pflaumen abgerundet mit einem intensiven Menthol-Abgang für maximale Frische.',
    details: 'Eisige Pflaume',
    category: 'seasonal',
    price: 11.49,
    size: '400g',
    servings: 40,
    features: ['Ohne Zucker', 'Menthol-Cooling', 'Natürliche Aromen', 'Vegan'],
    image: 'https://placehold.co/400x400/4A0E2E/ffffff?text=Plum+Frost',
    gradient: ['#4A0E2E', '#9370DB'],
    featured: false,
    isNew: false
  }
];
