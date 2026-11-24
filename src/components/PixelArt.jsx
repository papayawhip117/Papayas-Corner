// Tiny pixel sprites drawn from text grids, coloured only with the site palette.
// Each letter is one pixel:  . = empty
//   b brown  c cream  o coral  g golden  p papaya  s sun-soaked  r grapefruit

const COLORS = {
  b: 'var(--brown)',
  c: 'var(--cream)',
  o: 'var(--coral)',
  g: 'var(--golden)',
  p: 'var(--papaya)',
  s: 'var(--sun)',
  r: 'var(--grapefruit)',
};

export const SPRITES = {
  papaya: [
    '.....ss.....',
    '....bbbb....',
    '...bggggb...',
    '..bgppppgb..',
    '..bgcoopgb..',
    '.bgpobbopgb.',
    '.bgpbbbbpgb.',
    '.bgpbcbbpgb.',
    'bgpobbbbopgb',
    'bgpobbbbopgb',
    'bgpoobboopgb',
    'bgppooooppgb',
    '.bgppppppgb.',
    '..bggggggb..',
    '...bbbbbb...',
  ],
  buddy: [
    '......bsb...',
    '...bbbbbb...',
    '..bppppppb..',
    '.bppppcpppb.',
    '.bpppppcppb.',
    'bppppppppppb',
    'bppbppppbppb',
    'bppbppppbppb',
    'bprpppppprpb',
    'bppppbbppppb',
    '.bppppppppb.',
    '.bppppppppb.',
    '..bppppppb..',
    '...bbbbbb...',
  ],
  heart: [
    '.bbb.bbb.',
    'bocobooob',
    'booooooob',
    '.booooob.',
    '..booob..',
    '...bob...',
    '....b....',
  ],
  sparkle: [
    '...g...',
    '...g...',
    '..ggg..',
    'gggcggg',
    '..ggg..',
    '...g...',
    '...g...',
  ],
  coin: [
    '..bbbb..',
    '.bggggb.',
    'bgcgggsb',
    'bgcgggsb',
    'bgggggsb',
    'bgggggsb',
    '.bssssb.',
    '..bbbb..',
  ],
  teacup: [
    '..r..r....',
    '...r..r...',
    'bbbbbbbb..',
    'boooooobbb',
    'bocoooob.b',
    'boooooobbb',
    '.boooob...',
    'bbbbbbbbb.',
  ],
  brush: [
    '........bb',
    '.......bgb',
    '......bgb.',
    '.....bgb..',
    '....bbb...',
    '...bssb...',
    '..boob....',
    '.boob.....',
    'boob......',
    'bb........',
  ],
  house: [
    '....bb....',
    '...boob...',
    '..boooob..',
    '.boooooob.',
    'bbbbbbbbbb',
    '.bccccccb.',
    '.bggcbbcb.',
    '.bggcbbcb.',
    '.bcccbbcb.',
    '.bbbbbbbb.',
  ],
  puzzle: [
    'bbbbbbbbb',
    'bsssbrrrb',
    'bsssbrrrb',
    'bsssbrrrb',
    'bbbbbbbbb',
    'brrrbsssb',
    'brrrbsssb',
    'brrrbsssb',
    'bbbbbbbbb',
  ],
  mushroom: [
    '...bbbb...',
    '..boooob..',
    '.bocooocb.',
    'boooooooob',
    'bocooooocb',
    'bbbbbbbbbb',
    '...bccb...',
    '...bccb...',
    '...bccb...',
    '..bbbbbb..',
  ],
  sprout: [
    '.bb.bb.',
    'bssbssb',
    '.bsbsb.',
    '..bbb..',
    '...b...',
    '...b...',
  ],
  star: [
    '....b....',
    '...bgb...',
    '...bgb...',
    'bbbbgbbbb',
    'bgggggggb',
    '.bgggggb.',
    '..bgggb..',
    '.bgbbbgb.',
    'bbb...bbb',
  ],
  pin: [
    '.bbb.',
    'boocb',
    'boocb',
    '.bbb.',
    '..b..',
  ],
};

// Merge horizontal runs of the same colour into one rect so the SVG stays tiny.
function toRects(rows) {
  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === '.' || !COLORS[ch]) { x++; continue; }
      let w = 1;
      while (row[x + w] === ch) w++;
      rects.push({ x, y, w, fill: COLORS[ch] });
      x += w;
    }
  });
  return rects;
}

const cache = new Map();

export default function PixelArt({ name, rows, scale = 4, className = '', title, style }) {
  const grid = rows || SPRITES[name];
  if (!grid) return null;
  const key = rows ? null : name;
  let rects = key && cache.get(key);
  if (!rects) {
    rects = toRects(grid);
    if (key) cache.set(key, rects);
  }
  const w = Math.max(...grid.map((r) => r.length));
  const h = grid.length;
  return (
    <svg
      className={`pixel-art ${className}`}
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={style}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
