// ═══════════════════════════════════════════════════════════════
//  menu.js — Pixel Kitchen  Shared Menu Data  v1.0
//  Used by all 6 games as a single source of truth.
// ═══════════════════════════════════════════════════════════════

// ── INGREDIENTS ─────────────────────────────────────────────────
// Each entry: emoji, name, category
// Games use this for: card pools (Pantry Peek), conveyor belt
// (Kitchen Chaos), chop targets (Chop Chop), decoy answers
// (Dish Detective), etc.

const PK_INGREDIENTS = [
  // Proteins
  {emoji:'🥩', name:'BEEF',        cat:'protein'},
  {emoji:'🍗', name:'CHICKEN',     cat:'protein'},
  {emoji:'🦐', name:'SHRIMP',      cat:'protein'},
  {emoji:'🥚', name:'EGG',         cat:'protein'},
  {emoji:'🍳', name:'FRIED EGG',   cat:'protein'},
  {emoji:'🥓', name:'BACON',       cat:'protein'},
  // Vegetables
  {emoji:'🥬', name:'LETTUCE',     cat:'veggie'},
  {emoji:'🍅', name:'TOMATO',      cat:'veggie'},
  {emoji:'🧅', name:'ONION',       cat:'veggie'},
  {emoji:'🥕', name:'CARROT',      cat:'veggie'},
  {emoji:'🌶️',name:'CHILI',       cat:'veggie'},
  {emoji:'🧄', name:'GARLIC',      cat:'veggie'},
  {emoji:'🥦', name:'BROCCOLI',    cat:'veggie'},
  {emoji:'🍄', name:'MUSHROOM',    cat:'veggie'},
  {emoji:'🫑', name:'BELL PEPPER', cat:'veggie'},
  {emoji:'🌽', name:'CORN',        cat:'veggie'},
  {emoji:'🍠', name:'SWEET POTATO',cat:'veggie'},
  // Dairy & Fats
  {emoji:'🧀', name:'CHEESE',      cat:'dairy'},
  {emoji:'🧈', name:'BUTTER',      cat:'dairy'},
  // Carbs
  {emoji:'🍞', name:'BREAD',       cat:'carb'},
  // Other
  {emoji:'🫒', name:'OLIVE',       cat:'other'},
  {emoji:'🥟', name:'DUMPLING',    cat:'other'},
  // ── Phase B additions ─────────────────────────────────────────
  // Carbs
  {emoji:'🍚', name:'RICE',        cat:'carb'},
  {emoji:'🍜', name:'NOODLES',     cat:'carb'},
  {emoji:'🥔', name:'POTATO',      cat:'carb'},
  // Proteins
  {emoji:'🐟', name:'FISH',        cat:'protein'},
  {emoji:'🐷', name:'PORK',        cat:'protein'},
  {emoji:'🧊', name:'TOFU',        cat:'protein'},
  // Veggies
  {emoji:'🍆', name:'EGGPLANT',    cat:'veggie'},
  {emoji:'🥒', name:'CUCUMBER',    cat:'veggie'},
  // Herbs & aromatics
  {emoji:'🫚', name:'GINGER',      cat:'veggie'},
  {emoji:'🌿', name:'BASIL',       cat:'veggie'},
];

// ── DISHES ──────────────────────────────────────────────────────
// Each dish:
//   id       — unique key
//   name     — display name (UPPERCASE)
//   emoji    — dish icon shown in UI
//   cuisine  — origin cuisine
//   items    — [{emoji, zone}]
//              • emoji = ingredient used
//              • zone  = position on plate (Plate Perfect)
//                        also defines the canonical ingredient order
//                        (Recipe Rush, Kitchen Chaos use items.map(i=>i.emoji))
//
// Zone grid reference:
//   TOP-L  TOP   TOP-R
//   LEFT  CENTER RIGHT
//   BOT-L BOTTOM BOT-R

