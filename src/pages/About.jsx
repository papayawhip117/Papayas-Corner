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
          Hi, I’m Papaya! This is my little corner of the internet, where I keep all of
          my tiny games.
        </p>
        <p>
          I grew up losing whole afternoons on websites full of little browser games:
          dress-up, decorating, cooking, games where you just looked after something sweet.
          I wanted to make a place that feels like that again. It’s cozy, a bit nostalgic,
          and there’s always something new to try.
        </p>
        <p>
          Every game here plays right in your browser. Nothing to download, and none of
          them will rush you.
        </p>
        <p className="letter__sign">
          Thanks for visiting. Make yourself at home!
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
