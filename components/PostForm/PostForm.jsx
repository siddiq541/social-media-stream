'use client';

import { useState } from 'react';

const PostForm = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Please enter some content for your post');
      return;
    }

    setIsSubmitting(true);

    // Create new post object
    const newPost = {
      id: Date.now(), // Simple ID generation
      author: {
        name: "Current User",
        username: "@currentuser",
        avatar: "/avatars/default.jpg"
      },
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      image: null
    };

    // Call the parent component's callback to add the post
    if (onPostSubmit) {
      onPostSubmit(newPost);
    }

    // Reset form
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create a New Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            maxLength="500"
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {content.length}/500 characters
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Share your thoughts with the community
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isSubmitting || !content.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;