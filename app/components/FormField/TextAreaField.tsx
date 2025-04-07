import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline
        numberOfLines={rows}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={[styles.textarea, error ? styles.errorBorder : null]}
        placeholderTextColor="#999"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#4B5563", // gray-600
    fontWeight: "600",
    marginBottom: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // default border
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top", // for multiline to start at the top
    backgroundColor: "#FFFFFF",
    color: "#111827", // text color
  },
  errorBorder: {
    borderColor: "#EF4444", // red-500
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextareaField;
