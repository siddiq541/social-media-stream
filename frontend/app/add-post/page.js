"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm/PostForm";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddPost() {
  const router = useRouter();
  const { addPost } = usePosts();

  const handlePostSubmit = (newPost) => {
    addPost(newPost);
    router.push("/"); // redirect to feed or home
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen ">
        <div className="container px-4 py-8 mx-auto ">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Post
            </h1>
            <p className="mt-2 text-gray-600">
              Share your thoughts with the community
            </p>
          </div>

          <PostForm />

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-blue-500 underline hover:text-blue-700"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
