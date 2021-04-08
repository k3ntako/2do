import config from "../config";

export const ApiEndpoints = {
  get: () => `${config.SERVER_URL}/api/todos`,
  update: (todoId: string) => `${config.SERVER_URL}/api/todo/${todoId}`,
};
