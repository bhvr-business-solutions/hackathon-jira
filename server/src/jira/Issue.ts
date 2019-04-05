import { PropertyCheck } from 'node-typechecker';
import { Priority } from './Priority';
import { Project } from './Project';
import { User } from './User';
import { Issue as AppIssue, IssuePriority, IssueStatus as AppIssueStatus, IssueType as AppIssueType } from '../entities/Issue';

class IssueResolution {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly id: string;
  @PropertyCheck()
  public readonly description: string;
  @PropertyCheck()
  public readonly name: string;
}

class IssueStatus {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly iconUrl: string;
  @PropertyCheck()
  public readonly name: 'Backlog' | 'In Progress' | 'Done';
  @PropertyCheck()
  public readonly id: string;
}

class IssueType {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly id: string;
  @PropertyCheck()
  public readonly description: string;
  @PropertyCheck()
  public readonly iconUrl: string;
  @PropertyCheck()
  public readonly name: 'Task' | 'Story' | 'Bug' | 'Epic';
  @PropertyCheck()
  public readonly subtask: boolean;
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
  @PropertyCheck({required: false, nullable: true})
  public readonly resolution?: IssueResolution;
  @PropertyCheck({required: false, nullable: true})
  public readonly resolutiondate?: string;
  @PropertyCheck()
  public readonly issuetype: IssueType;
}

export class Issue {
  private _entity: AppIssue;

  @PropertyCheck()
  public readonly id: string;
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly key: string;
  @PropertyCheck()
  public readonly fields: IssueFields;

  public toEntity(): AppIssue {
    if (!this._entity) {
      const priority = +this.fields.priority.id;
      this._entity = {
        id: this.id,
        summary: this.fields.summary,
        status: this.getIssueStatus(this.fields.status.name),
        type: this.getIssueType(this.fields.issuetype.name),
        priority: priority >= IssuePriority.Blocking && priority <= IssuePriority.Low ? <IssuePriority> priority : IssuePriority.None,
        user: this.fields.assignee ? this.fields.assignee.toEntity() : null
      };
    }

    return this._entity;
  }

  private getIssueStatus(data: 'Backlog' | 'In Progress' | 'Done'): AppIssueStatus {
    switch (data) {
      case 'Done': return AppIssueStatus.Done
      case 'In Progress': return AppIssueStatus.InProgress;
      default: return AppIssueStatus.Pending;
    }
  }

  private getIssueType(data: 'Task' | 'Story' | 'Bug' | 'Epic'): AppIssueType {
    switch (data) {
      case 'Story': return AppIssueType.Story;
      case 'Bug': return AppIssueType.Bug;
      case 'Epic': return AppIssueType.Epic;
      default: return AppIssueType.Task;
    }
  }
}
