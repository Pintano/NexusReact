import { render, screen } from "@testing-library/react";
import SpaceDetail from "../components/SpaceDetail";
import { useFetch } from "../hooks/useFetch";

jest.mock("../hooks/useFetch");

describe("SpaceDetail", () => {
  test("loading state", () => {
    useFetch.mockReturnValue({ loading: true });
    render(<SpaceDetail spaceId={1} />);
    expect(screen.getByText(/Cargando detalle/)).toBeInTheDocument();
  });

  test("error state", () => {
    useFetch.mockReturnValue({ loading: false, error: true });
    render(<SpaceDetail spaceId={1} />);
    expect(screen.getByText(/Error cargando/)).toBeInTheDocument();
  });

  test("renderiza datos", () => {
    useFetch.mockReturnValue({
      loading: false,
      error: null,
      data: {
        name: "Sala 1",
        description: "Descripción",
        floor: 2,
        capacity: 4,
        occupied: false,
        features: ["WiFi", "Proyector"],
      }
    });

    render(<SpaceDetail spaceId={1} />);
    expect(screen.getByText("Sala 1")).toBeInTheDocument();
    expect(screen.getByText("WiFi")).toBeInTheDocument();
  });
});
