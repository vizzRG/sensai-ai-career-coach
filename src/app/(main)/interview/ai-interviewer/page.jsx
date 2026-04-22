import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, TimerReset, Waves } from "lucide-react";
import Link from "next/link";
import React from "react";
import VideoInterviewer from "../_component/video-interviewer";

const AIInterviewerPage = () => {
  return (
    <div className="container mx-auto space-y-8 px-4 py-6 md:space-y-10 md:py-8">
      <div className="flex flex-col gap-6">
        <Link href="/interview">
          <Button
            variant="ghost"
            className="w-fit gap-2 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1fr_20rem] xl:items-end">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Immersive mock interview
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    AI
                  </span>{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Sensei
                  </span>
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-7 text-white/55 md:text-lg">
                  Practice in a setup that feels closer to a real interview: live
                  voice interaction, camera preview, session history, and instant AI
                  feedback when you finish.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                  <Waves className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-white">Voice or text</p>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Switch answer mode anytime without losing the flow.
                </p>
              </div>

              <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-400/15 text-indigo-300">
                  <TimerReset className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-white">Fast rounds</p>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Tight layout and faster loading keep practice sessions moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoInterviewer />
    </div>
  );
};

export default AIInterviewerPage;
