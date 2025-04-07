import React from "react";
import { ScrollView, View, Text } from "react-native";
import AuthForm from "../components/Authentication/AuthForm";
import AuthLayout from "./layout";

const Login = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AuthLayout>
        <View style={{ width: "60%" }}>
          <AuthForm authType="Login" />
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default Login;
