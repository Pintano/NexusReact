import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { getUserPurchases } from "../api/fetch";
import Navbar from "../components/layout/Navbar";
import BookList from "../components/BookList";
import { useCallback, useEffect, useState } from "react";

export default function MyBooks() {
  const { user } = useAuth();

  const fetchBooks = useCallback(() => getUserPurchases(user.id), [user.id]);
  const { data: books, loading, error } = useFetch(fetchBooks, [fetchBooks]);

  // 👇 Detectar tamaño pantalla
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <Navbar />

      <div
        className="page-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "1.5rem 1rem" : "2.5rem 2rem",
        }}
      >
        {/* HEADER */}
        <header style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}>
          <h1
            style={{
              marginBottom: "0.5rem",
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            }}
          >
            📚 Mis libros
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "clamp(0.95rem, 3vw, 1rem)",
              lineHeight: "1.4",
            }}
          >
            Libros que has adquirido previamente en la librería universitaria
          </p>
        </header>

        {/* ERROR */}
        {error && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#ffe5e5",
              color: "#b00020",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
            }}
          >
            Error al cargar los libros
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && books?.length === 0 && (
          <div
            style={{
              padding: isMobile ? "1.2rem" : "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              textAlign: "center",
              color: "#555",
              fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
            }}
          >
            No has comprado ningún libro todavía 📭
          </div>
        )}

        {/* LISTA LIBROS */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: isMobile ? "1.2rem" : "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <BookList books={books} loading={loading} />
        </div>
      </div>
    </div>
  );
}
