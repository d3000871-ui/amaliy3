const lessons = [
  { id: 1, title: "1. Sun'iy Intellekt va Neyron Tarmoqlari Kirish", duration: "21:00", completed: true, module: "1-Modul" },
  { id: 2, title: "2. Transformer Arxitekturasi & Attention Mexanizmi", duration: "28:15", completed: true, module: "1-Modul" },
  { id: 3, title: "3. PyTorch bilan Katta Til Modellarini (LLM) Nozik Sozlash", duration: "35:40", completed: false, module: "2-Modul" },
  { id: 4, title: "4. RAG (Retrieval-Augmented Generation) & Vektor Bazalar", duration: "24:50", completed: false, module: "2-Modul" },
  { id: 5, title: "5. Production Deploy: FastAPI, Docker & vLLM", duration: "30:10", completed: false, module: "3-Modul" }
];

const quizQuestions = [
  {
    question: "1. Transformer arxitekturasida Self-Attention qatlamining asosiy afzalligi nima?",
    options: [
      "Ketma-ketlikdagi barcha so'zlarni parallel ravishda qayta ishlash imkoniyati",
      "Faqat matnning oxirgi so'zini eslab qolish",
      "Modelning xotira sarfini doimo 0 ga tenglashtirish",
      "Faqat ingliz tilidagi matnlar bilan ishlashi"
    ],
    correct: 0,
    explanation: "To'g'ri! Self-Attention mexanizmi matndagi barcha tokenlar o'rtasidagi bog'liqlikni parallel hisoblab chiqadi."
  },
  {
    question: "2. LLM modellarini Fine-Tuning qilishda LoRA (Low-Rank Adaptation) nima uchun ishlatiladi?",
    options: [
      "Barcha parametrlarni qaytadan tasodifiy generatsiya qilish uchun",
      "Xotirani tejash va faqat kam sonli adapter matritsalarini o'qitish uchun",
      "Kompilatorni tezroq o'chirish uchun",
      "Internet tezligini 10 barobar oshirish uchun"
    ],
    correct: 1,
    explanation: "Ajoyib! LoRA og'ir model parametrlarini muzlatib, faqat past darajali adapterlarni yangilaydi."
  },
  {
    question: "3. RAG (Retrieval-Augmented Generation) tizimida vektor bazalarining roli nima?",
    options: [
      "Foydalanuvchi so'roviga semantik yaqin hujjatlarni tezkor qidirib topish",
      "Kompyuter ekranining yorug'ligini boshqarish",
      "HTML fayllarni PDF ga aylantirish",
      "Modelning barcha xatolarini yashirish"
    ],
    correct: 0,
    explanation: "To'g'ri! Vektor ma'lumotlar bazalari (Pinecone, Chroma, Qdrant) semantik o'xshashlik orqali eng mos ma'lumotni topadi."
  }
];

let currentLessonIndex = 0;
let currentQuizIndex = 0;
let isPlaying = false;
let currentSpeed = 1;

// Elements
const modulesList = document.getElementById('modulesList');
const currentModuleBadge = document.getElementById('currentModuleBadge');
const currentLessonTitle = document.getElementById('currentLessonTitle');
const markCompletedBtn = document.getElementById('markCompletedBtn');
const overallProgressFill = document.getElementById('overallProgressFill');
const overallProgressText = document.getElementById('overallProgressText');
const playPauseBtn = document.getElementById('playPauseBtn');
const playOverlay = document.getElementById('playOverlay');
const videoSlider = document.getElementById('videoSlider');
const speedSelect = document.getElementById('speedSelect');
const timeLabel = document.getElementById('timeLabel');

// Quiz Elements
const quizQuestion = document.getElementById('quizQuestion');
const quizCounter = document.getElementById('quizCounter');
const quizOptions = document.getElementById('quizOptions');
const quizResultMsg = document.getElementById('quizResultMsg');
const nextQuizBtn = document.getElementById('nextQuizBtn');

// Modal & Cert
const openCertModalBtn = document.getElementById('openCertModalBtn');
const closeCertModal = document.getElementById('closeCertModal');
const certModal = document.getElementById('certModal');
const studentCertName = document.getElementById('studentCertName');
const generateCertBtn = document.getElementById('generateCertBtn');
const certCanvas = document.getElementById('certCanvas');
const downloadCertBtn = document.getElementById('downloadCertBtn');

// Render Lessons
function renderLessons() {
  modulesList.innerHTML = lessons.map((l, index) => `
    <div class="lesson-item ${index === currentLessonIndex ? 'active' : ''} ${l.completed ? 'completed' : ''}" onclick="selectLesson(${index})">
      <div class="lesson-left">
        <div class="lesson-status-icon">${l.completed ? '✓' : index + 1}</div>
        <div>
          <div class="lesson-name">${l.title}</div>
          <div class="lesson-duration">${l.module} • ⏱ ${l.duration}</div>
        </div>
      </div>
    </div>
  `).join('');

  const completedCount = lessons.filter(l => l.completed).length;
  const pct = Math.round((completedCount / lessons.length) * 100);
  overallProgressFill.style.width = `${pct}%`;
  overallProgressText.textContent = `${pct}%`;
}

function selectLesson(index) {
  currentLessonIndex = index;
  const l = lessons[index];
  currentModuleBadge.textContent = `${l.module} • ${index + 1}-Dars`;
  currentLessonTitle.textContent = l.title;
  renderLessons();
}

markCompletedBtn.addEventListener('click', () => {
  lessons[currentLessonIndex].completed = true;
  renderLessons();
  alert("Dars yakunlangan deb belgilandi! Progress yangilandi.");
});

