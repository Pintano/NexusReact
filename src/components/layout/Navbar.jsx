import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar resize para responsive real
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 1.5rem",
    backgroundColor: "#282c34",
    color: "white",
  };

  const topBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const linksContainer = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "1rem",
    marginTop: isMobile ? (menuOpen ? "1rem" : "0") : "0",
    alignItems: isMobile ? "flex-start" : "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "15px",
  };

  const hamburgerStyle = {
    fontSize: "1.8rem",
    cursor: "pointer",
    display: isMobile ? "block" : "none",
  };

  return (
    <nav style={navStyle}>
      {/* Barra superior */}
      <div style={topBarStyle}>
        <h2 style={{ margin: 0 }}>Nexus</h2>

        {/* Botón hamburguesa */}
        <div
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Links */}
      {(!isMobile || menuOpen) && (
        <div style={linksContainer}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/bookstore" style={linkStyle}>Bookstore</Link>
          <Link to="/my-books" style={linkStyle}>Mis libros</Link>
          <Link to="/coworking" style={linkStyle}>Coworking</Link>
        </div>
      )}
    </nav>
  );
}
