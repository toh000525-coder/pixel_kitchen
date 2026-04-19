# Pixel Kitchen — TODO

## Next week: Centralize game text into `strings.js` master list

**Goal:** Extract hardcoded user-facing text from all game files into a single `strings.js` (modeled after `menu.js`), so future copy changes only require editing the master list — not touching positioned layout code.

### Audit summary (~834 strings total)
- **Static HTML:** 614 strings (game titles, rules, buttons, difficulty labels, result pages)
- **Canvas text:** 32 strings (`"PERFECT!"`, `"Good!"`, `"MISS!"` feedback)
- **Dynamic/interpolated:** 188 strings (score, timer, coin display)

High duplication — e.g. `"WELL DONE!"` appears 9× across files.

### Plan (2 phases)

**Phase 1 — static HTML (614 strings, ~74% of work, biggest ROI)**
1. Create `strings.js` exporting nested `TEXT` object grouped by game
2. Replace hardcoded text in HTML with `<span data-text="game.key"></span>`
3. On page load, run `document.querySelectorAll('[data-text]')` to fill from `TEXT`
4. **Pilot on `3_chop_chop.html` first**, verify, then roll out to other 6

**Phase 2 — canvas + dynamic strings (220 strings)**
- Canvas `ctx.fillText()` calls → read from `TEXT.xxx` directly in JS
- Interpolated strings → convert to functions: `TEXT.result.score(n)` returning formatted string

### Gotchas
- Bump `sw.js` `CACHE = 'pk-vN'` after changes (users get stale text otherwise)
- Don't miss canvas-drawn text (can't use `data-text` attribute)
- Keep consistent naming across games (e.g. one `common.leaderboard` not "LEADERBOARD" vs "RANKS")

### Files to touch
`0_hub.html`, `1_dish_detective.html`, `2_pantry_peek.html`, `3_chop_chop.html`, `4_recipe_rush.html`, `5_plate_perfect.html`, `6_kitchen_chaos.html`, `shared.js`, `sw.js` (cache bump), new `strings.js`

Estimated time: 2–3 hours.
