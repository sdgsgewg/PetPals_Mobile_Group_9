import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGlobal } from "@/app/context/GlobalContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useAdoptions } from "@/app/context/adoptions/AdoptionsContext";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import Loading from "@/app/loading";
import PageNotFound from "@/app/components/PageNotFound";
import ItemDetailCard from "@/app/components/Cards/ItemDetailCard";
import ContactPersonCard from "@/app/components/Cards/ContactPersonCard";
import MessageModal from "@/app/components/modals/MessageModal";

const PetDetail = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { getImageUrlByBreed, formattedPrice } = useGlobal();
  const { isLoggedIn, loggedInUser } = useUsers();
  const { pet, fetchPetDetail, loading, error } = usePets();
  const { adoptions, adoptPet } = useAdoptions();

  const [imageUrl, setImageUrl] = useState<ImageSourcePropType | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isAdopted, setIsAdopted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchPetDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (!pet) return;
    setImageUrl(
      getImageUrlByBreed(pet?.species?.name, pet?.breed) ??
        require("@/assets/img/pets.jpg")
    );
    setPrice(formattedPrice(pet.price));
    setStatus(getStatus());
  }, [pet]);

  useEffect(() => {
    if (pet && adoptions.some((adopt) => adopt.petId === pet.petId)) {
      setIsAdopted(true);
    }
  }, [adoptions, pet]);

  const handleAdoption = () => {
    if (!pet || !pet.status || pet?.status?.toLowerCase() !== "available")
      return;

    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    adoptPet(loggedInUser.userId, pet?.owner?.userId, pet.petId);
    setIsAdopted(true);
  };

  const getStatus = () => {
    if (!pet?.status) return "Unknown";
    return (
      pet.status.charAt(0).toUpperCase() + pet.status.slice(1).toLowerCase()
    );
  };

  if (error) {
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
    width: "90%",
    padding: 16,
    alignSelf: "center",
  },
});

export default PetDetail;
