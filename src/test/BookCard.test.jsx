import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookCard from "../components/BookCard";
import userEvent from "@testing-library/user-event";

const mockBook = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  year: 2023,
  category: "Fiction",
  price: 19.99,
  cover: "https://example.com/cover.jpg",
};

const renderBookCard = (book = mockBook) => {
  return render(
    <BrowserRouter>
      <BookCard book={book} />
    </BrowserRouter>
  );
};

describe("BookCard Component", () => {
  test("renders book title", () => {
    renderBookCard();
    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });

  test("renders book author", () => {
    renderBookCard();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  test("renders book year and category", () => {
    renderBookCard();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
    expect(screen.getByText(/Fiction/)).toBeInTheDocument();
  });

  test("renders price when it is a number", () => {
    renderBookCard();
    expect(screen.getByText("19.99 €")).toBeInTheDocument();
  });

  test("renders acquired message when price is not a number", () => {
    const bookWithoutPrice = { ...mockBook, price: "acquired" };
    renderBookCard(bookWithoutPrice);
    expect(screen.getByText("Ya adquirido")).toBeInTheDocument();
  });

  test("renders link to book detail page", () => {
    renderBookCard();
    const link = screen.getByRole("link", { name: /Ver detalle/i });
    expect(link).toHaveAttribute("href", "/bookstore/1");
  });

  test("renders book cover image with correct alt text", () => {
    renderBookCard();
    const img = screen.getByAltText("Test Book");
    expect(img).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  test("applies hover effect on mouse enter", async () => {
    const { container } = renderBookCard();
    const cardDiv = container.firstChild;

    await userEvent.hover(cardDiv);
    expect(cardDiv).toHaveStyle("transform: translateY(-5px)");
  });

  test("removes hover effect on mouse leave", async () => {
    const { container } = renderBookCard();
    const cardDiv = container.firstChild;

    await userEvent.hover(cardDiv);
    await userEvent.unhover(cardDiv);
    expect(cardDiv).toHaveStyle("transform: translateY(0)");
  });
});