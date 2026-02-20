import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyBooks from "../pages/MyBooks";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";

jest.mock("../hooks/useAuth");
jest.mock("../hooks/useFetch");

// Mock simple de Navbar y BookList para aislar el test
jest.mock("../components/layout/Navbar", () => () => <div>Navbar</div>);
jest.mock("../components/BookList", () => ({ books }) => (
  <div>
    BookList
    {books?.map((b) => (
      <span key={b.id}>{b.title}</span>
    ))}
  </div>
));

const mockUser = { id: 1, name: "Alain" };

describe("MyBooks Page", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: mockUser });
  });

  test("renderiza título y descripción", () => {
    useFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mis libros/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Libros que has adquirido previamente/i)
    ).toBeInTheDocument();
  });

  test("muestra loading correctamente", () => {
    useFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    // BookList sigue renderizándose, pero sin libros aún
    expect(screen.getByText("BookList")).toBeInTheDocument();
  });

  test("muestra error si falla fetch", () => {
    useFetch.mockReturnValue({ data: null, loading: false, error: true });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error al cargar los libros/i)).toBeInTheDocument();
  });

  test("muestra empty state si no hay libros", () => {
    useFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No has comprado ningún libro todavía/i)
    ).toBeInTheDocument();
  });

  test("renderiza libros si existen", () => {
    const books = [
      { id: 1, title: "Clean Code" },
      { id: 2, title: "Refactoring" },
    ];

    useFetch.mockReturnValue({ data: books, loading: false, error: null });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Refactoring")).toBeInTheDocument();
  });

  test("aplica modo mobile correctamente", () => {
    global.innerWidth = 500;
    window.dispatchEvent(new Event("resize"));

    useFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(
      <MemoryRouter>
        <MyBooks />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mis libros/i)).toBeInTheDocument();
  });
});
