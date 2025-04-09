import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // atau 'react-navigation' jika kamu pakai itu
import { usePets } from "@/app/context/pets/PetsContext";
import { useGlobal } from "@/app/context/GlobalContext";
import AgeField from "@/app/components/FormField/AgeField";
import InputField from "../../components/FormField/InputField";
import TextareaField from "../../components/FormField/TextAreaField";
import SelectField from "../../components/FormField/SelectField";

const EditPet = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { formattedPrice } = useGlobal();

  const {
    pet,
    species,
    newPet,
    newPetErrorMessages,
    fetchSpecies,
    fetchPetDetail,
    setNewPet,
    editPet,
  } = usePets();

  const [displayPrice, setDisplayPrice] = useState<string>(
    pet.price ? formattedPrice(pet.price) : ""
  );

  useEffect(() => {
    fetchSpecies();
    fetchPetDetail(slug);
  }, [slug]);

  useEffect(() => {
    setNewPet("petId", pet.petId);
    setNewPet("name", pet.name);
    setNewPet("breed", pet.breed);
    setNewPet("age", pet.age);
    setNewPet("gender", pet.gender);
    setNewPet("speciesId", pet?.species?.id);
    setNewPet("description", pet.description);
    setNewPet("price", pet.price);
    setDisplayPrice(formattedPrice(pet.price));
  }, [pet]);

  const handleInputChange = (name: string, value: string | number) => {
    if (["age", "speciesId", "price"].includes(name)) {
      setNewPet(name, Number(value));
    } else {
      setNewPet(name, value);
    }
  };

  const handlePriceChange = (value: string) => {
    const rawValue = value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue || "0", 10);
    setNewPet("price", numericValue);
    setDisplayPrice(formattedPrice(numericValue));
  };

  const handleSubmit = () => {
    editPet(pet.petId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Hewan Peliharaan</Text>

      {/* Name */}
      <InputField
        label="Name"
        name="name"
        placeholder="Name"
        value={newPet.name}
        onChange={handleInputChange}
        error={newPetErrorMessages.Name}
      />

      {/* Species */}
      <SelectField
        label="Species"
        name="speciesId"
        value={newPet.speciesId}
        onChange={handleInputChange}
        options={species}
        isDisabled={true}
      />

      {/* Breed */}
      <InputField
        label="Breed"
        name="breed"
        placeholder="Breed"
        value={newPet.breed}
        onChange={handleInputChange}
        isDisabled={true}
      />

      {/* Age */}
      <AgeField
        value={newPet.age}
        onChange={(val) => setNewPet("age", val)}
        error={newPetErrorMessages.Age}
      />

      {/* Gender */}
      <InputField
        label="Gender"
        name="gender"
        placeholder="Gender"
        value={newPet.gender}
        onChange={handleInputChange}
        isDisabled={true}
      />

      {/* Description */}
      <TextareaField
        label="Description"
        name="description"
        placeholder="Describe your pet"
        value={newPet.description}
        onChange={handleInputChange}
      />

      {/* Price */}
      <InputField
        label="Price"
        name="price"
        placeholder="Price"
        value={displayPrice}
        onChange={handlePriceChange}
        error={newPetErrorMessages.Price}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  disabled: {
    backgroundColor: "#eee",
    color: "#999",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "#ef4444",
    marginBottom: 8,
    fontSize: 12,
  },
});

export default EditPet;
