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
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}  `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Header> */}
            <ScrollToTop />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster />
            {/* footer */}
            <div className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
