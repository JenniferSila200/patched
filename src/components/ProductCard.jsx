import { Link } from 'react-router-dom'

export default function ProductCard({ product, stock, href }) {
  const limited = product.type === 'limited'
  const soldOut = limited && stock === 0
  const to = href || `/product/${product.id}`

  return (
    <Link className="card" to={to}>
      <div className="card-media">
        <img src={product.image} alt={product.name} />
        {limited && <span className="badge">Limited edition</span>}
        {soldOut && <span className="badge badge-bottom">Sold out</span>}
        {limited && stock > 0 && stock <= 10 && (
          <span className="badge badge-bottom">Only {stock} left</span>
        )}
      </div>
      <div className="card-meta">
        <div>
          <h3>{product.name}</h3>
          <p className="sub">{product.subtitle}</p>
          {limited && stock != null && (
            <p className="sub">{stock} / {product.stockInitial} remaining</p>
          )}
        </div>
        <div className="price">{product.priceLabel || `€${product.price}`}</div>
      </div>
    </Link>
  )
}
