import { useParams } from "react-router-dom";
import { getBookDetails, purchaseBooks } from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar";

export default function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: book, loading, error } =
    useFetch(() => getBookDetails(id), [id]);

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

  // Ajusta el nombre del campo si tu API usa otro
  const imageUrl = book.image || book.cover || book.imageUrl;

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "2rem",
          display: "flex",
          gap: "2rem",
        }}
      >
        {/* IMAGEN */}
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

        {/* INFO */}
        <div>
          <h1>{book.title}</h1>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Año:</strong> {book.year}</p>
          <p><strong>Precio:</strong> {book.price} €</p>
          <p><strong>ISBN:</strong> {book.ISBN}</p>
          <p><strong>Categoría:</strong> {book.category}</p>

          <button onClick={handlePurchase}>
            Comprar libro
          </button>
        </div>
      </div>
    </div>
  );
}
