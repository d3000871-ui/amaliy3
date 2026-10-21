const platforms = [
  {
    id: "01-ecommerce-novamart",
    number: "01",
    name: "NovaMart",
    category: "commerce",
    categoryLabel: "E-Commerce & Tech Marketplace",
    icon: "🛍️",
    iconBg: "linear-gradient(135deg, #6366f1, #a855f7)",
    desc: "Next-gen elektronika va flagman gadjetlar savdo portali. Jonli qidiruv, savat kalkulyatori, promo-kod tizimi va ko'p valyutali to'lov integratsiyasi.",
    features: ["Jonli Savat (Cart Drawer)", "Valyuta almashinuvi ($ / so'm / €)", "Kupon: SALE2026 (-20%)", "Buyurtma rasmiylashtirish"],
    path: "platforms/01-ecommerce-novamart/index.html"
  },
  {
    id: "02-learning-edusphere",
    number: "02",
    name: "EduSphere",
    category: "ai",
    categoryLabel: "EdTech & IT Akademiya",
    icon: "🎓",
    iconBg: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
    desc: "Full-Stack AI va Machine Learning bo'yicha onlayn ta'lim platformasi. Video darslar simulyatori, interaktiv viktorina (quiz) va rasmiy Canvas sertifikat generatsiyasi.",
    features: ["HTML5 Canvas Sertifikat", "Interaktiv Quiz Test", "Video darslik pleer", "Progress monitoring"],
    path: "platforms/02-learning-edusphere/index.html"
  },
  {
    id: "03-saas-taskflow",
    number: "03",
    name: "TaskFlow Pro",
    category: "saas",
    categoryLabel: "SaaS & Agile Kanban",
    icon: "⚡",
    iconBg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    desc: "Dasturchilar va startap jamoalari uchun qulay vazifalar boshqaruvi. To'rt bosqichli Kanban doska, ustuvorlik yorliqlari va real vaqt unumdorlik statistikasi.",
    features: ["4-ustunli Kanban Board", "Vazifalarni ko'chirish", "Tezkor qidiruv & filtr", "Unumdorlik tahlili"],
    path: "platforms/03-saas-taskflow/index.html"
  },
  {
    id: "04-social-pulsenet",
    number: "04",
    name: "PulseNet",
    category: "lifestyle",
    categoryLabel: "Social Network & Feed",
    icon: "🌐",
    iconBg: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    desc: "Dasturchilar va IT hamjamiyati uchun zamonaviy ijtimoiy tarmoq. Story karuseli, kod blokli postlar kompozitori, layk va izohlar tizimi hamda trend xeshteglar.",
    features: ["Hikoyalar (Stories Bar)", "Kodli post chop etish", "Layk & Izohlar", "Obuna (Follow) mexanizmi"],
    path: "platforms/04-social-pulsenet/index.html"
  },
  {
    id: "05-ai-nexus-studio",
    number: "05",
    name: "Nexus AI Studio",
    category: "ai",
    categoryLabel: "Generative AI Playground",
    icon: "✨",
    iconBg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    desc: "Gemini 2.5 Pro, Claude 3.7 va GPT-4o modellarini boshqarish studiyasi. Harorat (temperature) sozlagichi, tizim personasi va real vaqtda kod generatsiya strimi.",
    features: ["Ko'p modelli AI selektor", "Kod sintaksisi yoritilishi", "Token hisoblagich", "Prompt shablonlari"],
    path: "platforms/05-ai-nexus-studio/index.html"
  },
  {
    id: "06-crypto-finpulse",
    number: "06",
    name: "FinPulse Terminal",
    category: "fintech",
    categoryLabel: "FinTech & Crypto Trading",
    icon: "💎",
    iconBg: "linear-gradient(135deg, #f59e0b, #10b981)",
    desc: "Professional kripto-aktivlar monitoringi va savdo terminali. Jonli dinamik HTML5 Canvas egri chiziqli narx grafigi, ticker tebranishlari va virtual ayirboshlash (Instant Swap).",
    features: ["Jonli Canvas Narx Grafigi", "USDT Instant Swap", "Jonli narx tebranishlari", "Portfolio taqsimoti"],
    path: "platforms/06-crypto-finpulse/index.html"
  },
  {
    id: "07-healthcare-carepulse",
    number: "07",
    name: "CarePulse",
    category: "health",
    categoryLabel: "Telehealth & Tibbiyot",
    icon: "🩺",
    iconBg: "linear-gradient(135deg, #0d9488, #14b8a6)",
    desc: "Oliy toifali shifokorlar qabuliga onlayn yozilish va telemeditsina portali. Mutaxassisliklar filtri, qabul soatini tanlash va sun'iy intellekt simptom tekshiruv moduli.",
    features: ["3-Bosqichli Qabul Qayd", "AI Simptom Tahlilchisi", "Shifokorlar reytingi", "Tez yordam chaqiruv paneli"],
    path: "platforms/07-healthcare-carepulse/index.html"
  },
  {
    id: "08-realestate-urbannest",
    number: "08",
    name: "UrbanNest",
    category: "health",
    categoryLabel: "Hashamatli Ko'chmas Mulk",
    icon: "🏛️",
    iconBg: "linear-gradient(135deg, #d97706, #b45309)",
    desc: "Premium xonadonlar, villalar va pentxauslar katalogi. Ko'p parametrli filtratsiya va oylik kredit to'lovlarini real vaqtda amortizatsiya bilan hisoblovchi ipoteka kalkulyatori.",
    features: ["Ipoteka Kalkulyatori ($)", "Amortizatsiya foiz hisobi", "Villa & Pentxaus filtri", "VIP Ko'rishga yozilish"],
    path: "platforms/08-realestate-urbannest/index.html"
  },
  {
    id: "09-music-soundwave",
    number: "09",
    name: "SoundWave Studio",
    category: "lifestyle",
    categoryLabel: "Audio & Music Streaming",
    icon: "🎵",
    iconBg: "linear-gradient(135deg, #a3e635, #15803d)",
    desc: "Dasturchilar va ijodkorlar uchun xususiy audio striming studiyasi. Haqiqiy Web Audio API sintezator motori (sinxron ovoz generatsiyasi) va jonli Canvas spektr ekvalayzeri.",
    features: ["Web Audio API Sintezatori", "Jonli Spektr Ekvalayzeri", "Aylanuvchi Vinil Plastinka", "Pleyer boshqaruv paneli"],
    path: "platforms/09-music-soundwave/index.html"
  },
  {
    id: "10-food-quickbite",
    number: "10",
    name: "QuickBite",
    category: "commerce",
    categoryLabel: "Food Delivery & Stol Band Qilish",
    icon: "🍔",
    iconBg: "linear-gradient(135deg, #f97316, #ea580c)",
    desc: "Gourmet taomlar yetkazib berish va restoranda stol band qilish tizimi. Kategoriya bo'yicha saralash, interaktiv savatcha va buyurtmani real vaqtda kuzatuvchi Live Order Tracker.",
    features: ["Jonli Buyurtma Trekeri", "Restoran stoli rezervi", "Kategoriya filtratsiyasi", "Tezkor buyurtma hisobi"],
    path: "platforms/10-food-quickbite/index.html"
  }
];

