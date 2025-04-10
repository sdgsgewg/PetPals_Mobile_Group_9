import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionList from "@/app/components/Transactions/TransactionList";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const ServiceTransactionRequest = () => {
  const { loggedInUser } = useUsers();
  const { fetchServiceTransactionRequest, error } = useTransactions();

  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "adopter") {
      router.push("/transactions");
    } else if (role === "owner") {
      router.push("/transactions/owner");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "provider") {
      fetchServiceTransactionRequest(loggedInUser.userId);
    }
  }, [loggedInUser]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction Request</Text>
      </View>
      <TransactionList transactionType="serviceReq" />
    </NormalContent>
  );
};

export default ServiceTransactionRequest;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});
