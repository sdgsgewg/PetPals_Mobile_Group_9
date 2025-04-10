import React, { useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { useRouter } from "expo-router";

const AddCommentForm = () => {
  const { isLoggedIn, loggedInUser } = useUsers();
  const {
    forumPost,
    newForumComment,
    fetchForumPostDetail,
    setNewComment,
    addForumComment,
  } = useForums();
  const router = useRouter();

  useEffect(() => {
    if (
      forumPost.forumPostId &&
      newForumComment.postId !== forumPost.forumPostId
    ) {
      setNewComment("postId", forumPost.forumPostId);
    }
    if (
      loggedInUser?.userId &&
      newForumComment.userId !== loggedInUser.userId
    ) {
      setNewComment("userId", loggedInUser.userId);
    }
  }, [forumPost.forumPostId, loggedInUser?.userId]);

  const handleAddComment = () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }

    if (!newForumComment.comment?.trim()) {
      Alert.alert("Peringatan", "Komentar tidak boleh kosong");
      return;
    }

    addForumComment();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambahkan Komentar</Text>

      <TextInput
        style={styles.textarea}
        multiline
        numberOfLines={4}
        placeholder="Tulis komentar..."
        placeholderTextColor="#888"
        value={newForumComment.comment}
        onChangeText={(value) => setNewComment("comment", value)}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Kirim" color="#2563eb" onPress={handleAddComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  buttonWrapper: {
    marginTop: 12,
  },
});

export default AddCommentForm;
