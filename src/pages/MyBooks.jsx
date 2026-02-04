import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { getUserPurchases } from "../api/fetch";
import Navbar from "../components/layout/Navbar";
import BookList from "../components/BookList";
import { useCallback } from "react";

export default function MyBooks() {
  const { user } = useAuth();

  const fetchBooks = useCallback(() => getUserPurchases(user.id), [user.id]);

  const { data: books, loading, error } = useFetch(fetchBooks, [fetchBooks]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
        }}
      >
        {/* CABECERA */}
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ marginBottom: "0.5rem" }}>📚 Mis libros</h1>
          <p style={{ color: "#666", fontSize: "1rem" }}>
            Libros que has adquirido previamente en la librería universitaria
          </p>
        </header>

        {/* ESTADOS */}
        {error && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#ffe5e5",
              color: "#b00020",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          >
            Error al cargar los libros
          </div>
        )}

        {!loading && books?.length === 0 && (
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              textAlign: "center",
              color: "#555",
            }}
          >
            No has comprado ningún libro todavía 📭
          </div>
        )}

        {/* LISTA */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
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
