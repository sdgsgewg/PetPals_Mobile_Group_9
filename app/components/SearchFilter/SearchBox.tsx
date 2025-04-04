import React from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";

interface SearchBoxProps {
  searchType: string;
  placeholder: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, searchType }) => {
  const petContext = usePets();
  const serviceContext = useServices();

  const isPetsSearch = searchType === "pets";
  const { filters, setFilters } = isPetsSearch ? petContext : serviceContext;
  const fetchFunction = isPetsSearch
    ? petContext.fetchPets
    : serviceContext.fetchServices;

  const handleInputChange = (value: string) => {
    setFilters("searchValue", value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        value={filters.searchValue}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.button} onPress={fetchFunction}>
        <FontAwesome name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default SearchBox;
