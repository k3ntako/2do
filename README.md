# To Do App
Our clients have asked us to build a new To Do application but wanted us to build a simple proof of concept before they invest in this further. To create this proof of concept, a previous team used a mock API which return dummy todo data to power the frontend and showcase the user experience. 

The great news is that our clients loved the proof of concept and want to build out the full application! Your team is now responsible for building out the application by putting in a real API and to build out a few additional features detailed below. 

The deadline and final demo is Friday, April 9th. 

## Quick Start

Create a `.env.local` file and add the MOCK api key:
*Contact Francesca for the key
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

## New Features & Things to Consider
- Now that we have a proof of concent, let's replace the existing mock API with a new API so that we can have persisted data. The new API should match the mock API's data contract. The client has requested a Java Sprint API. 
- As you transition to a new API, how do we ensure we don't break the existing functionality?
- Our clients want to deploy this application and see all future demos on a deployed version! Our clients also want to see any new changes deployed in a staging environment before it goes into production. 
- A user should be able to add new todos. A note, our clients don't need full authentication - its ok to ask a user for their name, and associate the todo with the name

## Screenshots

#### Happy State

![successful load](https://p23.f4.n0.cdn.getcloudapp.com/items/4gu11WQb/3cbcda0e-4f65-4703-b5c4-203081982d9a.jpg?v=95b460fa9bd8a547bf38c8cab4833c1f)

#### Updating

![updating flow](https://p23.f4.n0.cdn.getcloudapp.com/items/5zuAAvZd/9d6f2d8e-fc0e-487c-bec9-b36bf63b67b1.gif?v=25e51fe32691a7addb16c900248f6c0f)

#### Error State

**Easiest way to trigger this is to comment out the API_KEY (line 28) in the `/to-do-app/src/utils/todoRequest.ts` file**
![error state](https://p23.f4.n0.cdn.getcloudapp.com/items/6quQQXKR/f12002a8-8318-4a27-865d-33b733ba73f9.jpg?v=7afb87c601f67c874f2b93fe4dc41c08)
