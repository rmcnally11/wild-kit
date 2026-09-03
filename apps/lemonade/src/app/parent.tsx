import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, LEGAL, MASTER, SITE } from "@/brand";
import { useStand } from "@/store";

const RULES = [
  "Parent owns the account.",
  "First name only on the kid profile.",
  "No kid inbox. No kid-to-stranger chat.",
  "No third-party ads. Ever.",
  "The poster is the product.",
] as const;

export default function ParentScreen() {
  const router = useRouter();
  const { stand, save } = useStand();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.body}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back to the stand</Text>
        </Pressable>
        <Text style={styles.kicker}>Parent desk</Text>
        <Text style={styles.title}>Grown-up first.</Text>
        <Text style={styles.line}>{MASTER}</Text>

        <Text style={styles.label}>Your email</Text>
        <TextInput
          value={stand.parentEmail}
          onChangeText={(parentEmail) => save({ parentEmail })}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <Text style={styles.label}>Zip</Text>
        <TextInput
          value={stand.zip}
          onChangeText={(zip) => save({ zip })}
          keyboardType="number-pad"
          style={styles.input}
        />

        <View style={styles.box}>
          {RULES.map((rule) => (
            <Text key={rule} style={styles.rule}>
              {rule}
            </Text>
          ))}
        </View>

        <Text style={styles.quiet}>
          {LEGAL}. Print pack lives on {SITE}. This app stays free. No ads.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.cream },
  body: { padding: 24, gap: 12, paddingBottom: 48 },
  back: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.ink },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.raspberry },
  title: { fontFamily: "Fredoka_700Bold", fontSize: 40, lineHeight: 40, color: COLORS.ink },
  line: { fontFamily: "Nunito_600SemiBold", fontSize: 18, lineHeight: 26, color: COLORS.ink },
  label: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, textTransform: "uppercase", color: COLORS.ink },
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
  box: { backgroundColor: COLORS.ink, borderRadius: 20, padding: 16, gap: 10 },
  rule: { fontFamily: "Nunito_600SemiBold", fontSize: 16, color: COLORS.cream },
  quiet: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
});
