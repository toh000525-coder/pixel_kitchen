// ═══════════════════════════════════════════════════════════════
//  achievements.js — Pixel Kitchen  Achievement System  v1.0
// ═══════════════════════════════════════════════════════════════

const PK_ACHIEVEMENTS = [
  // ── Explorer ─────────────────────────────────────────────────
  { id:'first_bite',   emoji:'🍳', name:'FIRST BITE',      desc:'Play any game for the first time',       cat:'EXPLORER' },
  { id:'dish_det',     emoji:'🔍', name:'DISH DETECTIVE',   desc:'Complete Dish Detective',                cat:'EXPLORER' },
  { id:'pantry_pro',   emoji:'🧺', name:'PANTRY PRO',       desc:'Complete Pantry Peek',                   cat:'EXPLORER' },
  { id:'knife_skills', emoji:'🔪', name:'KNIFE SKILLS',     desc:'Complete Chop Chop',                     cat:'EXPLORER' },
  { id:'recipe_guru',  emoji:'📋', name:'RECIPE GURU',      desc:'Complete Recipe Rush',                   cat:'EXPLORER' },
  { id:'chaos_cook',   emoji:'🌪️', name:'CHAOS COOK',       desc:'Complete Kitchen Chaos',                 cat:'EXPLORER' },
  { id:'plate_art',    emoji:'🍽️', name:'PLATE ARTIST',     desc:'Complete Plate Perfect',                 cat:'EXPLORER' },
  { id:'world_tour',   emoji:'🌍', name:'WORLD TOUR',        desc:'Complete all 6 games at least once',     cat:'EXPLORER' },
  // ── Stars ────────────────────────────────────────────────────
  { id:'rising_star',  emoji:'⭐', name:'RISING STAR',      desc:'Earn 3 stars in any game',               cat:'STARS'    },
  { id:'star_chef',    emoji:'🌟', name:'STAR CHEF',         desc:'Earn 3 stars in 3 different games',      cat:'STARS'    },
  { id:'all_star',     emoji:'👑', name:'ALL-STAR',          desc:'Earn 3 stars in all 6 games',            cat:'STARS'    },
  // ── Difficulty ───────────────────────────────────────────────
  { id:'spicy',        emoji:'🌶️', name:'SPICY',            desc:'Complete any game on hardest difficulty', cat:'DIFF'     },
  { id:'fire_chef',    emoji:'🔥', name:'FIRE CHEF',         desc:'Complete 3 games on hardest difficulty', cat:'DIFF'     },
  { id:'inferno',      emoji:'🌋', name:'INFERNO',           desc:'Complete all 6 games on hardest',        cat:'DIFF'     },
  { id:'sharp_mind',   emoji:'🎯', name:'SHARP MIND',        desc:'Get 3 stars on hardest difficulty',      cat:'DIFF'     },
  // ── Dedication ───────────────────────────────────────────────
  { id:'regular',      emoji:'🎮', name:'KITCHEN REGULAR',  desc:'Play 10 games total',                    cat:'GRIND'    },
  { id:'marathon',     emoji:'🏃', name:'MARATHONER',        desc:'Play 30 games total',                    cat:'GRIND'    },
  { id:'veteran',      emoji:'🏆', name:'VETERAN CHEF',      desc:'Play 100 games total',                   cat:'GRIND'    },
  // ── Coins ────────────────────────────────────────────────────
  { id:'pocket',       emoji:'🪙', name:'POCKET CHANGE',    desc:'Accumulate 50 coins',                    cat:'COINS'    },
  { id:'coin_chef',    emoji:'💰', name:'COIN CHEF',         desc:'Accumulate 200 coins',                   cat:'COINS'    },
  { id:'golden',       emoji:'✨', name:'GOLDEN CHEF',       desc:'Accumulate 500 coins',                   cat:'COINS'    },
  // ── Time ─────────────────────────────────────────────────────
  { id:'early_bird',   emoji:'🌅', name:'EARLY BIRD',        desc:'Play before 8am',                        cat:'TIME'     },
  { id:'night_owl',    emoji:'🌙', name:'NIGHT OWL',          desc:'Play after midnight',                    cat:'TIME'     },
  // ── Special ──────────────────────────────────────────────────
  { id:'comeback',     emoji:'🔁', name:'COMEBACK',          desc:'Play again after a 1-star result',       cat:'SPECIAL'  },
  { id:'master_chef',  emoji:'👨‍🍳', name:'MASTER CHEF',     desc:'Unlock 20 achievements',                 cat:'SPECIAL'  },
  // ── Collection ───────────────────────────────────────────────
  { id:'first_recipe',     emoji:'🔓', name:'FIRST RECIPE',     desc:'Unlock your first dish',                 cat:'COLLECT'  },
  { id:'library_builder',  emoji:'📖', name:'LIBRARY BUILDER',  desc:'Unlock 10 dishes in the collection',     cat:'COLLECT'  },
  { id:'cuisine_explorer', emoji:'🌍', name:'CUISINE EXPLORER', desc:'Unlock dishes from 5 different cuisines', cat:'COLLECT'  },
  { id:'master_collector', emoji:'🌟', name:'MASTER COLLECTOR', desc:'Unlock every dish in the collection',    cat:'COLLECT'  },
];

