import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import { Server } from 'http';
import { Ranking } from './dtos/Ranking';
import { Issue, IssueStatus } from './entities/Issue';
import { WebSocket } from './helpers/WebSocket';
import { JiraClient } from './jira/api/JiraClient';
import { EventProcessor, EventType } from './jira/events/EventProcessor';
import { IssueStore } from './store/IssueStore';

// Main store
const store = new IssueStore();

const app = express();
const server = new Server(app);
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  
  //formula to calculate score
  const calcScore = (issue: Issue): number => {
    return 10000 / issue.priority;
  };

  const issues = store.getAll();
  console.log(issues);
  let result: Ranking = {
    totalIssues: 0,
    totalScores: 0,
    completedIssues: 0,
    completedScores: 0,
    topUsers: []
  };
  for(const i of issues) {
    const score = calcScore(i);
    if (i.user) {
      const user = result.topUsers.find(x => x.id === i.user.id);
      if (!user) {
        const configInfo = config.get<any>('users').find(x => x.jiraId === i.user.id);
        result.topUsers.push({
          id: i.user.id,
          name: configInfo ? configInfo.name : config.get<any>('defaultUser').name,
          avatar: configInfo ? configInfo.avatar : config.get<any>('defaultUser').avatar,
          score: i.status === IssueStatus.Done ?  score : 0
        })
      }
      else {
        user.score += score;
      }
    }
    result.totalIssues++;
    result.totalScores += score;
    if (i.status === IssueStatus.Done) {
      result.completedIssues++;
      result.completedScores += score;
    }
  }
  //return only the top users
  result.topUsers = result.topUsers.sort((a, b) => b.score - a.score).splice(0, config.get<number>('displayLimit'))
  res.status(200).json(result);
});

//////////////////////// Web socket stuff ////////////////////////
const webSocket = new WebSocket(server);
webSocket.server.on('connection', (socket) => {
  webSocket.handleNewConnection(socket);
});
////////////////////// End Web socket stuff //////////////////////

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
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((e) => {
  console.error(e)
});

