# Pixel Kitchen — Shop Feature Plan (Pre-coding Decisions)

Reference doc capturing the **design decisions we've already agreed on** so
we don't re-litigate them when we actually build the shop.

---

## ✅ Agreed Requirements

| Decision | Value | Why |
|---|---|---|
| Shop entry point | **One single entry** — `🛒 SHOP` button in hub sidebar | User: "shop 只能有 hub 那边的 shop 入口" — NOT in profile modal |
| Art pipeline | Gemini-generated PNGs provided by user | Same flow as `IMG_4589.png` for dishes |
| Initial scope | **Avatars first**, but architecture must support other item types later | User: "会做其他的商品" |
| Future item types | Frames / Titles / Game items / Consumables | Build generic "shop item" schema, not avatar-specific |
| Currency | Existing `pkCoins` localStorage | No new currency |
| Payment | 100% local (no real money) | |

---

## 📏 Capacity Budget (as of audit Apr 2026)

Current repo: **858 KB**. Limits with huge headroom:

| Constraint | Limit | Current | Notes |
|---|---|---|---|
| GitHub Pages repo | 1 GB hard / <100 MB recommended | 858 KB | Essentially unlimited for our use |
| SW cache | ~50-250 MB per origin | ~1 MB | Plenty |
| localStorage | 5-10 MB per origin | < 50 KB | Huge room |
| Single asset | < 500 KB for mobile | max 180 KB | Keep sprite sheets under ~300 KB each |
| First-paint total | < 2 MB | ~800 KB | Keep hub lean — don't load shop sprites eagerly |

**Expected shop footprint at full expansion**: +500 KB to +1 MB. Safe.

**Critical rule**: hub must NOT eagerly load shop sprite sheets **in the
critical render path**, but SHOULD prefetch them after hub is painted
(see "Prefetch strategy" below) so the user doesn't wait when opening shop.

---

## 🏗️ Proposed Architecture (not yet built)

### File layout
```
0_hub.html                    ← add 🛒 SHOP button next to 📖 COLLECTION
shop.html                     ← NEW — shop page (or modal inside hub)
shop.js                       ← NEW — shop item catalog + purchase logic
assets/avatars-sprites.webp   ← NEW — sprite sheet for avatars
assets/frames-sprites.webp    ← future — frames
etc.
```

Prefer **modal inside hub** over separate page — no extra navigation, faster,
consistent with how the collection recipe became a modal.

### Data schema (shop item)
Keep generic so future types plug in. **Phase 2 art is ready** —
25 avatars in `assets/avatars-sprites.webp` (800×800, 5×5 grid, 160px cells).

Sprite grid index (row-major):
```
 0 CLASSIC CHEF      5 WOK CHEF        10 BBQ PITMASTER   15 BEAR CHEF      20 DRAGON CHEF
 1 APPRENTICE        6 PASTA CHEF      11 HEAD CHEF       16 OWL CHEF       21 PHOENIX CHEF
 2 BAKER             7 GRANDMA COOK    12 ROBOT CHEF      17 BOBA TEA MAKER 22 WITCH CHEF
 3 SUSHI CHEF        8 PASTRY CHEF     13 WIZARD CHEF     18 PIRATE COOK    23 NEON CHEF
 4 PIZZA MAKER       9 FOOD TRUCK COOK 14 GOLDEN CHEF     19 NINJA CHEF     24 VIKING CHEF
```

