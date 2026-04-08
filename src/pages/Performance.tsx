import Navbar from "@/components/Navbar";
import { BarChart3, TrendingUp, Clock, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const topicPerformance = [
  { topic: "Arrays", accuracy: 85, avgTime: "4m 20s", solved: 15, total: 20 },
  { topic: "Strings", accuracy: 72, avgTime: "5m 10s", solved: 8, total: 18 },
  { topic: "Linked Lists", accuracy: 60, avgTime: "7m 30s", solved: 6, total: 15 },
  { topic: "Stacks & Queues", accuracy: 45, avgTime: "8m 15s", solved: 3, total: 14 },
];

const weeklyActivity = [
  { day: "Mon", problems: 5 },
  { day: "Tue", problems: 3 },
  { day: "Wed", problems: 7 },
  { day: "Thu", problems: 2 },
  { day: "Fri", problems: 6 },
  { day: "Sat", problems: 8 },
  { day: "Sun", problems: 4 },
];

const overallStats = [
  { label: "Total Problems Solved", value: "42", icon: Target },
  { label: "Average Accuracy", value: "68%", icon: TrendingUp },
  { label: "Average Time/Problem", value: "5m 45s", icon: Clock },
  { label: "Improvement Rate", value: "+12%", icon: BarChart3 },
];

export default function Performance() {
  const maxProblems = Math.max(...weeklyActivity.map((d) => d.problems));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Performance Dashboard</h1>
        <p className="text-muted-foreground mb-8">Track your progress and identify areas for improvement.</p>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {overallStats.map((stat) => (
            <div key={stat.label} className="bg-gradient-card border border-border rounded-lg p-4">
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div className="bg-gradient-card border border-border rounded-lg p-5">
            <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Activity</h2>
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary/80 rounded-t-md transition-all"
                    style={{ height: `${(day.problems / maxProblems) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Breakdown */}
          <div className="bg-gradient-card border border-border rounded-lg p-5">
            <h2 className="text-lg font-semibold text-foreground mb-4">Topic Performance</h2>
            <div className="space-y-4">
              {topicPerformance.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                    <span className="text-xs text-muted-foreground">{topic.accuracy}% accuracy</span>
                  </div>
                  <Progress value={topic.accuracy} className="h-2" />
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">Avg: {topic.avgTime}</span>
                    <span className="text-xs text-muted-foreground">{topic.solved}/{topic.total} solved</span>
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
