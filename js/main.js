// Warenkorb-Management
let cart = JSON.parse(localStorage.getItem('cart') || '{}');

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  updateCartOverlay();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  cart[productId] = (cart[productId] || 0) + 1;
  updateCart();
  
  // Feedback Animation
  const badge = document.querySelector('.cart-badge');
  badge.classList.add('pulse');
  setTimeout(() => badge.classList.remove('pulse'), 300);
}

function removeFromCart(productId) {
  if (cart[productId]) {
    cart[productId]--;
    if (cart[productId] === 0) {
      delete cart[productId];
    }
    updateCart();
  }
}

function updateCartDisplay() {
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'block' : 'none';
  }
}

function updateCartOverlay() {
  const overlay = document.getElementById('cartOverlay');
  if (!overlay) return;

  const items = Object.entries(cart).map(([id, quantity]) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${product.name}</h4>
          <div class="cart-item-price">${product.price.toFixed(2)} €</div>
        </div>
        <div class="cart-item-quantity">
          <button onclick="removeFromCart('${id}')" class="btn-small">-</button>
          <span>${quantity}</span>
          <button onclick="addToCart('${id}')" class="btn-small">+</button>
        </div>
      </div>
    `;
  }).join('');

  const total = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return sum + (product ? product.price * quantity : 0);
  }, 0);

  const content = `
    <div class="cart-items">
      ${items || '<p class="cart-empty">Dein Warenkorb ist leer</p>'}
    </div>
    ${total > 0 ? `
      <div class="cart-summary">
        <div class="cart-total">
          <span>Gesamt:</span>
          <strong>${total.toFixed(2)} €</strong>
        </div>
        <button onclick="checkout()" class="btn btn-primary">Zur Kasse (${total.toFixed(2)} €)</button>
      </div>
    ` : ''}
  `;

  overlay.querySelector('.cart-content').innerHTML = content;
}

function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  if (overlay.classList.contains('show')) {
    overlay.classList.remove('show');
    document.body.classList.remove('overlay-open');
  } else {
    overlay.classList.add('show');
    document.body.classList.add('overlay-open');
    updateCartOverlay();
  }
}

function checkout() {
  alert('Vielen Dank für deinen Einkauf! Dies ist nur eine Demo-Version.');
  cart = {};
  updateCart();
  toggleCart();
}

// Warenkorb HTML einfügen
function initializeCart() {
  // Warenkorb-Button zur Navigation hinzufügen
  const nav = document.querySelector('.main-nav');
  if (nav) {
    const cartButton = document.createElement('button');
    cartButton.className = 'nav-link cart-button';
    cartButton.onclick = toggleCart;
    cartButton.innerHTML = `
      Warenkorb
      <span class="cart-badge">0</span>
    `;
    nav.appendChild(cartButton);
  }

  // Warenkorb-Overlay zum Body hinzufügen
  const overlay = document.createElement('div');
  overlay.id = 'cartOverlay';
  overlay.className = 'cart-overlay';
  overlay.innerHTML = `
    <div class="cart-overlay-inner">
      <div class="cart-header">
        <h3>Dein Warenkorb</h3>
        <button onclick="toggleCart()" class="btn-close">×</button>
      </div>
      <div class="cart-content">
        <!-- Wird dynamisch gefüllt -->
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Funktion zum Rendern einer Produktsektion (für die Startseite)
function renderProductSection(title, products, containerId, description = '') {
  const section = document.createElement('section');
  section.className = 'section product-section';
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>${title}</h2>
        ${description ? `<p class="muted">${description}</p>` : ''}
      </div>
      <div id="${containerId}" class="product-grid">
        ${products.map(product => `
          <article class="card product" data-id="${product.id}">
            <div class="product-image" style="background-image: linear-gradient(45deg, ${product.gradient[0]}, ${product.gradient[1]});">
              <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-content">
              <div class="product-header">
                <h3>${product.name}</h3>
                <div class="price">${product.price.toFixed(2)} €</div>
              </div>
              <p class="muted">${product.description}</p>
              <div class="tags">
                ${product.isNew ? '<span class="tag highlight new">Neu</span>' : ''}
                ${product.featured ? '<span class="tag highlight featured">Beliebt</span>' : ''}
                ${product.features.slice(0,2).map(f => `<span class="tag">${f}</span>`).join('')}
              </div>
              <button class="btn btn-primary buy-button" onclick="addToCart('${product.id}')">
                In den Warenkorb
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
  return section;
}

// Startseiten-Rendering
function initializeHomepage() {
  const mainContent = document.querySelector('main');
  if (!mainContent || !window.location.pathname.endsWith('index.html')) return;

  const newProducts = PRODUCTS.filter(p => p.isNew);
  const featuredProducts = PRODUCTS.filter(p => p.featured && !p.isNew);

  if (newProducts.length > 0) {
    mainContent.appendChild(
      renderProductSection('Neu eingetroffen', newProducts, 'newProducts', 'Entdecke unsere neuesten Kreationen')
    );
  }
  if (featuredProducts.length > 0) {
    mainContent.appendChild(
      renderProductSection('Unsere Bestseller', featuredProducts, 'featuredProducts', 'Von unseren Kunden geliebt')
    );
  }
}

// Beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
  // Warenkorb initialisieren
  initializeCart();
  updateCartDisplay();

  // Startseite initialisieren falls relevant
  initializeHomepage();
});