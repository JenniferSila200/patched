import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link className="card" to={`/product/${product.id}`}>
      <div className="card-media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="card-meta">
        <div>
          <h3>{product.name}</h3>
          <p className="sub">{product.subtitle}</p>
        </div>
        <div className="price">€{product.price}</div>
      </div>
    </Link>
  )
}
