import Navbar from "@/components/Navbar";
import { Trophy, Medal, Flame } from "lucide-react";

const leaderboardData = [
  { rank: 1, username: "CodeNinja99", xp: 5420, streak: 30, problems: 156 },
  { rank: 2, username: "AlgoQueen", xp: 4890, streak: 22, problems: 143 },
  { rank: 3, username: "BitWizard", xp: 4350, streak: 18, problems: 128 },
  { rank: 4, username: "DSA_Master", xp: 3980, streak: 15, problems: 112 },
  { rank: 5, username: "BugSlayer", xp: 3210, streak: 12, problems: 95 },
  { rank: 6, username: "StackOverflow", xp: 2870, streak: 10, problems: 87 },
  { rank: 7, username: "RecursiveRick", xp: 2540, streak: 9, problems: 76 },
  { rank: 8, username: "TreeTraverser", xp: 2100, streak: 7, problems: 64 },
  { rank: 9, username: "GraphGuru", xp: 1780, streak: 5, problems: 52 },
  { rank: 10, username: "LinkedLisa", xp: 1250, streak: 3, problems: 42 },
];

const rankColors: Record<number, string> = {
  1: "text-xp",
  2: "text-muted-foreground",
  3: "text-streak",
};

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-7 w-7 text-xp" />
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
        </div>

        <div className="bg-gradient-card border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_80px_80px_80px] gap-2 px-4 py-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">XP</span>
            <span className="text-right">Streak</span>
            <span className="text-right">Solved</span>
          </div>

          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className="grid grid-cols-[60px_1fr_80px_80px_80px] gap-2 px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors items-center"
            >
              <span className={`font-bold text-lg ${rankColors[player.rank] || "text-foreground"}`}>
                {player.rank <= 3 ? (
                  <Medal className={`h-5 w-5 inline ${rankColors[player.rank]}`} />
                ) : (
                  `#${player.rank}`
                )}
              </span>
              <span className="font-medium text-foreground">{player.username}</span>
              <span className="text-right font-mono text-sm text-xp">{player.xp.toLocaleString()}</span>
              <span className="text-right text-sm flex items-center justify-end gap-1">
                <Flame className="h-3 w-3 text-streak" />
                {player.streak}
              </span>
              <span className="text-right text-sm text-muted-foreground">{player.problems}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
