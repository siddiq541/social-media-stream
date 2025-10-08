"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import AddPostButton from "./AddPostButton";
import useClickOutside from "@/hooks/useClickOutside";
const PostForm = ({ onPostSubmit, currentUser, onSwitchUser }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];

  const emojiRef = useRef(null);
  useClickOutside(emojiRef, () => setShowEmojis(false));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please enter some content for your post");
      return;
    }

    setIsSubmitting(true);

    // Create new post object
    const newPost = {
      id: Date.now(), // Simple ID generation
      author: currentUser, // use the passed current user
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [], // initialize as empty array
      shares: 0,
      image: null,
    };

    // Call the parent component's callback to add the post
    if (onPostSubmit) {
      onPostSubmit(newPost);
    }

    // Reset form
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-between gap-4 p-4 text-sm bg-white rounded-lg shadow-md md:mx-auto md:w-3/4 xl:w-[60%] xl:mx-auto">
      {/* AVATAR */}
      <Image
        src={currentUser?.avatar || "/img/profile.png"} // fallback in case avatar is missing
        alt={currentUser?.name || "User avatar"}
        width={48}
        height={48}
        onClick={onSwitchUser} // handler passed from page
        className="object-cover w-12 h-12 rounded-full cursor-pointer"
      />
      {/* POST */}
      <form onSubmit={handleSubmit} className="flex-1">
        {/* TEXT INPUT */}
        <div className="flex gap-4">
          <textarea
            name="desc"
            id=""
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-slate-100"
          ></textarea>
          <div className="relative">
            <Image
              src="/img/emoji.png"
              alt=""
              width={20}
              height={20}
              onClick={() => setShowEmojis(!showEmojis)}
              className="self-end w-5 h-5 cursor-pointer"
            />
            {showEmojis && (
              <div
                ref={emojiRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 z-10 flex gap-2 p-2 mb-2 bg-white border bottom-full rounded-xl shadow-l"
              >
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setContent((prev) => prev + emoji);
                    }}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <AddPostButton />
        </div>
        {/* POST OPTIONS */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/addImage.png" alt="" width={20} height={20} />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/addEvent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </form>
    </div>
  );
};

// <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
//   <h2 className="mb-4 text-xl font-bold text-gray-800">Create a New Post</h2>

//   <form onSubmit={handleSubmit}>
//     <div className="mb-4">
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="What's on your mind?"
//         className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         rows="4"
//         maxLength="500"
//       />
//       <div className="mt-1 text-sm text-right text-gray-500">
//         {content.length}/500 characters
//       </div>
//     </div>

//     <div className="flex items-center justify-between">
//       <div className="text-sm text-gray-500">
//         Share your thoughts with the community
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting || !content.trim()}
//         className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//           isSubmitting || !content.trim()
//             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             : 'bg-blue-500 text-white hover:bg-blue-600'
//         }`}
//       >
//         {isSubmitting ? 'Posting...' : 'Post'}
//       </button>
//     </div>
//   </form>
// </div>
export default PostForm;
