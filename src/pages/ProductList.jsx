import { useSearchParams } from "react-router";
import { fetchProducts } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const { loading, error, data } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const categories = [...new Set(data.map((p) => p.category))].sort();

  const filtered = data.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) &&
      (category === "" || p.category === category)
  );

  return (
    <div>
      <h1>Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={q}
          onChange={(e) => updateParam("q", e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}