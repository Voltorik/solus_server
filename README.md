# Solus: Weather App - Backend
- A weather app that takes your current location and displays a 5 day forcast in 3 hour increments.  
- Your current location can be optionally added to the User Location board, which is a record of which users are visting this application.

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
- Built with [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/), and [Mongoose](https://mongoosejs.com/).
- Database used: [MongoDB](https://www.mongodb.com/).
- Weather data is taken from [OpenWeatherMap](https://openweathermap.org/forecast5)
