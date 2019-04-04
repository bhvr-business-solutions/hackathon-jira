import { PropertyCheck } from 'node-typechecker';
import { Priority } from './Priority';
import { Project } from './Project';
import { User } from './User';

class IssueStatus {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly iconUrl: string;
  @PropertyCheck()
  public readonly name: string;
  @PropertyCheck()
  public readonly id: string;
}

class IssueFields {
  @PropertyCheck()
  public readonly summary: string;
  @PropertyCheck({nullable: true, required: false})
  public readonly description?: string;
  @PropertyCheck({nullable: true, required: false})
  public readonly created?: string;
  @PropertyCheck({nullable: true, required: false})
  public readonly updated?: string;
  @PropertyCheck({nullable: true, required: false})
  public readonly project?: Project;
  @PropertyCheck()
  public readonly priority: Priority;
  @PropertyCheck({nullable: true})
  public readonly assignee?: User;
  @PropertyCheck({nullable: true, required: false})
  public readonly creator?: User;
  @PropertyCheck({nullable: true, required: false})
  public readonly reporter?: User;
  @PropertyCheck()
  public readonly status: IssueStatus;
}

export class Issue {
  @PropertyCheck()
  public readonly id: string;
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly key: string;
  @PropertyCheck()
  public readonly fields: IssueFields;
}
