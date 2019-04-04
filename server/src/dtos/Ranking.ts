import { User } from "../entities/User";

export interface Ranking {
  totalIssues: number;
  totalScores: number;
  completedIssues: number;
  completedScores: number;
  topUsers?: User[];
  teamName?: string;
}
