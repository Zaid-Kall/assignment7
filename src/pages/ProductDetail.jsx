import { Link, useNavigate, useParams } from "react-router";
import { fetchProduct } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data: product } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const nextId = Number(id) + 1;

  return (
    <div>
      <button onClick={() => navigate("/products")}>Back</button>

      {loading && <p>Loading product...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error === "Product not found"
            ? `Product #${id} was not found.`
            : `Error: ${error}`}
        </p>
      )}

      {product && (
        <div>
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} width="200" />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      )}

      <p>
        <Link to={`/products/${nextId}`}>Next product</Link>
      </p>
    </div>
  );
}