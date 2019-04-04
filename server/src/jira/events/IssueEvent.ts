import { PropertyCheck } from 'node-typechecker';
import { Changelog } from '../Changelog';
import { Issue } from '../Issue';
import { EventBase } from './EventBase';

export class IssueEvent extends EventBase {
  @PropertyCheck({required: false})
  public readonly issue_event_type_name?: string;
  @PropertyCheck()
  public readonly issue: Issue;
  @PropertyCheck({required: false})
  public readonly changelog?: Changelog;
}
