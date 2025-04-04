import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: string) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={type === "password" && !showPassword}
          placeholder={placeholder}
          style={[styles.input, error && styles.inputError]}
          value={value}
          onChangeText={onChange}
        />
        {type === "password" && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff size={22} color="#808080" />
            ) : (
              <Eye size={22} color="#808080" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#4B5563",
    fontWeight: "600",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    borderColor: "#D1D5DB",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  icon: {
    padding: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;
