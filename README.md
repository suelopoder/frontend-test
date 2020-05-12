# Docs manager

Simple test app that manages a set of documents. This is a React app with a simple server using express.

## Running the app

Running locally needs you to run

### `npm start`

Runs the client side in the development mode.

### `npm run server`

Runs the server side in development mode.

## Tests

To launch tests in interactive mode run `npm test`

## TODO

- use generated ids instead of names (update key in client)
- sanitize doc names on output
- sanitize search query on input
- Implement design
- Handle errors and loading states in client
- Add UI tests
- Make API DELETE and POST handle params :)
- DELETE and POST should return single entry and not list. This also involves updating the client.
- Make a single npm script to run both server and client
- Document API endpoints
- add linting

## Future improvements

- remove flicker when server response is too fast
- docs are images so we could show them on the client
- add pagination
- typescript
- add favicon
- ally
- make a single production build `npm run build`
- dockerize
- improve design
- optionally change file name on upload
- github badges :)
- add a service worker (could list docs offline, install app)
- SSR for SEO
- keyboard shortcuts for quick usage

## Libs

- express.io for simple API managment

## Security

### Addressed issues

- sanitize doc names on output
- sanitize search query on input
- submit files with proper extension but wrong mime type

### Not addressed issues
