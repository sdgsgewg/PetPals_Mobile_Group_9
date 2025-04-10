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
    <View style={styles.inputContainer}>
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
  inputContainer: {
    marginVertical: 8,
  },
});

export default LoginInputField;
