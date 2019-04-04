const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  console.log(req.query);
  // console.log(JSON.stringify(req.body, null, 2));
  console.log(req.body);
  res.status(200).json({status: 'ok'});
});

app.listen(8081, () => {
  console.log('Server listening on port 8081');
});
