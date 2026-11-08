import { Link } from "react-router";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.title}</span>
            <span>${item.price}</span>
            <span>
              <button onClick={() => setQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              {" "}{item.quantity}{" "}
              <button onClick={() => setQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={clear}>Clear cart</button>
    </div>
  );
}