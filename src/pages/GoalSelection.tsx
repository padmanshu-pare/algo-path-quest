import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setDailyGoal } from "@/lib/storage";

const goals = [
  { name: "Casual", minutes: 10, description: "Perfect for busy schedules" },
  { name: "Regular", minutes: 20, description: "Steady progress every day" },
  { name: "Serious", minutes: 30, description: "Committed to learning" },
  { name: "Insane", minutes: 40, description: "All in on mastery" },
  { name: "Extreme", minutes: 60, description: "Maximum dedication" },
];

const GoalSelection = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSelectGoal = (goalName: string) => {
    setSelectedGoal(goalName);
  };

  const handleConfirm = () => {
    if (selectedGoal) {
      const goal = goals.find((g) => g.name === selectedGoal);
      if (goal) {
        setDailyGoal(goal.name, goal.minutes);
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 glow-primary mb-4">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-black">Pick Your Goal</h1>
          <p className="text-muted-foreground">
            How much time can you dedicate each day?
          </p>
        </div>

        {/* Goal cards */}
        <div className="space-y-3">
          {goals.map((goal, index) => (
            <Card
              key={goal.name}
              onClick={() => handleSelectGoal(goal.name)}
              className={`
                p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]
                ${selectedGoal === goal.name
                  ? "border-2 border-primary bg-primary/10 card-glow"
                  : "border border-border hover:border-primary/50"
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold">{goal.name}</h3>
                    {selectedGoal === goal.name && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl font-bold">{goal.minutes}</span>
                  <span className="text-sm">min</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info text */}
        <p className="text-sm text-center text-muted-foreground">
          You can always change this later in your settings
        </p>

        {/* Confirm button */}
        <Button
          onClick={handleConfirm}
          disabled={!selectedGoal}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          Pick Your Path & Begin
        </Button>
      </div>
    </div>
  );
};

export default GoalSelection;
