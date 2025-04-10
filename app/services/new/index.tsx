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
import { useServices } from "@/app/context/services/ServicesContext";

const NewService = () => {
  const { formattedPrice } = useGlobal();
  const { loggedInUser } = useUsers();
  const {
    service_categories,
    newService,
    newServiceErrorMessages,
    fetchServiceCategories,
    setNewService,
    resetNewService,
    addNewService,
  } = useServices();

  const [displayPrice, setDisplayPrice] = useState<string>(
    newService.price ? formattedPrice(newService.price) : ""
  );

  useEffect(() => {
    resetNewService();
    setDisplayPrice("");
    fetchServiceCategories();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newService.providerId !== loggedInUser.userId) {
      setNewService("providerId", loggedInUser.userId);
    }
    if (loggedInUser?.name && newService.createdBy !== loggedInUser.name) {
      setNewService("createdBy", loggedInUser.name);
    }
  }, [loggedInUser?.userId, loggedInUser?.name]);

  const handleInputChange = (name: string, value: number | string) => {
    const newValue = ["categoryId", "price"].includes(name)
      ? Number(value)
      : value;
    setNewService(name, newValue);
  };

  const handlePriceChange = (text: string) => {
    const rawValue = text.replace(/\D/g, "");
    const numericValue = parseInt(rawValue || "0", 10);
    setNewService("price", numericValue);
    setDisplayPrice(formattedPrice(numericValue));
  };

  const handleSubmit = () => {
    addNewService();
  };

  return (
    <NormalContent>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tambah Layanan Hewan Peliharaan Baru</Text>

        {/* Name */}
        <InputField
          label="Name"
          name="name"
          placeholder="Name"
          value={newService.name}
          onChange={handleInputChange}
          error={newServiceErrorMessages.Name}
        />

        {/* Service Category */}
        <SelectField
          label="Category"
          name="categoryId"
          value={newService.categoryId}
          onChange={handleInputChange}
          options={service_categories}
          error={newServiceErrorMessages.CategoryId}
        />

        {/* Description */}
        <TextareaField
          label="Description"
          name="description"
          placeholder="Describe your service"
          value={newService.description}
          onChange={handleInputChange}
        />

        {/* Price */}
        <InputField
          label="Price"
          name="price"
          placeholder="Price"
          value={displayPrice}
          onChange={(_, text) => handlePriceChange(text)}
          error={newServiceErrorMessages.Price}
        />

        {/* Address */}
        <InputField
          label="Address"
          name="address"
          placeholder="Address"
          value={newService.address}
          onChange={handleInputChange}
          error={newServiceErrorMessages.Address}
        />

        {/* City */}
        <InputField
          label="City"
          name="city"
          placeholder="City"
          value={newService.city}
          onChange={handleInputChange}
          error={newServiceErrorMessages.City}
        />

        {/* Tombol Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>

      <MessageModal
        title="Add New Service"
        message="New Service has been added"
      />
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

export default NewService;
