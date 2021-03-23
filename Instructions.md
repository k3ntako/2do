# To Do App
Our clients have asked us to build a new To Do application but wanted us to build a simple proof of concept before they invest in this further. To create this proof of concept, a previous team used a mock API which return dummy todo data to power the frontend and showcase the user experience. 

The great news is that our clients loved the proof of concept and want to build out the full application! Your team is now responsible for building out the application by swapping in a real **Java Spring API** and to build out a few additional features in **React/TypeScript** detailed below. 

> :round_pushpin: **Kentaro+Matt's deadline and final demo is Friday, April 9th.**


## Quick Start

Create a `.env.local` file and add the MOCK api key:\*See "to-do-app secrets" note in 8L 1Password Apprenticeship vault
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

## New Requested Features & Things to Consider
1. As you transition to a new API, how do we ensure we don't break the existing functionality? Hint - Please use Cypress for end-to-end tests.
2. Our clients want to deploy this application and see all future demos on a deployed version! Hint - look at Github Actions for CI/CD; deployment should be in AWS. Check out Create-React-App deployment pages as we use CRA as a bootstrap.
3. Our clients also want to see any new changes deployed in a staging environment before it goes into production. 
4. Let's replace the existing mock API with a new API so that we can have persisted data. The new API should initially match the mock API's data contract. The client has requested a **Java Spring API**. 
5. A user should be able to add new todos. Note - our clients don't need authentication - its ok to ask a user for their name, and associate the todo with the name somehow
6. Given a link to the todo session, a different user on another computer or browser should be able to make updates and add todos. These changes should be reflected for everyone with that todo session open. For now, we can assume there is 1 global todo session for everyone.

## Process Guidelines
- Your team is expected to flesh out the requirements and prioritize/scope features with the client in the IPM and throughout the week.
- Stories are available in a centralized location (Trello Board or Github Project Board)
- We will have weekly IPMs on Fridays, where we’ll go over stories for the week and your team will present the work you have completed. Demoed features should have edge conditions considered and be well tested. For example, if during a demo you are asked to show the feature beyond the happy path, the application should not crash.
- Your team is expected to communicate early and often to resolve any questions or bring up timeline delays. As a hint, we should not be hearing that a feature is not done during a demo. 
- When applicable, new work should have a formal PR process with at least 1 other approval from each other before merging. Setup the PRs with adequate detail like: what it is, why its being worked on, steps for reviewers to replicate the process for validation, screenshots and videos if frontend work. 
- Mentors will be reviewing code and giving feedback as you work on the project (as opposed to just reviewing it as a whole at the due date). Please add all mentors as peer reviewers. Feel free to merge in work after 24 hours if there is no feedback; mentors may add feedback async and it can be resolved in the next PR. 

> :musical_note: **Note to the apprentice:** Remember, no crafter is an island. Just like a real client experience, you are encouraged to seek feedback & advice (yes, including the mentor team and company wide slack channels). Please clarify anything that is unclear in the requirements.

## Screenshots

#### Happy State

![successful load](https://p23.f4.n0.cdn.getcloudapp.com/items/4gu11WQb/3cbcda0e-4f65-4703-b5c4-203081982d9a.jpg?v=95b460fa9bd8a547bf38c8cab4833c1f)

#### Updating

![updating flow](https://p23.f4.n0.cdn.getcloudapp.com/items/5zuAAvZd/9d6f2d8e-fc0e-487c-bec9-b36bf63b67b1.gif?v=25e51fe32691a7addb16c900248f6c0f)

#### Error State

**Easiest way to trigger this is to comment out the API_KEY (line 28) in the `/to-do-app/src/utils/todoRequest.ts` file**
![error state](https://p23.f4.n0.cdn.getcloudapp.com/items/6quQQXKR/f12002a8-8318-4a27-865d-33b733ba73f9.jpg?v=7afb87c601f67c874f2b93fe4dc41c08)
