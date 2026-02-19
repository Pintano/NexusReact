import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
      <div className="book-card" style={{

        width: "220px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        backgroundColor: "#fff",
        marginBottom: "1.5rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      <img
        src={book.cover}
        alt={book.title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />

      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333", fontSize: "1.1rem" }}>
          {book.title}
        </h3>
        <p style={{ margin: "0.25rem 0", color: "#555" }}>
          <strong>Autor:</strong> {book.author}
        </p>
        <p style={{ margin: "0.25rem 0", color: "#555" }}>
          <strong>Año:</strong> {book.year} | <strong>Categoría:</strong> {book.category}
        </p>
        {typeof book.price === "number" ? (
          <p style={{ fontWeight: "bold" }}>
            {book.price.toFixed(2)} €
          </p>
        ) : (
          <p style={{ fontStyle: "italic", color: "#777" }}>
            Ya adquirido
          </p>
        )}

        <Link
          to={`/bookstore/${book.id}`}
          style={{
            display: "inline-block",
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
