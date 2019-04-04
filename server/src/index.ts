import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import { EventProcessor, EventType } from './jira/events/EventProcessor';
import { JiraClient } from './jira/api/JiraClient';
import { IssueStore } from './store/IssueStore';

// Main store
const store = new IssueStore();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log(req.query);
  // var users = new Store().getInstance().load("users");
  // var result = users.slice(0, config.get<number>('displayLimit'))
  const result = store.getAll();
  console.log(req.body);
  res.status(200).json(result);
});

///////////////////////// Jira stuff /////////////////////////////
const eventProcessor = new EventProcessor(config.get<string>('jira.defaultProjectKey'));
// Jira webhooks processing
app.post('/jira/event', (req, res, next) => {
  eventProcessor.processWebHook(req.body);
  next();
});
// Events after webhook processing
eventProcessor.on(EventType.IssueUpdated, (issue) => {
  store.save(issue);
});
eventProcessor.on(EventType.IssueDeleted, (issue) => {
  store.deleteById(issue.id);
});
///////////////////////// End Jira stuff /////////////////////////

app.all('*', (req, res, next) => {
  res.status(200).json({status: 'ok'});
});

// Load data and start server
console.log('Loading database...');
const jira = new JiraClient(config.get<any>('jira'));
jira.getProjectIssues().then((issues) => {
  for (const i of issues) {
    store.save(i);
  }
  const port = config.get<number>('server.port');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((e) => {
  console.error(e)
});

