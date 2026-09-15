import { Link } from 'react-router-dom'
import { COLORS, products, limitedProducts } from '../data/products.js'
import { getColor } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { IconIron, IconRepeat, IconStick } from '../components/Shape.jsx'
import { getArchiveDrops, getCurrentDrop, getUpcomingDrop } from '../data/drops.js'
import { PLAN, formatMonth } from '../data/plan.js'
import { useStore } from '../context/StoreContext.jsx'

export default function Home() {
  const featured = products.filter((p) => p.type === 'colour')
  const { stockOf, reviews, stories, isSubscriber } = useStore()
  const drop = getCurrentDrop()
  const upcoming = getUpcomingDrop()
  const archive = getArchiveDrops()[0]
  const limited = limitedProducts()
  const dropColor = drop ? getColor(drop.color) : null
  const reviewCount = reviews.length
  const storyCount = stories.length

  return (
    <main>
      <section className="hero">
        <img src="/images/hero-dusk.jpg" alt="Evening commute with reflective bars on a backpack" />
        <div className="hero-overlay">
          <p className="kicker">A club for moving after dark</p>
          <h1>BE SEEN,<br />YOUR WAY.</h1>
          <p>
            Traditional reflective kit asks you to look like equipment. PATCHED. is how you stay visible, keep your style, and move through the night with people who do the same.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn btn-light" to="/club">Join the club · €{PLAN.price}/mo</Link>
            <Link className="btn btn-ghost" to="/drops">This month’s drop</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="label">Problem → solution</p>
          <div className="section-head">
            <h2>Visibility, without the vest.</h2>
          </div>
          <div className="steps">
            <article className="step">
              <h3>The problem</h3>
              <p>Night movement still needs light. Most reflective product is loud, technical, and nothing like the rest of your wardrobe.</p>
            </article>
            <article className="step">
              <h3>The shift</h3>
              <p>PATCHED. turns that layer into a graphic: stars, bars, waves — placed on jackets, bikes, shoes and collars you already wear.</p>
            </article>
            <article className="step">
              <h3>The club</h3>
              <p>Each month a new exclusive colour and set arrives. You stay in the story. The city still sees you.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
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

      {drop && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap split">
            <img src={drop.images[0]} alt={drop.name} />
            <div>
              <p className="label">This month · {formatMonth(drop.releaseDate)}</p>
              <h2 className="display">{drop.name}</h2>
              <p className="copy">
                Exclusive colour: {dropColor?.name}. Set: {drop.stickerSet}.{' '}
                {drop.description}
              </p>
              <p className="copy">
                {stockOf(drop.id)} / {drop.stockInitial} club boxes remaining this month.
                {upcoming ? ` Next: ${upcoming.name}.` : ''}
                {archive ? ` Last month: ${archive.name}.` : ''}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
                <Link className="btn btn-dark" to={`/drops/${drop.id}`}>See the drop</Link>
                {!isSubscriber && (
                  <Link className="btn btn-ghost" to="/club" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
                    Become a member
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="label">€{PLAN.price} / month</p>
          <div className="section-head">
            <h2>What lands each month.</h2>
            <Link to="/club" className="icon-btn">The club</Link>
          </div>
          <div className="steps two">
            {PLAN.includes.map((line) => (
              <article className="step" key={line}>
                <h3>{line.split(' ').slice(0, 3).join(' ')}</h3>
                <p>{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="label">Available in 6 colours</p>
          <div className="section-head">
            <h2>Pick a frequency.</h2>
            <Link to="/shop" className="icon-btn">The palette</Link>
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
                <span>View</span>
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
              <figcaption className="caption">Seen</figcaption>
            </figure>
            <figure className="tall">
              <img src="/images/lifestyle-cycle.jpg" alt="Neon pink mark on a bicycle frame" />
              <figcaption className="caption">Yours</figcaption>
            </figure>
            <figure>
              <img src="/images/lifestyle-leggings.jpg" alt="Star patch on black tights" />
              <figcaption className="caption">Move</figcaption>
            </figure>
            <figure>
              <img src="/images/lifestyle-collar.jpg" alt="Reflective marks on a collar" />
              <figcaption className="caption">Together</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <p className="label">Once it’s gone, it’s gone</p>
          <div className="section-head">
            <h2>Limited editions.</h2>
            <Link to="/shop?type=limited" className="icon-btn">Shop</Link>
          </div>
          <div className="grid-products">
            {limited.map((p) => (
              <ProductCard key={p.id} product={p} stock={stockOf(p.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="label">The palette</p>
          <div className="section-head">
            <h2>Colour in the club.</h2>
            <Link to="/club" className="icon-btn">Join</Link>
          </div>
          <div className="grid-products">
            {featured.map((p) => (
              <ProductCard key={p.id} product={{ ...p, priceLabel: 'In the club' }} />
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
            <p className="copy">
              PATCHED. is a lifestyle layer for people who already have a look. Safety becomes self-expression: a star on tights, bars on a strap, an exclamation on a frame. The club is how that story continues — month after month, with people who move through the same dark.
            </p>
            <p className="copy">
              {storyCount === 0 && reviewCount === 0
                ? 'The community wall is empty until someone writes. If you are already in the beam, leave a story.'
                : `${storyCount} ${storyCount === 1 ? 'story' : 'stories'} and ${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'} live on the community wall — only from people who posted.`}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
              <Link className="btn btn-dark" to="/community">The community</Link>
              <Link className="btn btn-ghost" to="/about" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
                The approach
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
