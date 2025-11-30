// Type definitions for ALGOPATH

export interface Question {
  id: number;
  level: number;
  problemStatement: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  xpReward: number;
}

export interface UserProgress {
  username: string;
  totalXP: number;
  currentStreak: number;
  lastActiveDate: string;
  league: League;
  completedLevels: number[];
  currentLevel: number;
  dailyGoal: DailyGoal;
}

export type League = "Wooden" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export type DailyGoal = {
  name: string;
  minutes: number;
};

export interface LevelStats {
  level: number;
  totalXP: number;
  timeSpent: number;
  attempts: number;
  completed: boolean;
}
