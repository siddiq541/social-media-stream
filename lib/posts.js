// Sample posts data for the social media stream
export const posts = [
  {
    id: 1,
    author: {
      name: "Emma Wilson",
      username: "@emmawilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    content: "Starting my day with a beautiful sunrise and a cup of coffee. There's something magical about the golden hour that fills me with gratitude and energy for the day ahead! ☀️☕ #morningvibes #gratitude #sunrise",
    timestamp: "2025-10-02T06:30:00Z",
    likes: 124,
    comments: 18,
    shares: 9,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    author: {
      name: "Marcus Chen",
      username: "@marcusc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    content: "Just deployed my latest React application! The feeling of seeing your code come to life never gets old. Excited to share this project with the community. Built with passion and lots of coffee! 💻🚀 #coding #react #webdev #deployment",
    timestamp: "2025-10-02T09:45:00Z",
    likes: 89,
    comments: 23,
    shares: 15,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    author: {
      name: "Sofia Rodriguez",
      username: "@sofiar",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    content: "Weekend adventure in the mountains! Nothing beats the fresh air, stunning views, and the challenge of reaching the summit. Nature is the best therapy. 🏔️ #hiking #adventure #nature #mountains #weekendvibes",
    timestamp: "2025-10-01T14:20:00Z",
    likes: 156,
    comments: 31,
    shares: 22,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    author: {
      name: "David Thompson",
      username: "@davidthompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    content: "Experimenting with street photography today. Captured some amazing moments in the city. Every corner tells a story, every face has a tale. The urban landscape is full of inspiration! 📸 #photography #streetphotography #urban #citylife",
    timestamp: "2025-10-01T16:15:00Z",
    likes: 203,
    comments: 42,
    shares: 28,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    author: {
      name: "Luna Martinez",
      username: "@lunamartinez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    content: "Spent the afternoon reading in my favorite bookstore café. There's something so peaceful about being surrounded by stories and the gentle hum of coffee conversations. 📚☕ #reading #books #bookstore #peaceful #literature",
    timestamp: "2025-10-01T17:30:00Z",
    likes: 178,
    comments: 36,
    shares: 19,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
  }
];

// Helper function to get all posts
export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Helper function to get a post by ID
export const getPostById = (id) => {
  return posts.find(post => post.id === parseInt(id));
};

// Helper function to get posts by author
export const getPostsByAuthor = (username) => {
  return posts.filter(post => post.author.username === username);
};

// Helper function to add a new post (for client-side state management)
export const addNewPost = (newPost) => {
  const postWithId = {
    ...newPost,
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    timestamp: newPost.timestamp || new Date().toISOString()
  };
  
  posts.unshift(postWithId);
  return postWithId;
};

// Helper function to generate a new post template
export const createPostTemplate = (content, author = null) => {
  return {
    id: Date.now(),
    author: author || {
      name: "Current User",
      username: "@currentuser",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    },
    content: content,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    image: null
  };
};