Suggested catalog (prices TBD at Phase 1 start):
```js
const PK_SHOP_ITEMS = [
  // Free tier (auto-granted)
  {id:'classic_chef',   type:'avatar', name:'CLASSIC CHEF',    price:0,   sprite:0,  default:true},
  {id:'apprentice',     type:'avatar', name:'APPRENTICE',      price:0,   sprite:1,  default:true},
  // Starter (50-150)
  {id:'baker',          type:'avatar', name:'BAKER',           price:50,  sprite:2},
  {id:'sushi_chef',     type:'avatar', name:'SUSHI CHEF',      price:100, sprite:3},
  {id:'pizza_maker',    type:'avatar', name:'PIZZA MAKER',     price:100, sprite:4},
  {id:'wok_chef',       type:'avatar', name:'WOK CHEF',        price:150, sprite:5},
  {id:'pasta_chef',     type:'avatar', name:'PASTA CHEF',      price:150, sprite:6},
  // Mid (200-350)
  {id:'grandma_cook',   type:'avatar', name:'GRANDMA COOK',    price:200, sprite:7},
  {id:'pastry_chef',    type:'avatar', name:'PASTRY CHEF',     price:250, sprite:8},
  {id:'food_truck',     type:'avatar', name:'FOOD TRUCK COOK', price:200, sprite:9},
  {id:'bbq_pitmaster',  type:'avatar', name:'BBQ PITMASTER',   price:300, sprite:10},
  {id:'head_chef',      type:'avatar', name:'HEAD CHEF',       price:350, sprite:11},
  // Cute/adventure theme
  {id:'bear_chef',      type:'avatar', name:'BEAR CHEF',       price:250, sprite:15},
  {id:'owl_chef',       type:'avatar', name:'OWL CHEF',        price:300, sprite:16},
  {id:'boba_maker',     type:'avatar', name:'BOBA TEA MAKER',  price:200, sprite:17},
  {id:'pirate_cook',    type:'avatar', name:'PIRATE COOK',     price:350, sprite:18},
  {id:'ninja_chef',     type:'avatar', name:'NINJA CHEF',      price:400, sprite:19},
  // Premium (500+)
  {id:'robot_chef',     type:'avatar', name:'ROBOT CHEF',      price:500, sprite:12},
  {id:'wizard_chef',    type:'avatar', name:'WIZARD CHEF',     price:600, sprite:13},
  {id:'neon_chef',      type:'avatar', name:'NEON CHEF',       price:600, sprite:23},
  {id:'viking_chef',    type:'avatar', name:'VIKING CHEF',     price:500, sprite:24},
  // Legendary (1000+)
  {id:'golden_chef',    type:'avatar', name:'GOLDEN CHEF',     price:1000, sprite:14},
  {id:'dragon_chef',    type:'avatar', name:'DRAGON CHEF',     price:1200, sprite:20},
  {id:'phoenix_chef',   type:'avatar', name:'PHOENIX CHEF',    price:1500, sprite:21},
  {id:'witch_chef',     type:'avatar', name:'WITCH CHEF',      price:800, sprite:22},
  // Future: {id:'frame_gold', type:'frame', ...}
];
```

### Pricing tiers (avatar initial release)
- **Free**: 2 defaults (auto-granted, for choice)
- **Starter**: 50-150 coins × 3-4 items
- **Premium**: 300-500 coins × 1-2 items

Rationale: player earns ~5-20 coins per game. Free items give instant choice;
starter items are attainable in ~10-30 games; premium is aspirational.

### localStorage schema
```
pkAvatar        = "<itemId>"                  (currently equipped avatar id)
pkOwnedItems    = ["chef_classic", "chef_cat"] (all purchased/default-unlocked item ids)
pkCoins         (existing — used for purchases)
```

Use a **single `pkOwnedItems` array** for all item types (avatars, frames, titles).
Purchase flow:
1. Check `pkCoins >= item.price`
2. Decrement coins, add id to `pkOwnedItems`
3. Toast "PURCHASED! [name]" (reuse `_pkShowColToast` pattern)
4. Auto-equip if it's the first avatar purchased

### Where avatar renders
- Profile modal (replaces hardcoded `👨‍🍳`)
- Hub sidebar (mini version next to player name)
- Future: in-game topbar? TBD

Use the same sprite-sheet pattern as `dishes.js`:
- Lazy-load `avatars-sprites.webp` only on shop open or profile open
- Fallback to emoji if sprite not loaded yet

### Prefetch strategy (important for perceived snappiness)

If hub avoids loading shop sprites entirely, the first shop click waits
~0.5-1s on the fetch. To avoid that:

