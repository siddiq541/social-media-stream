'use client';

import React, { useState, useEffect } from 'react';
import PostForm from '../../components/PostForm/PostForm';
import { getAllPosts } from '../../lib/posts';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  // Load initial posts on component mount
  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  // Handle new post submission
  const handlePostSubmit = async (newPost) => {
    // Add the new post to the beginning of the posts array
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Social Media Feed</h1>
        
        {/* Post Form */}
        <PostForm onPostSubmit={handlePostSubmit} />
        
        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                {/* Post Header */}
                <div className="flex items-center mb-4">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full mr-3 bg-gray-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDlDMTEuNjU2OSA5IDEzIDcuNjU2ODUgMTMgNkMxMyA0LjM0MzE1IDExLjY1NjkgMyAxMCAzQzguMzQzMTUgMyA3IDQuMzQzMTUgNyA2QzcgNy42NTY4NSA4LjM0MzE1IDkgMTAgOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNiAxNkMxNiAxMy43OTA5IDEzLjMxMzcgMTIgMTAgMTJDNi42ODYyOSAxMiA0IDEzLjc5MDkgNCAxNkM0IDE2LjU1MjMgNC40NDc3MiAxNyA1IDE3SDlDOS41NTIyOCAxNyAxMCAxNi41NTIzIDEwIDE2QzEwIDE1LjQ0NzcgMTAuNDQ3NyAxNSAxMSAxNUgxNUMxNS41NTIzIDE1IDE2IDE1LjQ0NzcgMTYgMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{post.author.name}</h4>
                    <p className="text-gray-500 text-sm">{post.author.username} • {formatTimestamp(post.timestamp)}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-4">
                    <img 
                      src={post.image} 
                      alt="Post image"
                      className="w-full rounded-lg max-h-96 object-cover bg-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center space-x-6 text-gray-500 text-sm">
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-purple-500 transition-colors">
                    <span>🔄</span>
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;