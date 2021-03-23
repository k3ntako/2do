import React, { useEffect, useState } from 'react'
import './App.scss'
import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { TodoCollection, ErrorAlert } from './components'
import { Todo, sortTodos, adaptTodo } from './data'
import { getTodosRequest, updateTodoRequest } from './utils'

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setLoaderStatus] = useState<boolean>(true)
  const [error, setError] = useState<string | null>()

  useEffect(() => {
    setError(null)
    setLoaderStatus(true)
    getTodosRequest()
      .then(todos => {
        const adaptedTodos = todos.map(adaptTodo)
        const sortedTodos = sortTodos(adaptedTodos)
        setTodos(sortedTodos)
      })
      .catch(err => {
        setError(`${err.name} - ${err.message}`)
      })
      .finally(() => {
        setLoaderStatus(false)
      })
  }, [])

  const toggleTodoCompletion = async ({
    todoId,
    currentTodoStatus,
    currentPosition
  }: {
    todoId: string
    currentTodoStatus: boolean
    currentPosition: number
  }): Promise<void> => {
    const todosCopy = [...todos]
    todos[currentPosition].isUpdating = true
    setTodos(todosCopy)
    setError(null)

    const requestBody = JSON.stringify({
      isComplete: !currentTodoStatus
    })
    updateTodoRequest(todoId, requestBody)
      .then(response => {
        if (response.status === 'success') {
          const todosCopy = [...todos]
          todosCopy[currentPosition].isComplete = !currentTodoStatus
          todosCopy[currentPosition].isUpdating = false
          const resortedTodos = sortTodos(todosCopy)
          setTodos(resortedTodos)
        }
      })
      .catch(err => {
        setError(`${err.name} - ${err.message}`)
        const todosCopy = [...todos]
        todosCopy[currentPosition].isUpdating = false
        setTodos(todosCopy)
      })
  }

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
            <div id="card-content">
              <TodoCollection todos={todos} toggleTodoCompletion={toggleTodoCompletion} />
            </div>
          )}
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
