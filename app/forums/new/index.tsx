import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import InputField from "../../components/FormField/InputField";
import SelectField from "../../components/FormField/SelectField";
import TextareaField from "../../components/FormField/TextAreaField";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";

const NewForumPost = () => {
  const { loggedInUser } = useUsers();
  const {
    forumCategories,
    newForumPost,
    newForumPostErrorMessage,
    fetchForumCategories,
    setNewPost,
    resetNewPost,
    addForumPost,
  } = useForums();

  useEffect(() => {
    resetNewPost();
    fetchForumCategories();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newForumPost.userId !== loggedInUser.userId) {
      setNewPost("userId", loggedInUser.userId);
    }
  }, [loggedInUser?.userId]);

  const handleInputChange = (name: string, value: number | string) => {
    const newValue = ["forumCategoryId"].includes(name) ? Number(value) : value;
    setNewPost(name, newValue);
  };

  const handleSubmit = () => {
    addForumPost();
  };

  return (
    <NormalContent>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Buat Postingan Baru</Text>

        {/* Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Title"
          value={newForumPost.title}
          onChange={handleInputChange}
          error={newForumPostErrorMessage.Title}
        />

        {/* Kategori */}
        <SelectField
          label="Forum Category"
          name="forumCategoryId"
          value={newForumPost.forumCategoryId}
          onChange={handleInputChange}
          options={forumCategories}
          error={newForumPostErrorMessage.ForumCategoryId}
        />

        {/* Content */}
        <TextareaField
          label="Content"
          name="content"
          placeholder="Content"
          value={newForumPost.content}
          onChange={handleInputChange}
          error={newForumPostErrorMessage.Content}
        />

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      <MessageModal title="Add New Post" message="New Post has been made" />
    </NormalContent>
  );
};

export default NewForumPost;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F2937",
  },
  submitButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
