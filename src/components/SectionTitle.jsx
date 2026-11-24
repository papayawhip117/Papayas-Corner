import PixelArt from './PixelArt.jsx';

export default function SectionTitle({ icon = 'sparkle', children, kicker, action }) {
  return (
    <div className="section-title">
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>
          <PixelArt name={icon} scale={3} className="section-title__icon" />
          {children}
        </h2>
      </div>
      {action}
    </div>
  );
}
