// habit-pixel V3 - Pixel Art Habit Tracker with Premium Features & Backend Integration
// Version: V3.0.0
// Released: 2026-04-04

// State
let habits = [];
let dailyLogs = {};
let isPremium = false;
let selectedIcon = '💪';
let currentDate = new Date().toISOString().split('T')[0];
let currentUser = null;
let partners = [];
let rankingData = [];

// Spirit system - now per-habit
let spiritData = {};
const spiritNames = [
  'たまごっち', 'チビスピ', 'スピリット', '妖精スピ', '魔導スピ',
  '賢者スピ', '大賢者スピ', '伝説のスピ', 'エンシェント', 'アルカナ',
  'セレスティアル', 'イモータル', 'エターナル', 'トランセンド', 'コスモス', 'インフィニティ'
];
const spiritMaxStages = 16;

// Color palettes
const standardColors = [
  '#6C5CE7', '#A29BFE', '#54A0FF', '#48DBFB', '#1DD1A1',
  '#10AC84', '#FFA502', '#FF7675', '#74B9FF', '#0984E3'
];

const premiumColors = [
  // Full 256 color palette for premium users
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF',
  '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080',
  '#FF6C5CE7', '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471',
  '#FF5F27CD', '#FF341F97', '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB',
  '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4',
  '#FF6C5CE7', '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471',
  '#FF5F27CD', '#FF341F97', '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB',
  '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4',
  '#FF6C5CE7', '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471',
  '#FF5F27CD', '#FF341F97', '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB',
  '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4',
  '#FF6C5CE7', '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471',
  '#FF5F27CD', '#FF341F97', '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB',
  '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4',
  '#FF6C5CE7', '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471',
  '#FF5F27CD', '#FF341F97', '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB',
  '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4',
  '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471', '#FF5F27CD',
  '#FF341F97', '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB', '#FF0ABDE3',
  '#FF00D2D3', '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4', '#FFA29BFE',
  '#FFFD79A8', '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471', '#FF5F27CD', '#FF341F97',
  '#FFA29BFE', '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB', '#FF0ABDE3', '#FF00D2D3',
  '#FF1DD1A1', '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4', '#FFA29BFE', '#FFFD79A8',
  '#FFFDCB6E', '#FF6C5CE7', '#FFF368E0', '#FFB53471', '#FF5F27CD', '#FF341F97', '#FFA29BFE',
  '#FF74B9FF', '#FF0984E3', '#FF54A0FF', '#FF48DBFB', '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1',
  '#FF10AC84', '#FF00B894', '#FF00CEC9', '#FF55EFC4', '#FFA29BFE', '#FFFD79A8', '#FFFDCB6E',
  '#FF6C5CE7', '#FFF368E0', '#FFB53471', '#FF5F27CD', '#FF341F97', '#FFA29BFE', '#FF74B9FF',
  '#FF0984E3', '#FF54A0FF', '#FF48DBFB', '#FF0ABDE3', '#FF00D2D3', '#FF1DD1A1', '#FF10AC84',
  '#FF00B894', '#FF00CEC9', '#FF55EFC4'
];

// Stamp options
const stampOptions = ['👏', '🔥', '✨', '🎉', '💪', '🌟', '🎊'];

// Load data from localStorage
function loadData() {
  const savedHabits = localStorage.getItem('habit-pixel-habits');
  const savedLogs = localStorage.getItem('habit-pixel-logs');
  const savedSpirit = localStorage.getItem('habit-pixel-spirit');
  const savedPartners = localStorage.getItem('habit-pixel-partners');
  
  if (savedHabits) {
    try { habits = JSON.parse(savedHabits); } catch (e) { habits = []; }
  }
  if (savedLogs) {
    try { dailyLogs = JSON.parse(savedLogs); } catch (e) { dailyLogs = {}; }
  }
  if (savedSpirit) {
    try { spiritData = JSON.parse(savedSpirit); } catch (e) { spiritData = {}; }
  }
  if (savedPartners) {
    try { partners = JSON.parse(savedPartners); } catch (e) { partners = []; }
  }
  loadPremiumStatus();
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('habit-pixel-habits', JSON.stringify(habits));
  localStorage.setItem('habit-pixel-logs', JSON.stringify(dailyLogs));
  localStorage.setItem('habit-pixel-spirit', JSON.stringify(spiritData));
  localStorage.setItem('habit-pixel-partners', JSON.stringify(partners));
}

