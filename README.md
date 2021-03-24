# 2do

## Getting Started

Clone the repo and follow the steps below.

### Frontend

1. In the root directory of this project, create a file with the name `.env.local`.
   - Add the API key for mock server. It should look like:
   ```
   REACT_APP_API_KEY=XXXX_API_KEY_HERE
   ```
2. In Terminal, go to the `client` directory within the project.
3. Install dependencies:
   ```
   npm i
   ```
4. Start the application:
   ```
   npm start
   ```
5. Once the server has started, visit `locahost:3000` in a browser to view the app.

### Backend

1. In Terminal, go to the `server` directory within the project.
2. Build and start the program:
   ```
   ./mvnw spring-boot:run
   ```
3. Once the server has started, visit `locahost:8080/health-check` in a browser to view status of the server.
