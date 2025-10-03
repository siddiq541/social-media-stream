'use client';

import { useState } from 'react';
import PostForm from '../components/PostForm/PostForm';
import SocialCard from '../components/SocialCard/SocialCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Function to handle new post submission
  const handlePostSubmit = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Stream</h1>
          <p className="text-gray-600">Share your thoughts and see what others are posting!</p>
        </div>

        {/* Post Form */}
        <PostForm onPostSubmit={handlePostSubmit} />

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map(post => (
              <SocialCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
