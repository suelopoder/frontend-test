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
  const query = req.query.query.toLocaleLowerCase();
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
    res.send(database);
  })
});
app.delete('/api', function (req, res) {
  const { name } = req.body;
  console.log('Remove doc', name);
  database = database.filter(doc => doc.name !== name);
  res.send(database);
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
