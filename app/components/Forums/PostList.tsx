import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import Loading from "../Loading";
import ItemNotFound from "../ItemNotFound";
import PostCard from "./PostCard";

const PostList = () => {
  const { forumPosts, loading } = useForums();

  if (loading) return <Loading />;

  return (
    <View style={styles.cardContainer}>
      {forumPosts.length > 0 ? (
        <FlatList
          data={forumPosts}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={styles.list}
          bounces={false}
        />
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          size={200}
          message="Post Not Found"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 420,
    minHeight: 420,
    maxHeight: 420,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  list: {
    gap: 8,
  },
});

export default PostList;
