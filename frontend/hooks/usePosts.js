"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getPosts,
  createPost,
  deletePost as deletePostApi,
  toggleLike as toggleLikeApi,
} from "@/lib/api/postApi";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState("");
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      setPostsError("");
      setPostsLoading(true);

      const data = await getPosts();

      setPosts(data.posts);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch posts";
      setPostsError(message);
      toast.error(message);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (postData) => {
    try {
      const response = await createPost(postData);

      const newPost = response.post || response.data || response;

      setPosts((prevPosts) => [newPost, ...prevPosts]);

      toast.success("Post added successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create post";
      toast.error(message);
    }
  };

  const deletePost = async (postId) => {
    try {
      await deletePostApi(postId);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      toast.success("Post deleted successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete post";
      toast.error(message);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const updatedPost = await toggleLikeApi(postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post)),
      );
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update like";
      toast.error(message);
    }
  };

  return {
    posts,
    postsLoading,
    postsError,
    fetchPosts,
    addPost,
    deletePost,
    toggleLike: handleToggleLike,
  };
}
// "use client";

// import { useState, useEffect } from "react";
// import { SamplePosts } from "@/lib/posts";
// import { toast } from "sonner";

// export function usePosts(currentUser) {
//   const [posts, setPosts] = useState([]);

//   // Load posts from localStorage or SamplePosts
//   useEffect(() => {
//     const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

//     if (storedPosts.length === 0) {
//       // If currentUser exists, filter SamplePosts for them
//       if (currentUser) {
//         const initialPosts = SamplePosts.filter(
//           (p) => p.userId === currentUser.id
//         );
//         setPosts(initialPosts);
//       } else {
//         setPosts(SamplePosts);
//       }
//       localStorage.setItem("posts", JSON.stringify(posts));
//     } else {
//       setPosts(storedPosts);
//     }
//   }, [currentUser]);

//   // Add new post
//   const addPost = (newPost) => {
//     const updatedPosts = [newPost, ...posts];
//     setPosts(updatedPosts);
//     localStorage.setItem("posts", JSON.stringify(updatedPosts));

//     toast.success("Post added successfully!");
//   };

//   // Delete post by id
//   const deletePost = (id) => {
//     const updatedPosts = posts.filter((p) => p.id !== id);
//     setPosts(updatedPosts);
//     localStorage.setItem("posts", JSON.stringify(updatedPosts));
//     toast.success("Post deleted successfully!");
//   };

//   // Update post completely (like edit)
//   const updatePost = (updatedPost) => {
//     const updatedPosts = posts.map((p) =>
//       p.id === updatedPost.id ? updatedPost : p
//     );
//     setPosts(updatedPosts);
//     localStorage.setItem("posts", JSON.stringify(updatedPosts));

//     toast.success("Post updated successfully!");
//   };

//   // Update only comments of a post
//   const updateComments = (postId, updatedComments) => {
//     const updatedPosts = posts.map((p) =>
//       p.id === postId ? { ...p, comments: updatedComments } : p
//     );
//     setPosts(updatedPosts);
//     localStorage.setItem("posts", JSON.stringify(updatedPosts));
//   };

//   return {
//     posts,
//     addPost,
//     deletePost,
//     updatePost,
//     updateComments,
//   };
// }
