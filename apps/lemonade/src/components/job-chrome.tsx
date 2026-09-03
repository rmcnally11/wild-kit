import { usePathname, useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/brand";
import { useStand } from "@/store";

const TABS = [
  { href: "/invent", label: "Invent" },
  { href: "/print", label: "Print" },
  { href: "/open", label: "Open" },
] as const;

export function JobChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { stand } = useStand();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.brand}>Wild Kit</Text>
          <Text style={styles.title}>{stand.standName || "Lemonade Stand"}</Text>
        </View>
        <Pressable style={styles.parent} onPress={() => router.push("/parent")}>
          <Text style={styles.parentText}>Parent Desk</Text>
        </Pressable>
      </View>
      <View style={styles.body}>{children}</View>
      <View style={styles.nav}>
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Pressable
              key={tab.href}
              onPress={() => router.replace(tab.href)}
              style={[styles.tab, active && styles.tabOn]}
            >
              <Text style={[styles.tabText, active && styles.tabTextOn]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.cream },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brand: { fontFamily: "Nunito_800ExtraBold", fontSize: 12, color: COLORS.raspberry, textTransform: "uppercase" },
  title: { fontFamily: "Fredoka_700Bold", fontSize: 26, lineHeight: 28, color: COLORS.ink },
  parent: { backgroundColor: COLORS.lemonade, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  parentText: { fontFamily: "Nunito_800ExtraBold", fontSize: 13, color: COLORS.ink },
  body: { flex: 1, paddingHorizontal: 20 },
  nav: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.cream,
  },
  tab: { flex: 1, borderRadius: 16, paddingVertical: 12, alignItems: "center", backgroundColor: COLORS.card },
  tabOn: { backgroundColor: COLORS.ink },
  tabText: { fontFamily: "Nunito_800ExtraBold", fontSize: 16, color: COLORS.ink },
  tabTextOn: { color: COLORS.cream },
});
