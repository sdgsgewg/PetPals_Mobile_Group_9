// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Correct import
// import { useForumContext } from '../context/forums/ForumsContext';

// const CreateForumPost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const { createForumPost } = useForumContext(); // Ensure we're using the context hook
//   const navigate = useNavigate();  // Correct usage of useNavigate

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     createForumPost({ title, content });
//     navigate('/forum'); // Correct use of navigate from react-router-dom
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Content:
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Create Post</button>
//     </form>
//   );
// };

// export default CreateForumPost;
