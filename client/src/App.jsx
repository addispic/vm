import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// config
// socket
import { SOCKET } from "./config";


// components
import Header from "./components/Header";

// pages
// users
import User from "./pages/user/User";
import Login from "./pages/user/user-sub-pages/Login";
import Register from "./pages/user/user-sub-pages/Register";
import ForgetPassword from "./pages/user/user-sub-pages/ForgetPassword";

// home
import Home from "./pages/home/Home";

// pages not fund
import PagesNotFound from "./pages/PagesNotFound";

// slices
// user
import { getAllUsers, addNewUser, userSelector } from "./features/users/users.slice";
// posts
import {getAllPosts,addNewPostEvent, deletePostEvent} from './features/posts/posts.slice'

const App = () => {
  // dispatch
  const dispatch = useDispatch();
  // location
  const location = useLocation();

  // states from slices
  const user = useSelector(userSelector)

  console.log(user, "++++++++")

  // use effects
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // add new user effect
  useEffect(() => {
    SOCKET.on("emitNewUser", (newUser) => {
      if (newUser?._id) {
        dispatch(addNewUser(newUser));
      }
    });
  }, []);

  // get all posts
  useEffect(()=>{
    dispatch(getAllPosts())
  },[])

  // new post
  useEffect(()=>{
    SOCKET.on('addNewPostEvent',data=>{
      dispatch(addNewPostEvent(data))
    })
  },[])

  // delete post
  useEffect(()=>{
    SOCKET.on('deletePostEvent', _id => {
      dispatch(deletePostEvent(_id))
    })
  },[])

  
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* header */}
      {location?.pathname?.split("/")[1] !== "user" && <Header />}
      {/* routes */}
      <div className="h-[93vh] overflow-y-auto flex gap-x-5">
        {/* left side nav */}
        {location?.pathname?.split("/")[1] !== "user" && <div className="min-w-[20%] h-full bg-red-300">left side nav</div>}
        
        <div className="flex-grow">
          <Routes>
            {/* home */}
            <Route path="/" element={<Home />}></Route>
            {/* user */}
            <Route path="/user" element={<User />}>
              <Route index element={<PagesNotFound />}></Route>
              <Route path="/user/login" element={<Login />}></Route>
              <Route path="/user/register" element={<Register />}></Route>
              <Route
                path="/user/forget-password"
                element={<ForgetPassword />}
              ></Route>
            </Route>
            {/* no pages found */}
            <Route path="*" element={<PagesNotFound />}></Route>
          </Routes>
        </div>
        {/* right side components */}
        {location?.pathname?.split("/")[1] !== "user" && <div className="min-w-[30%] h-full bg-gray-300">right side nav</div>}
        
      </div>
    </div>
  );
};

export default App;
