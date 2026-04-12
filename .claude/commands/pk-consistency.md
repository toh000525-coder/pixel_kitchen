# Pixel Kitchen — Cross-Game Consistency Check

When adding any new feature that touches all 6 games, enforce these rules:

## Rule: All 6 games must use identical patterns

Any code that is repeated across games **must look the same** — same query method, same variable names, same structure. No game-specific workarounds unless the game's architecture genuinely differs.

## Approved patterns

### Find a difficulty button by key
```js
document.querySelector(`.d-btn[onclick*="'${diff}'"]`)?.classList.add('active');
```
Use this in ALL 6 games. Do NOT use `getElementById` with a btnMap for some games.

### Save/restore difficulty memory
```js
// On startGame(diff) or selectDiff(key):
localStorage.setItem('pkDiff_N', diff);
document.querySelectorAll('.d-btn').forEach(b=>b.classList.remove('active'));
document.querySelector(`.d-btn[onclick*="'${diff}'"]`)?.classList.add('active');

// On DOMContentLoaded:
const _sd=localStorage.getItem('pkDiff_N');
if(_sd)document.querySelector(`.d-btn[onclick*="'${_sd}'"]`)?.classList.add('active');
```

### pkName guard (must be first line of startGame/selectDiff)
```js
if(!localStorage.getItem('pkName')){ location.href='index.html'; return; }
```

### pkRecordGame call (result screen)
```js
pkRecordGame({ gameId: N, stars: ..., hardest: diffKey==='chef' });
// Game 3 exception: hardest: diffKey==='hard' (uses easy/medium/hard keys)
```

### Haptic feedback
```js
pkVibrate('fail');   // on miss / wrong answer / lose life
pkVibrate('combo');  // on combo streak (alongside pkShake())
```

## Checklist when adding a new feature to all 6 games

After implementing, verify:
- [ ] All 6 games use the **same method** (querySelector vs getElementById — pick one)
- [ ] All 6 games use the **same variable names**
- [ ] No game has extra logic that others don't (unless architecturally justified)
- [ ] Games 5 & 6 use `selectDiff(key)` entry point; Games 1–4 use `startGame(diff)` directly
