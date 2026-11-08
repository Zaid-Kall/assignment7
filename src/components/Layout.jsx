import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Layout() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2026 Online Shop</p>
      </footer>
    </div>
  );
}