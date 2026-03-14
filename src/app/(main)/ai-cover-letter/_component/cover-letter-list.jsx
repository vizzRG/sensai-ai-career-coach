"use client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";
export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };
  if (!coverLetters?.length) {
    return (
      <Card className="border border-white/10 bg-white/[0.02] backdrop-blur-md">
        {" "}
        <CardHeader>
          {" "}
          <CardTitle className="text-white text-xl">
            {" "}
            No Cover Letters Yet{" "}
          </CardTitle>{" "}
          <CardDescription className="text-white/50">
            {" "}
            Create your first cover letter to get started{" "}
          </CardDescription>{" "}
        </CardHeader>{" "}
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      {" "}
      {coverLetters.map((letter) => (
        <Card
          key={letter.id}
          className="group relative border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-white/20 transition-all duration-300"
        >
          {" "}
          <CardHeader>
            {" "}
            <div className="flex items-start justify-between">
              {" "}
              <div>
                {" "}
                <CardTitle className="text-lg md:text-xl font-semibold">
                  {" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                    {" "}
                    {letter.jobTitle}{" "}
                  </span>{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    {" "}
                    at {letter.companyName}{" "}
                  </span>{" "}
                </CardTitle>{" "}
                <CardDescription className="text-white/40">
                  {" "}
                  Created {format(new Date(letter.createdAt), "PPP")}{" "}
                </CardDescription>{" "}
              </div>{" "}
              <div className="flex space-x-2">
                {/* VIEW BUTTON */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  className="border-white/10 bg-black/40 hover:bg-white/10"
                >
                  <Eye className="h-4 w-4 text-white/80" />
                </Button>

                {/* DELETE DIALOG */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/10 bg-black/40 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4 text-white/80" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-[#0a0a0a] border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Delete Cover Letter?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-white/50">
                        This action cannot be undone. This will permanently
                        delete your cover letter for {letter.jobTitle} at{" "}
                        {letter.companyName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-white/10 bg-black/40">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>{" "}
            </div>{" "}
          </CardHeader>{" "}
          <CardContent>
            {" "}
            <div className="text-white/50 text-sm line-clamp-3">
              {" "}
              {letter.jobDescription}{" "}
            </div>{" "}
          </CardContent>{" "}
        </Card>
      ))}{" "}
    </div>
  );
}
