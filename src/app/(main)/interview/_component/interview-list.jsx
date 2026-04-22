"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, MessageSquare, Star } from "lucide-react";

const ReactMarkdown = dynamic(() => import("react-markdown"));

const InterviewList = ({ interviews }) => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const interviewCount = useMemo(() => interviews?.length || 0, [interviews]);

  if (!interviews || interviews.length === 0) return null;

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight md:text-3xl">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                AI
              </span>{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Interviews
              </span>
            </CardTitle>

            <CardDescription className="text-white/40">
              Review your past face-to-face practice sessions
            </CardDescription>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/55">
            {interviewCount} session{interviewCount === 1 ? "" : "s"} saved
          </div>
        </div>

        <div className="grid gap-4">
          {interviews.map((interview, index) => (
            <Card
              key={interview.id}
              onClick={() => setSelectedInterview(interview)}
              className="group relative cursor-pointer overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/[0.05]"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader className="gap-4 p-5 sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <CardTitle className="text-lg font-bold text-white">
                        Session #{interviewCount - index}
                      </CardTitle>
                      <Badge
                        variant={
                          interview.status === "completed" ? "default" : "secondary"
                        }
                        className={
                          interview.status === "completed"
                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                            : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                        }
                      >
                        {interview.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {format(new Date(interview.createdAt), "MMM dd, yyyy")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        {interview.transcript?.length || 0} messages
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 text-white/55 hover:bg-white/5 hover:text-white md:min-w-36"
                  >
                    View Results
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-6 text-white/55">
                  {interview.feedback
                    ? "Open this session to review the AI evaluation and the full conversation transcript."
                    : "This session is still in progress. Open it to continue reviewing the conversation so far."}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedInterview}
        onOpenChange={() => setSelectedInterview(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border border-white/10 bg-[#0a0a0a] p-0 text-white">
          <DialogHeader className="border-b border-white/10 bg-white/[0.02] p-6">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
              <Star className="fill-yellow-400 text-yellow-400" size={24} />
              Interview Evaluation
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 p-6">
            {selectedInterview?.feedback && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border-indigo-500/20 bg-indigo-500/10 text-[10px] uppercase tracking-widest text-indigo-400">
                    AI Feedback
                  </Badge>
                  <span className="text-xs uppercase tracking-[0.24em] text-white/30">
                    Session insight
                  </span>
                </div>
                <div className="prose prose-invert max-w-none rounded-3xl border border-white/5 bg-white/5 p-6 leading-relaxed prose-headings:text-indigo-400 prose-li:text-white/80 prose-p:text-white/80 prose-strong:text-white md:p-8">
                  <ReactMarkdown>{selectedInterview.feedback}</ReactMarkdown>
                </div>
              </section>
            )}

            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white/80">
                    Full Transcript
                  </h4>
                  <p className="text-sm text-white/40">
                    Replay the exchange between you and Sensei.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/45">
                  {selectedInterview?.transcript?.length || 0} total messages
                </div>
              </div>
              <div className="space-y-4">
                {selectedInterview?.transcript.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="mb-1 px-2 text-[10px] uppercase tracking-widest text-white/30">
                      {msg.role === "interviewer" ? "Sensei (SensAI)" : "You"}
                    </div>
                    <div
                      className={`max-w-[92%] rounded-2xl p-4 sm:max-w-[85%] ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-indigo-600 text-white"
                          : "rounded-tl-sm border border-white/5 bg-white/10 text-white/90"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewList;
