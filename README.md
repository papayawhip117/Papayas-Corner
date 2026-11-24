# 🍈 Papaya's Corner

A cozy little hub for all of Papaya's games. Built with React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/ (vercel.json handles page routing)
```

## Adding a game

1. Put its images in `public/games/<slug>/` (cover, screenshots).
2. Open `src/data/games.js`, copy the template at the bottom, and fill it in.
3. Done. It appears in Browse, Categories, search and gets its own page at `/games/<slug>`.

- `play: { type: 'external', url }` links out to the game's own site.
- `play: { type: 'embed', url, aspect: '16 / 9' }` plays it in a frame on the page.
  For a game you host here, put its built files in `public/play/<slug>/` and use `url: '/play/<slug>/index.html'`.
- No thumbnail yet? Leave it out and a pixel cover is drawn for you.
- `status`: `new`, `featured`, `coming-soon` or `released`. `featured: true` puts it on the homepage.

## Other things to edit

| File | What |
|---|---|
| `src/data/categories.js` | Categories (name, pixel icon, color) |
| `src/data/updates.js` | Corkboard and news ticker posts |
| `src/data/site.js` | Footer message and social links |
| `src/components/PixelArt.jsx` | The pixel sprites, drawn as text grids |
| `src/styles/global.css` | Palette tokens and all styling |

## Palette

| Role | Color |
|---|---|
| Page background | Apricot Cream `#F9E5BB` |
| Card bodies, warm panels | Papaya `#FCA97E` |
| Primary buttons | Coral Blush `#ED8F72` |
| Highlights, featured, active nav | Golden Hue `#F3B460` |
| Secondary panels, chips | Sun-Soaked `#D9C068` |
| Soft panels, "new" | Grapefruit `#FFBBA9` |
| Text, outlines, pixel ink | Papaya-seed brown `#5A3326` |

Fonts: **Gordito Tinta** (headings, nav, buttons), Nunito (body text), Silkscreen (tiny pixel labels).
