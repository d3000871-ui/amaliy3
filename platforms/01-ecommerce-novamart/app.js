const products = [
  {
    id: 1,
    name: "AeroBook Pro M4 Max",
    category: "laptops",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 142,
    icon: "💻",
    sale: "-15%",
    desc: "16-dyuymli Liquid Retina XDR, 64GB RAM, 1TB SSD, 22 soat batareya."
  },
  {
    id: 2,
    name: "CyberBuds Neo ANC",
    category: "audio",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviews: 89,
    icon: "🎧",
    sale: "-25%",
    desc: "Faol shovqinni so'ndirish, Hi-Res Audio, 48 soat umumiy quvvat."
  },
  {
    id: 3,
    name: "Titan Chrono Ultra Watch",
    category: "wearables",
    price: 399,
    originalPrice: 479,
    rating: 4.9,
    reviews: 64,
    icon: "⌚",
    sale: "-17%",
    desc: "Safir oyna, titan korpus, EKG, qon kislorodi va sun'iy yo'ldosh GPS."
  },
  {
    id: 4,
    name: "Vortex RTX 5090 Rig",
    category: "gaming",
    price: 3299,
    originalPrice: 3599,
    rating: 5.0,
    reviews: 31,
    icon: "🖥️",
    sale: "HOT",
    desc: "AMD Ryzen 9950X, RTX 5090 32GB, 64GB DDR5, Custom Liquid Cooling."
  },
  {
    id: 5,
    name: "AeroBook Air 15 Slim",
    category: "laptops",
    price: 1099,
    originalPrice: 1249,
    rating: 4.7,
    reviews: 210,
    icon: "💻",
    sale: "-12%",
    desc: "Ultra ingichka alyuminiy dizayn, 18 soat avtonomiya, M3 chip."
  },
  {
    id: 6,
    name: "PulseSound Studio Boombox",
    category: "audio",
    price: 229,
    originalPrice: 279,
    rating: 4.6,
    reviews: 73,
    icon: "🔊",
    sale: "-18%",
    desc: "360 daraja fazoviy audio, IP67 suvga chidamli, 100W quvvat."
  },
  {
    id: 7,
    name: "VR Vision Horizon 4K",
    category: "gaming",
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviews: 58,
    icon: "🥽",
    sale: "YANGI",
    desc: "4K OLED linzalar, ko'zni kuzatuvchi sensorlar, simsiz erkinlik."
  },
  {
    id: 8,
    name: "FitTrack Pro Band 9",
    category: "wearables",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviews: 180,
    icon: "📿",
    sale: "-20%",
    desc: "Doimiy yurak urishi monitoringi, 120 ta sport rejimi, 14 kun quvvat."
  }
];

let cart = [];
let currentCategory = 'all';
let currentSort = 'featured';
let currentSearch = '';
let currentCurrency = 'USD';
let discountApplied = 0;

