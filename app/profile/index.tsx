import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useUsers } from "@/app/context/users/UsersContext";
import { SafeAreaView } from "react-native-safe-area-context";
import DataField from "../components/Profile/DataField";

const Profile = () => {
  const { loggedInUser } = useUsers();

  useEffect(() => {
    if (!loggedInUser) return;
  }, [loggedInUser]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>User Profile</Text>
          </View>

          <DataField label="Name" value={loggedInUser.name} />
          <DataField label="Email" value={loggedInUser.email} />
          <DataField label="Phone" value={loggedInUser.phone} />
          <DataField label="Address" value={loggedInUser.address} />
          <DataField label="City" value={loggedInUser.city} />
          <DataField label="Role" value={loggedInUser.role.name} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6", // equivalent to bg-gray-100
  },
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    backgroundColor: "#1e3a8a", // bg-blue-900
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
  },
  field: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  label: {
    color: "#6b7280", // gray-500
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#111827", // gray-900
    fontWeight: "500",
  },
});
