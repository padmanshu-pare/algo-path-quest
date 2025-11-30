import { UserProgress, LevelStats } from "@/types";

const STORAGE_KEYS = {
  USER_PROGRESS: "algopath_user_progress",
  LEVEL_STATS: "algopath_level_stats",
};

// Default user progress
const DEFAULT_USER_PROGRESS: UserProgress = {
  username: "Guest",
  totalXP: 0,
  currentStreak: 0,
  lastActiveDate: new Date().toISOString(),
  league: "Wooden",
  completedLevels: [],
  currentLevel: 1,
  dailyGoal: {
    name: "Not set",
    minutes: 0,
  },
};

// Get user progress from localStorage
export const getUserProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading user progress:", error);
  }
  return DEFAULT_USER_PROGRESS;
};

// Save user progress to localStorage
export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving user progress:", error);
  }
};

// Update XP and check for streak
export const updateXP = (xpGained: number): UserProgress => {
  const progress = getUserProgress();
  const today = new Date().toISOString().split("T")[0];
  const lastActive = progress.lastActiveDate.split("T")[0];
  
  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  
  if (today !== lastActive) {
    if (lastActive === yesterdayStr) {
      progress.currentStreak += 1;
    } else if (lastActive !== today) {
      progress.currentStreak = 1;
    }
  }
  
  progress.totalXP += xpGained;
  progress.lastActiveDate = new Date().toISOString();
  
  // Update league based on XP
  progress.league = getLeagueByXP(progress.totalXP);
  
  saveUserProgress(progress);
  return progress;
};

// Mark level as completed
export const completeLevel = (level: number): UserProgress => {
  const progress = getUserProgress();
  
  if (!progress.completedLevels.includes(level)) {
    progress.completedLevels.push(level);
    progress.currentLevel = level + 1;
  }
  
  saveUserProgress(progress);
  return progress;
};

// Get league based on total XP
const getLeagueByXP = (xp: number): UserProgress["league"] => {
  if (xp >= 500) return "Diamond";
  if (xp >= 350) return "Platinum";
  if (xp >= 250) return "Gold";
  if (xp >= 150) return "Silver";
  if (xp >= 50) return "Bronze";
  return "Wooden";
};

// Set daily goal
export const setDailyGoal = (goalName: string, minutes: number): UserProgress => {
  const progress = getUserProgress();
  progress.dailyGoal = { name: goalName, minutes };
  saveUserProgress(progress);
  return progress;
};

// Get level stats
export const getLevelStats = (level: number): LevelStats | null => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEYS.LEVEL_STATS}_${level}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading level stats:", error);
  }
  return null;
};

// Save level stats
export const saveLevelStats = (stats: LevelStats): void => {
  try {
    localStorage.setItem(`${STORAGE_KEYS.LEVEL_STATS}_${stats.level}`, JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving level stats:", error);
  }
};

// Reset all progress (for testing)
export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
  saveUserProgress(DEFAULT_USER_PROGRESS);
};
