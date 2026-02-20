import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";

const categories = [
  { id: 1, name: "Tech" },
  { id: 2, name: "Science" },
];

describe("Sidebar", () => {
  test("renderiza categorías", () => {
    render(<Sidebar categories={categories} onSelect={jest.fn()} />);
    expect(screen.getByText("Tech")).toBeInTheDocument();
  });

  test("llama onSelect", () => {
    const onSelect = jest.fn();
    render(<Sidebar categories={categories} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Tech"));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
