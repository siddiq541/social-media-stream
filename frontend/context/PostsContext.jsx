"use client";
import { useAuth } from "@/context/AuthContext";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getPosts,
  createPost,
  deletePost as deletePostApi,
  toggleLike as toggleLikeApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "@/lib/api/postApi";

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState("");

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

  const toggleLike = async (postId) => {
    try {
      if (!user) {
        toast.error("Please login first");
        return;
      }

      const res = await toggleLikeApi(postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== postId) return post;

          const alreadyLiked = (post.likes || []).includes(user.id);

          return {
            ...post,
            likes: alreadyLiked
              ? (post.likes || []).filter((likeId) => likeId !== user.id)
              : [...(post.likes || []), user.id],
          };
        }),
      );

      return res;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update like");
    }
  };
  const addComment = async (postId, description) => {
    try {
      const newComment = await createCommentApi(description, postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [newComment, ...(post.comments || [])],
              }
            : post,
        ),
      );

      toast.success("Comment added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const removeComment = async (postId, commentId) => {
    try {
      await deleteCommentApi(commentId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: (post.comments || []).filter(
                  (comment) => comment.id !== commentId,
                ),
              }
            : post,
        ),
      );

      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        postsLoading,
        postsError,
        fetchPosts,
        addPost,
        deletePost,
        toggleLike,
        addComment,
        removeComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePosts must be used inside PostsProvider");
  }

  return context;
}
