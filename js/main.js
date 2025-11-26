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
  
  // Visual feedback: fly-to-cart animation then pulse badge
  try {
    animateAddToCart(productId);
  } catch (e) {
    // fallback: pulse immediately
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.classList.add('pulse');
      setTimeout(() => badge.classList.remove('pulse'), 300);
    }
  }
}

function animateAddToCart(productId) {
  const badge = document.querySelector('.cart-badge');
  const cartBtn = document.querySelector('.cart-button') || badge;

  // find source image on page
  const productImg = document.querySelector(`.product[data-id="${productId}"] .product-image img`);
  let src = '';
  let startRect = null;

  if (productImg) {
    src = productImg.src;
    startRect = productImg.getBoundingClientRect();
  } else {
    // try modal image background
    const modalImg = document.querySelector('#productModalOverlay .product-modal-image');
    if (modalImg) {
      const bg = getComputedStyle(modalImg).backgroundImage || '';
      const url = bg.replace(/^url\((['"]?)/, '').replace(/(['"]?)\)$/, '');
      src = url;
      startRect = modalImg.getBoundingClientRect();
    }
  }

  // fallback to product image from data
  if (!src) {
    const p = PRODUCTS.find(x => x.id === productId);
    if (p) src = p.image || '';
  }
  if (!src) return;

  // create a small colored dot instead of the full image
  const dot = document.createElement('div');
  dot.className = 'flying-dot';
  // use product primary color if available
  const p = PRODUCTS.find(x => x.id === productId);
  const color = (p && p.gradient && p.gradient[0]) ? p.gradient[0] : 'var(--accent-pink)';
  dot.style.background = color;
  document.body.appendChild(dot);

  // If we don't have a start rect, place near center top
  if (!startRect) startRect = { left: window.innerWidth / 2 - 10, top: window.innerHeight / 2 - 10, width: 20, height: 20 };

  // initial placement (center the dot)
  const size = Math.max(12, Math.min(48, Math.round(Math.min(startRect.width, startRect.height) * 0.35)));
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.left = `${startRect.left + startRect.width / 2 - size / 2}px`;
  dot.style.top = `${startRect.top + startRect.height / 2 - size / 2}px`;
  dot.style.opacity = '1';

  // compute target
  const targetRect = badge ? badge.getBoundingClientRect() : (cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 40, top: 20, width: 24, height: 24 });
  const startCenterX = startRect.left + startRect.width / 2;
  const startCenterY = startRect.top + startRect.height / 2;
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;
  const deltaX = targetCenterX - startCenterX;
  const deltaY = targetCenterY - startCenterY;

  // animate the dot to the cart
  requestAnimationFrame(() => {
    dot.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.28)`;
    dot.style.transition = 'transform 700ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease';
  });

  // cleanup after animation
  setTimeout(() => {
    dot.style.opacity = '0';
    // pulse badge
    if (badge) {
      badge.classList.add('pulse');
      setTimeout(() => badge.classList.remove('pulse'), 420);
    }
    setTimeout(() => dot.remove(), 760);
  }, 740);
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
  // Öffne die Checkout-Seite. Die tatsächliche Bestellabwicklung erfolgt dort.
  try {
    // Ensure cart is saved
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.warn('Could not save cart to localStorage', e);
  }
  window.location.href = 'checkout.html';
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
  // Insert a large featured hero under the header on every page
  try {
    insertFeaturedHero();
  } catch (e) {
    // ignore if insert fails
  }
});

// Inserts a single large featured product under the site header on every page
function insertFeaturedHero() {
  if (typeof PRODUCTS === 'undefined') return;
  // find a product: prefer featured, then new, then first
  const pick = PRODUCTS.find(p => p.featured) || PRODUCTS.find(p => p.isNew) || PRODUCTS[0];
  if (!pick) return;

  // avoid duplicating if already inserted
  if (document.querySelector('.featured-hero')) return;

  const hero = document.createElement('section');
  hero.className = 'featured-hero';
  hero.innerHTML = `
    <div class="featured-hero-inner">
      <div class="featured-link" role="button" tabindex="0">
        <div class="featured-image" style="background-image: url('${pick.image}');"></div>
        <div class="featured-overlay">
          <h2 class="featured-title">${pick.name}</h2>
          <p class="featured-desc muted">${pick.description}</p>
          <div class="featured-ctas">
            <button class="btn btn-primary" onclick="event.preventDefault(); addToCart('${pick.id}');">In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const header = document.querySelector('.site-header');
  if (header && header.parentNode) header.insertAdjacentElement('afterend', hero);
  else document.body.insertAdjacentElement('afterbegin', hero);

  // When the large hero is clicked (but not its internal buttons/links), open the product modal
  const link = hero.querySelector('.featured-link');
  if (link) {
    link.addEventListener('click', (ev) => {
      // ignore clicks on buttons or anchor elements inside the hero
      if (ev.target.closest('button') || ev.target.closest('a')) return;
      ev.preventDefault();
      showProductModal(pick.id);
    });
    // make keyboard activation open modal as well
    link.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        showProductModal(pick.id);
      }
    });
  }
}

/* Product modal: show details when a product card is clicked (delegation) */
function showProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  // avoid multiple modals
  if (document.getElementById('productModalOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'productModalOverlay';
  overlay.className = 'product-modal-overlay';
  overlay.innerHTML = `
    <div class="product-modal" role="dialog" aria-modal="true" aria-label="Produktdetails">
      <button class="product-modal-close" aria-label="Schließen">×</button>
      <div class="product-modal-grid">
        <div class="product-modal-image" style="background-image: url('${p.image}');"></div>
        <div class="product-modal-body">
          <h3 class="product-modal-title">${p.name}</h3>
          <div class="product-modal-price">${p.price.toFixed(2)} €</div>
          <p class="muted">${p.description}</p>
          <div class="product-modal-tags">${p.features.map(f => `<span class="tag">${f}</span>`).join('')}</div>
          <div class="product-modal-actions">
            <button class="btn btn-primary modal-add" data-id="${p.id}">In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close handlers
  overlay.addEventListener('click', (ev) => {
    if (ev.target === overlay) closeProductModal();
  });

  document.body.appendChild(overlay);

  // trigger open animation
  requestAnimationFrame(() => overlay.classList.add('open'));

  const closeBtn = overlay.querySelector('.product-modal-close');
  closeBtn && closeBtn.addEventListener('click', closeProductModal);

  // add to cart from modal
  const addBtn = overlay.querySelector('.modal-add');
  if (addBtn) addBtn.addEventListener('click', (e) => {
    const id = e.currentTarget.getAttribute('data-id');
    addToCart(id);
    // small feedback then close
    setTimeout(() => closeProductModal(), 350);
  });

  // ESC to close
  function escHandler(e) { if (e.key === 'Escape') closeProductModal(); }
  document.addEventListener('keydown', escHandler);

  // remember to remove esc handler when closed
  overlay._escHandler = escHandler;
}

function closeProductModal() {
  const overlay = document.getElementById('productModalOverlay');
  if (!overlay) return;
  const esc = overlay._escHandler;
  if (esc) document.removeEventListener('keydown', esc);
  // play close animation then remove
  overlay.classList.remove('open');
  setTimeout(() => {
    const o = document.getElementById('productModalOverlay');
    if (o) o.remove();
  }, 260);
}

// Delegate clicks on product cards to open modal, but ignore clicks on buttons/links
document.addEventListener('click', (e) => {
  const productEl = e.target.closest && e.target.closest('.product');
  if (!productEl) return;

  // if click was on a link or button inside the card, don't open modal
  if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;

  const id = productEl.getAttribute('data-id');
  if (id) {
    e.preventDefault();
    showProductModal(id);
  }
});