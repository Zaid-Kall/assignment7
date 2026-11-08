import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";

export default function NavBar() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  function handleLogout() {
    dispatch({ type: "LOGGED_OUT" });
    navigate("/");
  }

  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart ({itemCount})</NavLink>
      {user ? (
        <>
          <span>{user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}