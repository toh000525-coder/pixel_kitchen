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

// Register service worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  });
}
