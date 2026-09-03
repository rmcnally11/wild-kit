import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/brand";
import { Hint } from "@/components/hint";
import { JobChrome } from "@/components/job-chrome";
import { PosterCanvas } from "@/components/poster-canvas";
import {
  BOARD_ORDER,
  BOARDS,
  BRUSHES,
  PAINT_COLORS,
  STICKERS,
  type StickerKind,
} from "@/poster";
import { printSheet, shareSheet } from "@/print";
import { SHEET_COPY, type SheetKind } from "@/sheets";
import { useStand } from "@/store";

type Tool = "draw" | "erase" | "sticker";

export default function PrintScreen() {
  const router = useRouter();
  const { stand, savePoster, undoPoster, clearPoster } = useStand();
  const [tool, setTool] = useState<Tool>("draw");
  const [color, setColor] = useState<string>(COLORS.ink);
  const [brush, setBrush] = useState<number>(BRUSHES[1].width);
  const [sticker, setSticker] = useState<StickerKind>("star");
  const [busy, setBusy] = useState<SheetKind | null>(null);
  const [error, setError] = useState<string | null>(null);
  const board = BOARDS[stand.poster.board];

  async function run(kind: SheetKind, share = false) {
    setError(null);
    setBusy(kind);
    try {
      if (share) await shareSheet(kind, stand);
      else await printSheet(kind, stand);
    } catch {
      setError("Could not open the sheet. Allow pop-ups, or try Share the PDF.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <JobChrome>
      <View style={styles.room}>
        <Text style={styles.kicker}>Draw the poster</Text>
        <Hint line={stand.standName ? "Draw it however you want. Crooked is fine." : "The stand needs a name."} />
        <PosterCanvas tool={tool} color={color} brush={brush} sticker={sticker} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {(
            [
              ["draw", "Draw"],
              ["erase", "Erase"],
              ["sticker", "Stickers"],
            ] as const
          ).map(([id, label]) => (
            <Pressable
              key={id}
              onPress={() => setTool(id)}
              style={[styles.chip, tool === id && styles.chipOn]}
            >
              <Text style={styles.chipText}>{label}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.chip} onPress={undoPoster}>
            <Text style={styles.chipText}>Undo</Text>
          </Pressable>
          <Pressable style={styles.chip} onPress={clearPoster}>
            <Text style={styles.chipText}>Clear</Text>
          </Pressable>
        </ScrollView>

        {tool !== "sticker" ? (
          <>
            <View style={styles.row}>
              {PAINT_COLORS.map((swatch) => (
                <Pressable
                  key={swatch}
                  onPress={() => {
                    setTool("draw");
                    setColor(swatch);
                  }}
                  style={[
                    styles.dot,
                    { backgroundColor: swatch },
                    color === swatch && tool === "draw" && styles.dotOn,
                  ]}
                />
              ))}
            </View>
            <View style={styles.row}>
              {BRUSHES.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setBrush(item.width)}
                  style={[styles.chip, brush === item.width && styles.chipOn]}
                >
                  <Text style={styles.chipText}>{item.name}</Text>
                </Pressable>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.row}>
            {STICKERS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSticker(item.id)}
                style={[styles.chip, sticker === item.id && styles.chipOn]}
              >
                <Text style={styles.chipText}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text style={styles.label}>The board</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {BOARD_ORDER.map((id) => {
            const item = BOARDS[id];
            const on = stand.poster.board === id;
            return (
              <Pressable
                key={id}
                onPress={() => savePoster({ ...stand.poster, board: id })}
                style={[styles.board, on && styles.chipOn]}
              >
                <Text style={styles.boardName}>{item.name}</Text>
                <Text style={styles.boardSize}>{item.short}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <Text style={styles.ask}>{board.ask}</Text>

        <View style={styles.actions}>
          <Pressable
            style={[styles.action, styles.actionMain]}
            disabled={Boolean(busy)}
            onPress={() => run("poster")}
          >
            <Text style={styles.actionText}>{busy === "poster" ? "Opening…" : "Print the poster"}</Text>
          </Pressable>
          <Pressable style={styles.action} disabled={Boolean(busy)} onPress={() => run("poster", true)}>
            <Text style={styles.actionText}>Share PDF</Text>
          </Pressable>
        </View>
        <View style={styles.actions}>
          {(Object.keys(SHEET_COPY) as SheetKind[])
            .filter((kind) => kind !== "poster")
            .map((kind) => (
              <Pressable key={kind} style={styles.action} disabled={Boolean(busy)} onPress={() => run(kind)}>
                <Text style={styles.actionText}>Print {SHEET_COPY[kind].title.toLowerCase()}</Text>
              </Pressable>
            ))}
        </View>
        {error ? <Text style={styles.err}>{error}</Text> : null}
        <Pressable style={styles.next} onPress={() => router.replace("/open")}>
          <Text style={styles.nextText}>Open the stand →</Text>
        </Pressable>
      </View>
    </JobChrome>
  );
}

const styles = StyleSheet.create({
  room: { flex: 1, gap: 8, paddingBottom: 8 },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.muted },
  label: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.ink },
  ask: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  chip: {
    backgroundColor: COLORS.card,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipOn: { backgroundColor: COLORS.lemonade, borderColor: COLORS.ink },
  chipText: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, color: COLORS.ink },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.ink,
  },
  dotOn: { borderWidth: 4 },
  board: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  boardName: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, color: COLORS.ink },
  boardSize: { fontFamily: "Nunito_600SemiBold", fontSize: 12, color: COLORS.muted },
  actions: { flexDirection: "row", gap: 8 },
  action: { flex: 1, backgroundColor: COLORS.card, borderRadius: 14, paddingVertical: 12, alignItems: "center", borderWidth: 1, borderColor: COLORS.border },
  actionMain: { backgroundColor: COLORS.lemonade, borderColor: COLORS.ink },
  actionText: { fontFamily: "Nunito_800ExtraBold", fontSize: 14, color: COLORS.ink },
  err: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.raspberry },
  next: { backgroundColor: COLORS.lemonade, borderRadius: 18, paddingVertical: 14, alignItems: "center" },
  nextText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
});
