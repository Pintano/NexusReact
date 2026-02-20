import { render, screen, fireEvent } from "@testing-library/react";
import CoworkingCard from "../components/CoworkingCard";

const baseProps = {
  user: { name: "Alain" },
  onReserve: jest.fn(),
  onCancel: jest.fn(),
  onHover: jest.fn(),
};

describe("CoworkingCard", () => {
  test("muestra estado libre", () => {
    const space = { id: 1, name: "Sala 1", capacity: 4, occupied: false };
    render(<CoworkingCard {...baseProps} space={space} />);
    expect(screen.getByText("Libre")).toBeInTheDocument();
  });

  test("llama onReserve", () => {
    const space = { id: 1, name: "Sala 1", capacity: 4, occupied: false };
    render(<CoworkingCard {...baseProps} space={space} />);

    fireEvent.click(screen.getByText("Reservar"));
    expect(baseProps.onReserve).toHaveBeenCalledWith(1);
  });

  test("llama onCancel si es el usuario", () => {
    const space = {
      id: 1,
      name: "Sala 1",
      capacity: 4,
      occupied: true,
      user: "Alain",
      reservationId: 10,
      endTime: "10:00"
    };

    render(<CoworkingCard {...baseProps} space={space} />);

    fireEvent.click(screen.getByText("Cancelar reserva"));
    expect(baseProps.onCancel).toHaveBeenCalledWith(10);
  });
});
