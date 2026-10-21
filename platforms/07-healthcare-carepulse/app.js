const doctors = [
  {
    id: 1,
    name: "Dr. Jamshid Ergashev",
    specialty: "cardio",
    specTitle: "Oliy toifali Kardiolog, t.f.n.",
    rating: 4.9,
    reviews: 148,
    price: "180,000 so'm",
    experience: "14 yil",
    bio: "Yurak ishemik kasalliklari, gipertoniya va aritmiyalarni zamonaviy xalqaro protokollar asosida davolash.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&h=160&fit=crop"
  },
  {
    id: 2,
    name: "Dr. Feruza Mahmudova",
    specialty: "neuro",
    specTitle: "Nevropatolog, Reabilitolog",
    rating: 4.8,
    reviews: 112,
    price: "160,000 so'm",
    experience: "11 yil",
    bio: "Surunkali bosh og'rig'i, migren, uyqusizlik va umurtqa pog'onasi asab kasalliklari bo'yicha mutaxassis.",
    avatar: "https://images.unsplash.com/photo-1594824813583-e18e3848b53e?w=160&h=160&fit=crop"
  },
  {
    id: 3,
    name: "Dr. Sardor Qosimov",
    specialty: "derma",
    specTitle: "Dermatokosmetolog, Triholog",
    rating: 4.9,
    reviews: 94,
    price: "150,000 so'm",
    experience: "9 yil",
    bio: "Teri allergiyalari, akne, soch to'kilishi va dermatologik lazer terapiyasi amaliyoti.",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=160&h=160&fit=crop"
  },
  {
    id: 4,
    name: "Dr. Nilufar Rahimova",
    specialty: "pediatry",
    specTitle: "Bosh Pediatr, Neonatolog",
    rating: 5.0,
    reviews: 230,
    price: "140,000 so'm",
    experience: "16 yil",
    bio: "Bolalar rivojlanishi, emlash taqvimi, immunitetni mustahkamlash va bolalar nafas yo'li kasalliklari.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&h=160&fit=crop"
  },
  {
    id: 5,
    name: "Dr. Baxtiyor Alimov",
    specialty: "therapist",
    specTitle: "Umumiy amaliyot shifokori (Terapevt)",
    rating: 4.7,
    reviews: 88,
    price: "120,000 so'm",
    experience: "8 yil",
    bio: "Birlamchi tibbiy ko'rik, laboratoriya tahlillari interpretatsiyasi va umumiy profilaktika.",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=160&h=160&fit=crop"
  }
];

let selectedDoctor = doctors[0];
let selectedSlot = "09:30";

// Elements
const doctorsGrid = document.getElementById('doctorsGrid');
const doctorSearch = document.getElementById('doctorSearch');
const specialtyFilter = document.getElementById('specialtyFilter');
const docCount = document.getElementById('docCount');

// Booking modal elements
const bookingModal = document.getElementById('bookingModal');
const closeBookingModal = document.getElementById('closeBookingModal');
const bookDocName = document.getElementById('bookDocName');
const bookDocSpec = document.getElementById('bookDocSpec');
const bookPrice = document.getElementById('bookPrice');
const bookDate = document.getElementById('bookDate');
const bookingForm = document.getElementById('bookingForm');
const timeSlots = document.getElementById('timeSlots');

// Symptom Modal elements
const symptomModal = document.getElementById('symptomModal');
const openSymptomCheckerBtn = document.getElementById('openSymptomCheckerBtn');
const closeSymptomModal = document.getElementById('closeSymptomModal');
const analyzeSymptomsBtn = document.getElementById('analyzeSymptomsBtn');
const triageResult = document.getElementById('triageResult');

