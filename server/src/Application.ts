import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import { Server } from 'http';
import * as path from 'path';
import { Issue, IssueStatus } from './entities/Issue';
import { Ranking } from './entities/Ranking';
import { WebSocket } from './helpers/WebSocket';
import { JiraClient } from './jira/api/JiraClient';
import { EventProcessor, EventType } from './jira/events/EventProcessor';
import { MemoryStore } from './store/MemoryStore';

interface AppConfig {
  server: {
    port: number;
  };
  jira: {
    defaultProjectKey: string;
  };
  displayLimit: number;
  teamName: string;
  defaultUser: {
    name: string;
    avatar: string;
  };
  users: {
      name: string;
      avatar: string;
      jiraId: string;
  }[];
}

export class Application {
  private config: AppConfig;
  private store: MemoryStore<Issue>;
  private eventProcessor: EventProcessor;
  private app: express.Application;
  private server: Server;
  private webSocket: WebSocket;
  private jira: JiraClient;

  constructor() {
    this.loadConfig();
    this.store = new MemoryStore<Issue>();
    this.initEventProcessor();
    this.initExpressApp();
    this.server = new Server(this.app);
    this.initWebSocket()
    this.jira = new JiraClient(config.get<any>('jira'));
  }

  private loadConfig(): void {
    this.config = {
      server: {
        port: config.get<number>('server.port')
      },
      jira: {
        defaultProjectKey: config.get<string>('jira.defaultProjectKey')
      },
      displayLimit: config.get<number>('displayLimit'),
      teamName: config.get<string>('teamName'),
      defaultUser: {
        name: config.get<string>('defaultUser.name'),
        avatar: config.get<string>('defaultUser.avatar'),
      },
      users: config.get<any>('users')
    };
  }

  private initEventProcessor(): void {
    this.eventProcessor = new EventProcessor(this.config.jira.defaultProjectKey);

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
    let result: Ranking = {
      totalIssues: 0,
      totalScores: 0,
      completedIssues: 0,
      completedScores: 0,
      topUsers: [],
      teamName: this.config.teamName
    };
    for (const i of issues) {
      const score = calcScore(i);
      if (i.user) {
        const user = result.topUsers.find(x => x.id === i.user.id);
        if (!user) {
          const configInfo = this.config.users.find(x => x.jiraId === i.user.id);
          result.topUsers.push({
            id: i.user.id,
            name: configInfo ? configInfo.name : this.config.defaultUser.name,
            avatar: configInfo ? configInfo.avatar : this.config.defaultUser.avatar,
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
    result.topUsers = result.topUsers.sort((a, b) => b.score - a.score).splice(0, this.config.displayLimit);

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

        this.server.listen(this.config.server.port, () => {
          console.log(`Server listening on port ${this.config.server.port}`);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
