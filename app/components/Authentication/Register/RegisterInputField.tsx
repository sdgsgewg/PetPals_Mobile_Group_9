import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useUsers } from "@/app/context/users/UsersContext";
import InputField from "../InputField";
import SelectField from "../SelectField";

const RegisterInputField = () => {
  const {
    userRegister,
    setUserRegister,
    roles,
    fetchRoles,
    registerErrorMessages,
  } = useUsers();

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <View style={styles.inputContainer}>
      <InputField
        label="Name"
        name="name"
        placeholder="Full Name"
        value={userRegister.name}
        onChange={(text) => setUserRegister("name", text)}
        error={registerErrorMessages.Name}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={userRegister.email}
        onChange={(text) => setUserRegister("email", text)}
        error={registerErrorMessages.Email}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        value={userRegister.password}
        onChange={(text) => setUserRegister("password", text)}
        error={registerErrorMessages.Password}
      />

      <InputField
        label="Phone"
        name="phone"
        type="tel"
        placeholder="Phone Number"
        value={userRegister.phone}
        onChange={(text) => setUserRegister("phone", text)}
        error={registerErrorMessages.Phone}
      />

      <InputField
        label="Address"
        name="address"
        placeholder="Address"
        value={userRegister.address}
        onChange={(text) => setUserRegister("address", text)}
        error={registerErrorMessages.Address}
      />

      <InputField
        label="City"
        name="city"
        placeholder="City"
        value={userRegister.city}
        onChange={(text) => setUserRegister("city", text)}
        error={registerErrorMessages.City}
      />

      <SelectField
        label="Role"
        name="roleId"
        value={userRegister.roleId}
        onChange={(value) => setUserRegister("roleId", Number(value))}
        options={roles}
        error={registerErrorMessages.RoleId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
});

export default RegisterInputField;
