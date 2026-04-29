import Link from "next/link";
import Image from "next/image";
import ProfileCard from "./ProfileCard";

const LeftMenu = ({ page }) => {
  return (
    <div className="flex flex-col gap-6 ">
      {<ProfileCard />}
      <div className="flex flex-col gap-2 p-4 text-sm text-gray-500 bg-white rounded-lg shadow-md">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/posts.png" alt="" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/activity.png" alt="" width={20} height={20} />
          <span>Activity</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/market.png" alt="" width={20} height={20} />
          <span>Marketplace</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/events.png" alt="" width={20} height={20} />
          <span>Events</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/albums.png" alt="" width={20} height={20} />
          <span>Albums</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/videos.png" alt="" width={20} height={20} />
          <span>Videos</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/news.png" alt="" width={20} height={20} />
          <span>News</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/courses.png" alt="" width={20} height={20} />
          <span>Courses</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/lists.png" alt="" width={20} height={20} />
          <span>Lists</span>
        </Link>
        <hr className="self-center border-t-1 border-gray-50 w-36" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/img/settings.png" alt="" width={20} height={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftMenu;
