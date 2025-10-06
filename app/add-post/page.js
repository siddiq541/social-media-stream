"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../../components/PostForm/PostForm";

export default function AddPost() {
  const router = useRouter();

  const handlePostSubmit = (newPost) => {
    // In a real app, you would save this to a database
    console.log("New post created:", newPost);

    // Show success message
    alert("Post created successfully!");

    // Redirect to home page or feed
    router.push("/");
  };

  return (
    <div className="min-h-screen ">
      <div className="container px-4 py-8 mx-auto ">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="mt-2 text-gray-600">
            Share your thoughts with the community
          </p>
        </div>

        <PostForm onPostSubmit={handlePostSubmit} />

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-blue-500 underline hover:text-blue-700"
          >
            ← Back to Feed
          </button>
        </div>
      </div>
    </div>
  );
}
