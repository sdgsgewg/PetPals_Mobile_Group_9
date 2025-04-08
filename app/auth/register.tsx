import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import AuthForm from "../components/Authentication/AuthForm";
import AuthLayout from "./layout";

const Register = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <AuthLayout>
          <View
            style={[
              styles.formContainer,
              {
                width: isSmallScreen ? "90%" : "70%",
                maxWidth: 400, // prevent overly wide forms
              },
            ]}
          >
            <AuthForm authType="Register" />
          </View>
        </AuthLayout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    alignSelf: "center",
  },
});

export default Register;
