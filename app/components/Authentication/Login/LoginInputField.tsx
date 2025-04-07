import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

const LoginInputField = () => {
  const { userLogin, setUserLogin } = useUsers();

  const handleInputChange = (name: string, value: string) => {
    setUserLogin(name, value);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userLogin.email}
          onChangeText={(text) => handleInputChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={userLogin.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default LoginInputField;
