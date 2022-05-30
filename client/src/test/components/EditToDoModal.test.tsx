import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditToDoModal } from "../../components";
import { Todo } from "../../data";

test("Todo", async () => {
  const todo: Todo = {
    id: "1",
    description: "Walk dog",
    isComplete: false,
    dueDate: null,
    formattedDueDate: null,
    isUpdating: false,
  };

  const onClose = jest.fn();
  const onSubmit = jest.fn();

  const { getByRole, getByDisplayValue } = render(
    <EditToDoModal todo={todo} onClose={onClose} onSubmit={onSubmit} />
  );

  const isCompleteSelect: HTMLElement = getByRole("combobox");

  await waitFor(() => userEvent.click(isCompleteSelect));

  const completedOption: HTMLElement = getByDisplayValue("Yes");

  await waitFor(() => userEvent.click(completedOption));

  // expect(todoContainers).toHaveLength(mockGetTodosResponse.length);

  // const sortedTodos = sortTodos(mockGetTodosResponse.map(adaptTodo));

  // testTodoOrder(sortedTodos, todoContainers);
});
