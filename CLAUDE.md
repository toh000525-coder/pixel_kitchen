# Pixel Kitchen — Dev Patterns & Rules

## Git
- Branch: `update.main`
- Push: `git push -u origin update.main`
- GitHub Pages serves from `update.main`

---

## Common Bugs To Never Repeat

### 1. Function-calls-override-state bug
If function A sets a value and then calls function B which sets the **same** value, B always wins.
**Fix:** Pass the value as a parameter to B, never rely on pre-setting state before a call.
```js
// WRONG
function openFromTitle() {
  btn.onclick = () => showPane('paneTitle'); // gets overridden!
  showLeader();
}
function showLeader() { btn.onclick = () => showPane('paneResult'); ... }

// CORRECT
function openFromTitle() { showLeader('paneTitle'); }
function showLeader(returnPane = 'paneResult') { btn.onclick = () => showPane(returnPane); ... }
```

### 2. Invisible text — dark color on dark background
Always verify contrast. `#2a2000` on `#110d00` = invisible.
Minimum readable: `#5a4010` on `#110d00`.

### 3. Game loop must survive errors
`requestAnimationFrame(loop)` must be **outside** the try/catch.
If it's inside the try block, one error kills the loop permanently.
```js
function loop(ts) {
  try { /* all game logic */ }
  catch(e) { console.error('loop err', e); }
  requestAnimationFrame(loop); // ALWAYS runs, even after error
}
```

### 4. Null guard before accessing game config
Any function that reads `cfg` must guard at the top — it's undefined before difficulty is selected.
```js
function drawZones() {
  if (!cfg) return; // required
  ...
}
```

### 5. Mobile scaling — use visualViewport, not innerWidth
`window.innerWidth` is wrong on iOS Safari (ignores keyboard/bars).
```js
const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
```

### 6. transform:scale() doesn't change layout box — use negative margins
```js
const scale = Math.min(vw / W, vh / H);
wrap.style.transform = `scale(${scale})`;
const mh = W * (1 - scale) / 2;
const mv = H * (1 - scale) / 2;
wrap.style.margin = `-${mv}px -${mh}px`;
```

### 7. Portrait detection — CSS media query alone misses tablets
CSS `@media (orientation:portrait)` works but must NOT have `max-width` constraint.
Also add JS fallback using visualViewport:
```js
function checkRotate() {
  const vw = window.visualViewport?.width ?? window.innerWidth;
  const vh = window.visualViewport?.height ?? window.innerHeight;
  document.getElementById('rotateMsg').style.display = (vw < vh) ? 'flex' : '';
}
```

---

## Architecture

### Files
| File | Game |
|---|---|
| `index.html` | Hub (1100×620) |
| `1_dish_detective.html` | Dish Detective |
| `2_pantry_peek.html` | Pantry Peek |
| `3_chop_chop.html` | Chop Chop |
| `4_recipe_rush.html` | Recipe Rush |
| `5_kitchen_chaos.html` | Kitchen Chaos |
| `6_plate_perfect.html` | Plate Perfect |

All game pages use GAME_W=936, GAME_H=564 (see "Game page layout" below).

### Shared modules
| File | Purpose |
|---|---|
| `shared.css` / `shared.js` | Common styles + helpers (coin ticker, SFX, haptics, SW toast) |
| `sprites.js` | 22 pixel-art food sprites (renders from `assets/food-sprites.webp`) |
| `menu.js` | 100-dish recipe dataset |
| `achievements.js` | 25-badge achievement system |
| `sw.js` | Service Worker (bump `CACHE = 'pk-vN'` on any asset change) |
| `manifest.json` / `icon.svg` | PWA install metadata |
| `sprite_preview.html` | Dev-only sprite preview (not linked from hub) |

### Shared localStorage keys
| Key | Value |
|---|---|
| `pkName` | Player display name |
| `pkCoins` | Cumulative coin balance (integer) |

### Coin rates (chop_chop)
PERFECT = +10, GOOD = +5, OK = +2, MISS = +0

### Firebase paths
| Game | Path |
|---|---|
| Pantry Peek | `pantry_peek/scores` |
| Chop Chop | `chop_chop/scores` |
| Recipe Rush | `recipe_rush/scores` |
| Kitchen Chaos | `kitchen_chaos/scores` |
| Plate Perfect | `plate_perfect/scores` |

(Dish Detective has no leaderboard.)

### Hub layout
```
#hubWrap (1100×620, flex column)
├── .hub-topbar (transparent, no border — ★ PIXEL KITCHEN ★ right + 🪙 coins left)
└── .hub-body (flex row, remaining height)
    ├── .hub-left (260px sidebar)
    └── .hub-right (flex:1 game grid)
```

### Game page layout (all 6 games)
```
#gameWrap (GAME_W × GAME_H, flex column)
├── .game-topbar (transparent, no border — ★ PIXEL KITCHEN ★ left + 🪙 coins right)
└── .game-content (flex row)
    ├── canvas
    └── .game-panel (position:relative)
        ├── paneTitle: header + rules + difficulty + [◀ HUB][🏆 RANKS]
        ├── paneGame / paneResult / paneLeader
        └── .btn-mute (position:absolute, bottom:8px right:8px)
```

All game pages use the SAME dimensions so screen size is consistent across pages:
- **Standard: GAME_W=936, GAME_H=564** (all three games)
- `.game-content` must have `justify-content:center; flex:1` so smaller canvases centre
- Hub (index.html) stays at 1100×620 — it's a lobby, different layout

### Topbar style (approved, do not change sizes)
```css
/* Topbar — transparent background, no border */
.game-topbar {
  flex-shrink:0; background:transparent;
  display:flex; align-items:center;
  padding:10px 14px 6px; gap:12px;
}
/* ★ PIXEL KITCHEN ★ brand — 1rem gold glow */
.game-topbar-brand {
  font-size:1rem; letter-spacing:3px;
  color:#f5c842;
  text-shadow:2px 2px #8b3a00, 0 0 20px #f5a700;
  flex:1;
}
/* Coin balance — slightly smaller than brand */
.game-topbar-coins { color:#f5c842; font-size:.72rem; }
.game-topbar-coinlbl { color:#5a4a20; font-size:.42rem; }
```
HTML:
```html
<div class="game-topbar">
  <span class="game-topbar-brand">★ PIXEL KITCHEN ★</span>
  <span class="game-topbar-coins">🪙 <span id="topbarCoins">0</span></span>
  <span class="game-topbar-coinlbl">COINS</span>
</div>
```
Applied to: all game pages + hub topbar. **NOT on splash screen.**

### Game panel standard structure (all games)
Title pane bottom: side-by-side `[◀ HUB]` and `[🏆 RANKS]` buttons using `btn-back` class.
Result pane: PLAY AGAIN → LEADERBOARD → HUB.

### Rotate overlay (all landscape-only game pages)
```css
#rotateMsg { display:none; position:fixed; inset:0; z-index:99999; ... }
@media (orientation:portrait) { #rotateMsg { display:flex; } }
```
Plus JS `checkRotate()` called in `onResize()` + visualViewport listener.
