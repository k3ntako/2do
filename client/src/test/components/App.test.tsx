import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../../App";
import { adaptTodo, ApiTodo, sortTodos } from "../../data";
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
  id: "4",
  description: "Travel to Canada",
  isComplete: false,
};

const server = setupServer(
  rest.get(/mock.pstmn.io\/get/, (req, res, ctx) => {
    return res(ctx.json(mockGetTodosResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Todos are sorted when user submits new todo", async () => {
  const { findAllByTestId } = render(<App />);
  const todoContainers = await findAllByTestId("todo-container");

  expect(todoContainers).toHaveLength(mockGetTodosResponse.length);

  const sortedTodos = sortTodos(mockGetTodosResponse.map(adaptTodo));

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
});
