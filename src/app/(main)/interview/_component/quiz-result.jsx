import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
  if (!result) return null;
  console.log(result.questions);

  return (
    <div className="mx-auto ">
      <h1 className="flex items-center  gap-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className={"spac-y-6"}>
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className={"w-full"} />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div className="border rounded-lg p-4 space-y-2" key={index}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="text-muted-foreground text-sm">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>

              <div className="bg-muted p-2 rounded text-sm">
                <p className="font-medium">Explanation: </p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
