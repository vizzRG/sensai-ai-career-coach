"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(onboardingSchema) });
  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      await updateUserFn({ ...values, industry: formattedIndustry });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);
  const watchIndustry = watch("industry");
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] px-4 py-16">
      {" "}
      <Card className="w-full max-w-xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl">
        {" "}
        <CardHeader className="space-y-3">
          {" "}
          <CardTitle className="text-3xl md:text-4xl font-bold">
            {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              {" "}
              Complete Your{" "}
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {" "}
              Profile{" "}
            </span>{" "}
          </CardTitle>{" "}
          <CardDescription className="text-white/50">
            {" "}
            Select your industry to get personalized career insights and
            recommendations{" "}
          </CardDescription>{" "}
        </CardHeader>{" "}
        <CardContent>
          {" "}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* Industry */}{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="industry" className="text-white/80">
                {" "}
                Industry{" "}
              </Label>{" "}
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value),
                  );
                  setValue("subIndustry", "");
                }}
              >
                {" "}
                <SelectTrigger
                  id="industry"
                  className="w-full bg-black/40 border-white/10"
                >
                  {" "}
                  <SelectValue placeholder="Select an industry" />{" "}
                </SelectTrigger>{" "}
                <SelectContent className="bg-[#0a0a0a] border-white/10">
                  {" "}
                  {industries.map((ind) => (
                    <SelectItem value={ind.id} key={ind.id}>
                      {" "}
                      {ind.name}{" "}
                    </SelectItem>
                  ))}{" "}
                </SelectContent>{" "}
              </Select>{" "}
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {" "}
                  {errors.industry.message}{" "}
                </p>
              )}{" "}
            </div>{" "}
            {/* Sub Industry */}{" "}
            {watchIndustry && (
              <div className="space-y-2">
                {" "}
                <Label htmlFor="subIndustry" className="text-white/80">
                  {" "}
                  Specialization{" "}
                </Label>{" "}
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  {" "}
                  <SelectTrigger
                    id="subIndustry"
                    className="w-full bg-black/40 border-white/10"
                  >
                    {" "}
                    <SelectValue placeholder="Select an industry" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent className="bg-[#0a0a0a] border-white/10">
                    {" "}
                    {selectedIndustry?.subIndustries.map((ind) => (
                      <SelectItem value={ind} key={ind}>
                        {" "}
                        {ind}{" "}
                      </SelectItem>
                    ))}{" "}
                  </SelectContent>{" "}
                </Select>{" "}
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {" "}
                    {errors.subIndustry.message}{" "}
                  </p>
                )}{" "}
              </div>
            )}{" "}
            {/* Experience */}{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="experience" className="text-white/80">
                {" "}
                Years of Experience{" "}
              </Label>{" "}
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
                className="bg-black/40 border-white/10"
              />{" "}
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {" "}
                  {errors.experience.message}{" "}
                </p>
              )}{" "}
            </div>{" "}
            {/* Skills */}{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="skills" className="text-white/80">
                {" "}
                Skills{" "}
              </Label>{" "}
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
                className="bg-black/40 border-white/10"
              />{" "}
              <p className="text-sm text-white/40">
                {" "}
                Seperate multiple skills with commas{" "}
              </p>{" "}
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}{" "}
            </div>{" "}
            {/* Bio */}{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="bio" className="text-white/80">
                {" "}
                Professional Bio{" "}
              </Label>{" "}
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32 bg-black/40 border-white/10"
                {...register("bio")}
              />{" "}
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}{" "}
            </div>{" "}
            {/* Submit */}{" "}
            <Button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              type="submit"
              disabled={updateLoading}
            >
              {" "}
              {updateLoading ? (
                <>
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Saving...{" "}
                </>
              ) : (
                "Complete Profile"
              )}{" "}
            </Button>{" "}
          </form>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </div>
  );
};
export default OnboardingForm;
