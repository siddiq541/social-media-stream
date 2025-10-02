'use client';

import { useState } from 'react';
import SocialCard from '../../components/SocialCard/SocialCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Feed</h1>
          <p className="text-gray-600 mt-2">Latest posts from the community</p>
        </div>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map(post => (
              <SocialCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts available. Create your first post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}