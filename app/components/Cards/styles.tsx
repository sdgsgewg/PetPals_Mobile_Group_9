import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const getButtonWidth = () => {
  if (screenWidth < 640) {
    // Tailwind sm: <640px
    return "100%";
  } else if (screenWidth < 768) {
    // Tailwind md: <768px
    return "75%";
  } else {
    // Tailwind lg and up
    return "50%";
  }
};

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
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
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
    width: getButtonWidth(),
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    cursor: "pointer",
  },
  adoptedButton: {
    backgroundColor: "#22c55e",
    width: getButtonWidth(),
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
    width: getButtonWidth(),
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    cursor: "not-allowed",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default styles;
