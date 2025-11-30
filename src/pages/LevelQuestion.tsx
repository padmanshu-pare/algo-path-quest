import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Clock, ArrowLeft, RotateCcw, ArrowRight } from "lucide-react";
import { getQuestionByLevel } from "@/data/questions";
import { updateXP, completeLevel, getUserProgress } from "@/lib/storage";
import { Question } from "@/types";
import { toast } from "sonner";

const LevelQuestion = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [xpGained, setXpGained] = useState(0);

  useEffect(() => {
    if (level) {
      const q = getQuestionByLevel(parseInt(level));
      setQuestion(q || null);
    }
  }, [level]);

  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSubmit();
    }
  }, [timeLeft, isAnswered]);

  const handleSubmit = () => {
    if (!question || !selectedAnswer) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      const xp = question.xpReward;
      setXpGained(xp);
      updateXP(xp);
      completeLevel(question.level);
      toast.success(`Correct! +${xp} XP`, {
        description: "You're crushing it! 🎉",
      });
    } else {
      toast.error("Incorrect answer", {
        description: "Try again to master this level!",
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimeLeft(60);
    setXpGained(0);
  };

  const handleNextLevel = () => {
    const progress = getUserProgress();
    if (progress.currentLevel <= 8) {
      navigate(`/level/${progress.currentLevel}`);
    } else {
      navigate("/dashboard");
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Level not found</p>
      </div>
    );
  }

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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-muted">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-bold text-primary">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-black text-xl">LEVEL {question.level}</span>
          </div>
        </div>

        {/* Problem statement */}
        <Card className="p-6 card-glow border-primary/20 bg-gradient-to-br from-card to-secondary/30">
          <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">
            Problem Statement:
          </h3>
          <p className="text-foreground leading-relaxed">{question.problemStatement}</p>
        </Card>

        {/* Question */}
        <Card className="p-6 card-glow border-accent/20 bg-gradient-to-br from-card to-card/50">
          <h3 className="text-sm font-bold text-accent mb-3 uppercase tracking-wide">
            Question:
          </h3>
          <p className="text-lg font-semibold text-foreground">{question.question}</p>
        </Card>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const showCorrect = isAnswered && option.id === question.correctAnswer;
            const showWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => !isAnswered && setSelectedAnswer(option.id)}
                disabled={isAnswered}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-300
                  flex items-center space-x-3
                  ${showCorrect
                    ? "bg-success/20 border-2 border-success scale-[1.02]"
                    : showWrong
                    ? "bg-destructive/20 border-2 border-destructive"
                    : isSelected
                    ? "bg-primary/20 border-2 border-primary scale-[1.02]"
                    : "bg-card border border-border hover:border-primary hover:bg-primary/5"
                  }
                  ${isAnswered ? "cursor-default" : "cursor-pointer hover:scale-[1.01]"}
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-bold
                    ${showCorrect
                      ? "bg-success text-success-foreground"
                      : showWrong
                      ? "bg-destructive text-destructive-foreground"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                    }
                  `}
                >
                  {option.id}
                </div>
                <span className="flex-1 font-medium">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        {!isAnswered ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 glow-primary disabled:opacity-50"
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-4">
            {isCorrect && (
              <Card className="p-6 text-center card-glow border-success/30 bg-success/10 animate-scale-in">
                <Trophy className="w-12 h-12 text-success mx-auto mb-3" />
                <h3 className="text-2xl font-black text-success mb-2">Correct!</h3>
                <p className="text-xl font-bold text-accent">+{xpGained} XP</p>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="h-12 border-border hover:border-primary hover:bg-primary/5"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button
                onClick={handleNextLevel}
                className="h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isCorrect ? "Next Level" : "Dashboard"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelQuestion;
