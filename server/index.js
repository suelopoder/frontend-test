const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const ID_LENGTH = 36;
const DATA_SOURCE = path.join(__dirname, 'database');
const filePath = filename => path.join(DATA_SOURCE, filename);

const getDatabase = () => {
  const files = fs.readdirSync(DATA_SOURCE);
  return files.map(file => {
    const stats = fs.statSync(filePath(file));
    const metadata = {
      id: file.substr(0, ID_LENGTH),
      name: file.substr(ID_LENGTH+1, file.length - 1),
      size: stats["size"],
    };
    return metadata;
  });
}

app.get('/api', function (req, res) {
  const { query: rawQuery } = req.query;
  const database = getDatabase();
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
    const newId = uuidv4();
    const internalName = `${newId}-${file.name}`;
    fs.writeFileSync(filePath(internalName), file);
    res.end();
  })
});

app.delete('/api/:id', function (req, res) {
  const { id } = req.params;
  console.log('Remove doc', id);
  const database = getDatabase();
  for (const row of database) {
    if (row.id === id) {
      const internalName = `${id}-${row.name}`;
      fs.unlinkSync(filePath(internalName))
      res.end();
      return;
    }
  }
  res.end();
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
