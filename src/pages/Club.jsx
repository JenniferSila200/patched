import { Link } from 'react-router-dom'
import { PLAN } from '../data/plan.js'
import { getArchiveDrops, getCurrentDrop, getUpcomingDrop } from '../data/drops.js'
import { getColor } from '../data/products.js'
import { formatMonth } from '../data/plan.js'
import { useCart } from '../context/CartContext.jsx'
import { useStore } from '../context/StoreContext.jsx'

export default function Club() {
  const { addItem, hasSubscriptionItem } = useCart()
  const { isSubscriber, subscription } = useStore()
  const drop = getCurrentDrop()
  const upcoming = getUpcomingDrop()
  const archive = getArchiveDrops()

  const addPlan = () => {
    addItem({
      kind: 'subscription',
      id: PLAN.id,
      name: PLAN.name,
      image: drop?.images[0] || '/images/pack-lime.jpg',
      price: PLAN.price,
      qty: 1,
      lineId: 'subscription',
    })
  }

  return (
    <main className="section" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="label">PATCHED. Club</p>
        <h1 className="display">A relationship with the night.</h1>
        <p className="copy" style={{ maxWidth: 580 }}>
          €{PLAN.price} / month. Cancel when you want. The club is how PATCHED. stays a lifestyle, not a one-off pack in a drawer — a new exclusive colour, a new set, and a door into limited runs.
        </p>
        <p className="price" style={{ fontSize: 28, margin: '12px 0 28px' }}>€{PLAN.price} / month</p>
        {isSubscriber ? (
          <Link className="btn btn-dark" to="/account">Manage membership</Link>
        ) : (
          <button className="btn btn-dark" type="button" onClick={addPlan} disabled={hasSubscriptionItem}>
            {hasSubscriptionItem ? 'Club is in your bag' : `Start membership — €${PLAN.price}/mo`}
          </button>
        )}
      </div>
      <div className="wrap" style={{ marginTop: 56 }}>
        <p className="label">Included</p>
        <div className="steps two">
          {PLAN.includes.map((line) => (
            <article className="step" key={line}>
              <h3>{line.split(' ').slice(0, 4).join(' ')}</h3>
              <p>{line}</p>
            </article>
          ))}
        </div>
      </div>
      {drop && (
        <div className="wrap split" style={{ marginTop: 72 }}>
          <img src={drop.images[2] || drop.images[0]} alt={drop.name} />
          <div>
            <p className="label">This month</p>
            <h2 className="display">{drop.name}</h2>
            <p className="copy">
              {getColor(drop.color)?.name} · {drop.stickerSet}. {drop.description}
            </p>
            {upcoming && (
              <p className="copy">
                Stay for {upcoming.name} in {formatMonth(upcoming.releaseDate)}. Membership is the through-line.
              </p>
            )}
            <Link className="btn btn-ghost" to="/drops" style={{ color: 'var(--ink)', borderColor: 'var(--ink)', marginTop: 16 }}>
              Drop archive
            </Link>
          </div>
        </div>
      )}
      {archive.length > 0 && (
        <div className="wrap" style={{ marginTop: 56 }}>
          <p className="label">Already sent</p>
          <p className="copy">
            {archive.map((d) => d.name).join(' · ')}
            {subscription?.assignedDropId ? ` · Your first box: ${subscription.assignedDropId}` : ''}
          </p>
        </div>
      )}
    </main>
  )
}
