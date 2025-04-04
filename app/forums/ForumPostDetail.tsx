// Correct import
import { useRouter } from "expo-router";
import { useForumContext } from "../context/forums/ForumsContext";
const ForumPostDetail = () => {
  const router = useRouter();
  const { postId } = router.query; // Assuming you're using the post ID in the URL
  const { fetchForumPostById } = useForumContext(); // Use context hook
  const post = fetchForumPostById(postId as string);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Comments:</h2>
      {post.comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        post.comments.map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))
      )}
    </div>
  );
};

export default ForumPostDetail;
