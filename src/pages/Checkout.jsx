import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { PLAN, formatDay } from '../data/plan.js'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const { subscribe, decrementStock, isSubscriber, stockOf } = useStore()
  const [done, setDone] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const subItem = items.find((i) => i.kind === 'subscription')
  const limitedItems = items.filter((i) => i.kind === 'limited')

  if (done) {
    return (
      <main className="wrap ok">
        <p className="label">{done === 'club' ? 'You’re in the club' : 'Order placed'}</p>
        <h1>You’re in the beam.</h1>
        <p className="copy">
          {done === 'club'
            ? 'Membership is active. This month’s exclusive ships with the next club box while stock remains. Manage or cancel anytime in Account.'
            : 'Limited pieces are packed from remaining inventory. A note is on its way.'}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          {done === 'club' && <Link className="btn btn-dark" to="/account">Manage membership</Link>}
          <Link className="btn btn-ghost" to="/drops" style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
            See the drop
          </Link>
        </div>
      </main>
    )
  }

  if (!items.length) {
    return (
      <main className="wrap section">
        <h1 className="display">Your bag is empty.</h1>
        <button className="btn btn-dark" type="button" onClick={() => navigate('/club')}>
          Join the club
        </button>
      </main>
    )
  }

  return (
    <main className="wrap checkout">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setError('')
          for (const item of limitedItems) {
            const left = stockOf(item.id)
            if (left == null || left < item.qty) {
              setError(`${item.name} no longer has ${item.qty} in stock.`)
              return
            }
          }
          if (subItem && isSubscriber) {
            setError('This email is already on an active membership. Manage it in Account.')
            return
          }
          const data = Object.fromEntries(new FormData(e.target))
          if (subItem) {
            subscribe({
              name: data.name,
              email: data.email,
              address: data.address,
              city: data.city,
              postcode: data.postcode,
            })
          }
          limitedItems.forEach((item) => decrementStock(item.id, item.qty))
          clear()
          setDone(subItem ? 'club' : 'order')
        }}
      >
        <p className="label">Checkout</p>
        <h1 className="display">{subItem ? 'Join the club.' : 'Details.'}</h1>
        {subItem && (
          <p className="copy">
            PATCHED. Club is €{PLAN.price} / month. You can view, pause by cancelling, or leave from Account after this step.
          </p>
        )}
        <label>
          Name
          <input required name="name" autoComplete="name" />
        </label>
        <label>
          Email
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <label>
          Address
          <input required name="address" autoComplete="street-address" />
        </label>
        <div className="form-row">
          <label>
            City
            <input required name="city" autoComplete="address-level2" />
          </label>
          <label>
            Postcode
            <input required name="postcode" autoComplete="postal-code" />
          </label>
        </div>
        {error && <p className="copy">{error}</p>}
        <button className="btn btn-dark" type="submit" style={{ marginTop: 12 }}>
          {subItem ? `Start membership — €${total}` : `Place order — €${total}`}
        </button>
      </form>
      <aside className="summary">
        <h2 style={{ marginTop: 0, fontSize: 16, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Bag</h2>
        {items.map((i) => (
          <div key={i.lineId} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
            <span>
              {i.name} {i.kind === 'subscription' ? '' : `× ${i.qty}`}
              <br />
              <small style={{ color: 'var(--muted)' }}>
                {i.kind === 'subscription' ? `Billed monthly · next ${formatDay(new Date())}` : `${i.colorName} · ${i.finish}`}
              </small>
            </span>
            <span>{i.kind === 'subscription' ? `€${i.price}/mo` : `€${i.price * i.qty}`}</span>
          </div>
        ))}
        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>Total</strong>
          <strong>€{total}</strong>
        </p>
      </aside>
    </main>
  )
}
