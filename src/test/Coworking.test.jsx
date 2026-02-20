import { render, screen } from "@testing-library/react";
import Coworking from "../pages/Coworking";

// Mock API
jest.mock("../api/fetch", () => ({
  getSpaces: jest.fn(),
  createReservation: jest.fn(),
  deleteReservation: jest.fn(),
}));

// Mock useAuth
jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { name: "Juan" },
  }),
}));

// Mock useFetch
jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  useFetch: jest.fn(),
}));

const { useFetch } = jest.requireMock("../hooks/useFetch");

// Mock Navbar
jest.mock("../components/layout/Navbar", () => ({
  default: () => <div>Navbar</div>,
}));

// Mock CoworkingCard
jest.mock("../components/CoworkingCard", () => ({
  default: ({ space, onReserve, onCancel, onHover }) => (
    <div>
      <span>{space.name}</span>
      <button onClick={() => onReserve(space.id)}>Reservar</button>
      <button onClick={() => onCancel(99)}>Cancelar</button>
      <button onClick={onHover}>Hover</button>
    </div>
  ),
}));

// Mock SpaceDetail
jest.mock("../components/SpaceDetail", () => ({
  default: ({ spaceId }) => <div>Detalle {spaceId}</div>,
}));
test("muestra loading", () => {
  useFetch.mockReturnValue({
    data: [],
    loading: true,
    error: null,
  });

  render(<Coworking />);

  expect(screen.getByText(/Cargando espacios/i))
    .toBeInTheDocument();
});