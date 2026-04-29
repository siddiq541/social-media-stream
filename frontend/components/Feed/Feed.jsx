"use client";

import Post from "@/components/Feed/Post";
import { usePosts } from "@/context/PostsContext";
import { useAuth } from "@/context/AuthContext";

const Feed = ({ username, onlyMine = false }) => {
  const { posts, postsLoading, postsError, deletePost, toggleLike } =
    usePosts();

  const { user } = useAuth();

  if (postsLoading) {
    return <p className="py-8 text-center text-gray-500">Loading posts...</p>;
  }

  if (postsError) {
    return <p className="py-8 text-center text-red-500">{postsError}</p>;
  }

  // 🔥 unified filtering logic
  let filteredPosts = posts;

  if (username) {
    filteredPosts = posts.filter((post) => post.author?.username === username);
  } else if (onlyMine) {
    filteredPosts = posts.filter((post) => post.userId === user?.id);
  }

  return (
    <div className="flex flex-col w-full gap-12 p-4 bg-white rounded-lg shadow-md md:mx-auto">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={deletePost}
            onToggleLike={toggleLike}
          />
        ))
      ) : (
        <p className="py-8 text-center text-gray-500">No posts found!</p>
      )}
    </div>
  );
};

export default Feed;
