const menuItems = [
  {
    id: 1,
    name: "Truffle Smash Burger",
    cat: "burgers",
    price: 68000,
    calories: "720 kkal",
    time: "20 min",
    desc: "100% marmar mol go'shti, qora tryufel mayonezi, karamellangan piyoz va cheddar pishlog'i.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fit=crop"
  },
  {
    id: 2,
    name: "Diavola Pepperoni Pizza",
    cat: "pizza",
    price: 85000,
    calories: "980 kkal",
    time: "25 min",
    desc: "Italyan pechida pishirilgan achchiq pepperoni, motsarella va San Marzano pomidor sousi.",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&fit=crop"
  },
  {
    id: 3,
    name: "Dragon Salmon Roll",
    cat: "sushi",
    price: 94000,
    calories: "510 kkal",
    time: "25 min",
    desc: "Yangi losos balig'i, avokado, unagi sousi va tobiko ikrasi bilan o'ralgan premium set.",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&fit=crop"
  },
  {
    id: 4,
    name: "Avocado & Quinoa Power Bowl",
    cat: "bowls",
    price: 58000,
    calories: "420 kkal",
    time: "15 min",
    desc: "Kinoa, yangi avokado, edamame, xandal sousi va zaytun yog'ida pishirilgan sabzavotlar.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&fit=crop"
  },
  {
    id: 5,
    name: "Pistachio Basque Cheesecake",
    cat: "desserts",
    price: 45000,
    calories: "460 kkal",
    time: "10 min",
    desc: "Ispancha kuydirilgan pishloqli desert, pista sousi va yangi malina mevasi bilan.",
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&fit=crop"
  },
  {
    id: 6,
    name: "BBQ Smoked Ribeye Steak",
    cat: "burgers",
    price: 135000,
    calories: "840 kkal",
    time: "30 min",
    desc: "Ochiq olovda qovurilgan suvli ribay steyk, rozmarinli kartoshka va maxsus qalampir sousi.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&fit=crop"
  }
];

let cart = [];
let currentCategory = 'all';

// Elements
const menuGrid = document.getElementById('menuGrid');
const foodSearch = document.getElementById('foodSearch');
const categoryContainer = document.getElementById('categoryContainer');
const openCartDrawerBtn = document.getElementById('openCartDrawerBtn');
const closeCartDrawerBtn = document.getElementById('closeCartDrawerBtn');
const cartDrawer = document.getElementById('cartDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCountPill = document.getElementById('cartCountPill');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const trackerTeaser = document.getElementById('trackerTeaser');
const trackerStatusText = document.getElementById('trackerStatusText');

// Reservation Elements
const openReserveModalBtn = document.getElementById('openReserveModalBtn');
const closeReserveModal = document.getElementById('closeReserveModal');
const reserveModal = document.getElementById('reserveModal');
const reserveForm = document.getElementById('reserveForm');

// Format UZS
function formatUZS(sum) {
  return `${sum.toLocaleString('uz-UZ')} so'm`;
}

// Render Menu
function renderMenu() {
  const query = foodSearch.value.trim().toLowerCase();
  const filtered = menuItems.filter(item => {
    const matchCat = currentCategory === 'all' || item.cat === currentCategory;
    const matchSearch = item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  menuGrid.innerHTML = filtered.map(item => `
    <article class="food-card">
      <div class="food-img-box">
        <img src="${item.img}" alt="${item.name}">
        <span class="food-time-tag">⏱ ${item.time}</span>
      </div>
      <div class="food-info">
        <div class="food-meta">
          <span>🔥 ${item.calories}</span>
          <span style="color:var(--qb-orange); font-weight:700;">4.9 ★</span>
        </div>
        <h3 class="food-name">${item.name}</h3>
        <p class="food-desc">${item.desc}</p>
        <div class="food-bottom">
          <span class="food-price">${formatUZS(item.price)}</span>
          <button class="add-food-btn" onclick="addToCart(${item.id})">+ Qo'shish</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Cart Logic
function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  if (!item) return;

  const exist = cart.find(c => c.id === id);
  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  // Open cart drawer gently
  cartDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
}

function updateCartQty(id, delta) {
  const index = cart.findIndex(c => c.id === id);
  if (index === -1) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountPill.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align:center; color:var(--qb-muted); margin-top:40px;">Savatingiz hozircha bo'sh.</p>`;
    cartTotalPrice.textContent = "0 so'm";
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-food-item">
      <div>
        <h4 style="font-size:0.9rem; font-weight:600;">${item.name}</h4>
        <span style="font-size:0.8rem; color:var(--qb-orange); font-weight:700;">${formatUZS(item.price)}</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <button style="width:24px; height:24px; background:#222; border:1px solid #444; color:white; border-radius:4px; cursor:pointer;" onclick="updateCartQty(${item.id}, -1)">-</button>
        <span style="font-size:0.85rem; font-weight:bold;">${item.qty}</span>
        <button style="width:24px; height:24px; background:#222; border:1px solid #444; color:white; border-radius:4px; cursor:pointer;" onclick="updateCartQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotalPrice.textContent = formatUZS(total);
}

// Drawer toggles
openCartDrawerBtn.addEventListener('click', () => {
  cartDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
});

closeCartDrawerBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
});

drawerOverlay.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
});

// Category Click
categoryContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('cat-pill')) {
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.cat;
    renderMenu();
  }
});

foodSearch.addEventListener('input', renderMenu);

// Submit Order & Tracker Simulation
submitOrderBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Buyurtma berish uchun avval taom tanlang!");
    return;
  }

  const orderNum = Math.floor(1000 + Math.random() * 9000);
  cart = [];
  updateCartUI();
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');

  trackerTeaser.style.display = 'block';
  trackerTeaser.scrollIntoView({ behavior: 'smooth' });

  // Simulate Tracker progression
  trackerStatusText.textContent = "Buyurtma qabul qilindi (#QB-" + orderNum + "). Oshxona tayyorlamoqda...";

  setTimeout(() => {
    trackerStatusText.textContent = "Kuryer taomni qabul qildi va manzilingizga qarab yo'lga chiqdi 🛵";
  }, 4000);

  setTimeout(() => {
    trackerStatusText.textContent = "Kuryer eshigingiz oldida! Yoqimli ishtaha 🎉";
  }, 8000);
});

// Table Reservation
openReserveModalBtn.addEventListener('click', () => {
  reserveModal.classList.add('open');
});

closeReserveModal.addEventListener('click', () => {
  reserveModal.classList.remove('open');
});

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('resName').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;

  reserveModal.classList.remove('open');
  reserveForm.reset();
  alert(`Rahmat, ${name}! 🍽️\nSiz uchun ${guests} kishilik VIP stol soat ${time} ga muvaffaqiyatli band qilindi.\nRestoranimizda sizni kutib qolamiz!`);
});

// Init
renderMenu();
