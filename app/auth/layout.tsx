import React from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? "#111827" : "#f3f4f6" }, // dark:bg-gray-900 / light:bg-gray-100
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40, // pt-32
    paddingBottom: 80, // pb-24
    paddingHorizontal: 16,
  },
  container: {
    width: "100%",
    maxWidth: 350, // optional: similar to container size in web
  },
});

export default AuthLayout;