// Video Simulation
function togglePlay() {
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
  playOverlay.style.opacity = isPlaying ? '0' : '1';
  playOverlay.style.pointerEvents = isPlaying ? 'none' : 'auto';
}

playPauseBtn.addEventListener('click', togglePlay);
playOverlay.addEventListener('click', togglePlay);

videoSlider.addEventListener('input', (e) => {
  const val = e.target.value;
  const totalSec = 21 * 60;
  const curSec = Math.floor((val / 100) * totalSec);
  const m = String(Math.floor(curSec / 60)).padStart(2, '0');
  const s = String(curSec % 60).padStart(2, '0');
  timeLabel.textContent = `${m}:${s} / 21:00`;
});

speedSelect.addEventListener('change', (e) => {
  currentSpeed = e.target.value;
});

// Tabs
document.querySelectorAll('.tab-nav').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-nav').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`pane-${btn.dataset.tab}`).classList.add('active');
  });
});

// Quiz Logic
function renderQuiz() {
  const q = quizQuestions[currentQuizIndex];
  quizQuestion.textContent = q.question;
  quizCounter.textContent = `${currentQuizIndex + 1} / ${quizQuestions.length} Savol`;
  quizResultMsg.textContent = '';
  nextQuizBtn.style.display = 'none';

  quizOptions.innerHTML = q.options.map((opt, i) => `
    <button class="quiz-opt-btn" onclick="checkAnswer(${i})">${opt}</button>
  `).join('');
}

function checkAnswer(chosenIndex) {
  const q = quizQuestions[currentQuizIndex];
  const buttons = quizOptions.querySelectorAll('.quiz-opt-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === chosenIndex) {
      btn.classList.add('wrong');
    }
  });

  if (chosenIndex === q.correct) {
    quizResultMsg.innerHTML = `<span style="color:#10b981;">✓ ${q.explanation}</span>`;
  } else {
    quizResultMsg.innerHTML = `<span style="color:#ef4444;">✗ Noto'g'ri tanlov. To'g'ri javob yashil bilan belgilandi.</span>`;
  }

  if (currentQuizIndex < quizQuestions.length - 1) {
    nextQuizBtn.style.display = 'inline-block';
  } else {
    quizResultMsg.innerHTML += `<br><strong style="color:#f59e0b;">🎉 Barcha savollarni yakunladingiz! Endi rasmiy sertifikat olishingiz mumkin.</strong>`;
  }
}

nextQuizBtn.addEventListener('click', () => {
  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex++;
    renderQuiz();
  }
});

// Notes
const studentNotes = document.getElementById('studentNotes');
const saveNotesBtn = document.getElementById('saveNotesBtn');
studentNotes.value = localStorage.getItem('edu_notes') || '';
saveNotesBtn.addEventListener('click', () => {
  localStorage.setItem('edu_notes', studentNotes.value);
  alert("Qaydlaringiz saqlandi!");
});

// Certificate Canvas Rendering
function drawCertificate(name = "Azizbek Rahimov") {
  const ctx = certCanvas.getContext('2d');
  const w = certCanvas.width;
  const h = certCanvas.height;

  // Background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e1b4b');
  grad.addColorStop(1, '#090d16');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Border Gold
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#d97706';
  ctx.strokeRect(20, 20, w - 40, h - 40);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#f59e0b';
  ctx.strokeRect(32, 32, w - 64, h - 64);

  // Watermark emblem
  ctx.font = 'bold 120px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.textAlign = 'center';
  ctx.fillText('EDUSPHERE', w / 2, h / 2 + 30);

  // Headers
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('🎓 EDUSPHERE ACADEMY', w / 2, 90);

  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText("MUVAFAQIYATLI TAMOMLANGANLIK TO'G'RISIDA RASMIY", w / 2, 130);

  ctx.font = 'bold 44px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('SERTIFIKAT', w / 2, 185);

  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText("Ushbu sertifikat quyidagi shaxsga taqdim etiladi:", w / 2, 230);

  // Student Name
  ctx.font = 'bold 42px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText(name.toUpperCase(), w / 2, 290);

  // Underline
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 220, 310);
  ctx.lineTo(w / 2 + 220, 310);
  ctx.stroke();

  // Course Details
  ctx.font = '22px sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('Kurs: "Full-Stack AI Developer & Machine Learning"', w / 2, 360);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText("PyTorch, Transformer, LLM Nozik Sozlash, RAG arxitekturasi va amaliy loyihalar.", w / 2, 395);

  // Date and Verification ID
  const today = new Date().toLocaleDateString('uz-UZ');
  const certId = "ES-" + Math.floor(100000 + Math.random() * 900000);

  ctx.textAlign = 'left';
  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`Berilgan sana: ${today}`, 70, 520);
  ctx.fillText(`Verifikatsiya ID: ${certId}`, 70, 545);

  // Signatures
  ctx.textAlign = 'right';
  ctx.fillText('Bosh O\'qituvchi: Dr. A. Mirzayev', w - 70, 520);
  ctx.fillText('Direktor: EduSphere Global Board', w - 70, 545);

  // Gold Badge in center bottom
  ctx.textAlign = 'center';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('★ 2026 VERIFIED ★', w / 2, 535);
}

// Modal handling
openCertModalBtn.addEventListener('click', () => {
  certModal.classList.add('open');
  drawCertificate(studentCertName.value || "Azizbek Rahimov");
});

closeCertModal.addEventListener('click', () => {
  certModal.classList.remove('open');
});

generateCertBtn.addEventListener('click', () => {
  const name = studentCertName.value.trim() || "Foydalanuvchi";
  drawCertificate(name);
});

downloadCertBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `EduSphere-Sertifikat.png`;
  link.href = certCanvas.toDataURL('image/png');
  link.click();
});

// Init
renderLessons();
renderQuiz();
