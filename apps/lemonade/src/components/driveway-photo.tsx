import { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import {
  COLORS,
  DRIVEWAY_PHOTO,
  DRIVEWAY_PHOTO_LINE,
  FIRST_NAME_ONLY,
  PARENT_OWNED,
} from "@/brand";

export function DrivewayPhoto({
  photo,
  onChange,
}: {
  photo: string | null;
  onChange: (photo: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(fromLibrary = false) {
    setBusy(true);
    setError(null);
    try {
      const next = fromLibrary ? await pickLibrary() : await pickCamera();
      if (next) onChange(next);
    } catch {
      setError("Could not keep that picture. Try another.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.box}>
      <Text style={styles.kicker}>Driveway photo</Text>
      <Text style={styles.title}>{DRIVEWAY_PHOTO}</Text>
      <Text style={styles.line}>{DRIVEWAY_PHOTO_LINE}</Text>
      <Text style={styles.quiet}>
        {PARENT_OWNED}. {FIRST_NAME_ONLY} Stays on this device.
      </Text>
      {photo ? (
        <Image
          source={{ uri: photo }}
          style={styles.shot}
          accessibilityLabel="The stand on the driveway. No kid face."
        />
      ) : null}
      <Pressable style={styles.main} disabled={busy} onPress={() => pick(false)}>
        <Text style={styles.mainText}>{busy ? "Keeping it…" : photo ? "Try another" : "Take the picture"}</Text>
      </Pressable>
      <Pressable style={styles.ghost} disabled={busy} onPress={() => pick(true)}>
        <Text style={styles.ghostText}>Choose a photo</Text>
      </Pressable>
      {photo ? (
        <Pressable style={styles.ghost} onPress={() => onChange(null)}>
          <Text style={styles.ghostText}>Forget this photo</Text>
        </Pressable>
      ) : null}
      {error ? <Text style={styles.err}>{error}</Text> : null}
    </View>
  );
}

async function pickCamera() {
  if (Platform.OS === "web") return pickWeb(true);
  const ImagePicker = await import("expo-image-picker");
  const perm = await ImagePicker.requestCameraPermissionsAsync();
  if (!perm.granted) return pickLibrary();
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.65,
    base64: true,
    allowsEditing: false,
    cameraType: ImagePicker.CameraType.back,
  });
  return fromPicker(result);
}

async function pickLibrary() {
  if (Platform.OS === "web") return pickWeb(false);
  const ImagePicker = await import("expo-image-picker");
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) throw new Error("Need the photo library.");
  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.65,
    base64: true,
    allowsEditing: false,
    mediaTypes: ["images"],
  });
  return fromPicker(result);
}

function fromPicker(result: { canceled: boolean; assets?: Array<{ base64?: string | null; uri: string }> | null }) {
  if (result.canceled || !result.assets?.[0]) return null;
  const asset = result.assets[0];
  return asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
}

function pickWeb(camera: boolean) {
  return new Promise<string | null>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    if (camera) input.setAttribute("capture", "environment");
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      fileToJpeg(file).then(resolve).catch(reject);
    };
    input.click();
  });
}

function fileToJpeg(file: File) {
  return new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      const max = 1400;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d");
      URL.revokeObjectURL(url);
      if (!ctx) {
        reject(new Error("no canvas"));
        return;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad photo"));
    };
    image.src = url;
  });
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  kicker: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, textTransform: "uppercase", color: COLORS.raspberry },
  title: { fontFamily: "Fredoka_700Bold", fontSize: 24, lineHeight: 26, color: COLORS.ink },
  line: { fontFamily: "Nunito_600SemiBold", fontSize: 16, color: COLORS.ink },
  quiet: { fontFamily: "Nunito_600SemiBold", fontSize: 14, color: COLORS.muted },
  shot: { width: "100%", height: 220, borderRadius: 16, backgroundColor: COLORS.cream },
  main: { backgroundColor: COLORS.lemonade, borderRadius: 16, paddingVertical: 14, alignItems: "center" },
  mainText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  ghost: { backgroundColor: COLORS.cream, borderRadius: 16, paddingVertical: 12, alignItems: "center" },
  ghostText: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.ink },
  err: { fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.raspberry },
});
