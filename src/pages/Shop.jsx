import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COLORS, products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { PLAN } from '../data/plan.js'
import { Link } from 'react-router-dom'

const TYPES = [
  { id: 'all', label: 'All' },
  { id: 'limited', label: 'Limited editions' },
  { id: 'colour', label: 'Club colours' },
  { id: 'shape', label: 'Shape sets' },
  { id: 'kit', label: 'Kits' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const colorParam = params.get('color') || 'all'
  const typeParam = params.get('type')
  const [type, setType] = useState(typeParam || 'all')
  const { stockOf } = useStore()

  useEffect(() => {
    if (typeParam) setType(typeParam)
  }, [typeParam])

  const list = useMemo(() => {
    return products.filter((p) => {
      if (type !== 'all' && p.type !== type) return false
      if (colorParam !== 'all' && p.color !== colorParam) return false
      return true
    })
  }, [type, colorParam])

  const setColor = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('color')
    else next.set('color', id)
    setParams(next)
  }

  const setTypeFilter = (id) => {
    setType(id)
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('type')
    else next.set('type', id)
    setParams(next)
  }

  return (
    <main className="section" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="label">Shop</p>
        <h1 className="display" style={{ marginBottom: 12 }}>The collection.</h1>
        <p className="copy" style={{ maxWidth: 560, marginBottom: 28 }}>
          Colour and shape live in the club — €{PLAN.price} a month, a new exclusive every cycle. Limited editions are separate runs with real remaining stock. When they hit zero, they stay gone.
        </p>
        <div className="filters">
          {TYPES.map((t) => (
            <button key={t.id} className={`chip ${type === t.id ? 'on' : ''}`} type="button" onClick={() => setTypeFilter(t.id)}>
              {t.label}
            </button>
          ))}
          <button className={`chip ${colorParam === 'all' ? 'on' : ''}`} type="button" onClick={() => setColor('all')}>
            All colours
          </button>
          {COLORS.map((c) => (
            <button
              key={c.id}
              className={`chip ${colorParam === c.id ? 'on' : ''}`}
              type="button"
              onClick={() => setColor(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="grid-products">
          {list.map((p) => (
            <ProductCard
              key={p.id}
              product={p.type === 'limited' ? p : { ...p, priceLabel: 'Club' }}
              stock={stockOf(p.id)}
            />
          ))}
        </div>
        <p className="copy" style={{ marginTop: 36 }}>
          Want the monthly colour instead of a one-off? <Link to="/club">Join PATCHED. Club</Link>.
        </p>
      </div>
    </main>
  )
}
