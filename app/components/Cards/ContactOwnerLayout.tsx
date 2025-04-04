import React from "react";
import { View } from "react-native";
import styles from "./styles";

const ContactOwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.contactCard}>{children}</View>;
};

export default ContactOwnerLayout;
