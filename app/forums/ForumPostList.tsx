
import { useForumContext } from '../context/forums/ForumsContext';
const ForumPostList = () => {
  const { forumPosts } = useForumContext(); // Access forumPosts from context

  return (
    <div>
      <h1>Forum Posts</h1>
      {forumPosts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        forumPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {/* Render comments if necessary */}
            {post.comments.length > 0 && (
              <div>
                <h3>Comments</h3>
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ForumPostList;
