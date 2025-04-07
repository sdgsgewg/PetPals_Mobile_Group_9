import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { usePets } from "../context/pets/PetsContext"; // Sesuaikan path sesuai kebutuhan
import { useAdoptions } from "../context/adoptions/AdoptionsContext"; // Sesuaikan path sesuai kebutuhan
import { useUsers } from "../context/users/UsersContext"; // Sesuaikan path sesuai kebutuhan
import { useGlobal } from "../context/GlobalContext"; // Sesuaikan path sesuai kebutuhan
import NormalContent from "../components/ContentTemplate/NormalContent";
import Loading from "../loading";
import PageNotFound from "../components/PageNotFound";
import ItemDetailCard from "../components/Cards/ItemDetailCard";
import ContactPersonCard from "../components/Cards/ContactPersonCard";
import MessageModal from "../components/modals/MessageModal";
import { useLocalSearchParams, useRouter } from "expo-router";

const PetDetail = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { getImageUrlByBreed } = useGlobal();
  const { isLoggedIn, loggedInUser } = useUsers();
  const { pet, fetchPetDetail, loading, error } = usePets();
  const { adoptions, adoptPet } = useAdoptions();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isAdopted, setIsAdopted] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPetDetail(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (pet) {
      // setImageUrl(getImageUrlByBreed(pet.species?.name, pet.breed));
      setImageUrl("@/assets/img/pets.jpg");
      setPrice(pet.price?.toLocaleString("id-ID") || "0");
      setStatus(getStatus());
    }
  }, [pet]);

  useEffect(() => {
    if (adoptions.some((adopt) => adopt.petId === pet?.petId)) {
      setIsAdopted(true);
    }
  }, [adoptions, pet]);

  const handleAdoption = () => {
    if (!pet || !pet.status || pet.status.toLowerCase() !== "available") return;

    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    adoptPet(loggedInUser.userId, pet.owner.userId, pet.petId);
    setIsAdopted(true);
  };

  const getStatus = () => {
    if (!pet?.status) return "Unknown";
    return (
      pet.status.charAt(0).toUpperCase() + pet.status.slice(1).toLowerCase()
    );
  };

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

  if (error || !pet || Object.keys(pet).length === 0) {
    return (
      <NormalContent>
        <PageNotFound
          image_url={require("@/assets/img/page-not-found.png")}
          message=""
        />
      </NormalContent>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <NormalContent>
        <View style={styles.container}>
          {/* Pet Information */}
          <ItemDetailCard
            itemType="pet"
            imageUrl={imageUrl}
            status={status}
            price={price}
            isAdopted={isAdopted}
            onClick={handleAdoption}
          />

          {isLoggedIn &&
            loggedInUser?.role?.name?.toLowerCase() === "adopter" && (
              <ContactPersonCard itemType="pet" data={pet?.owner} />
            )}
        </View>

        <MessageModal
          title="Pet Adoption"
          message="Pet has been reserved successfully."
        />
      </NormalContent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 16,
    marginHorizontal: "auto",
  },
});

export default PetDetail;
