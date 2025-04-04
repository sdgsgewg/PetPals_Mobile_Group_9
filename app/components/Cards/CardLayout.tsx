import React from "react";
import { View } from "react-native";
import styles from "./styles";

const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.card}>{children}</View>;
};

export default CardLayout;
