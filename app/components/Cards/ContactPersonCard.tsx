import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { IUser } from "@/app/interface/user/IUser";
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(`https://wa.me/${data?.phone}`)}
      >
        <FontAwesome name="whatsapp" size={24} color="white" />
        <Text style={styles.buttonText}>{`Contact ${
          isPet ? "Owner" : "Provider"
        }`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactPersonCard;
