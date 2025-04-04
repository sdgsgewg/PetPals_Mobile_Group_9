import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import PostComments from "@/app/components/Forums/PostComments";
import AddCommentForm from "@/app/components/Forums/AddCommentForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import NormalContent from "../components/ContentTemplate/NormalContent";
import Loading from "../loading";
import PageNotFound from "../components/PageNotFound";

const ForumDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { forumPost, fetchForumPostDetail, loading, error } = useForums();

  useEffect(() => {
    if (!slug) return;
    fetchForumPostDetail(slug);
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  //   if (loading) {
  //     return (
  //       <NormalContent>
  //         <Loading />
  //       </NormalContent>
  //     );
  //   }

  if (error || !forumPost) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{forumPost.title}</Text>
          <Text style={styles.meta}>
            Oleh <Text style={styles.author}>{forumPost?.user?.name}</Text> •{" "}
            {formatDate(forumPost.createdAt)}
          </Text>

          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{forumPost.content}</Text>
          </View>

          <PostComments />
          <AddCommentForm />
        </View>
      </ScrollView>
    </NormalContent>
  );
};

export default ForumDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  meta: {
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 10,
  },
  author: {
    fontWeight: "600",
  },
  contentBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 16,
  },
  contentText: {
    color: "#374151",
    fontSize: 16,
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
