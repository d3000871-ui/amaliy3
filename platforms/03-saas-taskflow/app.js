let tasks = [
  {
    id: "task-1",
    title: "OAuth2 & JWT Token Auth integratsiyasi",
    desc: "Google va GitHub SSO orqali foydalanuvchi tizimga kirishini ta'minlash.",
    priority: "high",
    tag: "Backend",
    assignee: "Azizbek R.",
    status: "inprogress"
  },
  {
    id: "task-2",
    title: "Antigravity UI Design System yaratish",
    desc: "Figma dizaynlarini to'liq CSS o'zgaruvchilari va Dark Mode komponentlariga o'tkazish.",
    priority: "medium",
    tag: "Frontend",
    assignee: "Madina T.",
    status: "done"
  },
  {
    id: "task-3",
    title: "PostgreSQL indekslarini optimallashtirish",
    desc: "100k+ so'rovlar uchun read latency 50ms dan kamaytirilsin.",
    priority: "high",
    tag: "Backend",
    assignee: "Sardor K.",
    status: "review"
  },
  {
    id: "task-4",
    title: "Docker container va Kubernetes manifestlari",
    desc: "CI/CD orqali avtomatik deployment pipeline sozlash.",
    priority: "medium",
    tag: "DevOps",
    assignee: "Javohir N.",
    status: "backlog"
  },
  {
    id: "task-5",
    title: "LLM Model Inference caching qilish",
    desc: "Redis yordamida takroriy semantik so'rovlarni keshlab, API xarajatlarini 40% ga qisqartirish.",
    priority: "high",
    tag: "AI / ML",
    assignee: "Azizbek R.",
    status: "inprogress"
  }
];

const statusColumns = ['backlog', 'inprogress', 'review', 'done'];

// DOM elements
const taskSearch = document.getElementById('taskSearch');
const openNewTaskModal = document.getElementById('openNewTaskModal');
const closeTaskModal = document.getElementById('closeTaskModal');
const taskModal = document.getElementById('taskModal');
const newTaskForm = document.getElementById('newTaskForm');

const statTotal = document.getElementById('statTotal');
const statInProgress = document.getElementById('statInProgress');
const statReview = document.getElementById('statReview');
const statDone = document.getElementById('statDone');

function renderBoard() {
  const query = taskSearch.value.trim().toLowerCase();

  // Reset columns
  statusColumns.forEach(status => {
    document.getElementById(`cards-${status}`).innerHTML = '';
  });

  const filtered = tasks.filter(t => 
    t.title.toLowerCase().includes(query) || 
    t.desc.toLowerCase().includes(query) ||
    t.tag.toLowerCase().includes(query) ||
    t.assignee.toLowerCase().includes(query)
  );

  // Render cards
  filtered.forEach(t => {
    const colEl = document.getElementById(`cards-${t.status}`);
    if (!colEl) return;

    const currentStatusIdx = statusColumns.indexOf(t.status);
    const canMoveLeft = currentStatusIdx > 0;
    const canMoveRight = currentStatusIdx < statusColumns.length - 1;

    const initials = t.assignee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <div class="task-card-top">
        <span class="task-tag">${t.tag}</span>
        <span class="task-priority priority-${t.priority}">
          ${t.priority === 'high' ? '🔥 High' : t.priority === 'medium' ? '⚡ Med' : '🟢 Low'}
        </span>
      </div>
      <div class="task-title">${t.title}</div>
      <p class="task-desc">${t.desc}</p>
      <div class="task-footer">
        <div class="task-assignee">
          <div class="assignee-avatar">${initials}</div>
          <span>${t.assignee}</span>
        </div>
        <div class="task-actions">
          ${canMoveLeft ? `<button class="move-btn" onclick="moveTask('${t.id}', -1)" title="Orqaga">◀</button>` : ''}
          ${canMoveRight ? `<button class="move-btn" onclick="moveTask('${t.id}', 1)" title="Oldinga">▶</button>` : ''}
          <button class="delete-btn" onclick="deleteTask('${t.id}')" title="O'chirish">🗑️</button>
        </div>
      </div>
    `;
    colEl.appendChild(card);
  });

  // Update counts
  statusColumns.forEach(status => {
    const count = tasks.filter(t => t.status === status).length;
    document.getElementById(`count-${status}`).textContent = count;
  });

  // Update stats
  statTotal.textContent = tasks.length;
  statInProgress.textContent = tasks.filter(t => t.status === 'inprogress').length;
  statReview.textContent = tasks.filter(t => t.status === 'review').length;
  statDone.textContent = tasks.filter(t => t.status === 'done').length;
}

function moveTask(id, step) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const currentIdx = statusColumns.indexOf(task.status);
  const nextIdx = currentIdx + step;
  if (nextIdx >= 0 && nextIdx < statusColumns.length) {
    task.status = statusColumns[nextIdx];
    renderBoard();
  }
}

function deleteTask(id) {
  if (confirm("Ushbu vazifani o'chirishni tasdiqlaysizmi?")) {
    tasks = tasks.filter(t => t.id !== id);
    renderBoard();
  }
}

// Modal handling
openNewTaskModal.addEventListener('click', () => {
  taskModal.classList.add('open');
});

closeTaskModal.addEventListener('click', () => {
  taskModal.classList.remove('open');
});

newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const tag = document.getElementById('taskTag').value;
  const assignee = document.getElementById('taskAssignee').value.trim() || 'Jamoa a\'zosi';

  const newTask = {
    id: 'task-' + Date.now(),
    title,
    desc,
    priority,
    tag,
    assignee,
    status: 'backlog'
  };

  tasks.unshift(newTask);
  newTaskForm.reset();
  taskModal.classList.remove('open');
  renderBoard();
});

taskSearch.addEventListener('input', renderBoard);

// Init
renderBoard();
