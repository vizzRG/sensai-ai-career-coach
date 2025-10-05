import { getAssessments } from "@/actions/interview";
import React from "react";
import PerformanceChart from "./_component/performance-chart";
import QuizList from "./_component/quiz-list";
import StatsCard from "./_component/stats-card";

const InterviewPage = async () => {
  const assessments = await getAssessments();

  return (
    <div className="space-y-6">
      <h1 className="text-6xl  ">
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
          Interview Preparation
        </span>
      </h1>

      <div className="space-y-6">
        <StatsCard assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
