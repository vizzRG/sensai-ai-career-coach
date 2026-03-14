"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizResult from "./quiz-result";

const QuizList = ({ assessments }) => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                Recent
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                Quizzes
              </span>
            </CardTitle>

            <CardDescription className="text-white/40">
              Review your past quiz performance
            </CardDescription>
          </div>

          <Button
            onClick={() => router.push("/interview/mock")}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            Start New Quiz
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment, i) => (
              <Card
                key={assessment.id}
                onClick={() => setSelectedQuiz(assessment)}
                className="cursor-pointer border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-white">Quiz {i + 1}</CardTitle>

                  <CardDescription className="flex justify-between w-full text-white/40">
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>

                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm",
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-white/50">
                    {assessment.improvementTip}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="min-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Quiz Result</DialogTitle>
          </DialogHeader>

          <QuizResult
            result={selectedQuiz}
            onStartNew={() => router.push("/interview/mock")}
            hideStartNew
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizList;
