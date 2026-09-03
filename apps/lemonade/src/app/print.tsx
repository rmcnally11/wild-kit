import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/brand";
import { JobChrome } from "@/components/job-chrome";
import { money, useStand } from "@/store";

const SHEETS = [
  { title: "Poster", line: "The name. The mark. Tape it to the table." },
  { title: "Menu", line: "What you sell. Prices the kid set." },
  { title: "Price cards", line: "One card per cup. Crooked is fine." },
] as const;

export default function PrintScreen() {
  const router = useRouter();
  const { stand } = useStand();

  return (
    <JobChrome>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.kicker}>Grown-up runs the printer</Text>
        <Text style={styles.lead}>The poster is the product.</Text>
        <Text style={styles.line}>
          PDF first. Letter or 11×17. Fill the sheet. Then everybody leaves the phone.
        </Text>

        <View style={styles.poster}>
          <Text style={styles.posterKicker}>This Saturday</Text>
          <Text style={styles.posterName}>{stand.standName || "Lemonade Stand"}</Text>
          <Text style={styles.posterKid}>
            {stand.kidName ? `${stand.kidName} invents it.` : "Kids invent it."} You hit print.
          </Text>
          {stand.menu.map((item) => (
            <View key={item.id} style={styles.menuRow}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>{money(item.price)}</Text>
            </View>
          ))}
        </View>

        {SHEETS.map((sheet) => (
          <View key={sheet.title} style={styles.card}>
            <Text style={styles.cardTitle}>{sheet.title}</Text>
            <Text style={styles.cardLine}>{sheet.line}</Text>
          </View>
        ))}

        <Text style={styles.note}>
          Native print and share land next. For now, this is the sheet. The website still sells the
          $9 print pack.
        </Text>

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
    backgroundColor: COLORS.lemonade,
    borderRadius: 24,
    padding: 20,
    gap: 8,
    borderWidth: 3,
    borderColor: COLORS.ink,
  },
  posterKicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.ink },
  posterName: { fontFamily: "Fredoka_700Bold", fontSize: 36, lineHeight: 36, color: COLORS.ink },
  posterKid: { fontFamily: "Nunito_600SemiBold", fontSize: 16, color: COLORS.ink },
  menuRow: { flexDirection: "row", justifyContent: "space-between" },
  menuName: { fontFamily: "Nunito_800ExtraBold", fontSize: 18, color: COLORS.ink },
  menuPrice: { fontFamily: "Fredoka_600SemiBold", fontSize: 18, color: COLORS.ink },
  card: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  cardTitle: { fontFamily: "Fredoka_600SemiBold", fontSize: 22, color: COLORS.ink },
  cardLine: { fontFamily: "Nunito_600SemiBold", fontSize: 15, color: COLORS.muted, marginTop: 4 },
  note: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
  next: { backgroundColor: COLORS.ink, borderRadius: 18, paddingVertical: 16, alignItems: "center" },
  nextText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.cream },
});
