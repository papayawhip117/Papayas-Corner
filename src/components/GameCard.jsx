import { Link } from 'react-router-dom';
import GameCover from './GameCover.jsx';
import PixelArt from './PixelArt.jsx';
import StatusBadge from './StatusBadge.jsx';
import { getCategory } from '../data/categories.js';

// The "ticket" card: a coloured body with a little side stub for the details.
export default function GameCard({ game, style }) {
  const cat = getCategory(game.categories[0]);
  const soon = game.status === 'coming-soon';
  return (
    <Link
      to={`/games/${game.slug}`}
      className={`ticket tone--${game.accent || cat?.color || 'papaya'}`}
      style={style}
    >
      <div className="ticket__main">
        <div className="ticket__art">
          <GameCover game={game} />
          <StatusBadge status={game.status} />
        </div>
        <h3 className="ticket__title">{game.title}</h3>
        <p className="ticket__desc">{game.tagline}</p>
        <div className="ticket__foot">
          <span className="ticket__cat">{cat?.name}</span>
          <span className="ticket__play">{soon ? 'Peek' : 'Play'} ▸</span>
        </div>
      </div>
      <div className="ticket__stub" aria-hidden="true">
        <span>{soon ? 'soon' : `v${game.version || '1.0'}`}</span>
        <span>{(game.released || '').slice(0, 7).replace('-', '.')}</span>
      </div>
    </Link>
  );
}

// An empty shelf slot, so a small collection still looks loved.
export function BrewingCard({ style }) {
  return (
    <div className="ticket ticket--brewing" style={style} aria-hidden="true">
      <div className="ticket__main">
        <div className="brewing__art">
          <PixelArt name="sparkle" scale={5} className="brewing__steam" />
        </div>
        <h3 className="ticket__title">Coming soon…</h3>
        <p className="ticket__desc">A new little game is on the way. Check back soon!</p>
      </div>
    </div>
  );
}
