import { Todo, sortTodos } from '../../data'

describe('sortTodos', () => {
  it('sorts an array of todos by overdue, normal, completed. each category is sorted by soonest duedate', () => {
    const todos: Todo[] = [
      {
        id: '1',
        description: 'File 2020 Taxes',
        isComplete: true,
        dueDate: '2020-03-10T17:50:44.673Z',
        formattedDueDate: '03/10/2020',
        isUpdating: false
      },
      {
        id: '2',
        description: 'Fold laundry',
        isComplete: true,
        dueDate: null,
        formattedDueDate: null,
        isUpdating: false
      },
      {
        id: '3',
        description: 'Call Mom',
        isComplete: false,
        dueDate: '2020-06-26T19:00:00.000Z',
        formattedDueDate: '06/26/2020',
        isUpdating: false
      },
      {
        id: '4',
        description: 'Walk the dog',
        isComplete: false,
        dueDate: null,
        formattedDueDate: null,
        isUpdating: false
      },
      {
        id: '5',
        description: 'Feed the cat',
        isComplete: false,
        dueDate: '2020-06-24T15:45:00.000Z',
        formattedDueDate: '06/24/2020',
        isUpdating: false
      },
      {
        id: '6',
        description: 'Run LA marathon',
        isComplete: false,
        dueDate: '2021-03-21T13:30:00.000Z',
        formattedDueDate: '03/21/2021',
        isUpdating: false
      }
    ]

    expect(sortTodos(todos)).toEqual([
      {
        id: '5',
        description: 'Feed the cat',
        isComplete: false,
        dueDate: '2020-06-24T15:45:00.000Z',
        formattedDueDate: '06/24/2020',
        isUpdating: false
      },
      {
        id: '3',
        description: 'Call Mom',
        isComplete: false,
        dueDate: '2020-06-26T19:00:00.000Z',
        formattedDueDate: '06/26/2020',
        isUpdating: false
      },

      {
        id: '6',
        description: 'Run LA marathon',
        isComplete: false,
        dueDate: '2021-03-21T13:30:00.000Z',
        formattedDueDate: '03/21/2021',
        isUpdating: false
      },
      {
        id: '4',
        description: 'Walk the dog',
        isComplete: false,
        dueDate: null,
        formattedDueDate: null,
        isUpdating: false
      },
      {
        id: '1',
        description: 'File 2020 Taxes',
        isComplete: true,
        dueDate: '2020-03-10T17:50:44.673Z',
        formattedDueDate: '03/10/2020',
        isUpdating: false
      },
      {
        id: '2',
        description: 'Fold laundry',
        isComplete: true,
        dueDate: null,
        formattedDueDate: null,
        isUpdating: false
      }
    ])
  })

  it('sorts normal todos by soonest duedate than todos with no deadline', () => {
    const todos: Todo[] = [
      {
        id: '1',
        description: 'File 2020 Taxes',
        isComplete: true,
        dueDate: '2025-08-05T17:50:44.673Z',
        formattedDueDate: '08/05/2025',
        isUpdating: false
      },
      {
        id: '2',
        description: 'Fold laundry',
        isComplete: true,
        dueDate: null,
        formattedDueDate: null,
        isUpdating: false
      },
      {
        id: '3',
        description: 'Call Mom',
        isComplete: false,
        dueDate: '2025-07-05T17:50:44.673Z',
        formattedDueDate: '07/05/2025',
        isUpdating: false
      }
    ]

    expect(sortTodos(todos)).toEqual([
      {
        id: '3',
        description: 'Call Mom',
        isComplete: false,
        dueDate: '2025-07-05T17:50:44.673Z',
        formattedDueDate: '07/05/2025',
        isUpdating: false
      },
      {
        id: '1',
        description: 'File 2020 Taxes',
        isComplete: true,
        dueDate: '2025-08-05T17:50:44.673Z',
        formattedDueDate: '08/05/2025',
        isUpdating: false
      },
      {
        id: '2',
        description: 'Fold laundry',
        isComplete: true,
        dueDate: null,
        formattedDueDate: null,
        isUpdating: false
      }
    ])
  })
})
