# Diego - 2020-05-14

## Installation

To install dependencies run `npm install`.

Running locally needs you to run on separate consoles:

- `npm start` to run client side
- `npm run server` to run the server side

To run tests in interactive mode run `npm test`.

## Security

Addressed issues

- XSS doc names on output. To test rename a filename on the database to `<script>alert('xss');<script>`
- XX search query on input. To test search for `<script>alert('xss');<script>`.
- XSS for file names. To test upload a file named `<script>alert('xss');<script>.png`
- Big file attacks are not possible.
- File name attack. To test upload a file named `some/path.png`. The `/` will be replaced as `:`
- Clickjacking. To test render -a production build- of the app within an iframe
- General node vulnerabilities. Using node LTS version mitigates this.
- Run file validations in server to avoid direct posting to API.

Not addressed issues

- Submit files with proper extension but wrong type. To test get a `.txt` file. Rename it as `.jpg` and test uploading it.
- Testing images for improper (adult) content

## Improvements

- Add a GET endpoint `/api/<id>` to serve document data
- Add a PUT/PATCH endpoint `/api/<id>` to modify document data
- Files could be sorted by name
- remove flicker when server response is too fast
- docs are images so we could show them on the client
- add pagination
- typescript
- linting
- add favicon
- ally
- make a single production build `npm run build`
- use `concurrently` to have a single command `npm start` to run the app.
- dockerize
- improve design
- add option to change the name on upload
- github badges :)
- add a service worker (could list docs offline, install app)
- SSR
- keyboard shortcuts for quick usage
- support dragging files for upload
- performance on server search could be improved
- add a button or "X" to clear current search
- Improve design, its not pixel perfect.

## Libraries

- `express.io` to build API endpoints
- `bodyParser` for JSON param parsing
- `express-fileupload` to handle file POST parsing
- `uuid` to generate unique id for files
- `helmet` to set some headers for security

## API

The server stores file in a `database` folder. It uses a generated id for each document. The API is aimed to be an HTTP API access to it.

### GET `/api`

This endpoint lists documents metadata in JSON format. It has an optional `query` query string param to filter documents by name.

Example response:

```json
[
  {
    "id": "1b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "name": "Server.png",
    "size": 24009
  },
  {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "name": "Client.png",
    "size": 43051
  }
]
```

### POST `/api`

This endpoint is used to add new documents. Takes a `file` param via POST body with the document to upload and stores it into the database. Repeating file name is allowed.
Returns an empty body with status code 200 on success.
Returns a 400 response with an error JSON object when the form has invalid format.

Example error response:

```json
{ "error": "Invalid file size" }
```

### DELETE `/api/<id>`

This endpoint deletes a document with the `id` passed in the path. If no such file exists it returns without failing.
Returns an empty body with status code 200 on success.