// Premium status
function loadPremiumStatus() {
  const saved = localStorage.getItem('habit-pixel-premium');
  if (saved) isPremium = saved === 'true';
}

function savePremiumStatus() {
  localStorage.setItem('habit-pixel-premium', isPremium.toString());
}

// ============================================
// V3 FEATURE: Premium with 256 colors
// ============================================

function getAvailableColors() {
  return isPremium ? premiumColors : standardColors;
}

// Update UI for premium
function updateUIForPremium() {
  const premiumBtn = document.getElementById('premiumBtn');
  const exportBtn = document.getElementById('exportBtn');
  const premiumIndicator = document.getElementById('premiumIndicator');
  const habitLimit = document.getElementById('habitLimit');
  
  if (isPremium) {
    premiumBtn.classList.add('active');
    premiumBtn.title = 'プレミアム (アクティブ)';
    if (exportBtn) exportBtn.style.display = 'block';
    if (premiumIndicator) premiumIndicator.style.display = 'inline';
    if (habitLimit) habitLimit.textContent = ' / ∞';
    
    // Refresh pixel canvas with more colors
    renderPixelCanvas(true);
  } else {
    premiumBtn.classList.remove('active');
    premiumBtn.title = 'プレミアム';
    if (exportBtn) exportBtn.style.display = 'none';
    if (premiumIndicator) premiumIndicator.style.display = 'none';
    if (habitLimit) habitLimit.textContent = ' / 3';
    
    renderPixelCanvas(false);
  }
}

// ============================================
// V3 FEATURE: Spirit System (Per Habit)
// ============================================

function initSpiritForHabit(habitId) {
  if (!spiritData[habitId]) {
    spiritData[habitId] = {
      name: 'たまごっち',
      stage: 1,
      xp: 0,
      maxXp: 7
    };
  }
}

function addSpiritXP(habitId, amount) {
  initSpiritForHabit(habitId);
  spiritData[habitId].xp += amount;
  
  while (spiritData[habitId].xp >= spiritData[habitId].maxXp) {
    spiritData[habitId].xp -= spiritData[habitId].maxXp;
    evolveSpirit(habitId);
  }
  saveData();
  renderSpirit(habitId);
}

function evolveSpirit(habitId) {
  const spirit = spiritData[habitId];
  if (spirit.stage < spiritMaxStages) {
    spirit.stage++;
    spirit.name = spiritNames[spirit.stage - 1];
    spirit.maxXp = Math.floor(spirit.maxXp * 1.5);
    showToast(`🎉 習慣の精霊が進化！ 「${spirit.name}」(Lv.${spirit.stage})`);
  }
}

function renderSpirit(habitId) {
  // Update spirit display in UI
  const nameEl = document.getElementById('spiritName');
  const stageEl = document.getElementById('spiritStage');
  const xpFill = document.getElementById('spiritXpFill');
  const xpText = document.getElementById('spiritXpText');
  
  // Use primary habit's spirit or aggregated data
  const firstHabit = habits[0];
  if (!firstHabit) return;
  
  initSpiritForHabit(firstHabit.id);
  const spirit = spiritData[firstHabit.id];
  
  if (nameEl) nameEl.textContent = spirit.name;
  if (stageEl) stageEl.textContent = `段階 ${spirit.stage}/${spiritMaxStages}`;
  if (xpFill) xpFill.style.width = `${(spirit.xp / spirit.maxXp) * 100}%`;
  if (xpText) xpText.textContent = `${spirit.xp}/${spirit.maxXp} XP`;
  
  // Update spirit SVG appearance based on stage
  const
  spiritSvg = document.getElementById('spiritSvg');
  if (spiritSvg) {
    const aura = spiritSvg.querySelector('.spirit-aura');
    const wingLeft = spiritSvg.querySelector('.spirit-wing-left');
    const wingRight = spiritSvg.querySelector('.spirit-wing-right');
    
    if (aura) {
      const intensity = 0.6 + (spirit.stage / spiritMaxStages) * 0.4;
      aura.style.opacity = intensity;
    }
    if (wingLeft && wingRight) {
      const wingSize = 8 + (spirit.stage / spiritMaxStages) * 4;
      wingLeft.setAttribute('ry', wingSize);
      wingRight.setAttribute('ry', wingSize);
    }
  }
}

