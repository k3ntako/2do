import { Todo } from "../../data";
import { isOverdue } from "../../utils";

describe("isOverdue", () => {
  it("returns false if task does not ahve a dueDate", () => {
    const todo: Todo = {
      id: "1",
      description: "File 2020 Taxes",
      isComplete: false,
      dueDate: null,
      formattedDueDate: null,
      isUpdating: false,
    };

    expect(isOverdue(todo)).toEqual(false);
  });

  it("returns false if task is complete and date is not current", () => {
    const todo: Todo = {
      id: "1",
      description: "File 2020 Taxes",
      isComplete: true,
      dueDate: "2020-03-10T17:50:44.673Z",
      formattedDueDate: "03/10/2020",
      isUpdating: false,
    };

    expect(isOverdue(todo)).toEqual(false);
  });

  it("returns true if task is not complete and date is not current", () => {
    const todo: Todo = {
      id: "1",
      description: "File 2020 Taxes",
      isComplete: false,
      dueDate: "2020-03-10T17:50:44.673Z",
      formattedDueDate: "03/10/2020",
      isUpdating: false,
    };

    expect(isOverdue(todo)).toEqual(true);
  });

  it("returns true if task is not complete and date is in the future current", () => {
    const todo: Todo = {
      id: "1",
      description: "File 2020 Taxes",
      isComplete: false,
      dueDate: "2100-03-10T17:50:44.673Z",
      formattedDueDate: "03/10/2100",
      isUpdating: false,
    };

    expect(isOverdue(todo)).toEqual(false);
  });
});
