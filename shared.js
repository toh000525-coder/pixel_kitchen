// ═══════════════════════════════════════════
//  shared.js — Pixel Kitchen  Common Utilities
// ═══════════════════════════════════════════

// Page navigation with fade-out transition + haptic tap for mobile feel
function goTo(url){
  try { pkVibrate('tap'); } catch(e){}
  document.body.style.animation='pkPageOut 0.18s ease-in both';
  setTimeout(()=>location.href=url, 190);
}

// Refresh topbar coin display from localStorage
function pkUpdateCoins(){
  const el = document.getElementById('topbarCoins');
  if(el) el.textContent = localStorage.getItem('pkCoins') || 0;
}

// Animated star display on result screen
function pkShowResultStars(stars){
  const el = document.getElementById('resultStars');
  if(!el) return;
  el.innerHTML = '';
  for(let i=1; i<=3; i++){
    const s = document.createElement('span');
    s.textContent = '★';
    s.style.animationDelay = (i*280)+'ms';
    s.className = 'pk-star ' + (i<=stars ? 'pk-star-lit' : 'pk-star-dim');
    el.appendChild(s);
  }
}

// Coin burst: coins fly from screen center to topbar counter
function pkCoinBurst(amount){
  if(!amount || amount<=0) return;
  const topEl = document.getElementById('topbarCoins');
  if(!topEl) return;
  const tr = topEl.getBoundingClientRect();
  const dx = tr.left + tr.width/2, dy = tr.top + tr.height/2;
  const n  = Math.min(8, Math.max(1, Math.ceil(amount/15)));
  for(let i=0; i<n; i++){
    setTimeout(()=>{
      const coin = document.createElement('div');
      coin.className = 'pk-coin-fly';
      coin.textContent = '🪙';
      const vw=window.innerWidth, vh=window.innerHeight;
      const sx = vw/2 + (Math.random()-.5)*80;
      const sy = vh/2 + (Math.random()-.5)*60;
      coin.style.left = sx+'px';
      coin.style.top  = sy+'px';
      coin.style.setProperty('--tx', (dx-sx)+'px');
      coin.style.setProperty('--ty', (dy-sy)+'px');
      document.body.appendChild(coin);
      coin.addEventListener('animationend', ()=>{
        coin.remove();
        if(i===n-1){
          topEl.style.animation = 'pkTopbarBump .35s ease-out';
          setTimeout(()=>{ topEl.style.animation=''; pkUpdateCoins(); }, 350);
        }
      });
    }, i*90);
  }
}

// Stat tracking helpers — add to a cumulative counter, or keep the highest value
function pkStatAdd(key, val=1){
  localStorage.setItem(key, (parseInt(localStorage.getItem(key))||0) + val);
}
function pkStatMax(key, val){
  const cur = parseInt(localStorage.getItem(key))||0;
  if(val > cur) localStorage.setItem(key, val);
}

// Haptic feedback — respects devices that don't support vibrate
function pkVibrate(type){
  if(!navigator.vibrate) return;
  if(localStorage.getItem('pkHapticOff') === '1') return; // user-disabled
  const p = {
    tap:   [12],                // soft click — button/card taps
    combo: [40,30,40,30,80],
    fail:  [100],
    ach:   [30,20,30,20,80],
  };
  navigator.vibrate(p[type] || [30]);
}

// Screen shake on combo — uses CSS translate property (composites independently of transform)
function pkShake(){
  const el = document.getElementById('gameWrap') || document.getElementById('hubWrap');
  if(!el) return;
  el.classList.remove('pk-shake');
  void el.offsetWidth;
  el.classList.add('pk-shake');
  el.addEventListener('animationend', ()=> el.classList.remove('pk-shake'), {once:true});
}

// rAF-coalesced resize — collapses bursts of resize events (iOS Safari address bar,
// keyboard slide, orientation transition, pinch zoom) into one call per frame.
// Usage: window.addEventListener('resize', pkOnResize(onResize));
function pkOnResize(fn){
  let pending = false;
  return function(){
    if(pending) return;
    pending = true;
    requestAnimationFrame(()=>{ pending = false; fn(); });
  };
}

// Register service worker + update detection
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').then(reg => {
      function onWaiting(sw){
        if(document.getElementById('pkUpdateToast')) return;
        const d = document.createElement('div');
        d.id = 'pkUpdateToast';
        d.textContent = '🔄 UPDATE AVAILABLE — TAP TO REFRESH';
        d.onclick = ()=>{
          sw.postMessage('SKIP_WAITING');
          navigator.serviceWorker.addEventListener('controllerchange', ()=> location.reload(), {once:true});
        };
        document.body.appendChild(d);
        requestAnimationFrame(()=> requestAnimationFrame(()=> d.classList.add('pk-show')));
      }
      if(reg.waiting) onWaiting(reg.waiting);
      reg.addEventListener('updatefound', ()=>{
        const sw = reg.installing;
        sw.addEventListener('statechange', ()=>{
          if(sw.state === 'installed' && navigator.serviceWorker.controller) onWaiting(sw);
        });
      });
    }).catch(()=>{});
  });
}

