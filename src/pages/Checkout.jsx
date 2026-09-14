import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  if (done) {
    return (
      <main className="wrap ok">
        <p className="label">Order placed</p>
        <h1>You’re in the beam.</h1>
        <p style={{ color: 'var(--muted)' }}>A confirmation is on its way. Packs ship within two days.</p>
        <Link className="btn btn-dark" to="/shop" style={{ marginTop: 24 }}>
          Back to shop
        </Link>
      </main>
    )
  }

  if (!items.length) {
    return (
      <main className="wrap section">
        <h1 className="display">Your bag is empty.</h1>
        <button className="btn btn-dark" type="button" onClick={() => navigate('/shop')}>
          Shop packs
        </button>
      </main>
    )
  }

  return (
    <main className="wrap checkout">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          clear()
          setDone(true)
        }}
      >
        <p className="label">Checkout</p>
        <h1 className="display">Details.</h1>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label>
            City
            <input required name="city" autoComplete="address-level2" />
          </label>
          <label>
            Postcode
            <input required name="postcode" autoComplete="postal-code" />
          </label>
        </div>
        <button className="btn btn-dark" type="submit" style={{ marginTop: 12 }}>
          Place order — €{total}
        </button>
      </form>
      <aside className="summary">
        <h2 style={{ marginTop: 0, fontSize: 16, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Bag</h2>
        {items.map((i) => (
          <div key={i.lineId} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
            <span>
              {i.name} × {i.qty}
              <br />
              <small style={{ color: 'var(--muted)' }}>{i.colorName} · {i.finish}</small>
            </span>
            <span>€{i.price * i.qty}</span>
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
