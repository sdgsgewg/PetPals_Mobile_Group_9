import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";
import { TextInput, View, Text, StyleSheet, Platform } from "react-native";

const LoginInputField = () => {
  const { userLogin, setUserLogin } = useUsers();

  const handleInputChange = (name: string, value: string) => {
    setUserLogin(name, value);
  };

  return (
    <View style={styles.wrapper}>
      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={userLogin.email}
          onChangeText={(text) => handleInputChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={userLogin.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    height: Platform.OS === "ios" ? 44 : 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});

export default LoginInputField;
