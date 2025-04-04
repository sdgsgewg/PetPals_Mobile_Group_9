import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
  },
  detailCard: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.1,
    marginBottom: 10,
  },
  contactCard: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.1,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default styles;
