import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, Modal, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGlobal } from "@/app/context/GlobalContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import PageNotFound from "@/app/components/PageNotFound";
import ContactPersonCard from "@/app/components/Cards/ContactPersonCard";
import ItemDetailCard from "@/app/components/Cards/ItemDetailCard";
import BookServiceModal from "@/app/components/modals/BookServiceModal";
import MessageModal from "@/app/components/modals/MessageModal";
import NormalContent from "../components/ContentTemplate/NormalContent";

const ServiceDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  const { getImageUrlByServiceCategory } = useGlobal();
  const { isLoggedIn, loggedInUser } = useUsers();
  const { service, fetchServiceDetail, loading, error } = useServices();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);

  const handleOpenBookServiceModal = () => setIsBookServiceModalOpen(true);
  const handleCloseBookServiceModal = () => setIsBookServiceModalOpen(false);

  useEffect(() => {
    if (!slug) return;
    fetchServiceDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (service) {
      setImageUrl(getImageUrlByServiceCategory(service?.category?.name));
      setPrice(service.price?.toLocaleString("id-ID") || "0");
    }
  }, [service]);

  const handleBooking = () => {
    if (!service) return;

    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    setIsBookServiceModalOpen(true);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (error || !service || Object.keys(service).length === 0) {
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
    <View style={styles.container}>
      <ItemDetailCard
        itemType="service"
        imageUrl={imageUrl}
        price={price}
        onClick={handleBooking}
      />

      {loggedInUser.role.name.toLowerCase() === "adopter" && (
        <ContactPersonCard itemType="service" data={service?.provider} />
      )}

      {loggedInUser.role.name.toLowerCase() === "adopter" && (
        <BookServiceModal
          title="Book Service"
          message="Please input the booking date"
          isModalOpen={isBookServiceModalOpen}
          onClose={() => setIsBookServiceModalOpen(false)}
        />
      )}

      <MessageModal title="Book Service" message="Service has been booked" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ServiceDetail;
