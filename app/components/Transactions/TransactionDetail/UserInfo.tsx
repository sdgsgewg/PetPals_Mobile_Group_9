import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useServices } from "@/app/context/services/ServicesContext";
import IPet from "@/app/interface/pet/IPet";
import IService from "@/app/interface/service/IService";
import IUser from "@/app/interface/user/IUser";

interface UserInfoProps {
  user: IUser;
  item: IPet | IService;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, item }) => {
  const { isIService } = useServices();

  const getAddress = () => {
    if (user?.role?.name?.toLowerCase() === "provider" && isIService(item)) {
      return item?.address;
    }
    return `${user?.address}, ${user?.city}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{user?.role?.name} Information</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{user?.name}</Text>
        <Text style={styles.text}>{getAddress()}</Text>
        <Text style={styles.text}>{user?.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  header: {
    backgroundColor: "#E2E8F0", // slate-200
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: "bold",
    color: "#0F172A", // slate-900
  },
  content: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 14,
    color: "#1E293B", // slate-800
    marginBottom: 4,
  },
});

export default UserInfo;
