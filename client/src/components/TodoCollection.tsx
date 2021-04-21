import React from "react";
import { Button, Checkbox, Spinner } from "@chakra-ui/react";
import { Todo } from "../data";
import { isOverdue } from "../utils";

export const TodoCollection = ({
  todos,
  onSubmit,
  setEditingTodo,
}: {
  todos: Todo[];
  onSubmit: ({
    todo,
    updateParams,
  }: {
    todo: Todo;
    updateParams: {
      isComplete: boolean;
    };
  }) => Promise<void>;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}): JSX.Element => {
  if (todos.length === 0) {
    return (
      <div className="no-todos-container">
        <h2>Nothing to do here!</h2>
      </div>
    );
  }
  return (
    <React.Fragment>
      {todos.map((todo) => {
        const isCompleteClassName = todo.isComplete
          ? "todo-content--complete"
          : "";
        const isOverdueClassName = isOverdue(todo)
          ? "todo-content--overdue"
          : "";
        return (
          <div
            className="todo-container"
            key={todo.id}
            data-testid="todo-container"
          >
            <div
              className={`todo-content ${isCompleteClassName} ${isOverdueClassName}`}
              onClick={() =>
                onSubmit({
                  todo,
                  updateParams: { isComplete: !todo.isComplete },
                })
              }
              role="checkbox"
              aria-checked={todo.isComplete}
            >
              {todo.isUpdating ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="gray.500"
                  size="sm"
                />
              ) : (
                <Checkbox isChecked={todo.isComplete} colorScheme="gray" />
              )}
              <div className="row">
                <p className="description">{todo.description}</p>
                <div className="tag-container">
                  {isOverdue(todo) && <div className="tag">OVERDUE</div>}
                  {todo.formattedDueDate && (
                    <div className="tag">{todo.formattedDueDate}</div>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="edit-button"
              onClick={() => setEditingTodo(todo)}
            >
              Edit
            </Button>
          </div>
        );
      })}
    </React.Fragment>
  );
};
