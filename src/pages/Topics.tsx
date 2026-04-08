import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
  { id: "arrays", name: "Arrays", level: 4, problems: 20, solved: 15, unlocked: true, emoji: "📊" },
  { id: "strings", name: "Strings", level: 2, problems: 18, solved: 8, unlocked: true, emoji: "🔤" },
  { id: "linked-lists", name: "Linked Lists", level: 2, problems: 15, solved: 6, unlocked: true, emoji: "🔗" },
  { id: "stacks", name: "Stacks & Queues", level: 1, problems: 14, solved: 3, unlocked: true, emoji: "📚" },
  { id: "trees", name: "Trees", level: 0, problems: 20, solved: 0, unlocked: false, emoji: "🌲" },
  { id: "graphs", name: "Graphs", level: 0, problems: 22, solved: 0, unlocked: false, emoji: "🕸️" },
  { id: "dp", name: "Dynamic Programming", level: 0, problems: 25, solved: 0, unlocked: false, emoji: "🧩" },
  { id: "sorting", name: "Sorting & Searching", level: 0, problems: 16, solved: 0, unlocked: false, emoji: "🔀" },
];

export default function Topics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Tracks</h1>
        <p className="text-muted-foreground mb-8">Master DSA topic by topic. Unlock new tracks as you progress.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {topics.map((topic) => {
            const progress = topic.problems > 0 ? Math.round((topic.solved / topic.problems) * 100) : 0;
            return (
              <div
                key={topic.id}
                className={`bg-gradient-card border rounded-lg p-5 transition-all ${
                  topic.unlocked ? "border-border hover:border-primary/50 cursor-pointer" : "border-border/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{topic.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{topic.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Level {topic.level} · {topic.solved}/{topic.problems} problems
                      </p>
                    </div>
                  </div>
                  {!topic.unlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                  {topic.unlocked && progress === 100 && <CheckCircle className="h-5 w-5 text-primary" />}
                </div>
                <Progress value={progress} className="h-2 mb-3" />
                {topic.unlocked && (
                  <Link to={`/challenge/${topic.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      <Play className="h-3 w-3" /> Continue
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
