import { getAssessments } from "@/actions/interview";
import React from "react";
import PerformanceChart from "./_component/performance-chart";
import QuizList from "./_component/quiz-list";
import StatsCard from "./_component/stats-card";
const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div className="space-y-10">
      {" "}
      <div className="space-y-6">
        {" "}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 md:p-6">
          {" "}
          <StatsCard assessments={assessments} />{" "}
        </div>{" "}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 md:p-6">
          {" "}
          <PerformanceChart assessments={assessments} />{" "}
        </div>{" "}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 md:p-6">
          {" "}
          <QuizList assessments={assessments} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default InterviewPage;
