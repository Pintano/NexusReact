import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Nexus
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            color: "#555",
          }}
        >
          Librería universitaria y espacio multifuncional que combina
          venta de libros, zonas de co-working y espacios para estudiar
          y colaborar.
        </p>

        {!isAuthenticated && (
          <Link to="/login">
            <button
              style={{
                marginTop: "2rem",
                padding: "0.8rem 2rem",
                fontSize: "1rem",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Acceder
            </button>
          </Link>
        )}
      </section>

      {/* SERVICIOS */}
      <section
        style={{
          padding: "3rem 2rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>📚 Librería</h3>
          <p>
            Descubre los libros más vendidos, filtra por categorías y
            adquiere tus lecturas universitarias.
          </p>
          {isAuthenticated && (
            <Link to="/bookstore">
              <button style={buttonStyle}>Ir a la librería</button>
            </Link>
          )}
        </div>

        <div style={cardStyle}>
          <h3>💻 Co-working</h3>
          <p>
            Reserva espacios de estudio y trabajo colaborativo dentro
            de la librería universitaria.
          </p>
          {isAuthenticated && (
            <Link to="/coworking">
              <button style={buttonStyle}>Ver espacios</button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

const cardStyle = {
  width: "300px",
  padding: "1.5rem",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.5rem 1.2rem",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
