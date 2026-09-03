import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  COLORS,
  FACE_LINE,
  FIRST_APP,
  FIRST_NAME_ONLY,
  GROWN_UP_FIRST,
  isAdultYear,
  isEmail,
} from "@/brand";
import { Hint } from "@/components/hint";
import { useStand } from "@/store";

export default function SetupScreen() {
  const router = useRouter();
  const { stand, save } = useStand();
  const [who, setWho] = useState<"ask" | "parent" | "kid">("ask");
  const [year, setYear] = useState(stand.parentYear);
  const [email, setEmail] = useState(stand.parentEmail);
  const [kidName, setKidName] = useState(stand.kidName);
  const [error, setError] = useState<string | null>(null);

  const adult = isAdultYear(year);

  function goKid() {
    if (!adult) {
      setError(year.length === 4 ? "Ask a grown-up." : "What year were you born?");
      return;
    }
    if (!isEmail(email)) {
      setError("That needs to be a grown-up email.");
      return;
    }
    setError(null);
    save({ parentYear: year, parentEmail: email.trim() });
    setWho("kid");
  }

  function finish() {
    const name = kidName.trim();
    if (!name) {
      setError("First name only.");
      return;
    }
    save({
      parentEmail: email.trim(),
      parentYear: year,
      kidName: name,
      setupDone: true,
    });
    router.replace("/invent");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>{FIRST_APP}</Text>
          {who === "ask" ? (
            <>
              <Text style={styles.title}>Who&apos;s holding the phone?</Text>
              <Hint line={GROWN_UP_FIRST} />
              <Text style={styles.line}>{FIRST_NAME_ONLY}</Text>
              <Pressable style={[styles.btn, { backgroundColor: COLORS.ink }]} onPress={() => setWho("parent")}>
                <Text style={[styles.btnText, { color: COLORS.cream }]}>A grown-up</Text>
              </Pressable>
              <Text style={styles.quiet}>{FACE_LINE}</Text>
            </>
          ) : null}

          {who === "parent" ? (
            <>
              <Text style={styles.title}>Parent desk.</Text>
              <Text style={styles.line}>
                You own the account. They invent the stand. You make it real.
              </Text>
              <Text style={styles.label}>What year were you born?</Text>
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
              {year.length === 4 && !adult ? <Text style={styles.err}>Ask a grown-up.</Text> : null}
              <Text style={styles.label}>Your email</Text>
              <TextInput
                value={email}
                onChangeText={(raw) => {
                  setEmail(raw);
                  setError(null);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                placeholder="you@email.com"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />
              {error ? <Text style={styles.err}>{error}</Text> : null}
              <Pressable style={[styles.btn, { backgroundColor: COLORS.coral }]} onPress={goKid}>
                <Text style={styles.btnText}>Then the kid</Text>
              </Pressable>
            </>
          ) : null}

          {who === "kid" ? (
            <>
              <Text style={styles.title}>First name only.</Text>
              <Text style={styles.line}>You&apos;re the boss of this stand. Make the sign. Set the price. Open.</Text>
              <Text style={styles.label}>First name</Text>
              <TextInput
                value={kidName}
                onChangeText={(raw) => {
                  setKidName(raw);
                  setError(null);
                }}
                autoComplete="off"
                placeholder="First name"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />
              {error ? <Text style={styles.err}>{error}</Text> : null}
              <Pressable style={[styles.btn, { backgroundColor: COLORS.ink }]} onPress={finish}>
                <Text style={[styles.btnText, { color: COLORS.cream }]}>Invent the stand</Text>
              </Pressable>
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.lemonade },
  body: { padding: 24, gap: 16, paddingBottom: 48 },
  eyebrow: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.ink,
    opacity: 0.7,
  },
  title: { fontFamily: "Fredoka_700Bold", fontSize: 40, lineHeight: 40, color: COLORS.ink },
  line: { fontFamily: "Nunito_600SemiBold", fontSize: 18, lineHeight: 26, color: COLORS.ink },
  quiet: { fontFamily: "Nunito_600SemiBold", fontSize: 15, color: COLORS.muted, marginTop: 8 },
  label: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, textTransform: "uppercase", color: COLORS.ink },
  input: {
    backgroundColor: COLORS.cream,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 18,
    color: COLORS.ink,
  },
  btn: { borderRadius: 18, paddingVertical: 16, alignItems: "center" },
  btnText: { fontFamily: "Nunito_800ExtraBold", fontSize: 18, color: COLORS.ink },
  err: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.raspberry },
});
