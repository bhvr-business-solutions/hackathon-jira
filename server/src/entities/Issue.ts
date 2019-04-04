import { User } from './User';

export enum IssueStatus {
  Pending= 0,
  InProgress = 1,
  Done = 2
}

export enum IssueType {
  Task = 0,
  Story = 1,
  Bug = 2,
  Epic = 3
}

export enum IssuePriority {
  Blocking = 1,
  Critical = 2,
  High = 3,
  Medium = 4,
  Low = 5,
  None = 10000
}

export interface Issue {
  id: string;
  summary: string;
  status: IssueStatus;
  type: IssueType;
  priority: IssuePriority;
  user?: User;
}
