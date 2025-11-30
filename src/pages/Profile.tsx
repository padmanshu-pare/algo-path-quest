import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trophy, Flame, Target, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserProgress, saveUserProgress, resetProgress } from "@/lib/storage";
import { UserProgress } from "@/types";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userProgress = getUserProgress();
    setProgress(userProgress);
    setUsername(userProgress.username);
  }, []);

  const handleSaveUsername = () => {
    if (progress && username.trim()) {
      const updated = { ...progress, username: username.trim() };
      saveUserProgress(updated);
      setProgress(updated);
      setIsEditing(false);
      toast.success("Username updated!");
    }
  };

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      resetProgress();
      toast.success("Progress reset successfully");
      navigate("/");
    }
  };

  if (!progress) return null;

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-black">Profile</h1>
          <div className="w-10"></div>
        </div>

        {/* Profile card */}
        <Card className="p-6 card-glow border-primary/20 bg-gradient-to-br from-card to-secondary/30">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center glow-primary">
              <span className="text-3xl font-black text-primary-foreground">
                {progress.username[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-background"
                    placeholder="Enter username"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSaveUsername}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setUsername(progress.username);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black">{progress.username}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-primary hover:text-primary hover:bg-primary/10 -ml-2"
                  >
                    Edit username
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div>
          <h3 className="text-lg font-bold mb-4">Your Stats</h3>
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-4 card-glow border-primary/20 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                    <p className="text-2xl font-black text-primary">{progress.totalXP}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 card-glow border-accent/20 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-black text-accent">{progress.currentStreak} days</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 card-glow border-border bg-gradient-to-r from-card to-secondary">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">League</p>
                    <p className="text-xl font-bold">{progress.league}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Progress */}
        <div>
          <h3 className="text-lg font-bold mb-4">Learning Progress</h3>
          <Card className="p-4 border-border bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completed Levels</span>
              <span className="font-bold">{progress.completedLevels.length} / 8</span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                style={{ width: `${(progress.completedLevels.length / 8) * 100}%` }}
              ></div>
            </div>
          </Card>
        </div>

        {/* Daily goal */}
        {progress.dailyGoal.name !== "Not set" && (
          <div>
            <h3 className="text-lg font-bold mb-4">Daily Goal</h3>
            <Card className="p-4 border-border bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{progress.dailyGoal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {progress.dailyGoal.minutes} minutes per day
                  </p>
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
          </div>
        )}

        {/* Danger zone */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-destructive">Danger Zone</h3>
          <Card className="p-4 border-destructive/30 bg-destructive/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Reset All Progress</p>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleResetProgress}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
