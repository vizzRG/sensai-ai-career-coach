import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/module/navbar/Header";
import { dark } from "@clerk/themes";

import ScrollToTop from "./scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/module/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SensAI",
  description: "AI Career Coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#030303",
          colorInputBackground: "#0a0a0a",
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#a1a1aa",
          colorDanger: "#ef4444",
          colorSuccess: "#22c55e",
          borderRadius: "0.75rem",
        },
        elements: {
          formButtonPrimary:
            "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-lg shadow-indigo-500/20",
          card: "bg-[#0a0a0a] border border-white/10 shadow-2xl",
          headerTitle: "text-white",
          headerSubtitle: "text-white/60",
          socialButtonsBlockButton:
            "bg-white/5 border-white/10 hover:bg-white/10 text-white",
          socialButtonsBlockButtonText: "text-white",
          formFieldLabel: "text-white/80",
          formFieldInput:
            "bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-indigo-500/50 focus:ring-indigo-500/20",
          footerActionLink: "text-indigo-400 hover:text-indigo-300",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-indigo-400",
          avatarBox: "border-2 border-white/20",
          userButtonPopoverCard: "bg-[#0a0a0a] border border-white/10",
          userButtonPopoverActionButton: "hover:bg-white/10",
          userButtonPopoverActionButtonText: "text-white/80",
          userButtonPopoverActionButtonIcon: "text-white/60",
          userButtonPopoverFooter: "hidden",
          userPreviewMainIdentifier: "text-white",
          userPreviewSecondaryIdentifier: "text-white/60",
          modalContent: "bg-[#0a0a0a] border border-white/10",
          modalCloseButton: "text-white/60 hover:text-white",
          navbarButton: "text-white/80 hover:text-white",
          profileSectionTitleText: "text-white",
          profileSectionContent: "text-white/70",
          breadcrumbsItem: "text-white/60",
          breadcrumbsItemDivider: "text-white/40",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={`${inter.className} bg-[#030303] text-white antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ScrollToTop />
            <Header />

            <main className="min-h-screen relative">{children}</main>

            <Toaster
              toastOptions={{
                style: {
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff",
                },
                className: "backdrop-blur-xl",
              }}
            />

            {/* Footer */}
            <footer className="relative bg-[#030303] border-t border-white/5">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

              {/* Aurora gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative py-12">
                <Footer />
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
