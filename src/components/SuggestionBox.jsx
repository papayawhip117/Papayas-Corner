import { useState } from 'react';
import PixelArt from './PixelArt.jsx';
import { site } from '../data/site.js';

const KINDS = ['A game idea', 'Something to fix', 'Just saying hi'];

// Writes a note, then opens the visitor's own email app with it filled in.
export default function SuggestionBox() {
  const [kind, setKind] = useState(KINDS[0]);
  const [text, setText] = useState('');
  if (!site.email) return null;

  const href = `mailto:${site.email}?subject=${encodeURIComponent(`Suggestion box: ${kind}`)}&body=${encodeURIComponent(text)}`;

  return (
    <section className="suggest">
      <div className="suggest__slot" aria-hidden="true">
        <PixelArt name="heart" scale={4} className="suggest__heart" />
      </div>
      <div className="suggest__body">
        <p className="kicker">✿ suggestion box ✿</p>
        <h2>Got an idea?</h2>
        <p className="muted">
          A game you wish existed, a bug you found, or just a hello. Drop a note in the box!
        </p>
        <div className="chips" role="group" aria-label="What kind of note?">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className={`chip ${kind === k ? 'is-active' : ''}`}
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="suggest-text">Your note</label>
        <textarea
          id="suggest-text"
          className="suggest__text"
          rows={4}
          placeholder="Dear Papaya…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="btn-row">
          <a href={href} className="btn btn--primary">Drop it in ▸</a>
          <span className="muted small suggest__hint">
            Opens your email app. Or write to <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>
      </div>
    </section>
  );
}
