import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COLORS, products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const TYPES = [
  { id: 'all', label: 'All' },
  { id: 'colour', label: 'Colour packs' },
  { id: 'shape', label: 'Shape sets' },
  { id: 'kit', label: 'Kits' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const colorParam = params.get('color') || 'all'
  const [type, setType] = useState('all')

  const list = useMemo(() => {
    return products.filter((p) => {
      if (type !== 'all' && p.type !== type) return false
      if (colorParam !== 'all' && p.type === 'colour' && p.color !== colorParam) return false
      return true
    })
  }, [type, colorParam])

  const setColor = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('color')
    else next.set('color', id)
    setParams(next)
  }

  return (
    <main className="section" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="label">Shop</p>
        <h1 className="display" style={{ marginBottom: 28 }}>The collection.</h1>
        <div className="filters">
          {TYPES.map((t) => (
            <button key={t.id} className={`chip ${type === t.id ? 'on' : ''}`} type="button" onClick={() => setType(t.id)}>
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
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  )
}
