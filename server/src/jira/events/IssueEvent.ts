import { EventBase } from './EventBase';
import { PropertyCheck } from 'node-typechecker';
import { Issue } from '../Issue';
import { Changelog } from '../Changelog';

export class IssueEvent extends EventBase {
  @PropertyCheck()
  public readonly issue_event_type_name: string;
  @PropertyCheck()
  public readonly issue: Issue;
  @PropertyCheck()
  public readonly changelog: Changelog;
}
