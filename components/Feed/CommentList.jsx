"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";
import { useUser } from "@/context/UserContext";

const CommentList = ({ comments, setComments, postId }) => {
  const { currentUser } = useUser();
  const [desc, setDesc] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const emojiRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];

  useClickOutside(emojiRef, () => setShowEmojis(false));
  useClickOutside(menuRef, () => setMenuOpen(null));

  const saveCommentsToStorage = (updatedComments) => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = storedPosts.map((p) =>
      p.id === postId ? { ...p, comments: updatedComments } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!desc.trim() || !currentUser) return;

    const newComment = {
      id: Date.now(),
      desc: desc.trim(),
      likes: [], // always an array
      user: currentUser,
    };

    const updatedComments = [
      newComment,
      ...(comments || []).map((c) => ({
        ...c,
        likes: c.likes || [], // normalize old comments
      })),
    ];

    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);
    setDesc("");
  };

  const deleteComment = (id) => {
    const updatedComments = (comments || []).filter((c) => c.id !== id);
    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);
  };

  const toggleCommentLike = (commentId) => {
    if (!currentUser) return;

    const updatedComments = (comments || []).map((c) => {
      const likesArray = c.likes || []; // ensure array
      if (c.id === commentId) {
        const isLiked = likesArray.includes(currentUser.id);
        const newLikes = isLiked
          ? likesArray.filter((id) => id !== currentUser.id)
          : [...likesArray, currentUser.id];
        return { ...c, likes: newLikes };
      }
      return { ...c, likes: likesArray }; // normalize
    });

    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) addComment(e);
  };

  return (
    <div className="mt-4">
      {/* WRITE COMMENT */}
      {currentUser && (
        <div className="relative flex items-center gap-4 mb-4">
          <Image
            src={currentUser.avatar || "/img/profile.png"}
            alt={currentUser.name || "User avatar"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <div className="relative flex-1">
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 text-sm outline-none bg-slate-100 rounded-xl"
            />
            <Image
              src="/img/emoji.png"
              alt="Emoji"
              width={20}
              height={20}
              onClick={() => setShowEmojis(!showEmojis)}
              className="absolute w-5 h-5 -translate-y-1/2 cursor-pointer right-2 top-1/2"
            />
            {showEmojis && (
              <div
                ref={emojiRef}
                className="absolute right-0 z-10 flex gap-2 p-2 mb-2 bg-white border shadow-md bottom-full rounded-xl"
              >
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setDesc((prev) => prev + emoji)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMMENTS */}
      {(comments || []).length === 0 ? (
        <p className="text-sm italic text-gray-400">No comments yet.</p>
      ) : (
        (comments || []).map((comment) => (
          <div key={comment.id} className="relative flex gap-4 mt-4">
            <Image
              src={comment.user.avatar || "/img/profile.png"}
              alt={comment.user.name || "User avatar"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-medium">
                {comment.user.name || comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <button
                  onClick={() => toggleCommentLike(comment.id)}
                  className="flex items-center gap-1"
                >
                  <Image
                    src={
                      (comment.likes || []).includes(currentUser?.id)
                        ? "/img/liked.png"
                        : "/img/like.png"
                    }
                    width={12}
                    height={12}
                    alt=""
                    className="w-4 h-4"
                  />
                  <span>{(comment.likes || []).length}</span>
                </button>
                <span>Reply</span>
              </div>
            </div>
            {currentUser?.id === comment.user.id && (
              <div className="relative" ref={menuRef}>
                <Image
                  src="/img/more.png"
                  alt="More"
                  width={16}
                  height={16}
                  className="w-4 h-4 cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === comment.id ? null : comment.id)
                  }
                />
                {menuOpen === comment.id && (
                  <div className="absolute right-0 z-10 w-20 overflow-hidden bg-white rounded-md shadow-lg">
                    <button
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 focus:outline-none"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
