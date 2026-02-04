import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p>No hay libros para mostrar</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
