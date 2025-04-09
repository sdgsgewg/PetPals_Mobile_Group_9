import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

const Forums = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useUsers();
  const { forumCategoryId, fetchForumCategories, fetchForumPosts, error } =
    useForums();

  const router = useRouter();

  useEffect(() => {
    fetchForumCategories();
    fetchForumPosts();
  }, []);

  useEffect(() => {
    fetchForumPosts();
  }, [forumCategoryId]);

  const handleClickCreatePost = () => {
    if (isLoggedIn) {
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  };

  if (error) {
    return <PageNotFound image_url="/img/page-not-found.png" message="" />;
  }

  return (
    <NormalContent>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Forum PetPals</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleClickCreatePost}
          >
            <Text style={styles.buttonText}>Buat Postingan</Text>
          </TouchableOpacity>
        </View>

        {/* Filter & List */}
        <PostFilter />
        <PostList />
      </ScrollView>
    </NormalContent>
  );
};

export default Forums;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
