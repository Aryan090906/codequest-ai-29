import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Lightbulb, Play, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const sampleProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9" },
  ],
  hints: [
    "Think about what complement you need for each number.",
    "Can you use a hash map to store previously seen values?",
    "For each number, check if (target - number) exists in your map.",
  ],
};

export default function Challenge() {
  const { topicId } = useParams();
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  // Write your solution here\n  \n}`);
  const [hintIndex, setHintIndex] = useState(-1);
  const [output, setOutput] = useState("");

  const showNextHint = () => {
    if (hintIndex < sampleProblem.hints.length - 1) {
      setHintIndex(hintIndex + 1);
      toast.info("💡 Hint revealed!");
    } else {
      toast.info("No more hints available");
    }
  };

  const runCode = () => {
    setOutput("Running code...\n\n> Test Case 1: [2,7,11,15], target=9\n> Output: [0,1] ✅\n\n+50 XP earned!");
    toast.success("🎉 +50 XP! Problem solved!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Problem Description */}
          <div className="bg-gradient-card border border-border rounded-lg p-6 overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-foreground">{sampleProblem.title}</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                {sampleProblem.difficulty}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{sampleProblem.description}</p>

            <div className="space-y-3 mb-6">
              {sampleProblem.examples.map((ex, i) => (
                <div key={i} className="bg-muted rounded-md p-3 font-mono text-xs">
                  <p className="text-muted-foreground">Input: <span className="text-foreground">{ex.input}</span></p>
                  <p className="text-muted-foreground">Output: <span className="text-primary">{ex.output}</span></p>
                  <p className="text-muted-foreground">Explanation: {ex.explanation}</p>
                </div>
              ))}
            </div>

            {/* AI Hints */}
            <div className="border-t border-border pt-4">
              <Button variant="ghost" size="sm" onClick={showNextHint} className="gap-2 text-xp mb-3">
                <Lightbulb className="h-4 w-4" /> Get AI Hint ({hintIndex + 1}/{sampleProblem.hints.length})
              </Button>
              {hintIndex >= 0 && (
                <div className="space-y-2">
                  {sampleProblem.hints.slice(0, hintIndex + 1).map((hint, i) => (
                    <div key={i} className="bg-muted/50 border border-border/50 rounded-md p-3 text-sm text-foreground flex gap-2">
                      <Lightbulb className="h-4 w-4 text-xp shrink-0 mt-0.5" />
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-card border border-border rounded-lg flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="text-xs text-muted-foreground font-mono">JavaScript</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setCode(`function twoSum(nums, target) {\n  // Write your solution here\n  \n}`)}>
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent p-4 font-mono text-sm text-foreground resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="hero" className="flex-1 gap-2" onClick={runCode}>
                <Play className="h-4 w-4" /> Run & Submit
              </Button>
              <Button variant="ghost" className="gap-1">
                Skip <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {output && (
              <div className="bg-muted rounded-lg p-4 font-mono text-xs text-foreground whitespace-pre-wrap">
                {output}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
