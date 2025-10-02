'use client';

import React, { useState } from 'react';

const PostForm = ({ onPostSubmit }) => {
  const [formData, setFormData] = useState({
    content: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert('Please enter some content for your post');
      return;
    }

    setIsSubmitting(true);

    // Create new post object
    const newPost = {
      id: Date.now(), // Simple ID generation
      author: {
        name: "Muhammad Siddiq", // Current user
        username: "@siddiq",
        avatar: "/avatars/siddiq.jpg"
      },
      content: formData.content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      image: formData.image.trim() || null
    };

    try {
      // Call the parent component's callback to add the post
      if (onPostSubmit) {
        await onPostSubmit(newPost);
      }

      // Reset form
      setFormData({
        content: '',
        image: ''
      });

      // Show success message
      alert('Post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Create a New Post</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Content textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            What's on your mind?
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Optional image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !formData.content.trim()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isSubmitting || !formData.content.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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