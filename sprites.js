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

// ── CARROT 🥕 ─────────────────────────────────────────────
reg('🥕',{
  k:'#0d0400', a:'#194d06', b:'#3a8c14', c:'#60cc28',
  D:'#b85200', E:'#e87800', F:'#ffaa44',
},[
  '........k.......',
  '.....kakak......',
  '....kbbcbbk.....',
  '.....kbbbk......',
  '......kbk.......',
  '.....kFFEk......',
  '....kFFEEDk.....',
  '....kFFEEDk.....',
  '.....kFEEDk.....',
  '.....kFEDDk.....',
  '......kEDk......',
  '......kEDk......',
  '.......kDk......',
  '.......kDk......',
  '........k.......',
  '................',
]);

// ── TOMATO 🍅 ─────────────────────────────────────────────
reg('🍅',{
  k:'#0d0000', a:'#1a4a06', b:'#3a8810', c:'#5ec422',
  R:'#8b0000', S:'#cc1100', T:'#ff3322', U:'#ff7766',
},[
  '.......k........',
  '......kbk.......',
  '.....kbbck......',
  '......kbk.......',
  '....kSSSSSk.....',
  '...kSTTTTTSk....',
  '..kSTUTTTTSSk...',
  '..kSTUTTTTSSk...',
  '..kSSTTTTTSk....',
  '..kSSSTTTSk.....',
  '...kSSSSSk......',
  '....kSSSk.......',
  '.....kSSk.......',
  '......kk........',
  '................',
  '................',
]);

// ── BROCCOLI 🥦 ───────────────────────────────────────────
reg('🥦',{
  k:'#0a1a02', b:'#2d6612', c:'#4a9e22', d:'#66cc33',
  S:'#3a4a10', T:'#5a7a20',
},[
  '................',
  '....kddddk......',
  '...kdddddddk....',
  '...kdcddcdk.....',
  '..kddkdddkddk...',
  '..kddddddddddk..',
  '...kddkddkddk...',
  '....kkTTTkk.....',
  '.....kTTTTk.....',
  '......kTTk......',
  '......kTTk......',
  '......kTTk......',
  '.......kTk......',
  '.......kk.......',
  '................',
  '................',
]);

// ── MUSHROOM 🍄 ───────────────────────────────────────────
reg('🍄',{
  k:'#0d0500', b:'#8b3200', c:'#cc5500', d:'#e87a22',
  W:'#f0e8d0', X:'#c8b890', Y:'#a09070',
},[
  '................',
  '.....kcccck.....',
  '...kccbbbcck....',
  '..kccdbbbbbcck..',
  '..kccdbbbbbcck..',
  '..kcccbbbbbcck..',
  '..kccccccccck...',
  '.....kWWWk......',
  '....kWWWWWk.....',
  '....kWXWWWk.....',
  '.....kWWWk......',
  '.....kYYYk......',
  '....kYYYYYk.....',
  '.....kYYYk......',
  '................',
  '................',
]);

// ── CORN 🌽 ───────────────────────────────────────────────
reg('🌽',{
  k:'#0d0800', a:'#1a4a06', b:'#2d7a14', c:'#5ec422',
  Y:'#8b6600', Z:'#e8c000', W:'#ffdc3a', X:'#fff488',
},[
  '......kck.......',
  '.....kccck......',
  '....kcbbcck.....',
  '...kcbbbccck....',
  '...kZWXWZWZk....',
  '..kZXWWZZWWZk...',
  '..kZXWWZZWWZk...',
  '..kZZWWZZWWZk...',
  '..kZZWWZZWWZk...',
  '..kZZZZZZZZZk...',
  '...kZZZZZZZk....',
  '....kZZZZZk.....',
  '.....kYYYk......',
  '......kYk.......',
  '................',
  '................',
]);

// ── CHILI 🌶️ ──────────────────────────────────────────────
reg('🌶️',{
  k:'#0d0000', a:'#1a4a06', b:'#3a8810',
  R:'#6b0000', S:'#aa0000', T:'#dd2200', U:'#ff4422', V:'#ff8877',
},[
  '....kbk.........',
  '....kbk.........',
  '.....kak........',
  '......kTTk......',
  '.....kTUTTk.....',
  '....kTUVTTTk....',
  '....kTUVTTTk....',
  '.....kTTTTk.....',
  '.....kSTTSk.....',
  '......kSSk......',
  '......kSSk......',
  '.......kSk......',
  '.......kRk......',
  '........k.......',
  '................',
  '................',
]);

