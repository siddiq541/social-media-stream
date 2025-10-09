// "use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";
import PostInteraction from "@/components/Feed/PostInteraction";
import CommentList from "@/components/Feed/CommentList";
import { useUser } from "@/context/UserContext";

const Post = ({ post, onDelete, onUpdatePost }) => {
  if (!post) return null;

  const { currentUser } = useUser();
  const [postData, setPostData] = useState(post);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  // Load the latest saved post from localStorage (if present)
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    // use == so string/number id mismatch won't break
    const stored = storedPosts.find((p) => p.id == post.id);
    if (stored) setPostData(stored);
    else setPostData(post);
  }, [post]);

  // Save any postData change to localStorage and notify parent
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const exists = storedPosts.some((p) => p.id == postData.id);
    let updated;
    if (exists) {
      updated = storedPosts.map((p) => (p.id == postData.id ? postData : p));
    } else {
      updated = [postData, ...storedPosts];
    }

    localStorage.setItem("posts", JSON.stringify(updated));

    // ✅ only call parent update if data really changed
    if (onUpdatePost) {
      const stored = storedPosts.find((p) => p.id == postData.id);
      const hasChanged = JSON.stringify(stored) !== JSON.stringify(postData);
      if (hasChanged) onUpdatePost(postData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  // Toggle like — owned by Post (single source of truth)
  const handleToggleLike = () => {
    if (!currentUser) return;
    const isLiked = (postData.likes || []).includes(currentUser.id);
    const newLikes = isLiked
      ? (postData.likes || []).filter((id) => id !== currentUser.id)
      : [...(postData.likes || []), currentUser.id];

    setPostData({ ...postData, likes: newLikes });
  };

  // Called by CommentList via props to update comments
  const handleUpdateComments = (updatedComments) => {
    setPostData({ ...postData, comments: updatedComments });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {postData.author && postData.author.avatar ? (
            <Image
              src={postData.author.avatar}
              alt={postData.author.name || "User avatar"}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          )}
          <span className="font-medium">
            {postData.author?.name || "Unknown User"}
          </span>
        </div>

        <div className="relative" ref={menuRef}>
          <Image
            src="/img/more.png"
            alt="More"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 z-10 w-20 overflow-hidden bg-white rounded-md shadow-lg ">
              <button
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 focus:outline-none"
                onClick={() => onDelete(postData.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-4">
        {postData.image && (
          <div className="relative w-full min-h-96">
            <Image
              src={postData.image}
              alt="Post image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p>{postData.content}</p>
      </div>

      {/* INTERACTION (presentational) */}
      <Suspense fallback="Loading...">
        <PostInteraction
          // pass the live likes/comments from postData
          postId={postData.id}
          likes={postData.likes || []}
          commentNumber={(postData.comments || []).length}
          onToggleLike={handleToggleLike} // <- important
        />
      </Suspense>

      {/* COMMENTS (presentational but calls back) */}
      <Suspense fallback="Loading...">
        <CommentList
          postId={postData.id}
          comments={postData.comments || []}
          // comment list should call this when comments change (add/delete/like)
          setComments={handleUpdateComments}
        />
      </Suspense>
    </div>
  );
};

export default Post;
