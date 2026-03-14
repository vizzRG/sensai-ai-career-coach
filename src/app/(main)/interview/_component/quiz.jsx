"use client";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./quiz-result";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return (
      <div className="mx-2">
        <BarLoader width={"100%"} color="#6366f1" />
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              Ready to test
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              your knowledge?
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-white/50">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={generateQuizFn}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2 border border-white/10 bg-white/[0.02] backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white text-xl">
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-lg font-semibold text-white">{question.question}</p>

        <RadioGroup
          className="space-y-3"
          onValueChange={handleAnswer}
          value={answers[currentQuestion] ?? ""}
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 border border-white/10 rounded-lg p-3 hover:bg-white/[0.03] transition"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-white/80">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-white/[0.03] border border-white/10 rounded-lg">
            <p className="font-medium text-white">Explanation:</p>
            <p className="text-white/50 text-sm mt-1">{question.explanation}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-3">
        {!showExplanation && (
          <Button
            variant="outline"
            onClick={() => setShowExplanation(true)}
            disabled={!answers[currentQuestion]}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          disabled={!answers[currentQuestion] || savingResult}
        >
          {savingResult && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
