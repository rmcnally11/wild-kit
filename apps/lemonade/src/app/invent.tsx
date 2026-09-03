import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS, STEPS, SUBTITLE, TEMPLATES } from "@/brand";
import { JobChrome } from "@/components/job-chrome";
import { money, useStand } from "@/store";

export default function InventScreen() {
  const router = useRouter();
  const { stand, save } = useStand();
  const kid = stand.kidName || "You";

  return (
    <JobChrome>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.kicker}>{SUBTITLE}</Text>
        <Text style={styles.lead}>{kid} invents it. Three templates, not a blank canvas.</Text>

        <Text style={styles.label}>Name of the stand</Text>
        <TextInput
          value={stand.standName}
          onChangeText={(standName) => save({ standName })}
          placeholder="The stand name"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />

        <Text style={styles.label}>Pick a field</Text>
        <View style={styles.row}>
          {TEMPLATES.map((item) => {
            const on = stand.template === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => save({ template: item.id })}
                style={[styles.swatch, { backgroundColor: item.field }, on && styles.swatchOn]}
              >
                <Text style={styles.swatchText}>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Set the prices</Text>
        {stand.menu.map((item) => (
          <View key={item.id} style={styles.priceRow}>
            <Text style={styles.priceName}>{item.name}</Text>
            <TextInput
              value={String(item.price)}
              keyboardType="decimal-pad"
              onChangeText={(raw) => {
                const price = Number(raw);
                if (Number.isNaN(price)) return;
                save({
                  menu: stand.menu.map((row) => (row.id === item.id ? { ...row, price } : row)),
                });
              }}
              style={styles.priceInput}
            />
            <Text style={styles.priceNow}>{money(item.price)}</Text>
          </View>
        ))}

        <View style={styles.steps}>
          {STEPS.map((step, index) => (
            <Text key={step.title} style={styles.step}>
              {index + 1}. {step.title} — {step.line}
            </Text>
          ))}
        </View>

        <Pressable style={styles.next} onPress={() => router.replace("/print")}>
          <Text style={styles.nextText}>Grown-up runs the printer →</Text>
        </Pressable>
      </ScrollView>
    </JobChrome>
  );
}

const styles = StyleSheet.create({
  body: { gap: 12, paddingBottom: 32 },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.muted },
  lead: { fontFamily: "Fredoka_700Bold", fontSize: 28, lineHeight: 30, color: COLORS.ink },
  label: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, textTransform: "uppercase", marginTop: 8, color: COLORS.ink },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 18,
    color: COLORS.ink,
  },
  row: { flexDirection: "row", gap: 8 },
  swatch: { flex: 1, borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  swatchOn: { borderWidth: 3, borderColor: COLORS.ink },
  swatchText: { fontFamily: "Nunito_800ExtraBold", fontSize: 14, color: COLORS.ink },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  priceName: { flex: 1, fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  priceInput: {
    width: 72,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: COLORS.ink,
    textAlign: "center",
  },
  priceNow: { width: 64, fontFamily: "Fredoka_600SemiBold", fontSize: 18, color: COLORS.ink },
  steps: { gap: 6, marginTop: 8 },
  step: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
  next: { backgroundColor: COLORS.coral, borderRadius: 18, paddingVertical: 16, alignItems: "center", marginTop: 8 },
  nextText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
});
