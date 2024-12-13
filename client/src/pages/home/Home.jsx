import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";

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
// more
import { RiMore2Fill } from "react-icons/ri";
// edit
import { CiEdit } from "react-icons/ci";
// share
import { CiShare2 } from "react-icons/ci";
// delete
import { RiDeleteBin6Line } from "react-icons/ri";
// warning
import { IoIosWarning } from "react-icons/io";
// add
import { IoMdAdd } from "react-icons/io";

// components
// user profile
import UserProfile from "../user/user-sub-pages/UserProfile";
// user name
import Username from "../user/user-sub-pages/Username";

// slices
// posts
import { postsSelector, addNewPost,deletePost, isPostDeletingSelector } from "../../features/posts/posts.slice";
// users
import { userSelector } from "../../features/users/users.slice";

const Home = () => {
  // states from slice
  // user
  const user = useSelector(userSelector);
  // posts
  const posts = useSelector(postsSelector);
  // is  post deleting
  const isPostDeleting = useSelector(isPostDeletingSelector)

  // local states
  const [text, setText] = useState("");
  // more option
  const [postMore, setPostMore] = useState({
    options: [
      {
        icon: CiShare2,
        text: "share",
      },
      {
        icon: MdFavoriteBorder,
        text: "favorite",
      },
      {
        icon: CiEdit,
        text: "edit",
      },
      {
        icon: RiDeleteBin6Line,
        text: "delete",
      },
    ],
    selectedId: null,
  });
  // delete post
  const [isDeletePost,setIsDeletePost] = useState(null)

  // dispatch
  const dispatch = useDispatch();

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

  // form submit handler
  const formSubmitHandler = () => {
    let textarea = document.getElementById("post-text-input");
    if (text?.trim()) {
      dispatch(addNewPost({ text }));
    }
    textarea.style.height = "17px";
    setText("");
  };

  // hide the pop up after deleting
  useEffect(()=>{
    setIsDeletePost(null)
  },[posts])

  

  return (
    <div className="h-[93vh] flex flex-col">
      {/* post content */}
      <div
        className={`flex-grow overflow-y-auto px-[3%] pt-[1vh] ${
          user ? "max-h-[88vh]" : "max-h-[93vh]"
        }`}
      >
        {posts?.length > 0 ? (
          <>
            {posts.map((postItem) => {
              return (
                <div
                  key={postItem?._id}
                  className="mb-5 bg-white shadow-lg p-3 relative"
                  onClick={(e)=>{
                    e.stopPropagation()
                    setPostMore(prev => {
                      return {
                        ...prev,
                        selectedId: null,
                      }
                    })
                  }}
                >
                  {/* more option */}
                  {user ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPostMore((prev) => {
                          return {
                            ...prev,
                            selectedId:
                              prev?.selectedId === postItem?._id
                                ? null
                                : postItem?._id,
                          };
                        });
                      }}
                      className="absolute right-1.5 top-1.5 z-0 text-xl text-green-500"
                    >
                      <RiMore2Fill />
                    </button>
                  ) : null}
                  {/* option pop up */}
                  {user && (
                    <div
                      className={`absolute right-0 top-1.5 z-10 bg-white shadow-lg transition-transform ease-in-out duration-150 ${
                        postMore?.selectedId === postItem?._id
                          ? "scale-100"
                          : "scale-0"
                      }`}
                    >
                      {postMore?.options?.map((postMoreItem) => {
                        return (
                          <>
                            {(postMoreItem?.text === "delete" ||
                              postMoreItem?.text === "edit") &&
                            user?._id === postItem?.userId ? (
                              <div className="flex items-center gap-x-1.5 px-3 py-0.5 cursor-pointer transition-colors ease-in-out duration-150 hover:bg-green-100" onClick={(e)=>{
                                e.stopPropagation()
                                if(postMoreItem?.text === "delete"){
                                  setIsDeletePost(postItem)
                                  setPostMore(prev => {
                                    return {
                                      ...prev,
                                      selectedId: null,
                                    }
                                  })
                                }
                              }}>
                                {/* icon */}
                                <postMoreItem.icon className="text-green-500" />
                                {/* text */}
                                <span className="text-sm text-green-700">
                                  {postMoreItem?.text}
                                </span>
                              </div>
                            ) : (postMoreItem?.text === "share" ||
                                postMoreItem?.text === "favorite") &&
                              user?._id !== postItem?.userId ? (
                              <div className="flex items-center gap-x-1.5 px-3 py-0.5 cursor-pointer transition-colors ease-in-out duration-150 hover:bg-green-100" onClick={(e)=>{
                                e.stopPropagation()
                              }}>
                                {/* icon */}
                                <postMoreItem.icon className="text-green-500" />
                                {/* text */}
                                <span className="text-sm text-green-700">
                                  {postMoreItem?.text}
                                </span>
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </div>
                  )}
                  {/* text */}
                  <div className="text-sm ml-[3%] py-3">
                    <p>{postItem?.text}</p>
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
                      <div className="text-sm text-gray-700">
                        <Username _id={postItem?.userId} />
                      </div>
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
                        {true ? (
                          <MdModeComment />
                        ) : (
                          <MdOutlineModeComment />
                        )}{" "}
                        <span className="text-sm text-gray-700 ml-1">
                          comments
                        </span>
                      </button>
                    </div>
                    {/* date */}
                    <div>
                      <span className="text-xs text-green-500">
                        {formatDistanceToNow(new Date(postItem?.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>No Posts Yet</>
        )}
      </div>
      {
        false && <>
        {/* new post form */}
        <div className="bg-white px-[3%] py-1 flex items-center gap-x-3">
          {/* file picker */}
          <div className="self-end">
            <input
              type="file"
              accept="image/*"
              hidden
              id="post-file-picker"
            />
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
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="text . . ."
              onKeyUp={(e) => {
                adjustPostTextAreaHeight(e);
              }}
            ></textarea>
          </div>
          {/* send button */}
          <div className="self-end">
            <GrSend
              className="text-green-500 text-2xl cursor-pointer"
              onClick={() => {
                formSubmitHandler();
              }}
            />
          </div>
        </div>
      </>
      }
      {user ? (
        <>
          <div className="relative flex items-center justify-center">
            {/* button */}
            <button className="flex items-center gap-x-1 bg-neutral-200 rounded-sm text-sm px-1.5 py-1 transition-all ease-in-out duration-150 hover:bg-neutral-300">
              <IoMdAdd className="text-lg"/>
              <span>Add New Vehicle</span>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* delete post item pop up */}
      <div className={`fixed left-0 top-0 w-screen h-screen bg-black/35 z-50 ${isDeletePost ? 'scale-100' : 'scale-0'}`}>
        {/* confirm screen */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-5">
        {
          isPostDeleting 
          ?
          <div>
            <p>Post Deleting...</p>
          </div>
          :
          <>
          {/* icon */}
          <div className="flex items-center justify-center mb-1.5">
            <div className="w-[24px] aspect-square rounded-full border border-red-500 flex items-center justify-center text-red-500 bg-red-100">
              <IoIosWarning />
            </div>
          </div>
          {/* text */}
          <div className="text-center">
            <p className="text-gray-700">
              Are you sure to delete this post ?
            </p>
            <p className="text-sm text-red-500 italic">Remember this action is undone.</p>
          </div>
          {/* buttons */}
          <div className="flex items-center justify-evenly mt-3">

            

            <button className="px-3 py-0.5 rounded-sm text-sm bg-gray-500 text-white transition-colors ease-in-out duration-150 hover:bg-gray-400" onClick={()=>{
              setIsDeletePost(null)
            }}>cancel</button>

            <button className="px-3 py-0.5 rounded-sm text-sm bg-red-500 text-white transition-colors ease-in-out duration-150 hover:bg-red-400" onClick={()=>{
              dispatch(deletePost(isDeletePost?._id))
            }}>delete</button>

          </div>
          </>
        }
        </div>
      </div>
    </div>
  );
};

export default Home;
