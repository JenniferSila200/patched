import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { COLORS, getColor, getProduct } from '../data/products.js'
import { Shape } from '../components/Shape.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { PLAN, formatDay } from '../data/plan.js'
import ReviewList from '../components/ReviewList.jsx'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const { stockOf, canAccessLimited, isSubscriber } = useStore()
  const [color, setColor] = useState(product?.color || 'lime')
  const [finish, setFinish] = useState(product?.type === 'limited' && product.color === 'pink' ? 'stick' : 'iron-on')
  const [qty, setQty] = useState(1)
  const [shot, setShot] = useState(0)
  const [night, setNight] = useState(false)

  const hex = useMemo(() => getColor(color)?.hex || '#c8ff3d', [color])
  const colorName = getColor(color)?.name || color
  const stock = product ? stockOf(product.id) : null
  const limited = product?.type === 'limited'
  const earlyOpen = product ? canAccessLimited(product) : true
  const maxQty = limited ? Math.max(0, stock ?? 0) : qty

  if (!product) {
    return (
      <main className="wrap section">
        <p>This pack isn’t here.</p>
        <Link to="/shop">Back to shop</Link>
      </main>
    )
  }

  const addLimited = () => {
    if (!limited || !earlyOpen || !stock) return
    addItem({
      id: product.id,
      kind: 'limited',
      name: product.name,
      image: product.image,
      price: product.price,
      color: product.color,
      colorName: getColor(product.color)?.name,
      finish,
      qty: Math.min(qty, stock),
      maxQty: stock,
    })
  }

  return (
    <main>
      <div className="wrap pdp">
        <div className="gallery">
          <div className="main">
            <img src={product.gallery[shot]} alt={product.name} />
          </div>
          <div className="thumbs">
            {product.gallery.map((src, i) => (
              <button key={src} type="button" className={shot === i ? 'on' : ''} onClick={() => setShot(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="pdp-info">
          <p className="label">{limited ? 'Limited edition' : product.subtitle}</p>
          <h1>{product.name}</h1>
          {limited ? (
            <p className="price">€{product.price}</p>
          ) : (
            <p className="price">In the club · €{PLAN.price}/mo</p>
          )}
          <p>{product.description}</p>

          {limited && (
            <p className="copy">
              {stock === 0
                ? 'Sold out. Once it’s gone, it’s gone.'
                : `${stock} / ${product.stockInitial} remaining.${stock <= 10 ? ` Only ${stock} left.` : ''} Once it’s gone, it’s gone.`}
            </p>
          )}

          {limited && product.earlyAccessUntil && !earlyOpen && (
            <p className="copy">
              Early access for club members until {formatDay(product.earlyAccessUntil)}. Public window opens after that, if any remain.
            </p>
          )}
          {limited && product.earlyAccessUntil && earlyOpen && isSubscriber && new Date() < new Date(product.earlyAccessUntil + 'T23:59:59') && (
            <p className="copy">Club early access is open on this run.</p>
          )}

          {!limited && (
            <>
              <span className="option-label">Colour language</span>
              <div className="color-row">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`dot ${color === c.id ? 'on' : ''}`}
                    style={{ background: c.hex }}
                    aria-label={c.name}
                    onClick={() => setColor(c.id)}
                  />
                ))}
              </div>
              <Link className="btn btn-dark btn-full" style={{ marginTop: 24 }} to="/club">
                Get it in the club — €{PLAN.price}/mo
              </Link>
            </>
          )}

          {limited && (
            <>
              <span className="option-label">Finish</span>
              <div className="finish-row">
                <button type="button" className={`finish ${finish === 'stick' ? 'on' : ''}`} onClick={() => setFinish('stick')}>
                  Stick
                </button>
                <button type="button" className={`finish ${finish === 'iron-on' ? 'on' : ''}`} onClick={() => setFinish('iron-on')}>
                  Iron on
                </button>
              </div>
              <span className="option-label">Quantity</span>
              <div className="qty">
                <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((n) => Math.min(n + 1, Math.max(1, maxQty || 1)))}>+</button>
              </div>
              <button
                className="btn btn-dark btn-full"
                style={{ marginTop: 24 }}
                type="button"
                disabled={!stock || !earlyOpen}
                onClick={addLimited}
              >
                {!earlyOpen
                  ? 'Early access — members only'
                  : stock === 0
                    ? 'Sold out'
                    : `Add to bag — €${product.price * Math.min(qty, stock)}`}
              </button>
            </>
          )}

          <div className={`preview ${night ? 'night' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="option-label" style={{ margin: 0 }}>In the beam</span>
              <div className="toggle">
                <button type="button" className={!night ? 'on' : ''} onClick={() => setNight(false)}>Day</button>
                <button type="button" className={night ? 'on' : ''} onClick={() => setNight(true)}>Night</button>
              </div>
            </div>
            <div className="shapes">
              {product.shapes.map((s) => (
                <Shape key={s} type={s} color={night ? '#f4f4f0' : hex} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <ReviewList productId={product.id} />
      </div>
    </main>
  )
}
