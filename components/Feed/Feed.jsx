import Post from "./Post";

const Feed = ({ posts, onDelete, onUpdatePost }) => {
  return (
    <div className="flex flex-col gap-12 p-4 md:mx-auto bg-white rounded-lg shadow-md md:w-3/4 xl:w-[60%] xl:mx-auto">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={onDelete}
          onUpdatePost={onUpdatePost}
        />
      ))}
    </div>
  );
};

export default Feed;
