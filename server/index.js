const express = require('express');
const app = express();

let database = [
  { name: 'Doc 1', size: 999999 },
  { name: 'Doc 2', size: 20 },
  { name: 'Doc 3', size: 50000 },
];

app.get('/api', function (req, res) {
  // TODO implement search
  res.send(database);
});
app.post('/api', function (req, res) {
  // TOOD add the real doc
  const random = Math.ceil(Math.random()*100);
  database.push({ name: `Doc ${random}`, size: random * 1000 });
  res.send(database);
});
app.delete('/api', function (req, res) {
  // TOOD delete passed doc name
  database = database.slice(1);
  res.send(database);
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
