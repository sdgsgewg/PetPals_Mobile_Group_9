import { StyleSheet, Platform, TouchableOpacity, Text } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useUsers } from "../context/users/UsersContext";

export default function ProfileScreen() {
  const router = useRouter();

  const { isLoggedIn, loggedInUser, logoutUser } = useUsers();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>

      {/* Custom Login and Register Buttons */}
      <ThemedView style={styles.buttonContainer}>
        {isLoggedIn ? (
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
