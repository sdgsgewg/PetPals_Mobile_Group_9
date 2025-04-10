import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useGlobal } from "@/app/context/GlobalContext";

const PostFilter = () => {
  const { getForumCategoryName } = useGlobal();
  const {
    forumCategories,
    fetchForumCategories,
    setForumCategoryId,
    forumCategoryId,
  } = useForums();

  useEffect(() => {
    fetchForumCategories();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingRight: 20 }}
    >
      <TouchableOpacity
        style={[styles.button, forumCategoryId === 0 && styles.selectedButton]}
        onPress={() => setForumCategoryId(0)}
      >
        <Text
          style={[
            styles.buttonText,
            forumCategoryId === 0 && styles.selectedButtonText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {forumCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.button,
            forumCategoryId === category.id && styles.selectedButton,
          ]}
          onPress={() => setForumCategoryId(category.id)}
        >
          <Text
            style={[
              styles.buttonText,
              forumCategoryId === category.id && styles.selectedButtonText,
            ]}
          >
            {getForumCategoryName(category.name)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    minHeight: 35,
    maxHeight: 35,
    flexDirection: "row",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#E5E7EB", // gray-200
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#2563EB", // blue-600
  },
  buttonText: {
    color: "#111827", // gray-900
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedButtonText: {
    color: "#FFFFFF", // white
  },
});

export default PostFilter;