const currencyRates = {
  USD: { symbol: '$', rate: 1 },
  UZS: { symbol: "so'm", rate: 12800 },
  EUR: { symbol: '€', rate: 0.92 }
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const categoryTabs = document.getElementById('categoryTabs');
const sortSelect = document.getElementById('sortSelect');
const currencySelect = document.getElementById('currencySelect');
const cartTrigger = document.getElementById('cartTrigger');
const cartCount = document.getElementById('cartCount');
const cartHeaderCount = document.getElementById('cartHeaderCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const subtotalPriceEl = document.getElementById('subtotalPrice');
const discountLine = document.getElementById('discountLine');
const discountPriceEl = document.getElementById('discountPrice');
const totalPriceEl = document.getElementById('totalPrice');
const promoCodeInput = document.getElementById('promoCodeInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoFeedback = document.getElementById('promoFeedback');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const checkoutForm = document.getElementById('checkoutForm');
const modalFinalPrice = document.getElementById('modalFinalPrice');
const toast = document.getElementById('toast');

// Format Price
function formatPrice(usdAmount) {
  const { symbol, rate } = currencyRates[currentCurrency];
  const converted = usdAmount * rate;
  if (currentCurrency === 'UZS') {
    return `${Math.round(converted).toLocaleString('uz-UZ')} ${symbol}`;
  }
  return `${symbol}${converted.toFixed(2)}`;
}

// Render Products
function renderProducts() {
  let filtered = products.filter(item => {
    const matchCat = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = item.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                        item.desc.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  if (currentSort === 'low-to-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'high-to-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 10px;">🔍</p>
        <h3>Hech narsa topilmadi</h3>
        <p>Boshqa so'z bilan qidirib ko'ring yoki filtrlarni tozalang.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(item => `
    <article class="product-card" data-id="${item.id}">
      <span class="badge-sale">${item.sale}</span>
      <div class="product-image-container">
        <div class="product-icon-visual">${item.icon}</div>
      </div>
      <div class="product-info">
        <span class="product-cat">${item.category}</span>
        <h3 class="product-name">${item.name}</h3>
        <div class="product-rating">
          ★ ${item.rating} <span>(${item.reviews} ta sharh)</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4;">${item.desc}</p>
        <div class="product-bottom">
          <div class="price-box">
            <span class="original-price">${formatPrice(item.originalPrice)}</span>
            <span class="current-price">${formatPrice(item.price)}</span>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${item.id})" title="Savatga qo'shish">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Cart Logic
function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartUI();
  showToast(`"${item.name}" savatga qo'shildi! 🛒`);
}

function updateCartQty(productId, delta) {
  const itemIndex = cart.findIndex(c => c.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartHeaderCount.textContent = `(${totalCount} ta mahsulot)`;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `<p class="empty-cart-msg">Savat bo'sh. Mahsulot qo'shing!</p>`;
    subtotalPriceEl.textContent = formatPrice(0);
    totalPriceEl.textContent = formatPrice(0);
    discountLine.style.display = 'none';
    return;
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icon}</div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * discountApplied;
  const total = subtotal - discount;

  subtotalPriceEl.textContent = formatPrice(subtotal);
  if (discountApplied > 0) {
    discountLine.style.display = 'flex';
    discountPriceEl.textContent = `-${formatPrice(discount)}`;
  } else {
    discountLine.style.display = 'none';
  }
  totalPriceEl.textContent = formatPrice(total);
}

// Toast
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Event Listeners
categoryTabs.addEventListener('click', (e) => {
  if (e.target.classList.contains('cat-btn')) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.category;
    renderProducts();
  }
});

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value.trim();
  clearSearch.style.display = currentSearch ? 'block' : 'none';
  renderProducts();
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  clearSearch.style.display = 'none';
  renderProducts();
});

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderProducts();
});

currencySelect.addEventListener('change', (e) => {
  currentCurrency = e.target.value;
  renderProducts();
  updateCartUI();
});

cartTrigger.addEventListener('click', () => {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
});

cartOverlay.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
});

applyPromoBtn.addEventListener('click', () => {
  const code = promoCodeInput.value.trim().toUpperCase();
  if (code === 'SALE2026') {
    discountApplied = 0.20;
    promoFeedback.textContent = "Tabriklaymiz! 20% chegirma faollashtirildi.";
    promoFeedback.className = "promo-feedback success";
    updateCartUI();
  } else {
    promoFeedback.textContent = "Noto'g'ri kupon kodi! (Kupon: SALE2026)";
    promoFeedback.className = "promo-feedback error";
  }
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    showToast("Buyurtma berish uchun savatga mahsulot qo'shing!");
    return;
  }
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - (subtotal * discountApplied);
  modalFinalPrice.textContent = formatPrice(total);

  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  checkoutModal.classList.add('open');
});

closeModalBtn.addEventListener('click', () => {
  checkoutModal.classList.remove('open');
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const orderNum = Math.floor(100000 + Math.random() * 900000);
  const name = document.getElementById('custName').value;
  
  checkoutModal.classList.remove('open');
  cart = [];
  discountApplied = 0;
  promoCodeInput.value = '';
  promoFeedback.textContent = '';
  updateCartUI();

  alert(`Rahmat, ${name}! 🎉\nBuyurtmangiz muvaffaqiyatli qabul qilindi.\nBuyurtma ID: #NM-${orderNum}\nTez orada operatorimiz siz bilan bog'lanadi.`);
});

// Initialize
renderProducts();
