import { useParams } from "react-router-dom";
import { getBookDetails, purchaseBooks } from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar";
import { useCallback } from "react";

export default function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const fetchBook = useCallback(() => getBookDetails(id), [id]);
  const { data: book, loading, error } = useFetch(fetchBook, [fetchBook]);

  const handlePurchase = async () => {
    try {
      await purchaseBooks({
        userId: user.id,
        bookId: [book.id],
      });
      alert("Libro comprado correctamente");
    } catch {
      alert("Error al realizar la compra");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Cargando libro...</p>;
  if (error) return <p style={{ padding: "2rem" }}>Error: {error}</p>;
  if (!book) return null;

  const imageUrl = book.image || book.cover || book.imageUrl;

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(1rem, 4vw, 2.5rem)",
        }}
      >
        {/* CONTENEDOR PRINCIPAL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            background: "white",
            padding: "clamp(1.2rem, 4vw, 2rem)",
            borderRadius: "14px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
          className="book-detail-container"
        >
          {/* IMAGEN */}
          <div style={{ textAlign: "center" }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={book.title}
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "220px",
                  height: "320px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                Sin imagen
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}>
              {book.title}
            </h1>

            <div style={{ lineHeight: "1.9", color: "#555" }}>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Año:</strong> {book.year}</p>
              <p><strong>ISBN:</strong> {book.ISBN}</p>
              <p><strong>Categoría:</strong> {book.category}</p>

              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                {book.price} €
              </p>
            </div>

            <button
              onClick={handlePurchase}
              style={{
                marginTop: "1.5rem",
                padding: "0.8rem 1.6rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                width: "100%",
                maxWidth: "260px",
              }}
            >
              Comprar libro
            </button>
          </div>
        </div>
      </div>

      {/* MEDIA QUERY SOLO PARA DESKTOP */}
      <style>
        {`
          @media (min-width: 768px) {
            .book-detail-container {
              flex-direction: row;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
}
