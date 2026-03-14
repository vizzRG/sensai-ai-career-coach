import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_component/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between m-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"></span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></span>
        </h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 md:p-6">
        <CoverLetterList coverLetters={coverLetters} />
      </div>
    </div>
  );
}
