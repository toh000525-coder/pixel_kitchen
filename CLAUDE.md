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
| File | Game | Canvas size | Panel size | GAME_W |
|---|---|---|---|---|
| `index.html` | Hub | — | 1100×620 | — |
| `kitchen_scene.html` | Dish Detective | varies | — | — |
| `pantry_peek.html` | Pantry Peek | — | 936×530 | 936 |
| `chop_chop.html` | Chop Chop | 480×480 | 280×480 | 776 |

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
| Chop Chop | `chop_chop/scores` |
| Pantry Peek | `pantry_peek/scores` |

### Hub layout
```
#hubWrap (1100×620, flex column)
├── .hub-topbar (34px — coin balance bar, spans full width)
└── .hub-body (flex row, remaining height)
    ├── .hub-left (260px sidebar)
    └── .hub-right (flex:1 game grid)
```

### Game panel standard structure (all games)
Title pane bottom: side-by-side `[◀ HUB]` and `[🏆 RANKS]` buttons using `btn-back` class.
Result pane: PLAY AGAIN → LEADERBOARD → HUB.

### Rotate overlay (all landscape-only game pages)
```css
#rotateMsg { display:none; position:fixed; inset:0; z-index:99999; ... }
@media (orientation:portrait) { #rotateMsg { display:flex; } }
```
Plus JS `checkRotate()` called in `onResize()` + visualViewport listener.