// Render Doctors
function renderDoctors() {
  const query = doctorSearch.value.trim().toLowerCase();
  const spec = specialtyFilter.value;

  const filtered = doctors.filter(d => {
    const matchSpec = spec === 'all' || d.specialty === spec;
    const matchSearch = d.name.toLowerCase().includes(query) || d.specTitle.toLowerCase().includes(query) || d.bio.toLowerCase().includes(query);
    return matchSpec && matchSearch;
  });

  docCount.textContent = `Topildi: ${filtered.length} ta mutaxassis`;

  doctorsGrid.innerHTML = filtered.map(d => `
    <div class="doctor-card">
      <div class="doc-top">
        <img src="${d.avatar}" alt="${d.name}" class="doc-avatar">
        <div class="doc-info">
          <h3>${d.name}</h3>
          <span class="doc-spec">${d.specTitle}</span>
          <div class="doc-rating">★ ${d.rating} <span>(${d.reviews} sharh • Tajriba: ${d.experience})</span></div>
        </div>
      </div>
      <p class="doc-bio">${d.bio}</p>
      <div class="doc-footer">
        <div class="doc-price">
          <small>Konsultatsiya narxi:</small>
          <strong>${d.price}</strong>
        </div>
        <button class="book-btn" onclick="openBooking(${d.id})">Qabulga Yozilish</button>
      </div>
    </div>
  `).join('');
}

// Open Booking
function openBooking(docId) {
  selectedDoctor = doctors.find(d => d.id === docId);
  if (!selectedDoctor) return;

  bookDocName.textContent = selectedDoctor.name;
  bookDocSpec.textContent = selectedDoctor.specTitle;
  bookPrice.textContent = selectedDoctor.price;

  // Set today as default date
  const today = new Date().toISOString().split('T')[0];
  bookDate.min = today;
  bookDate.value = today;

  bookingModal.classList.add('open');
}

closeBookingModal.addEventListener('click', () => {
  bookingModal.classList.remove('open');
});

// Slot Selection
timeSlots.addEventListener('click', (e) => {
  if (e.target.classList.contains('slot-btn')) {
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    selectedSlot = e.target.dataset.time;
  }
});

// Submit Booking
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const patient = document.getElementById('patientName').value.trim();
  const phone = document.getElementById('patientPhone').value.trim();
  const date = bookDate.value;

  bookingModal.classList.remove('open');
  alert(`Qabul muvaffaqiyatli band qilindi! ✅\n\nShifokor: ${selectedDoctor.name}\nSana: ${date} soat ${selectedSlot}\nBemor: ${patient}\n\nSizning telefon raqamingizga (${phone}) SMS eslatma va qabul xonasi yo'llanmasi yuborildi.`);
  bookingForm.reset();
});

// Filters
doctorSearch.addEventListener('input', renderDoctors);
specialtyFilter.addEventListener('change', renderDoctors);

// AI Symptom Checker
openSymptomCheckerBtn.addEventListener('click', () => {
  symptomModal.classList.add('open');
});
closeSymptomModal.addEventListener('click', () => {
  symptomModal.classList.remove('open');
});

analyzeSymptomsBtn.addEventListener('click', () => {
  const checked = Array.from(document.querySelectorAll('.symptom-checkboxes input:checked')).map(i => i.value);
  if (checked.length === 0) {
    alert("Iltimos, kamida bitta belgini tanlang!");
    return;
  }

  let urgency = "O'rtacha daraja (Profilaktik maslahat)";
  let recommendation = "Umumiy Terapevt qabuliga yozilish tavsiya etiladi.";

  if (checked.includes('pressure') || (checked.includes('headache') && checked.includes('pressure'))) {
    urgency = "⚠️ Yuqori diqqat talab etiladi";
    recommendation = "Kardiolog Dr. Jamshid Ergashev qabuliga zudlik bilan yozilish yoki 103 xizmatiga murojaat qilish tavsiya etiladi.";
  } else if (checked.includes('headache') && checked.includes('fatigue')) {
    recommendation = "Nevrolog Dr. Feruza Mahmudova ko'rigidan o'tish va yetarli dam olish tavsiya etiladi.";
  }

  triageResult.style.display = 'block';
  triageResult.innerHTML = `
    <h4 style="color:var(--care-teal-light); margin-bottom:6px;">Tahlil Xulosasi:</h4>
    <p><strong>Holat darajasi:</strong> ${urgency}</p>
    <p><strong>Tavsiya:</strong> ${recommendation}</p>
    <small style="display:block; margin-top:8px; color:var(--care-muted);">* Eslatma: Ushbu xulosa sun'iy intellekt tomonidan shakllantirilgan bo'lib, rasmiy tibbiy tashxis o'rnini bosa olmaydi.</small>
  `;
});

// Init
renderDoctors();
