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

// Register service worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  });
}
