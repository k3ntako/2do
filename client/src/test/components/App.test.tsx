import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../../App";
import { adaptTodo, ApiTodo, sortTodos, Todo } from "../../data";
import { isOverdue } from "../../utils";

const mockGetTodosResponse: ApiTodo[] = [
  {
    id: "1",
    description: "Buy a new laptop",
    isComplete: false,
    dueDate: "2021-01-01",
  },
  {
    id: "2",
    description: "Buy a new car",
    isComplete: true,
    dueDate: "2020-05-01",
  },
  {
    id: "3",
    description: "Buy a new island",
    isComplete: false,
    dueDate: "2020-03-01",
  },
  {
    id: "4",
    description: "Buy a new monitor",
    isComplete: true,
    dueDate: "2025-05-01",
  },
  {
    id: "5",
    description: "Adopt a dog",
    isComplete: false,
    dueDate: "2025-05-01",
  },
  {
    id: "6",
    description: "Adopt a cat",
    isComplete: false,
  },
];

const mockCreateResponse: ApiTodo = {
  id: "7",
  description: "Travel to Canada",
  isComplete: false,
  dueDate: "2024-04-15",
};

const server = setupServer(
  rest.get(/api\/todos/, (req, res, ctx) => {
    return res(ctx.json(mockGetTodosResponse));
  }),
  rest.post(/api\/todos/, (req, res, ctx) => {
    return res(ctx.json(mockCreateResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const testTodoOrder = (sortedTodos: Todo[], todoContainers: HTMLElement[]) => {
  todoContainers.forEach((todoElement, idx) => {
    const todo = sortedTodos[idx];

    if (isOverdue(todo)) {
      expect(todoElement.textContent).toContain("OVERDUE");
    } else {
      expect(todoElement.textContent).not.toContain("OVERDUE");
    }

    if (todo.dueDate) {
      expect(todoElement.textContent).toContain(todo.formattedDueDate);
    }

    expect(todoElement.textContent).toContain(todo.description);
  });
};

test("Todos are sorted when page loads", async () => {
  const { findAllByTestId } = render(<App />);
  const todoContainers = await findAllByTestId("todo-container");

  expect(todoContainers).toHaveLength(mockGetTodosResponse.length);

  const sortedTodos = sortTodos(mockGetTodosResponse.map(adaptTodo));

  testTodoOrder(sortedTodos, todoContainers);
});

test("Todos are sorted when user submits new todo", async () => {
  const {
    findAllByTestId,
    findByRole,
    findByTestId,
    getByText,
    findByText,
  } = render(<App />);

  // Create todo
  const descriptionInput: HTMLElement = await findByRole("textbox", {
    name: /description/i,
  });
  const dueDateInput: HTMLElement = await findByTestId("dueDate");

  userEvent.type(descriptionInput, "Travel to Canada");
  userEvent.type(dueDateInput, "2024-04-15");

  const submitButton: HTMLElement = getByText(/submit/i);
  userEvent.click(submitButton);

  // Expect todos to be sorted with new todo
  await findByText("Travel to Canada");
  const todoContainers = await findAllByTestId("todo-container");

  const expectedTodos = mockGetTodosResponse.concat(mockCreateResponse);
  expect(todoContainers).toHaveLength(expectedTodos.length);

  const sortedTodos = sortTodos(expectedTodos.map(adaptTodo));

  testTodoOrder(sortedTodos, todoContainers);
});
