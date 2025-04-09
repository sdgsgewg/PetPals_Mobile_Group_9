import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface AgeFieldProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const AgeField: React.FC<AgeFieldProps> = ({
  label = "Age",
  value,
  onChange,
  error,
}) => {
  const [years, setYears] = useState<string>("0");
  const [months, setMonths] = useState<string>("0");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const parsedYears = Math.floor(value);
    const parsedMonths = Math.round((value - parsedYears) * 12);

    if (
      parsedYears.toString() !== years ||
      parsedMonths.toString() !== months
    ) {
      setYears(parsedYears.toString());
      setMonths(parsedMonths.toString());
    }

    setIsInitialized(true);
  }, [value]);

  useEffect(() => {
    if (isInitialized) {
      const ageDecimal =
        (parseInt(years) || 0) + ((parseInt(months) || 0) % 12) / 12;
      onChange(parseFloat(ageDecimal.toFixed(2)));
    }
  }, [years, months]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.helperText}>
        Input the pet's age in years and months.
      </Text>
      <View style={styles.inputGroup}>
        <TextInput
          keyboardType="numeric"
          placeholder="Years"
          value={years}
          onChangeText={(text) => setYears(text)}
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Months"
          value={months}
          onChangeText={(text) => {
            const val = Math.min(11, parseInt(text) || 0);
            setMonths(val.toString());
          }}
          style={styles.input}
        />
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
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 4,
  },
  helperText: {
    color: "#6B7280",
    fontStyle: "italic",
    fontSize: 12,
    marginBottom: 8,
  },
  inputGroup: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#111827",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default AgeField;
