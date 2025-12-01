import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
import { User, Users, UserPlus, Flame, Trophy, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserProgress } from "@/lib/storage";
import { UserProgress } from "@/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const userProgress = getUserProgress();
    setProgress(userProgress);

    // If no daily goal set, redirect to goal selection
    if (userProgress.dailyGoal.name === "Not set") {
      navigate("/goal-selection");
    }
  }, [navigate]);

  if (!progress) return null;

  const levels = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleLevelClick = (level: number) => {
    if (level <= progress.currentLevel) {
      navigate(`/level/${level}`);
    }
  };

  return (
    <div className="min-h-screen p-6 pb-24 relative">
      <ParticleBackground />
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in relative z-10">
        {/* Header with stats */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">
              <span className="text-gradient-primary">ALGO</span>
              <span className="text-gradient-accent">PATH</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back, {progress.username}!
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
            onClick={() => navigate("/profile")}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>

        {/* XP and Streak cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 card-glow border-primary/20 bg-gradient-to-br from-card to-card/50 hover-glow interactive-scale cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                <Trophy className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-black text-primary group-hover:text-gradient-primary transition-all duration-300">{progress.totalXP}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-glow border-accent/20 bg-gradient-to-br from-card to-card/50 hover-glow interactive-scale cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.4)] animate-pulse-glow">
                <Flame className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
                <p className="text-2xl font-black text-accent group-hover:text-gradient-accent transition-all duration-300">{progress.currentStreak}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* League badge */}
        <Card className="p-4 card-glow border-border bg-gradient-to-r from-card to-secondary hover-glow interactive-scale cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current League</p>
              <p className="text-xl font-bold text-foreground group-hover:text-gradient-accent transition-all duration-300">{progress.league} League</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center glow-accent animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-7 h-7 text-accent-foreground" />
            </div>
          </div>
        </Card>

        {/* Goal info */}
        {progress.dailyGoal.name !== "Not set" && (
          <Card className="p-4 border-border/50 bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Goal</p>
                <p className="text-lg font-semibold">{progress.dailyGoal.name}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/goal-selection")}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                Change
              </Button>
            </div>
          </Card>
        )}

        {/* Levels grid */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Learning Path</h2>
          <div className="grid grid-cols-4 gap-3">
            {levels.map((level) => {
              const isCompleted = progress.completedLevels.includes(level);
              const isLocked = level > progress.currentLevel;
              const isCurrent = level === progress.currentLevel;

              return (
                <button
                  key={level}
                  onClick={() => handleLevelClick(level)}
                  disabled={isLocked}
                  className={`
                    aspect-square rounded-2xl p-4 flex flex-col items-center justify-center
                    transition-all duration-300 relative overflow-hidden group
                    ${isCompleted 
                      ? "bg-gradient-to-br from-success to-success/70 text-success-foreground shadow-[0_0_30px_hsl(var(--success)/0.3)] scale-100 hover:scale-110 hover:shadow-[0_0_50px_hsl(var(--success)/0.5)]" 
                      : isCurrent
                      ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.4)] animate-pulse-glow hover:scale-110 hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)]"
                      : isLocked
                      ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                      : "bg-card border-2 border-border hover:border-primary hover:scale-110 hover:bg-primary/5 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                    }
                  `}
                >
                  {isLocked && (
                    <Lock className="w-6 h-6 mb-1 opacity-50" />
                  )}
                  <span className="text-2xl font-black group-hover:scale-110 transition-transform duration-300">{level}</span>
                  <span className="text-xs font-medium">
                    {isCompleted ? "Done" : isCurrent ? "Start" : "Level"}
                  </span>
                  {!isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-300 rounded-2xl pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Social actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 border-border hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300 group"
          >
            <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Friends
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-border hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300 group"
          >
            <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Add Friends
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
