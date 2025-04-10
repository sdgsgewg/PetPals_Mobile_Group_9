import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";

const BookingDate: React.FC = () => {
  const { transaction } = useTransactions();

  const formattedDate = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Booking Date</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.dateText}>
          {formattedDate(transaction.bookingDate)}
        </Text>
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
    paddingVertical: 16,
  },
  dateText: {
    fontSize: 14,
    color: "#334155", // slate-700
  },
});

export default BookingDate;
