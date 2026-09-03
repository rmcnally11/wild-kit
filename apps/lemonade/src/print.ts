import { Platform } from "react-native";

import { BOARDS } from "@/poster";
import { buildSheet, type SheetKind } from "@/sheets";
import type { Stand } from "@/store";

function pageSize(kind: SheetKind, stand: Stand) {
  if (kind !== "poster") return { width: 8.5 * 72, height: 11 * 72 };
  const board = BOARDS[stand.poster.board];
  return { width: board.inches.w * 72, height: board.inches.h * 72 };
}

export async function printSheet(kind: SheetKind, stand: Stand) {
  const html = buildSheet(kind, stand);
  const size = pageSize(kind, stand);

  if (Platform.OS === "web") {
    openWebSheet(html);
    return;
  }

  const Print = await import("expo-print");
  await Print.printAsync({ html, width: size.width, height: size.height });
}

export async function shareSheet(kind: SheetKind, stand: Stand) {
  const html = buildSheet(kind, stand);
  const size = pageSize(kind, stand);

  if (Platform.OS === "web") {
    openWebSheet(html);
    return;
  }

  const Print = await import("expo-print");
  const Sharing = await import("expo-sharing");
  const file = await Print.printToFileAsync({ html, width: size.width, height: size.height });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, {
      mimeType: "application/pdf",
      UTI: "com.adobe.pdf",
      dialogTitle: SHEET_FILE[kind],
    });
    return;
  }
  await Print.printAsync({ uri: file.uri });
}

const SHEET_FILE: Record<SheetKind, string> = {
  poster: "lemonade-poster.pdf",
  menu: "lemonade-menu.pdf",
  cards: "lemonade-cards.pdf",
};

type WebWin = {
  document: {
    open: () => void;
    write: (html: string) => void;
    close: () => void;
  };
};

function openWebSheet(html: string) {
  const open = (globalThis as { window?: { open: (url?: string, target?: string) => WebWin | null } })
    .window?.open;
  if (!open) {
    throw new Error("Could not open the sheet.");
  }
  const win = open("", "_blank");
  if (!win) {
    throw new Error("Pop-up blocked. Allow pop-ups to print the sheet.");
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}
