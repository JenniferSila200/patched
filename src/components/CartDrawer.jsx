import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function CartDrawer() {
  const { items, open, setOpen, updateQty, removeItem, total } = useCart()
  const navigate = useNavigate()

  if (!open) return null

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-label="Bag">
        <div className="drawer-head">
          <strong>Bag</strong>
          <button className="icon-btn" type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 && <p className="empty">Your bag is empty.</p>}
          {items.map((item) => (
            <div className="line" key={item.lineId}>
              <img src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <div className="sub" style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {item.kind === 'subscription' ? 'Monthly club' : `${item.colorName || ''} ${item.finish ? '· ' + item.finish : ''}`}
                </div>
                {item.kind !== 'subscription' && (
                  <div className="qty">
                    <button type="button" onClick={() => updateQty(item.lineId, item.qty - 1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.lineId, item.qty + 1)}>
                      +
                    </button>
                  </div>
                )}
              </div>
              <div>
                <div>{item.kind === 'subscription' ? `€${item.price} / mo` : `€${item.price * item.qty}`}</div>
                <button className="icon-btn" type="button" onClick={() => removeItem(item.lineId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="drawer-foot" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total</span>
            <strong>€{total}{items.some((i) => i.kind === 'subscription') ? ' + club' : ''}</strong>
          </div>
          <button
            className="btn btn-dark btn-full"
            type="button"
            disabled={!items.length}
            onClick={() => {
              setOpen(false)
              navigate('/checkout')
            }}
          >
            Checkout
          </button>
          <Link to="/shop" className="btn btn-ghost btn-full" onClick={() => setOpen(false)}>
            Continue
          </Link>
        </div>
      </aside>
    </>
  )
}
