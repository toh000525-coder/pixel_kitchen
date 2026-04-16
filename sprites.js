// sprites.js — Pixel Kitchen ingredient pixel art
// drawPixelSprite(ctx, emoji, cx, cy, size) — draws sprite centered at (cx,cy)
// Each sprite is 16×16; each char maps to a color, '.' = transparent

const PK_SPRITES = {};

(function(){

function reg(emoji, pal, rows){
  PK_SPRITES[emoji] = function(ctx, cx, cy, size){
    const ps = size / 16;
    const ox = cx - size / 2;
    const oy = cy - size / 2;
    for(let r=0;r<16;r++){
      for(let c=0;c<16;c++){
        const col = pal[rows[r][c]];
        if(!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(ox+c*ps, oy+r*ps, Math.ceil(ps)+0.5, Math.ceil(ps)+0.5);
      }
    }
  };
}

// ── BEEF 🥩 ───────────────────────────────────────────────────
reg('🥩',{k:'#221415',a:'#511b22',b:'#892534',c:'#c43b4d',d:'#f9a9ba',e:'#ddc9a2',},[
  '................',
  '..kkkkkkk.......',
  '.kaaaaaaakk.....',
  '.kabbcbbcbbk....',
  '.kaccccccccbk...',
  '.kbcddeededdk...',
  '.kbceeeededdbk..',
  '.kbcddeededdbk..',
  '.kaeeeceededdbk.',
  '.kaeeeceedeeddbk',
  '.kaeeeceeededdbk',
  '.kaeeeeeeeeeedbk',
  '.kaeeeeeceedeedk',
  '.kbbbbbbbbbbbbk.',
  '..kkkkkkkkkkkk..',
  '................',
]);

// ── CHICKEN 🍗 ────────────────────────────────────────────────
reg('🍗',{k:'#221415',a:'#321c17',b:'#5e3223',c:'#8d583e',d:'#b87c5e',e:'#ecc693',f:'#ffffff',},[
  '................',
  '......kkk.......',
  '....kkccckk.....',
  '...kaddddeek....',
  '..kadeeeefek....',
  '..kaeeeeeeeek...',
  '..kceeeeeeek....',
  '..kceeeeeeek....',
  '...kceeeeeek....',
  '....kddeekkk....',
  '.....kkkdkkbk...',
  '.......kdkbkk...',
  '......kkbkk.....',
  '......kkk.......',
  '................',
  '................',
]);

// ── SHRIMP 🦐 ─────────────────────────────────────────────────
reg('🦐',{k:'#130b0b',a:'#3c1a21',b:'#772c2f',c:'#b24740',d:'#eb7a5b',e:'#ffd3a3',},[
  '....kk..........',
  '..kkaakk........',
  '..kbcbcckkkk....',
  '...kbccddeeekk..',
  '...kbceeeeeeedk.',
  '..kbceeeeeddedk.',
  '..kbceeeeeeedk..',
  '...kbceeeeeekk..',
  '...kbccdddeek...',
  '..kbccccckk.....',
  '..kaaacckk......',
  '..kcccbbaak.....',
  '..kcacckk.......',
  '..kkk...........',
  '................',
  '................',
]);

// ── EGG 🥚 ────────────────────────────────────────────────────
reg('🥚',{k:'#1e1511',a:'#483a30',b:'#847e70',c:'#b0aa9b',d:'#d6d0c2',e:'#f7f1e6',f:'#ffffff',},[
  '................',
  '.....kkkkkk.....',
  '...kkedededkk...',
  '..kdedfffffekk..',
  '..keffffffefek..',
  '..kffffffffffee.',
  '..kfffffffffefe.',
  '..kfffffffffffk.',
  '..kfffffffffffk.',
  '..kfffffffffffk.',
  '..kfffffffffffk.',
  '..kefffffffffek.',
  '...kffffffffk...',
  '....kkeddedkk...',
  '......kkkkk.....',
  '................',
]);

// ── FRIED EGG 🍳 ──────────────────────────────────────────────
reg('🍳',{k:'#211815',a:'#2d211a',b:'#544c45',c:'#777169',d:'#9c988f',e:'#fcf8ee',f:'#f8961d',g:'#fcc145',h:'#fee879',},[
  '................',
  '....kkkkkkkk....',
  '..kkeeefeeeeek..',
  '..keehgggfeeee..',
  '..kefghhhgffek..',
  '..kefghhhgffek..',
  '..keehgggfeeee..',
  '..kbeefefefffbk.',
  '..kcbbbbbbbbcbk.',
  '..kkccccccccccc.',
  '....kdddddddddd.',
  '.....kkbbbbbbb..',
  '.......kaaaaa...',
  '........kkkk....',
  '................',
  '................',
]);

// ── BACON 🥓 ──────────────────────────────────────────────────
reg('🥓',{k:'#261817',a:'#492622',b:'#803831',c:'#b15549',d:'#dc7e71',e:'#a37267',f:'#c4a29a',g:'#e7cfc8',},[
  '................',
  'kkkkkkkkkkkkkkkk',
  'kbccdddcccdddcck',
  'kaceffecceffefek',
  'kbceggebcceggeck',
  'kaeffffbeeffffek',
  'kbbbbbbbbbbbbbbk',
  'kadeeeeadeeeeebk',
  'kaceffeeceffeebk',
  'kbceggebcceggeck',
  'kaeffffbeeffffek',
  'kbcddddbcddddcck',
  'kkkkkkkkkkkkkkkk',
  '................',
  '................',
  '................',
]);

// ── LETTUCE 🥬 ────────────────────────────────────────────────
reg('🥬',{k:'#0d160c',a:'#133519',b:'#295b2d',c:'#4a8e45',d:'#7fcd6a',e:'#a1ed93',f:'#ccf8b8',},[
  '................',
  '........kffk....',
  '.......kfefk....',
  '..kk..kededk....',
  '..kaffedededakk.',
  '..kbdffedededck.',
  '...kadffedefdbk.',
  '....kbdffededck.',
  '.....kadffeedbk.',
  '......kbdfeedck.',
  '.......kadfedbk.',
  '........kbfeedc.',
  '.........kadded.',
  '..........kade..',
  '...........ka...',
  '............k...',
]);

// ── TOMATO 🍅 ─────────────────────────────────────────────────
reg('🍅',{k:'#2d100c',a:'#173618',b:'#2e6b21',c:'#690f0d',d:'#a81d11',e:'#d92f1d',f:'#f95a3d',g:'#ff9a6d',},[
  '................',
  '.......kbbk.....',
  '....kkkbafkk....',
  '...kbdccacdk....',
  '..kbdddeddddk...',
  '..kddeeeeeeedk..',
  '..kdefffffeedk..',
  '..kefgggggfeedk.',
  '..kefgggggfeedk.',
  '..kefgggggfeedk.',
  '..kdefffffeedk..',
  '..kadeeeeeaadk..',
  '...kbdddddcck...',
  '....kkkkkkkk....',
  '................',
  '................',
]);

// ── ONION 🧅 ──────────────────────────────────────────────────
reg('🧅',{k:'#2b1a13',a:'#4f3a2c',b:'#8c6c54',c:'#b3937a',d:'#d2bba8',e:'#ebdccd',f:'#f7eddf',g:'#fffaf2',},[
  '................',
  '.......kkk......',
  '......kaffk.....',
  '....kkaffffk....',
  '...kbfffffffk...',
  '...kbffffffgfk..',
  '..kcfffffffgfgk.',
  '..kcffffffggfgk.',
  '..kcfffffgggggk.',
  '..kcfffffgggggk.',
  '..kcffffffgggk..',
  '...kbffffffffk..',
  '....kbffffffk...',
  '.....kaaffaa....',
  '......kkkkk.....',
  '................',
]);

// ── CARROT 🥕 ─────────────────────────────────────────────────
reg('🥕',{k:'#331d0b',a:'#133519',b:'#2e6b21',c:'#59ac3b',d:'#911d04',e:'#ce3c08',f:'#f26514',g:'#ff9c2a',h:'#ffc766',},[
  '................',
  '.....kabakk.....',
  '....kbccccbk....',
  '...kddddddekk...',
  '..kdefefefeefkk.',
  '..kefgggggeeeekk',
  '..kegghhhggeeeek',
  '..keghhhgggeeeek',
  '..kegghhgggeeeek',
  '..kefgggggeeeek.',
  '..kdefefeefeek..',
  '...kddddddeek...',
  '....kdddedeek...',
  '.....kdddeek....',
  '......kkkk......',
  '................',
]);

// ── CHILI 🌶️ ──────────────────────────────────────────────────
reg('🌶️',{k:'#2d100c',a:'#173618',b:'#2e6b21',c:'#690f0d',d:'#a81d11',e:'#d92f1d',f:'#f95a3d',g:'#ff9a6d',},[
  '.........kk.....',
  '........kaakk...',
  '.......kbbakkk..',
  '.......kccddek..',
  '......kedeeeek..',
  '.....kefeeeek...',
  '.....kefffeek...',
  '.....kfgggfek...',
  '....kfggggfek...',
  '....kfggggfek...',
  '...kfgggggfk....',
  '..kfgggggfk.....',
  '..kfggggfk......',
  '...kffefk.......',
  '....kkkk........',
  '................',
]);

// ── GARLIC 🧄 ─────────────────────────────────────────────────
reg('🧄',{k:'#2b1a13',a:'#4f3a2c',b:'#a49080',c:'#ccbcb0',d:'#ebddd3',e:'#f6ede5',f:'#fffaf5',},[
  '.......kkk......',
  '......kaffk.....',
  '....kkaffffk....',
  '...kbffffffek...',
  '..kcffffffffek..',
  '..kcffffffffefk.',
  '..kdddddddddddk.',
  '..keffffffffekk.',
  '..keffffffffek..',
  '..keffffffffek..',
  '..kefffffffffek.',
  '..kdffffffffek..',
  '...kefffffffek..',
  '....kefffffeek..',
  '.....kaaeaa.....',
  '.......kk.......',
]);

// ── BROCCOLI 🥦 ───────────────────────────────────────────────
reg('🥦',{k:'#0d160c',a:'#123a1a',b:'#2a642e',c:'#112f12',d:'#1a4f1a',e:'#2e8a3a',f:'#61b255',g:'#98eb81',},[
  '......kkkkk.....',
  '....kkggfffkk...',
  '..kkggggffffbkk.',
  '..kfggggfffdabk.',
  '..kdfffgedcaabbk',
  '...kabccdabcccb.',
  '...kbcccccbbbb..',
  '....kbcccccc....',
  '.....kbbccc.....',
  '......kdde......',
  '......kdde......',
  '......kdde......',
  '......kdde......',
  '......kdee......',
  '......kbbe......',
  '......kkkk......',
]);

// ── MUSHROOM 🍄 ───────────────────────────────────────────────
// Note: added 'd' (#f04030) which Gemini omitted from palette
reg('🍄',{k:'#2a1811',a:'#690f0d',b:'#a81d11',c:'#d92f1d',d:'#f04030',e:'#f95a3d',f:'#ff9a6d',g:'#fcf8ee',h:'#d6d0c2',i:'#b0aa9b',},[
  '....kkkkkkkk....',
  '...keeeeffffk...',
  '..keddddeeeefk..',
  '..kedeedeeefefk.',
  '..kdeeddeeeeeek.',
  '..keeeeeeeeeeek.',
  '..keeeeeeeeeefk.',
  '..keeeeeeeeeffk.',
  '..kkkkkkkkkkkkk.',
  '......kiig......',
  '......kiig......',
  '......kiig......',
  '......khhg......',
  '......kghhg.....',
  '......kiig......',
  '.......kk.......',
]);

// ── BELL PEPPER 🫑 ────────────────────────────────────────────
reg('🫑',{k:'#0d160c',a:'#133519',b:'#2e6b21',c:'#184013',d:'#1b631d',e:'#288c3a',f:'#4db254',g:'#7fcd6a',},[
  '......kbbk......',
  '....kkkbafkk....',
  '...kbccddecbk...',
  '..kbdeefeeffkk..',
  '..kdefffffffgkk.',
  '..keffggggggfef.',
  '..kfgggggggffek.',
  '..kfgggggggffek.',
  '..kfgggggggffek.',
  '..kfgggggggffek.',
  '..keffggggggff..',
  '..kdeeeeeeeeec..',
  '...kcbbbbbbcc...',
  '....kkkkkkkk....',
  '................',
  '................',
]);

// ── CORN 🌽 ───────────────────────────────────────────────────
reg('🌽',{k:'#331d0b',a:'#133519',b:'#2e6b21',c:'#4a8e45',d:'#533b1e',e:'#7c613c',f:'#ac8d60',g:'#ffc766',h:'#ff9c2a',i:'#ce3c08',},[
  '....kk...kk.....',
  '...kaak.kbbk....',
  '...kaccbaacck...',
  '..kacebfffbbck..',
  '..kaffdefefbek..',
  '..kfdefefefbcek.',
  '..kdeggghhhiiek.',
  '..kebghhhiiiek..',
  '..kebghhhiiiek..',
  '..keghhhiiieek..',
  '..kegghhhiiek...',
  '...kghhhiiek....',
  '...kghhhiie.....',
  '....khhhiik.....',
  '.....khhii......',
  '......kkk.......',
]);

// ── SWEET POTATO 🍠 ───────────────────────────────────────────
reg('🍠',{k:'#2a1811',a:'#321c17',b:'#5e3223',c:'#38101a',d:'#5e1c2a',e:'#8e2d42',f:'#bc4863',g:'#9d8e75',h:'#c2b59e',i:'#e0d6c5',},[
  '.....kkk........',
  '...kkffffk......',
  '..kffffffek.....',
  '..kfeeeeeedk....',
  '..keeeeeddddk...',
  '..kedddccccck...',
  '..kccccbbbabk...',
  '..kbbbaaaaagk...',
  '..kaaaagggghk...',
  '..kgggghhhhiik..',
  '..khhhhiiiiiik..',
  '..kiiiiiiiiiik..',
  '..kiiiiiiiik....',
  '...kiiiiiik.....',
  '....kkkkkk......',
  '................',
]);

// ── CHEESE 🧀 ─────────────────────────────────────────────────
reg('🧀',{k:'#331d0b',a:'#703e1c',b:'#a16a2b',c:'#d69a4e',d:'#f2c070',e:'#fee19b',f:'#fff4c4',},[
  '................',
  '..kkkkkkkkkkkkk.',
  '..kdddddddddddk.',
  '..kdfeeffedfffk.',
  '..kffdeefedffdk.',
  '..kfddeededffdk.',
  '..kfdeeeffeddcc.',
  '..kfdeeefeebdcc.',
  '..kffeedeeebbbk.',
  '..kffffffedbbbk.',
  '..kefeededbbaak.',
  '..kdddddddbaakk.',
  '..kkkkkkkkkaak..',
  '.........kkka...',
  '..........kka...',
  '...........k....',
]);

// ── BUTTER 🧈 ─────────────────────────────────────────────────
reg('🧈',{k:'#331d0b',a:'#703e1c',b:'#a16a2b',c:'#d69a4e',d:'#f2c070',e:'#fee19b',f:'#fff4c4',g:'#ffffff',},[
  '................',
  '.......kkkkk....',
  '.....kkffffee...',
  '...kkffggffee...',
  '..kfffgggffeee..',
  '..kfgggffffeedd.',
  '..kfgggffffeedd.',
  '..kfgggffffeedd.',
  '..kfffggffeeedd.',
  '..kfffeeeeeeddd.',
  '..keeeeeeddddcc.',
  '..kddddddccccba.',
  '..kccccccbbbbak.',
  '..kbbbbbaaaakkk.',
  '...kaaaakkkkk...',
  '.....kkk........',
]);

// ── BREAD 🍞 ──────────────────────────────────────────────────
reg('🍞',{k:'#331d0b',a:'#703e1c',b:'#a16a2b',c:'#d69a4e',d:'#f2c070',e:'#fee19b',f:'#fff4c4',g:'#ffffff',},[
  '....kkkkk.......',
  '..kkfeeeeff.....',
  '..keeeefeeeee...',
  '..keeffefeeeee..',
  '..keeeeeeeeeeee.',
  '..kdddddddddddd.',
  '..kfeefffefeffd.',
  '..kefefeefeffff.',
  '..kfeeeeffefefd.',
  '..kefeffefeeffd.',
  '..kfeeeffeffefd.',
  '..kefeffeefeeff.',
  '..kfeefeffeffed.',
  '..kdddddddddddd.',
  '..kccccccccccck.',
  '...kkkkkkkkkkk..',
]);

// ── OLIVE 🫒 ──────────────────────────────────────────────────
reg('🫒',{k:'#1e1511',a:'#133519',b:'#2e6b21',c:'#4a8e45',d:'#7fcd6a',e:'#fcf8ee',},[
  '.......kkk......',
  '......kbbbk.....',
  '....kkbcbcbk....',
  '...kaccbcbcck...',
  '..kacdccbccbck..',
  '..kabcdccccbcck.',
  '..kbcedcccccbck.',
  '..kacedccbcccck.',
  '..kabcdccccbcck.',
  '..kabcdccbcccck.',
  '..kabccbccbcck..',
  '...kabccbccbk...',
  '....kabbbbak....',
  '.....kaaaaa.....',
  '......kkkk......',
  '................',
]);

// ── DUMPLING 🥟 ───────────────────────────────────────────────
reg('🥟',{k:'#1e1511',a:'#483a30',b:'#847e70',c:'#b0aa9b',d:'#d6d0c2',e:'#f7f1e6',f:'#ffffff',},[
  '................',
  '.......kk.......',
  '.....kkffk......',
  '....kfefefk.....',
  '...kfefefefk....',
  '...kefefefefk...',
  '..kefefefefefk..',
  '..kffffffffffee.',
  '..kffffffffffee.',
  '..kffffffffffek.',
  '..kffffffffffek.',
  '..kffffffffffek.',
  '..kefffffffffek.',
  '...kfffffffffk..',
  '....kkededdedkk.',
  '......kkkkkkk...',
]);

})();

// ── Image grid loading (960×1120, 6 cols × 7 rows, 160px per cell) ────────
let PK_SPRITE_IMAGE = null;
let PK_SPRITE_IMAGE_READY = false;

const PK_SPRITE_GRID_INDEX = {
  // Row 1 (0-5)
  '🥩': 0,   // Beef
  '🍗': 1,   // Chicken
  '🦐': 2,   // Shrimp
  '🥚': 3,   // Egg
  '🍳': 4,   // Fried Egg
  '🥓': 5,   // Bacon
  // Row 2 (6-11)
  '🥬': 6,   // Lettuce
  '🍅': 7,   // Tomato
  '🧅': 8,   // Onion
  '🥕': 9,   // Carrot
  '🌶️': 10,  // Chili
  '🧄': 11,  // Garlic
  // Row 3 (12-17)
  '🥦': 12,  // Broccoli
  '🍄': 13,  // Mushroom
  '🫑': 14,  // Bell Pepper
  '🌽': 15,  // Corn
  '🍠': 16,  // Sweet Potato
  '🧀': 17,  // Cheese
  // Row 4 (18-23)
  '🧈': 18,  // Butter
  '🍞': 19,  // Bread
  '🫒': 20,  // Olive
  '🥟': 21,  // Dumpling
  // Row 5 (24-29) — Future items
  '🍎': 22,  // Apple
  '🍊': 23,  // Orange
  '🍌': 24,  // Banana
  '🍇': 25,  // Grapes
  '🍓': 26,  // Strawberry
  '🍉': 27,  // Watermelon
  // Row 6 (30-35)
  '🐟': 28,  // Fish
  '🦀': 29,  // Crab
  '🥛': 30,  // Milk
  '🧋': 31,  // Yogurt (using bubble tea emoji as stand-in)
  '🍚': 32,  // Rice
  '🍜': 33,  // Noodles
  // Row 7 (36-41)
  '🫛': 34,  // Peas
  '🫘': 35,  // Black Beans
  '🥜': 36,  // Peanuts
  '🍯': 37,  // Honey
  '🧂': 38,  // Salt
  '🍫': 39,  // Chocolate
};

function initImageSprites(callback){
  if(PK_SPRITE_IMAGE_READY){
    if(callback) callback();
    return;
  }

  // Try WebP first (much smaller), fallback to PNG
  const paths = [
    './assets/food-sprites.webp',
    '/assets/food-sprites.webp',
    'assets/food-sprites.webp',
    './assets/food-sprites.png',
    '/assets/food-sprites.png',
    'assets/food-sprites.png'
  ];
  let currentIndex = 0;

  function tryLoad(index){
    if(index >= paths.length){
      console.error('✗ All sprite grid image paths failed');
      PK_SPRITE_IMAGE = null;
      PK_SPRITE_IMAGE_READY = false;
      if(callback) callback();
      return;
    }

    const img = new Image();
    const path = paths[index];

    img.onload = function(){
      PK_SPRITE_IMAGE = img;
      PK_SPRITE_IMAGE_READY = true;
      console.log('✓ Sprite grid image loaded from:', path);
      if(callback) callback();
    };

    img.onerror = function(){
      console.warn(`✗ Failed to load from ${path}, trying next...`);
      tryLoad(index + 1);
    };

    img.src = path;
  }

  tryLoad(0);
}

function drawSpriteFromGrid(ctx, emoji, cx, cy, size){
  if(!PK_SPRITE_IMAGE_READY || !PK_SPRITE_IMAGE) return false;

  const gridIndex = PK_SPRITE_GRID_INDEX[emoji];
  if(gridIndex === undefined) return false;

  const cols = 6;
  const cellSize = 160;
  const gridCol = gridIndex % cols;
  const gridRow = Math.floor(gridIndex / cols);

  const sx = gridCol * cellSize;
  const sy = gridRow * cellSize;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(size / cellSize, size / cellSize);
  ctx.translate(-cellSize / 2, -cellSize / 2);
  ctx.drawImage(PK_SPRITE_IMAGE, sx, sy, cellSize, cellSize, 0, 0, cellSize, cellSize);
  ctx.restore();

  return true;
}

// Public API
function drawPixelSprite(ctx, emoji, cx, cy, size){
  // Try grid image first (now using optimized WebP format)
  if(PK_SPRITE_IMAGE_READY && drawSpriteFromGrid(ctx, emoji, cx, cy, size)) {
    return;
  }

  // Fallback to hand-drawn pixel art
  const fn = PK_SPRITES[emoji];
  if(fn){
    fn(ctx, cx, cy, size);
  } else {
    // Final fallback: system emoji
    ctx.save();
    ctx.font = `${Math.round(size * 0.82)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, cx, cy);
    ctx.restore();
  }
}

// Initialize grid image loading
if(typeof initImageSprites === 'function') {
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageSprites);
  } else {
    initImageSprites();
  }
}
