import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { COLORS } from "@/brand";
import { useStand } from "@/store";

export default function Gate() {
  const { stand, ready } = useStand();

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.lemonade }}>
        <ActivityIndicator color={COLORS.ink} />
      </View>
    );
  }

  return <Redirect href={stand.setupDone ? "/invent" : "/setup"} />;
}