// ── LETTUCE 🥬 ────────────────────────────────────────────
reg('🥬',{
  k:'#081a02', a:'#1a4208', b:'#2d7014', c:'#48a822', d:'#6acc33', e:'#8aee55',
},[
  '................',
  '.....kdddddk....',
  '...kdddddddddk..',
  '..kdddcdddddddk.',
  '..kdddcccdddddk.',
  '.kddddcddcdddddk',
  '.kdddddddddddddk',
  '.kdddddddddddddk',
  '..kdddddddddddk.',
  '..kdddddddddddk.',
  '...kddddddddddk.',
  '....kbdddddbk...',
  '.....kbbbbk.....',
  '......kbbk......',
  '................',
  '................',
]);

// ── ONION 🧅 ──────────────────────────────────────────────
reg('🧅',{
  k:'#0d0800', b:'#7a4010', c:'#c87830', d:'#e8a855', e:'#f5cc88',
  L:'#f0eecc', M:'#c8c690',
},[
  '................',
  '.....kdek.......',
  '....kdeeeekk....',
  '...kdeeeeLMdk...',
  '..kdeLLLMLMddk..',
  '..kdedLLMLLddk..',
  '..kdedLMLLLddk..',
  '..kdecddLLddck..',
  '..kdecddddddck..',
  '..kdecccddcck...',
  '...kdcccccck....',
  '....kdcccck.....',
  '....kbcbbk......',
  '.....kbbk.......',
  '......kk........',
  '................',
]);

// ── EGG 🥚 ────────────────────────────────────────────────
reg('🥚',{
  k:'#0d0a00', W:'#f5f0e0', X:'#ddd8c0', Y:'#b8b090',
},[
  '................',
  '......kWk.......',
  '....kWWWWk......',
  '...kWXWWWWk.....',
  '..kWXWWWWWWk....',
  '..kWWWWWWWWk....',
  '..kWWWWWWWXk....',
  '..kWWWWWWXYk....',
  '..kXWWWWXYYk....',
  '..kXXWWXYYYk....',
  '...kXXXYYYk.....',
  '....kXXYYk......',
  '.....kXYk.......',
  '......kk........',
  '................',
  '................',
]);

// ── FRIED EGG 🍳 ──────────────────────────────────────────
reg('🍳',{
  k:'#0d0a00', W:'#f5f0e0', X:'#ddd8c0',
  Y:'#cc9900', Z:'#ffcc00', V:'#ffee88',
},[
  '................',
  '................',
  '...kXXXXXXk.....',
  '..kXWWWWWWXk....',
  '..kXWWZZWWXk....',
  '..kXWZVVZWXk....',
  '..kXWZVVZWXk....',
  '..kXWWZZWWXk....',
  '..kXWWWWWWXk....',
  '...kXXWWXXk.....',
  '....kXXXXk......',
  '................',
  '................',
  '................',
  '................',
  '................',
]);

// ── BEEF 🥩 ───────────────────────────────────────────────
reg('🥩',{
  k:'#0d0000', b:'#8b1818', c:'#cc2828', d:'#ee4444',
  W:'#f0e0d0', X:'#c8a890',
},[
  '................',
  '..kbbk.....kbbk.',
  '..kccbbkkbbcck..',
  '..kccccccccck...',
  '...kcdddddcck...',
  '...kcddeeddck...',
  '...kcddeeddck...',
  '...kWXddddck....',
  '...kWXddddck....',
  '....kXXdddck....',
  '....kXXddck.....',
  '.....kXXkbk.....',
  '.....kbbbbk.....',
  '......kbbk......',
  '................',
  '................',
]);

