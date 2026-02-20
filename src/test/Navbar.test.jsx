import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function renderNavbar(width = 1024) {
  global.innerWidth = width;
  window.dispatchEvent(new Event("resize"));

  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  test("renderiza título", () => {
    renderNavbar();
    expect(screen.getByText("Nexus")).toBeInTheDocument();
  });

  test("muestra links en desktop", () => {
    renderNavbar(1200);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Bookstore")).toBeInTheDocument();
  });

  test("hamburguesa en móvil", () => {
    renderNavbar(500);
    const burger = screen.getByText("☰");
    expect(burger).toBeInTheDocument();

    fireEvent.click(burger);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });
});
