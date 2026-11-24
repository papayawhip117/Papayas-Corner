import { Link } from 'react-router-dom';
import PixelArt from './PixelArt.jsx';
import { site } from '../data/site.js';

const BUTTONS = ['no ads, ever', 'free to play', 'cozy socks on', 'click & play'];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner wrap">
        <div className="footer__brand">
          <Link to="/" className="logo logo--footer">
            <PixelArt name="papaya" scale={3} />
            <span className="logo__text">Papaya’s Corner</span>
          </Link>
          <p>{site.footerNote}</p>
        </div>
        <div className="footer__links">
          <p className="footer__label">Wander</p>
          <Link to="/games">Browse games</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/updates">Updates</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="footer__links">
          <p className="footer__label">Say hi</p>
          {site.email && <a href={`mailto:${site.email}`}>Suggestion box</a>}
          {site.socials.length ? (
            site.socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
            ))
          ) : (
            <span className="muted">Socials coming soon</span>
          )}
        </div>
      </div>
      <div className="footer__badges wrap" aria-hidden="true">
        {BUTTONS.map((b) => <span key={b} className="web-button">{b}</span>)}
      </div>
      <p className="footer__copy">
        © {site.startedYear === year ? year : `${site.startedYear}–${year}`} {site.name}
        <PixelArt name="heart" scale={2} />
        thanks for visiting
      </p>
    </footer>
  );
}
