import React from "react";
import { View, StyleSheet } from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import Loading from "@/app/loading";
import ItemNotFound from "../ItemNotFound";
import PostCard from "./PostCard";

const PostList = () => {
  const { forumPosts, loading } = useForums();

  return (
    <>
      {loading ? (
        <Loading />
      ) : forumPosts.length > 0 ? (
        <View style={styles.cardContainer}>
          {forumPosts.map((post) => (
            <PostCard key={post.forumPostId} post={post} />
          ))}
        </View>
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          size={200}
          message="Post Not Found"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
});

export default PostList;
