import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookList from "../components/BookList";

const books = [
  { id: 1, title: "Book 1", author: "A", year: 2020, category: "Tech", price: 10, cover: "" },
  { id: 2, title: "Book 2", author: "B", year: 2021, category: "Tech", price: 20, cover: "" },
];

describe("BookList", () => {
  test("renderiza mensaje si no hay libros", () => {
    render(<BookList books={[]} />);
    expect(screen.getByText(/No hay libros/)).toBeInTheDocument();
  });

  test("renderiza libros", () => {
    render(
      <MemoryRouter>
        <BookList books={books} />
      </MemoryRouter>
    );

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });
});
