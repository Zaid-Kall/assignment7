const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(signal) {
  const res = await fetch(`${BASE_URL}/products?limit=100`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to load products (status ${res.status})`);
  }
  const data = await res.json();
  return data.products;
}

export async function fetchProduct(id, signal) {
  const res = await fetch(`${BASE_URL}/products/${id}`, { signal });
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? "Product not found"
        : `Failed to load product (status ${res.status})`
    );
  }
  return res.json();
}