import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // atau 'react-navigation' jika kamu pakai itu
import { usePets } from "@/app/context/pets/PetsContext";
import { useGlobal } from "@/app/context/GlobalContext";
import AgeField from "@/app/components/FormField/AgeField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import TextareaField from "@/app/components/FormField/TextAreaField";
import Loading from "@/app/loading";

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
    loading,
    error,
  } = usePets();

  const [displayPrice, setDisplayPrice] = useState<string>(
    pet.price ? formattedPrice(pet.price) : ""
  );

  useEffect(() => {
    if (!slug) return;
    fetchSpecies();
    fetchPetDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (!pet || pet === null || pet === undefined) return;
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

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
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
          errorMsg={newPetErrorMessages.Age}
          fromPage="EditPet"
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
          onChange={(_, text) => handlePriceChange(text)}
          error={newPetErrorMessages.Price}
        />

        {/* Submit */}
        <TouchableOpacity
          disabled={error !== null}
          style={[
            styles.button,
            error !== null ? styles.buttonDisabled : styles.buttonActive,
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      <MessageModal title="Update Pet" message="New Pet has been updated" />
    </NormalContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonActive: {
    backgroundColor: "#2563eb", // Tailwind: bg-blue-600
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af", // Tailwind: bg-gray-400
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditPet;
