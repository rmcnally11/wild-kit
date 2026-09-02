import type { Metadata, Viewport } from "next";
import { Fredoka, Geist_Mono, Nunito } from "next/font/google";
import type { ReactNode } from "react";

import { StandProvider } from "@/lib/stand-store";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Family Time",
    template: "%s · Family Time",
  },
  description:
    "Saturday kits for a family. Lemonade stand, living room camp, and a shelf of real-world projects. Not a game.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Family Time",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#F0B429",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <StandProvider>{children}</StandProvider>
      </body>
    </html>
  );
}
