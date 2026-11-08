import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <Link to="/">Back to home</Link>
    </div>
  );
}