import { Link } from 'react-router-dom'
import { getArchiveDrops, getCurrentDrop, getDrop, getUpcomingDrop } from '../data/drops.js'
import { getColor } from '../data/products.js'
import { PLAN, formatMonth } from '../data/plan.js'
import { useStore } from '../context/StoreContext.jsx'
import { Shape } from '../components/Shape.jsx'
import { useParams } from 'react-router-dom'
import ReviewList from '../components/ReviewList.jsx'

export default function Drops() {
  const { id } = useParams()
  const current = getCurrentDrop()
  const upcoming = getUpcomingDrop()
  const archive = getArchiveDrops()
  const selected = id ? getDrop(id) : current

  if (id && !selected) {
    return (
      <main className="wrap section">
        <p>That drop isn’t in the archive.</p>
        <Link to="/drops">All drops</Link>
      </main>
    )
  }

  if (id && selected) {
    return <DropDetail drop={selected} currentId={current?.id} upcoming={upcoming} />
  }

  return (
    <main className="section" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="label">Monthly drops</p>
        <h1 className="display">The night, in chapters.</h1>
        <p className="copy" style={{ maxWidth: 560 }}>
          Every month the club gets one exclusive colour and one sticker set. The live drop sits here. Previous months stay as an archive — a record of how the city was marked.
        </p>
      </div>
      {current && (
        <div className="wrap split" style={{ marginTop: 48 }}>
          <img src={current.images[1] || current.images[0]} alt={current.name} />
          <DropCopy drop={current} live upcoming={upcoming} />
        </div>
      )}
      <div className="wrap" style={{ marginTop: 72 }}>
        <p className="label">Archive</p>
        <h2 className="display" style={{ marginBottom: 28 }}>Previous nights.</h2>
        <div className="grid-products">
          {archive.map((d) => (
            <Link className="card" key={d.id} to={`/drops/${d.id}`}>
              <div className="card-media">
                <img src={d.images[0]} alt={d.name} />
                <span className="badge">Archive</span>
              </div>
              <div className="card-meta">
                <div>
                  <h3>{d.name}</h3>
                  <p className="sub">{formatMonth(d.releaseDate)} · {getColor(d.color)?.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {upcoming && (
          <p className="copy" style={{ marginTop: 36 }}>
            Ahead: {upcoming.name} · {formatMonth(upcoming.releaseDate)}. Members stay in the sequence.
          </p>
        )}
      </div>
    </main>
  )
}

function DropCopy({ drop, live, upcoming }) {
  const { stockOf, isSubscriber } = useStore()
  const color = getColor(drop.color)
  const remaining = stockOf(drop.id)

  return (
    <div>
      <p className="label">{live ? 'Now shipping' : formatMonth(drop.releaseDate)}</p>
      <h2 className="display">{drop.name}</h2>
      <p className="copy">
        Colour: {color?.name}. Set: {drop.stickerSet}.
      </p>
      <p className="copy">{drop.description}</p>
      {live && (
        <p className="copy">
          {remaining} / {drop.stockInitial} club boxes remaining this month.
        </p>
      )}
      <div className="shapes" style={{ margin: '18px 0' }}>
        {drop.shapes.map((s) => (
          <Shape key={s} type={s} color={color?.hex} />
        ))}
      </div>
      {upcoming && live && (
        <p className="copy">Next chapter: {upcoming.name} in {formatMonth(upcoming.releaseDate)}.</p>
      )}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
        {live && !isSubscriber && (
          <Link className="btn btn-dark" to="/club">Join to receive it · €{PLAN.price}/mo</Link>
        )}
        {isSubscriber && live && <p className="copy">This month’s box is part of your membership.</p>}
        <Link className="btn btn-ghost" to={`/drops/${drop.id}`} style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
          Drop notes
        </Link>
      </div>
    </div>
  )
}

function DropDetail({ drop, currentId, upcoming }) {
  const live = drop.id === currentId
  const { stockOf, isSubscriber } = useStore()
  const color = getColor(drop.color)

  return (
    <main>
      <div className="wrap pdp">
        <div className="gallery">
          <div className="main">
            <img src={drop.images[0]} alt={drop.name} />
          </div>
          <div className="thumbs">
            {drop.images.map((src) => (
              <button key={src} type="button" className="on" tabIndex={-1}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="pdp-info">
          <p className="label">{live ? 'Current drop' : 'Archive drop'}</p>
          <h1>{drop.name}</h1>
          <p className="price">{formatMonth(drop.releaseDate)} · {color?.name}</p>
          <p>{drop.description}</p>
          <p className="copy">Sticker set: {drop.stickerSet}.</p>
          {live && <p className="copy">{stockOf(drop.id)} / {drop.stockInitial} remaining this month.</p>}
          {live && !isSubscriber && (
            <Link className="btn btn-dark btn-full" style={{ marginTop: 24 }} to="/club">
              Join the club — €{PLAN.price}/mo
            </Link>
          )}
          {isSubscriber && live && (
            <p className="copy">{drop.name} is assigned to active members while boxes remain.</p>
          )}
          {!live && upcoming && drop.releaseDate > new Date().toISOString().slice(0, 10) && (
            <p className="copy">Not released yet. Club members receive it when the month opens.</p>
          )}
          <div className="shapes" style={{ marginTop: 24 }}>
            {drop.shapes.map((s) => (
              <Shape key={s} type={s} color={color?.hex} />
            ))}
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <ReviewList productId={drop.id} />
      </div>
    </main>
  )
}
