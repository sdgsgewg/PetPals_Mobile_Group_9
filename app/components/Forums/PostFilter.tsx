import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import Loading from "@/app/loading";

const PostFilter = () => {
  const {
    forumCategories,
    fetchForumCategories,
    setForumCategoryId,
    forumCategoryId,
    loading,
  } = useForums();

  useEffect(() => {
    fetchForumCategories();
  }, []);

  const getCategoryName = (categoryName: string) => {
    if (!categoryName) return "Unknown";
    return (
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              forumCategoryId === 0 && styles.selectedButton,
            ]}
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
              key={category.forumCategoryId}
              style={[
                styles.button,
                forumCategoryId === category.forumCategoryId &&
                  styles.selectedButton,
              ]}
              onPress={() => setForumCategoryId(category.forumCategoryId)}
            >
              <Text
                style={[
                  styles.buttonText,
                  forumCategoryId === category.forumCategoryId &&
                    styles.selectedButtonText,
                ]}
              >
                {getCategoryName(category.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#E5E7EB", // gray-200
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
    fontSize: 14,
    fontWeight: "600",
  },
  selectedButtonText: {
    color: "#FFFFFF", // white
  },
});

export default PostFilter;
