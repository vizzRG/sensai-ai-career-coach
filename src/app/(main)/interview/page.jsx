import { getAssessments } from "@/actions/interview";
import { getInterviews } from "@/actions/ai-interviewer";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import StatsCard from "./_component/stats-card";
import { ArrowRight, BrainCircuit, Play, Sparkles, Zap } from "lucide-react";

const PerformanceChart = dynamic(() => import("./_component/performance-chart"), {
  loading: () => (
    <div className="h-[24rem] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
  ),
});

const QuizList = dynamic(() => import("./_component/quiz-list"), {
  loading: () => (
    <div className="h-[20rem] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
  ),
});

const InterviewList = dynamic(() => import("./_component/interview-list"), {
  loading: () => (
    <div className="h-[20rem] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
  ),
});

const InterviewPage = async () => {
  const [assessments, interviews] = await Promise.all([
    getAssessments(),
    getInterviews(),
  ]);

  return (
    <div className="container mx-auto space-y-10 px-4 py-8 md:space-y-12 md:py-10">
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-10 xl:p-12">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px] transition-all duration-700 group-hover:bg-indigo-500/20" />
        <div className="absolute -bottom-16 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] transition-all duration-700 group-hover:bg-cyan-500/20" />

        <div className="relative z-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div className="max-w-3xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
              <Sparkles size={14} />
              <span>New: Face-to-Face Interview</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl xl:text-6xl">
              Master Your Next <span className="gradient-text">Interview</span>
            </h1>
            <p className="text-base leading-8 text-white/55 md:text-lg">
              Practice technical and behavioral rounds in a cleaner, faster interview
              workspace. Review performance, revisit transcripts, and jump straight
              into the next mock session without friction.
            </p>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/interview/ai-interviewer" className="w-full sm:w-auto">
                <Button className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-8 text-lg text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.01] hover:shadow-indigo-500/40 sm:w-auto">
                  <Play className="mr-2 fill-white" />
                  Start AI Interview
                </Button>
              </Link>
              <Link href="#practice-overview" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-14 w-full rounded-2xl border-white/10 bg-white/5 px-8 text-white/70 hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  Explore your progress
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent p-1 shadow-2xl">
              <div className="space-y-4 rounded-[1.5rem] bg-black/40 p-6 text-center backdrop-blur-3xl">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/20">
                  <BrainCircuit size={32} className="text-indigo-400" />
                </div>
                <h4 className="text-xl font-bold">Personalized Prep</h4>
                <p className="text-sm leading-6 text-white/45">
                  Our AI tailors every question to your resume, skills, and industry
                  experience.
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-5 backdrop-blur-xl sm:content-start">
              <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="mt-1 rounded-xl bg-cyan-400/15 p-2 text-cyan-300">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Faster flow</p>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Cleaner layout and streamlined controls reduce friction between
                    practice rounds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="mt-1 rounded-xl bg-violet-400/15 p-2 text-violet-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Better review</p>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Revisit transcripts and feedback with a more readable, mobile-ready
                    history view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="practice-overview" className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <StatsCard assessments={assessments} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md md:p-6">
            <PerformanceChart assessments={assessments} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md md:p-6">
            <InterviewList interviews={interviews} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md md:p-6">
            <QuizList assessments={assessments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
