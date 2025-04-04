import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import Providers from "./providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const segments = useSegments(); // ✅ Mengambil path segment dari Expo Router

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // ✅ Mapping segment ke judul yang sesuai
    const pageTitle: Record<string, string> = {
      "": "Home - Pet Pals",
      adoptions: "Find Your Best Pals - Adoptions",
      services: "Our Services - Pet Pals",
      profile: "User Profile - Pet Pals",
    };

    const currentSegment = segments[0] || ""; // Ambil segment pertama
    document.title = pageTitle[currentSegment] || "Pet Pals";
  }, [segments]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Providers>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Providers>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
