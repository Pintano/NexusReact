import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      id: 1,
      name,
      email,
    };

    login(userData);
    navigate("/bookstore");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f6f8",
        padding: "20px" // 👈 evita que se pegue a bordes en móvil
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "clamp(1.5rem, 4vw, 2.5rem)", // 👈 responsive padding
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
            fontSize: "clamp(1.8rem, 5vw, 2.4rem)", // 👈 responsive font
          }}
        >
          Nexus
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#666",
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
          }}
        >
          Accede a la librería y al co-working
        </p>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem" }}>
              Nombre
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem", // 👈 mejor en móvil
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1.8rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.9rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
