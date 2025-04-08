import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IForumPost } from "@/app/interface/forum/IForumPost";
import { useRouter } from "expo-router";

interface PostCardProps {
  post: IForumPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const goToPostDetail = (slug: string) => {
    router.push({
      pathname: "/forums/[slug]",
      params: { slug },
    });
  };

  return (
    <TouchableOpacity onPress={() => goToPostDetail(post.slug)} style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.details}>
        Oleh {post.user.name} • {formatDate(post.createdAt)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  details: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});

export default PostCard;