// ── Storage helpers ───────────────────────────────────────────
function pkGetStats(){
  try{ return JSON.parse(localStorage.getItem('pkStats'))||{}; }catch(e){ return {}; }
}
function pkSaveStats(s){ localStorage.setItem('pkStats',JSON.stringify(s)); }
function pkGetUnlocked(){
  try{ return JSON.parse(localStorage.getItem('pkAchievements'))||{}; }catch(e){ return {}; }
}
function pkUnlockAchievement(id){
  const u=pkGetUnlocked();
  if(u[id]) return false;
  u[id]=new Date().toISOString();
  localStorage.setItem('pkAchievements',JSON.stringify(u));
  return true;
}

// ── Record a completed game and check achievements ────────────
// Call this right before showing the result pane in each game.
// data: { gameId:1-6, stars:1-3, hardest:bool }
function pkRecordGame({ gameId, stars, hardest }){
  if(typeof stars !== 'number') return [];
  if(typeof pkCheckDailyBonus === 'function') pkCheckDailyBonus();
  const s = pkGetStats();

  // init stat fields
  s.totalGames  = (s.totalGames  || 0) + 1;
  s.byGame      = s.byGame      || {};
  s.starsByGame = s.starsByGame || {};
  s.hardByGame  = s.hardByGame  || {};

  const hadOneStar = !!s.hadOneStar;
  if(stars === 1) s.hadOneStar = true;

  s.byGame[gameId]      = (s.byGame[gameId] || 0) + 1;
  s.starsByGame[gameId] = Math.max(s.starsByGame[gameId] || 0, stars);
  if(hardest) s.hardByGame[gameId] = true;

  pkSaveStats(s);

  const coins        = parseInt(localStorage.getItem('pkCoins') || '0');
  const h            = new Date().getHours();
  const unlocked     = pkGetUnlocked();
  const newOnes      = [];
  const threeStarN   = [1,2,3,4,5,6].filter(i => (s.starsByGame[i]||0) >= 3).length;
  const hardN        = [1,2,3,4,5,6].filter(i => s.hardByGame[i]).length;
  const allPlayed    = [1,2,3,4,5,6].every(i => (s.byGame[i]||0) >= 1);

  function chk(id, cond){
    if(!unlocked[id] && cond && pkUnlockAchievement(id)) newOnes.push(id);
  }

  // Explorer
  chk('first_bite',   s.totalGames >= 1);
  chk('dish_det',     (s.byGame[1]||0) >= 1);
  chk('pantry_pro',   (s.byGame[2]||0) >= 1);
  chk('knife_skills', (s.byGame[3]||0) >= 1);
  chk('recipe_guru',  (s.byGame[4]||0) >= 1);
  chk('chaos_cook',   (s.byGame[5]||0) >= 1);
  chk('plate_art',    (s.byGame[6]||0) >= 1);
  chk('world_tour',   allPlayed);
  // Stars
  chk('rising_star',  threeStarN >= 1);
  chk('star_chef',    threeStarN >= 3);
  chk('all_star',     threeStarN >= 6);
  // Difficulty
  chk('spicy',        hardN >= 1);
  chk('fire_chef',    hardN >= 3);
  chk('inferno',      hardN >= 6);
  chk('sharp_mind',   hardest && stars >= 3);
  // Dedication
  chk('regular',      s.totalGames >= 10);
  chk('marathon',     s.totalGames >= 30);
  chk('veteran',      s.totalGames >= 100);
  // Coins
  chk('pocket',       coins >= 50);
  chk('coin_chef',    coins >= 200);
  chk('golden',       coins >= 500);
  // Time
  chk('early_bird',   h >= 5 && h < 8);
  chk('night_owl',    h >= 0 && h < 4);
  // Special
  chk('comeback',     hadOneStar);
  // master_chef: re-read after all above unlocks
  chk('master_chef',  Object.keys(pkGetUnlocked()).length >= 20);

  if(newOnes.length) pkShowAchToasts(newOnes);
  return newOnes;
}

