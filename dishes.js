// ═══════════════════════════════════════════════════════════════
//  dishes.js — Collection book sprite loader
//  Loads assets/dishes-sprites.webp (960×800, 6 cols × 5 rows, 160px cells).
//  Only loaded on collection.html and recipe.html — game pages don't pull this.
// ═══════════════════════════════════════════════════════════════

// Mapping: dish id → grid index (0-based, row-major)
// Matches the order in IMG_4589.png layout.
const PK_DISH_SPRITE_INDEX = {
  // Row 1
  'omelette':     0,
  'steak':        1,
  'ratatouille':  2,
  'pizza':        3,
  'carbonara':    4,
  'risotto':      5,
  // Row 2
  'burger':       6,
  'blt':          7,
  'caesar':       8,
  'ramen':        9,
  'teriyaki':     10,
  'katsu_curry':  11,
  // Row 3
  'bibimbap':     12,
  'bulgogi':      13,
  'kung_pao':     14,
  'mapo_tofu':    15,
  'dan_dan':      16,
  'pad_thai':     17,
  // Row 4
  'green_curry':  18,
  'pho':          19,
  'curry':        20,
  'biryani':      21,
  'tacos':        22,
  'enchiladas':   23,
  // Row 5
  'paella':       24,
  'greek_salad':  25,
  'shakshuka':    26,
};

const PK_DISH_SHEET_COLS = 6;
const PK_DISH_SHEET_CELL = 160;

let PK_DISH_IMAGE = null;
let PK_DISH_IMAGE_READY = false;
let PK_DISH_IMAGE_LOADING = null;

function pkLoadDishImage() {
  if (PK_DISH_IMAGE_READY) return Promise.resolve(PK_DISH_IMAGE);
  if (PK_DISH_IMAGE_LOADING) return PK_DISH_IMAGE_LOADING;
  PK_DISH_IMAGE_LOADING = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      PK_DISH_IMAGE = img;
      PK_DISH_IMAGE_READY = true;
      resolve(img);
    };
    img.onerror = () => reject(new Error('dishes-sprites.webp failed to load'));
    img.src = 'assets/dishes-sprites.webp';
  });
  return PK_DISH_IMAGE_LOADING;
}

// Draw dish sprite into a canvas at target size. Returns false if not ready.
function pkDrawDishSprite(ctx, dishId, dx, dy, size) {
  if (!PK_DISH_IMAGE_READY) return false;
  const idx = PK_DISH_SPRITE_INDEX[dishId];
  if (idx === undefined) return false;
  const col = idx % PK_DISH_SHEET_COLS;
  const row = Math.floor(idx / PK_DISH_SHEET_COLS);
  const sx = col * PK_DISH_SHEET_CELL;
  const sy = row * PK_DISH_SHEET_CELL;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(PK_DISH_IMAGE, sx, sy, PK_DISH_SHEET_CELL, PK_DISH_SHEET_CELL,
                dx, dy, size, size);
  return true;
}

// Returns true if a dish has a sprite available in the sheet.
function pkHasDishSprite(dishId) {
  return PK_DISH_SPRITE_INDEX[dishId] !== undefined;
}
