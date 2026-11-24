import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PixelArt from './PixelArt.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/games', label: 'Browse Games' },
  { to: '/categories', label: 'Categories' },
  { to: '/updates', label: 'Updates' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="header">
      <div className="awning" aria-hidden="true" />
      <div className="header__bar wrap">
        <Link to="/" className="logo" aria-label="Papaya’s Corner home">
          <PixelArt name="papaya" scale={3} className="logo__icon" />
          <span className="logo__text">Papaya’s Corner</span>
        </Link>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
