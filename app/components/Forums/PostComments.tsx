import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Loading from "@/app/loading";
import ItemNotFound from "../ItemNotFound";
import { useForums } from "@/app/context/forums/ForumsContext";

const PostComments = () => {
  const { forumPost, forumComments, fetchForumPostComments, loading } =
    useForums();

  useEffect(() => {
    if (forumPost) {
      fetchForumPostComments(forumPost.forumPostId);
    }
  }, [forumPost]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {forumComments.length > 0 ? (
        <>
          <Text style={styles.title}>Komentar ({forumComments.length})</Text>
          {forumComments.map((item) => (
            <View key={item.forumCommentId} style={styles.commentCard}>
              <Text style={styles.userName}>{item.user.name}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentDate}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.notFoundContainer}>
          <ItemNotFound
            image_url={require("@/assets/img/comment-not-found.png")}
            size={100}
            message="Comment Not Found"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentCard: {
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1F2937",
  },
  commentText: {
    fontSize: 14,
    color: "#4B5563",
    marginVertical: 4,
  },
  commentDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  notFoundContainer: {
    marginTop: 24,
    alignItems: "center",
  },
});

export default PostComments;
