import { StyleSheet, View } from "react-native";

import { COLORS, type TemplateId } from "@/brand";

export function StandMark({
  template,
  size = 112,
}: {
  template: TemplateId;
  size?: number;
}) {
  if (template === "berry") {
    return (
      <View style={[styles.ticket, { width: size * 1.15, height: size * 0.72 }]}>
        <View style={styles.notch} />
        <View style={[styles.notch, styles.notchRight]} />
        <View style={styles.pip} />
      </View>
    );
  }

  if (template === "sky") {
    return (
      <View style={{ width: size, height: size * 0.78, justifyContent: "center" }}>
        <View style={styles.banner}>
          <View style={styles.bannerTail} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.lemon, { width: size, height: size }]}>
      <View style={styles.leaf} />
      <View style={styles.shine} />
    </View>
  );
}

const styles = StyleSheet.create({
  lemon: {
    borderRadius: 999,
    backgroundColor: COLORS.cream,
    borderWidth: 5,
    borderColor: COLORS.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  leaf: {
    position: "absolute",
    top: 10,
    width: 22,
    height: 14,
    borderRadius: 10,
    backgroundColor: COLORS.leaf,
    transform: [{ rotate: "-18deg" }],
  },
  shine: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.lemonade,
    opacity: 0.9,
    marginTop: 8,
  },
  ticket: {
    backgroundColor: COLORS.cream,
    borderWidth: 5,
    borderColor: COLORS.ink,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  notch: {
    position: "absolute",
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.raspberry,
    borderWidth: 5,
    borderColor: COLORS.ink,
  },
  notchRight: { left: undefined, right: -10 },
  pip: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.raspberry,
    borderWidth: 3,
    borderColor: COLORS.ink,
  },
  banner: {
    height: 54,
    backgroundColor: COLORS.cream,
    borderWidth: 5,
    borderColor: COLORS.ink,
    borderRadius: 8,
  },
  bannerTail: {
    position: "absolute",
    right: -2,
    bottom: -16,
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 18,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: COLORS.ink,
  },
});
