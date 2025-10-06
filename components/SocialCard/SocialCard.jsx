const SocialCard = ({ post }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-md"></div>
  );
};

// {/* Author Info */}
// <div className="flex items-center mb-4">
//   <div className="flex items-center justify-center w-12 h-12 mr-3 bg-gray-300 rounded-full">
//     <span className="text-sm font-medium text-gray-600">
//       {post.author.name.split(' ').map(n => n[0]).join('')}
//     </span>
//   </div>
//   <div>
//     <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
//     <p className="text-sm text-gray-500">{post.author.username} • {formatTimestamp(post.timestamp)}</p>
//   </div>
// </div>

// {/* Post Content */}
// <div className="mb-4">
//   <p className="leading-relaxed text-gray-800">{post.content}</p>
// </div>

// {/* Post Image (if exists) */}
// {post.image && (
//   <div className="mb-4">
//     <img
//       src={post.image}
//       alt="Post content"
//       className="object-cover w-full rounded-lg max-h-96"
//     />
//   </div>
// )}

// {/* Engagement Stats */}
// <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//   <div className="flex space-x-6">
//     <button className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-blue-500">
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//       </svg>
//       <span className="text-sm">{post.likes}</span>
//     </button>

//     <button className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-green-500">
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//       </svg>
//       <span className="text-sm">{post.comments}</span>
//     </button>

//     <button className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-purple-500">
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
//       </svg>
//       <span className="text-sm">{post.shares}</span>
//     </button>
//   </div>
// </div>

export default SocialCard;
