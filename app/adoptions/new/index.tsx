import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import AgeField from "@/app/components/FormField/AgeField";
import GenderField from "@/app/components/FormField/GenderField";
import TextareaField from "@/app/components/FormField/TextAreaField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import Loading from "@/app/loading";

const NewPet = () => {
  const { formattedPrice } = useGlobal();
  const { loggedInUser } = useUsers();
  const {
    species,
    newPet,
    newPetErrorMessages,
    fetchSpecies,
    setNewPet,
    resetNewPet,
    addNewPet,
    loading,
  } = usePets();

  const [displayPrice, setDisplayPrice] = useState(
    newPet.price ? formattedPrice(newPet.price) : ""
  );

  const handleInputChange = (name: string, value: number | string) => {
    const newValue = ["age", "speciesId", "price"].includes(name)
      ? Number(value)
      : value;
    setNewPet(name, newValue);
  };

  const handlePriceChange = (text: string) => {
    const rawValue = text.replace(/\D/g, "");
    const numericValue = parseInt(rawValue || "0", 10);
    setNewPet("price", numericValue);
    setDisplayPrice(formattedPrice(numericValue));
  };

  useEffect(() => {
    resetNewPet();
    setDisplayPrice("");
    fetchSpecies();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newPet.ownerId !== loggedInUser.userId) {
      setNewPet("ownerId", loggedInUser.userId);
    }
  }, [loggedInUser?.userId]);

  const handleSubmit = () => {
    addNewPet();
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
        <Text style={styles.title}>Tambah Hewan Peliharaan Baru</Text>

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
          error={newPetErrorMessages.SpeciesId}
        />

        {/* Breed */}
        <InputField
          label="Breed"
          name="breed"
          placeholder="Breed"
          value={newPet.breed}
          onChange={handleInputChange}
          error={newPetErrorMessages.Breed}
        />

        {/* Age */}
        <AgeField
          value={newPet.age}
          onChange={(val) => setNewPet("age", val)}
          error={newPetErrorMessages.Age}
        />

        {/* Gender */}
        <GenderField
          value={newPet.gender}
          onChange={handleInputChange}
          error={newPetErrorMessages.Gender}
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

        {/* Tombol Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>

      <MessageModal title="Add New Pet" message="New Pet has been added" />
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
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewPet;
