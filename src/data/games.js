// ─────────────────────────────────────────────────────────────
//  🍈  THE GAME SHELF  🍈
//  Every game on Papaya's Corner lives in this one list.
//  To add a game: copy the template at the bottom, fill it in,
//  and drop its images in /public/games/<slug>/. That's it —
//  it shows up in Browse, Categories, search and gets its own page.
// ─────────────────────────────────────────────────────────────

export const games = [
  {
    slug: 'sleepy-kitty',
    title: 'Sleepy Kitty',
    tagline: 'A cozy idle desktop companion.',
    description:
      'Cozy idle desktop game. Customize your kitty color, the weather, season and even listen to some lofi or rain sounds while you relax, work, or study! I hope you enjoy this idle desktop companion!',
    categories: ['cozy', 'idle'],
    tags: ['pixel art', 'kitty', 'lofi', 'rain sounds', 'seasons', 'desktop companion'],
    status: 'new', // 'new' | 'featured' | 'coming-soon' | 'released'
    featured: true,
    released: '2026-11-27',
    version: '1.0.0',
    thumbnail: '/games/sleepy-kitty/sunset.png',
    cover: '/games/sleepy-kitty/sunset.png',
    screenshots: [
      { src: '/games/sleepy-kitty/title.png', alt: 'The Sleepy Kitty start screen' },
      { src: '/games/sleepy-kitty/sunset.png', alt: 'Kitty napping on the window sill at sunset' },
      { src: '/games/sleepy-kitty/snow.png', alt: 'Kitty napping on the window sill on a snowy winter day' },
    ],
    play: { type: 'external', url: 'https://sleepy-kitty-game.vercel.app' },
    controls: [
      { where: 'Window', keys: 'Click the window to pick the season, weather and time of day' },
      { where: 'Laptop', keys: 'Click the laptop on the desk to choose your kitty’s coat' },
      { where: 'Lamp', keys: 'Click the lamp to turn it on or off' },
      { where: 'Kitty', keys: 'Tap her to say hi · press and drag to carry her to the bed or the floor' },
      { where: 'Corner buttons', keys: 'Settings · Sounds (lofi, rain, nature) · H hides everything for cozy mode · Esc closes a panel' },
    ],
    notes: 'Nothing to earn and nothing to keep up with: just a sleepy kitty keeping you company. Your choices are saved in this browser.',
    changelog: [
      { version: '1.0.0', date: '2026-11-27', text: 'First release! Seasons, weather, time of day, kitty coats, and lofi, rain and nature sounds.' },
    ],
    accent: 'coral', // palette token used for this game's color touches
  },
  {
    slug: 'my-cozy-market',
    title: 'My Cozy Market',
    tagline: 'A lantern-lit forest market at dusk.',
    description:
      'Make a little pal with wolf, cat, fox, bunny or bear ears, then wander a night-market street in the middle of an enchanted forest. Earn coins while you play (and a little while you’re away), shop for pajamas, outfits, furniture and plants, and decorate a cozy home in the woods that is all yours.',
    categories: ['cozy', 'creative', 'idle'],
    tags: ['dress-up', 'decorating', 'pixel art', 'idle coins', 'photo booth', 'chiptune'],
    status: 'new', // 'new' | 'featured' | 'coming-soon' | 'released'
    featured: true,
    released: '2026-11-19',
    version: '1.0.0',
    thumbnail: '/games/my-cozy-market/street.png',
    cover: '/games/my-cozy-market/street.png',
    screenshots: [
      { src: '/games/my-cozy-market/street.png', alt: 'The market street at dusk' },
      { src: '/games/my-cozy-market/creator.png', alt: 'The character creator' },
      { src: '/games/my-cozy-market/shop.png', alt: 'A shop catalogue with an item preview' },
      { src: '/games/my-cozy-market/home.png', alt: 'A decorated isometric home' },
      { src: '/games/my-cozy-market/photobooth.png', alt: 'A photo from the photo booth' },
    ],
    // How to play it:
    //   { type: 'external', url }                    → opens the game's own site
    //   { type: 'embed', url, aspect: '16 / 9' }     → plays right on the page in a frame
    play: { type: 'external', url: 'https://my-cozy-market.vercel.app' },
    controls: [
      { where: 'Street', keys: '← → or A D to walk · ↑ W or E at a door to go in' },
      { where: 'Shops', keys: 'Arrow keys to browse · Enter or Space to buy · Esc to go back' },
      { where: 'Home', keys: 'Arrows or WASD to walk · E at the dresser · B to decorate' },
      { where: 'Decorate', keys: 'Drag things around · F to flip · Delete to put away' },
      { where: 'Anywhere', keys: 'M opens the corner menu (music, home, log out)' },
    ],
    notes: 'Accounts are invite-only, so you’ll need an invite code to sign up. Your pal and your home are saved to your account.',
    changelog: [
      { version: '1.0.0', date: '2026-11-19', text: 'First release! Street, shops, character creator, isometric home and the photo booth.' },
    ],
    accent: 'papaya', // palette token used for this game's color touches
  },

  // ── TEMPLATE ── copy me! ─────────────────────────────────────
  // {
  //   slug: 'my-next-game',            // used in the URL: /games/my-next-game
  //   title: 'My Next Game',
  //   tagline: 'One short line.',
  //   description: 'A few sentences about the game.',
  //   categories: ['casual'],          // ids from categories.js
  //   tags: ['cute'],
  //   status: 'coming-soon',
  //   featured: false,
  //   released: '2027-01-01',
  //   version: '0.1.0',
  //   thumbnail: '/games/my-next-game/thumb.png',   // optional: a pixel cover is drawn if missing
  //   cover: '/games/my-next-game/cover.png',
  //   screenshots: [],
  //   play: { type: 'embed', url: '/play/my-next-game/index.html', aspect: '16 / 9' },
  //   controls: [],
  //   changelog: [],
  //   accent: 'grapefruit',
  // },
];

// ── helpers ───────────────────────────────────────────────────
export const getGame = (slug) => games.find((g) => g.slug === slug);

export const byNewest = (a, b) => (b.released || '').localeCompare(a.released || '');

export const featuredGames = () => games.filter((g) => g.featured).sort(byNewest);

export const newestGames = (n = 6) =>
  games.filter((g) => g.status !== 'coming-soon').sort(byNewest).slice(0, n);

export const gamesInCategory = (id) => games.filter((g) => g.categories.includes(id));

export const relatedGames = (game, n = 3) =>
  games
    .filter((g) => g.slug !== game.slug)
    .map((g) => ({ g, score: g.categories.filter((c) => game.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ g }) => g);

export const isPlayable = (game) => game.status !== 'coming-soon' && game.play?.url;
