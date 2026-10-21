const properties = [
  {
    id: 1,
    title: "Skyline Imperial Penthouse",
    type: "penthouse",
    location: "tashkent-city",
    locationName: "Tashkent City, Nest One binosi",
    price: 480000,
    bedrooms: 4,
    bathrooms: 3,
    area: "260 m²",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&fit=crop",
    tag: "EKSKLYUZIV"
  },
  {
    id: 2,
    title: "Chorvoq Lakefront Royal Villa",
    type: "villa",
    location: "chimgan",
    locationName: "Bo'stonliq, Chorvoq sohil bo'yi",
    price: 650000,
    bedrooms: 6,
    bathrooms: 5,
    area: "540 m²",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&fit=crop",
    tag: "PREMIUM VILLA"
  },
  {
    id: 3,
    title: "Mirobod Avenue Modern Residence",
    type: "apartment",
    location: "mirabad",
    locationName: "Mirobod tumani, Glinka ko'chasi",
    price: 220000,
    bedrooms: 3,
    bathrooms: 2,
    area: "145 m²",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&fit=crop",
    tag: "TAYYOR TA'MIR"
  },
  {
    id: 4,
    title: "Green Hills Modernist Villa",
    type: "villa",
    location: "chimgan",
    locationName: "Chorvoq tog' etagi, Chimgan",
    price: 390000,
    bedrooms: 5,
    bathrooms: 4,
    area: "420 m²",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&fit=crop",
    tag: "ECO VILLA"
  },
  {
    id: 5,
    title: "Grand Tower Deluxe Suite",
    type: "apartment",
    location: "tashkent-city",
    locationName: "Tashkent City Park zonasi",
    price: 195000,
    bedrooms: 2,
    bathrooms: 2,
    area: "110 m²",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&fit=crop",
    tag: "YANGI LOYIHA"
  },
  {
    id: 6,
    title: "Royal Palms Private Manor",
    type: "penthouse",
    location: "mirabad",
    locationName: "Mirobod tumani, Chexov ko'chasi",
    price: 520000,
    bedrooms: 5,
    bathrooms: 4,
    area: "310 m²",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&fit=crop",
    tag: "VIP PENTHOUSE"
  }
];

// Elements
const propertiesGrid = document.getElementById('propertiesGrid');
const resultsCount = document.getElementById('resultsCount');
const typeFilter = document.getElementById('typeFilter');
const locationFilter = document.getElementById('locationFilter');
const maxPriceInput = document.getElementById('maxPriceInput');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');

// Mortgage Elements
const openMortgageBtn = document.getElementById('openMortgageBtn');
const closeMortgageModal = document.getElementById('closeMortgageModal');
const mortgageModal = document.getElementById('mortgageModal');
const calcPrice = document.getElementById('calcPrice');
const calcDownPct = document.getElementById('calcDownPct');
const calcYears = document.getElementById('calcYears');
const calcRate = document.getElementById('calcRate');
const calcMonthly = document.getElementById('calcMonthly');
const calcDownAmount = document.getElementById('calcDownAmount');
const calcLoanAmount = document.getElementById('calcLoanAmount');
const calcTotalInterest = document.getElementById('calcTotalInterest');

// Render Properties
function renderProperties() {
  const type = typeFilter.value;
  const loc = locationFilter.value;
  const maxP = parseFloat(maxPriceInput.value) || Infinity;

  const filtered = properties.filter(p => {
    const matchType = type === 'all' || p.type === type;
    const matchLoc = loc === 'all' || p.location === loc;
    const matchPrice = p.price <= maxP;
    return matchType && matchLoc && matchPrice;
  });

  resultsCount.textContent = `${filtered.length} ta obyekt`;

  propertiesGrid.innerHTML = filtered.map(p => `
    <article class="property-card">
      <div class="prop-img-box">
        <img src="${p.img}" alt="${p.title}">
        <span class="prop-tag">${p.tag}</span>
      </div>
      <div class="prop-content">
        <div class="prop-price">$${p.price.toLocaleString()}</div>
        <h3 class="prop-title">${p.title}</h3>
        <div class="prop-location">📍 ${p.locationName}</div>
        <div class="prop-specs">
          <span>🛏️ ${p.bedrooms} Xona</span>
          <span>🚿 ${p.bathrooms} Vanna</span>
          <span>📐 ${p.area}</span>
        </div>
        <div class="prop-footer">
          <button class="view-tour-btn" onclick="openMortgageForProperty(${p.price})">Ipoteka Hisobi</button>
          <button class="view-tour-btn" onclick="scheduleTour('${p.title}')">Ko'rishga Yozilish</button>
        </div>
      </div>
    </article>
  `).join('');
}

function scheduleTour(title) {
  const phone = prompt(`"${title}" obyektini shaxsan ko'rish uchun telefon raqamingizni qoldiring:`);
  if (phone) {
    alert("Rahmat! VIP ko'chmas mulk menejerimiz 15 daqiqa ichida siz bilan bog'lanadi.");
  }
}

// Mortgage Calculator Logic
function calculateMortgage() {
  const price = parseFloat(calcPrice.value) || 0;
  const downPct = parseFloat(calcDownPct.value) || 0;
  const years = parseFloat(calcYears.value) || 1;
  const annualRate = parseFloat(calcRate.value) || 0;

  const downAmount = price * (downPct / 100);
  const loanAmount = price - downAmount;
  const monthlyRate = (annualRate / 100) / 12;
  const totalMonths = years * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = loanAmount / totalMonths;
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  calcMonthly.textContent = `$${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  calcDownAmount.textContent = `$${Math.round(downAmount).toLocaleString()}`;
  calcLoanAmount.textContent = `$${Math.round(loanAmount).toLocaleString()}`;
  calcTotalInterest.textContent = `$${Math.round(totalInterest).toLocaleString()}`;
}

function openMortgageForProperty(price) {
  calcPrice.value = price;
  calculateMortgage();
  mortgageModal.classList.add('open');
}

openMortgageBtn.addEventListener('click', () => {
  calculateMortgage();
  mortgageModal.classList.add('open');
});

closeMortgageModal.addEventListener('click', () => {
  mortgageModal.classList.remove('open');
});

[calcPrice, calcDownPct, calcYears, calcRate].forEach(input => {
  input.addEventListener('input', calculateMortgage);
});

applyFiltersBtn.addEventListener('click', renderProperties);

// Init
renderProperties();
calculateMortgage();
