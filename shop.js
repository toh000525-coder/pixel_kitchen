// ═══════════════════════════════════════════════════════════════
//  shop.js — Pixel Kitchen  Shop Catalog + Avatar System
//  Loaded on 0_hub.html. Handles:
//    • Shop item catalog (PK_SHOP_ITEMS)
//    • Owned items tracking (localStorage.pkOwnedItems)
//    • Equipped avatar (localStorage.pkAvatar)
//    • Purchase flow (spend coins, add to owned)
//    • Avatar sprite sheet loading (assets/avatars-sprites.webp)
// ═══════════════════════════════════════════════════════════════

const PK_SHOP_ITEMS = [
  // Row 1 — free + kitchen classics
  {id:'classic_chef',  type:'avatar', name:'CLASSIC CHEF',    price:0,    sprite:0,  tier:'free',    default:true},
  {id:'apprentice',    type:'avatar', name:'APPRENTICE',      price:100,  sprite:1,  tier:'starter'},
  {id:'baker',         type:'avatar', name:'BAKER',           price:50,   sprite:2,  tier:'starter'},
  {id:'sushi_chef',    type:'avatar', name:'SUSHI CHEF',      price:100,  sprite:3,  tier:'starter'},
  {id:'pizza_maker',   type:'avatar', name:'PIZZA MAKER',     price:100,  sprite:4,  tier:'starter'},
  // Row 2 — specialty
  {id:'wok_chef',      type:'avatar', name:'WOK CHEF',        price:150,  sprite:5,  tier:'starter'},
  {id:'pasta_chef',    type:'avatar', name:'PASTA CHEF',      price:150,  sprite:6,  tier:'starter'},
  {id:'grandma_cook',  type:'avatar', name:'GRANDMA COOK',    price:200,  sprite:7,  tier:'mid'},
  {id:'pastry_chef',   type:'avatar', name:'PASTRY CHEF',     price:250,  sprite:8,  tier:'mid'},
  {id:'food_truck',    type:'avatar', name:'FOOD TRUCK COOK', price:200,  sprite:9,  tier:'mid'},
  // Row 3 — elite kitchen + premium
  {id:'bbq_pitmaster', type:'avatar', name:'BBQ PITMASTER',   price:300,  sprite:10, tier:'mid'},
  {id:'head_chef',     type:'avatar', name:'HEAD CHEF',       price:0,    sprite:11, tier:'free',    default:true},
  {id:'robot_chef',    type:'avatar', name:'ROBOT CHEF',      price:500,  sprite:12, tier:'premium'},
  {id:'wizard_chef',   type:'avatar', name:'WIZARD CHEF',     price:600,  sprite:13, tier:'premium'},
  {id:'golden_chef',   type:'avatar', name:'GOLDEN CHEF',     price:1000, sprite:14, tier:'legendary'},
  // Row 4 — cute/adventure
  {id:'bear_chef',     type:'avatar', name:'BEAR CHEF',       price:250,  sprite:15, tier:'theme'},
  {id:'owl_chef',      type:'avatar', name:'OWL CHEF',        price:300,  sprite:16, tier:'theme'},
  {id:'boba_maker',    type:'avatar', name:'BOBA TEA MAKER',  price:200,  sprite:17, tier:'mid'},
  {id:'pirate_cook',   type:'avatar', name:'PIRATE COOK',     price:350,  sprite:18, tier:'theme'},
  {id:'ninja_chef',    type:'avatar', name:'NINJA CHEF',      price:400,  sprite:19, tier:'theme'},
  // Row 5 — fantasy legendary
  {id:'dragon_chef',   type:'avatar', name:'DRAGON CHEF',     price:1200, sprite:20, tier:'legendary'},
  {id:'phoenix_chef',  type:'avatar', name:'PHOENIX CHEF',    price:1500, sprite:21, tier:'legendary'},
  {id:'witch_chef',    type:'avatar', name:'WITCH CHEF',      price:800,  sprite:22, tier:'theme'},
  {id:'neon_chef',     type:'avatar', name:'NEON CHEF',       price:600,  sprite:23, tier:'premium'},
  {id:'viking_chef',   type:'avatar', name:'VIKING CHEF',     price:500,  sprite:24, tier:'premium'},
];

