import { formatDate, isOverdue } from '../utils'

export interface ApiTodo {
  id: string
  description: string
  isComplete: boolean
  dueDate?: string | null
}

export interface Todo {
  id: string
  description: string
  isComplete: boolean
  dueDate?: string | null
  formattedDueDate?: string | null
  isUpdating: boolean
}

export interface ApiUpdateResponse {
  status: string
}

export const adaptTodo = (apiTodo: ApiTodo): Todo => {
  return {
    ...apiTodo,
    formattedDueDate: apiTodo.dueDate ? formatDate(apiTodo.dueDate) : null,
    isUpdating: false
  }
}

export const sortTodos = (todos: Todo[]): Todo[] => {
  const overdue: Todo[] = []
  const normal: Todo[] = []
  const completed: Todo[] = []

  Object.values(todos).forEach((todo: Todo) => {
    if (todo.isComplete) {
      completed.push(todo)
    } else if (isOverdue(todo)) {
      overdue.push(todo)
    } else {
      normal.push(todo)
    }
  })

  return [...sortBySoonest(overdue), ...sortBySoonest(normal), ...sortBySoonest(completed)]
}

export const sortBySoonest = (todos: Todo[]): Todo[] => {
  return todos.sort((a, b) => {
    if (a.dueDate === b.dueDate) {
      return 0
    }
    if (!a.dueDate) {
      return 1
    }
    if (!b.dueDate) {
      return -1
    }
    if (a.dueDate < b.dueDate) {
      return -1
    }
    if (a.dueDate > b.dueDate) {
      return 1
    }
    return 0
  })
}
