import {
  StyleSheet,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useUsers } from "../context/users/UsersContext";

export default function ProfileScreen() {
  const router = useRouter();
  const userContext = useUsers();
  const { width } = useWindowDimensions();

  const isLoggedIn = userContext?.isLoggedIn ?? false;
  const loggedInUser = userContext?.loggedInUser;
  const logoutUser = userContext?.logoutUser ?? (() => {});

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const goToMyPets = () => {
    router.push("/my-pets");
  };

  const goToMyServices = () => {
    router.push("/my-services");
  };

  const handleTransactions = () => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "adopter") {
      router.push("/transactions");
    } else if (role === "owner") {
      router.push("/transactions/owner");
    } else if (role === "provider") {
      router.push("/transactions/provider");
    }
  };

  const goToProfilePage = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const isSmallScreen = width < 400;

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

      {isLoggedIn ? (
        <ThemedText>{`Welcome back, ${
          loggedInUser?.name ?? "User"
        }`}</ThemedText>
      ) : (
        <ThemedText>Profile Page.</ThemedText>
      )}

      {isLoggedIn ? (
        <ThemedView
          style={[styles.buttonContainer, { flexDirection: "column" }]}
        >
          {/* Manage Item Menu */}
          {/* My Pets */}
          {loggedInUser?.role?.name?.toLowerCase() === "owner" && (
            <TouchableOpacity style={styles.button} onPress={goToMyPets}>
              <Text style={styles.buttonText}>My Pets</Text>
            </TouchableOpacity>
          )}
          {/* My Services */}
          {loggedInUser?.role?.name?.toLowerCase() === "provider" && (
            <TouchableOpacity style={styles.button} onPress={goToMyPets}>
              <Text style={styles.buttonText}>My Services</Text>
            </TouchableOpacity>
          )}

          {/* View Transaction History or Transaction Request */}
          <TouchableOpacity style={styles.button} onPress={handleTransactions}>
            <Text style={styles.buttonText}>
              {loggedInUser?.role?.name?.toLowerCase() === "adopter"
                ? "View Transactions"
                : "View Transaction Request"}
            </Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity style={styles.button} onPress={goToProfilePage}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={[styles.buttonContainer, { flexDirection: "row" }]}>
          {/* Register */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </ThemedView>
      )}
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
    marginBottom: 10,
  },
  textInfo: {
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
