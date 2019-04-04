import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import * as path from 'path';
import { Server } from 'http';
import { Ranking } from './dtos/Ranking';
import { Issue, IssueStatus } from './entities/Issue';
import { WebSocket } from './helpers/WebSocket';
import { JiraClient } from './jira/api/JiraClient';
import { EventProcessor, EventType } from './jira/events/EventProcessor';
import { IssueStore } from './store/IssueStore';

export class Application {
  private port: number;
  private store: IssueStore;
  private eventProcessor: EventProcessor;
  private app: express.Application;
  private server: Server;
  private webSocket: WebSocket;
  private jira: JiraClient;

  constructor() {
    this.port = config.get<number>('server.port');
    this.store = new IssueStore();
    this.initEventProcessor();
    this.initExpressApp();
    this.server = new Server(this.app);
    this.initWebSocket()
    this.jira = new JiraClient(config.get<any>('jira'));
  }

  private initEventProcessor(): void {
    this.eventProcessor = new EventProcessor(config.get<string>('jira.defaultProjectKey'));

    this.eventProcessor.on(EventType.IssueUpdated, (issue) => {
      this.store.save(issue);
      this.webSocket.emitEvent('scoresUpdated', this.computeScores());
    });

    this.eventProcessor.on(EventType.IssueDeleted, (issue) => {
      this.store.deleteById(issue.id);
      this.webSocket.emitEvent('scoresUpdated', this.computeScores());
    });
  }

  private initExpressApp(): void {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });

    this.app.get('/', (req, res, next) => {
      res.status(200).json(this.computeScores());
    });

    this.app.post('/jira/event', (req, res, next) => {
      this.eventProcessor.processWebHook(req.body);
      next();
    });

    this.app.get('/avatar/:name', (req, res, next) => {
      const fileName = req.params.name;
      const options = {
        root: path.resolve(__dirname, '..', 'avatars'),
        headers: {
    
        }
      }
      res.sendFile(fileName, options);
    });

    this.app.all('*', (req, res, next) => {
      res.status(200).json({status: 'ok'});
    });
    
  }

  private initWebSocket(): void {
    this.webSocket = new WebSocket(this.server);
    this.webSocket.server.on('connection', (socket) => {
      this.webSocket.handleNewConnection(socket);
    });
  }

  private computeScores(): Ranking {
    //formula to calculate score
    const calcScore = (issue: Issue): number => {
      return 10000 / issue.priority;
    };
  
    const issues = this.store.getAll();
    console.log(issues);
    let result: Ranking = {
      totalIssues: 0,
      totalScores: 0,
      completedIssues: 0,
      completedScores: 0,
      topUsers: [],
      teamName: config.get<string>('teamName')
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
    result.topUsers = result.topUsers.sort((a, b) => b.score - a.score).splice(0, config.get<number>('displayLimit'));

    return result;
  }

  public start(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        console.log('Loading database...');
        const issues = await this.jira.getProjectIssues();
        for (const i of issues) {
          this.store.save(i);
        }

        this.server.listen(this.port, () => {
          console.log(`Server listening on port ${this.port}`);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
