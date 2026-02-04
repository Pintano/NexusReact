import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    gap: "1.5rem",
    padding: "1rem 2rem",
    backgroundColor: "#282c34",
    color: "white",
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ margin: 0 }}>Nexus</h2>
      <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/bookstore" style={linkStyle}>Bookstore</Link>
        <Link to="/my-books"style={linkStyle}> Mis libros</Link>
        <Link to="/coworking" style={linkStyle}>Coworking</Link>
      </div>
    </nav>
  );
}
