// ─────────────────────────────────────────────────────────────
//  Categories
//  Add a new one by copying a line. `id` is what games use in
//  their `categories` list, so keep it short and lowercase.
//  `icon` is one of the pixel icons in src/components/PixelArt.jsx
//  `color` is one of the palette tokens: papaya, sun, grapefruit,
//  coral, golden, cream
// ─────────────────────────────────────────────────────────────

export const categories = [
  { id: 'cozy',      name: 'Cozy & Relaxing',       icon: 'mushroom', color: 'grapefruit', blurb: 'Slow, soft games for winding down.' },
  { id: 'idle',      name: 'Idle & Incremental',    icon: 'coin',     color: 'golden',     blurb: 'Watch the numbers go up, even while you’re away.' },
  { id: 'creative',  name: 'Creative & Decorating', icon: 'brush',    color: 'papaya',     blurb: 'Dress up, decorate and make things yours.' },
  { id: 'sim',       name: 'Simulation',            icon: 'house',    color: 'sun',        blurb: 'Run a little shop, a garden, a whole life.' },
  { id: 'casual',    name: 'Cute & Casual',         icon: 'heart',    color: 'coral',      blurb: 'Quick, sweet games for a five-minute break.' },
  { id: 'puzzle',    name: 'Puzzles',               icon: 'puzzle',   color: 'sun',        blurb: 'Gentle brain teasers. No timers, promise.' },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
