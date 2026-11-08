import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch({ type: "LOGGED_OUT" });
    navigate("/");
  }

  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>
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