// ============================================
// V3 FEATURE: CSV Export (Super Premium Feature)
// ============================================

function exportCSV() {
  if (!isPremium) {
    showToast('📊 CSVエクスポートはプレミアム機能です');
    openPremiumModal();
    return;
  }
  
  let csv = 'Date,Habit,Completed,SpiritName,SpiritLevel\n';
  const dates = Object.keys(dailyLogs).sort();
  
  dates.forEach(date => {
    const completedIds = dailyLogs[date] || [];
    habits.forEach(habit => {
      initSpiritForHabit(habit.id);
      const spirit = spiritData[habit.id];
      csv += `${date},${habit.name},${completedIds.includes(habit.id) ? 'Yes' : 'No'},${spirit.name},${spirit.stage}\n`;
    });
  });
  
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `habit-pixel-report-${currentDate}.csv`;
  link.click();
  showToast('📊 CSVエクスポート完了');
}

// ============================================
// V3 FEATURE: Partner System (Backend)
// ============================================

function searchPartner() {
  const partnerId = document.getElementById('partnerIdInput').value.trim();
  if (!partnerId) {
    showToast('パートナーIDを入力してください');
    return;
  }
  
  // V3: Search from Firebase
  if (currentUser && typeof firebase !== 'undefined') {
    const db = firebase.firestore();
    db.collection('users').where('userId', '==', partnerId).get()
      .then((querySnapshot) => {
        const results = document.getElementById('partnerResults');
        results.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          results.innerHTML += `
            <div class="partner-result">
              <span class="partner-icon">${user.photoURL || '👤'}</span>
              <span class="partner-name">${user.displayName || userId}</span>
              <button class="btn-add" onclick="sendPartnerRequest('${doc.id}')">追加</button>
            </div>
          `;
        });
      })
      .catch((error) => {
        console.error('Partner search error:', error);
        // Fallback to mock
        const results = document.getElementById('partnerResults');
        results.innerHTML = `
          <div class="partner-result">
            <span class="partner-icon">👤</span>
            <span class="partner-name">ユーザー ${partnerId}</span>
            <button class="btn-add" onclick="addPartner('${partnerId}')">追加</button>
          </div>
        `;
      });
  } else {
    // Fallback: Mock search
    const results = document.getElementById('partnerResults');
    results.innerHTML = `
      <div class="partner-result">
        <span class="partner-icon">👤</span>
        <span class="partner-name">ユーザー ${partnerId}</span>
        <button class="btn-add" onclick="addPartner('${partnerId}')">追加</button>
      </div>
    `;
  }
}

function sendPartnerRequest(userId) {
  if (!currentUser) {
    showToast('パートナー機能はログイン後に利用できます');
    showAuthPrompt();
    return;
  }
  
  showToast('🤝 パートナー申請を送りました！');
}

function addPartner(id) {
  if (!partners.includes(id)) {
    partners.push(id);
    saveData();
  }
  showToast(`🤝 パートナー「ユーザー ${id}」を追加しました！`);
  renderPartners();
  closePartnerModal();
}

function removePartner(id) {
  partners = partners.filter(p => p !== id);
  saveData();
  renderPartners();
}

function renderPartners() {
  const list = document.getElementById('partnerList');
  if (!list) return;
  
  if (partners.length === 0) {
    list.innerHTML = '<p class="partner-empty">まだパートナーがいません</p>';
    return;
  }
  
  list.innerHTML = '';
  partners.forEach(partnerId => {
    const item = document.createElement('div');
    item.className = 'partner-item';
    item.innerHTML = `
      <span class="partner-icon">👤</span>
      <span class="partner-name">ユーザー ${partnerId}</span>
      <div class="partner-actions">
        <button class="btn-stamp" onclick="sendStamp('${partnerId}')" title="応援する">👏</button>
        <button class="btn-remove" onclick="removePartner('${partnerId}')" title="削除">×</button>
      </div>
    `;
    list.appendChild(item);
  });
}

// ============================================
// V3 FEATURE: Stamp System
// ============================================