// Offline / online detection
function _pkSetOffline(offline){
  const b = document.getElementById('pkOfflineBanner');
  if(b) b.classList.toggle('pk-show', offline);
}
document.addEventListener('DOMContentLoaded', ()=>{
  const b = document.createElement('div');
  b.id = 'pkOfflineBanner';
  b.textContent = '📡 NO CONNECTION — LEADERBOARDS UNAVAILABLE';
  document.body.appendChild(b);
  if(!navigator.onLine) _pkSetOffline(true);

  // Load sprite grid image if available
  if(typeof initImageSprites === 'function') {
    initImageSprites();
  }
});
window.addEventListener('offline', ()=> _pkSetOffline(true));
window.addEventListener('online',  ()=> _pkSetOffline(false));

// ═══════════════════════════════════════════
//  Collection Book — dish unlock tracking
//  Stores: localStorage 'pkCollection' = {"<dishId>": <unlockTimestamp>}
//  Called from games when the player successfully completes a dish.
//  Ceremony: +5 coin bonus per new dish, milestone bonuses at 10/20/27.
// ═══════════════════════════════════════════

// Shared coin helper (games also have local addCoins; this one also updates
// the topbar wherever the user is).
function pkAddCoins(n){
  if(!n) return;
  const cur = parseInt(localStorage.getItem('pkCoins') || '0');
  localStorage.setItem('pkCoins', cur + n);
  pkUpdateCoins();
}

// Simple sequential queue so multiple toasts don't overlap.
const _pkColQ = [];
let _pkColShowing = false;
function _pkShowColToast(data){
  _pkColQ.push(data);
  if(!_pkColShowing) _pkColNext();
}
function _pkColNext(){
  if(_pkColQ.length === 0){ _pkColShowing = false; return; }
  _pkColShowing = true;
  const d = _pkColQ.shift();
  const toast = document.getElementById('pkColToast');
  if(!toast){ _pkColShowing = false; return; }
  toast.className = d.variant === 'milestone' ? 'pk-col-milestone' : 'pk-col-dish';
  toast.style.display = 'flex';
  document.getElementById('pkColToastEmoji').textContent = d.emoji;
  document.getElementById('pkColToastLabel').textContent = d.label;
  document.getElementById('pkColToastTitle').textContent = d.title;
  toast.style.animation = 'none';
  void toast.offsetWidth;
  toast.style.animation = 'pkColIn .45s cubic-bezier(.34,1.56,.64,1) forwards';
  try { pkVibrate && pkVibrate('ach'); } catch(e){}
  setTimeout(()=>{
    toast.style.animation = 'pkColOut .3s ease-in forwards';
    setTimeout(()=>{ toast.style.display='none'; setTimeout(_pkColNext, 200); }, 300);
  }, d.variant === 'milestone' ? 3000 : 2400);
}

// Auto-inject unlock-toast DOM (same pattern as achievements.js)
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('pkColToast')) return;
  const d = document.createElement('div');
  d.id = 'pkColToast';
  d.innerHTML = `
    <span id="pkColToastEmoji" style="font-size:1.6rem;flex-shrink:0;">🍽️</span>
    <div style="display:flex;flex-direction:column;gap:3px;">
      <div id="pkColToastLabel" style="font-size:.28rem;color:#c87eb8;letter-spacing:2px;">NEW RECIPE!</div>
      <div id="pkColToastTitle" style="font-size:.38rem;color:#ffd97d;letter-spacing:1px;"></div>
    </div>`;
  document.body.appendChild(d);
});

// Milestone config — self-scaling so adding more dishes later Just Works.
// • Every `STEP` dishes unlocked → `STEP_COIN` coins bonus (10, 20, 30, ...)
// • First time user owns ALL curated dishes → `COMPLETE_COIN` coins
// Each milestone is only paid once per unique key, tracked in
// localStorage.pkMilestonesClaimed so expansion doesn't re-award old ones
// and expanding the collection surfaces a fresh "complete-N" reward.
const _PK_MILESTONE_STEP       = 10;
const _PK_MILESTONE_STEP_COIN  = 50;
const _PK_MILESTONE_COMPLETE   = 500;

