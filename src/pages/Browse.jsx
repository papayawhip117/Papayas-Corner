import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import GameCard, { BrewingCard } from '../components/GameCard.jsx';
import { games, byNewest } from '../data/games.js';
import { categories, getCategory } from '../data/categories.js';
import usePageTitle from '../usePageTitle.js';

const SORTS = {
  newest: { label: 'Newest', fn: byNewest },
  az: { label: 'A to Z', fn: (a, b) => a.title.localeCompare(b.title) },
  featured: { label: 'Featured first', fn: (a, b) => (b.featured - a.featured) || byNewest(a, b) },
};

export default function Browse() {
  usePageTitle('Browse Games');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('cat') || 'all';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'newest';

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return games
      .filter((g) => cat === 'all' || g.categories.includes(cat))
      .filter((g) => {
        if (!needle) return true;
        const hay = [g.title, g.tagline, g.description, ...(g.tags || []),
          ...g.categories.map((c) => getCategory(c)?.name)].join(' ').toLowerCase();
        return hay.includes(needle);
      })
      .sort(SORTS[sort].fn);
  }, [q, cat, sort]);

  const activeCat = getCategory(cat);
  const filtered = q || cat !== 'all';

  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="kicker">✿ the game shelf ✿</p>
        <h1>{activeCat ? activeCat.name : 'Browse all games'}</h1>
        <p className="muted">{activeCat ? activeCat.blurb : 'Every little game I’ve made, all in one place.'}</p>
      </header>

      <div className="toolbar">
        <label className="search">
          <span className="sr-only">Search games</span>
          <svg viewBox="0 0 8 8" width="20" height="20" shapeRendering="crispEdges" aria-hidden="true">
            <path fill="currentColor" d="M2 0h2v1H2zM1 1h1v1H1zM4 1h1v1H4zM0 2h1v2H0zM5 2h1v2H5zM1 4h1v1H1zM4 4h1v1H4zM2 5h2v1H2zM5 5h1v1H5zM6 6h1v1H6zM7 7h1v1H7z" />
          </svg>
          <input
            type="search"
            placeholder="Search for bunnies, decorating, coins…"
            value={q}
            onChange={(e) => update('q', e.target.value)}
          />
        </label>
        <label className="sort">
          <span>Sort</span>
          <select value={sort} onChange={(e) => update('sort', e.target.value, 'newest')}>
            {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label="Filter by category">
        <button
          type="button"
          className={`chip ${cat === 'all' ? 'is-active' : ''}`}
          onClick={() => update('cat', 'all', 'all')}
        >
          All <small>{games.length}</small>
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip tone--${c.color} ${cat === c.id ? 'is-active' : ''}`}
            aria-pressed={cat === c.id}
            onClick={() => update('cat', c.id, 'all')}
          >
            <PixelArt name={c.icon} scale={2} />
            {c.name} <small>{games.filter((g) => g.categories.includes(c.id)).length}</small>
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? 'game' : 'games'}
        {filtered && (
          <button type="button" className="link-btn" onClick={() => setParams({}, { replace: true })}>
            clear filters
          </button>
        )}
      </p>

      {results.length ? (
        <div className="grid grid--cards" key={`${cat}-${q}-${sort}`}>
          {results.map((g, i) => <GameCard key={g.slug} game={g} style={{ '--i': i }} />)}
          {!filtered && (3 - (results.length % 3)) % 3 > 0 &&
            Array.from({ length: (3 - (results.length % 3)) % 3 }, (_, i) => (
              <BrewingCard key={`b${i}`} style={{ '--i': results.length + i }} />
            ))}
        </div>
      ) : (
        <div className="empty">
          <PixelArt name="buddy" scale={6} className="bob" />
          <h2>Nothing on this shelf yet</h2>
          <p className="muted">
            {cat !== 'all' && !q
              ? 'A game for this mood is on the way. Try another one?'
              : 'No games match that search. Try a different word?'}
          </p>
          <button type="button" className="btn btn--soft" onClick={() => setParams({}, { replace: true })}>
            Show all games
          </button>
        </div>
      )}
    </div>
  );
}
