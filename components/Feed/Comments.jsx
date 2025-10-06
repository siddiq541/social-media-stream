import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div className="">
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/34121190/pexels-photo-34121190.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex items-center justify-between flex-1 w-full px-6 py-2 text-sm bg-slate-100 rounded-xl">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 bg-transparent outline-none"
          />
          <Image
            src="/img/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* Comments */}
      <div className="">
        {/* COMMENT  */}
        <div className="flex justify-between gap-4 mt-6">
          {/* AVATAR  */}

          <Image
            src="https://images.pexels.com/photos/34121190/pexels-photo-34121190.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />

          {/* DESC  */}
          <div className="flex flex-col flex-1 gap-2">
            <span className="font-medium">Emma Wilson</span>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
              sequi labore a natus corporis neque numquam, officia quisquam!
              Enim assumenda vel omnis libero quaerat magni, ratione cumque unde
              magnam dolor.
            </p>
            <div className="flex items-center gap-8 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <Image
                  src="/img/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* ICON  */}
          <div className="">
            <Image
              src="/img/more.png"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
