"use client";

import { useState, useEffect, useMemo } from "react";
import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import { Users } from "@/lib/users";
import { SamplePosts } from "@/lib/posts";
import { useUser } from "@/context/UserContext";

export default function UserFeedPage() {
  const [posts, setPosts] = useState([]);
  const { currentUser, switchUser } = useUser();

  // Load posts from localStorage or sample posts
  useEffect(() => {
    // Load posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    if (storedPosts.length === 0) {
      // If no posts, only show posts from SamplePosts that match currentUser
      const initialPosts = SamplePosts.filter(
        (p) => p.userId === currentUser.id
      );
      setPosts(initialPosts);
    } else {
      setPosts(storedPosts);
    }
  }, [currentUser]); // re-run when currentUser changes

  // const userPosts = useMemo(() => {
  //   return posts.filter((p) => p.userId === currentUser.id);
  // }, [posts, currentUser]);
  const userPosts = posts.filter((p) => p.userId === currentUser.id);

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

  const handleUpdateComments = (postId, updatedComments) => {
    const updatedPosts = posts.map((p) =>
      p.id === postId ? { ...p, comments: updatedComments } : p
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Social Media Feed
          </h1>
          <p className="my-4 text-gray-600">Add posts here.</p>

          {/* POST FORM */}
          <PostForm
            currentUser={currentUser}
            onPostSubmit={handlePostSubmit}
            onSwitchUser={switchUser}
          />
        </div>

        <div className="space-y-4">
          {/* FEED */}
          {userPosts.length > 0 ? (
            <Feed posts={userPosts} onDelete={handleDeletePost} />
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No posts available for {currentUser.name}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
