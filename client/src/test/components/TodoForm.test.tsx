import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "../../components";

test("User submits new todo", async () => {
  const mockCreateTodo = jest.fn();

  const { getByRole, getByText, getByTestId } = render(
    <TodoForm createTodo={mockCreateTodo} />
  );

  const descriptionInput: HTMLElement = getByRole("textbox", {
    name: /description/i,
  });
  const dueDateInput: HTMLElement = getByTestId("dueDate");

  userEvent.type(descriptionInput, "Travel to Canada");
  userEvent.type(dueDateInput, "2024-04-15");

  const submitButton: HTMLElement = getByText(/submit/i);
  userEvent.click(submitButton);

  expect(mockCreateTodo).toBeCalled;
  expect(mockCreateTodo.mock.calls).toHaveLength(1);
  expect(mockCreateTodo.mock.calls[0][0].description).toEqual(
    "Travel to Canada"
  );
  expect(mockCreateTodo.mock.calls[0][0].dueDate).toEqual("2024-04-15");
});
