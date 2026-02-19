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

  if (loading) return <p>Cargando libro...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return null;

  const imageUrl = book.image || book.cover || book.imageUrl;

  return (
    <div>
      <Navbar />

      <div className="flex-row page-container">

        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={book.title}
              style={{
                width: "250px",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
          ) : (
            <div
              style={{
                width: "250px",
                height: "350px",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Sin imagen
            </div>
          )}
        </div>

        <div>
          <h1>{book.title}</h1>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Año:</strong> {book.year}</p>
          <p><strong>Precio:</strong> {book.price} €</p>
          <p><strong>ISBN:</strong> {book.ISBN}</p>
          <p><strong>Categoría:</strong> {book.category}</p>

          <button
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1.2rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handlePurchase}
          >
            Comprar libro
          </button>
        </div>
      </div>
    </div>
  );
}
