const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const app = express();
app.use(bodyParser.json());

let database = [
  { name: 'Doc 1', size: 999999 },
  { name: 'Doc 2', size: 20 },
  { name: 'Doc 3', size: 50000 },
];

app.get('/api', function (req, res) {
  const { query: rawQuery } = req.query;
  if (!rawQuery) {
    console.log('List docs');
    res.send(database);
    return;
  }
  const query = rawQuery.toLocaleLowerCase();
  console.log('List docs with query', query);
  const matches = database.filter(doc =>
    doc.name.toLocaleLowerCase().includes(
      query.toLocaleLowerCase()))
  res.send(matches);
});

app.post('/api', function (req, res) {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).send({ error: 'Invalid posta data' });
      return;
    }
    const { file } = files;
    console.log('New doc ', file.name);
    const newDoc = { name: file.name, size: file.size };
    database.push(newDoc);
    res.end();
  })
});

app.delete('/api/:id', function (req, res) {
  const { id } = req.params;
  console.log('Remove doc', id);
  database = database.filter(doc => doc.name !== id);
  res.end();
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