let activeCategory = 'all';
let searchQuery = '';

// DOM Elements
const platformsGrid = document.getElementById('platformsGrid');
const platformSearch = document.getElementById('platformSearch');
const categoryChips = document.getElementById('categoryChips');
const activeCounter = document.getElementById('activeCounter');

// Preview Modal Elements
const previewModal = document.getElementById('previewModal');
const closePreviewBtn = document.getElementById('closePreviewBtn');
const previewModalTitle = document.getElementById('previewModalTitle');
const previewModalIcon = document.getElementById('previewModalIcon');
const previewDirectLink = document.getElementById('previewDirectLink');
const platformIframe = document.getElementById('platformIframe');
const deviceButtons = document.querySelectorAll('.dev-btn');

// Render Platforms Grid
function renderPlatforms() {
  const filtered = platforms.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery) ||
                        p.categoryLabel.toLowerCase().includes(searchQuery) ||
                        p.desc.toLowerCase().includes(searchQuery) ||
                        p.features.some(f => f.toLowerCase().includes(searchQuery));
    return matchCat && matchSearch;
  });

  activeCounter.textContent = `${filtered.length} ta loyiha faol ko'rinishda`;

  if (filtered.length === 0) {
    platformsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--hub-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 10px;">🔍</p>
        <h3>Hech qanday platforma topilmadi</h3>
        <p>Qidiruv so'zini o'zgartiring yoki filtrlarni qayta sozlang.</p>
      </div>
    `;
    return;
  }

  platformsGrid.innerHTML = filtered.map(p => `
    <article class="app-card" data-id="${p.id}">
      <div class="app-card-top">
        <div class="app-icon-wrap" style="background: ${p.iconBg}">
          ${p.icon}
        </div>
        <span class="app-num">#${p.number}</span>
      </div>
      <span class="app-category-badge">${p.categoryLabel}</span>
      <h3 class="app-title">${p.name}</h3>
      <p class="app-desc">${p.desc}</p>
      <div class="app-features-list">
        ${p.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
      </div>
      <div class="app-card-actions">
        <button class="btn-preview" onclick="openLivePreview('${p.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <span>Sinash (Sandbox)</span>
        </button>
        <a href="${p.path}" target="_blank" class="btn-launch">
          <span>Ochish</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `).join('');
}

// Open Live Preview Frame
function openLivePreview(platformId) {
  const p = platforms.find(item => item.id === platformId);
  if (!p) return;

  previewModalIcon.textContent = p.icon;
  previewModalTitle.textContent = `${p.name} — ${p.categoryLabel}`;
  previewDirectLink.href = p.path;
  platformIframe.src = p.path;
  platformIframe.style.width = "100%";

  // Reset device toggle buttons
  deviceButtons.forEach(b => b.classList.remove('active'));
  document.querySelector('.dev-btn[data-width="100%"]').classList.add('active');

  previewModal.classList.add('open');
}

closePreviewBtn.addEventListener('click', () => {
  previewModal.classList.remove('open');
  platformIframe.src = 'about:blank';
});

previewModal.addEventListener('click', (e) => {
  if (e.target === previewModal) {
    previewModal.classList.remove('open');
    platformIframe.src = 'about:blank';
  }
});

// Device Viewport Toggles in Preview Modal
deviceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    deviceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const width = btn.dataset.width;
    platformIframe.style.width = width;
  });
});

// Search & Filter Events
platformSearch.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderPlatforms();
});

categoryChips.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-chip')) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    activeCategory = e.target.dataset.category;
    renderPlatforms();
  }
});

// Initialize Master Hub
renderPlatforms();
