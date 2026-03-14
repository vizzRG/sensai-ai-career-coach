import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
  if (!result) return null;

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
        <Trophy className="h-6 w-6 text-yellow-400" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
          Quiz
        </span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
          Results
        </span>
      </h1>

      <CardContent className="space-y-8">
        {/* Score */}
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold text-white">
            {result.quizScore.toFixed(1)}%
          </h3>

          <Progress value={result.quizScore} className="w-full bg-white/10" />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-white/[0.02] border border-white/10 backdrop-blur-md p-4 rounded-xl">
            <p className="font-medium text-white">Improvement Tip</p>
            <p className="text-white/50 text-sm mt-1">
              {result.improvementTip}
            </p>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white text-lg">Question Review</h3>

          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-4 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-white">
                  {index + 1}. {q.questions}
                </p>

                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="text-white/50 text-sm space-y-1">
                <p>Your answer: {q.userAnswer}</p>

                {!q.isCorrect && (
                  <p className="text-green-400">Correct answer: {q.answer}</p>
                )}
              </div>

              <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg text-sm">
                <p className="font-medium text-white">Explanation</p>
                <p className="text-white/50 mt-1">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="pt-4">
          <Button
            onClick={onStartNew}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
