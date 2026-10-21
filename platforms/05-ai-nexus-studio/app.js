const personaPrompts = {
  "senior-dev": "Siz Google va DeepMind darajasidagi Senior Software Architectsiz. Clean code, microservices va optimal algoritmlar asosida javob bering.",
  "ai-researcher": "Siz AI & LLM Research Scientist sifatida Transformerlar, Attention mexanizmi va model optimizatsiyasi bo'yicha ilmiy va aniq ma'lumot berasiz.",
  "copywriter": "Siz yuqori konversiyali matnlar yozuvchi kreativ marketologsiz. Kuchli sarlavhalar va qiziqarli hikoyalar yaratasiz.",
  "cyber-security": "Siz Ethical Hacker va Application Security mutaxassisisiz. OWASP Top 10, shifrlash va xavfsiz konfiguratsiyalarni tushuntirasiz."
};

let currentTokens = 1240;

// Elements
const modelSelector = document.getElementById('modelSelector');
const personaSelect = document.getElementById('personaSelect');
const systemPromptText = document.getElementById('systemPromptText');
const tempSlider = document.getElementById('tempSlider');
const tempVal = document.getElementById('tempVal');
const messagesStream = document.getElementById('messagesStream');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const tokenCount = document.getElementById('tokenCount');
const clearChatBtn = document.getElementById('clearChatBtn');

// Handlers
personaSelect.addEventListener('change', (e) => {
  systemPromptText.value = personaPrompts[e.target.value] || "";
});

tempSlider.addEventListener('input', (e) => {
  tempVal.textContent = e.target.value;
});

// Template chips
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    promptInput.value = chip.dataset.template;
    promptInput.focus();
  });
});

clearChatBtn.addEventListener('click', () => {
  messagesStream.innerHTML = `
    <div class="msg ai">
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble">
        <h4>Nexus AI Studio tozalandi</h4>
        <p>Yangi sessiya boshlandi. So'rovingizni yozing!</p>
      </div>
    </div>
  `;
});

// Send Prompt
function handleSend() {
  const query = promptInput.value.trim();
  if (!query) return;

  // Add User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.innerHTML = `
    <div class="msg-avatar">👤</div>
    <div class="msg-bubble">
      <p>${escapeHTML(query)}</p>
    </div>
  `;
  messagesStream.appendChild(userMsg);
  promptInput.value = '';
  messagesStream.scrollTop = messagesStream.scrollHeight;

  // Simulate AI Thinking & Response
  const aiMsg = document.createElement('div');
  aiMsg.className = 'msg ai';
  const modelName = modelSelector.options[modelSelector.selectedIndex].text;
  
  aiMsg.innerHTML = `
    <div class="msg-avatar">✨</div>
    <div class="msg-bubble">
      <h4>${modelName.split(' ')[0]} javobi:</h4>
      <div class="ai-stream-text">Tahlil qilinmoqda...</div>
    </div>
  `;
  messagesStream.appendChild(aiMsg);
  messagesStream.scrollTop = messagesStream.scrollHeight;

  const streamTextContainer = aiMsg.querySelector('.ai-stream-text');

  setTimeout(() => {
    const responseData = generateMockAIResponse(query);
    typeStream(streamTextContainer, responseData);
  }, 600);
}

function generateMockAIResponse(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('react') || p.includes('hook') || p.includes('rsc')) {
    return `React 19 Server Components (RSC) arxitekturasida ma'lumotlar serverda to'g'ridan-to'g'ri render bo'ladi, natijada mijoz brauzeriga 0 kilobayt JavaScript kodi yuboriladi.\n\n\`\`\`jsx\n// app/products/page.jsx (Server Component)\nexport default async function ProductsPage() {\n  const products = await db.products.findMany();\n  return (\n    <div className="grid">\n      {products.map(p => (\n        <ProductCard key={p.id} item={p} />\n      ))}\n    </div>\n  );\n}\n\`\`\`\nBu arxitektura yuklanish tezligini (LCP) 65% ga oshiradi.`;
  } else if (p.includes('go') || p.includes('microservice') || p.includes('docker')) {
    return `Microservice arxitekturasi uchun engil va tezkor Go HTTP xizmati hamda multi-stage Dockerfile namunasi:\n\n\`\`\`dockerfile\n# Stage 1: Build\nFROM golang:1.23-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -o server .\n\n# Stage 2: Minimal Distroless\nFROM scratch\nCOPY --from=builder /app/server /server\nEXPOSE 8080\nCMD ["/server"]\n\`\`\`\nUshbu tasvir hajmi bor-yo'g'i 12MB ni tashkil qiladi va xavfsizlik darajasi juda yuqori.`;
  } else if (p.includes('sql') || p.includes('postgres') || p.includes('indeks')) {
    return `PostgreSQL ma'lumotlar bazasida 10x tezlashtirish usullari:\n\n1. **BRIN va B-Tree indekslar**: Katta vaqtli jadvallar uchun BRIN indeksi 95% kam xotira sarflaydi.\n2. **Covering Index (INCLUDE)**: Kerakli ustunlarni indeksga qo'shib, heap fetch amalini nolga tenglashtirish:\n\n\`\`\`sql\nCREATE INDEX idx_users_active_email \nON users (email) INCLUDE (name, created_at) \nWHERE is_active = true;\n\`\`\``;
  } else {
    return `So'rovingiz tahlil qilindi: "${prompt}".\n\nNexus AI tizimi tavsiyasi:\n1. Arxitekturani modulli qismlarga ajrating.\n2. Doimiy monitoring va log tizimini (OpenTelemetry) joriy eting.\n3. Har bir API endpoint uchun avtomatik testlar va rate limiting cheklovlarini yoqing.\n\nQo'shimcha savollaringiz bo'lsa, xursandchilik bilan davom ettiramiz!`;
  }
}

function typeStream(container, fullText) {
  container.innerHTML = '';
  let i = 0;
  const isCode = fullText.includes('```');

  if (isCode) {
    // Format code block nicely
    const parts = fullText.split('```');
    let formattedHTML = '';
    for (let j = 0; j < parts.length; j++) {
      if (j % 2 === 1) {
        const lines = parts[j].split('\n');
        const lang = lines[0];
        const code = lines.slice(1).join('\n');
        formattedHTML += `<pre><code>${escapeHTML(code)}</code></pre>`;
      } else {
        formattedHTML += `<p>${escapeHTML(parts[j]).replace(/\n/g, '<br>')}</p>`;
      }
    }
    container.innerHTML = formattedHTML;
    currentTokens += Math.floor(fullText.length / 4);
    tokenCount.textContent = `${currentTokens.toLocaleString()} / 128,000`;
    messagesStream.scrollTop = messagesStream.scrollHeight;
  } else {
    const timer = setInterval(() => {
      container.textContent += fullText.charAt(i);
      i++;
      messagesStream.scrollTop = messagesStream.scrollHeight;
      if (i >= fullText.length) {
        clearInterval(timer);
        currentTokens += Math.floor(fullText.length / 4);
        tokenCount.textContent = `${currentTokens.toLocaleString()} / 128,000`;
      }
    }, 15);
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

sendBtn.addEventListener('click', handleSend);
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});
