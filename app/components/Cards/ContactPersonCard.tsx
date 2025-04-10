import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IUser from "@/app/interface/user/IUser";
import styles from "./styles";

interface ContactPersonCardProps {
  itemType: string;
  data: IUser;
}

const ContactPersonCard: React.FC<ContactPersonCardProps> = ({
  itemType,
  data,
}) => {
  const isPet = itemType === "pet";

  const handleWhatsApp = () => {
    const phoneNumber = data?.phone?.replace(/\D/g, "");
    if (phoneNumber) {
      Linking.openURL(`https://wa.me/${phoneNumber}`);
    }
  };

  return (
    <View style={styles.contactCard}>
      <Text style={styles.title}>{data?.name}</Text>
      <Text style={styles.text}>Phone Number: {data?.phone}</Text>
      {isPet && (
        <>
          <Text style={styles.text}>Address: {data?.address}</Text>
          <Text style={styles.text}>City: {data?.city}</Text>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
        <FontAwesome name="whatsapp" size={24} color="white" />
        <Text style={styles.buttonText}>
          Contact {isPet ? "Owner" : "Provider"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactPersonCard;
