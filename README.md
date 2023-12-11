# Solus: Weather App - Backend
- A weather app that takes your current location and displays a 5 day forcast in 3 hour increments.  
- Your current location can be optionally added to the User Location board, which is a record of which users are visting this application.

## Install and Usage
To install and run this project locally, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd <project_directory>`
3. Install the dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables in the `.env` file:
     - `DB_URI` (MongoDB connection URI for production environment)
     - `API_KEY` ([OpenWeatherMap API key](https://openweathermap.org/appid) for API calls used in the server)
5. Start the application: `npm start`

## Frontend
Link to the frontend is [here](https://github.com/Voltorik/solus)

## API Endpoints
- `GET /v1/weather/forecast?lon=''&lat=''`
- Get a 5 day weather forcast in 3 hours increments based on coordinates provided
  **Arguments:**
  - URL Params:
    - `lat` (string): lattitude of location.
    - `lon` (string): longitude of location.

- `POST /v1/weather?lon=''&lat=''`
- Posts user's location data to the database
  **Arguments:**
  - URL Params:
    - `lat` (string): lattitude of location.
    - `lon` (string): longitude of location.

- `GET /v1/weather`
- Gets all users in the database 
  **No arguments required:**
    

## Tech Stack
- Frontend is built with [Angular](https://angular.io/) and [Bootstrap](https://getbootstrap.com).
- Backend is built with [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/), and [Mongoose](https://mongoosejs.com/).
- Database used: [MongoDB](https://www.mongodb.com/).
- Weather data is taken from [OpenWeatherMap](https://openweathermap.org/forecast5)
