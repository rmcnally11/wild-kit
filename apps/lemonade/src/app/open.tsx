import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/brand";
import { Hint } from "@/components/hint";
import { JobChrome } from "@/components/job-chrome";
import { money, useStand } from "@/store";

export default function OpenScreen() {
  const router = useRouter();
  const { stand, sell, undo, todayTotal, todayCups, lastCup, save } = useStand();
  const closed = Boolean(stand.closedAt);
  const [pop, setPop] = useState<string | null>(null);
  const packed = stand.supplies.length;

  function ring(itemId: string) {
    const item = stand.menu.find((row) => row.id === itemId);
    sell(itemId);
    if (!item) return;
    setPop(`+${money(item.price)}`);
    setTimeout(() => setPop(null), 900);
  }

  const hint = closed
    ? "You opened. That's the whole point."
    : todayCups === 0
      ? "Tape it to the table. Then leave the phone."
      : "Another cup. Go.";

  return (
    <JobChrome>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>{closed ? "Closed" : "Today"}</Text>
          <Text style={styles.total}>{money(todayTotal)}</Text>
          <Text style={styles.cups}>
            {todayCups} {todayCups === 1 ? "cup" : "cups"}
          </Text>
          {lastCup ? <Text style={styles.last}>Last cup: {lastCup.itemName}</Text> : null}
          {pop ? <Text style={styles.pop}>{pop}</Text> : null}
        </View>

        <Hint line={hint} />

        {stand.todaysRecipe ? (
          <Text style={styles.pitcher}>Today&apos;s pitcher is {stand.todaysRecipe}</Text>
        ) : null}

        {todayCups === 0 && !closed && packed < 3 ? (
          <Pressable style={styles.note} onPress={() => router.replace("/invent")}>
            <Text style={styles.noteText}>Pack from the house first →</Text>
          </Pressable>
        ) : null}

        {!closed ? <Text style={styles.hint}>Tap what they bought</Text> : null}

        {stand.menu.map((item) => {
          const sold = stand.sales.filter((sale) => sale.itemId === item.id).length;
          return (
            <Pressable
              key={item.id}
              disabled={closed}
              onPress={() => ring(item.id)}
              style={[styles.item, closed && { opacity: 0.5 }]}
            >
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                {sold > 0 ? <Text style={styles.sold}>{sold} so far</Text> : null}
              </View>
              <Text style={styles.itemPrice}>{money(item.price)}</Text>
            </Pressable>
          );
        })}

        <View style={styles.row}>
          <Pressable style={styles.ghost} disabled={todayCups === 0} onPress={undo}>
            <Text style={[styles.ghostText, todayCups === 0 && { opacity: 0.4 }]}>Oops, undo</Text>
          </Pressable>
          <Pressable
            style={styles.ghost}
            onPress={() => save({ closedAt: closed ? null : new Date().toISOString() })}
          >
            <Text style={styles.ghostText}>{closed ? "Open again" : "Close the day"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </JobChrome>
  );
}

const styles = StyleSheet.create({
  body: { gap: 12, paddingBottom: 32 },
  hero: { backgroundColor: COLORS.lemonade, borderRadius: 28, padding: 22, overflow: "hidden" },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, textTransform: "uppercase", color: COLORS.ink },
  total: { fontFamily: "Fredoka_700Bold", fontSize: 56, lineHeight: 56, color: COLORS.ink, marginTop: 4 },
  cups: { fontFamily: "Nunito_600SemiBold", fontSize: 18, color: COLORS.ink },
  last: { fontFamily: "Nunito_600SemiBold", fontSize: 15, color: COLORS.ink, marginTop: 4 },
  pop: {
    position: "absolute",
    right: 20,
    top: 18,
    fontFamily: "Fredoka_700Bold",
    fontSize: 28,
    color: COLORS.ink,
  },
  pitcher: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    color: COLORS.ink,
  },
  note: { backgroundColor: COLORS.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: COLORS.border },
  noteText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  hint: { fontFamily: "Nunito_600SemiBold", fontSize: 16, textAlign: "center", color: COLORS.muted },
  item: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemName: { fontFamily: "Fredoka_700Bold", fontSize: 28, color: COLORS.ink },
  sold: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
  itemPrice: { fontFamily: "Fredoka_700Bold", fontSize: 28, color: COLORS.ink },
  row: { flexDirection: "row", gap: 10 },
  ghost: { flex: 1, backgroundColor: COLORS.card, borderRadius: 16, paddingVertical: 14, alignItems: "center" },
  ghostText: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.ink },
});
