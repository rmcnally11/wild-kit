import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS, LEMON_SUPPLIES, MENU_CAP, PITCHERS, SUBTITLE, TEMPLATES } from "@/brand";
import { Hint } from "@/components/hint";
import { JobChrome } from "@/components/job-chrome";
import { StandMark } from "@/components/stand-mark";
import { money, snapPrice, useStand } from "@/store";

function inventHint(args: {
  standName: string;
  packed: number;
  recipe: string;
}) {
  if (!args.standName) return "The stand needs a name.";
  if (args.packed < 3) return "Pack from the house.";
  if (!args.recipe) return "One special pitcher. That's the secret.";
  return "Grown-up runs the printer.";
}

export default function InventScreen() {
  const router = useRouter();
  const { stand, save, addItem, updateItem, removeItem, toggleSupply, setCrew, putPitcherOnMenu } =
    useStand();
  const kid = stand.kidName || "You";
  const [ownPitcher, setOwnPitcher] = useState("");
  const canAdd = stand.menu.length < MENU_CAP;

  return (
    <JobChrome>
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.kicker}>{SUBTITLE}</Text>
        <Text style={styles.lead}>{kid} invents it. Three templates, not a blank canvas.</Text>
        <Hint
          line={inventHint({
            standName: stand.standName,
            packed: stand.supplies.length,
            recipe: stand.todaysRecipe,
          })}
        />

        <Text style={styles.label}>Name of the stand</Text>
        <TextInput
          value={stand.standName}
          onChangeText={(standName) => save({ standName })}
          placeholder="The stand name"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />

        <Text style={styles.label}>Pick a field</Text>
        <Text style={styles.help}>That&apos;s the mark. Three templates, not a blank canvas.</Text>
        <View style={[styles.markCard, { backgroundColor: TEMPLATES.find((item) => item.id === stand.template)?.field }]}>
          <StandMark template={stand.template} size={96} />
        </View>
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

        <Text style={styles.label}>The menu</Text>
        <Text style={styles.help}>Name it. Set the price. Six things is a menu.</Text>
        {stand.menu.map((item) => (
          <View key={item.id} style={styles.card}>
            <TextInput
              value={item.name}
              onChangeText={(name) => updateItem(item.id, { name })}
              placeholder="What you sell"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
            />
            <View style={styles.priceRow}>
              <Pressable
                style={styles.stepper}
                onPress={() => updateItem(item.id, { price: snapPrice(item.price - 0.25) })}
              >
                <Text style={styles.stepperText}>−</Text>
              </Pressable>
              <Text style={styles.priceNow}>{money(item.price)}</Text>
              <Pressable
                style={styles.stepper}
                onPress={() => updateItem(item.id, { price: snapPrice(item.price + 0.25) })}
              >
                <Text style={styles.stepperText}>+</Text>
              </Pressable>
              {stand.menu.length > 1 ? (
                <Pressable onPress={() => removeItem(item.id)}>
                  <Text style={styles.remove}>Take off</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        ))}
        {canAdd ? (
          <Pressable style={styles.ghost} onPress={addItem}>
            <Text style={styles.ghostText}>Add one more</Text>
          </Pressable>
        ) : (
          <Text style={styles.help}>Six things. That&apos;s enough.</Text>
        )}

        <Text style={styles.label}>One special pitcher</Text>
        <Text style={styles.help}>Kid juices. Grown-up has the knife. Then put it on the menu.</Text>
        {stand.todaysRecipe ? (
          <Text style={styles.today}>Today&apos;s pitcher: {stand.todaysRecipe}</Text>
        ) : null}
        {PITCHERS.map((pitcher) => {
          const on = stand.todaysRecipe === pitcher.name;
          return (
            <Pressable
              key={pitcher.id}
              style={[styles.card, on && styles.cardOn]}
              onPress={() => putPitcherOnMenu(pitcher.name, pitcher.price)}
            >
              <Text style={styles.cardTitle}>{pitcher.name}</Text>
              <Text style={styles.help}>Kid: {pitcher.kid}</Text>
              <Text style={styles.help}>Grown-up: {pitcher.grownup}</Text>
              <Text style={styles.pick}>{on ? "That's today's pitcher." : `Put it on the menu · ${money(pitcher.price)}`}</Text>
            </Pressable>
          );
        })}
        <TextInput
          value={ownPitcher}
          onChangeText={setOwnPitcher}
          placeholder="Or name your own"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />
        <Pressable
          style={styles.ghost}
          onPress={() => {
            if (!ownPitcher.trim()) return;
            putPitcherOnMenu(ownPitcher, 2);
            setOwnPitcher("");
          }}
        >
          <Text style={styles.ghostText}>Name it and add it</Text>
        </Pressable>

        <Text style={styles.label}>Pack from the house</Text>
        {LEMON_SUPPLIES.map((item) => {
          const on = stand.supplies.includes(item.id);
          return (
            <Pressable key={item.id} style={styles.pack} onPress={() => toggleSupply(item.id)}>
              <View style={[styles.box, on && styles.boxOn]}>{on ? <Text style={styles.check}>✓</Text> : null}</View>
              <Text style={styles.packName}>{item.name}</Text>
            </Pressable>
          );
        })}

        <Text style={styles.label}>Crew · first names only</Text>
        {stand.crew.map((job) => (
          <View key={job.id} style={styles.crew}>
            <Text style={styles.role}>{job.role}</Text>
            <TextInput
              value={job.who}
              onChangeText={(who) => setCrew(job.id, who)}
              placeholder="First name"
              placeholderTextColor={COLORS.muted}
              style={[styles.input, { flex: 1 }]}
              autoComplete="off"
            />
          </View>
        ))}

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
  help: { fontFamily: "Nunito_600SemiBold", fontSize: 15, color: COLORS.muted, marginTop: -4 },
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
  markCard: {
    borderRadius: 24,
    borderWidth: 3,
    borderColor: COLORS.ink,
    minHeight: 140,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  swatch: { flex: 1, borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  swatchOn: { borderWidth: 3, borderColor: COLORS.ink },
  swatchText: { fontFamily: "Nunito_800ExtraBold", fontSize: 14, color: COLORS.ink },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardOn: { borderColor: COLORS.ink, borderWidth: 2 },
  cardTitle: { fontFamily: "Fredoka_700Bold", fontSize: 22, color: COLORS.ink },
  pick: { fontFamily: "Nunito_800ExtraBold", fontSize: 14, color: COLORS.ink },
  today: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    backgroundColor: COLORS.lemonade,
    borderRadius: 16,
    padding: 14,
    color: COLORS.ink,
  },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.cream,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepperText: { fontFamily: "Fredoka_700Bold", fontSize: 24, color: COLORS.ink },
  priceNow: { minWidth: 72, fontFamily: "Fredoka_600SemiBold", fontSize: 22, color: COLORS.ink },
  remove: { fontFamily: "Nunito_800ExtraBold", fontSize: 14, color: COLORS.raspberry },
  ghost: { backgroundColor: COLORS.card, borderRadius: 16, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.border },
  ghostText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  pack: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 4 },
  box: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.ink,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
  },
  boxOn: { backgroundColor: COLORS.lemonade },
  check: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  packName: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  crew: { flexDirection: "row", alignItems: "center", gap: 10 },
  role: { width: 92, fontFamily: "Nunito_800ExtraBold", fontSize: 13, color: COLORS.ink },
  next: { backgroundColor: COLORS.coral, borderRadius: 18, paddingVertical: 16, alignItems: "center", marginTop: 8 },
  nextText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
});
