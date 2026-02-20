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
        gap: "clamp(1rem, 3vw, 1.6rem)",
      }}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
