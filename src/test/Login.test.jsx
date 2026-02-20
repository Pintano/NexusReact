import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

jest.mock("../hooks/useAuth");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ login: mockLogin });
    useNavigate.mockReturnValue(mockNavigate);
  });

  const renderLogin = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  test("renders login form with title and description", () => {
    renderLogin();
    expect(screen.getByText("Nexus")).toBeInTheDocument();
    expect(screen.getByText("Accede a la librería y al co-working")).toBeInTheDocument();
  });

  test("renders name and email input fields", () => {
    renderLogin();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("renders submit button", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  test("updates name input value on change", () => {
    renderLogin();
    const nameInput = screen.getByLabelText("Nombre");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  test("updates email input value on change", () => {
    renderLogin();
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");
  });

  test("calls login with correct userData on form submit", async () => {
    renderLogin();
    const nameInput = screen.getByLabelText("Nombre");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
    });
  });

  test("navigates to /bookstore after successful login", async () => {
    renderLogin();
    const nameInput = screen.getByLabelText("Nombre");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/bookstore");
    });
  });

  test("prevents form submission with empty name field", () => {
    renderLogin();
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("prevents form submission with empty email field", () => {
    renderLogin();
    const nameInput = screen.getByLabelText("Nombre");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
  });
});