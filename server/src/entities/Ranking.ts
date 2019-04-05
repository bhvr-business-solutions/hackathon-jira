import { User } from "./User";

export interface Ranking {
  totalIssues: number;
  totalScores: number;
  completedIssues: number;
  completedScores: number;
  topUsers?: User[];
  teamName?: string;
}
