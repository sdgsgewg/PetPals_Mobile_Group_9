import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";
import { TextInput, View, Text, StyleSheet, Platform } from "react-native";
import InputField from "../../FormField/InputField";

const LoginInputField = () => {
  const { userLogin, setUserLogin, loginErrorMessages } = useUsers();

  const handleInputChange = (name: string, value: string) => {
    setUserLogin(name, value);
  };

  return (
    <View style={styles.wrapper}>
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={userLogin.email}
        onChange={handleInputChange}
        error={loginErrorMessages.Email}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        value={userLogin.password}
        onChange={handleInputChange}
        error={loginErrorMessages.Password}
      />
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
