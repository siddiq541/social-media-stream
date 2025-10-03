'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../../components/PostForm/PostForm';

export default function AddPost() {
  const router = useRouter();

  const handlePostSubmit = (newPost) => {
    // In a real app, you would save this to a database
    console.log('New post created:', newPost);
    
    // Show success message
    alert('Post created successfully!');
    
    // Redirect to home page or feed
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-2">Share your thoughts with the community</p>
        </div>

        <PostForm onPostSubmit={handlePostSubmit} />

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            ← Back to Feed
          </button>
        </div>
      </div>
    </div>
  );
}