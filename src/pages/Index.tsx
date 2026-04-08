import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Code, Trophy, Brain, Flame, ChevronRight } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Learning", desc: "Adaptive difficulty that learns your strengths and weaknesses." },
  { icon: Trophy, title: "Gamified Experience", desc: "XP, badges, streaks, leaderboards, and boss challenges." },
  { icon: Code, title: "Interactive Challenges", desc: "Write and run code directly in the browser." },
  { icon: Flame, title: "Smart Hints", desc: "AI hints guide you step-by-step — no spoilers." },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero */}
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Zap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-gradient-primary">Codexium</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="hero" size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center max-w-3xl">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" /> AI-Powered DSA Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Level Up Your <br />
            <span className="text-gradient-primary">Coding Skills</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Master Data Structures & Algorithms through gamified challenges, AI-powered hints, and personalized learning paths.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="hero" size="lg" className="gap-2">
                Start Learning Free <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20 max-w-5xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gradient-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
              <feature.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
