import PixelArt from './PixelArt.jsx';
import { getCategory } from '../data/categories.js';

// Shows the game's image, or draws a little pixel cover if it doesn't have one yet.
export default function GameCover({ game, src, className = '' }) {
  const image = src || game.thumbnail || game.cover;
  if (image) {
    return <img className={`cover ${className}`} src={image} alt="" loading="lazy" />;
  }
  const cat = getCategory(game.categories?.[0]);
  return (
    <div className={`cover cover--drawn tone--${game.accent || cat?.color || 'papaya'} ${className}`}>
      <PixelArt name={cat?.icon || 'papaya'} scale={6} />
      <span className="cover__title">{game.title}</span>
    </div>
  );
}
