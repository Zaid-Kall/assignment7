import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} width="120" height="120" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <Link to={`/products/${product.id}`}>View details</Link>
    </div>
  );
}