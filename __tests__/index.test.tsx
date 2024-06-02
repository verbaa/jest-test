import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /Todo App/i });

    expect(heading).toBeInTheDocument();
  });
  it("renders the input field with placeholder", () => {
    render(<Home />);

    const input = screen.getByPlaceholderText("Your todo here");

    expect(input).toBeInTheDocument();
  });
  it("renders the button with text", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /Add Todo/i });

    expect(button).toBeInTheDocument();
  });
  it("deletes a todo", async () => {
    render(<Home />);
    const inputElement = screen.getByPlaceholderText("Your todo here");
    const buttonElement = screen.getByRole("button", { name: /Add Todo/i });
    const todoText = "Learn PostgreSQL";
    await waitFor(() => {
      fireEvent.change(inputElement, { target: { value: todoText } });
      fireEvent.click(buttonElement);
    });

    // Check if the todo is added to the list
    expect(screen.getByText(todoText)).toBeInTheDocument();

    // Delete the todo
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);
  });
  it("adds a todo", () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText("Your todo here");
    const buttonElement = screen.getByRole("button", { name: /Add Todo/i });
    const todoText = "Learn Next.js";
    fireEvent.change(inputElement, { target: { value: todoText } });
    fireEvent.click(buttonElement);

    // Check if the todo is added to the list
    expect(screen.getByText(todoText)).toBeInTheDocument();
  });
  it("adds multiple todos", () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText("Your todo here");
    const buttonElement = screen.getByRole("button", { name: /Add Todo/i });
    const todoTexts = ["Learn React", "Learn GraphQL"];
    todoTexts.forEach((todoText) => {
      fireEvent.change(inputElement, { target: { value: todoText } });
      fireEvent.click(buttonElement);
    });

    // Check if the todos are added to the list
    todoTexts.forEach((todoText) => {
      expect(screen.getByText(todoText)).toBeInTheDocument();
    });
  });
});
