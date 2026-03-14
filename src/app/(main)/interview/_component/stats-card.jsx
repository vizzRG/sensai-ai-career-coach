import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy } from "lucide-react";

const StatsCard = ({ assessments }) => {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0,
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0,
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Average Score */}
      <Card className="border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            Average Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-yellow-400" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              {getAverageScore()}%
            </span>
          </div>

          <p className="text-xs text-white/40 mt-1">Across all assessments</p>
        </CardContent>
      </Card>

      {/* Questions Practiced */}
      <Card className="border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-purple-400" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              {getTotalQuestions()}
            </span>
          </div>

          <p className="text-xs text-white/40 mt-1">Total Questions</p>
        </CardContent>
      </Card>

      {/* Latest Score */}
      <Card className="border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/70">
            Latest Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-indigo-400" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
            </span>
          </div>

          <p className="text-xs text-white/40 mt-1">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
