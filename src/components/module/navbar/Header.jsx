import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  BrainCircuit,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";
import { NavbarWrapper } from "@/components/NavbarWrapper";

const Header = async () => {
  const user = await checkUser();

  return (
    <NavbarWrapper>
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
        <Link href={"/"} className="relative group">
          <Image
            src="/newLogo.png"
            alt="SENSAI Logo"
            width={200}
            height={60}
            className="h-20 py-1 w-auto object-contain relative z-10"
          />
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button
                variant="outline"
                className="relative overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-md
  hover:bg-white/[0.06] hover:border-white/20 text-white/70 hover:text-white
  transition-all duration-300 group"
              >
                {/* Aurora glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
                </span>

                {/* moving aurora highlight */}
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[auroraMove_4s_linear_infinite]" />
                </span>

                <LayoutDashboard className="h-4 w-4 relative z-10 text-indigo-400 group-hover:text-purple-300 transition-colors duration-300" />

                <span className="hidden md:block relative z-10">
                  Industry Insights
                </span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40">
                  <StarIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50 min-w-[200px]">
                <DropdownMenuItem className="focus:bg-white/10 text-white/70 focus:text-white cursor-pointer transition-colors">
                  <Link
                    href={"/resume"}
                    className="flex items-center gap-3 w-full py-1"
                  >
                    <div className="p-1.5 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
                      <FileText className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 text-white/70 focus:text-white cursor-pointer transition-colors">
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-3 w-full py-1"
                  >
                    <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10">
                      <PenBox className="w-4 h-4 text-purple-400" />
                    </div>
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 text-white/70 focus:text-white cursor-pointer transition-colors">
                  <Link
                    href={"/interview"}
                    className="flex items-center gap-3 w-full py-1"
                  >
                    <div className="p-1.5 rounded-md bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
                      <BrainCircuit className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="relative overflow-hidden border-white/10 bg-white/[0.06] backdrop-blur-md 
  hover:bg-white/[0.12] text-white font-medium transition-all duration-300 
  group shadow-[0_0_0px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]"
              >
                {/* aurora background */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-md" />
                </span>

                {/* glow sweep */}
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm animate-[auroraSweep_4s_linear_infinite]" />
                </span>

                <span className="relative z-10">Sign In</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-md opacity-60" />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      height: "40px",
                      width: "40px",
                      border: "2px solid rgba(255,255,255,0.1)",
                    },
                    userButtonPopoverCard:
                      "shadow-xl bg-[#0a0a0a] border border-white/10",
                    userPreviewMainIdentifier: "font-semibold text-white",
                    userPreviewSecondaryIdentifier: "text-white/60",
                    userButtonPopoverActionButton: "hover:bg-white/10",
                    userButtonPopoverActionButtonText: "text-white/80",
                    userButtonPopoverActionButtonIcon: "text-white/60",
                    userButtonPopoverFooter: "hidden",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </NavbarWrapper>
  );
};

export default Header;
