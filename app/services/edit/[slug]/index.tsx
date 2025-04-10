import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobal } from "@/app/context/GlobalContext";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import InputField from "@/app/components/FormField/InputField";
import SelectField from "@/app/components/FormField/SelectField";
import TextareaField from "@/app/components/FormField/TextAreaField";
import { useServices } from "@/app/context/services/ServicesContext";

const EditService = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { formattedPrice } = useGlobal();
  const {
    service,
    service_categories,
    newService,
    newServiceErrorMessages,
    fetchServiceCategories,
    fetchServiceDetail,
    setNewService,
    editService,
  } = useServices();

  const [displayPrice, setDisplayPrice] = useState<string>(
    newService.price ? formattedPrice(newService.price) : ""
  );

  useEffect(() => {
    if (!slug) return;
    fetchServiceCategories();
    fetchServiceDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (!service) return;
    setNewService("serviceId", service.serviceId);
    setNewService("name", service.name);
    setNewService("categoryId", service?.category?.id);
    setNewService("description", service.description);
    setNewService("price", service.price);
    setNewService("address", service.address);
    setNewService("city", service.city);
    setDisplayPrice(formattedPrice(service.price));
  }, [service]);

  const handleInputChange = (name: string, value: string | number) => {
    if (["categoryId"].includes(name)) {
      setNewService(name, Number(value));
    } else {
      setNewService(name, value);
    }
  };

  const handlePriceChange = (value: string) => {
    const rawValue = value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue || "0", 10);
    setNewService("price", numericValue);
    setDisplayPrice(formattedPrice(numericValue));
  };

  const handleSubmit = () => {
    editService(service.serviceId);
  };

  return (
    <NormalContent>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Layanan Hewan Peliharaan</Text>

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

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      <MessageModal title="Update Service" message="Service has been updated" />
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
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditService;