// ── Toast notification ────────────────────────────────────────
let _pkQ = [], _pkToasting = false;

function pkShowAchToasts(ids){ _pkQ.push(...ids); if(!_pkToasting) _pkNextToast(); }

// Achievement unlock sound — 4-note ascending arpeggio
function _pkAchSfx(){
  if(localStorage.getItem('pkMuted')==='1') return;
  try{
    const ac = new (window.AudioContext||window.webkitAudioContext)();
    const t  = ac.currentTime;
    [[523,0],[659,.10],[784,.20],[1047,.30]].forEach(([freq,delay])=>{
      const o=ac.createOscillator(), g=ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type='square'; o.frequency.value=freq;
      g.gain.setValueAtTime(0,t+delay);
      g.gain.linearRampToValueAtTime(0.07,t+delay+0.02);
      g.gain.setValueAtTime(0.07,t+delay+0.07);
      g.gain.linearRampToValueAtTime(0,t+delay+0.12);
      o.start(t+delay); o.stop(t+delay+0.14);
    });
    setTimeout(()=>ac.close(),1200);
  }catch(e){}
}

function _pkNextToast(){
  if(!_pkQ.length){ _pkToasting=false; return; }
  _pkToasting = true;
  const id  = _pkQ.shift();
  const ach = PK_ACHIEVEMENTS.find(a => a.id === id);
  if(!ach){ _pkNextToast(); return; }

  let toast = document.getElementById('pkAchToast');
  if(!toast){ _pkToasting=false; return; }
  _pkAchSfx(); pkVibrate('ach');

  document.getElementById('pkAchToastEmoji').textContent = ach.emoji;
  document.getElementById('pkAchToastName').textContent  = ach.name;
  toast.style.display   = 'flex';
  toast.style.animation = 'none';
  void toast.offsetWidth;
  toast.style.animation = 'pkAchIn .35s ease-out forwards';

  setTimeout(()=>{
    toast.style.animation='pkAchOut .3s ease-in forwards';
    setTimeout(()=>{ toast.style.display='none'; setTimeout(_pkNextToast,200); },300);
  }, 2500);
}

// ── Auto-inject toast DOM ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('pkAchToast')) return;
  const d = document.createElement('div');
  d.id = 'pkAchToast';
  d.innerHTML = `
    <span id="pkAchToastEmoji" style="font-size:1.8rem;flex-shrink:0;">🏆</span>
    <div style="display:flex;flex-direction:column;gap:3px;">
      <div style="font-size:.28rem;color:#f5c842;letter-spacing:2px;">ACHIEVEMENT UNLOCKED!</div>
      <div id="pkAchToastName" style="font-size:.38rem;color:#fff;letter-spacing:1px;"></div>
    </div>`;
  document.body.appendChild(d);
});

// ── Collection achievement checks ────────────────────────────
// Called by shared.js pkUnlockDish() right after a new dish is recorded.
// `collectionMap` is the full {dishId: timestamp} map (already includes the
// just-unlocked dish).
function pkCheckCollectionAchievements(collectionMap){
  if(!collectionMap) return [];
  const unlocked = pkGetUnlocked();
  const newOnes  = [];
  const ownedIds = Object.keys(collectionMap);

  // Count only dishes that are part of the curated collection.
  let curatedCount = 0;
  const cuisines = new Set();
  if(typeof PK_DISH_RECIPES !== 'undefined' && typeof PK_DISHES !== 'undefined'){
    ownedIds.forEach(id => {
      if(PK_DISH_RECIPES[id]){
        curatedCount++;
        const dish = PK_DISHES.find(d => d.id === id);
        if(dish && dish.cuisine) cuisines.add(dish.cuisine);
      }
    });
  }
  const totalCurated = (typeof PK_DISH_RECIPES !== 'undefined')
    ? Object.keys(PK_DISH_RECIPES).length : 0;

  function chk(id, cond){
    if(!unlocked[id] && cond && pkUnlockAchievement(id)) newOnes.push(id);
  }
  chk('first_recipe',     curatedCount >= 1);
  chk('library_builder',  curatedCount >= 10);
  chk('cuisine_explorer', cuisines.size >= 5);
  chk('master_collector', totalCurated > 0 && curatedCount >= totalCurated);

  // Re-check master_chef since new achievements may push us past 20
  chk('master_chef', Object.keys(pkGetUnlocked()).length >= 20);

  if(newOnes.length) pkShowAchToasts(newOnes);
  return newOnes;
}
