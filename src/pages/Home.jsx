import { Link, useNavigate } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import GameCard, { BrewingCard } from '../components/GameCard.jsx';
import GameCover from '../components/GameCover.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Ticker from '../components/Ticker.jsx';
import SuggestionBox from '../components/SuggestionBox.jsx';
import { games, featuredGames, newestGames, gamesInCategory, isPlayable } from '../data/games.js';
import { categories, getCategory } from '../data/categories.js';
import { updates } from '../data/updates.js';
import usePageTitle from '../usePageTitle.js';

function Welcome() {
  const navigate = useNavigate();
  const surprise = () => {
    const pool = games.filter(isPlayable);
    const pick = pool[Math.floor(Math.random() * pool.length)] || games[0];
    if (pick) navigate(`/games/${pick.slug}`);
  };
  return (
    <section className="welcome wrap">
      <div className="welcome__card">
        <p className="kicker">✿ come in, come in ✿</p>
        <h1>
          Welcome to your little corner of the internet
        </h1>
        <p className="welcome__lede">
          Papaya’s Corner is a tiny shelf of my cozy games. Dress-up, decorating,
          gentle idle games and soft little puzzles. No downloads, no pressure, just pick
          something that looks nice and play for a while.
        </p>
        <div className="btn-row">
          <Link to="/games" className="btn btn--primary">Browse the shelf</Link>
          <button type="button" className="btn btn--soft" onClick={surprise}>
            <PixelArt name="sparkle" scale={2} /> Surprise me
          </button>
        </div>
      </div>
      <div className="welcome__scene" aria-hidden="true">
        <div className="scene__window">
          <PixelArt name="sparkle" scale={3} className="float f1" />
          <PixelArt name="sparkle" scale={2} className="float f2" />
          <PixelArt name="heart" scale={3} className="float f3" />
        </div>
        <div className="scene__shelf">
          <PixelArt name="sprout" scale={5} />
          <PixelArt name="mushroom" scale={6} />
          <PixelArt name="buddy" scale={9} className="bob" />
          <PixelArt name="heart" scale={5} />
          <PixelArt name="coin" scale={4} className="coin-spin" />
        </div>
        <div className="scene__note">
          <PixelArt name="pin" scale={3} className="pin" />
          now playing:<br />
          <strong>{games[0]?.title}</strong>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const list = featuredGames();
  if (!list.length) return null;
  const [hero, ...rest] = list;
  const cat = getCategory(hero.categories[0]);
  return (
    <section className="section wrap">
      <SectionTitle icon="star" kicker="picked by papaya">Featured games</SectionTitle>
      <Link to={`/games/${hero.slug}`} className={`feature tone--${hero.accent || cat?.color}`}>
        <div className="feature__art">
          <GameCover game={hero} src={hero.cover} />
        </div>
        <div className="feature__body">
          <div className="feature__badges">
            <StatusBadge status={hero.status} />
            {hero.categories.map((c) => (
              <span key={c} className="chip chip--static">{getCategory(c)?.name}</span>
            ))}
          </div>
          <h3>{hero.title}</h3>
          <p>{hero.description}</p>
          <span className="btn btn--primary">
            {hero.status === 'coming-soon' ? 'Take a peek' : 'Play now'} ▸
          </span>
        </div>
        <div className="feature__stub" aria-hidden="true">
          <span>featured</span><span>v{hero.version}</span>
        </div>
      </Link>
      {rest.length > 0 && (
        <div className="grid grid--cards">
          {rest.map((g) => <GameCard key={g.slug} game={g} />)}
        </div>
      )}
    </section>
  );
}

function Moods() {
  return (
    <section className="section wrap">
      <SectionTitle icon="heart" kicker="what are you in the mood for?">Pick a mood</SectionTitle>
      <div className="moods">
        {categories.map((c) => (
          <Link key={c.id} to={`/games?cat=${c.id}`} className={`mood tone--${c.color}`}>
            <PixelArt name={c.icon} scale={3} />
            <span>{c.name}</span>
            <small>{gamesInCategory(c.id).length}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Fresh() {
  const list = newestGames(6);
  // Fill the last row with "coming soon" slots so the shelf never looks half-empty.
  const brewing = (3 - (list.length % 3)) % 3 || (list.length ? 0 : 3);
  return (
    <section className="section wrap">
      <SectionTitle
        icon="sprout"
        kicker="newest on the shelf"
        action={<Link to="/games" className="link-arrow">See all games ▸</Link>}
      >
        Fresh games
      </SectionTitle>
      <div className="grid grid--cards">
        {list.map((g, i) => <GameCard key={g.slug} game={g} style={{ '--i': i }} />)}
        {Array.from({ length: brewing }, (_, i) => <BrewingCard key={i} style={{ '--i': list.length + i }} />)}
      </div>
    </section>
  );
}

function Board() {
  return (
    <section className="section wrap">
      <SectionTitle
        icon="pin"
        kicker="notes on the corkboard"
        action={<Link to="/updates" className="link-arrow">All updates ▸</Link>}
      >
        What’s new
      </SectionTitle>
      <div className="board">
        {updates.slice(0, 2).map((u, i) => (
          <article key={u.date + u.title} className="note" style={{ '--tilt': `${[-1.5, 1, -0.5][i % 3]}deg` }}>
            <PixelArt name="pin" scale={3} className="pin" />
            <time dateTime={u.date}>{formatDate(u.date)}</time>
            <h3>{u.title}</h3>
            <p>{u.text}</p>
            {u.game && <Link to={`/games/${u.game}`} className="link-arrow">Visit ▸</Link>}
          </article>
        ))}
        <article className="note note--sticky" style={{ '--tilt': '2deg' }}>
          <PixelArt name="pin" scale={3} className="pin" />
          <time>note to self</time>
          <h3>Make more little games ♥</h3>
          <p>The next one is already in the works. Hmm, what should it be about?</p>
          <PixelArt name="sprout" scale={4} />
        </article>
      </div>
    </section>
  );
}

export function formatDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Home() {
  usePageTitle();
  return (
    <>
      <Ticker />
      <Welcome />
      <Featured />
      <Moods />
      <Fresh />
      <Board />
      <div className="wrap section"><SuggestionBox /></div>
    </>
  );
}
