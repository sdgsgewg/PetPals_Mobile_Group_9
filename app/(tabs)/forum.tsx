import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import PostFilter from "@/app/components/Forums/PostFilter";
import PostList from "@/app/components/Forums/PostList";
import PageNotFound from "@/app/components/PageNotFound";
import { useRouter } from "expo-router";
import NormalContent from "../components/ContentTemplate/NormalContent";

const ForumScreen = () => {
  const router = useRouter();
  const { isLoggedIn } = useUsers();
  const { forumCategoryId, fetchForumCategories, fetchForumPosts, error } =
    useForums();

  useEffect(() => {
    fetchForumCategories();
    fetchForumPosts();
  }, []);

  useEffect(() => {
    fetchForumPosts();
  }, [forumCategoryId]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  const handleCreatePost = () => {
    isLoggedIn ? router.push("/forums/new") : router.push("/auth/login");
  };

  return (
    <NormalContent>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Forum PetPals</Text>
          <TouchableOpacity onPress={handleCreatePost} style={styles.button}>
            <Text style={styles.buttonText}>Buat Postingan</Text>
          </TouchableOpacity>
        </View>

        <PostFilter />
        <PostList />
      </ScrollView>
    </NormalContent>
  );
};

export default ForumScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
