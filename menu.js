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
   items:[{emoji:'🥚',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT'  }]},

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
   items:[{emoji:'🥚',zone:'CENTER'},{emoji:'🍄',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' }]},
  {id:'oyakodon',      name:'OYAKODON',       emoji:'🍚', cuisine:'Japanese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥚',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' }]},

  // — Korean —
  {id:'bibimbap',      name:'BIBIMBAP',       emoji:'🍚', cuisine:'Korean',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🥦',zone:'LEFT'  },{emoji:'🍳',zone:'RIGHT' }]},
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
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🥩',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' }]},
  {id:'tom_kha',       name:'TOM KHA',        emoji:'🍲', cuisine:'Thai',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🍄',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' }]},

  // — Vietnamese —
  {id:'pho',           name:'PHO',            emoji:'🍜', cuisine:'Vietnamese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍄',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' }]},

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
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

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


  // ════════════════════════════════════════════════
  //  5-INGREDIENT  (CHEF difficulty)
  // ════════════════════════════════════════════════

  // — Indian —
  {id:'curry',         name:'CURRY',          emoji:'🍛', cuisine:'Indian',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥕',zone:'RIGHT' },{emoji:'🍠',zone:'BOTTOM'}]},
  {id:'biryani',       name:'BIRYANI',        emoji:'🍚', cuisine:'Indian',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'TOP-L' },{emoji:'🧅',zone:'TOP-R' },{emoji:'🥕',zone:'BOT-L' },{emoji:'🧄',zone:'BOT-R' }]},
  {id:'palak_paneer',  name:'PALAK PANEER',   emoji:'🥬', cuisine:'Indian',
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🧀',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'aloo_gobi',     name:'ALOO GOBI',      emoji:'🥦', cuisine:'Indian',
   items:[{emoji:'🥦',zone:'CENTER'},{emoji:'🍠',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Spanish —
  {id:'paella',        name:'PAELLA',         emoji:'🥘', cuisine:'Spanish',
   items:[{emoji:'🦐',zone:'TOP'   },{emoji:'🧅',zone:'TOP-L' },{emoji:'🫑',zone:'TOP-R' },{emoji:'🧄',zone:'BOT-L' },{emoji:'🍅',zone:'BOT-R' }]},
  {id:'cocido',        name:'COCIDO',         emoji:'🍲', cuisine:'Spanish',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🥬',zone:'BOTTOM'}]},

  // — Italian —
  {id:'risotto',       name:'RISOTTO',        emoji:'🍚', cuisine:'Italian',
   items:[{emoji:'🍄',zone:'TOP-L' },{emoji:'🧅',zone:'TOP-R' },{emoji:'🧈',zone:'BOT-L' },{emoji:'🧀',zone:'BOT-R' },{emoji:'🥕',zone:'CENTER'}]},
  {id:'minestrone',    name:'MINESTRONE',     emoji:'🍲', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'TOP-L' },{emoji:'🥕',zone:'TOP-R' },{emoji:'🥦',zone:'BOT-L' },{emoji:'🍄',zone:'BOT-R' }]},
  {id:'puttanesca',    name:'PUTTANESCA',     emoji:'🍝', cuisine:'Italian',
   items:[{emoji:'🍅',zone:'TOP'   },{emoji:'🧄',zone:'TOP-L' },{emoji:'🌶️',zone:'TOP-R' },{emoji:'🫒',zone:'BOT-L' },{emoji:'🧅',zone:'BOT-R' }]},

  // — French —
  {id:'ratatouille',   name:'RATATOUILLE',    emoji:'🥘', cuisine:'French',
   items:[{emoji:'🫑',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🥦',zone:'BOTTOM'}]},
  {id:'nicoise',       name:'NICOISE SALAD',  emoji:'🥗', cuisine:'French',
   items:[{emoji:'🥬',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🥚',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' },{emoji:'🥩',zone:'BOTTOM'}]},

  // — Japanese —
  {id:'ramen',         name:'RAMEN',          emoji:'🍜', cuisine:'Japanese',
   items:[{emoji:'🍳',zone:'CENTER'},{emoji:'🌽',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥦',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'nikujaga',      name:'NIKUJAGA',       emoji:'🍲', cuisine:'Japanese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🥬',zone:'BOTTOM'}]},
  {id:'katsu_curry',   name:'KATSU CURRY',    emoji:'🍛', cuisine:'Japanese',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🥬',zone:'BOTTOM'}]},

  // — Korean —
  {id:'sundubu',       name:'SUNDUBU JJIGAE', emoji:'🍲', cuisine:'Korean',
   items:[{emoji:'🧅',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🍳',zone:'RIGHT' },{emoji:'🦐',zone:'BOTTOM'}]},
  {id:'japchae',       name:'JAPCHAE',        emoji:'🍜', cuisine:'Korean',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Chinese —
  {id:'hotpot',        name:'HOTPOT',         emoji:'🫕', cuisine:'Chinese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🫑',zone:'BOTTOM'}]},
  {id:'mapo_tofu',     name:'MAPO TOFU',      emoji:'🫕', cuisine:'Chinese',
   items:[{emoji:'🌶️',zone:'CENTER'},{emoji:'🧄',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🍄',zone:'RIGHT' },{emoji:'🥩',zone:'BOTTOM'}]},
  {id:'stir_fry',      name:'STIR FRY',       emoji:'🥘', cuisine:'Chinese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥦',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'dan_dan',       name:'DAN DAN NOODLES',emoji:'🍜', cuisine:'Chinese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Thai —
  {id:'pad_thai',      name:'PAD THAI',       emoji:'🍜', cuisine:'Thai',
   items:[{emoji:'🦐',zone:'CENTER'},{emoji:'🥚',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'massaman',      name:'MASSAMAN CURRY', emoji:'🍛', cuisine:'Thai',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍠',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'green_curry',   name:'GREEN CURRY',    emoji:'🍛', cuisine:'Thai',
   items:[{emoji:'🍗',zone:'CENTER'},{emoji:'🫑',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🥦',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Mexican —
  {id:'chili',         name:'CHILI',          emoji:'🌶️', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🧅',zone:'RIGHT' },{emoji:'🥕',zone:'BOTTOM'}]},
  {id:'enchiladas',    name:'ENCHILADAS',     emoji:'🌮', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌶️',zone:'TOP'   },{emoji:'🧀',zone:'LEFT'  },{emoji:'🍅',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},
  {id:'pozole',        name:'POZOLE',         emoji:'🍲', cuisine:'Mexican',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🌽',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🧄',zone:'BOTTOM'}]},

  // — Vietnamese —
  {id:'bun_bo',        name:'BUN BO HUE',     emoji:'🍜', cuisine:'Vietnamese',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🌶️',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' },{emoji:'🍄',zone:'BOTTOM'}]},

  // — Moroccan —
  {id:'tagine',        name:'TAGINE',         emoji:'🫕', cuisine:'Moroccan',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🫒',zone:'RIGHT' },{emoji:'🌶️',zone:'BOTTOM'}]},

  // — Greek —
  {id:'moussaka',      name:'MOUSSAKA',       emoji:'🍲', cuisine:'Greek',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🍅',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🥦',zone:'RIGHT' },{emoji:'🧀',zone:'BOTTOM'}]},

  // — Brazilian —
  {id:'feijoada',      name:'FEIJOADA',       emoji:'🍲', cuisine:'Brazilian',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥓',zone:'TOP'   },{emoji:'🧅',zone:'LEFT'  },{emoji:'🧄',zone:'RIGHT' },{emoji:'🌶️',zone:'BOTTOM'}]},

  // — Hawaiian —
  {id:'poke_bowl',     name:'POKE BOWL',      emoji:'🥗', cuisine:'Hawaiian',
   items:[{emoji:'🦐',zone:'CENTER'},{emoji:'🥕',zone:'TOP'   },{emoji:'🥬',zone:'LEFT'  },{emoji:'🌽',zone:'RIGHT' },{emoji:'🧅',zone:'BOTTOM'}]},

  // — Korean —
  {id:'bulgogi',       name:'BULGOGI',        emoji:'🥩', cuisine:'Korean',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🧅',zone:'TOP'   },{emoji:'🧄',zone:'LEFT'  },{emoji:'🥬',zone:'RIGHT' },{emoji:'🫑',zone:'BOTTOM'}]},
  {id:'bibim_noodles', name:'BIBIM NOODLES',  emoji:'🍜', cuisine:'Korean',
   items:[{emoji:'🥩',zone:'CENTER'},{emoji:'🥬',zone:'TOP'   },{emoji:'🥕',zone:'LEFT'  },{emoji:'🌶️',zone:'RIGHT' },{emoji:'🥚',zone:'BOTTOM'}]},

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
