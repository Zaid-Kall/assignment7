import { Outlet } from "react-router";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2026 Online Shop</p>
      </footer>
    </div>
  );
}