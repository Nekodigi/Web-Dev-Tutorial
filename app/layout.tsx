import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/header";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/organisms/sidebar";

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "モダンWeb開発",
  description: "動かして学ぶReact, Next.js, Firebase...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto.className} antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <div className="h-screen w-full flex-col">
              <Header />

              {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
