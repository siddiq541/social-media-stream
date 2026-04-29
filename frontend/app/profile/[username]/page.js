"use client";
import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { usePosts } from "@/hooks/usePosts";
import EditProfileForm from "@/components/Profile/EditProfileForm";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useAuth();

  const { posts } = usePosts(); // or from context later

  const userPosts = posts.filter((post) => post.author.username === username);

  const postCount = userPosts.length;

  if (!user) return null;

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full h-64">
              <Image
                src={user.cover || "/img/noCover.png"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src={user.avatar || "/img/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="absolute left-0 right-0 object-cover w-32 h-32 m-auto rounded-full -bottom-16 ring-4 ring-white"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">{username}</h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{postCount}</span>
                <span className="text-sm">Posts</span>
              </div>
            </div>
          </div>
          {/* <Feed username={user.username} /> */}
          {user.username === username && <EditProfileForm />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
