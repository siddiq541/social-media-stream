import { Users } from "./users";

// Each post now references a user by `userId` for filtering and comments
export const SamplePosts = [
  {
    id: 1,
    userId: 1,
    author: Users.find((u) => u.id === 1) || { id: 1, name: "Alice" },
    content:
      "Starting my day with a beautiful sunrise and a cup of coffee. ☀️☕ #morningvibes",
    timestamp: "2025-10-02T06:30:00Z",
    likes: [2, 3], // array of userIds who liked the post
    comments: [], // array of comment objects: {id, userId, content, timestamp}
    shares: 9,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    userId: 2,
    author: Users.find((u) => u.id === 2) || { id: 2, name: "Bob" },
    content: "Just deployed my latest React application! 💻🚀 #coding #react",
    timestamp: "2025-10-02T09:45:00Z",
    likes: [1, 3],
    comments: [],
    shares: 15,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    userId: 3,
    author: Users.find((u) => u.id === 3),
    content:
      "Weekend adventure in the mountains! 🏔️ #hiking #nature #weekendvibes",
    timestamp: "2025-10-01T14:20:00Z",
    likes: [1, 2, 4],
    comments: [],
    shares: 22,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    userId: 4,
    author: Users.find((u) => u.id === 4),
    content:
      "Experimenting with street photography today. 📸 #photography #urban",
    timestamp: "2025-10-01T16:15:00Z",
    likes: [1, 3],
    comments: [],
    shares: 28,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    userId: 5,
    author: Users.find((u) => u.id === 5),
    content:
      "Spent the afternoon reading in my favorite bookstore café. 📚☕ #reading #books",
    timestamp: "2025-10-01T17:30:00Z",
    likes: [2, 3],
    comments: [],
    shares: 19,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
  },
];

// Helper to get posts by userId
export const getPostsByUser = (userId) =>
  SamplePosts.filter((post) => post.userId === userId);

// Helper to add a new post
export const addNewPost = (post) => {
  const postWithId = {
    id: SamplePosts.length ? Math.max(...SamplePosts.map((p) => p.id)) + 1 : 1,
    likes: [],
    comments: [],
    shares: 0,
    timestamp: new Date().toISOString(),
    ...post,
  };
  return [postWithId, ...SamplePosts];
};

// Helper to add a comment
export const addCommentToPost = (postId, comment) => {
  const posts = SamplePosts.map((post) => {
    if (post.id === postId) {
      return { ...post, comments: [comment, ...post.comments] };
    }
    return post;
  });
  return posts;
};

// Helper function to get all posts
export const getAllPosts = () => {
  return SamplePosts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
};

// Helper function to get a post by ID
export const getPostById = (id) => {
  return SamplePosts.find((post) => post.id === parseInt(id));
};

// Helper function to get posts by author
export const getPostsByAuthor = (username) => {
  return SamplePosts.filter((post) => post.author.username === username);
};

// Helper function to generate a new post template
export const createPostTemplate = (content, author = null) => {
  return {
    id: Date.now(),
    author: author || {
      name: "Current User",
      username: "@currentuser",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    },
    content: content,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    image: null,
  };
};