// ── CHICKEN 🍗 ────────────────────────────────────────────
reg('🍗',{
  k:'#0d0500', b:'#8b5000', c:'#cc8822', d:'#e8aa44', e:'#f5cc88',
  W:'#f0f0f0', X:'#d0d0d0',
},[
  '................',
  '....kWWk........',
  '...kWWWWk.......',
  '...kXWWWk.......',
  '....kXXk........',
  '.....kek........',
  '....keeek.......',
  '...keeeeeek.....',
  '...kedddeek.....',
  '...kedddeek.....',
  '....keddek......',
  '....kcddck......',
  '.....kbbk.......',
  '......kk........',
  '................',
  '................',
]);

// ── SHRIMP 🦐 ─────────────────────────────────────────────
reg('🦐',{
  k:'#0d0000', b:'#8b3030', c:'#cc5544', d:'#ee8877', e:'#ffbbaa',
  W:'#f0e0d0',
},[
  '........kck.....',
  '.......kcdck....',
  '......kcdddck...',
  '.....kcdddddck..',
  '....kcddddddck..',
  '...kcdddddddck..',
  '..kcdddddddck...',
  '..kcdddddcck....',
  '...kcdddck......',
  '....kcdck.......',
  '.....kck........',
  '....kWWk........',
  '...kWWWk........',
  '....kWk.........',
  '................',
  '................',
]);

// ── BACON 🥓 ──────────────────────────────────────────────
reg('🥓',{
  k:'#0d0000', P:'#cc4466', Q:'#ee6688', R:'#ff99aa',
  W:'#f5e0cc', X:'#e0c0a0',
},[
  '................',
  '..kPPQQRRWWXk...',
  '..kPQQRRWWXXk...',
  '..kQQRRWWXXXk...',
  '..kPPQQRRWWXk...',
  '..kPQQRRWWXXk...',
  '..kQQRRWWXXXk...',
  '..kPPQQRRWWXk...',
  '..kPQQRRWWXXk...',
  '..kQQRRWWXXXk...',
  '..kPPQQRRWWXk...',
  '..kPQQRRWWXXk...',
  '..kQQRRWWXXXk...',
  '...kkkkkkkkkk...',
  '................',
  '................',
]);

// ── GARLIC 🧄 ─────────────────────────────────────────────
reg('🧄',{
  k:'#0d0a0d', b:'#5a3a6a', c:'#9a8aaa',
  W:'#f0eef0', X:'#d0ccd8', Y:'#b0a8c0', G:'#3a7010',
},[
  '................',
  '.......kGk......',
  '......kGGk......',
  '......kGGk......',
  '.....kWWWWk.....',
  '....kWXWWXWk....',
  '...kWXWbWXWWk...',
  '...kWXbbbXWk....',
  '...kWXbbbXWk....',
  '...kWWXbXWWk....',
  '....kWXXXWk.....',
  '....kWWWWWk.....',
  '.....kXXXk......',
  '......kYk.......',
  '.......kk.......',
  '................',
]);

// ── BELL PEPPER 🫑 ────────────────────────────────────────
reg('🫑',{
  k:'#0a1a02', b:'#2d7a14', c:'#44aa22', d:'#66cc33', e:'#88ee55',
  S:'#3a6610',
},[
  '......kSk.......',
  '.....kSSk.......',
  '...kSddSk.......',
  '...kdddddk......',
  '..kdeeeddddk....',
  '.kdeeedddddddk..',
  '.kdeeedddddddk..',
  '.kdeeeddddddk...',
  '.kdddddddddk....',
  '.kddddddddddk...',
  '..kdddddddddk...',
  '...kdddddddk....',
  '....kddddddk....',
  '.....kddddak....',
  '......kkkkk.....',
  '................',
]);

// ── SWEET POTATO 🍠 ───────────────────────────────────────
reg('🍠',{
  k:'#0d0500', b:'#8b2a00', c:'#cc5500', d:'#e87a22', e:'#f5aa66',
  G:'#2d6610',
},[
  '................',
  '......kGk.......',
  '.....kGGk.......',
  '....kGGGk.......',
  '....keeedddk....',
  '...keeeedddddk..',
  '..keeeeeddddddk.',
  '..keeeeedddddk..',
  '..keeeddddddk...',
  '..keeddddddk....',
  '...kedddddk.....',
  '....kedddk......',
  '.....kddk.......',
  '......kk........',
  '................',
  '................',
]);

