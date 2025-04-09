import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

interface HeaderProps {
  title: string;
  redirectUrl: string; // nama screen tujuan, bukan URL
  addText: string;
}

const Header: React.FC<HeaderProps> = ({ title, redirectUrl, addText }) => {
  const navigation = useNavigation();

  const router = useRouter();

  const goToAddPet = () => {
    router.push("/adoptions/new");
  };

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={goToAddPet} style={styles.button}>
          <Text style={styles.buttonText}>{addText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0", // slate-200
    paddingBottom: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 32, // text-4xl
    fontWeight: "bold",
    color: "#111827", // text-gray-900
  },
  buttonWrapper: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3b82f6", // blue-500
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default Header;
