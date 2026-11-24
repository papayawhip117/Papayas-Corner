import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import GameCard from '../components/GameCard.jsx';
import GameCover from '../components/GameCover.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import NotFound from './NotFound.jsx';
import { getGame, relatedGames, isPlayable } from '../data/games.js';
import { getCategory } from '../data/categories.js';
import { formatDate } from './Home.jsx';
import usePageTitle from '../usePageTitle.js';

// Plays a game in a frame on the page. Loads only after a click, so pages stay light.
function EmbedPlayer({ game }) {
  const [on, setOn] = useState(false);
  const frameRef = useRef(null);
  const full = () => frameRef.current?.parentElement?.requestFullscreen?.();
  return (
    <div className="player">
      <div className="player__screen" style={{ aspectRatio: game.play.aspect || '16 / 9' }}>
        {on ? (
          <iframe
            ref={frameRef}
            src={game.play.url}
            title={game.title}
            allow="autoplay; fullscreen; gamepad"
            allowFullScreen
          />
        ) : (
          <button type="button" className="player__start" onClick={() => setOn(true)}>
            <GameCover game={game} src={game.cover} />
            <span className="btn btn--primary btn--big">Play ▸</span>
          </button>
        )}
      </div>
      {on && (
        <div className="player__bar">
          <button type="button" className="btn btn--soft btn--small" onClick={full}>Full screen</button>
          <button type="button" className="btn btn--soft btn--small" onClick={() => setOn(false)}>Stop</button>
        </div>
      )}
    </div>
  );
}

function PlayPanel({ game }) {
  if (!isPlayable(game)) {
    return (
      <div className="play-panel">
        <span className="btn btn--big is-disabled" aria-disabled="true">Coming soon…</span>
        <p className="muted small">This one isn’t ready yet. Check the updates board for news!</p>
      </div>
    );
  }
  if (game.play.type === 'embed') return null; // shown full width below
  return (
    <div className="play-panel">
      <a href={game.play.url} target="_blank" rel="noreferrer" className="btn btn--primary btn--big">
        Play {game.title} ▸
      </a>
      <p className="muted small">Opens in a new tab, on the game’s own little site.</p>
    </div>
  );
}

function Gallery({ shots }) {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % shots.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + shots.length) % shots.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, shots.length]);

  return (
    <>
      <div className="gallery">
        {shots.map((s, i) => (
          <button key={s.src} type="button" className="gallery__shot" onClick={() => setOpen(i)}>
            <img src={s.src} alt={s.alt} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={shots[open].alt} onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={shots[open].src} alt={shots[open].alt} />
            <figcaption>
              <button type="button" className="btn btn--soft btn--small" onClick={() => setOpen((open - 1 + shots.length) % shots.length)}>◂</button>
              <span>{shots[open].alt}</span>
              <button type="button" className="btn btn--soft btn--small" onClick={() => setOpen((open + 1) % shots.length)}>▸</button>
              <button type="button" className="btn btn--primary btn--small" onClick={() => setOpen(null)}>Close</button>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

export default function GamePage() {
  const { slug } = useParams();
  const game = getGame(slug);
  usePageTitle(game?.title || 'Lost');
  if (!game) return <NotFound what="game" />;

  const tone = game.accent || getCategory(game.categories[0])?.color || 'papaya';
  const related = relatedGames(game);
  const shots = game.screenshots || [];

  return (
    <div className="wrap page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/games">Games</Link> <span>/</span>
        <Link to={`/games?cat=${game.categories[0]}`}>{getCategory(game.categories[0])?.name}</Link> <span>/</span>
        <span aria-current="page">{game.title}</span>
      </nav>

      <section className={`game-hero tone--${tone}`}>
        <div className="game-hero__art">
          <GameCover game={game} src={game.cover} />
        </div>
        <div className="game-hero__info">
          <div className="feature__badges">
            <StatusBadge status={game.status} />
            {game.categories.map((c) => (
              <Link key={c} to={`/games?cat=${c}`} className="chip chip--small">{getCategory(c)?.name}</Link>
            ))}
          </div>
          <h1>{game.title}</h1>
          <p className="game-hero__tagline">{game.tagline}</p>
          <PlayPanel game={game} />
          <dl className="facts">
            {game.version && <><dt>Version</dt><dd>{game.version}</dd></>}
            {game.released && <><dt>Released</dt><dd>{formatDate(game.released)}</dd></>}
            <dt>Plays in</dt><dd>Your browser</dd>
          </dl>
        </div>
      </section>

      {isPlayable(game) && game.play.type === 'embed' && <EmbedPlayer game={game} />}

      <div className="game-body">
        <div className="game-body__main">
          <section className="panel">
            <h2 className="h-small">About this game</h2>
            <p>{game.description}</p>
            {game.notes && <p className="callout">{game.notes}</p>}
            {game.tags?.length > 0 && (
              <ul className="tags">
                {game.tags.map((t) => (
                  <li key={t}><Link to={`/games?q=${encodeURIComponent(t)}`}>#{t}</Link></li>
                ))}
              </ul>
            )}
          </section>

          {shots.length > 0 && (
            <section className="panel">
              <h2 className="h-small">Screenshots</h2>
              <Gallery shots={shots} />
            </section>
          )}
        </div>

        <aside className="game-body__side">
          {game.controls?.length > 0 && (
            <section className="panel panel--tone">
              <h2 className="h-small">How to play</h2>
              <dl className="controls">
                {game.controls.map((c) => (
                  <div key={c.where}>
                    <dt>{c.where}</dt>
                    <dd>{c.keys}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {game.changelog?.length > 0 && (
            <section className="panel">
              <h2 className="h-small">Patch notes</h2>
              <ol className="changelog">
                {game.changelog.map((c) => (
                  <li key={c.version}>
                    <span className="changelog__v">v{c.version}</span>
                    <time dateTime={c.date}>{formatDate(c.date)}</time>
                    <p>{c.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section">
          <SectionTitle icon="heart" kicker="if you liked this…">You might also like</SectionTitle>
          <div className="grid grid--cards">
            {related.map((g, i) => <GameCard key={g.slug} game={g} style={{ '--i': i }} />)}
          </div>
        </section>
      )}

      <div className="btn-row center">
        <Link to="/games" className="btn btn--soft">
          <PixelArt name="sparkle" scale={2} /> Back to the shelf
        </Link>
      </div>
    </div>
  );
}
