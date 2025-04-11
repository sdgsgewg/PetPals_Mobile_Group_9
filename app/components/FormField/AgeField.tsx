import { usePets } from "@/app/context/pets/PetsContext";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

interface AgeFieldProps {
  label?: string;
  value: number;
  errorMsg?: string;
  fromPage?: string;
}

const AgeField: React.FC<AgeFieldProps> = ({
  label = "Age",
  value,
  errorMsg,
  fromPage,
}) => {
  const { pet, setNewPet, error, setErrorMessage } = usePets();

  const [years, setYears] = useState<string>("0");
  const [months, setMonths] = useState<string>("0");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (value === undefined || value === null) return;

    const parsedYears = Math.floor(value);
    const parsedMonths = Math.round((value - parsedYears) * 12);

    if (
      parsedYears.toString() !== years ||
      parsedMonths.toString() !== months
    ) {
      setYears(parsedYears.toString());
      setMonths(parsedMonths.toString());
    }

    setIsInitialized(false); // prevent triggering onChange immediately
    setTimeout(() => setIsInitialized(true), 0); // delay enable trigger
  }, [value]);

  useEffect(() => {
    if (!isInitialized) return;

    const yearVal = parseInt(years) || 0;
    const monthVal = Math.min(parseInt(months) || 0, 11);
    const ageDecimal = parseFloat((yearVal + monthVal / 12).toFixed(2));

    if (pet.age > ageDecimal && fromPage === "EditPet") {
      setErrorMessage("New age cannot be greater than current age.");
    } else {
      setErrorMessage(null);
      setNewPet("age", ageDecimal);
    }
  }, [years, months]);

  const handleYearChange = (text: string) => {
    let val = parseInt(text || "0", 10);
    if (isNaN(val) || val < 0) val = 0;
    setYears(val.toString());
  };

  const handleMonthChange = (text: string) => {
    let val = parseInt(text || "0", 10);
    if (isNaN(val)) val = 0;
    val = Math.min(Math.max(val, 0), 11);
    setMonths(val.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.helperText}>
        Input the pet's age in years and months.
      </Text>
      <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <Text style={styles.subLabel}>Year</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={2}
            placeholder="Years"
            value={years}
            onChangeText={(text) => handleYearChange(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.subLabel}>Month</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={2}
            placeholder="Months"
            value={months}
            onChangeText={(text) => handleMonthChange(text)}
            style={styles.input}
          />
        </View>
      </View>
      {/* Error message from backend */}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {/* Error message from context */}
      {error !== null && fromPage === "EditPet" && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    color: "#4B5563", // Tailwind gray-600
    marginBottom: 4,
  },
  helperText: {
    color: "#6B7280", // Tailwind slate-500
    fontStyle: "italic",
    fontSize: 12,
    marginBottom: 8,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  subLabel: {
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // Tailwind gray-300
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    color: "#111827", // Tailwind gray-900
  },
  errorText: {
    color: "#EF4444", // Tailwind red-500
    fontSize: 12,
    marginTop: 4,
  },
});

export default AgeField;