const PK_DISHES = [

  // ════════════════════════════════════════════════
  //  3-INGREDIENT  (APPRENTI difficulty)
  // ════════════════════════════════════════════════

  // — French —
  {id:'omelette',      name:'OMELETTE',       emoji:'🍳', cuisine:'French',
   items:[{emoji:'🍳',zone:'CENTER'},{emoji:'🧀',zone:'LEFT'  },{emoji:'🥓',zone:'RIGHT'  }]},
  {id:'garlic_bread',  name:'GARLIC BREAD',   emoji:'🥖', cuisine:'French',
   items:[{emoji:'🍞',zone:'CENTER'},{emoji:'🧄',zone:'TOP-L' },{emoji:'🧈',zone:'TOP-R'  }]},

  // — Italian —
  {id:'caprese',       name:'CAPRESE',        emoji:'🍅', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'LEFT'  },{emoji:'🧀',zone:'CENTER'},{emoji:'🫒',zone:'RIGHT'  }]},
  {id:'bruschetta',    name:'BRUSCHETTA',     emoji:'🫒', cuisine:'Italian',
   items:[{emoji:'🍞',zone:'TOP'   },{emoji:'🍅',zone:'CENTER'},{emoji:'🧄',zone:'BOTTOM' }]},

  // — American —
  {id:'grilled_cheese',name:'GRILLED CHEESE', emoji:'🥪', cuisine:'American',
   items:[{emoji:'🍞',zone:'LEFT'  },{emoji:'🧀',zone:'CENTER'},{emoji:'🧈',zone:'RIGHT'  }]},

  // — Mediterranean —
  {id:'soup',          name:'SOUP',           emoji:'🍲', cuisine:'Mediterranean',
   items:[{emoji:'🧅',zone:'LEFT'  },{emoji:'🥕',zone:'CENTER'},{emoji:'🍄',zone:'RIGHT'  }]},
  {id:'salad',         name:'SALAD',          emoji:'🥗', cuisine:'Mediterranean',
   items:[{emoji:'🥬',zone:'TOP'   },{emoji:'🍅',zone:'BOT-L' },{emoji:'🧅',zone:'BOT-R'  }]},

  // — Middle Eastern —
  {id:'shakshuka',     name:'SHAKSHUKA',      emoji:'🍳', cuisine:'Middle Eastern',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🍳',zone:'CENTER'},{emoji:'🌶️',zone:'BOTTOM' }]},
  {id:'menemen',       name:'MENEMEN',        emoji:'🍳', cuisine:'Turkish',
   items:[{emoji:'🍅',zone:'LEFT'  },{emoji:'🫑',zone:'CENTER'},{emoji:'🌶️',zone:'RIGHT'  }]},

  // — Spanish —
  {id:'tortilla_esp',  name:'TORTILLA',       emoji:'🍳', cuisine:'Spanish',
   items:[{emoji:'🥚',zone:'TOP'   },{emoji:'🧅',zone:'CENTER'},{emoji:'🍠',zone:'BOTTOM' }]},

  // — Japanese —
  {id:'miso_soup',     name:'MISO SOUP',      emoji:'🍵', cuisine:'Japanese',
   items:[{emoji:'🍄',zone:'LEFT'  },{emoji:'🧅',zone:'CENTER'},{emoji:'🥬',zone:'RIGHT'  }]},
  {id:'yakitori',      name:'YAKITORI',       emoji:'🍡', cuisine:'Japanese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT'  }]},

  // — Korean —
  {id:'jook',          name:'CONGEE',         emoji:'🍚', cuisine:'Korean',
   items:[{emoji:'🍚',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🫚',zone:'RIGHT'  }]},

  // — Chinese —
  {id:'egg_drop',      name:'EGG DROP SOUP',  emoji:'🍲', cuisine:'Chinese',
   items:[{emoji:'🥚',zone:'CENTER'},{emoji:'🧅',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT'  }]},

  // — Thai —
  {id:'larb',          name:'LARB',           emoji:'🥗', cuisine:'Thai',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT'  }]},

  // — Vietnamese —
  {id:'goi_cuon',      name:'SPRING ROLLS',   emoji:'🥟', cuisine:'Vietnamese',
   items:[{emoji:'🦐',zone:'CENTER'},{emoji:'🥬',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT'  }]},

  // — Indian —
  {id:'dal',           name:'DAL',            emoji:'🍲', cuisine:'Indian',
   items:[{emoji:'🧅',zone:'TOP'   },{emoji:'🌶️',zone:'CENTER'},{emoji:'🧄',zone:'BOTTOM' }]},

  // — Mexican —
  {id:'quesa_s',       name:'QUESADILLA',     emoji:'🫓', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧀',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT'  }]},

  // — French —
  {id:'steak',         name:'STEAK',          emoji:'🥩', cuisine:'French',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧈',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT'  }]},

  // — American —
  {id:'scrambled_egg', name:'SCRAMBLED EGG',  emoji:'🍳', cuisine:'American',
   items:[{emoji:'🥚',zone:'CENTER'},{emoji:'🧈',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT'  }]},
  {id:'bacon_eggs',    name:'BACON & EGGS',   emoji:'🥓', cuisine:'American',
   items:[{emoji:'🥓',zone:'LEFT'  },{emoji:'🍳',zone:'CENTER'},{emoji:'🍅',zone:'RIGHT'  }]},
  {id:'corn_soup',     name:'CORN SOUP',      emoji:'🌽', cuisine:'American',
   items:[{emoji:'🌽',zone:'CENTER'},{emoji:'🧅',zone:'LEFT'  },{emoji:'🧈',zone:'RIGHT'  }]},
  {id:'broccoli_soup', name:'BROCCOLI SOUP',  emoji:'🥦', cuisine:'American',
   items:[{emoji:'🥦',zone:'CENTER'},{emoji:'🧄',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT'  }]},

  // — Chinese —
  {id:'shrimp_toast',  name:'SHRIMP TOAST',   emoji:'🦐', cuisine:'Chinese',
   items:[{emoji:'🦐',zone:'CENTER'},{emoji:'🍞',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT'  }]},

  // — British —
  {id:'mush_toast',    name:'MUSHROOM TOAST', emoji:'🍄', cuisine:'British',
   items:[{emoji:'🍄',zone:'CENTER'},{emoji:'🍞',zone:'LEFT'  },{emoji:'🧈',zone:'RIGHT'  }]},

  // ── Phase B additions (3-ingredient) ──
  {id:'sushi',         name:'SUSHI',          emoji:'🍣', cuisine:'Japanese',
   items:[{emoji:'🍚',zone:'CENTER'},{emoji:'🐟',zone:'TOP'   },{emoji:'🥒',zone:'BOTTOM' }]},
  {id:'tonkatsu',      name:'TONKATSU',       emoji:'🍖', cuisine:'Japanese',
   items:[{emoji:'🐷',zone:'CENTER'},{emoji:'🍞',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT'  }]},
  {id:'fish_chips',    name:'FISH & CHIPS',   emoji:'🐟', cuisine:'British',
   items:[{emoji:'🐟',zone:'CENTER'},{emoji:'🥔',zone:'LEFT'  },{emoji:'🧈',zone:'RIGHT'  }]},
  {id:'mashed_potato', name:'MASHED POTATO',  emoji:'🥔', cuisine:'American',
   items:[{emoji:'🥔',zone:'CENTER'},{emoji:'🧈',zone:'LEFT'  },{emoji:'🥛',zone:'RIGHT'  }]},


  // ════════════════════════════════════════════════
  //  4-INGREDIENT  (CUISINIER difficulty)
  // ════════════════════════════════════════════════

  // — American —
  {id:'burger',        name:'BURGER',         emoji:'🍔', cuisine:'American',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍞',zone:'TOP'   },{emoji:'🥬',zone:'BOT-L' },{emoji:'🧀',zone:'BOT-R' }]},
  {id:'fried_chicken', name:'FRIED CHICKEN',  emoji:'🍗', cuisine:'American',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' }]},
  {id:'chicken_soup',  name:'CHICKEN SOUP',   emoji:'🍲', cuisine:'American',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' }]},
  {id:'blt',           name:'BLT',            emoji:'🥪', cuisine:'American',
   items:[{emoji:'🥓',zone:'CENTER'},{emoji:'🥬',zone:'TOP'   },{emoji:'🍅',zone:'LEFT'  },{emoji:'🍞',zone:'RIGHT' }]},

  // — Italian —
  {id:'pizza',         name:'PIZZA',          emoji:'🍕', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧀',zone:'CENTER'},{emoji:'🌶️',zone:'BOT-L' },{emoji:'🫒',zone:'BOT-R' }]},
  {id:'pasta',         name:'PASTA',          emoji:'🍝', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP-L' },{emoji:'🧄',zone:'TOP-R' },{emoji:'🧅',zone:'BOT-L' },{emoji:'🧀',zone:'BOT-R' }]},
  {id:'carbonara',     name:'CARBONARA',      emoji:'🍝', cuisine:'Italian',
   items:[{emoji:'🥓',zone:'TOP'   },{emoji:'🥚',zone:'CENTER'},{emoji:'🧀',zone:'BOT-L' },{emoji:'🧅',zone:'BOT-R' }]},
  {id:'arrabbiata',    name:'ARRABBIATA',     emoji:'🍝', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧄',zone:'CENTER'},{emoji:'🌶️',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' }]},

  // — French —
  {id:'french_onion',  name:'FRENCH ONION',   emoji:'🍲', cuisine:'French',
   items:[{emoji:'🧅',zone:'CENTER'},{emoji:'🍞',zone:'TOP'   },{emoji:'🧀',zone:'BOT-L' },{emoji:'🧈',zone:'BOT-R' }]},
  {id:'coq_au_vin',    name:'COQ AU VIN',     emoji:'🍗', cuisine:'French',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🍄',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT' }]},

  // — Mexican —
  {id:'tacos',         name:'TACOS',          emoji:'🌮', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'LEFT'  },{emoji:'🧀',zone:'TOP'   },{emoji:'🍅',zone:'RIGHT' },{emoji:'🌽',zone:'BOTTOM'}]},
  {id:'quesadilla',    name:'QUESADILLA',     emoji:'🫓', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧀',zone:'TOP'   },{emoji:'🫑',zone:'LEFT'  },{emoji:'🍅',zone:'RIGHT' }]},
  {id:'nachos',        name:'NACHOS',         emoji:'🌮', cuisine:'Mexican',
   items:[{emoji:'🧀',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🥩',zone:'RIGHT' }]},

  // — Spanish —
  {id:'gazpacho',      name:'GAZPACHO',       emoji:'🥗', cuisine:'Spanish',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'CENTER'},{emoji:'🫑',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' }]},

  // — Japanese —
  {id:'gyoza',         name:'GYOZA',          emoji:'🥟', cuisine:'Japanese',
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT' }]},
  {id:'teriyaki',      name:'TERIYAKI',       emoji:'🍗', cuisine:'Japanese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' }]},
  {id:'udon',          name:'UDON',           emoji:'🍜', cuisine:'Japanese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥚',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' }]},
  {id:'oyakodon',      name:'OYAKODON',       emoji:'🍚', cuisine:'Japanese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥚',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍚',zone:'RIGHT' }]},

  // — Korean —
  {id:'bibimbap',      name:'BIBIMBAP',       emoji:'🍚', cuisine:'Korean',
   items:[{emoji:'🍚',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🥩',zone:'LEFT'  },{emoji:'🍳',zone:'RIGHT' }]},
  {id:'galbi',         name:'GALBI',          emoji:'🥩', cuisine:'Korean',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' }]},

  // — Chinese —
  {id:'kung_pao',      name:'KUNG PAO',       emoji:'🍗', cuisine:'Chinese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},
  {id:'wonton_soup',   name:'WONTON SOUP',    emoji:'🍲', cuisine:'Chinese',
   items:[{emoji:'🥟',zone:'CENTER'},{emoji:'🥬',zone:'TOP'   },{emoji:'🍄',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},
  {id:'sweet_sour',    name:'SWEET & SOUR',   emoji:'🍗', cuisine:'Chinese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},

  // — Thai —
  {id:'pad_see_ew',    name:'PAD SEE EW',     emoji:'🍜', cuisine:'Thai',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' }]},
  {id:'tom_kha',       name:'TOM KHA',        emoji:'🍲', cuisine:'Thai',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🍄',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},

  // — Vietnamese —
  {id:'pho',           name:'PHO',            emoji:'🍜', cuisine:'Vietnamese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🫚',zone:'LEFT'  },{emoji:'🌿',zone:'RIGHT' }]},

  // — Indian —
  {id:'chana',         name:'CHANA MASALA',   emoji:'🍲', cuisine:'Indian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'CENTER'},{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' }]},

  // — Turkish / Middle Eastern —
  {id:'kebab',         name:'KEBAB',          emoji:'🍢', cuisine:'Turkish',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🍅',zone:'LEFT'  },{emoji:'🫑',zone:'RIGHT' }]},
  {id:'shakshuka_4',   name:'SHAKSHUKA',      emoji:'🍳', cuisine:'Middle Eastern',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🍳',zone:'CENTER'},{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},

  // — American —
  {id:'caesar',        name:'CAESAR SALAD',   emoji:'🥗', cuisine:'American',
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🧀',zone:'TOP'   },{emoji:'🍞',zone:'LEFT'  },{emoji:'🥓',zone:'RIGHT' }]},
  {id:'corn_chowder',  name:'CORN CHOWDER',   emoji:'🌽', cuisine:'American',
   items:[{emoji:'🌽',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥓',zone:'RIGHT' }]},
  {id:'bfast_burrito', name:'BREAKFAST BURRITO',emoji:'🫓',cuisine:'Mexican',
   items:[{emoji:'🥚',zone:'CENTER'},{emoji:'🥓',zone:'TOP'   },{emoji:'🫑',zone:'LEFT'  },{emoji:'🧀',zone:'RIGHT' }]},

  // — Greek —
  {id:'greek_salad',   name:'GREEK SALAD',    emoji:'🥗', cuisine:'Greek',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🥒',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' },{emoji:'🧀',zone:'BOTTOM'}]},

  // — French —
  {id:'mush_soup',     name:'MUSHROOM SOUP',  emoji:'🍲', cuisine:'French',
   items:[{emoji:'🍄',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🧈',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' }]},

  // — Italian —
  {id:'stuffed_mush',  name:'STUFFED MUSHROOM',emoji:'🍄',cuisine:'Italian',
   items:[{emoji:'🍄',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🧀',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' }]},

  // — Chinese —
  {id:'chk_brocco',    name:'CHICKEN BROCCOLI',emoji:'🥦',cuisine:'Chinese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' }]},
  {id:'shrimp_sfry',   name:'SHRIMP STIR FRY', emoji:'🦐',cuisine:'Chinese',
   items:[{emoji:'🦐',zone:'CENTER'},{emoji:'🫑',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' }]},

  // ── Phase B additions (4-ingredient) ──
  {id:'banh_mi',       name:'BANH MI',        emoji:'🥖', cuisine:'Vietnamese',
   items:[{emoji:'🍞',zone:'CENTER'},{emoji:'🐷',zone:'TOP'   },{emoji:'🥒',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT' }]},
  {id:'fried_rice',    name:'FRIED RICE',     emoji:'🍚', cuisine:'Chinese',
   items:[{emoji:'🍚',zone:'CENTER'},{emoji:'🥚',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT' }]},
  {id:'basil_chicken', name:'BASIL CHICKEN', emoji:'🌿', cuisine:'Thai',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🌿',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},
  {id:'pork_gyoza',    name:'PORK GYOZA',     emoji:'🥟', cuisine:'Japanese',
   items:[{emoji:'🥟',zone:'CENTER'},{emoji:'🐷',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🫚',zone:'RIGHT' }]},


  // ════════════════════════════════════════════════
  //  5-INGREDIENT  (CHEF difficulty)
  // ════════════════════════════════════════════════

  // — Indian —
  {id:'curry',         name:'CURRY',          emoji:'🍛', cuisine:'Indian',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT' },{emoji:'🍚',zone:'BOTTOM'}]},
  {id:'biryani',       name:'BIRYANI',        emoji:'🍚', cuisine:'Indian',
   items:[{emoji:'🍚',zone:'CENTER'},{emoji:'🥩',zone:'TOP-L' },{emoji:'🌶️',zone:'TOP-R' },{emoji:'🥕',zone:'BOT-L' },{emoji:'🧅',zone:'BOT-R' }]},
  {id:'palak_paneer',  name:'PALAK PANEER',   emoji:'🥬', cuisine:'Indian',
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🧀',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'aloo_gobi',     name:'ALOO GOBI',      emoji:'🥦', cuisine:'Indian',
   items:[{emoji:'🥔',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Spanish —
  {id:'paella',        name:'PAELLA',         emoji:'🥘', cuisine:'Spanish',
   items:[{emoji:'🍚',zone:'TOP'   },{emoji:'🦐',zone:'TOP-L' },{emoji:'🫑',zone:'TOP-R' },{emoji:'🧄',zone:'BOT-L' },{emoji:'🍅',zone:'BOT-R' }]},
  {id:'cocido',        name:'COCIDO',         emoji:'🍲', cuisine:'Spanish',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🥬',zone:'BOTTOM'}]},

  // — Italian —
  {id:'risotto',       name:'RISOTTO',        emoji:'🍚', cuisine:'Italian',
   items:[{emoji:'🍄',zone:'TOP-L' },{emoji:'🧅',zone:'TOP-R' },{emoji:'🧈',zone:'BOT-L' },{emoji:'🧀',zone:'BOT-R' },{emoji:'🍚',zone:'CENTER'}]},
  {id:'minestrone',    name:'MINESTRONE',     emoji:'🍲', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'TOP-L' },{emoji:'🥕',zone:'TOP-R' },{emoji:'🥦',zone:'BOT-L' },{emoji:'🍄',zone:'BOT-R' }]},
  {id:'puttanesca',    name:'PUTTANESCA',     emoji:'🍝', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧄',zone:'TOP-L' },{emoji:'🌶️',zone:'TOP-R' },{emoji:'🫒',zone:'BOT-L' },{emoji:'🧅',zone:'BOT-R' }]},

  // — French —
  {id:'ratatouille',   name:'RATATOUILLE',    emoji:'🥘', cuisine:'French',
   items:[{emoji:'🍆',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🫑',zone:'BOTTOM'}]},
  {id:'nicoise',       name:'NICOISE SALAD',  emoji:'🥗', cuisine:'French',
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' },{emoji:'🥩',zone:'BOTTOM'}]},

  // — Japanese —
  {id:'ramen',         name:'RAMEN',          emoji:'🍜', cuisine:'Japanese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🍳',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌽',zone:'RIGHT' },{emoji:'🌿',zone:'BOTTOM'}]},
  {id:'nikujaga',      name:'NIKUJAGA',       emoji:'🍲', cuisine:'Japanese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥔',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'katsu_curry',   name:'KATSU CURRY',    emoji:'🍛', cuisine:'Japanese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🍚',zone:'BOTTOM'}]},

  // — Korean —
  {id:'sundubu',       name:'SUNDUBU JJIGAE', emoji:'🍲', cuisine:'Korean',
   items:[{emoji:'🧊',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍳',zone:'RIGHT' },{emoji:'🦐',zone:'BOTTOM'}]},
  {id:'japchae',       name:'JAPCHAE',        emoji:'🍜', cuisine:'Korean',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🥕',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Chinese —
  {id:'hotpot',        name:'HOTPOT',         emoji:'🫕', cuisine:'Chinese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🫑',zone:'BOTTOM'}]},
  {id:'mapo_tofu',     name:'MAPO TOFU',      emoji:'🫕', cuisine:'Chinese',
   items:[{emoji:'🧊',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🥩',zone:'BOTTOM'}]},
  {id:'stir_fry',      name:'STIR FRY',       emoji:'🥘', cuisine:'Chinese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'dan_dan',       name:'DAN DAN NOODLES',emoji:'🍜', cuisine:'Chinese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Thai —
  {id:'pad_thai',      name:'PAD THAI',       emoji:'🍜', cuisine:'Thai',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🦐',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🌿',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'massaman',      name:'MASSAMAN CURRY', emoji:'🍛', cuisine:'Thai',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍠',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'green_curry',   name:'GREEN CURRY',    emoji:'🍛', cuisine:'Thai',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🫑',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🥦',zone:'RIGHT' },{emoji:'🌿',zone:'BOTTOM'}]},

  // — Mexican —
  {id:'chili',         name:'CHILI',          emoji:'🌶️', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'enchiladas',    name:'ENCHILADAS',     emoji:'🌮', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧀',zone:'LEFT'  },{emoji:'🍅',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'pozole',        name:'POZOLE',         emoji:'🍲', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌽',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🧄',zone:'BOTTOM'}]},

  // — Vietnamese —
  {id:'bun_bo',        name:'BUN BO HUE',     emoji:'🍜', cuisine:'Vietnamese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🌿',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Moroccan —
  {id:'tagine',        name:'TAGINE',         emoji:'🫕', cuisine:'Moroccan',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' },{emoji:'🌶️',zone:'BOTTOM'}]},

  // — Greek —
  {id:'moussaka',      name:'MOUSSAKA',       emoji:'🍲', cuisine:'Greek',
   items:[{emoji:'🍆',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍅',zone:'RIGHT' },{emoji:'🧀',zone:'BOTTOM'}]},

  // — Brazilian —
  {id:'feijoada',      name:'FEIJOADA',       emoji:'🍲', cuisine:'Brazilian',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥓',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🌶️',zone:'BOTTOM'}]},

  // — Hawaiian —
  {id:'poke_bowl',     name:'POKE BOWL',      emoji:'🥗', cuisine:'Hawaiian',
   items:[{emoji:'🍚',zone:'CENTER'},{emoji:'🐟',zone:'TOP'   },{emoji:'🥕',zone:'LEFT'  },{emoji:'🥒',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Korean —
  {id:'bulgogi',       name:'BULGOGI',        emoji:'🥩', cuisine:'Korean',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' },{emoji:'🫑',zone:'BOTTOM'}]},
  {id:'bibim_noodles', name:'BIBIM NOODLES',  emoji:'🍜', cuisine:'Korean',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🥕',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🥚',zone:'BOTTOM'}]},

  // — American —
  {id:'jambalaya',     name:'JAMBALAYA',      emoji:'🍲', cuisine:'American',
   items:[{emoji:'🦐',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🫑',zone:'BOTTOM'}]},

  // — Indian —
  {id:'chk_tikka',     name:'CHICKEN TIKKA',  emoji:'🍗', cuisine:'Indian',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Italian —
  {id:'marsala',       name:'CHICKEN MARSALA',emoji:'🍗', cuisine:'Italian',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🍄',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🧈',zone:'RIGHT' },{emoji:'🧄',zone:'BOTTOM'}]},

  // — Moroccan —
  {id:'moroccan_chk',  name:'MOROCCAN CHICKEN',emoji:'🍗',cuisine:'Moroccan',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🫒',zone:'TOP'   },{emoji:'🍅',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🌶️',zone:'BOTTOM'}]},

  // — African —
  {id:'sweet_pot_stew',name:'SWEET POT STEW', emoji:'🍲', cuisine:'African',
   items:[{emoji:'🍠',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🌶️',zone:'BOTTOM'}]},

  // ── Phase B additions (5-ingredient) ──
  {id:'tonkotsu',      name:'TONKOTSU RAMEN', emoji:'🍜', cuisine:'Japanese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🐷',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🌿',zone:'BOTTOM'}]},
  {id:'chow_mein',     name:'CHOW MEIN',      emoji:'🍜', cuisine:'Chinese',
   items:[{emoji:'🍜',zone:'CENTER'},{emoji:'🍗',zone:'TOP'   },{emoji:'🥕',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🥦',zone:'BOTTOM'}]},
  {id:'fish_curry',    name:'FISH CURRY',     emoji:'🍛', cuisine:'Indian',
   items:[{emoji:'🐟',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🫚',zone:'BOTTOM'}]},
  {id:'ceviche',       name:'CEVICHE',        emoji:'🥗', cuisine:'Peruvian',
   items:[{emoji:'🐟',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🥒',zone:'BOTTOM'}]},
];

// ═══════════════════════════════════════════════════════════════
//  HELPER FUNCTIONS  — used by each game
// ═══════════════════════════════════════════════════════════════

// Filter dishes by ingredient count (Plate Perfect difficulty tiers)
function pkBySize(n) {
  return PK_DISHES.filter(d => d.items.length === n);
}

// Random dish, optionally filtered by size
function pkRandom(size = null) {
  const pool = size ? pkBySize(size) : PK_DISHES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Ingredient emojis of a dish (order preserved — for Recipe Rush)
function pkIngredients(dish) {
  return dish.items.map(i => i.emoji);
}

// All unique ingredient emojis across the whole menu (Kitchen Chaos belt pool)
function pkIngredientPool() {
  return [...new Set(PK_DISHES.flatMap(d => d.items.map(i => i.emoji)))];
}

// Decoy ingredients NOT in the given dish (Dish Detective wrong answers)
function pkDecoys(dish, count = 4) {
  const used = new Set(pkIngredients(dish));
  const pool = PK_INGREDIENTS.filter(i => !used.has(i.emoji));
  return pool.sort(() => Math.random() - 0.5).slice(0, count).map(i => i.emoji);
}

// All unique dish emojis (Pantry Peek card set)
function pkDishPool() {
  return PK_DISHES.map(d => ({emoji: d.emoji, name: d.name}));
}

// ═══════════════════════════════════════════════════════════════
//  PK_DISH_RECIPES — Real, simplified home-cooking recipes
//  Keyed by dish id. Used by collection.html & recipe.html.
//  Only the curated 27 dishes have entries (others render as "coming soon").
// ═══════════════════════════════════════════════════════════════
const PK_DISH_RECIPES = {
  'omelette': {
    description: "A classic French breakfast — soft folded eggs with melted cheese and crispy bacon.",
    cookTime: 10,
    realIngredients: ["3 eggs", "1/4 cup shredded cheese", "2 slices bacon, chopped", "1 tbsp butter", "Salt & pepper"],
    steps: [
      "Cook the bacon in a nonstick pan until crispy, then set aside.",
      "Whisk eggs with a pinch of salt and pepper.",
      "Melt butter in the same pan over medium-low heat.",
      "Pour in eggs. Let them set 30 sec, then gently push edges toward center.",
      "When mostly set but still glossy on top, scatter bacon and cheese on one half.",
      "Fold the other half over and slide onto a plate."
    ]
  },
  'steak': {
    description: "Pan-seared beef steak with a garlic butter finish.",
    cookTime: 15,
    realIngredients: ["1 ribeye or sirloin steak (2cm thick)", "2 tbsp butter", "2 garlic cloves, crushed", "Salt & pepper", "Oil for searing"],
    steps: [
      "Pat the steak dry and season generously with salt and pepper.",
      "Heat a heavy pan over high heat until smoking.",
      "Add a little oil and sear steak 2-3 min per side for medium-rare.",
      "Lower heat, add butter and crushed garlic to the pan.",
      "Spoon the foaming butter over the steak for 1 min.",
      "Rest on a board for 5 min before slicing."
    ]
  },
  'ratatouille': {
    description: "A rustic Provençal vegetable stew of summer vegetables in tomato sauce.",
    cookTime: 45,
    realIngredients: ["1 eggplant", "1 zucchini", "1 bell pepper", "3 tomatoes", "1 onion", "3 garlic cloves", "Olive oil", "Thyme, salt, pepper"],
    steps: [
      "Slice eggplant, zucchini, pepper, and tomatoes into thin rounds.",
      "Sauté diced onion and minced garlic in olive oil until soft.",
      "Blend a few tomatoes with the onion mix to make the sauce base.",
      "Spread sauce in a baking dish and arrange veggie slices on top in a spiral.",
      "Drizzle with olive oil, sprinkle thyme, salt, pepper.",
      "Cover and bake at 180°C for 40 min, uncover for last 10 min."
    ]
  },
  'pizza': {
    description: "A simple Margherita-style pizza with olives and chili — homemade and crispy.",
    cookTime: 30,
    realIngredients: ["Pizza dough (store-bought ok)", "1/2 cup tomato sauce", "1 cup shredded mozzarella", "8 black olives", "Chili flakes", "Olive oil"],
    steps: [
      "Preheat oven to 240°C (as hot as it goes).",
      "Roll out the dough on a floured surface into a 30cm circle.",
      "Spread tomato sauce evenly, leaving a 2cm border for the crust.",
      "Scatter mozzarella, then olives. Drizzle with olive oil.",
      "Bake on the top rack for 10-12 min until crust is golden.",
      "Sprinkle chili flakes and serve immediately."
    ]
  },
  'carbonara': {
    description: "A creamy Roman pasta made with eggs, cheese, bacon, and black pepper — no cream.",
    cookTime: 20,
    realIngredients: ["200g spaghetti", "100g bacon or pancetta, diced", "2 eggs + 1 yolk", "50g parmesan, grated", "Black pepper, salt"],
    steps: [
      "Boil spaghetti in well-salted water until al dente. Save 1 cup pasta water.",
      "While pasta cooks, fry bacon until crispy. Turn off heat.",
      "In a bowl, whisk eggs, parmesan, and plenty of black pepper.",
      "Drain pasta and immediately add to the bacon pan (heat off).",
      "Pour egg mix over and toss quickly, adding pasta water to loosen.",
      "Serve with extra parmesan and pepper on top."
    ]
  },
  'risotto': {
    description: "A creamy Italian rice dish slowly cooked with mushrooms and parmesan.",
    cookTime: 35,
    realIngredients: ["1 cup arborio rice", "200g mushrooms, sliced", "1 onion, diced", "1L warm chicken or veg stock", "50g butter", "50g parmesan", "Olive oil"],
    steps: [
      "Sauté mushrooms in butter until golden, set aside.",
      "In the same pan, cook diced onion in olive oil until translucent.",
      "Add rice, stir for 1 min until edges look glassy.",
      "Ladle in warm stock one scoop at a time, stirring until absorbed before adding more.",
      "After ~20 min, when rice is creamy and al dente, stir in mushrooms.",
      "Turn off heat. Stir in remaining butter and parmesan. Rest 2 min before serving."
    ]
  },
  'burger': {
    description: "A classic American cheeseburger — juicy beef patty with cheese, lettuce, and tomato.",
    cookTime: 15,
    realIngredients: ["2 burger buns", "300g ground beef (80/20)", "2 slices cheddar", "2 lettuce leaves", "2 tomato slices", "Salt & pepper"],
    steps: [
      "Divide beef into 2 portions, shape into patties slightly larger than buns.",
      "Press a thumb-dimple in the center (prevents puffing up).",
      "Season both sides with salt and pepper.",
      "Cook patties in a hot skillet 3 min per side for medium.",
      "Top with cheese in the last minute and let it melt.",
      "Toast bun halves, layer lettuce, tomato, patty, and close."
    ]
  },
  'blt': {
    description: "The classic American sandwich — bacon, lettuce, tomato on toasted bread.",
    cookTime: 10,
    realIngredients: ["4 slices white bread", "6 strips bacon", "4 lettuce leaves", "1 tomato, sliced", "Mayonnaise"],
    steps: [
      "Cook bacon until crispy, drain on paper towels.",
      "Toast bread slices until golden.",
      "Spread mayo on one side of each toast.",
      "Layer lettuce, tomato slices (salt lightly), and bacon on 2 slices.",
      "Top with remaining toast, mayo-side down.",
      "Slice diagonally and serve."
    ]
  },
  'caesar': {
    description: "Crisp romaine lettuce with creamy dressing, parmesan, croutons, and bacon.",
    cookTime: 15,
    realIngredients: ["1 head romaine lettuce", "1/2 cup parmesan, grated", "1 cup croutons", "4 strips bacon, crumbled", "Caesar dressing"],
    steps: [
      "Wash and dry romaine, then chop into bite-size pieces.",
      "Cook bacon until crispy, crumble into small pieces.",
      "In a large bowl, toss romaine with enough dressing to coat lightly.",
      "Add half the parmesan and half the croutons, toss again.",
      "Transfer to a serving bowl.",
      "Top with remaining parmesan, croutons, and bacon crumbles."
    ]
  },
  'ramen': {
    description: "Japanese noodle soup in rich broth with soft egg, corn, and seaweed.",
    cookTime: 25,
    realIngredients: ["2 packs fresh ramen noodles", "1L chicken stock", "2 tbsp miso paste", "2 soft-boiled eggs", "1/2 cup corn", "2 nori sheets", "Green onions"],
    steps: [
      "Soft-boil eggs for 6.5 min, chill in ice water, then peel and halve.",
      "In a pot, heat stock and whisk in miso paste until smooth.",
      "Cook ramen noodles separately according to pack (usually 3 min).",
      "Divide noodles between 2 bowls, ladle hot broth over.",
      "Top each bowl with half an egg, corn, nori, sliced green onions.",
      "Serve immediately with chopsticks."
    ]
  },
  'teriyaki': {
    description: "Japanese-style grilled chicken glazed with a sweet soy sauce.",
    cookTime: 25,
    realIngredients: ["2 chicken thighs, boneless", "1 head broccoli", "Cooked rice for serving", "For sauce: 3 tbsp soy sauce, 2 tbsp mirin, 2 tbsp sugar, 1 garlic clove minced", "Sesame seeds"],
    steps: [
      "Mix soy sauce, mirin, sugar, and garlic in a bowl for the teriyaki glaze.",
      "Steam broccoli florets for 4 min until bright green and tender.",
      "Sear chicken thighs skin-side down in a hot pan until golden (5 min).",
      "Flip and cook 4 more min. Drain excess fat.",
      "Pour in the sauce and simmer until it thickens and coats the chicken.",
      "Slice chicken, serve over rice with broccoli. Sprinkle sesame seeds."
    ]
  },
  'katsu_curry': {
    description: "Japanese comfort food — breaded chicken cutlet with mild curry sauce and rice.",
    cookTime: 40,
    realIngredients: ["2 chicken breasts", "1 cup panko breadcrumbs", "1 egg, beaten", "Flour for dusting", "1 Japanese curry roux block", "1 carrot, 1 onion, diced", "Cooked rice", "Oil for frying"],
    steps: [
      "Sauté onion and carrot in a pot until soft. Add 500ml water and simmer 10 min.",
      "Break in the curry roux and stir until dissolved and thickened.",
      "Pound chicken to even thickness. Season with salt.",
      "Dredge chicken in flour, then egg, then panko — press to coat.",
      "Shallow-fry in hot oil 3-4 min per side until golden. Rest on paper towel.",
      "Slice chicken, plate over rice, pour curry sauce beside."
    ]
  },
  'bibimbap': {
    description: "Korean rice bowl with colorful vegetables, beef, fried egg, and spicy gochujang.",
    cookTime: 35,
    realIngredients: ["2 cups cooked rice", "200g ground beef", "1 carrot, julienned", "2 cups spinach", "2 eggs", "2 tbsp gochujang", "Soy sauce, sesame oil, garlic"],
    steps: [
      "Season beef with soy sauce, minced garlic, and sesame oil. Stir-fry until browned.",
      "Blanch spinach 30 sec, squeeze dry, toss with sesame oil and salt.",
      "Sauté julienned carrot with a pinch of salt until just tender.",
      "Fry eggs sunny-side up (runny yolk).",
      "Divide rice between 2 bowls. Arrange beef, spinach, carrot in sections on top.",
      "Top with fried egg and a dollop of gochujang. Mix everything before eating."
    ]
  },
  'bulgogi': {
    description: "Thin slices of marinated beef grilled Korean-style with onion and garlic.",
    cookTime: 30,
    realIngredients: ["400g beef sirloin, thinly sliced", "1 onion, sliced", "4 garlic cloves, minced", "For marinade: 4 tbsp soy sauce, 2 tbsp sugar, 1 tbsp sesame oil, 1 pear grated (or 1 tbsp sugar)", "Lettuce for wrapping"],
    steps: [
      "Mix marinade ingredients in a bowl.",
      "Add sliced beef, onion, and garlic. Toss to coat and rest 20 min.",
      "Heat a skillet or grill pan over high heat.",
      "Cook the beef and onion in batches — don't overcrowd. 2 min per side.",
      "Transfer to a platter and serve hot.",
      "Eat with lettuce wraps and rice."
    ]
  },
  'kung_pao': {
    description: "Spicy Sichuan stir-fry with chicken, chilies, and peanuts.",
    cookTime: 20,
    realIngredients: ["2 chicken breasts, cubed", "1/2 cup roasted peanuts", "8-10 dried red chilies", "3 garlic cloves, sliced", "3 green onions, white parts", "For sauce: 2 tbsp soy sauce, 1 tbsp vinegar, 1 tbsp sugar, 1 tsp cornstarch + 2 tbsp water"],
    steps: [
      "Marinate chicken cubes with 1 tsp soy sauce and 1 tsp cornstarch for 10 min.",
      "Mix sauce ingredients in a small bowl.",
      "Heat wok over high heat with 2 tbsp oil until smoking.",
      "Add dried chilies and garlic, stir 10 sec until fragrant (don't burn).",
      "Add chicken, stir-fry until mostly cooked (3 min).",
      "Pour in sauce, add peanuts and green onion. Toss until glossy. Serve with rice."
    ]
  },
  'mapo_tofu': {
    description: "Sichuan classic — silky tofu in a fiery red chili-bean sauce with ground pork.",
    cookTime: 20,
    realIngredients: ["1 block (400g) soft tofu, cubed", "150g ground pork", "2 tbsp doubanjiang (chili bean paste)", "3 garlic cloves, minced", "2 green onions, sliced", "1 cup chicken stock", "1 tbsp cornstarch + 2 tbsp water"],
    steps: [
      "Gently simmer tofu cubes in lightly salted water for 2 min, then drain.",
      "Brown ground pork in a hot wok until cooked through.",
      "Push pork to the side, add garlic and doubanjiang. Stir until oil turns red.",
      "Add stock and bring to a simmer. Slide in tofu gently.",
      "Simmer 5 min, then stir in cornstarch slurry to thicken.",
      "Top with green onions. Serve with rice."
    ]
  },
  'dan_dan': {
    description: "Sichuan street noodles topped with spicy minced pork and chili oil.",
    cookTime: 25,
    realIngredients: ["200g wheat noodles", "200g ground pork", "2 tbsp chili oil", "2 tbsp soy sauce", "1 tbsp black vinegar", "2 tbsp tahini or peanut butter", "2 garlic cloves, minced", "2 green onions, sliced", "Crushed peanuts"],
    steps: [
      "Stir-fry ground pork with minced garlic and 1 tbsp soy sauce until crispy.",
      "In each serving bowl, mix 1 tbsp chili oil, 1 tbsp soy sauce, 1 tsp vinegar, 1 tbsp tahini.",
      "Cook noodles according to package. Drain but save 1/4 cup cooking water.",
      "Place noodles in the bowls over the sauce. Add a splash of cooking water.",
      "Top with crispy pork, sliced green onions, and crushed peanuts.",
      "Mix everything before eating."
    ]
  },
  'pad_thai': {
    description: "Thailand's famous stir-fried rice noodles with shrimp, egg, and peanuts.",
    cookTime: 25,
    realIngredients: ["200g flat rice noodles", "200g shrimp, peeled", "2 eggs", "1 cup bean sprouts", "3 green onions, chopped", "3 garlic cloves, minced", "For sauce: 3 tbsp fish sauce, 3 tbsp tamarind paste (or lime juice), 2 tbsp sugar", "Crushed peanuts, lime wedges"],
    steps: [
      "Soak rice noodles in warm water for 15 min until soft but firm.",
      "Mix sauce ingredients in a small bowl.",
      "Heat oil in wok, stir-fry garlic and shrimp until pink (2 min).",
      "Push to side, crack in eggs and scramble quickly.",
      "Add drained noodles and sauce, toss for 2 min until sauce absorbs.",
      "Add bean sprouts and green onions. Toss 30 sec. Serve with peanuts and lime."
    ]
  },
  'green_curry': {
    description: "Creamy Thai curry with coconut milk, chicken, and Thai basil.",
    cookTime: 25,
    realIngredients: ["2 chicken breasts, sliced", "400ml coconut milk", "3 tbsp green curry paste", "1 green bell pepper, sliced", "1 cup broccoli florets", "1 tbsp fish sauce", "1 tbsp sugar", "Handful Thai basil leaves", "2 red chilies"],
    steps: [
      "Heat 1/2 cup of the thickest coconut milk in a pot until it splits (oil separates).",
      "Stir in curry paste and fry 2 min until fragrant.",
      "Add chicken, stir until sealed.",
      "Pour in remaining coconut milk, fish sauce, and sugar. Simmer 10 min.",
      "Add bell pepper and broccoli, simmer 5 more min.",
      "Turn off heat, stir in basil and chilies. Serve with rice."
    ]
  },
  'pho': {
    description: "Vietnamese beef noodle soup with aromatic clear broth.",
    cookTime: 60,
    realIngredients: ["200g rice noodles", "300g beef sirloin, very thinly sliced", "1.5L beef stock", "1 onion, halved", "3cm ginger, sliced", "2 star anise, 1 cinnamon stick, 3 cloves", "1 tbsp fish sauce", "Bean sprouts, Thai basil, lime, chili — to serve"],
    steps: [
      "Char the onion and ginger over open flame or under broiler 3 min.",
      "Toast star anise, cinnamon, cloves in a dry pot 1 min.",
      "Add stock, charred onion & ginger, fish sauce. Simmer 45 min. Strain.",
      "Cook rice noodles according to package, divide into bowls.",
      "Place raw thinly-sliced beef on noodles.",
      "Pour boiling hot broth over — it will cook the beef. Serve with sprouts, basil, lime, chili."
    ]
  },
  'curry': {
    description: "A hearty Indian-style beef curry with vegetables.",
    cookTime: 60,
    realIngredients: ["500g beef chuck, cubed", "2 onions, diced", "3 garlic cloves, minced", "2 tbsp curry powder", "1 can tomatoes", "2 carrots, chunked", "1 sweet potato, cubed", "500ml beef stock", "1 red chili, sliced"],
    steps: [
      "Brown beef cubes in oil over high heat, then set aside.",
      "In same pot, sauté onion and garlic until soft (5 min).",
      "Stir in curry powder and cook 30 sec until fragrant.",
      "Return beef, add tomatoes, stock, and chili. Bring to a simmer.",
      "Cover and simmer 40 min until beef is tender.",
      "Add carrots and sweet potato, cook 15 more min until soft. Serve with rice."
    ]
  },
  'biryani': {
    description: "Fragrant Indian rice baked with spiced meat, saffron, and fried onions.",
    cookTime: 75,
    realIngredients: ["2 cups basmati rice", "500g beef or lamb, cubed", "2 onions, thinly sliced (fried until golden)", "1/2 cup yogurt", "3 garlic cloves, 3cm ginger, minced", "2 tsp garam masala, 1 tsp turmeric, 1 tsp chili powder", "Pinch saffron in 2 tbsp warm milk", "Fresh cilantro"],
    steps: [
      "Marinate meat with yogurt, garlic-ginger, and spices for 30 min.",
      "Fry onion slices in oil until deep golden and crispy. Drain.",
      "Cook meat in its marinade with half the fried onions, simmer until tender (45 min).",
      "Meanwhile, parboil basmati rice (about 70% done), drain.",
      "In a pot, layer: meat, rice, saffron milk, fried onions, cilantro. Repeat.",
      "Cover tightly and steam on low heat for 20 min. Fluff gently before serving."
    ]
  },
  'tacos': {
    description: "Mexican soft tacos with seasoned ground beef and fresh toppings.",
    cookTime: 20,
    realIngredients: ["8 small corn tortillas", "400g ground beef", "1 onion, diced", "2 garlic cloves, minced", "2 tsp taco seasoning (cumin + paprika + chili powder)", "1 tomato, diced", "1 cup shredded cheese", "1/2 cup corn kernels", "Lime wedges"],
    steps: [
      "Brown ground beef in a skillet, breaking it up.",
      "Add onion and garlic, cook until soft (3 min).",
      "Stir in taco seasoning and 3 tbsp water. Simmer 2 min until thick.",
      "Warm tortillas in a dry pan 20 sec per side.",
      "Fill each tortilla with beef, diced tomato, corn, and cheese.",
      "Squeeze lime over and serve."
    ]
  },
  'enchiladas': {
    description: "Mexican rolled tortillas smothered in red chili sauce and melted cheese.",
    cookTime: 45,
    realIngredients: ["8 corn tortillas", "400g cooked shredded beef or chicken", "1 onion, diced", "2 cups enchilada sauce (or tomato + chili powder)", "2 cups shredded cheese", "Fresh cilantro", "Oil"],
    steps: [
      "Preheat oven to 180°C.",
      "Sauté diced onion, mix with shredded meat.",
      "Warm tortillas in a dry pan or microwave (10 sec) so they don't crack.",
      "Fill each tortilla with meat, roll, and place seam-down in a baking dish.",
      "Pour enchilada sauce over to cover, top with shredded cheese.",
      "Bake 20 min until cheese bubbles. Garnish with cilantro."
    ]
  },
  'paella': {
    description: "Spanish rice dish cooked in a wide pan with shrimp, peppers, and saffron.",
    cookTime: 45,
    realIngredients: ["1.5 cups paella rice", "300g shrimp", "1 onion, diced", "1 bell pepper, sliced", "3 garlic cloves, minced", "1 tomato, grated", "Pinch saffron", "700ml warm chicken stock", "1 tsp paprika", "Olive oil, lemon wedges"],
    steps: [
      "In a wide pan, sauté onion, pepper, and garlic in olive oil until soft.",
      "Add grated tomato and paprika, cook until thickened (3 min).",
      "Stir in rice to coat with the tomato mix.",
      "Pour in warm stock with saffron dissolved in. Shake pan to settle (DO NOT STIR from now).",
      "Simmer uncovered 15 min on medium, then add shrimp on top.",
      "Cook 5 more min until rice absorbs liquid and bottom crisps. Rest 5 min, serve with lemon."
    ]
  },
  'greek_salad': {
    description: "A classic Greek salad with tomato, feta, olives, and olive oil.",
    cookTime: 10,
    realIngredients: ["3 tomatoes, chunked", "1 red onion, thinly sliced", "200g feta cheese, cubed", "1/2 cup Kalamata olives", "1 head romaine or 1 cucumber", "3 tbsp olive oil", "1 tbsp red wine vinegar", "Dried oregano, salt & pepper"],
    steps: [
      "Cut tomatoes into bite-size chunks.",
      "Thinly slice red onion and soak in cold water 5 min to mellow (optional).",
      "Chop romaine or slice cucumber.",
      "In a serving bowl, combine tomatoes, onion, romaine, olives.",
      "Whisk olive oil, vinegar, oregano, salt, pepper. Pour over salad.",
      "Top with feta cubes. Toss gently and serve."
    ]
  },
  'shakshuka': {
    description: "North African / Middle Eastern dish of eggs poached in spiced tomato-pepper sauce.",
    cookTime: 30,
    realIngredients: ["4 eggs", "1 can whole tomatoes (400g)", "1 red bell pepper, diced", "1 onion, diced", "3 garlic cloves, minced", "1 tsp cumin, 1 tsp paprika, pinch chili flakes", "Fresh parsley, olive oil"],
    steps: [
      "Heat olive oil in a wide skillet over medium heat.",
      "Sauté onion and pepper until soft (5 min). Add garlic, cumin, paprika.",
      "Pour in tomatoes, crushing with a spoon. Add chili flakes and salt.",
      "Simmer 10 min until thick and saucy.",
      "Make 4 wells with a spoon, crack an egg into each.",
      "Cover and cook 6-8 min until whites are set, yolks still runny. Top with parsley."
    ]
  }
};

// ═══════════════════════════════════════════════════════════════
//  FUTURE USE — 候选食谱库（未启用）
//  一旦通过 Gemini 生成新的食材 sprite，这些食谱即可启用。
//  每道菜后面列出了目前菜单中【尚未存在】的食材。
// ═══════════════════════════════════════════════════════════════
/*
── 建议新增食材（NEW INGREDIENTS TO GENERATE）──────────────────
  Carbs:     🍚 RICE     🍜 NOODLES   🥔 POTATO    🥖 FLOUR     🍙 NORI
  Proteins:  🐟 FISH     🍣 SALMON    🍤 TUNA      🐷 PORK      🍖 LAMB
             🧈 TOFU     🦆 DUCK      🦑 SQUID     🦞 LOBSTER   🌭 SAUSAGE
  Veggies:   🥑 AVOCADO  🥒 CUCUMBER  🥬 CABBAGE   🍆 EGGPLANT  🥒 ZUCCHINI
             🌿 SPINACH  🫛 PEAS      🫘 BEANS     🌰 CHICKPEA  🌱 SCALLION
  Herbs:     🌿 CILANTRO 🌿 BASIL     🌿 PARSLEY   🫚 GINGER
  Fruits:    🍋 LEMON    🟢 LIME      🍎 APPLE     🥭 MANGO     🥥 COCONUT
  Other:     🧂 SOY      🥛 MILK      🍶 YOGURT    🍯 HONEY     🥜 PEANUT
             🌶️ KIMCHI   🍙 RICE CAKE 🧊 ICE       🍫 CHOCOLATE

── Japanese ─────────────────────────────────────────────────────
  SUSHI              rice, salmon, nori
  TEMPURA            shrimp, flour
  TONKATSU           pork, bread, cabbage
  OKONOMIYAKI        cabbage, pork, flour
  ONIGIRI            rice, nori, salmon
  KATSUDON           pork, egg, onion, rice
  GYUDON             beef, onion, rice
  TAMAGOYAKI         egg, soy
  CHIRASHI DON       rice, salmon, egg, nori
  SHABU SHABU        beef, cabbage, mushroom, tofu
  CHICKEN KATSU      chicken, bread, cabbage
  SOBA               noodles, onion, egg
  TAKOYAKI           squid, flour, cabbage

── Chinese ──────────────────────────────────────────────────────
  FRIED RICE         rice, egg, onion, peas
  CHOW MEIN          noodles, chicken, cabbage, onion
  PEKING DUCK        duck, cucumber, onion
  CHAR SIU           pork, garlic, honey
  XIAO LONG BAO      pork, dumpling, ginger
  HOT & SOUR SOUP    tofu, mushroom, egg, chili
  SCALLION PANCAKE   flour, scallion
  BEEF NOODLE SOUP   beef, noodles, onion, chili
  SCALLION PORK      pork, scallion, garlic
  LION HEAD MEATBALL pork, cabbage, ginger
  SALT & PEPPER SHRIMP shrimp, chili, garlic
  FISH FILLET        fish, chili, garlic, ginger
  STEAMED EGG        egg, soy, scallion
  CONGEE (ORIGINAL)  rice, ginger, scallion

── Korean ───────────────────────────────────────────────────────
  KIMCHI STEW        kimchi, pork, tofu
  TTEOKBOKKI         rice cake, chili, onion
  GIMBAP             rice, nori, carrot, egg
  DAKGALBI           chicken, cabbage, rice cake, chili
  SAMGYETANG         chicken, garlic, rice, ginger
  HAEMUL PAJEON      squid, scallion, flour, shrimp
  MANDU              dumpling, pork, cabbage
  NAENGMYEON         noodles, cucumber, egg, beef
  SOFT TOFU STEW     tofu, chili, egg, onion

── Thai ─────────────────────────────────────────────────────────
  TOM YUM            shrimp, chili, mushroom, lime
  SOM TAM            carrot, chili, lime, peanut
  KHAO SOI           noodles, chicken, chili, onion
  PAD KRAPOW         chicken, basil, chili, egg
  PANANG CURRY       beef, chili, coconut, basil
  MANGO STICKY RICE  rice, mango, coconut
  THAI FRIED RICE    rice, shrimp, egg, scallion

── Vietnamese ───────────────────────────────────────────────────
  BANH MI            bread, pork, carrot, cucumber, cilantro
  BUN CHA            pork, noodles, lettuce, carrot
  BANH XEO           shrimp, pork, flour, beans
  CA KHO TO          fish, chili, garlic, onion
  COM TAM            rice, pork, egg, cucumber

── Indian ───────────────────────────────────────────────────────
  BUTTER CHICKEN     chicken, tomato, butter, yogurt
  TANDOORI CHICKEN   chicken, yogurt, chili, garlic
  SAMOSA             potato, peas, chili, flour
  NAAN               flour, butter, garlic, yogurt
  SAAG PANEER        spinach, cheese, garlic, chili
  VINDALOO           pork, chili, garlic, onion
  DOSA               flour, potato, onion
  ROGAN JOSH         lamb, tomato, yogurt, onion
  KORMA              chicken, yogurt, onion, garlic
  RAITA              yogurt, cucumber, onion

── Italian ──────────────────────────────────────────────────────
  LASAGNA            pasta, beef, tomato, cheese
  GNOCCHI            potato, cheese, tomato, butter
  FOCACCIA           bread, olive, garlic, tomato
  CALZONE            bread, cheese, tomato, mushroom
  BOLOGNESE          pasta, beef, tomato, carrot
  OSSO BUCO          beef, tomato, carrot, onion
  CACIO E PEPE       pasta, cheese, butter
  SALTIMBOCCA        chicken, butter, garlic
  PICCATA            chicken, butter, garlic, lemon

── French ───────────────────────────────────────────────────────
  BEEF BOURGUIGNON   beef, mushroom, onion, carrot, bacon
  QUICHE             egg, cheese, bacon, butter
  CROQUE MONSIEUR    bread, cheese, butter
  BOUILLABAISSE      fish, shrimp, tomato, garlic
  CASSOULET          beans, sausage, duck, onion
  CREPES             flour, egg, butter
  DUCK CONFIT        duck, garlic, butter
  SOUFFLE            egg, cheese, butter

── Spanish ──────────────────────────────────────────────────────
  PATATAS BRAVAS     potato, tomato, chili, garlic
  CROQUETAS          potato, cheese, butter
  GAMBAS AL AJILLO   shrimp, garlic, chili
  PAN CON TOMATE     bread, tomato, garlic
  CHORIZO POT        sausage, onion, tomato, chili

── Mexican ──────────────────────────────────────────────────────
  FAJITAS            beef, bell pepper, onion
  GUACAMOLE          avocado, tomato, onion, lime
  CEVICHE            fish, lime, onion, chili
  HUEVOS RANCHEROS   egg, tomato, chili, beans
  TAMALES            corn, chili, pork
  MOLE               chicken, chili, chocolate, garlic
  CHILAQUILES        egg, tomato, chili, cheese

── American ─────────────────────────────────────────────────────
  MAC & CHEESE       pasta, cheese, butter
  PANCAKES           flour, egg, butter, honey
  CLAM CHOWDER       potato, onion, bacon, butter
  MEATLOAF           beef, egg, onion, bread
  PHILLY CHEESESTEAK beef, bread, cheese, onion, bell pepper
  LOBSTER ROLL       lobster, bread, butter, lettuce
  GUMBO              shrimp, sausage, bell pepper, onion
  WAFFLES            flour, egg, butter, honey
  BISCUITS & GRAVY   flour, sausage, butter
  CORN BREAD         flour, corn, butter, egg

── British ──────────────────────────────────────────────────────
  FISH & CHIPS       fish, potato, flour
  SHEPHERDS PIE      lamb, potato, carrot, onion
  BANGERS & MASH     sausage, potato, onion
  FULL ENGLISH       egg, bacon, tomato, mushroom, bread
  SCOTCH EGG         egg, sausage, bread
  COTTAGE PIE        beef, potato, carrot, onion

── Greek ────────────────────────────────────────────────────────
  GYROS              beef, bread, tomato, onion, yogurt
  SOUVLAKI           chicken, onion, bread, yogurt
  SPANAKOPITA        spinach, cheese, flour, butter
  TZATZIKI           yogurt, cucumber, garlic
  DOLMADES           lettuce, rice, onion, lemon

── Middle Eastern ───────────────────────────────────────────────
  HUMMUS             chickpea, garlic, olive, lemon
  FALAFEL            chickpea, onion, garlic, parsley
  SHAWARMA           chicken, bread, tomato, yogurt
  BABA GHANOUSH      eggplant, garlic, olive, lemon
  TABBOULEH          parsley, tomato, lemon, onion
  MANSAF             lamb, yogurt, rice, onion

── Others ───────────────────────────────────────────────────────
  PIEROGI (POL)      flour, potato, cheese, onion
  POUTINE (CAN)      potato, cheese
  JERK CHICKEN (JAM) chicken, chili, onion, garlic
  JOLLOF RICE (NGA)  rice, tomato, chili, onion
  EMPANADAS (ARG)    flour, beef, onion, egg
  MOQUECA (BRA)      fish, tomato, onion, coconut
  GOULASH (HUN)      beef, onion, chili, potato
  PIEROGI RUSKIE     flour, potato, cheese
  PHO GA             chicken, noodles, onion, ginger
  KHINKALI (GEO)     dumpling, beef, onion, garlic

── Dessert / Breakfast（可选全新分类）──────────────────────────
  CHOCOLATE CAKE     flour, egg, butter, chocolate
  APPLE PIE          flour, apple, butter
  TIRAMISU           egg, cheese, chocolate
  FRENCH TOAST       bread, egg, butter, honey
  YOGURT PARFAIT     yogurt, honey, apple
*/
