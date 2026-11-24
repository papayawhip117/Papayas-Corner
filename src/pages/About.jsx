import { Link } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import usePageTitle from '../usePageTitle.js';
import SuggestionBox from '../components/SuggestionBox.jsx';

const SWATCHES = [
  ['Apricot Cream', 'cream'], ['Papaya', 'papaya'], ['Coral Blush', 'coral'],
  ['Golden Hue', 'golden'], ['Sun-Soaked', 'sun'], ['Grapefruit', 'grapefruit'],
];

export default function About() {
  usePageTitle('About');
  return (
    <div className="wrap page page--narrow">
      <header className="page-head">
        <p className="kicker">✿ hello! ✿</p>
        <h1>About the corner</h1>
      </header>
      <div className="letter">
        <PixelArt name="buddy" scale={5} className="letter__buddy bob" />
        <p>
          Hi, I’m Papaya!! {'<3'} This is my little corner of the internet I’ve created where
          I keep all of my games.
        </p>
        <p>
          I grew up on browser games: dress-up, decorating, cooking, you name it. I wanted
          to make a place that feels like that in my own way. I’m hoping that as I
          continually create that there will eventually always be something new to try for
          everyone here.
        </p>
        <p>
          Every game here plays right in your browser. Papaya’s Corner acts as the “launch”
          site for every game!
        </p>
        <p className="letter__sign">
          Thanks for visiting my work in progress. Get cozy and game on!
          <span>♥ Papaya</span>
        </p>
      </div>

      <section className="section">
        <h2 className="h-small">The palette</h2>
        <div className="swatches">
          {SWATCHES.map(([name, tone]) => (
            <div key={tone} className={`swatch tone--${tone}`}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="section"><SuggestionBox /></div>

      <div className="btn-row center">
        <Link to="/games" className="btn btn--primary">Go play something</Link>
      </div>
    </div>
  );
}
