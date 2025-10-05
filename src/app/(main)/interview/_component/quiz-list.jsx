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
      <Card>
        <CardHeader className={"flex flex-row items-center justify-between"}>
          <div>
            <CardTitle
              className={
                "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight text-3xl md:text-4xl"
              }
            >
              Recent Quizzes
            </CardTitle>
            <CardDescription>Review your past quiz performance</CardDescription>
          </div>
          <Button onClick={() => router.push("/interview/mock")}>
            Start New Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment, i) => {
              return (
                <Card
                  key={assessment.id}
                  className={
                    "cursor-pointer hover:bg-muted/50 transition-colors"
                  }
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <CardHeader>
                    <CardTitle>Quiz {i + 1}</CardTitle>
                    <CardDescription className={"flex justify-between w-full"}>
                      <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                      <div>
                        {format(
                          new Date(assessment.createdAt),
                          "MMMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className={" min-w-3xl max-h-[90vh] overflow-y-auto"}>
          <DialogHeader>
            <DialogTitle></DialogTitle>
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
