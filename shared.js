// ═══════════════════════════════════════════
//  shared.js — Pixel Kitchen  Common Utilities
// ═══════════════════════════════════════════

// Page navigation with fade-out transition
function goTo(url){
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
  const p = { combo:[40,30,40,30,80], fail:[100], ach:[30,20,30,20,80] };
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
