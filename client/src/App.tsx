import React, { useEffect, useState } from "react";
import "./App.scss";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import {
  TodoCollection,
  ErrorAlert,
  TodoForm,
  EditToDoModal,
} from "./components";
import { Todo, sortTodos, adaptTodo, ApiTodo } from "./data";
import { getTodosRequest, updateTodoRequest, createTodoRequest } from "./utils";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isLoading, setLoaderStatus] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setError(null);
    setLoaderStatus(true);
    getTodosRequest()
      .then((todos) => {
        const adaptedTodos = todos.map(adaptTodo);
        const sortedTodos = sortTodos(adaptedTodos);
        setTodos(sortedTodos);
      })
      .catch((err) => {
        setError(`${err.name} - ${err.message}`);
      })
      .finally(() => {
        setLoaderStatus(false);
      });
  }, []);

  const updateTodo = async ({
    todo,
    updateParams,
  }: {
    todo: Todo;
    updateParams: {
      description?: string;
      dueDate?: string;
      isComplete?: boolean;
    };
  }): Promise<void> => {
    const todosCopy = [...todos];
    todo.isUpdating = true;
    setTodos(todosCopy);
    setError(null);

    const requestBody = Object.assign(
      {
        description: todo.description,
        dueDate: todo.dueDate,
        isComplete: todo.isComplete,
      },
      updateParams
    );

    try {
      const response = await updateTodoRequest(
        todo.id,
        JSON.stringify(requestBody)
      );

      if (response.status !== "success") {
        throw new Error("Failed to update to-do");
      }

      todo.description = requestBody.description;
      todo.dueDate = requestBody.dueDate;
      todo.isComplete = requestBody.isComplete;
      todo.isUpdating = false;

      const todosCopy = [...todos];
      const resortedTodos = sortTodos(todosCopy);
      setTodos(resortedTodos);

      setEditingTodo(null);
    } catch (error) {
      setError(`${error.name} - ${error.message}`);
      todo.isUpdating = false;
      setTodos([...todos]);
    }
  };

  const createTodo = async ({
    description,
    dueDate,
  }: {
    description: string;
    dueDate?: string | undefined;
  }): Promise<void> => {
    try {
      const response = await createTodoRequest({ description, dueDate });

      if (response.error) {
        throw new Error(response.message);
      }

      const todo: ApiTodo = response;
      const adaptedTodo = adaptTodo(todo);
      const sortedTodos = sortTodos(todos.concat(adaptedTodo));
      setTodos(sortedTodos);
    } catch (error) {
      setError(error.message);
      throw Error(error);
    }
  };

  return (
    <ChakraProvider>
      <div className="app-container wrapper">
        <div className="card" id="card">
          {error && <ErrorAlert error={error} />}
          <div className="card-header">
            <h1>To Do</h1>
          </div>
          {isLoading ? (
            <div className="center">
              <Spinner
                thickness="8px"
                speed="0.65s"
                emptyColor="gray.200"
                color="gray.500"
                size="xl"
              />
            </div>
          ) : (
            <>
              <div id="card-content">
                <TodoCollection
                  todos={todos}
                  onSubmit={updateTodo}
                  setEditingTodo={setEditingTodo}
                />
              </div>
              <div id="create-todo-form">
                <TodoForm createTodo={createTodo} />
              </div>
            </>
          )}
        </div>
      </div>
      <EditToDoModal
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSubmit={updateTodo}
      />
    </ChakraProvider>
  );
};

export default App;
