"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";

const CommentList = ({ comments = [], postId }) => {
  const { user } = useAuth();
  const { addComment, removeComment } = usePosts();

  const [desc, setDesc] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const emojiRef = useRef(null);
  const menuRef = useRef(null);

  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];

  useClickOutside(emojiRef, () => setShowEmojis(false));
  useClickOutside(menuRef, () => setMenuOpen(null));

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!desc.trim() || !user) return;

    await addComment(postId, desc.trim());
    setDesc("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleAddComment(e);
    }
  };

  return (
    <div className="mt-4">
      {user && (
        <form
          onSubmit={handleAddComment}
          className="relative flex items-center gap-4 mb-4"
        >
          <Image
            src={user.avatar || "/img/noAvatar.png"}
            alt={user.name || "User avatar"}
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
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm italic text-gray-400">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="relative flex gap-4 mt-4">
            <Image
              src={comment.user?.avatar || "/img/noAvatar.png"}
              alt={comment.user?.name || "User avatar"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex flex-col flex-1 gap-1">
              <span className="font-medium">
                {comment.user?.name || comment.user?.username || "Unknown User"}
              </span>

              <p>{comment.description}</p>

              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <span>Reply</span>
              </div>
            </div>

            {user?.id === comment.user?.id && (
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
                      type="button"
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                      onClick={() => removeComment(postId, comment.id)}
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
