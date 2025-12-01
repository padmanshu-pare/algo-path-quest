import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticleBackground";
import { Github, Chrome, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <ParticleBackground />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8 animate-fade-in">
        {/* Logo and title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 glow-primary mb-4">
            <Code2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            <span className="text-gradient-primary">ALGO</span>
            <span className="text-gradient-accent">PATH</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Master Data Structures & Algorithms through gamified learning
          </p>
        </div>

        {/* Get started button */}
        <div className="space-y-4">
          <Button 
            onClick={handleGetStarted}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 glow-primary transition-all duration-300"
            size="lg"
          >
            Get Started
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social login options */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-12 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
              onClick={handleGetStarted}
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
              onClick={handleGetStarted}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
              onClick={handleGetStarted}
            >
              <Code2 className="w-5 h-5 mr-2" />
              Continue with LeetCode
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Welcome;
