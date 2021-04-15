import React from "react";
import { Checkbox, Spinner } from "@chakra-ui/react";
import { Todo } from "../data";
import { isOverdue } from "../utils";

export const TodoCollection = ({
  todos,
  toggleTodoCompletion,
}: {
  todos: Todo[];
  toggleTodoCompletion: ({
    todoId,
    currentTodoStatus,
    currentPosition,
  }: {
    todoId: string;
    currentTodoStatus: boolean;
    currentPosition: number;
  }) => Promise<void>;
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
      {todos.map((todo, todoIdx) => {
        const isCompleteClassName = todo.isComplete
          ? "todo-container--complete"
          : "";
        const isOverdueClassName = isOverdue(todo)
          ? "todo-container--overdue"
          : "";
        return (
          <div
            className={`todo-container ${isCompleteClassName} ${isOverdueClassName}`}
            key={todo.id}
            onClick={() =>
              toggleTodoCompletion({
                todoId: todo.id,
                currentTodoStatus: todo.isComplete,
                currentPosition: todoIdx,
              })
            }
            role="checkbox"
            aria-checked={todo.isComplete}
            data-testid="todo-container"
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
        );
      })}
    </React.Fragment>
  );
};
