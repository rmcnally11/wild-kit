import type { Metadata, Viewport } from "next";
import { Fredoka, Geist_Mono, Nunito } from "next/font/google";
import type { ReactNode } from "react";

import { FACE_LINE, MASTER, MISSING_PIECE } from "@/lib/brand";
import { StandProvider } from "@/lib/stand-store";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `Wild Kit — ${FACE_LINE}`,
    template: "%s · Wild Kit",
  },
  description: `${MASTER} ${MISSING_PIECE}`,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Wild Kit",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5C518",
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
