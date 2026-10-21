# 🪐 OmniSphere — 10 Ta Zamonaviy & Interaktiv Web Platformalar Ekotizimi

**Amaliy Mashg'ulot #3 (amaliy3)**  
**GitHub Repozitoriy:** [https://github.com/d3000871-ui/amaliy3.git](https://github.com/d3000871-ui/amaliy3.git)  
**Muallif:** `d3000871-ui`

---

## 📖 Loyiha Haqida

Ushbu loyiha zamonaviy veb-ishlab chiqish standartlari asosida yaratilgan **10 ta to'liq mustaqil, interaktiv va yuqori darajada vizuallashgan platformalar** hamda ularni birlashtiruvchi markaziy **Master Platform Portal (Hub)** dan iborat.

Hech qanday og'ir tashqi kutubxonalarsiz (**0 Dependency**), toza **HTML5**, zamonaviy **CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism)** va **Vanilla JavaScript (ES6+, Canvas API, Web Audio API DSP)** yordamida noldan qurilgan.

---

## 🌟 10 Ta Platforma Ro'yxati & Xususiyatlari

| № | Platforma Nomi | Yo'nalish | Asosiy Imkoniyatlar & Interaktivlik | Standalone Katalog |
|---|---|---|---|---|
| **01** | **NovaMart** | E-Commerce & Gadjetlar | Dinamik savat (slide-out cart), ko'p valyutali to'lov (USD/UZS/EUR), promo-kod (`SALE2026` - 20%), saralash va buyurtma rasmiylashtirish. | [`platforms/01-ecommerce-novamart/`](platforms/01-ecommerce-novamart/index.html) |
| **02** | **EduSphere** | EdTech & IT Akademiya | Video darslik pleer simulyatori, interaktiv bilimni tekshirish testi (Quiz), real vaqtda talaba nomiga **HTML5 Canvas rasmiy sertifikat generatsiyasi** va PNG yuklab olish. | [`platforms/02-learning-edusphere/`](platforms/02-learning-edusphere/index.html) |
| **03** | **TaskFlow Pro** | SaaS & Agile Kanban | 4 ustunli Kanban boshqaruv doskasi (Backlog, In Progress, Review, Done), vazifalar yaratish/o'chirish, ustuvorlik (High/Med/Low) va jamoa statistikasi. | [`platforms/03-saas-taskflow/`](platforms/03-saas-taskflow/index.html) |
| **04** | **PulseNet** | Ijtimoiy Tarmoq & Feed | Hikoyalar karuseli (Stories bar), kod bloklari va teglar bilan post nashr qilish, animatsiyali layk va sharhlar qoldirish, obuna (Follow) mexanizmi. | [`platforms/04-social-pulsenet/`](platforms/04-social-pulsenet/index.html) |
| **05** | **Nexus AI Studio** | Generative AI Playground | Gemini 2.5, Claude 3.7 va GPT-4o modellari selektori, harorat (temperature) sozlagichi, tizim personasi, real vaqtda kod generatsiyasi va token hisoblagich. | [`platforms/05-ai-nexus-studio/`](platforms/05-ai-nexus-studio/index.html) |
| **06** | **FinPulse Terminal** | FinTech & Kripto Savdo | Jonli dinamik HTML5 Canvas egri chiziqli narx grafigi, real vaqtli narx miltillashi (ticker ticks), USDT ayirboshlash (Instant Swap) va portfolio balansi. | [`platforms/06-crypto-finpulse/`](platforms/06-crypto-finpulse/index.html) |
| **07** | **CarePulse** | Telehealth & Tibbiyot | Shifokorlar katalogi (kardiolog, nevrolog, terapevt va h.k.), 3 bosqichli qabulga yozilish taqvimi hamda **AI Simptom Tahlilchisi (Triage Checker)**. | [`platforms/07-healthcare-carepulse/`](platforms/07-healthcare-carepulse/index.html) |
| **08** | **UrbanNest** | Hashamatli Ko'chmas Mulk | Eksklyuziv villalar va pentxauslar katalogi, hudud/narx bo'yicha filtr hamda oylik to'lov va yillik foizlarni hisoblovchi **Ipoteka Kalkulyatori**. | [`platforms/08-realestate-urbannest/`](platforms/08-realestate-urbannest/index.html) |
| **09** | **SoundWave Studio** | Audio & Musiqa Striming | **Web Audio API** yordamida brauzerda sintezlanuvchi haqiqiy ohanglar, aylanuvchi vinil plastinka, pleyer boshqaruvi va jonli **Canvas Spektr Ekvalayzeri**. | [`platforms/09-music-soundwave/`](platforms/09-music-soundwave/index.html) |
| **10** | **QuickBite** | Taom Yetkazish & Stol Band Qilish | Kategoriyalangan restoran menyusi, jonli savat, restoranda VIP stol band qilish tizimi va 4 bosqichli **Jonli Buyurtma Trekeri (Live Order Tracker)**. | [`platforms/10-food-quickbite/`](platforms/10-food-quickbite/index.html) |

---

## 🏛️ Loyiha Fayllari Tuzilishi

```text
amaliy3/
├── index.html                   # Markaziy Platform Hub (Barcha platformalarni qamrab oluvchi portal)
├── style.css                    # Markaziy Portal Dizayn Tizimi (Glassmorphism & Responsive Sandbox)
├── app.js                       # Markaziy Portal Mantiqi (Qidiruv, Kategoriya filtri, Iframe Sandbox)
├── README.md                    # To'liq hujjatlar va yo'riqnoma
└── platforms/
    ├── 01-ecommerce-novamart/   # 1-Platforma: NovaMart E-Commerce
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 02-learning-edusphere/   # 2-Platforma: EduSphere Ta'lim Akademiyasi
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 03-saas-taskflow/        # 3-Platforma: TaskFlow Pro Kanban SaaS
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 04-social-pulsenet/      # 4-Platforma: PulseNet Ijtimoiy Tarmoq
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 05-ai-nexus-studio/      # 5-Platforma: Nexus AI Prompt Studiyasi
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 06-crypto-finpulse/      # 6-Platforma: FinPulse Kripto Terminal
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 07-healthcare-carepulse/ # 7-Platforma: CarePulse Telemeditsina
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 08-realestate-urbannest/ # 8-Platforma: UrbanNest Ko'chmas Mulk
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── 09-music-soundwave/      # 9-Platforma: SoundWave Audio Studio
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    └── 10-food-quickbite/       # 10-Platforma: QuickBite Taom Yetkazish
        ├── index.html
        ├── style.css
        └── app.js
```

---

## 🚀 Ishga Tushirish Yo'riqnomasi

Loyihani ishga tushirish uchun hech qanday `npm install` yoki kompilyatsiya talab etilmaydi!

1. Repozitoriyni klonlash:
   ```bash
   git clone https://github.com/d3000871-ui/amaliy3.git
   cd amaliy3
   ```
2. Loyihani brauzerda ochish:
   - To'g'ridan-to'g'ri `index.html` faylini ikki marta bosib ochishingiz mumkin, yoki
   - VS Code Live Server / istalgan lokal server (masalan, `npx serve .` yoki `python -m http.server 8000`) orqali ochish.

---

## 🎨 Dizayn & Texnologiyalar

- **Typography:** `Plus Jakarta Sans`, `Space Grotesk`, `Playfair Display` (Google Fonts)
- **Styling:** CSS3 Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism, Animated Gradients
- **Media & Icons:** Inline SVG & Retina Iconography
- **Audio Processing:** Native Web Audio API Synthesizer
- **Graphics:** HTML5 Canvas 2D Rendering Context (Dinamik grafiklar va sertifikatlar)
- **Hosting:** GitHub Pages & Static Web Servers ready!
