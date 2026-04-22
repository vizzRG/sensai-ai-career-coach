"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

export async function startInterview() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      resume: true,
      assessments: {
        orderBy: { createdAt: "desc" },
        take: 2,
      },
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const interview = await db.interview.create({
      data: {
        userId: user.id,
        transcript: [],
        status: "in_progress",
      },
    });

    const recentAssessments = user.assessments
      .map((a) => `Category: ${a.category}, Score: ${a.quizScore}%`)
      .join("; ");

    const initialPrompt = `You are Sensei, a professional technical interviewer from SensAI. 
    You are interviewing ${user.name || "a candidate"} for a ${user.industry} position.
    The candidate has the following skills: ${user.skills.join(", ")}.
    ${user.resume ? `Their resume content: ${user.resume.content.substring(0, 1000)}...` : ""}
    ${recentAssessments ? `Their recent quiz performance: ${recentAssessments}` : ""}
    
    Start the interview by introducing yourself as Sensei and asking the first technical question based on their profile.
    Address the candidate by their name (${user.name || "Candidate"}).
    Keep your response concise and professional.
    Return your response as a simple string.`;

    const result = await model.generateContent(initialPrompt);
    const interviewerResponse = result.response.text().trim();

    // Update transcript with initial message
    await db.interview.update({
      where: { id: interview.id },
      data: {
        transcript: [
          { role: "interviewer", content: interviewerResponse },
        ],
      },
    });

    return {
      interviewId: interview.id,
      message: interviewerResponse,
    };
  } catch (error) {
    console.error("Error starting interview:", error);
    throw new Error("Failed to start interview");
  }
}

export async function answerQuestion(interviewId, userMessage) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const interview = await db.interview.findUnique({
    where: { id: interviewId },
    include: { user: true },
  });

  if (!interview || interview.status === "completed") {
    throw new Error("Interview not found or already completed");
  }

  const user = interview.user;
  const systemInstruction = `You are Sensei, a professional technical interviewer from SensAI. 
  You are interviewing ${user.name || "a candidate"} for a ${user.industry} position.
  The candidate has the following skills: ${user.skills.join(", ")}.
  Always address the candidate as ${user.name || "Candidate"}.
  Keep your responses concise and professional.`;

  try {
    const updatedTranscript = [
      ...(Array.isArray(interview.transcript) ? interview.transcript : []),
      { role: "user", content: userMessage },
    ];

    // Gemini requires history to start with 'user' and alternate.
    // If our transcript starts with an 'interviewer' message, we need to handle it.
    let history = [];
    let firstMessageProcessed = false;

    for (const m of interview.transcript) {
      const role = m.role === "interviewer" ? "model" : "user";
      
      // Skip until we find the first 'user' message to satisfy Gemini's requirement
      if (!firstMessageProcessed && role === "model") {
        continue; 
      }
      firstMessageProcessed = true;
      
      history.push({
        role,
        parts: [{ text: m.content }],
      });
    }

    // If history is still empty or doesn't start with user (it should now), 
    // we use the full context in the prompt instead of startChat history
    const chatModel = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction,
    });

    const chatSession = chatModel.startChat({ history });

    const result = await chatSession.sendMessage(userMessage);
    const interviewerResponse = result.response.text().trim();

    const finalTranscript = [
      ...updatedTranscript,
      { role: "interviewer", content: interviewerResponse },
    ];

    await db.interview.update({
      where: { id: interviewId },
      data: { transcript: finalTranscript },
    });

    return {
      message: interviewerResponse,
    };
  } catch (error) {
    console.error("Error answering question details:", {
      interviewId,
      userMessage,
      error: error.message,
    });
    throw new Error("Failed to process answer: " + error.message);
  }
}

export async function finishInterview(interviewId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const interview = await db.interview.findUnique({
    where: { id: interviewId },
  });

  if (!interview) throw new Error("Interview not found");

  try {
    const evaluationPrompt = `
      Evaluate this interview transcript for a technical position.
      Transcript: ${JSON.stringify(interview.transcript)}
      
      Provide a detailed evaluation including:
      1. Strengths
      2. Areas for improvement
      3. Overall recommendation
      
      Format the response in Markdown.
    `;

    const result = await model.generateContent(evaluationPrompt);
    const evaluation = result.response.text().trim();

    await db.interview.update({
      where: { id: interviewId },
      data: {
        feedback: evaluation,
        status: "completed",
      },
    });

    return { feedback: evaluation };
  } catch (error) {
    console.error("Error finishing interview:", error);
    throw new Error("Failed to finish interview");
  }
}

export async function getInterviews() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const interviews = await db.interview.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return interviews;
  } catch (error) {
    console.error("Error fetching interviews:", error);
    throw new Error("Failed to fetch interviews");
  }
}
