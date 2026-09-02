import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Logbook",
};

export default function LogLayout({ children }: { children: ReactNode }) {
  return children;
}
