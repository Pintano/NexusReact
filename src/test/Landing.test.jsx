// Mock Navbar and useAuth before importing the component
jest.mock("../components/layout/Navbar", () => ({
  __esModule: true,
  default: () => <div>Navbar</div>,
}));

jest.mock("../hooks/useAuth", () => ({
  __esModule: true,
  useAuth: () => ({ isAuthenticated: false }),
}));

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "../pages/Landing";

describe("Landing component", () => {
  test("muestra botón Acceder si no autenticado", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(screen.getByText("Nexus")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Acceder/i }))
      .toBeInTheDocument();
  });
});
