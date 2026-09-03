import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/brand";

export function Hint({ line }: { line: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.mask} />
      <Text style={styles.line}>{line}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  mask: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.ink,
  },
  line: { flex: 1, fontFamily: "Nunito_800ExtraBold", fontSize: 15, color: COLORS.ink },
});
