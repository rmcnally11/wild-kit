import type { ReactNode } from "react";

import { StandShell } from "@/components/stand-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <StandShell>{children}</StandShell>;
}
