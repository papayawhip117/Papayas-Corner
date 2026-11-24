import { Link } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import { updates } from '../data/updates.js';
import { getGame } from '../data/games.js';
import { formatDate } from './Home.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Updates() {
  usePageTitle('Updates');
  return (
    <div className="wrap page page--narrow">
      <header className="page-head">
        <p className="kicker">✿ the corkboard ✿</p>
        <h1>Updates</h1>
        <p className="muted">New games, patches and little announcements.</p>
      </header>
      <ol className="timeline">
        {updates.map((u) => (
          <li key={u.date + u.title} className="timeline__item">
            <PixelArt name={u.game ? 'sparkle' : 'heart'} scale={3} className="timeline__dot" />
            <time dateTime={u.date}>{formatDate(u.date)}</time>
            <h2>{u.title}</h2>
            <p>{u.text}</p>
            {u.game && getGame(u.game) && (
              <Link to={`/games/${u.game}`} className="link-arrow">Go to {getGame(u.game).title} ▸</Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
