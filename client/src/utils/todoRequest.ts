import { ApiTodo, ApiUpdateResponse } from '../data'
import { ApiEndpoints } from './index'

const API_KEY: string = process.env.REACT_APP_API_KEY || ''

export const createTodoRequest = (body: { description: string, dueDate?: string }): Promise<ApiTodo> => {
  return todoRequest({ endpoint: ApiEndpoints.create(), method: 'POST', body :JSON.stringify(body) })
}

export const getTodosRequest = (): Promise<ApiTodo[]> => {
  return todoRequest({ endpoint: ApiEndpoints.get(), method: 'GET' })
}

export const updateTodoRequest = (todoId: string, body: string): Promise<ApiUpdateResponse> => {
  return todoRequest({ endpoint: ApiEndpoints.update(todoId), method: 'PATCH', body })
}

export const todoRequest = ({
  endpoint,
  method,
  body
}: {
  endpoint: string
  method: string
  body?: string
}): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
      },
      body
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
