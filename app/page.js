"use client";

import { useState, useEffect } from "react";
import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import { SamplePosts } from "@/lib/posts";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser, switchUser } = useUser();

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(SamplePosts);
      localStorage.setItem("posts", JSON.stringify(SamplePosts)); // ✅ save
    }
  }, []);

  const handlePostSubmit = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="flex flex-col gap-6 pt-6">
      <PostForm
        currentUser={currentUser}
        onPostSubmit={handlePostSubmit}
        onSwitchUser={switchUser}
      />
      {posts.length > 0 ? (
        <Feed
          posts={posts}
          onDelete={handleDeletePost}
          onUpdatePost={handleUpdatePost}
        />
      ) : (
        <p className="py-8 text-center text-gray-500">
          No posts available. Create your first post!
        </p>
      )}
    </div>
  );
}
