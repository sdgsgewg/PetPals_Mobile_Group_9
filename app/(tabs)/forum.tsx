import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ForumsContext } from '@/app/context/forums/ForumsContext';

// Define post type (You can move this to a separate types file if preferred)
type ForumPostType = {
  title: string;
  content: string;
};

const ForumScreen = () => {
  const forumContext = useContext(ForumsContext);

  if (!forumContext) {
    return <Text>Loading forum...</Text>;
  }

  const { forumPosts } = forumContext as { forumPosts: ForumPostType[] };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {forumPosts.map((post: ForumPostType, index: number) => (
        <View key={index} style={[styles.postCard, { width: screenWidth - 40 }]}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
});

export default ForumScreen;
