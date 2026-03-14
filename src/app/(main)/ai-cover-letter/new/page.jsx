import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_component/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="space-y-8 ">
      <div className="flex flex-col space-y-4 ">
        <Link href="/ai-cover-letter">
          <Button
            variant="ghost"
            className="gap-2 w-fit text-white/70 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4 " />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="mx-5">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              Create
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Cover Letter
            </span>
          </h1>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 ">
        <CoverLetterGenerator />
      </div>
    </div>
  );
}
