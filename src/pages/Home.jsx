import { Link } from 'react-router-dom'
import { COLORS, products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { IconIron, IconRepeat, IconStick } from '../components/Shape.jsx'

export default function Home() {
  const featured = products.filter((p) => p.type === 'colour')

  return (
    <main>
      <section className="hero">
        <img src="/images/hero-dusk.jpg" alt="Evening commute with reflective bars on a backpack" />
        <div className="hero-overlay">
          <p className="kicker">Reflective patches & stickers for everyday movement</p>
          <h1>BE SEEN,<br />YOUR WAY.</h1>
          <p>Graphic marks for jackets, bags, bikes and shoes. Visibility that looks like you meant it.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn btn-light" to="/shop">Shop packs</Link>
            <Link className="btn btn-ghost" to="/about">How it works</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="label">Stick · Iron on · Repeat</p>
          <div className="section-head">
            <h2>Mix / Match / Create</h2>
          </div>
          <div className="steps">
            <article className="step">
              <IconStick />
              <h3>Stick</h3>
              <p>Peel-and-place on hard surfaces — frames, helmets, bottles, collars.</p>
            </article>
            <article className="step">
              <IconIron />
              <h3>Iron on</h3>
              <p>Heat-set onto jackets, tights and straps. Moves with the fabric, not against it.</p>
            </article>
            <article className="step">
              <IconRepeat />
              <h3>Repeat</h3>
              <p>Reposition when the outfit changes. Same marks, new night.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="label">Available in 6 colours</p>
          <div className="section-head">
            <h2>Pick a frequency.</h2>
            <Link to="/shop" className="icon-btn">View all</Link>
          </div>
          <div className="swatches">
            {COLORS.map((c) => (
              <Link
                key={c.id}
                to={`/shop?color=${c.id}`}
                className={`swatch ${c.id === 'black' ? 'dark' : ''}`}
                style={{ background: c.hex }}
              >
                <span>{c.name}</span>
                <span>Shop</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="masonry">
            <figure className="wide">
              <img src="/images/lifestyle-run.jpg" alt="Reflective bar on a running shoe" />
              <figcaption className="caption">Run</figcaption>
            </figure>
            <figure className="tall">
              <img src="/images/lifestyle-cycle.jpg" alt="Neon pink mark on a bicycle frame" />
              <figcaption className="caption">Ride</figcaption>
            </figure>
            <figure>
              <img src="/images/lifestyle-leggings.jpg" alt="Star patch on black tights" />
              <figcaption className="caption">Move</figcaption>
            </figure>
            <figure>
              <img src="/images/lifestyle-collar.jpg" alt="Reflective marks on a collar" />
              <figcaption className="caption">Walk</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <p className="label">The edit</p>
          <div className="section-head">
            <h2>Colour packs.</h2>
            <Link to="/shop" className="icon-btn">Shop</Link>
          </div>
          <div className="grid-products">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <img src="/images/lifestyle-apply.jpg" alt="Applying a star patch to a jacket" />
          <div>
            <p className="label">Not hi-vis. Just seen.</p>
            <h2 className="display">A mark, not a vest.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>
              PATCHED. treats reflection as a graphic accessory. Stars, bars, waves and punctuation — for people who already have a look, and still want to be picked up by headlights.
            </p>
            <Link className="btn btn-dark" to="/about" style={{ marginTop: 24 }}>
              The approach
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
