import { Link } from 'react-router-dom';
import PixelArt from '../components/PixelArt.jsx';
import usePageTitle from '../usePageTitle.js';

export default function NotFound({ what = 'page' }) {
  usePageTitle('Lost');
  return (
    <div className="wrap page empty">
      <PixelArt name="buddy" scale={7} className="bob" />
      <h1>This {what} wandered off</h1>
      <p className="muted">It might be out picking mushrooms. Let’s head back to the shelf.</p>
      <Link to="/games" className="btn btn--primary">Browse games</Link>
    </div>
  );
}
