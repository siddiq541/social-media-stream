"use client";
import Feed from "@/components/Feed/Feed";
import PostForm from "@/components/PostForm/PostForm";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserFeedPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="container py-8 mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">My Feed</h1>
            <p className="my-4 text-gray-600">Add posts here.</p>

            {/* POST FORM */}
            <PostForm />
          </div>

          <div className="space-y-4">
            {/* FEED */}

            <Feed onlyMine />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