1. After hub has finished rendering, schedule a background prefetch:
   ```js
   // at the end of DOMContentLoaded in 0_hub.html
   (window.requestIdleCallback || setTimeout)(() => {
     new Image().src = 'assets/avatars-sprites.webp';
     // add more sprite sheets as shop expands:
     // new Image().src = 'assets/frames-sprites.webp';
   }, 1200);
   ```
   `requestIdleCallback` ensures the fetch only happens when the main
   thread is idle — it never competes with Firebase / font loading for
   initial paint.
2. Add all shop assets to `sw.js` STATIC list so the Service Worker
   caches them on install. Second-visit shop opens become instant.
3. Result:
   - **1st-ever visit → 1st shop click**: worst case ~500ms wait if user
     clicks immediately; usually instant because prefetch finishes first.
   - **2nd+ visit**: always instant (SW cache).

This gives eager-load UX without paying for it on hub first-paint.

---

## 🚧 Implementation Phases (when we start coding)

**Phase 1 — infrastructure (no UI assets yet)**
1. `shop.js` with `PK_SHOP_ITEMS` catalog + purchase/equip helpers
2. Shop modal skeleton in `0_hub.html`
3. 🛒 SHOP button in hub sidebar
4. Avatar slot in profile modal (emoji fallback)
5. localStorage schema init on first run (default avatars granted)

**Phase 2 — art** ✅ DONE
- 25 chibi chef avatars generated via Gemini (5 strips of 2400×448 each)
- Processed into `assets/avatars-sprites.webp` — 800×800, 5×5 grid, 160px cells, 200KB
- Still to do: `avatars.js` loader (mirror `dishes.js`), swap emoji placeholders

**Phase 3 — expansion (future items)**
1. Add frames / titles / etc as new `type` values in `PK_SHOP_ITEMS`
2. Shop modal gets type-filter tabs
3. Equip slots per type

---

## ⚠️ Things NOT To Do

- **Do not** load `avatars-sprites.webp` on hub startup — only on shop/profile open
- **Do not** hardcode prices in the DOM — read from `PK_SHOP_ITEMS`
- **Do not** duplicate `pkAddCoins` logic for purchases — use existing helper, pass negative? No — make `pkSpendCoins(n)` returning success/fail
- **Do not** block shop purchases on Firebase — fully offline, localStorage only
- **Do not** introduce a second currency — stick with `pkCoins`
- **Do not** show locked items as locked emojis — render them in grayscale/locked state, revealing what the reward looks like, to motivate purchase

---

## 🎨 Gemini Prompt Template (for when user generates avatars)

```
Pixel art avatar sprite sheet, 16-bit retro game style, 1376×768 resolution,
6 columns × 2 rows grid = 12 cells (all filled with character avatars).
Each cell: top-down slight-3/4 bust shot of a chef character, centered, with
~10% padding. Consistent cute/chibi style across all cells — SAME body
proportions, SAME line weight, SAME color saturation. Vibrant colors,
chunky pixels, subtle dithering. Pure solid #00FF00 chroma-key green
background (between cells and around subjects). NO text, NO borders.

Row 1: (1) classic male chef with white toque and apron, smiling.
       (2) female chef Ana, brown hair in ponytail, chef hat.
       (3) cat chef — orange tabby cat wearing tiny chef hat.
       (4) panda chef — fluffy panda with chef apron and rolling pin.
       (5) wizard chef — purple wizard robe, star-pattern chef hat, glowing spoon.
       (6) robot chef — metallic chrome robot with LED eyes, wearing apron.
Row 2: (7) golden chef — opulent gold-trim chef outfit, crown-topped toque.
       (8-12) EMPTY GREEN CELLS for future avatars.
```

Keeping 5 empty slots in row 2 for expansion.

---

## 📝 Open Questions (ask user before coding)

1. Shop as **modal** (inside hub) or **separate page** (shop.html)?
   Recommendation: modal, matches collection recipe modal pattern.
2. Should hub topbar show equipped avatar (mini), or only profile?
3. Purchase confirmation dialog — yes or instant?
4. Should there be a "new arrivals" / rotation feature, or just static catalog?
5. Refund mechanism? (probably no)

Once user confirms, pick up at Phase 1.