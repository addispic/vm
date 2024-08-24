import React from "react";

// icons
// file
import { MdAttachFile } from "react-icons/md";
// send
import { GrSend } from "react-icons/gr";
// likes
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
// favorite
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
// comments
import { MdModeComment } from "react-icons/md";
import { MdOutlineModeComment } from "react-icons/md";

// components
// user profile
import UserProfile from "../user/user-sub-pages/UserProfile";

const Home = () => {
  // adjust textarea height
  const adjustPostTextAreaHeight = (e) => {
    let textarea = document.getElementById("post-text-input");
    textarea.style.height = "17px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    if (!e.target.value) {
      textarea.style.height = "17px";
    }
  };

  return (
    <div className="h-[93vh] flex flex-col">
      {/* post content */}
      <div className="flex-grow max-h-[88vh] overflow-y-auto px-[3%] pt-[1vh]">
        {[...Array(3)].map((postItem, index) => {
          return (
            <div className="mb-5 bg-white shadow-lg p-3">
              {/* text */}
              <div className="text-sm ml-[3%]">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Suscipit culpa nisi labore quo similique eos adipisci non
                  iusto veritatis architecto? Esse velit itaque error neque
                  aliquam autem quibusdam consequuntur fuga accusantium
                  doloremque dolor consequatur similique earum, qui atque
                  tempora fugit est alias aspernatur accusamus ducimus,
                  molestias inventore? Dicta.
                </p>
              </div>
              {/* control */}
              <div className="flex items-center gap-x-3 border-bv border-green-500 py-1.5">
                {/* author */}
                <div className="flex items-center gap-x-1">
                  {/* profile */}
                  <div className="w-[26px] aspect-square rounded-full overflow-hidden">
                    <UserProfile />
                  </div>
                  {/* username */}
                  <div className="text-sm text-gray-700">username</div>
                </div>
                {/* actions*/}
                <div className="flex items-center gap-x-3">
                  {/* like */}
                  <button className="text-green-500 flex items-center">
                    <span className="font-medium mr-1 text-xs mt-1.5">
                      {12}
                    </span>
                    {true ? <FaThumbsUp /> : <FaRegThumbsUp />}
                  </button>
                  {/* favorite */}
                  <button className="text-green-500 flex items-center text-lg mt-1">
                    {true ? <MdFavorite /> : <MdFavoriteBorder />}
                  </button>
                  {/* comments */}
                  <button className="text-green-500 flex items-center text-lg mt-1">
                    <span className="font-medium mr-1 text-xs">3</span>
                    {true ? <MdModeComment /> : <MdOutlineModeComment />}{" "}
                    <span className="text-sm text-gray-700 ml-1">comments</span>
                  </button>
                </div>
                {/* date */}
                <div>
                  <span className="text-xs text-green-500">3 minutes ago</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* new post form */}
      <div className="bg-white px-[3%] py-1 flex items-center gap-x-3">
        {/* file picker */}
        <div className="self-end">
          <input type="file" accept="image/*" hidden id="post-file-picker" />
          <label htmlFor="post-file-picker">
            <MdAttachFile className="text-2xl rotate-[24deg] cursor-pointer text-green-500" />
          </label>
        </div>
        {/* text in */}
        <div className="flex-grow py-0.5 px-1.5 border border-green-500 rounded-sm">
          <textarea
            className="focus:outline-none focus:ring-0 border-none p-0 w-full h-[17px] max-h-[72vh] resize-none bg-transparent m-0 text-sm"
            name=""
            id="post-text-input"
            placeholder="text . . ."
            onKeyUp={(e) => {
              adjustPostTextAreaHeight(e);
            }}
          ></textarea>
        </div>
        {/* send button */}
        <div className="self-end">
          <GrSend className="text-green-500 text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Home;
