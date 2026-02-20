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
    // Basic validation: do not submit empty name or email
    if (!name || !name.trim() || !email || !email.trim()) return;

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
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "min(420px, 96%)",
          padding: "clamp(1rem, 4vw, 2rem)",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          boxSizing: "border-box",
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
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
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.4rem" }}>
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1.8rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.4rem" }}>
              Email
            </label>
            <input
              id="email"
              name="email"
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
                boxSizing: "border-box",
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
              boxSizing: "border-box",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
