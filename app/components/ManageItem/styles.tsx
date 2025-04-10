import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // My Pet and My Service Table
  header: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 5,
    minWidth: 600,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 5,
    minWidth: 600,
  },
  cell: {
    paddingHorizontal: 5,
    textAlign: "left",
  },
  indexCell: {
    width: 40,
  },
  nameCell: {
    width: 120,
  },
  actionsCell: {
    width: 140,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actionButton: {
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  viewButton: {
    backgroundColor: "#3b82f6",
  },
  editButton: {
    backgroundColor: "#facc15",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },

  //   My Pet Table
  ageCell: {
    width: 150,
  },
  genderCell: {
    width: 100,
  },

  // My Service Table
  categoryCell: {
    width: 150,
  },
  priceCell: {
    width: 100,
  },
});

export default styles;
