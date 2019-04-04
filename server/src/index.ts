import * as config from 'config';
import { JiraClient } from './jira/api/JiraClient';
import { Store } from './store/store'

const jira = new JiraClient(config.get<any>('jira'));
jira.getProjectIssues().then(issues => console.log(JSON.stringify(issues, null, 2))).catch(e => console.error(e));

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log(req.query);
  var users = new Store().getInstance().load("users");
  var result = users.slice(0, config.get<number>('displayLimit'))
  console.log(req.body);
  res.status(200).json(result);
});

app.post('/', (req, res, next) => {
  console.log("query:" + JSON.stringify(req.query));
  new Store().getInstance().save("users", req.body);

  console.log("body:" + JSON.stringify(req.body));
  res.status(200).json({status: "OK"});
});



app.listen(8081, () => {
  console.log('Server listening on port 8081');
});
