// ═══════════════════════════════════════════════════════════════
//  quests.js — Pixel Kitchen  Daily/Weekly Quest System  v1.0
// ═══════════════════════════════════════════════════════════════
//  Storage: localStorage.pkQuests = {
//    dailyDate:  'YYYY-MM-DD',
//    daily:      [{ id, progress, claimed, distinctSeen? }, ...3]
//    dailySnap:  { coins, dishes }      ← snapshot at roll time, used for delta quests
//    weeklyDate: 'YYYY-MM-DD' (Monday of current week)
//    weekly:     { id, progress, claimed, distinctSeen? }
//    weeklySnap: { coins, dishes }
//  }
//
//  Hooked into achievements.js pkRecordGame() — every game completion bumps
//  matching quests. Coin/dish quests are evaluated on-demand against the
//  snapshot, so they catch progress even from milestones / shop refunds.

(function(){
  'use strict';

  // ── Quest pool ──────────────────────────────────────────────
  const PK_QUEST_POOL = [
    // Daily — pick 3 fresh each day
    { id:'d_play3',     period:'daily', emoji:'🎮', title:'Play 3 games',                target:3,  reward:30,  type:'play_any' },
    { id:'d_play5',     period:'daily', emoji:'🎮', title:'Play 5 games',                target:5,  reward:55,  type:'play_any' },
    { id:'d_stars5',    period:'daily', emoji:'⭐', title:'Earn 5 stars',                target:5,  reward:40,  type:'stars_any' },
    { id:'d_3star',     period:'daily', emoji:'🌟', title:'Score a 3-star result',       target:1,  reward:35,  type:'three_star_any' },
    { id:'d_hard',      period:'daily', emoji:'🌶️', title:'Win on hardest difficulty',   target:1,  reward:50,  type:'hardest_any' },
    { id:'d_coins50',   period:'daily', emoji:'🪙', title:'Earn 50 coins',               target:50, reward:30,  type:'coins' },
    { id:'d_dish1',     period:'daily', emoji:'🍽️', title:'Unlock a new dish',           target:1,  reward:35,  type:'dishes' },
    { id:'d_distinct2', period:'daily', emoji:'🎯', title:'Play 2 different games',      target:2,  reward:40,  type:'distinct_games' },
    { id:'d_dishdet',   period:'daily', emoji:'🔍', title:'Play Dish Detective',         target:1,  reward:25,  type:'play_game', gameId:1 },
    { id:'d_chop',      period:'daily', emoji:'🔪', title:'Play Chop Chop',              target:1,  reward:25,  type:'play_game', gameId:3 },

    // Weekly — pick 1 big goal each week
    { id:'w_play20',    period:'weekly', emoji:'🏆', title:'Play 20 games this week',     target:20,  reward:200, type:'play_any' },
    { id:'w_coins500',  period:'weekly', emoji:'💰', title:'Earn 500 coins this week',    target:500, reward:200, type:'coins' },
    { id:'w_allgames',  period:'weekly', emoji:'🌍', title:'Play all 6 games this week',  target:6,   reward:250, type:'distinct_games' },
    { id:'w_dishes5',   period:'weekly', emoji:'📖', title:'Unlock 5 new dishes',         target:5,   reward:220, type:'dishes' },
    { id:'w_3star3',    period:'weekly', emoji:'🌟', title:'Get 3-star in 3 games',       target:3,   reward:230, type:'three_star_distinct' },
  ];

  // ── Date helpers ────────────────────────────────────────────
  function _today(){ return new Date().toISOString().slice(0,10); }
  function _weekStart(){
    // Monday-anchored ISO week start (locale-stable via UTC date math)
    const d = new Date();
    const day = d.getDay(); // 0=Sun ... 6=Sat
    const diff = (day === 0 ? -6 : 1 - day);
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0,10);
  }

  // ── Snapshot helpers ────────────────────────────────────────
  function _coins(){ return parseInt(localStorage.getItem('pkCoins')||'0')||0; }
  function _dishCount(){
    try {
      const m = JSON.parse(localStorage.getItem('pkCollection')||'{}');
      return Object.keys(m).length;
    } catch(e){ return 0; }
  }

  function _load(){
    try { return JSON.parse(localStorage.getItem('pkQuests')||'{}'); }
    catch(e){ return {}; }
  }
  function _save(q){ localStorage.setItem('pkQuests', JSON.stringify(q)); }

  function _pickN(arr, n){
    const copy = arr.slice();
    const out = [];
    while(copy.length && out.length < n){
      const idx = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  }

  function _template(id){ return PK_QUEST_POOL.find(t => t.id === id); }

  // ── Roll / refresh ──────────────────────────────────────────
  function _rollIfNeeded(){
    const q = _load();
    const today = _today();
    const weekStart = _weekStart();

    if(q.dailyDate !== today){
      const pool = PK_QUEST_POOL.filter(t => t.period === 'daily');
      q.dailyDate = today;
      q.daily = _pickN(pool, 3).map(t => ({ id:t.id, progress:0, claimed:false, distinctSeen:[] }));
      q.dailySnap = { coins:_coins(), dishes:_dishCount() };
    }

    if(q.weeklyDate !== weekStart){
      const pool = PK_QUEST_POOL.filter(t => t.period === 'weekly');
      const pick = _pickN(pool, 1)[0];
      q.weeklyDate = weekStart;
      q.weekly = { id:pick.id, progress:0, claimed:false, distinctSeen:[] };
      q.weeklySnap = { coins:_coins(), dishes:_dishCount() };
    }
    _save(q);
    return q;
  }

  function _refreshDeltas(q){
    function refresh(quest, snap){
      if(!quest || quest.claimed) return;
      const t = _template(quest.id);
      if(!t) return;
      if(t.type === 'coins'){
        quest.progress = Math.min(t.target, Math.max(0, _coins() - (snap?.coins||0)));
      } else if(t.type === 'dishes'){
        quest.progress = Math.min(t.target, Math.max(0, _dishCount() - (snap?.dishes||0)));
      }
    }
    (q.daily||[]).forEach(qq => refresh(qq, q.dailySnap));
    refresh(q.weekly, q.weeklySnap);
  }

  // ── Public: get full state ──────────────────────────────────
  function pkGetQuests(){
    const q = _rollIfNeeded();
    _refreshDeltas(q);
    _save(q);
    return q;
  }

  // ── Public: progress hook ───────────────────────────────────
  // Called from pkRecordGame after every game completion.
  function pkQuestProgress({ gameId, stars, hardest }){
    const q = _rollIfNeeded();

    function bump(quest){
      if(!quest || quest.claimed) return;
      const t = _template(quest.id);
      if(!t) return;
      if(quest.progress >= t.target) return;
      switch(t.type){
        case 'play_any':
          quest.progress = Math.min(t.target, quest.progress + 1);
          break;
        case 'play_game':
          if(t.gameId === gameId) quest.progress = Math.min(t.target, quest.progress + 1);
          break;
        case 'stars_any':
          quest.progress = Math.min(t.target, quest.progress + (stars||0));
          break;
        case 'three_star_any':
          if((stars||0) >= 3) quest.progress = Math.min(t.target, quest.progress + 1);
          break;
        case 'hardest_any':
          if(hardest) quest.progress = Math.min(t.target, quest.progress + 1);
          break;
        case 'distinct_games':
          quest.distinctSeen = quest.distinctSeen || [];
          if(!quest.distinctSeen.includes(gameId)){
            quest.distinctSeen.push(gameId);
            quest.progress = Math.min(t.target, quest.distinctSeen.length);
          }
          break;
        case 'three_star_distinct':
          if((stars||0) >= 3){
            quest.distinctSeen = quest.distinctSeen || [];
            if(!quest.distinctSeen.includes(gameId)){
              quest.distinctSeen.push(gameId);
              quest.progress = Math.min(t.target, quest.distinctSeen.length);
            }
          }
          break;
        // 'coins' and 'dishes' are handled by _refreshDeltas
      }
    }

    (q.daily||[]).forEach(bump);
    bump(q.weekly);
    _refreshDeltas(q);
    _save(q);
  }

  // ── Public: claim a finished quest ──────────────────────────
  // Returns reward amount on success, or 0 if not claimable.
  function pkClaimQuest(id){
    const q = _rollIfNeeded();
    _refreshDeltas(q);
    let quest = (q.daily||[]).find(x => x.id === id);
    if(!quest && q.weekly && q.weekly.id === id) quest = q.weekly;
    if(!quest || quest.claimed) return 0;
    const t = _template(id);
    if(!t) return 0;
    if(quest.progress < t.target) return 0;
    quest.claimed = true;
    _save(q);
    if(typeof pkAddCoins === 'function') pkAddCoins(t.reward);
    if(typeof pkVibrate === 'function') pkVibrate('ach');
    return t.reward;
  }

  // ── Public: count of claimable quests (for hub badge) ───────
  function pkCountClaimable(){
    const q = _rollIfNeeded();
    _refreshDeltas(q);
    let n = 0;
    (q.daily||[]).forEach(x => {
      const t = _template(x.id);
      if(t && !x.claimed && x.progress >= t.target) n++;
    });
    if(q.weekly){
      const t = _template(q.weekly.id);
      if(t && !q.weekly.claimed && q.weekly.progress >= t.target) n++;
    }
    return n;
  }

  // ── Expose ──────────────────────────────────────────────────
  window.PK_QUEST_POOL    = PK_QUEST_POOL;
  window.pkGetQuests      = pkGetQuests;
  window.pkQuestProgress  = pkQuestProgress;
  window.pkClaimQuest     = pkClaimQuest;
  window.pkCountClaimable = pkCountClaimable;
  window._pkQuestTemplate = _template;
})();
