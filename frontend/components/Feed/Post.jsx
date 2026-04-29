"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";
import PostInteraction from "@/components/Feed/PostInteraction";
import CommentList from "@/components/Feed/CommentList";

const Post = ({ post, onDelete, onToggleLike }) => {
  const { user, token } = useAuth();
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setShowMenu(false));

  if (!post) return null;

  const postUser = post.author;

  const requireAuth = (callback) => {
    if (!token) {
      router.push("/login");
      return;
    }

    callback();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={postUser?.avatar || "/img/noAvatar.png"}
            alt={postUser?.name || "User avatar"}
            width={40}
            height={40}
            className="object-cover w-10 h-10 rounded-full"
          />

          <span className="font-medium">
            {postUser?.name || postUser?.username || "Unknown User"}
          </span>
        </div>

        {user?.id === post.author?.id && (
          <div className="relative" ref={menuRef}>
            <Image
              src="/img/more.png"
              alt="More"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => setShowMenu((prev) => !prev)}
            />

            {showMenu && (
              <div className="absolute right-0 z-10 w-24 overflow-hidden bg-white rounded-md shadow-lg">
                <button
                  type="button"
                  onClick={() => onDelete(post.id)}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-4">
        {post.image && (
          <div className="relative w-full min-h-96">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}

        <p>{post.description}</p>
      </div>

      {/* INTERACTIONS */}
      <PostInteraction
        postId={post.id}
        likes={post.likes || []}
        commentNumber={post.comments?.length || 0}
        onToggleLike={() => requireAuth(() => onToggleLike(post.id))}
      />

      {/* COMMENTS */}
      <CommentList postId={post.id} comments={post.comments || []} />
    </div>
  );
};

export default Post;
