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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, FIRST_APP, MASTER } from "@/brand";
import { useStand } from "@/store";

export default function SetupScreen() {
  const router = useRouter();
  const { stand, save } = useStand();
  const [who, setWho] = useState<"ask" | "parent" | "kid">(stand.parentEmail ? "kid" : "ask");
  const [email, setEmail] = useState(stand.parentEmail);
  const [zip, setZip] = useState(stand.zip);
  const [kidName, setKidName] = useState(stand.kidName);

  function finish() {
    const name = kidName.trim();
    if (!name) return;
    save({
      parentEmail: email.trim(),
      zip: zip.trim(),
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
              <Text style={styles.line}>Grown-up first. Then you invent it. First name only. No kid inbox.</Text>
              <Pressable style={[styles.btn, { backgroundColor: COLORS.ink }]} onPress={() => setWho("parent")}>
                <Text style={[styles.btnText, { color: COLORS.cream }]}>A grown-up</Text>
              </Pressable>
              <Text style={styles.quiet}>{MASTER}</Text>
            </>
          ) : null}

          {who === "parent" ? (
            <>
              <Text style={styles.title}>Parent desk.</Text>
              <Text style={styles.line}>You own the account. They invent the stand. You hit print.</Text>
              <Text style={styles.label}>Your email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@getwildkit.com"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />
              <Text style={styles.label}>Zip</Text>
              <TextInput
                value={zip}
                onChangeText={setZip}
                keyboardType="number-pad"
                placeholder="12345"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />
              <Pressable
                style={[styles.btn, { backgroundColor: COLORS.coral }]}
                onPress={() => email.includes("@") && setWho("kid")}
              >
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
                onChangeText={setKidName}
                autoComplete="off"
                placeholder="First name"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />
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
});
