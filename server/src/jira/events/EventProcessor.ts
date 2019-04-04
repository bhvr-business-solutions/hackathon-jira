import { EventEmitter } from 'events';
import { validate } from 'node-typechecker';
import { Validator } from '../../helpers/Validator';
import { EventBase } from './EventBase';
import { IssueEvent } from './IssueEvent';
import { Issue } from '../../entities/Issue';
import { User } from '../../entities/User';

enum WebHookEventType {
  IssueCreated = 'jira:issue_created',
  IssueUpdated = 'jira:issue_updated',
  IssueDeleted = 'jira:issue_deleted'
}

export enum EventType {
  IssueUpdated = 'IssueUpdated',
  IssueDeleted = 'IssueDeleted'
}

export class EventProcessor extends EventEmitter {
  private readonly projectKey: string;

  constructor(defaultProjectKey: string) {
    Validator.validate(defaultProjectKey, Validator.isNonEmptyString, 'Event processor default project key must be a non empty string');

    super();
    this.projectKey = defaultProjectKey.trim();
  }

  public async processWebHook(event: EventBase): Promise<void> {
    if (Validator.isObject(event) && Validator.isNonEmptyString(event.webhookEvent)) {
      switch (event.webhookEvent) {
        case WebHookEventType.IssueCreated:
        case WebHookEventType.IssueUpdated:
        case WebHookEventType.IssueDeleted:
          const issueEvent = validate(event, IssueEvent);
          if (issueEvent.issue.fields.project && issueEvent.issue.fields.project.key === this.projectKey) {
            this.emit(
              event.webhookEvent === WebHookEventType.IssueDeleted ? EventType.IssueDeleted : EventType.IssueUpdated,
              issueEvent.issue.toEntity()
            );
          }
          break;
        default: break;
      }
    }
  }

  public on(event: EventType.IssueUpdated | EventType.IssueDeleted, listener: (issue: Issue) => void): this;
  public on(event: string | symbol, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}
