import { render, screen, fireEvent } from "@testing-library/react";
import CategoryMenu from "../components/CategoryMenu";

const categories = [
  { id: 1, name: "Tech" },
  { id: 2, name: "Science" },
];

describe("CategoryMenu", () => {
  test("renderiza categorías", () => {
    render(<CategoryMenu categories={categories} loading={false} onSelect={jest.fn()} />);
    expect(screen.getByText("Tech")).toBeInTheDocument();
  });

  test("llama onSelect al hacer click", () => {
    const onSelect = jest.fn();
    render(<CategoryMenu categories={categories} loading={false} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Tech"));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  test("colapsa menú", () => {
    render(<CategoryMenu categories={categories} loading={false} onSelect={jest.fn()} />);
    fireEvent.click(screen.getByText("Categorías"));
    expect(screen.queryByText("Tech")).not.toBeInTheDocument();
  });
});
