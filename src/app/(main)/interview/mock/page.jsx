import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_component/quiz";

const MockInterviewPage = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <Link href={"/interview"}>
          <Button
            variant="ghost"
            className="gap-2 w-fit text-white/70 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              Mock
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Interview
            </span>
          </h1>

          <p className="text-white/40 mt-3">
            Test your knowledge with industry-specific interview questions
          </p>
        </div>
      </div>

      {/* Quiz Container */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8">
        <Quiz />
      </div>
    </div>
  );
};

export default MockInterviewPage;
