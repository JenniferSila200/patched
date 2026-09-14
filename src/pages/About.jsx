import { Link } from 'react-router-dom'
import { IconIron, IconRepeat, IconStick } from '../components/Shape.jsx'

export default function About() {
  return (
    <main>
      <section className="hero" style={{ minHeight: 520 }}>
        <img src="/images/hero-cycle.jpg" alt="Cyclist at dusk" style={{ height: 520 }} />
        <div className="hero-overlay">
          <p className="kicker">About</p>
          <h1>A graphic<br />for the dark.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="label">The idea</p>
            <h2 className="display">Visibility without the vest.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              PATCHED. makes retro-reflective stickers and iron-on patches for people who move through the city after work — running, cycling, walking the dog, catching the last tram. The point is not to look like equipment. It is to add a mark: a star on tights, bars on a strap, an exclamation on a frame.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Six colours. A short set of shapes. Stick, iron on, repeat. Designed for 18–30 year olds who already dress with intention.
            </p>
          </div>
          <img src="/images/lifestyle-apply.jpg" alt="Applying a PATCHED. star" />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="steps">
            <article className="step">
              <IconStick />
              <h3>Stick</h3>
              <p>Clean the surface. Press from the centre out. Best on hard, dry materials.</p>
            </article>
            <article className="step">
              <IconIron />
              <h3>Iron on</h3>
              <p>Medium heat, no steam, 12–15 seconds. Let it cool. Wash inside out.</p>
            </article>
            <article className="step">
              <IconRepeat />
              <h3>Repeat</h3>
              <p>Peel slowly when you want a new placement. One pack, many outfits.</p>
            </article>
          </div>
          <div style={{ marginTop: 40 }}>
            <Link className="btn btn-dark" to="/shop">Shop the packs</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
