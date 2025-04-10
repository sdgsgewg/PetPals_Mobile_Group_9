import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useForums } from "@/app/context/forums/ForumsContext";
import PostComments from "@/app/components/Forums/PostComments";
import AddCommentForm from "@/app/components/Forums/AddCommentForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import { Keyboard } from "react-native";
import { useState } from "react";

const ForumDetail = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const {
    forumPost,
    forumComments,
    fetchForumPostDetail,
    fetchForumPostComments,
    loading,
    error,
  } = useForums();

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
        <Text style={styles.title}>{forumPost.title}</Text>
        <Text style={styles.meta}>
          Oleh <Text style={styles.author}>{forumPost?.user?.name}</Text> •{" "}
          {formatDate(forumPost.createdAt)}
        </Text>

        <View style={styles.contentBox}>
          <Text style={styles.contentText}>{forumPost.content}</Text>
        </View>

        <AddCommentForm />
        <PostComments />
      </ScrollView>
    </NormalContent>
  );
};

export default ForumDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginBottom: 0,
  },
  contentText: {
    color: "#374151",
    fontSize: 16,
    lineHeight: 22,
  },
});
