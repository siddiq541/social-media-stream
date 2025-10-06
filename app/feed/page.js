"use client";

import { useState } from "react";
import SocialCard from "../../components/SocialCard/SocialCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-2xl px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Social Media Feed
          </h1>
          <p className="mt-2 text-gray-600">Latest posts from the community</p>
        </div>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <SocialCard key={post.id} post={post} />)
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                No posts available. Create your first post!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
