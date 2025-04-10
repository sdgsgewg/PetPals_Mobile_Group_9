import React from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import AuthForm from "../components/Authentication/AuthForm";
import AuthLayout from "./layout";
import { useUsers } from "../context/users/UsersContext";
import NormalContent from "../components/ContentTemplate/NormalContent";
import Loading from "../loading";

const Login = () => {
  const { loading } = useUsers();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AuthLayout>
        <AuthForm authType="Login" />

        {loading && (
          <NormalContent>
            <Loading />
          </NormalContent>
        )}
      </AuthLayout>
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

export default Login;
