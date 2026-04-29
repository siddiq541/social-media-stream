`use client`;
//import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ProfileCard = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="sticky flex flex-col gap-6 p-4 text-sm bg-white rounded-lg shadow-md">
      <div className="relative h-20">
        <Image
          src={"/img/noCover.png"}
          alt=""
          fill
          className="object-cover rounded-md"
        />
        <Image
          src={user.avatar || "/img/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="absolute left-0 right-0 z-10 object-cover w-12 h-12 m-auto rounded-full -bottom-6 ring-1 ring-white"
        />
      </div>
      <div className="flex flex-col items-center h-20 gap-2">
        <span className="font-semibold">{user.username}</span>
        <div className="flex items-center gap-4"></div>
        <Link href={`/profile/${user.username}`}>
          <button className="p-2 text-xs text-white bg-blue-500 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