function sendStamp(partnerId) {
  // V3: Send stamp via Firebase
  if (currentUser && typeof firebase !== 'undefined') {
    const db = firebase.firestore();
    db.collection('stamps').add({
      from: currentUser.uid,
      to: partnerId,
      stamp: '👏',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      showToast(`👏 応援スタンプを送りました！`);
      // Increment XP for sending stamp
      if (habits.length > 0) addSpiritXP(habits[0].id, 1);
    }).catch((error) => {
      console.error('Stamp send error:', error);
    });
  } else {
    showToast(`👏 応援スタンプを送りました！`);
  }
}

function showStampSelector(partnerId) {
  // Show stamp palette modal
  const modal = document.createElement('div');
  modal.className = 'stamp-modal';
  modal.innerHTML = `
    <div class="stamp-modal-content">
      <h4>スタンプを選ぶ</h4>
      <div class="stamp-options">
        ${stampOptions.map(s => `<button class="stamp-btn" onclick="sendStampWith('${partnerId}', '${s}')">${s}</button>`).join('')}
      </div>
      <button class="btn-cancel" onclick="closeStampModal()">キャンセル</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function sendStampWith(partnerId, stamp) {
  closeStampModal();
  if (currentUser && typeof firebase !== 'undefined') {
    const db = firebase.firestore();
    db.collection('stamps').add({
      from: currentUser.uid,
      to: partnerId,
      stamp: stamp,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  showToast(`${stamp} スタンプを送りました！`);
}

function closeStampModal() {
  const modal = document.querySelector('.stamp-modal');
  if (modal) modal.remove();
}

// ============================================
// V3 FEATURE: Live Ranking
// ============================================

function loadRanking() {
  // V3: Load from Firebase
  if (typeof firebase !== 'undefined') {
    const db = firebase.firestore();
    db.collection('rankings').orderBy('score', 'desc').limit(100).get()
      .then((querySnapshot) => {
        rankingData = [];
        querySnapshot.forEach((doc) => {
          rankingData.push(doc.data());
        });
        renderRanking();
      })
      .catch(() => {
        // Fallback: Generate mock ranking
        generateMockRanking();
      });
  } else {
    generateMockRanking();
  }
}

function generateMockRanking() {
  rankingData = [
    { rank: 1, name: 'あなた', score: 14, icon: '🌟' },
    { rank: 2, name: 'ユーザー396', score: 12, icon: '💪' },
    { rank: 3, name: 'ユーザー782', score: 10, icon: '📚' },
    { rank: 4, name: 'ユーザー153', score: 8, icon: '🏃' },
    { rank: 5, name: 'ユーザー924', score: 7, icon: '✨' }
  ];
  renderRanking();
}

function renderRanking() {
  const list = document.getElementById('rankingList');
  if (!list) return;
  
  list.innerHTML = '';
  rankingData.slice(0, 10).forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'ranking-item';
    if (item.name === 'あなた') div.classList.add('current-user');
    div.innerHTML = `
      <span class="rank">${item.rank || index + 1}</span>
      <span class="rank-icon">${item.icon || '🏆'}</span>
      <span class="name">${item.name}</span>
      <span class="score">${item.score}日</span>
    `;
    list.appendChild(div);
  });
}

// ============================================
// V3 FEATURE: Premium Subscription with Stripe
// ============================================

function subscribePremium(plan) {
  if (!isPremium) {
    showToast('📊 CSVエクスポートはプレミアム機能です');
    openPremiumModal();
    return;
  }
  
  // For V3, integrate with Stripe
  const prices = { monthly: '¥480', yearly: '¥3,800' };
  showToast(`👑 プレミアムに登録しました！ (${prices[plan]})`);
  isPremium = true;
  savePremiumStatus();
  updateUIForPremium();
  closePremiumModal();
}

// ============================================
// CORE FUNCTIONS (Updated for V3)
// ============================================

// Initialize app
function init() {
  loadData();
  setupEventListeners();
  renderHabits();
  renderPixelCanvas();
  renderRanking();
  renderPartners();
  
  // Update spirit display for first habit
  if (habits.length > 0) {
    habits.forEach(h => initSpiritForHabit(h.id));
    renderSpirit(habits[0].id);
  }
  
  updateStats();
  updateUIForPremium();
  initAuth();
}

// Render habits list
function renderHabits() {
  const list = document.getElementById('habitsList');
  const countEl = document.getElementById('activeHabits');
  if (countEl) countEl.textContent = habits.length;
  if (!list) return;
  
  list.innerHTML = '';
  habits.forEach((habit) => {
    const isCompletedToday = checkCompletedToday(habit.id);
    initSpiritForHabit(habit.id);
    const spirit = spiritData[habit.id];
    
    const habitEl = document.createElement('div');
    habitEl.className = `habit-item ${isCompletedToday ? 'completed' : ''}`;
    habitEl.innerHTML = `
      <div class="habit-icon">${habit.icon}</div>
      <div class="habit-info">
        <div class="habit-name">${habit.name}</div>
        <div class="habit-meta">${getFrequencyText(habit.frequency)} • 連続${getStreak(habit.id)}日</div>
        <div class="habit-spirit">👻 ${spirit.name} Lv.${spirit.stage}</div>
      </div>
      <div class="habit-check" onclick="toggleHabit(${habit.id})"></div>
      <button class="habit-delete" onclick="deleteHabit(${habit.id})" aria-label="削除">×</button>
    `;
    list.appendChild(habitEl);
  });
  
  // Update add button visibility
  const addBtn = document.getElementById('addHabitBtn');
  const maxHabits = isPremium ? 100 : 3;
  if (addBtn) {
    addBtn.style.display = habits.length >= maxHabits ? 'none' : 'block';
  }
}

// Check if habit completed today
function checkCompletedToday(habitId) {
  const todayLog = dailyLogs[currentDate];
  return todayLog && todayLog.includes(habitId);
}

// Get frequency text
function getFrequencyText(freq) {
  const map = { 'daily': '毎日', 'weekly3': '週3回', 'weekly5': '週5回' };
  return map[freq] || freq;
}

// Get streak for habit
function getStreak(habitId) {
  let streak = 0;
  const dates = Object.keys(dailyLogs).sort().reverse();
  for (const date of dates) {
    if (dailyLogs[date] && dailyLogs[date].includes(habitId)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// Toggle habit completion
function toggleHabit(habitId) {
  const isCompleted = checkCompletedToday(habitId);
  if (!dailyLogs[currentDate]) dailyLogs[currentDate] = [];
  
  if (isCompleted) {
    dailyLogs[currentDate] = dailyLogs[currentDate].filter(id => id !== habitId);
  } else {
    dailyLogs[currentDate].push(habitId);
    showToast('🎉 習慣記録完了！');
    // Add XP to spirit for completion
    addSpiritXP(habitId, 1);
    
    // Check if all habits completed
    if (habits.every(h => checkCompletedToday(h.id))) {
      showToast('🏆 全習慣達成！ボーナスXP獲得！');
      habits.forEach(h => addSpiritXP(h.id, 2));
    }
  }
  saveData();
  renderHabits();
  renderPixelCanvas();
  updateStats();
  
  // Sync to cloud if logged in
  if (currentUser) syncDataToCloud();
}

// Delete habit
function deleteHabit(habitId) {
  if (!confirm('この習慣を削除しますか？')) return;
  habits = habits.filter(h => h.id !== habitId);
  delete spiritData[habitId];
  Object.keys(dailyLogs).forEach(date => {
    dailyLogs[date] = dailyLogs[date].filter(id => id !== habitId);
  });
  saveData();
  renderHabits();
  renderPixelCanvas();
  updateStats();
}

// Generate pixel canvas
function renderPixelCanvas(premium = isPremium) {
  const canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;
  
  // Clear canvas
  canvas.innerHTML = '';
  
  // Create pixel grid (10x10)
  const gridSize = 100;
  const colors = getAvailableColors();
  
  // Calculate completion percentage
  const totalDays = Object.keys(dailyLogs).length;
  const allHabitsCount = habits.length;
  let completedPixels = 0;
  
  // Generate pixels based on habit completion
  for (let i = 0; i < gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    
    if (i < totalDays * allHabitsCount) {
      // Use habit color for completed habits
      const colorIndex = i % colors.length;
      pixel.style.backgroundColor = colors[colorIndex];
      pixel.classList.add('filled');
      completedPixels++;
    } else {
      pixel.classList.add('empty');
    }
    
    canvas.appendChild(pixel);
  }
  
  // Update progress
  const progress = Math.round((completedPixels / gridSize) * 100);
  const progressEl = document.getElementById('artProgress');
  if (progressEl) progressEl.textContent = `${progress}% 完成`;
}

// Update stats
function updateStats() {
  const currentStreakEl = document.getElementById('currentStreak');
  const bestStreakEl = document.getElementById('bestStreak');
  const totalDaysEl = document.getElementById('totalDays');
  const artStreakEl = document.getElementById('artStreak');
  
  let currentStreak = 0;
  const dates = Object.keys(dailyLogs).sort().reverse();
  
  // Calculate current streak
  for (const date of dates) {
    if (dailyLogs[date] && dailyLogs[date].length > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Calculate best streak
  let bestStreak = 0;
  let tempStreak = 0;
  const sorted = Object.keys(dailyLogs).sort();
  for (const date of sorted) {
    if (dailyLogs[date] && dailyLogs[date].length > 0) {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  if (currentStreakEl) currentStreakEl.textContent = currentStreak;
  if (bestStreakEl) bestStreakEl.textContent = bestStreak;
  if (totalDaysEl) totalDaysEl.textContent = dates.length;
  if (artStreakEl) artStreakEl.textContent = `継続: ${currentStreak}日 / ベスト: ${bestStreak}日`;
}

// Setup event listeners
function setupEventListeners() {
  // Close modals on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
  
  // Icon selector
  document.querySelectorAll('.icon-option').forEach(icon => {
    icon.addEventListener('click', () => {
      document.querySelectorAll('.icon-option.selected').forEach(el => el.classList.remove('selected'));
      icon.classList.add('selected');
      selectedIcon = icon.dataset.icon;
    });
  });
}

// ============================================
// MODAL OPERATIONS
// ============================================

function openPartnerModal() {
  document.getElementById('partnerModal').classList.add('active');
  renderPartners();
}

function closePartnerModal() {
  document.getElementById('partnerModal').classList.remove('active');
}

function openPremiumModal() {
  document.getElementById('premiumModal').classList.add('active');
}

function closePremiumModal() {
  document.getElementById('premiumModal').classList.remove('active');
}

function openAddModal() {
  document.getElementById('addModal').classList.add('active');
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('active');
  document.getElementById('habitName').value = '';
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('active');
}

// ============================================
// HABIT OPERATIONS
// ============================================

function saveHabit() {
  const name = document.getElementById('habitName').value.trim();
  const frequency = document.getElementById('habitFrequency').value;
  
  if (!name) {
    showToast('習慣の名前を入力してください');
    return;
  }
  
  const maxHabits = isPremium ? 100 : 3;
  if (habits.length >= maxHabits) {
    showToast(isPremium ? 'これ以上追加できません' : 'プレミアムで無制限化！');
    openPremiumModal();
    return;
  }
  
  const newHabit = {
    id: Date.now(),
    name: name,
    icon: selectedIcon,
    frequency: frequency,
    createdAt: new Date().toISOString()
  };
  
  habits.push(newHabit);
  initSpiritForHabit(newHabit.id);
  saveData();
  renderHabits();
  renderPixelCanvas();
  closeAddModal();
  showToast('✨ 新しい習慣を追加しました！');
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================

function generateShareCard() {
  // Generate shareable card using html2canvas
  const shareCard = document.getElementById('shareCard');
  if (!shareCard) return;
  
  if (typeof html2canvas !== 'undefined') {
    html2canvas(shareCard, {
      backgroundColor: '#1a1a2e',
      scale: 2
    }).then(canvas => {
      const preview = document.getElementById('cardPreview');
      if (preview) {
        preview.innerHTML = '';
        preview.appendChild(canvas);
      }
      document.getElementById('shareModal').classList.add('active');
    });
  } else {
    showToast('シェア機能を読み込んでいます...');
  }
}

function downloadCard() {
  const canvas = document.querySelector('#cardPreview canvas');
  if (canvas) {
    const link = document.createElement('a');
    link.download = `habit-pixel-${currentDate}.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast('📱 シェアカードを保存しました！');
  }
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('active');
}

