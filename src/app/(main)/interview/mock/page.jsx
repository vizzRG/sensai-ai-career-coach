import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_component/quiz";

const MockInterviewPage = () => {
  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex-col flex space-y-2 mx-2">
        <Link href={"/interview"}>
          <Button variant={"link"} className={"gap-2 pl-0"}>
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-6xl  ">
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
              Mock Interview
            </span>
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>
      <Quiz />
    </div>
  );
};

export default MockInterviewPage;
