"use client";

import { saveResume } from "@/actions/resume";
import { resumeSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import EntryForm from "./entry-form";
import { entriesToMarkdown } from "@/app/lib/helper";
import MDEditor from "@uiw/react-md-editor";
import { useUser } from "@clerk/nextjs";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { toast } from "sonner";

const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [resumeMode, setResumeMode] = useState("preview");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef(null);

  const {
    control,
    watch,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved Successfully");
    if (saveError) toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);

    try {
      const element = resumeRef.current;

      if (!element) {
        throw new Error("Resume element not found");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(
        pdfWidth / canvas.width,
        pdfHeight / canvas.height,
      );

      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Sensai_Resume.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              Resume
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500/70  ">
              Builder
            </span>
          </h1>

          <div className="flex gap-3">
            <Button
              onClick={onSubmit}
              className="bg-white text-black hover:bg-white/90 font-medium"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>

            <Button
              onClick={handleGeneratePDF}
              disabled={isGenerating || activeTab !== "preview"}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/[0.03] border border-white/10 rounded-xl p-1">
            <TabsTrigger
              value="edit"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg"
            >
              Form
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg"
            >
              Markdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <form className="space-y-8">
              <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">
                  Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="Email"
                    className="bg-black/40 border-white/10"
                  />

                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="Mobile"
                    className="bg-black/40 border-white/10"
                  />

                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="LinkedIn"
                    className="bg-black/40 border-white/10"
                  />

                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="Twitter"
                    className="bg-black/40 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">
                  Professional Summary
                </h3>

                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32 bg-black/40 border-white/10"
                    />
                  )}
                />
              </div>

              <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">Skills</h3>

                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32 bg-black/40 border-white/10"
                    />
                  )}
                />
              </div>

              <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">
                  Work Experience
                </h3>

                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">Education</h3>

                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="education"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white">Projects</h3>

                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Project"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </form>
          </TabsContent>

          <TabsContent value="preview">
            <Button
              variant="link"
              type="button"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4 mr-2" />
                  Show Preview
                </>
              )}
            </Button>

            {resumeMode !== "preview" && (
              <div className="flex items-center gap-3 p-4 border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 rounded-lg mb-3">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">
                  You will lose edited markdown if you update the form data.
                </span>
              </div>
            )}

            <div className="border border-white/10 rounded-xl overflow-hidden bg-black">
              <MDEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
              />
            </div>

            <div
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1056px",
                padding: "15px",
                backgroundColor: "white",
              }}
              ref={resumeRef}
            >
              <MDEditor.Markdown
                source={previewContent}
                style={{ backgroundColor: "white", color: "black" }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilder;
