import { Link } from 'react-router-dom'
import { IconIron, IconRepeat, IconStick } from '../components/Shape.jsx'
import { PLAN } from '../data/plan.js'

export default function About() {
  return (
    <main>
      <section className="hero" style={{ minHeight: 520 }}>
        <img src="/images/hero-cycle.jpg" alt="Evening commute with reflective bars" style={{ height: 520 }} />
        <div className="hero-overlay">
          <p className="kicker">The story</p>
          <h1>A graphic<br />for the dark.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <p className="label">Problem → solution → brand → community</p>
          <div className="steps two">
            <article className="step">
              <h3>Problem</h3>
              <p>Being visible at night still matters. Traditional reflective product is boring, bulky, or purely functional — it asks you to look like safety equipment.</p>
            </article>
            <article className="step">
              <h3>Solution</h3>
              <p>PATCHED. makes retro-reflective stickers and iron-ons as graphic marks. You keep your clothes. You keep your bike. You add a star, a bar, a wave.</p>
            </article>
            <article className="step">
              <h3>Brand</h3>
              <p>We are not a hi-vis shop. We are a lifestyle layer for 18–30 year olds who already dress with intention and still want headlights to find them.</p>
            </article>
            <article className="step">
              <h3>Community</h3>
              <p>The club is the ongoing relationship: a monthly exclusive, limited runs, and a wall for real nights — not invented testimonials.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div>
            <p className="label">The idea</p>
            <h2 className="display">Visibility without the vest.</h2>
            <p className="copy">
              PATCHED. is for people who move through the city after work — running, cycling, walking the dog, catching the last tram. The point is not to look like equipment. It is to add a mark, then belong to a group of people doing the same.
            </p>
            <p className="copy">
              Safety becomes self-expression. Night becomes usable. €{PLAN.price} a month keeps the colour changing so the story does not freeze on one pack.
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
              <p>Peel slowly when you want a new placement. One set, many outfits.</p>
            </article>
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn btn-dark" to="/club">Join the club</Link>
            <Link className="btn btn-ghost" to="/community" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
              Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
