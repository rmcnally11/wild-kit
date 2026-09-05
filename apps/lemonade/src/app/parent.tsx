import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  COLORS,
  LEGAL,
  LEGAL_RULES,
  MASTER,
  PAY_URL,
  SITE,
  SITE_URL,
  isAdultYear,
  isEmail,
} from "@/brand";
import { Hint } from "@/components/hint";
import { useStand } from "@/store";

export default function ParentScreen() {
  const router = useRouter();
  const { stand, save, resetSaturday } = useStand();
  const [year, setYear] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function unlock() {
    if (!isAdultYear(year)) {
      setError(year.length === 4 ? "Ask a grown-up." : "What year were you born?");
      return;
    }
    setError(null);
    save({ parentYear: year });
    setOpen(true);
  }

  function reset() {
    resetSaturday();
    setConfirmReset(false);
    router.replace("/invent");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back to the stand</Text>
        </Pressable>

        {!open ? (
          <>
            <Text style={styles.kicker}>Parent desk</Text>
            <Text style={styles.title}>Ask a grown-up.</Text>
            <Hint line="Parent owns the account." />
            <Text style={styles.line}>What year were you born?</Text>
            <TextInput
              value={year}
              onChangeText={(raw) => {
                setYear(raw.replace(/\D/g, "").slice(0, 4));
                setError(null);
              }}
              keyboardType="number-pad"
              placeholder="1990"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              maxLength={4}
            />
            {error ? <Text style={styles.err}>{error}</Text> : null}
            <Pressable style={styles.main} onPress={unlock}>
              <Text style={styles.mainText}>Open the desk</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.kicker}>Parent desk</Text>
            <Text style={styles.title}>Grown-up first.</Text>
            <Text style={styles.line}>{MASTER}</Text>

            <Text style={styles.label}>Your email</Text>
            <TextInput
              value={stand.parentEmail}
              onChangeText={(parentEmail) => save({ parentEmail })}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              style={styles.input}
            />
            {stand.parentEmail && !isEmail(stand.parentEmail) ? (
              <Text style={styles.err}>That needs to be a grown-up email.</Text>
            ) : null}

            <Pressable style={styles.main} onPress={() => Linking.openURL(PAY_URL)}>
              <Text style={styles.mainText}>Print pack · $9</Text>
            </Pressable>
            <Pressable style={styles.ghost} onPress={() => Linking.openURL(SITE_URL)}>
              <Text style={styles.ghostText}>The door · getwildkit.com</Text>
            </Pressable>

            <View style={styles.box}>
              {LEGAL_RULES.map((rule) => (
                <Text key={rule} style={styles.rule}>
                  {rule}
                </Text>
              ))}
            </View>

            {!confirmReset ? (
              <Pressable style={styles.ghost} onPress={() => setConfirmReset(true)}>
                <Text style={styles.ghostText}>Reset this Saturday</Text>
              </Pressable>
            ) : (
              <View style={styles.warn}>
                <Text style={styles.rule}>
                  The stand starts over. Your email and their first name stay.
                </Text>
                <Pressable style={styles.main} onPress={reset}>
                  <Text style={styles.mainText}>Yes, start over</Text>
                </Pressable>
                <Pressable style={styles.ghost} onPress={() => setConfirmReset(false)}>
                  <Text style={styles.ghostText}>Keep this Saturday</Text>
                </Pressable>
              </View>
            )}

            <Text style={styles.quiet}>
              {LEGAL}. App free. No ads. First dollar is the print pack on {SITE}. App Store — coming.
            </Text>
          </>
        )}
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
  main: { backgroundColor: COLORS.lemonade, borderRadius: 18, paddingVertical: 16, alignItems: "center" },
  mainText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  ghost: { backgroundColor: COLORS.card, borderRadius: 18, paddingVertical: 16, alignItems: "center", borderWidth: 1, borderColor: COLORS.border },
  ghostText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  box: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  warn: { gap: 10 },
  rule: { fontFamily: "Nunito_600SemiBold", fontSize: 16, color: COLORS.ink },
  quiet: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
  err: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.raspberry },
});
