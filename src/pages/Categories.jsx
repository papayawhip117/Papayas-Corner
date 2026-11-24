import { Link } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import { categories } from '../data/categories.js';
import { gamesInCategory } from '../data/games.js';
import usePageTitle from '../usePageTitle.js';

export default function Categories() {
  usePageTitle('Categories');
  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="kicker">✿ pick a mood ✿</p>
        <h1>Categories</h1>
        <p className="muted">Little shelves for every kind of afternoon.</p>
      </header>
      <div className="grid grid--cats">
        {categories.map((c, i) => {
          const list = gamesInCategory(c.id);
          return (
            <Link key={c.id} to={`/games?cat=${c.id}`} className={`cat-tile tone--${c.color}`} style={{ '--i': i }}>
              <PixelArt name={c.icon} scale={5} />
              <h2>{c.name}</h2>
              <p>{c.blurb}</p>
              <span className="cat-tile__count">
                {list.length ? `${list.length} ${list.length === 1 ? 'game' : 'games'}` : 'coming soon'}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
