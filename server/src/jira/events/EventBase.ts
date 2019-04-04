import { validate } from 'node-typechecker';
import { Validator } from '../../helpers/Validator';
import { User } from '../User';
import { IssueEvent } from './IssueEvent';

export abstract class EventBase {
  public readonly timestamp: number;
  public readonly webhookEvent: string;
  public readonly user: User;
}