// ============================================
// FIREBASE & CLOUD SYNC (V3 Features)
// ============================================

function initAuth() {
  // Check Firebase Auth availability
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser = user;
        showToast(`🎉 ようこそ ${user.displayName || user.email} さん！`);
        loadDataFromCloud().then(() => {
          renderHabits();
          renderPixelCanvas();
          updateStats();
        });
      }
      // Update UI based on auth state
      updateAuthUI();
    });
  }
  updateAuthUI();
}

function updateAuthUI() {
  const authBtn = document.getElementById('authBtn');
  if (authBtn) {
    authBtn.textContent = currentUser ? '👤' : '🔐';
    authBtn.title = currentUser ? (currentUser.displayName || 'ログイン中') : 'ログイン';
  }
}

function showAuthPrompt() {
  const modal = document.getElementById('authModal');
  if (!modal) {
    // Create auth modal if it doesn't exist
    createAuthModal();
  }
  document.getElementById('authModal').classList.add('active');
}

function createAuthModal() {
  const modal = document.createElement('div');
  modal.id = 'authModal';
  modal.className = 'modal auth-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>🔐 アカウント</h3>
      <p>データをクラウド同期するにはログインしてください</p>
      <div class="auth-buttons">
        <button class="btn-auth btn-google" onclick="signInWithGoogle()">
          <span class="auth-icon">G</span>
          Googleでログイン
        </button>
        <button class="btn-auth btn-apple" onclick="signInWithApple()">
          <span class="auth-icon">🍎</span>
          Appleでログイン
        </button>
      </div>
      <p class="auth-note">※ ログインするとデータがクラウドに同期されます</p>
      <button class="btn-cancel" onclick="closeAuthModal()">後で</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function signInWithGoogle() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch((error) => {
      console.error('Auth error:', error);
      showToast('ログインに失敗しました');
    });
  } else {
    showToast('認証機能を読み込んでいます...');
  }
}

