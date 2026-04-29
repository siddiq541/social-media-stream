"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import AddPostButton from "@/components/PostForm/AddPostButton";
import useClickOutside from "@/hooks/useClickOutside";
import { useAuth } from "@/context/AuthContext";
import UploadPopover from "./UploadPopover";
import { toast } from "sonner";
import { usePosts } from "@/context/PostsContext";
const PostForm = () => {
  const { addPost } = usePosts();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];
  const emojiRef = useRef(null);
  //const { currentUser, switchUser } = useUser();

  // Close emoji picker when clicking outside
  useClickOutside(emojiRef, () => setShowEmojis(false));
  if (!user) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !selectedImage) {
      toast.error("Please enter content or select an image");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageData = null;

      if (selectedImage) {
        imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read image"));
          reader.readAsDataURL(selectedImage);
        });
      }

      const newPost = {
        description: content.trim(),
        image: imageData,
      };

      await addPost(newPost);
      // Reset form
      setContent("");
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-between w-full gap-4 p-4 text-sm bg-white rounded-lg shadow-md md:mx-auto xl:mx-auto">
      {/* User Avatar */}
      <Image
        src={user?.avatar || "/img/noAvatar.png"}
        alt={user?.name || "User avatar"}
        width={48}
        height={48}
        className="object-cover w-12 h-12 rounded-full"
      />

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        {/* Textarea + Emoji */}
        <div className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-slate-100"
          />
          <div className="relative">
            <Image
              src="/img/emoji.png"
              alt=""
              width={20}
              height={20}
              onClick={() => setShowEmojis(!showEmojis)}
              className="w-5 h-5 cursor-pointer"
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
                    onClick={() => setContent((prev) => prev + emoji)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            {/* Submit Button */}
            <div className="flex justify-end">
              <AddPostButton isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>

        {/* Post Options */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
          <UploadPopover
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
          />

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

export default PostForm;