// ── CHEESE 🧀 ─────────────────────────────────────────────
reg('🧀',{
  k:'#0d0800', H:'#cc9900', Z:'#e8c000', W:'#ffdc3a', X:'#fff488',
},[
  '................',
  '.kWWWWWWWWWWWk..',
  '.kXWWWXXWWWWHk..',
  '.kXWWX..XWWWHk..',
  '.kXWX....XWWHk..',
  '.kXX......XXHk..',
  '.kZZZZZZZZZZHk..',
  '.kZZX..XZZZZHk..',
  '.kZZX..XZZZZHk..',
  '.kZZZZZZZZZZHk..',
  '.kZHHHHHHHHHHk..',
  '..kkkkkkkkkkk...',
  '................',
  '................',
  '................',
  '................',
]);

// ── BREAD 🍞 ──────────────────────────────────────────────
reg('🍞',{
  k:'#0d0500', b:'#8b4400', c:'#c87030', d:'#e8aa66', e:'#f5cc99', f:'#ffe0b0',
},[
  '................',
  '....kffk........',
  '...kfeeefk......',
  '..kfeeeeeefk....',
  '..kfeeeeeeefk...',
  '..kfeeeeeeefk...',
  '..kfeeeeeefk....',
  '..kfddddddfk....',
  '..kfddddddddfk..',
  '..kfddddddddfk..',
  '..kddddddddfk...',
  '..kdddddddddk...',
  '..kccccccccck...',
  '...kbbbbbbbk....',
  '....kkkkkkk.....',
  '................',
]);

// ── BUTTER 🧈 ─────────────────────────────────────────────
reg('🧈',{
  k:'#0d0800', H:'#cc9900', Z:'#e8c000', W:'#ffdc3a', X:'#fff488',
},[
  '................',
  '...kXXXXXXXk....',
  '..kXXWWWWXXXk...',
  '..kXWWWWWWXXk...',
  '..kXWWWWWWXXk...',
  '..kXWWWWWWXXk...',
  '..kXWWWWWWXXk...',
  '..kXXWWWWXXXk...',
  '..kZZZZZZZZZk...',
  '..kZZZZZZZZZk...',
  '..kHHZZZZHHHk...',
  '...kHHHHHHHk....',
  '....kkkkkkk.....',
  '................',
  '................',
  '................',
]);

// ── OLIVE 🫒 ──────────────────────────────────────────────
reg('🫒',{
  k:'#0a1008', b:'#2d5010', c:'#447820', d:'#6aa030',
  G:'#2d5010', e:'#88cc44',
},[
  '................',
  '......kGk.......',
  '.....kGGk.......',
  '....kcdddck.....',
  '...kcdddddck....',
  '..kcdddddddck...',
  '..kcdddddddck...',
  '..kbdddddddck...',
  '..kbbddddddck...',
  '..kbbbdddcck....',
  '...kbbbdcck.....',
  '....kbbbck......',
  '.....kbbk.......',
  '......kk........',
  '................',
  '................',
]);

// ── DUMPLING 🥟 ───────────────────────────────────────────
reg('🥟',{
  k:'#0d0a00', W:'#f5f0e0', X:'#e0d8c0', Y:'#c0b898', Z:'#a09070',
},[
  '................',
  '................',
  '.....kWWWk......',
  '...kWWWWWWWk....',
  '..kWXWWWWXXWk...',
  '..kWXWWWWXXWk...',
  '..kWWWWWWWWWk...',
  '..kYZZZZZZZk....',
  '...kYYYYYYk.....',
  '....kZZZZk......',
  '....kYYYYk......',
  '.....kYYk.......',
  '......kk........',
  '................',
  '................',
  '................',
]);

})();

// Public API
function drawPixelSprite(ctx, emoji, cx, cy, size){
  const fn = PK_SPRITES[emoji];
  if(fn){
    fn(ctx, cx, cy, size);
  } else {
    // Fallback: system emoji
    ctx.save();
    ctx.font = `${Math.round(size * 0.82)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, cx, cy);
    ctx.restore();
  }
}
