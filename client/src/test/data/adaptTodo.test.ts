import { adaptTodo, ApiTodo } from "../../data";

describe("adaptTodo", () => {
  it("wraps the incoming todo data from api", () => {
    const apiTodo: ApiTodo = {
      id: "3",
      description: "Call Mom",
      isComplete: false,
      dueDate: "2020-06-26T19:00:00.000Z",
    };

    expect(adaptTodo(apiTodo)).toEqual({
      id: "3",
      description: "Call Mom",
      isComplete: false,
      dueDate: "2020-06-26T19:00:00.000Z",
      formattedDueDate: "06/26/2020",
      isUpdating: false,
    });
  });

  it("sets undefined to formattedDueDate if unavailable", () => {
    const apiTodo: ApiTodo = {
      id: "3",
      description: "Call Mom",
      isComplete: false,
      dueDate: null,
    };

    expect(adaptTodo(apiTodo)).toEqual({
      id: "3",
      description: "Call Mom",
      isComplete: false,
      dueDate: null,
      formattedDueDate: null,
      isUpdating: false,
    });
  });
});
