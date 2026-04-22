import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const DashboardView = dynamic(() => import("./_components/dashboard-view"), {
  loading: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]"
        />
      ))}
    </div>
  ),
});

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }
  const insights = await getIndustryInsights();

  return (
    <div className="relative min-h-screen">
      <div className="grid-background" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pb-16 pt-8">
        <DashboardView insights={insights} />
      </div>

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default IndustryInsightsPage;
