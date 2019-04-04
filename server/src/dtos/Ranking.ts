import { User } from "../entities/User";

export interface Ranking {
  totalIssues: number;
  totalScores: number;
  completedIssues: number;
  CompletedScores: number;
  topUsers?: User[];
}
