import {
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts as useFredoka,
} from "@expo-google-fonts/fredoka";
import {
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_800ExtraBold,
  useFonts as useNunito,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { COLORS } from "@/brand";
import { StandProvider } from "@/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fredoka] = useFredoka({ Fredoka_600SemiBold, Fredoka_700Bold });
  const [nunito] = useNunito({
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });
  const ready = fredoka && nunito;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <StandProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.cream },
          animation: "fade",
        }}
      />
    </StandProvider>
  );
}
