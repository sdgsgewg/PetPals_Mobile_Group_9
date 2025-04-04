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
  const { forumCategories, fetchForumCategories, setForumCategoryId, loading } =
    useForums();

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
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => setForumCategoryId(0)}
          >
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          {forumCategories.map((category) => (
            <TouchableOpacity
              key={category.forumCategoryId}
              style={styles.button}
              onPress={() => setForumCategoryId(category.forumCategoryId)}
            >
              <Text style={styles.buttonText}>
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
  buttonText: {
    color: "#111827", // gray-900
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PostFilter;
