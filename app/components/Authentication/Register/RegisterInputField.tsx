import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useUsers } from "@/app/context/users/UsersContext";
import InputField from "../../FormField/InputField";
import SelectField from "../../FormField/SelectField";

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

  const handleInputChange = (name: string, value: number | string) => {
    const newValue: string | number = name === "roleId" ? Number(value) : value;
    setUserRegister(name, newValue);
  };

  return (
    <View style={styles.inputContainer}>
      {/* Name */}
      <InputField
        label="Name"
        name="name"
        placeholder="Full Name"
        value={userRegister.name}
        onChange={handleInputChange}
        error={registerErrorMessages.Name}
      />

      {/* Email */}
      <InputField
        label="Email"
        name="email"
        placeholder="Email"
        value={userRegister.email ?? ""}
        onChange={handleInputChange}
        error={registerErrorMessages.Email}
      />

      {/* Password */}
      <InputField
        label="Password"
        name="password"
        placeholder="Password"
        value={userRegister.password ?? ""}
        onChange={handleInputChange}
        error={registerErrorMessages.Password}
      />

      {/* Phone */}
      <InputField
        label="Phone"
        name="phone"
        placeholder="Phone Number"
        value={userRegister.phone ?? ""}
        onChange={handleInputChange}
        error={registerErrorMessages.Phone}
      />

      {/* Address */}
      <InputField
        label="Address"
        name="address"
        placeholder="Address"
        value={userRegister.address ?? ""}
        onChange={handleInputChange}
        error={registerErrorMessages.Address}
      />

      {/* City */}
      <InputField
        label="City"
        name="city"
        placeholder="City"
        value={userRegister.city ?? ""}
        onChange={handleInputChange}
        error={registerErrorMessages.City}
      />

      {/* Role */}
      <SelectField
        label="Role"
        name="roleId"
        value={userRegister.roleId}
        onChange={handleInputChange}
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