function _pkClaimedMs(){
  try { return new Set(JSON.parse(localStorage.getItem('pkMilestonesClaimed') || '[]')); }
  catch(e){ return new Set(); }
}
function _pkSaveClaimed(set){
  localStorage.setItem('pkMilestonesClaimed', JSON.stringify([...set]));
}

function pkUnlockDish(dishId){
  if(!dishId) return false;
  try {
    const raw = localStorage.getItem('pkCollection');
    const map = raw ? JSON.parse(raw) : {};
    if(map[dishId]) return false; // already unlocked
    map[dishId] = Date.now();
    localStorage.setItem('pkCollection', JSON.stringify(map));

    // Per-dish +5 coin bonus + unlock toast
    pkAddCoins(5);
    const dish = (typeof PK_DISHES !== 'undefined') ? PK_DISHES.find(d => d.id === dishId) : null;
    _pkShowColToast({
      variant: 'dish',
      emoji:   dish?.emoji || '🍽️',
      label:   'NEW RECIPE!  +5 🪙',
      title:   (dish?.name || dishId).toUpperCase(),
    });

    // Collection-based achievements (First Recipe, Library Builder, etc.)
    if(typeof pkCheckCollectionAchievements === 'function'){
      pkCheckCollectionAchievements(map);
    }

    // Milestone checks — only curated dishes (those with a recipe entry)
    if(typeof PK_DISH_RECIPES !== 'undefined'){
      const totalCurated = Object.keys(PK_DISH_RECIPES).length;
      const owned = Object.keys(map).filter(id => PK_DISH_RECIPES[id]).length;
      const claimed = _pkClaimedMs();

      // Step milestone (10, 20, 30, ...)
      const stepKey = 'step-' + owned;
      if(owned > 0 && owned % _PK_MILESTONE_STEP === 0 && !claimed.has(stepKey)){
        claimed.add(stepKey);
        pkAddCoins(_PK_MILESTONE_STEP_COIN);
        _pkShowColToast({
          variant: 'milestone',
          emoji:   '🏅',
          label:   'MILESTONE REACHED!',
          title:   owned + ' DISHES  +' + _PK_MILESTONE_STEP_COIN + ' 🪙',
        });
      }
      // Complete milestone — scaled to current collection size (so future
      // expansions hand out a fresh "complete" when the user tops up).
      const completeKey = 'complete-' + totalCurated;
      if(owned === totalCurated && !claimed.has(completeKey)){
        claimed.add(completeKey);
        pkAddCoins(_PK_MILESTONE_COMPLETE);
        _pkShowColToast({
          variant: 'milestone',
          emoji:   '🏆',
          label:   'COLLECTION COMPLETE!',
          title:   totalCurated + ' / ' + totalCurated + '  +' + _PK_MILESTONE_COMPLETE + ' 🪙',
        });
      }
      _pkSaveClaimed(claimed);
    }
    return true; // newly unlocked
  } catch(e) { return false; }
}

function pkGetCollection(){
  try {
    const raw = localStorage.getItem('pkCollection');
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function pkIsDishUnlocked(dishId){
  const c = pkGetCollection();
  return !!c[dishId];
}

// ═══════════════════════════════════════════
//  Daily bonus + streak
//  Called from achievements.js pkRecordGame() on every game completion.
//  • First game each day  → +25 coins
//  • Consecutive days     → streak counter (reset if a day is skipped)
// ═══════════════════════════════════════════
function _pkToday(){ return new Date().toISOString().slice(0,10); }

function pkCheckDailyBonus(){
  const today = _pkToday();
  let awardedBonus = 0;

  if(localStorage.getItem('pkLastBonusDay') !== today){
    awardedBonus = 25;
    pkAddCoins(awardedBonus);
    localStorage.setItem('pkLastBonusDay', today);
  }

  // Streak
  const lastPlay = localStorage.getItem('pkLastPlayDay');
  let streak = parseInt(localStorage.getItem('pkStreak') || '0') || 0;
  if(lastPlay !== today){
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yesterday = y.toISOString().slice(0,10);
    streak = (lastPlay === yesterday) ? (streak + 1) : 1;
    localStorage.setItem('pkStreak', streak);
    localStorage.setItem('pkLastPlayDay', today);
  }

  if(awardedBonus){
    const title = streak > 1 ? (streak + '-DAY STREAK 🔥') : 'WELCOME BACK!';
    _pkShowColToast({
      variant: 'milestone',
      emoji:   '📅',
      label:   'DAILY BONUS!  +' + awardedBonus + ' 🪙',
      title:   title,
    });
  }
}

function pkGetStreak(){
  return parseInt(localStorage.getItem('pkStreak') || '0') || 0;
}
