"use client";

import { useState, useEffect } from "react";
import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import { Users } from "@/lib/users";
import { SamplePosts } from "@/lib/posts";

export default function UserFeedPage() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(Users[0]);

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
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // save to localStorage
  };
  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    console.log("Post deleted:", id);
  };
  const handleSwitchUser = () => {
    const currentIndex = Users.findIndex(
      (u) => u.username === currentUser.username
    );
    const nextUser = Users[(currentIndex + 1) % Users.length];
    setCurrentUser(nextUser);
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
            onSwitchUser={handleSwitchUser}
          />
        </div>

        <div className="space-y-4">
          {/* Feed */}
          {posts.filter((p) => p.author.username === currentUser.username)
            .length > 0 ? (
            <Feed
              posts={posts.filter(
                (p) => p.author.username === currentUser.username
              )}
              onDelete={handleDeletePost}
            />
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
