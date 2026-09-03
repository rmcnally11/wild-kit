import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS, fieldColor } from "@/brand";
import { Hint } from "@/components/hint";
import { JobChrome } from "@/components/job-chrome";
import { StandMark } from "@/components/stand-mark";
import { printSheet, shareSheet } from "@/print";
import { SHEET_COPY, type SheetKind } from "@/sheets";
import { money, useStand } from "@/store";

export default function PrintScreen() {
  const router = useRouter();
  const { stand } = useStand();
  const [busy, setBusy] = useState<SheetKind | null>(null);
  const [error, setError] = useState<string | null>(null);
  const field = fieldColor(stand.template);

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
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.kicker}>Grown-up runs the printer</Text>
        <Text style={styles.lead}>The poster is the product.</Text>
        <Hint line={stand.standName ? "Ask for the whole sheet." : "The stand needs a name."} />
        <Text style={styles.line}>
          Letter or 11×17. Fill the sheet. Then everybody leaves the phone.
        </Text>

        <View style={[styles.poster, { backgroundColor: field }]}>
          <View style={styles.posterTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.posterKicker}>This Saturday</Text>
              <Text style={styles.posterName}>{stand.standName || "Lemonade Stand"}</Text>
              <Text style={styles.posterKid}>
                {stand.kidName ? `${stand.kidName} invents it.` : "Kids invent it."} You make it real.
              </Text>
            </View>
            <StandMark template={stand.template} size={88} />
          </View>
          {stand.todaysRecipe ? (
            <Text style={styles.posterKid}>Today&apos;s pitcher: {stand.todaysRecipe}</Text>
          ) : null}
          {stand.menu.map((item) => (
            <View key={item.id} style={styles.menuRow}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{money(item.price)}</Text>
            </View>
          ))}
        </View>

        {(Object.keys(SHEET_COPY) as SheetKind[]).map((kind) => {
          const sheet = SHEET_COPY[kind];
          const working = busy === kind;
          return (
            <View key={kind} style={styles.card}>
              <Text style={styles.cardTitle}>{sheet.title}</Text>
              <Text style={styles.cardLine}>{sheet.line}</Text>
              <View style={styles.actions}>
                <Pressable
                  style={[styles.action, styles.actionMain]}
                  disabled={Boolean(busy)}
                  onPress={() => run(kind)}
                >
                  <Text style={styles.actionText}>{working ? "Opening…" : `Print ${sheet.title.toLowerCase()}`}</Text>
                </Pressable>
                <Pressable style={styles.action} disabled={Boolean(busy)} onPress={() => run(kind, true)}>
                  <Text style={styles.actionText}>Share PDF</Text>
                </Pressable>
              </View>
            </View>
          );
        })}

        {error ? <Text style={styles.err}>{error}</Text> : null}

        <Pressable style={styles.next} onPress={() => router.replace("/open")}>
          <Text style={styles.nextText}>Open the stand →</Text>
        </Pressable>
      </ScrollView>
    </JobChrome>
  );
}

const styles = StyleSheet.create({
  body: { gap: 12, paddingBottom: 32 },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.muted },
  lead: { fontFamily: "Fredoka_700Bold", fontSize: 32, lineHeight: 34, color: COLORS.ink },
  line: { fontFamily: "Nunito_600SemiBold", fontSize: 17, lineHeight: 24, color: COLORS.ink },
  poster: {
    borderRadius: 24,
    padding: 20,
    gap: 8,
    borderWidth: 3,
    borderColor: COLORS.ink,
  },
  posterTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  posterKicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.ink },
  posterName: { fontFamily: "Fredoka_700Bold", fontSize: 36, lineHeight: 36, color: COLORS.ink },
  posterKid: { fontFamily: "Nunito_600SemiBold", fontSize: 16, color: COLORS.ink },
  menuRow: { flexDirection: "row", justifyContent: "space-between" },
  menuName: { fontFamily: "Nunito_800ExtraBold", fontSize: 18, color: COLORS.ink },
  menuPrice: { fontFamily: "Fredoka_600SemiBold", fontSize: 18, color: COLORS.ink },
  card: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: COLORS.border, gap: 8 },
  cardTitle: { fontFamily: "Fredoka_600SemiBold", fontSize: 22, color: COLORS.ink },
  cardLine: { fontFamily: "Nunito_600SemiBold", fontSize: 15, color: COLORS.muted },
  actions: { flexDirection: "row", gap: 8, marginTop: 4 },
  action: { flex: 1, backgroundColor: COLORS.cream, borderRadius: 14, paddingVertical: 12, alignItems: "center" },
  actionMain: { backgroundColor: COLORS.lemonade },
  actionText: { fontFamily: "Nunito_800ExtraBold", fontSize: 14, color: COLORS.ink },
  err: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.raspberry },
  next: { backgroundColor: COLORS.lemonade, borderRadius: 18, paddingVertical: 16, alignItems: "center" },
  nextText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
});