// Tiers render top-to-bottom in the shop. Order + label:
const PK_TIER_ORDER = [
  {key:'free',      label:'FREE'},
  {key:'starter',   label:'STARTER'},
  {key:'mid',       label:'SPECIALTY'},
  {key:'theme',     label:'THEME'},
  {key:'premium',   label:'PREMIUM'},
  {key:'legendary', label:'LEGENDARY'},
];

// ── Ownership ────────────────────────────────────────────────
function pkGetOwned(){
  try { return new Set(JSON.parse(localStorage.getItem('pkOwnedItems') || '[]')); }
  catch(e) { return new Set(); }
}
function pkSaveOwned(set){
  localStorage.setItem('pkOwnedItems', JSON.stringify([...set]));
}
function pkIsOwned(id){
  return pkGetOwned().has(id);
}

// Grant default items on first run / every hub load (cheap no-op if already owned)
function pkEnsureDefaults(){
  const owned = pkGetOwned();
  let changed = false;
  PK_SHOP_ITEMS.filter(i => i.default).forEach(i => {
    if(!owned.has(i.id)){ owned.add(i.id); changed = true; }
  });
  if(changed) pkSaveOwned(owned);
}

// ── Avatar equip ─────────────────────────────────────────────
function pkGetAvatar(){
  const cur = localStorage.getItem('pkAvatar');
  if(cur && pkIsOwned(cur)) return cur;
  return 'classic_chef';  // fallback
}
function pkSetAvatar(id){
  if(!pkIsOwned(id)) return false;
  localStorage.setItem('pkAvatar', id);
  return true;
}

// ── Purchase ─────────────────────────────────────────────────
// Returns {ok:true, item} on success, or {ok:false, reason:'already'|'broke'|'notfound'}
function pkBuyItem(id){
  const item = PK_SHOP_ITEMS.find(i => i.id === id);
  if(!item) return {ok:false, reason:'notfound'};
  if(pkIsOwned(id)) return {ok:false, reason:'already'};
  const coins = parseInt(localStorage.getItem('pkCoins') || '0');
  if(coins < item.price) return {ok:false, reason:'broke'};
  localStorage.setItem('pkCoins', coins - item.price);
  const owned = pkGetOwned();
  owned.add(id);
  pkSaveOwned(owned);
  return {ok:true, item};
}

// ── Avatar sprite sheet loader ───────────────────────────────
// Sheet is 800×800 (5 cols × 5 rows, 160px per cell).
const PK_AVATAR_COLS = 5;
const PK_AVATAR_CELL = 160;
let PK_AVATAR_IMAGE = null;
let PK_AVATAR_IMAGE_READY = false;
let PK_AVATAR_IMAGE_LOADING = null;

function pkLoadAvatarImage(){
  if(PK_AVATAR_IMAGE_READY) return Promise.resolve(PK_AVATAR_IMAGE);
  if(PK_AVATAR_IMAGE_LOADING) return PK_AVATAR_IMAGE_LOADING;
  PK_AVATAR_IMAGE_LOADING = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      PK_AVATAR_IMAGE = img;
      PK_AVATAR_IMAGE_READY = true;
      resolve(img);
    };
    img.onerror = () => reject(new Error('avatars-sprites.webp load failed'));
    img.src = 'assets/avatars-sprites.webp';
  });
  return PK_AVATAR_IMAGE_LOADING;
}

// Draw avatar into a canvas at target size. Returns false if not ready.
function pkDrawAvatar(ctx, avatarId, dx, dy, size){
  if(!PK_AVATAR_IMAGE_READY) return false;
  const item = PK_SHOP_ITEMS.find(i => i.id === avatarId);
  if(!item) return false;
  const idx = item.sprite;
  const col = idx % PK_AVATAR_COLS;
  const row = Math.floor(idx / PK_AVATAR_COLS);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(PK_AVATAR_IMAGE,
    col * PK_AVATAR_CELL, row * PK_AVATAR_CELL, PK_AVATAR_CELL, PK_AVATAR_CELL,
    dx, dy, size, size);
  return true;
}

// Background prefetch — call after hub renders to warm cache without
// blocking first paint. Cheap no-op if already loaded.
function pkPrefetchAvatars(){
  (window.requestIdleCallback || setTimeout)(() => {
    pkLoadAvatarImage().catch(() => {});
  }, 1200);
}