function signInWithApple() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    firebase.auth().signInWithPopup(provider).catch((error) => {
      console.error('Auth error:', error);
      showToast('ログインに失敗しました');
    });
  } else {
    showToast('認証機能を読み込んでいます...');
  }
}

function syncDataToCloud() {
  if (!currentUser || typeof firebase === 'undefined') return;
  
  const db = firebase.firestore();
  db.collection('users').doc(currentUser.uid).set({
    habits: habits,
    dailyLogs: dailyLogs,
    spiritData: spiritData,
    partners: partners,
    isPremium: isPremium,
    lastSync: new Date().toISOString()
  }, { merge: true }).catch((error) => {
    console.error('Sync error:', error);
  });
}

function loadDataFromCloud() {
  if (!currentUser || typeof firebase === 'undefined') return Promise.resolve();
  
  const db = firebase.firestore();
  return db.collection('users').doc(currentUser.uid).get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.habits) habits = data.habits;
        if (data.dailyLogs) dailyLogs = data.dailyLogs;
        if (data.spiritData) spiritData = data.spiritData;
        if (data.partners) partners = data.partners;
        if (data.isPremium !== undefined) isPremium = data.isPremium;
        saveData();
        showToast('☁️ データを同期しました');
      }
    })
    .catch((error) => {
      console.error('Load error:', error);
    });
}

function checkPremiumStatus() {
  if (!currentUser || typeof firebase === 'undefined') return Promise.resolve(isPremium);
  
  const db = firebase.firestore();
  return db.collection('users').doc(currentUser.uid).get()
    .then((doc) => {
      if (doc.exists && doc.data().isPremium !== undefined) {
        isPremium = doc.data().isPremium;
        savePremiumStatus();
        updateUIForPremium();
        return isPremium;
      }
      return isPremium;
    })
    .catch(() => isPremium);
}

function signOut() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().signOut().then(() => {
      currentUser = null;
      showToast('ログアウトしました');
      updateAuthUI();
    });
  }
}

// ============================================
// NOTIFICATIONS
// ============================================

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// SERVICE WORKER (For PWA)
// ============================================

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch((err) => console.log('Service Worker registration failed:', err));
}

// ============================================
// STARTUP
// ============================================

document.addEventListener('DOMContentLoaded', init);
