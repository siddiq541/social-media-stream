"use client";

import CommentList from "./CommentList";
import { SamplePosts } from "@/lib/posts";

const Comments = ({ postId, onUpdateComments }) => {
  // Get comments for this post from SamplePosts
  const post = SamplePosts.find((p) => p.id === postId);
  const comments = post?.comments || [];

  return (
    <div className="">
      <CommentList
        comments={comments}
        postId={postId}
        onUpdateComments={onUpdateComments}
      />
    </div>
  );
};

export default Comments;

// "use client";

// import { useState, useRef } from "react";
// import Image from "next/image";
// import useClickOutside from "@/hooks/useClickOutside";
// import { useUser } from "@/context/UserContext";

// const Comments = () => {
//   const [showEmojis, setShowEmojis] = useState(false);
//   const emojis = ["😊", "😂", "❤️", "👍", "🔥"];
//   const emojiRef = useRef(null);
//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef(null);
//   useClickOutside(menuRef, () => setShowMenu(false));
//   const { currentUser, switchUser } = useUser();

//   // Close emoji picker when clicking outside
//   useClickOutside(emojiRef, () => setShowEmojis(false));
//   return (
//     <div className="">
//       {/* WRITE */}
//       <div className="flex items-center gap-4">
//         <Image
//           src={currentUser?.avatar || "/img/profile.png"}
//           alt={currentUser?.name || "User avatar"}
//           width={32}
//           height={32}
//           className="w-8 h-8 rounded-full"
//         />
//         <div className="flex items-center justify-between flex-1 w-full px-6 py-2 text-sm bg-slate-100 rounded-xl">
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             className="flex-1 bg-transparent outline-none"
//           />
//           <Image
//             src="/img/emoji.png"
//             alt=""
//             width={20}
//             height={20}
//             onClick={() => setShowEmojis(!showEmojis)}
//             className="w-5 h-5 cursor-pointer"
//           />
//           {showEmojis && (
//             <div
//               ref={emojiRef}
//               onClick={(e) => e.stopPropagation()}
//               className="absolute right-0 z-10 flex gap-2 p-2 mb-2 bg-white border bottom-full rounded-xl shadow-l"
//             >
//               {emojis.map((emoji) => (
//                 <button
//                   key={emoji}
//                   type="button"
//                   onClick={() => setContent((prev) => prev + emoji)}
//                   className="text-2xl transition-transform hover:scale-110"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Comments */}
//       <div className="">
//         {/* COMMENT  */}
//         <div className="flex justify-between gap-4 mt-6">
//           {/* AVATAR  */}

//           <Image
//             src={currentUser?.avatar || "/img/profile.png"}
//             alt={currentUser?.name || "User avatar"}
//             width={40}
//             height={40}
//             className="w-10 h-10 rounded-full"
//           />

//           {/* DESC  */}
//           <div className="flex flex-col flex-1 gap-2">
//             <span className="font-medium">Emma Wilson</span>
//             <p className="">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
//               sequi labore a natus corporis neque numquam, officia quisquam!
//               Enim assumenda vel omnis libero quaerat magni, ratione cumque unde
//               magnam dolor.
//             </p>
//             <div className="flex items-center gap-8 mt-2 text-xs text-gray-500">
//               <div className="flex items-center gap-4">
//                 <Image
//                   src="/img/like.png"
//                   alt=""
//                   width={12}
//                   height={12}
//                   className="w-4 h-4 cursor-pointer"
//                 />
//                 <span className="text-gray-300">|</span>
//                 <span className="text-gray-500">123 Likes</span>
//               </div>
//               <div className="">Reply</div>
//             </div>
//           </div>
//           {/* ICON  */}
//           <div className="relative" ref={menuRef}>
//             <Image
//               src="/img/more.png"
//               alt="More"
//               width={16}
//               height={16}
//               className="cursor-pointer"
//               onClick={() => setShowMenu(!showMenu)}
//             />
//             {showMenu && (
//               <div className="absolute right-0 z-10 w-20 overflow-hidden bg-white rounded-md shadow-lg ">
//                 <button
//                   className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 focus:outline-none"
//                   onClick={() => onDelete(post.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Comments;
