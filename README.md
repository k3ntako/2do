# To Do App

## Quick Start

Create a `.env.local` file and add the api key:

```
REACT_APP_API_KEY=XXXX_API_KEY_HERE
```
## Existing Features
- Each todo has a status indicating if it has been completed or not as well as an optional due date
- When a todo is marked as complete, the server should be notified about the updated status
- If a todo is past its due date but not yet completed it should be clearly indicated to the user that it is overdue
- Should show a no todo message to users if there are no todos upon successful fetch
- When updating a todo, should resort the list after successful toggling of todo
- When updating a todo, should show an error message upon failed update; no change occurs

Todos in the list should be sorted in the following order:
- Overdue items at the top
- Sort by due date (due soonest at the top)
- Completed items at the bottom

## New Features
- Now that we have a proof of concent, let's replace the existing mock API with a new API so that we can have persisted data. The new API should match the mock API's data contract
- As we transition to a new API, how do we ensure we don't break the existing functionality?
- We want to deploy this application. As clients, we want to see new changes deployed in a staging environment before it goes into production. 
- A user should be able to add new todos

## Screenshots

#### Happy State

![successful load](https://p23.f4.n0.cdn.getcloudapp.com/items/4gu11WQb/3cbcda0e-4f65-4703-b5c4-203081982d9a.jpg?v=95b460fa9bd8a547bf38c8cab4833c1f)

#### Updating

![updating flow](https://p23.f4.n0.cdn.getcloudapp.com/items/5zuAAvZd/9d6f2d8e-fc0e-487c-bec9-b36bf63b67b1.gif?v=25e51fe32691a7addb16c900248f6c0f)

#### Error State

**Easiest way to trigger this is to comment out the API_KEY (line 28) in the `/to-do-app/src/utils/todoRequest.ts` file**
![error state](https://p23.f4.n0.cdn.getcloudapp.com/items/6quQQXKR/f12002a8-8318-4a27-865d-33b733ba73f9.jpg?v=7afb87c601f67c874f2b93fe4dc41c08)
