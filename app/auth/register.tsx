import React from "react";
import { ScrollView, Text, View } from "react-native";
import AuthForm from "../components/Authentication/AuthForm";
import AuthLayout from "./layout";

const Register = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AuthLayout>
        <View
          style={{
            width: "100%",
          }}
        >
          <AuthForm authType="Register" />
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default Register;
