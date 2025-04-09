import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (name: string, value: string) => void;
  error?: string;
  step?: string | number;
  isDisabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  step,
  isDisabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      {label === "Age" && (
        <Text style={styles.hint}>
          Please input 0.X if your pet age is below 1 (Ex: 0.5 equals 5 months).
        </Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          editable={!isDisabled}
          placeholder={placeholder}
          secureTextEntry={isPasswordType && !showPassword}
          keyboardType={type === "number" ? "numeric" : "default"}
          value={String(value)}
          onChangeText={(text) => onChange(name, text)}
          style={[
            styles.input,
            isDisabled && styles.disabled,
            error && styles.errorBorder,
          ]}
        />

        {isPasswordType && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.icon}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    color: "#4B5563", // gray-600
    fontWeight: "600",
  },
  hint: {
    color: "#6B7280", // slate-500
    fontSize: 12,
    fontStyle: "italic",
    marginVertical: 4,
  },
  inputWrapper: {
    position: "relative",
    marginTop: 4,
  },
  input: {
    width: "100%",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    paddingRight: 40,
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  errorBorder: {
    borderColor: "#EF4444",
  },
  disabled: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
});

export default InputField;
