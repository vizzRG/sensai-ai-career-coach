"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Loader2,
  MessageSquare,
  Mic,
  MicOff,
  Play,
  Send,
  Sparkles,
  Star,
  Video,
  VideoOff,
  Volume2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import {
  answerQuestion,
  finishInterview,
  startInterview,
} from "@/actions/ai-interviewer";

const Webcam = dynamic(() => import("react-webcam"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/70">
        <Loader2 className="h-4 w-4 animate-spin" />
        Preparing camera preview
      </div>
    </div>
  ),
});

const ReactMarkdown = dynamic(() => import("react-markdown"));

const onboardingTips = [
  "Keep your answers structured: context, action, outcome.",
  "Use voice mode for realism or switch to text input anytime.",
  "End the session when you are ready to generate feedback.",
];

const VideoInterviewer = () => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualAnswer, setManualAnswer] = useState("");
  const recognitionRef = useRef(null);
  const transcriptEndRef = useRef(null);

  const {
    loading: starting,
    fn: startInterviewFn,
    data: startData,
  } = useFetch(startInterview);
  const {
    loading: answering,
    fn: answerQuestionFn,
    data: answerData,
  } = useFetch(answerQuestion);
  const {
    loading: finishing,
    fn: finishInterviewFn,
    data: finishData,
  } = useFetch(finishInterview);

  const displayTranscript = useMemo(() => {
    const fullTranscript = `${transcript}${interimTranscript}`.trim();
    return fullTranscript || null;
  }, [interimTranscript, transcript]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.");
      setIsManualInput(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let nextInterimTranscript = "";
      let nextFinalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const text = event.results[i][0]?.transcript || "";
        if (event.results[i].isFinal) {
          nextFinalTranscript += `${text} `;
        } else {
          nextInterimTranscript += text;
        }
      }

      if (nextFinalTranscript) {
        setTranscript((prev) => `${prev}${nextFinalTranscript}`);
      }

      setInterimTranscript(nextInterimTranscript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "network") {
        toast.error(
          "Network error with speech recognition. If you are using Brave, try Chrome or switch to text mode."
        );
        setIsManualInput(true);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;

    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    return () => {
      recognition.stop();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (!startData) return;

    setInterviewId(startData.interviewId);
    startTransition(() => {
      setMessages([{ role: "interviewer", content: startData.message }]);
    });
    speak(startData.message);
  }, [startData]);

  useEffect(() => {
    if (!answerData) return;

    startTransition(() => {
      setMessages((prev) => [
        ...prev,
        { role: "interviewer", content: answerData.message },
      ]);
    });
    speak(answerData.message);
  }, [answerData]);

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(
        (voice) =>
          (voice.name.includes("Female") ||
            voice.name.includes("Google") ||
            voice.name.includes("Sensei")) &&
          voice.lang.startsWith("en")
      ) || voices.find((voice) => voice.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsAIPlaying(true);
    utterance.onend = () => setIsAIPlaying(false);
    utterance.onerror = () => setIsAIPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStart = async () => {
    await startInterviewFn();
  };

  const submitAnswer = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || !interviewId) return;

    startTransition(() => {
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    });

    setTranscript("");
    setInterimTranscript("");
    await answerQuestionFn(interviewId, trimmed);
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setIsManualInput(true);
      return;
    }

    if (isListening) {
      recognition.stop();
      const finalText = `${transcript}${interimTranscript}`.trim();
      if (finalText) {
        submitAnswer(finalText);
      }
      return;
    }

    setTranscript("");
    setInterimTranscript("");
    recognition.start();
    setIsListening(true);
  };

  const handleManualSubmit = async () => {
    if (!manualAnswer.trim()) return;
    await submitAnswer(manualAnswer);
    setManualAnswer("");
  };

  const handleFinish = async () => {
    if (!interviewId) return;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    await finishInterviewFn(interviewId);
  };

  if (finishData) {
    return (
      <div className="mx-auto max-w-5xl animate-in fade-in zoom-in duration-500">
        <Card className="overflow-hidden border-white/10 bg-white/[0.03] shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" />
          <CardHeader className="gap-6 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="space-y-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Session complete
              </div>
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  Performance Report
                </CardTitle>
                <CardDescription className="mt-2 max-w-2xl text-sm text-white/55 md:text-base">
                  Review your interview feedback, spot improvement areas, and jump
                  back in for another round when you are ready.
                </CardDescription>
              </div>
            </div>

            <Button
              onClick={() => router.refresh()}
              className="h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
            >
              <Play className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-inner shadow-black/20 md:p-8">
              <div className="prose prose-invert max-w-none prose-headings:text-cyan-300 prose-p:text-white/80 prose-strong:text-white prose-li:text-white/75">
                <ReactMarkdown>{finishData.feedback}</ReactMarkdown>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">Next focus</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Re-run the interview after refining the examples you gave. Using
                  tighter STAR-style answers usually leads to stronger follow-up
                  responses and clearer impact.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-5">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/interview")}
                  className="justify-start rounded-2xl px-0 text-indigo-300 hover:bg-transparent hover:text-indigo-200"
                >
                  View All History
                </Button>
                <p className="text-sm text-white/55">
                  Your session is saved, so you can compare this report with previous
                  practice rounds anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <Card className="overflow-hidden border-white/10 bg-black/40 shadow-xl shadow-black/30">
          <div className="relative aspect-[4/3] sm:aspect-video">
            {isCameraOn ? (
              <Webcam
                audio={false}
                mirrored
                className="h-full w-full object-cover"
                videoConstraints={{ facingMode: "user" }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white/[0.03] text-white/30">
                <VideoOff size={64} />
                <p className="text-sm">Camera preview is paused</p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                {interviewId ? "Live interview" : "Pre-interview setup"}
              </div>
              {isAIPlaying && (
                <div className="flex items-center gap-2 rounded-full bg-cyan-500/85 px-3 py-1 text-xs font-medium text-white">
                  <Volume2 className="h-3.5 w-3.5" />
                  AI speaking
                </div>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/70 backdrop-blur-md">
                {isCameraOn
                  ? "Camera enabled"
                  : "Camera disabled, interview still works"}
              </div>

              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsCameraOn((prev) => !prev)}
                className="rounded-full border border-white/10 bg-black/50 text-white hover:bg-black/70"
              >
                {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
            {onboardingTips.map((tip) => (
              <div
                key={tip}
                className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-6 text-white/65"
              >
                {tip}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
                Live transcript
              </p>
              <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">
                {isListening
                  ? "Listening now"
                  : isManualInput
                    ? "Text mode"
                    : "Voice mode ready"}
              </div>
            </div>
            <div className="min-h-24 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-7 text-white/80">
              {displayTranscript || "Your spoken answer will appear here in real time."}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex min-h-full flex-col gap-6">
        {!interviewId ? (
          <Card className="overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <CardContent className="space-y-8 p-6 md:p-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Real-time practice
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    Ready for your interview session?
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/60 md:text-base">
                    We&apos;ll simulate a realistic face-to-face round using your
                    camera, microphone, and the context from your profile. You can
                    move between voice and text mode whenever you want.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">Best experience</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Use headphones, keep your face centered, and answer with examples
                    from real projects.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">No pressure</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    You can pause the camera, switch to typing, and finish the session
                    whenever you&apos;re ready.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleStart}
                disabled={starting}
                size="lg"
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-base font-semibold text-white shadow-lg shadow-indigo-500/20"
              >
                {starting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Start AI Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="flex-1 overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardHeader className="gap-4 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">
                    Conversation History
                  </CardTitle>
                  <CardDescription className="mt-1 text-white/50">
                    Follow the flow of your interview and refine your next answer in
                    real time.
                  </CardDescription>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsManualInput((prev) => !prev)}
                  className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 text-indigo-300 hover:bg-indigo-500/15 hover:text-indigo-200"
                >
                  {isManualInput ? (
                    <Mic className="mr-2 h-4 w-4" />
                  ) : (
                    <MessageSquare className="mr-2 h-4 w-4" />
                  )}
                  {isManualInput ? "Use Voice" : "Type Answer"}
                </Button>
              </CardHeader>

              <CardContent className="max-h-[32rem] space-y-4 overflow-y-auto p-5">
                {messages.map((msg, index) => (
                  <div
                    key={`${msg.role}-${index}`}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[92%] space-y-2 sm:max-w-[85%]">
                      <div className="px-1 text-[11px] uppercase tracking-[0.24em] text-white/35">
                        {msg.role === "user" ? "You" : "Sensei"}
                      </div>
                      <div
                        className={`rounded-3xl p-4 text-sm leading-7 shadow-lg shadow-black/10 ${
                          msg.role === "user"
                            ? "rounded-tr-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                            : "rounded-tl-md border border-white/8 bg-black/20 text-white/85"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </CardContent>
            </Card>

            {isManualInput ? (
              <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <CardContent className="space-y-4 p-5">
                  <Textarea
                    placeholder="Type your answer here..."
                    value={manualAnswer}
                    onChange={(event) => setManualAnswer(event.target.value)}
                    className="min-h-32 rounded-2xl border-white/10 bg-black/20 text-white placeholder:text-white/30 focus-visible:ring-indigo-500"
                  />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={handleManualSubmit}
                      disabled={answering || !manualAnswer.trim()}
                      className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white"
                    >
                      {answering ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Submit Answer
                    </Button>
                    <Button
                      onClick={() => setIsManualInput(false)}
                      variant="outline"
                      className="h-12 rounded-2xl border-white/10 bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      Back to Voice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <Button
                  onClick={toggleListening}
                  disabled={answering || isAIPlaying}
                  className={`h-14 rounded-2xl text-base font-semibold transition-all duration-300 ${
                    isListening
                      ? "animate-pulse bg-red-500 text-white hover:bg-red-600"
                      : "border border-white/10 bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {answering ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing answer...
                    </>
                  ) : isListening ? (
                    <>
                      <MicOff className="mr-2 h-5 w-5" />
                      Stop & Submit
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      Start Listening
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleFinish}
                  disabled={finishing}
                  variant="outline"
                  className="h-14 rounded-2xl border-red-500/20 bg-transparent px-5 text-red-300 hover:bg-red-500/10 hover:text-red-200"
                >
                  {finishing ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <XCircle className="mr-2 h-5 w-5" />
                  )}
                  End Interview
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoInterviewer;
