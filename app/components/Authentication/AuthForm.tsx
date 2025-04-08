import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RegisterInputField from "./Register/RegisterInputField";
import LoginInputField from "./Login/LoginInputField";
import { useRouter } from "expo-router";
import { useUsers } from "@/app/context/users/UsersContext";
import { KeyboardAvoidingView, Platform } from "react-native";

interface AuthFormProps {
  authType: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ authType }) => {
  const userContext = useUsers();
  const router = useRouter();

  const authFunction =
    authType === "Login" ? userContext.loginUser : userContext.registerUser;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>{authType}</Text>
            <View>
              {authType === "Login" ? <LoginInputField /> : <RegisterInputField />}
    
              <TouchableOpacity style={styles.button} onPress={authFunction}>
                <Text style={styles.buttonText}>{authType}</Text>
              </TouchableOpacity>
    
              <Text style={styles.linkText}>
                {authType === "Login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Text
                  style={styles.link}
                  onPress={() => {
                    authType === "Login"
                      ? router.push("/auth/register")
                      : router.push("/auth/login");
                  }}
                >
                  {authType === "Login" ? "Register here" : "Login here"}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  formContainer: {
    width: "100%",
    maxWidth: 512, // atau 420, sesuai keinginan
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  linkText: {
    textAlign: "center",
    marginTop: 12,
  },
  link: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default AuthForm;
