"use client";

import { useState, useEffect } from "react";
import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import { getAllPosts, addNewPost } from "@/lib/posts";
import { Users } from "@/lib/users";
import { SamplePosts } from "@/lib/posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(Users[0]); // default user

  // Load initial posts

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(SamplePosts); // fallback sample posts
    }
  }, []);

  const handlePostSubmit = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // persist
  };
  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };
  const handleSwitchUser = () => {
    const currentIndex = Users.findIndex(
      (u) => u.username === currentUser.username
    );
    const nextUser = Users[(currentIndex + 1) % Users.length];
    setCurrentUser(nextUser);
  };

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden"></div>
      <div className="w-full lg:[70%] xl:[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {/* Post Form */}
            <PostForm
              currentUser={currentUser}
              onPostSubmit={handlePostSubmit}
              onSwitchUser={handleSwitchUser}
            />
            {/* Feed */}
            {posts.length > 0 ? (
              <Feed posts={posts} onDelete={handleDeletePost} />
            ) : (
              <p className="py-8 text-center text-gray-500">
                No posts available. Create your first post!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="hidden"></div>
    </div>
  );
}

// <div className="container max-w-2xl px-4 py-8 mx-auto">
//   {/* Header */}
//   <div className="mb-8 text-center">
//     <h1 className="mb-2 text-3xl font-bold text-gray-900">
//       Social Media Stream
//     </h1>
//     <p className="text-gray-600">
//       Share your thoughts and see what others are posting!
//     </p>
//   </div>

//   {/* Post Form */}
//   <PostForm onPostSubmit={handlePostSubmit} />

//   {/* Posts Feed */}
//   <div className="mt-6 space-y-4">
//     {posts.length > 0 ? (
//       posts.map((post) => <SocialCard key={post.id} post={post} />)
//     ) : (
//       <div className="py-8 text-center">
//         <p className="text-gray-500">
//           No posts yet. Be the first to share something!
//         </p>
//       </div>
//     )}
//   </div>
// </div>
