import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { Flame, Star, Trophy, Target, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  { label: "XP Points", value: "1,250", icon: Star, color: "text-xp" },
  { label: "Day Streak", value: "7", icon: Flame, color: "text-streak" },
  { label: "Problems Solved", value: "42", icon: Target, color: "text-primary" },
  { label: "Rank", value: "#128", icon: Trophy, color: "text-badge" },
];

const recentTopics = [
  { name: "Arrays", progress: 75, level: 4, xp: 320 },
  { name: "Linked Lists", progress: 40, level: 2, xp: 180 },
  { name: "Stacks", progress: 20, level: 1, xp: 80 },
];

const badges = [
  { name: "First Blood", emoji: "🗡️", desc: "Solve your first problem" },
  { name: "Hot Streak", emoji: "🔥", desc: "7-day streak" },
  { name: "Array Master", emoji: "📊", desc: "Complete Arrays track" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || "Coder";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient-primary">{username}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">Ready to level up today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-card border border-border rounded-lg p-4 animate-slide-up">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Progress */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
              <Link to="/topics">
                <Button variant="ghost" size="sm" className="gap-1">
                  All Topics <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            {recentTopics.map((topic) => (
              <Link key={topic.name} to="/topics" className="block">
                <div className="bg-gradient-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{topic.name}</h3>
                      <p className="text-xs text-muted-foreground">Level {topic.level} · {topic.xp} XP</p>
                    </div>
                    <span className="text-sm font-mono text-primary">{topic.progress}%</span>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>
              </Link>
            ))}

            {/* Daily Challenge */}
            <div className="bg-gradient-card border border-primary/30 rounded-lg p-5 glow-primary">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Daily Boss Challenge</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Defeat today's boss: "Two Sum" — Earn 100 bonus XP!
              </p>
              <Link to="/challenge/daily">
                <Button variant="hero" size="sm">Accept Challenge</Button>
              </Link>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Badges Earned</h2>
            <div className="space-y-3">
              {badges.map((badge) => (
                <div key={badge.name} className="bg-gradient-card border border-border rounded-lg p-3 flex items-center gap-3">
                  <span className="text-2xl">{badge.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
