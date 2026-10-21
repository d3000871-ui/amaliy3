const tracks = [
  {
    id: 1,
    title: "Cyber Cyberpunk Drift",
    artist: "Antigravity Sound Lab",
    genre: "Synthwave",
    duration: "3:24",
    durationSec: 204,
    icon: "⚡",
    chords: [220, 261.63, 329.63, 392.00] // Am7
  },
  {
    id: 2,
    title: "Deep Focus Lo-Fi Coding",
    artist: "ChillHop Collective",
    genre: "Lo-Fi Beats",
    duration: "2:48",
    durationSec: 168,
    icon: "☕",
    chords: [174.61, 220, 261.63, 329.63] // Fmaj7
  },
  {
    id: 3,
    title: "Midnight Neon Dreams",
    artist: "RetroWave X",
    genre: "Retrowave",
    duration: "3:12",
    durationSec: 192,
    icon: "🌃",
    chords: [196.00, 246.94, 293.66, 392.00] // G
  },
  {
    id: 4,
    title: "Quantum Pulse & Sub-Bass",
    artist: "Future Glitch",
    genre: "Cyber Bass",
    duration: "4:05",
    durationSec: 245,
    icon: "🌌",
    chords: [130.81, 164.81, 196.00, 246.94] // Cmaj7
  }
];

let currentTrackIndex = 0;
let isPlaying = false;
let currentSeconds = 0;
let progressTimer = null;
let audioCtx = null;
let synthTimer = null;

// Elements
const trackList = document.getElementById('trackList');
const currentTrackTitle = document.getElementById('currentTrackTitle');
const currentTrackArtist = document.getElementById('currentTrackArtist');
const barTrackTitle = document.getElementById('barTrackTitle');
const barArtist = document.getElementById('barArtist');
const miniCover = document.getElementById('miniCover');
const vinylDisc = document.getElementById('vinylDisc');
const playToggleBtn = document.getElementById('playToggleBtn');
const prevTrackBtn = document.getElementById('prevTrackBtn');
const nextTrackBtn = document.getElementById('nextTrackBtn');
const trackScrubber = document.getElementById('trackScrubber');
const currentTimeEl = document.getElementById('currentTime');
const totalDurationEl = document.getElementById('totalDuration');
const volumeSlider = document.getElementById('volumeSlider');
const trackSearch = document.getElementById('trackSearch');
const visualizerCanvas = document.getElementById('visualizerCanvas');

// Render Track List
function renderTrackList() {
  const query = trackSearch.value.trim().toLowerCase();
  const filtered = tracks.filter(t => 
    t.title.toLowerCase().includes(query) || 
    t.artist.toLowerCase().includes(query) || 
    t.genre.toLowerCase().includes(query)
  );

  trackList.innerHTML = filtered.map((t, index) => {
    const isCurrent = tracks[currentTrackIndex].id === t.id;
    return `
      <div class="track-row ${isCurrent ? 'playing' : ''}" onclick="selectTrack(${tracks.findIndex(item => item.id === t.id)})">
        <div class="row-left">
          <span class="row-index">${isCurrent && isPlaying ? '▶' : index + 1}</span>
          <div class="row-info">
            <h4>${t.title}</h4>
            <span>${t.artist}</span>
          </div>
        </div>
        <div class="row-right">
          <span class="row-genre">${t.genre}</span>
          <span class="row-time">${t.duration}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Select Track
function selectTrack(index) {
  currentTrackIndex = index;
  currentSeconds = 0;
  const t = tracks[currentTrackIndex];

  currentTrackTitle.textContent = t.title;
  currentTrackArtist.textContent = `${t.artist} • ${t.genre} 2026`;
  barTrackTitle.textContent = t.title;
  barArtist.textContent = t.artist;
  miniCover.textContent = t.icon;
  totalDurationEl.textContent = t.duration;
  trackScrubber.max = t.durationSec;
  trackScrubber.value = 0;

  if (isPlaying) {
    stopSynth();
    startSynth();
  }
  renderTrackList();
}

// Web Audio API Synth Engine
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, duration = 0.4) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  const vol = parseFloat(volumeSlider.value) * 0.15;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function startSynth() {
  initAudio();
  const t = tracks[currentTrackIndex];
  let chordIndex = 0;
  synthTimer = setInterval(() => {
    if (!isPlaying) return;
    const freq = t.chords[chordIndex % t.chords.length];
    playTone(freq, 0.6);
    // Add sub-harmonic beat
    playTone(freq * 0.5, 0.4);
    chordIndex++;
  }, 450);
}

function stopSynth() {
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
}

// Toggle Play
function togglePlay() {
  isPlaying = !isPlaying;
  playToggleBtn.textContent = isPlaying ? '⏸' : '▶';

  if (isPlaying) {
    vinylDisc.classList.add('spinning');
    startSynth();
    progressTimer = setInterval(() => {
      currentSeconds++;
      if (currentSeconds > tracks[currentTrackIndex].durationSec) {
        nextTrack();
      } else {
        updateProgressUI();
      }
    }, 1000);
  } else {
    vinylDisc.classList.remove('spinning');
    stopSynth();
    clearInterval(progressTimer);
  }
  renderTrackList();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  selectTrack(currentTrackIndex);
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  selectTrack(currentTrackIndex);
}

function updateProgressUI() {
  trackScrubber.value = currentSeconds;
  const m = Math.floor(currentSeconds / 60);
  const s = String(currentSeconds % 60).padStart(2, '0');
  currentTimeEl.textContent = `${m}:${s}`;
}

trackScrubber.addEventListener('input', (e) => {
  currentSeconds = parseInt(e.target.value);
  updateProgressUI();
});

// Controls
playToggleBtn.addEventListener('click', togglePlay);
nextTrackBtn.addEventListener('click', nextTrack);
prevTrackBtn.addEventListener('click', prevTrack);
trackSearch.addEventListener('input', renderTrackList);

// Canvas Visualizer Loop
function animateVisualizer() {
  const ctx = visualizerCanvas.getContext('2d');
  const w = visualizerCanvas.width;
  const h = visualizerCanvas.height;

  ctx.clearRect(0, 0, w, h);

  const bars = 24;
  const barWidth = (w / bars) - 2;

  for (let i = 0; i < bars; i++) {
    let barHeight = 4;
    if (isPlaying) {
      barHeight = Math.random() * (h - 10) + 6;
    }
    const x = i * (barWidth + 2);
    const y = h - barHeight;

    const grad = ctx.createLinearGradient(0, y, 0, h);
    grad.addColorStop(0, '#a3e635');
    grad.addColorStop(1, '#15803d');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, barWidth, barHeight);
  }

  requestAnimationFrame(animateVisualizer);
}

// Init
selectTrack(0);
animateVisualizer();
