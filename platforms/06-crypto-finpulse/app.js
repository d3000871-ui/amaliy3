const marketAssets = [
  { id: 'BTC', name: 'Bitcoin', price: 94250, change: 4.82, volume: '$42.1B', icon: '₿', color: '#f7931a' },
  { id: 'ETH', name: 'Ethereum', price: 3420, change: 3.15, volume: '$18.9B', icon: 'Ξ', color: '#627eea' },
  { id: 'SOL', name: 'Solana', price: 188.5, change: 8.40, volume: '$7.4B', icon: '◎', color: '#14f195' },
  { id: 'TON', name: 'Toncoin', price: 6.85, change: -1.20, volume: '$1.2B', icon: '💎', color: '#0098ea' },
  { id: 'BNB', name: 'Binance Coin', price: 645.2, change: 2.10, volume: '$2.8B', icon: '🪙', color: '#f3ba2f' }
];

let activeAsset = marketAssets[0];
let userBalance = 24500.00;
let currentTimeframe = '24H';

// Elements
const tickerTape = document.getElementById('tickerTape');
const userBalanceEl = document.getElementById('userBalance');
const swapFromBal = document.getElementById('swapFromBal');
const activeAssetIcon = document.getElementById('activeAssetIcon');
const activeAssetName = document.getElementById('activeAssetName');
const activeAssetCode = document.getElementById('activeAssetCode');
const activePrice = document.getElementById('activePrice');
const activeChange = document.getElementById('activeChange');
const assetsTableBody = document.getElementById('assetsTableBody');
const priceChart = document.getElementById('priceChart');
const swapFromAmount = document.getElementById('swapFromAmount');
const swapToAmount = document.getElementById('swapToAmount');
const swapTargetAsset = document.getElementById('swapTargetAsset');
const executeSwapBtn = document.getElementById('executeSwapBtn');

// Render Tickers
function renderTickers() {
  tickerTape.innerHTML = marketAssets.map(a => `
    <div class="ticker-item" onclick="selectAsset('${a.id}')">
      <span class="ticker-name">${a.id}</span>
      <span class="ticker-price">$${a.price.toLocaleString()}</span>
      <span class="ticker-change ${a.change >= 0 ? 'pos' : 'neg'}">
        ${a.change >= 0 ? '+' : ''}${a.change.toFixed(2)}%
      </span>
    </div>
  `).join('');
}

// Render Table
function renderAssetsTable() {
  assetsTableBody.innerHTML = marketAssets.map(a => `
    <tr>
      <td>
        <strong style="color: ${a.color}; margin-right: 6px;">${a.icon}</strong>
        <strong>${a.name}</strong> <span style="color:var(--fin-muted); font-size:0.8rem;">(${a.id})</span>
      </td>
      <td><strong>$${a.price.toLocaleString()}</strong></td>
      <td style="color: ${a.change >= 0 ? 'var(--fin-green)' : 'var(--fin-red)'}; font-weight:700;">
        ${a.change >= 0 ? '+' : ''}${a.change.toFixed(2)}%
      </td>
      <td style="color:var(--fin-muted);">${a.volume}</td>
      <td>
        <button class="trade-mini-btn" onclick="selectAsset('${a.id}')">Savdo</button>
      </td>
    </tr>
  `).join('');
}

// Select Asset
function selectAsset(assetId) {
  const asset = marketAssets.find(a => a.id === assetId);
  if (!asset) return;
  activeAsset = asset;
  activeAssetIcon.textContent = asset.icon;
  activeAssetIcon.style.background = asset.color;
  activeAssetName.textContent = asset.name;
  activeAssetCode.textContent = `${asset.id}/USDT`;
  activePrice.textContent = `$${asset.price.toLocaleString()}`;
  activeChange.textContent = `${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)}%`;
  activeChange.className = `price-change ${asset.change >= 0 ? 'positive' : 'negative'}`;
  swapTargetAsset.value = asset.id;
  updateSwapCalculation();
  drawChart();
}

// Canvas Line Chart Drawer
function drawChart() {
  const ctx = priceChart.getContext('2d');
  const w = priceChart.width;
  const h = priceChart.height;

  ctx.clearRect(0, 0, w, h);

  // Background Grid
  ctx.strokeStyle = '#1e2638';
  ctx.lineWidth = 1;
  for (let y = 40; y < h; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Generate smooth price points
  const pointsCount = 20;
  const points = [];
  const basePrice = activeAsset.price;
  let cur = basePrice * 0.94;

  for (let i = 0; i < pointsCount; i++) {
    const delta = (Math.random() - 0.46) * (basePrice * 0.02);
    cur += delta;
    const x = (i / (pointsCount - 1)) * (w - 40) + 20;
    const norm = (cur - basePrice * 0.9) / (basePrice * 0.2);
    const y = h - 40 - Math.max(0, Math.min(1, norm)) * (h - 100);
    points.push({ x, y });
  }
  // Ensure last point aligns with current price
  points[points.length - 1].y = h / 2;

  // Gradient Fill under curve
  const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
  fillGrad.addColorStop(0, activeAsset.change >= 0 ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)');
  fillGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const mx = (prev.x + curr.x) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, mx, (prev.y + curr.y) / 2);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.lineTo(points[points.length - 1].x, h);
  ctx.lineTo(points[0].x, h);
  ctx.closePath();
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const mx = (prev.x + curr.x) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, mx, (prev.y + curr.y) / 2);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = activeAsset.change >= 0 ? '#10b981' : '#ef4444';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Highlight Pulse on Last Point
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = activeAsset.change >= 0 ? '#10b981' : '#ef4444';
  ctx.lineWidth = 4;
  ctx.stroke();
}

// Swap Calculation
function updateSwapCalculation() {
  const amountUSDT = parseFloat(swapFromAmount.value) || 0;
  const targetId = swapTargetAsset.value;
  const target = marketAssets.find(a => a.id === targetId) || activeAsset;
  const received = amountUSDT / target.price;
  swapToAmount.value = received.toFixed(received < 1 ? 4 : 2);
}

swapFromAmount.addEventListener('input', updateSwapCalculation);
swapTargetAsset.addEventListener('change', updateSwapCalculation);

executeSwapBtn.addEventListener('click', () => {
  const amountUSDT = parseFloat(swapFromAmount.value) || 0;
  if (amountUSDT <= 0) {
    alert("Iltimos, to'g'ri summa kiriting!");
    return;
  }
  if (amountUSDT > userBalance) {
    alert("Hamyonda yetarli USDT mablag'i mavjud emas!");
    return;
  }

  userBalance -= amountUSDT;
  userBalanceEl.textContent = `$${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  swapFromBal.textContent = `$${userBalance.toLocaleString()}`;

  const targetId = swapTargetAsset.value;
  const targetQty = swapToAmount.value;

  alert(`Muvaffaqiyatli Ayirboshlandi! 🚀\nSiz ${amountUSDT} USDT evaziga ${targetQty} ${targetId} xarid qildingiz.\nBalans muvaffaqiyatli yangilandi.`);
});

// Timeframe toggle
document.querySelectorAll('.tf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTimeframe = btn.dataset.tf;
    drawChart();
  });
});

// Periodic live market tick simulation
setInterval(() => {
  marketAssets.forEach(a => {
    const shift = (Math.random() - 0.48) * (a.price * 0.003);
    a.price += shift;
  });
  renderTickers();
  if (activeAsset) {
    activePrice.textContent = `$${activeAsset.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
}, 3000);

// Init
renderTickers();
renderAssetsTable();
selectAsset('BTC');
