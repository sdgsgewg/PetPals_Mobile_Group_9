import React from "react";
import { View } from "react-native";
import styles from "./styles";

const CardDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.detailCard}>{children}</View>;
};

export default CardDetailLayout;
