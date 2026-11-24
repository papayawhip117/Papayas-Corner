import { Link } from 'react-router-dom';
import { updates } from '../data/updates.js';

// A little early-internet news ticker.
export default function Ticker() {
  const items = updates.slice(0, 5);
  const row = items.map((u) => (
    <span key={u.date + u.title} className="ticker__item">
      ✿ {u.game ? <Link to={`/games/${u.game}`} tabIndex={-1}>{u.title}</Link> : u.title}
    </span>
  ));
  return (
    <div className="ticker" role="marquee" aria-label="Latest news">
      <span className="ticker__label">News</span>
      <div className="ticker__track">
        <div className="ticker__run">{row}{row}{row}{row}</div>
      </div>
    </div>
  );
}
