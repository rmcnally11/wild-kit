import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/brand";
import { JobChrome } from "@/components/job-chrome";
import { money, useStand } from "@/store";

export default function OpenScreen() {
  const { stand, sell, undo, todayTotal, todayCups, save } = useStand();
  const closed = Boolean(stand.closedAt);

  return (
    <JobChrome>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>{closed ? "Closed" : "Today"}</Text>
          <Text style={styles.total}>{money(todayTotal)}</Text>
          <Text style={styles.cups}>
            {todayCups} {todayCups === 1 ? "cup" : "cups"}
          </Text>
        </View>

        <Text style={styles.lead}>
          {todayCups === 0 && !closed
            ? "Tape it to the table. Then leave the phone."
            : "You opened the stand. That's the whole point."}
        </Text>

        {!closed ? <Text style={styles.hint}>Tap what they bought</Text> : null}

        {stand.menu.map((item) => (
          <Pressable
            key={item.id}
            disabled={closed}
            onPress={() => sell(item.id)}
            style={[styles.item, closed && { opacity: 0.5 }]}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{money(item.price)}</Text>
          </Pressable>
        ))}

        <View style={styles.row}>
          <Pressable style={styles.ghost} disabled={todayCups === 0} onPress={undo}>
            <Text style={styles.ghostText}>Oops, undo</Text>
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
  hero: { backgroundColor: COLORS.lemonade, borderRadius: 28, padding: 22 },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, textTransform: "uppercase", color: COLORS.ink },
  total: { fontFamily: "Fredoka_700Bold", fontSize: 56, lineHeight: 56, color: COLORS.ink, marginTop: 4 },
  cups: { fontFamily: "Nunito_600SemiBold", fontSize: 18, color: COLORS.ink },
  lead: { fontFamily: "Fredoka_700Bold", fontSize: 24, lineHeight: 26, color: COLORS.ink, textAlign: "center" },
  hint: { fontFamily: "Nunito_600SemiBold", fontSize: 16, textAlign: "center", color: COLORS.muted },
  item: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemName: { fontFamily: "Fredoka_700Bold", fontSize: 28, color: COLORS.ink },
  itemPrice: { fontFamily: "Fredoka_700Bold", fontSize: 28, color: COLORS.ink },
  row: { flexDirection: "row", gap: 10 },
  ghost: { flex: 1, backgroundColor: COLORS.card, borderRadius: 16, paddingVertical: 14, alignItems: "center" },
  ghostText: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.ink },
});
