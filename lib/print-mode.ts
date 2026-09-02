"use client";

import { useEffect } from "react";

export function usePrintMode(mode: "poster" | "cards") {
  useEffect(() => {
    document.documentElement.dataset.print = mode;
    return () => {
      delete document.documentElement.dataset.print;
    };
  }, [mode]);
}
