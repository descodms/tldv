# TL;DV Andy Castro

## Build and run the app:

docker-compose up --build

app will run on http://localhost:4040

## Swagger docs:

http://localhost:4040/api-docs/

## Postman collection to test the API:

https://www.getpostman.com/collections/37d1ae27cbe949524dd8

## Project Info:

- Sentry is being used for error tracking
- Every incoming request has an unique requestId
- Every incoming request is persisted in database with useful info for debugging: params, query, body, requestId, interactionType (endpoint description)
- get videos endpoint has filters (?limit=10&page=3&getPublic=true&timesViewed=950), in the postman collection are examples
- get videos endpoint has pagination
- database is automatically seeded at start
- there is some basic validation
- there is a health check endpoint
- tests are broken and no security audit due to lack of time 😅, also swagger docs are incomplete
- I would have liked to add a basic authentication (username + password) and authorization for using the api (with JWT)
- I hope you liked it 🤓
