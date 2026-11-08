import { fetchProducts } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const { loading, error, data } = useFetch(fetchProducts, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (data.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}