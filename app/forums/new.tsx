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

const NewForumPost = () => {
  const { loggedInUser } = useUsers();
  const {
    forumCategories,
    newForumPost,
    fetchForumCategories,
    setNewPost,
    addForumPost,
  } = useForums();

  useEffect(() => {
    fetchForumCategories();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newForumPost.userId !== loggedInUser.userId) {
      setNewPost("userId", loggedInUser.userId);
    }
  }, [loggedInUser?.userId]);

  const handleInputChange = (name: string, value: string) => {
    setNewPost(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addForumPost();
    // Alert.alert("Berhasil", "Postingan baru berhasil dibuat.");
  };

  const getCategoryName = (categoryName: string) => {
    const modifiedCategory =
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1).toLowerCase();
    return modifiedCategory;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buat Postingan Baru</Text>

      {/* Judul */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Judul</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan judul..."
          value={newForumPost.title}
          onChangeText={(text) => handleInputChange("title", text)}
        />
      </View>

      {/* Kategori */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={newForumPost.forumCategoryId}
            onValueChange={(value) =>
              handleInputChange("forumCategoryId", Number(value))
            }
          >
        <Picker.Item label="Pilih kategori" value="" />
            {forumCategories.map((cat, index) => (
              <Picker.Item
                key={index}
                label={getCategoryName(cat.name)}
                value={cat.forumCategoryId}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Konten */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Konten</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Tulis isi postingan..."
          multiline
          numberOfLines={6}
          value={newForumPost.content}
          onChangeText={(text) => handleInputChange("content", text)}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={(e) => handleSubmit}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewForumPost;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F2937",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    color: "#111827",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
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
