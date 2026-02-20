import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Bookstore from "../pages/Bookstore";
import * as fetchApi from "../api/fetch";
import { useFetch } from "../hooks/useFetch";

jest.mock("../api/fetch");
jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  useFetch: jest.fn(),
}));
jest.mock("../components/layout/Navbar", () => ({
  __esModule: true,
  default: () => <div>Navbar</div>,
}));
jest.mock("../components/BookList", () => ({
  __esModule: true,
  default: ({ books, loading }) => (
    <div>
      {loading ? <p>Loading books...</p> : <p>Books: {books?.length}</p>}
    </div>
  ),
}));

describe("Bookstore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Navbar component", () => {
    useFetch.mockImplementation((fn, deps) => ({
      data: [],
      loading: false,
    }));

    render(<Bookstore />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  it("displays top books when no category is selected", async () => {
    const mockBooks = [
      { id: 1, title: "Book 1" },
      { id: 2, title: "Book 2" },
    ];

    useFetch.mockImplementation((fn, deps) => {
      if (deps?.includes && deps.length === 0) {
        return { data: mockBooks, loading: false };
      }
      return { data: [], loading: false };
    });

    render(<Bookstore />);
    await waitFor(() => {
      expect(
        screen.getByText("Top 10 libros más vendidos")
      ).toBeInTheDocument();
    });
  });

  it("loads categories on mount", () => {
    const mockCategories = [
      { id: 1, name: "Fiction" },
      { id: 2, name: "Science" },
    ];

    useFetch.mockImplementation((fn, deps) => ({
      data: mockCategories,
      loading: false,
    }));

    render(<Bookstore />);
    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Science")).toBeInTheDocument();
  });

  it("displays loading state for categories", () => {
    useFetch.mockImplementation(() => ({
      data: [],
      loading: true,
    }));

    render(<Bookstore />);
    expect(screen.getByText("Cargando categorías...")).toBeInTheDocument();
  });

  it("displays message when no categories available", () => {
    useFetch.mockImplementation(() => ({
      data: [],
      loading: false,
    }));

    render(<Bookstore />);
    expect(screen.getByText("No hay categorías")).toBeInTheDocument();
  });

  it("handles category selection", async () => {
    const mockCategories = [{ id: 1, name: "Fiction" }];
    useFetch.mockImplementation(() => ({
      data: mockCategories,
      loading: false,
    }));

    render(<Bookstore />);
    const categoryButton = screen.getByText("Fiction");

    fireEvent.click(categoryButton);
    await waitFor(() => {
      expect(screen.getByText("Libros de la categoría")).toBeInTheDocument();
    });
  });

  it("fetches category books when category is selected", async () => {
    const mockCategories = [{ id: 1, name: "Fiction" }];
    const mockCategoryBooks = [{ id: 1, title: "Fiction Book" }];

    useFetch.mockImplementation((fn, deps) => {
      if (deps?.length === 0)
        return { data: mockCategories, loading: false };
      return { data: mockCategoryBooks, loading: false };
    });

    render(<Bookstore />);
    fireEvent.click(screen.getByText("Fiction"));

    await waitFor(() => {
      expect(screen.getByText("Libros de la categoría")).toBeInTheDocument();
    });
  });
});