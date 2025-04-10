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
import Loading from "../loading";

const MyPets = () => {
  const { loggedInUser } = useUsers();
  const { ownerPets, fetchOwnerPets, loading, error } = usePets();

  const router = useRouter();

  const [selectedPet, setSelectedPet] = useState<IPet>({} as IPet);

  const updateSelectedPet = (pet: IPet) => {
    setSelectedPet(pet);
  };

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "adopter") {
      router.push("/");
    } else if (role === "provider") {
      router.push("/my-services");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "owner") {
      fetchOwnerPets(loggedInUser.userId);
    }
  }, [loggedInUser]);

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

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
        <Header title="My Pets" redirectUrl="AddNewPet" addText="Add New Pet" />

        {ownerPets.length > 0 ? (
          <MyPetTable updateSelectedPet={updateSelectedPet} />
        ) : (
          <ItemNotFound
            image_url="/img/pet-not-found.png"
            size={200}
            message="Pet Not Found"
          />
        )}
      </View>

      <RemoveItemModal
        title="Remove Pet Confirmation"
        message="Are you sure you want to remove this pet?"
        item={selectedPet}
        itemType="Pet"
      />

      <MessageModal title="Remove Pet" message="Pet has been removed" />
    </NormalContent>
  );
};

export default MyPets;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
