import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { COLORS, getColor, getProduct } from '../data/products.js'
import { Shape } from '../components/Shape.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [color, setColor] = useState(product?.color || 'lime')
  const [finish, setFinish] = useState('stick')
  const [qty, setQty] = useState(1)
  const [shot, setShot] = useState(0)
  const [night, setNight] = useState(false)

  const hex = useMemo(() => getColor(color)?.hex || '#c8ff3d', [color])
  const colorName = getColor(color)?.name || color

  if (!product) {
    return (
      <main className="wrap section">
        <p>This pack isn’t here.</p>
        <Link to="/shop">Back to shop</Link>
      </main>
    )
  }

  return (
    <main className="wrap pdp">
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
        <p className="label">{product.subtitle}</p>
        <h1>{product.name}</h1>
        <p className="price">€{product.price}</p>
        <p>{product.description}</p>

        <span className="option-label">Colour</span>
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
          <button type="button" onClick={() => setQty((n) => n + 1)}>+</button>
        </div>

        <button
          className="btn btn-dark btn-full"
          style={{ marginTop: 24 }}
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              color,
              colorName,
              finish,
              qty,
            })
          }
        >
          Add to bag — €{product.price * qty}
        </button>

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
    </main>
  )
}
