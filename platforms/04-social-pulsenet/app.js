const storiesData = [
  { name: "Siz", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop" },
  { name: "Madina", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" },
  { name: "Jahongir", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" },
  { name: "Dilorom", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop" },
  { name: "Bobur", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" }
];

let posts = [
  {
    id: 1,
    author: "Kamronbek Rustamov",
    handle: "@kamron_ai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    time: "25 daqiqa oldin",
    content: "Bugun yangi AI Agent tizimimizni sinovdan o'tkazdik. 100 mingta ma'lumotni 2 soniyada qayta ishlab, xatoliklarni 0.01% ga tushirdik! 🚀 Mana soddalashtirilgan snippet:",
    code: "const agent = new AntigravityAI({ latency: 'ultra-low' });\nawait agent.processDataStream(globalCluster);",
    likes: 84,
    liked: false,
    comments: 14
  },
  {
    id: 2,
    author: "Zuhra Karimova",
    handle: "@zuhra_ui",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    time: "2 soat oldin",
    content: "Glassmorphism va Dark Mode kombinatsiyasi 2026-yilda ham eng qulay interfeys bo'lib qolmoqda. Siz o'z loyihalaringizda qaysi rang palitrasini ko'proq ma'qul ko'rasiz? #DesignTrends #UIUX",
    code: null,
    likes: 129,
    liked: false,
    comments: 31
  }
];

const followUsers = [
  { name: "Temur Xoliqov", handle: "@temur_code", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", following: false },
  { name: "Rayhona Salimova", handle: "@rayhona_tech", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", following: false }
];

// Elements
const storiesBar = document.getElementById('storiesBar');
const feedPosts = document.getElementById('feedPosts');
const composerInput = document.getElementById('composerInput');
const publishBtn = document.getElementById('publishBtn');
const postFilter = document.getElementById('postFilter');
const followList = document.getElementById('followList');

// Render Stories
function renderStories() {
  storiesBar.innerHTML = storiesData.map(s => `
    <div class="story-item" onclick="alert('${s.name}ning hikoyasi (story) ko\\'rilmoqda!')">
      <div class="story-ring">
        <img src="${s.img}" alt="${s.name}">
      </div>
      <span class="story-name">${s.name}</span>
    </div>
  `).join('');
}

// Render Feed
function renderFeed() {
  const q = postFilter.value.trim().toLowerCase();
  const filtered = posts.filter(p => 
    p.content.toLowerCase().includes(q) || 
    p.author.toLowerCase().includes(q) ||
    p.handle.toLowerCase().includes(q)
  );

  feedPosts.innerHTML = filtered.map(p => `
    <article class="post-card">
      <div class="post-author-row">
        <img src="${p.avatar}" class="author-pic" alt="${p.author}">
        <div class="author-info">
          <h4>${p.author}</h4>
          <span>${p.handle} • ${p.time}</span>
        </div>
      </div>
      <div class="post-body">
        <p>${p.content}</p>
        ${p.code ? `<pre><code>${p.code}</code></pre>` : ''}
      </div>
      <div class="post-actions">
        <button class="action-btn ${p.liked ? 'liked' : ''}" onclick="toggleLike(${p.id})">
          <span>${p.liked ? '❤️' : '🤍'}</span>
          <span>${p.likes}</span>
        </button>
        <button class="action-btn" onclick="addCommentPrompt(${p.id})">
          <span>💬</span>
          <span>${p.comments}</span>
        </button>
        <button class="action-btn" onclick="alert('Post havolasi nusxalandi!')">
          <span>🔗 Ulashish</span>
        </button>
      </div>
    </article>
  `).join('');
}

function toggleLike(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  if (post.liked) {
    post.likes--;
    post.liked = false;
  } else {
    post.likes++;
    post.liked = true;
  }
  renderFeed();
}

function addCommentPrompt(postId) {
  const comment = prompt("Ushbu postga fikringizni yozing:");
  if (comment && comment.trim()) {
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments++;
      renderFeed();
      alert("Izohingiz qo'shildi! 👍");
    }
  }
}

// Publish Post
publishBtn.addEventListener('click', () => {
  const text = composerInput.value.trim();
  if (!text) {
    alert("Post matnini kiriting!");
    return;
  }

  const newPost = {
    id: Date.now(),
    author: "Sardor Aliyev",
    handle: "@sardor_dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    time: "Hozirgina",
    content: text,
    code: null,
    likes: 1,
    liked: true,
    comments: 0
  };

  posts.unshift(newPost);
  composerInput.value = '';
  renderFeed();
});

// Composer tools helper
document.getElementById('addCodeBtn').addEventListener('click', () => {
  composerInput.value += "\n```js\n// Kod namunasi\nconsole.log('PulseNet Rocks!');\n```\n";
});
document.getElementById('addTagBtn').addEventListener('click', () => {
  composerInput.value += " #Antigravity2026 ";
});
document.getElementById('addEmojiBtn').addEventListener('click', () => {
  composerInput.value += " 🚀✨💡 ";
});

// Follow list
function renderFollowList() {
  followList.innerHTML = followUsers.map((u, i) => `
    <div class="follow-user">
      <div class="follow-info">
        <img src="${u.avatar}" alt="${u.name}">
        <div>
          <h5 style="font-size:0.85rem; font-weight:600;">${u.name}</h5>
          <span style="font-size:0.75rem; color:var(--pn-muted);">${u.handle}</span>
        </div>
      </div>
      <button class="follow-btn ${u.following ? 'following' : ''}" onclick="toggleFollow(${i})">
        ${u.following ? 'Kuzatilmoqda' : '+ Obuna'}
      </button>
    </div>
  `).join('');
}

function toggleFollow(idx) {
  followUsers[idx].following = !followUsers[idx].following;
  renderFollowList();
}

postFilter.addEventListener('input', renderFeed);

// Init
renderStories();
renderFeed();
renderFollowList();
