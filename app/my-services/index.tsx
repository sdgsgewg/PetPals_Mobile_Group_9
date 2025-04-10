import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import ItemNotFound from "@/app/components/ItemNotFound";
import Header from "@/app/components/ManageItem/Header";
import MyPetTable from "@/app/components/ManageItem/MyPetTable";
import MessageModal from "@/app/components/modals/MessageModal";
import RemoveItemModal from "@/app/components/modals/RemoveItemModal";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/pets/PetsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import IPet from "@/app/interface/pet/IPet";
import { useRouter } from "expo-router";
import { useServices } from "../context/services/ServicesContext";
import IService from "../interface/service/IService";
import MyServiceTable from "../components/ManageItem/MyServiceTable";

const MyServices = () => {
  const { loggedInUser } = useUsers();
  const { providerServices, fetchProviderServices, error } = useServices();

  const router = useRouter();

  const [selectedService, setSelectedService] = useState<IService>(
    {} as IService
  );

  const updateSelectedService = (service: IService) => {
    setSelectedService(service);
  };

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "adopter") {
      router.push("/");
    } else if (role === "owner") {
      router.push("/my-pets");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "provider") {
      fetchProviderServices(loggedInUser.userId);
    }
  }, [loggedInUser]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <View style={styles.container}>
        <Header
          title="My Services"
          redirectUrl="AddNewService"
          addText="Add New Service"
        />

        {providerServices.length > 0 ? (
          <MyServiceTable updateSelectedService={updateSelectedService} />
        ) : (
          <ItemNotFound
            image_url="/img/service-not-found.png"
            size={200}
            message="Service Not Found"
          />
        )}
      </View>

      <RemoveItemModal
        title="Remove Service Confirmation"
        message="Are you sure you want to remove this service?"
        item={selectedService}
        itemType="Service"
      />

      <MessageModal title="Remove Service" message="Service has been removed" />
    </NormalContent>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 200,
  },
});
