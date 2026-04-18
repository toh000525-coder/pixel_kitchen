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
Keep generic so future types plug in:
```js
const PK_SHOP_ITEMS = [
  { id:'chef_classic', type:'avatar', name:'CLASSIC CHEF',   price:0,   spriteIdx:0, default:true },
  { id:'chef_female',  type:'avatar', name:'CHEF ANA',       price:0,   spriteIdx:1, default:true },
  { id:'chef_cat',     type:'avatar', name:'CAT CHEF',       price:50,  spriteIdx:2 },
  { id:'chef_panda',   type:'avatar', name:'PANDA CHEF',     price:100, spriteIdx:3 },
  { id:'chef_wizard',  type:'avatar', name:'WIZARD CHEF',    price:150, spriteIdx:4 },
  { id:'chef_robot',   type:'avatar', name:'ROBOT CHEF',     price:200, spriteIdx:5 },
  { id:'chef_golden',  type:'avatar', name:'GOLDEN CHEF',    price:500, spriteIdx:6 },
  // future: { id:'frame_gold', type:'frame', ... }
  // future: { id:'title_mvp',  type:'title', ... }
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

**Phase 2 — art**
1. User generates avatars sprite sheet via Gemini (~1376×768, grid layout matching `IMG_4589.png` style, chroma-key `#00FF00` background)
2. Process with `build_dishes_sprite.py`-style script → `avatars-sprites.webp`
3. `avatars.js` loader (mirrors `dishes.js`)
4. Swap emoji placeholders for sprite rendering

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