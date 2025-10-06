"use client";
import { useState, useEffect } from "react";
import { getAllPosts, addNewPost } from "@/lib/posts";
import PostForm from "@/components/PostForm/PostForm";
import SocialCard from "@/components/SocialCard/SocialCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Load initial posts
  useEffect(() => {
    const initialPosts = getAllPosts();
    setPosts(initialPosts);
  }, []);

  // Handle new post submission
  const handlePostSubmit = (newPost) => {
    const updatedPosts = addNewPost(newPost);
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-2xl px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Social Media Stream
          </h1>
          <p className="text-gray-600">
            Share your thoughts and see what others are posting!
          </p>
        </div>

        {/* Post Form */}
        <PostForm onPostSubmit={handlePostSubmit} />

        {/* Posts Feed */}
        <div className="mt-6 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <SocialCard key={post.id} post={post} />)
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                No posts yet. Be the first to share something!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
