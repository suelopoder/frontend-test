const express = require('express');
const app = express();

app.get('/api', function (req, res) {
  res.send('running');
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}!`);
});
