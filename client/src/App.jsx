import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// icons
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { FaCarAlt } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiNotebook } from "react-icons/pi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { LuListTodo } from "react-icons/lu";
import { RiUser6Line } from "react-icons/ri";

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
// vehicles
import {getAllVehicles,addNewVehicleEvent,updateVehicleEvent,deleteVehicleEvent} from './features/vehicles/vehicles.slice'

const App = () => {
  // dispatch
  const dispatch = useDispatch();
  // location
  const location = useLocation();

  // user
  const user = useSelector(userSelector)

  // menu list
  const [menu,setMenu] = useState([
    {
      icon: CiHome,
      text: "Home",
    },
    {
      icon: LuLayoutDashboard,
      text: "Dashboard",
    },
    {
      icon: PiNotebook,
      text: "Blogs",
    },
    {
      icon: HiOutlineCurrencyDollar,
      text: "Balance",
    },
    {
      icon: LuListTodo,
      text: "Tasks",
    },
  ])


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

  
  // get all vehicles
  useEffect(()=>{
    dispatch(getAllVehicles())
  },[])

  // new vehicle
  useEffect(()=>{
    SOCKET.on('addNewVehicleEvent',data=>{
      dispatch(addNewVehicleEvent(data))
    })
  },[])
  // update vehicle
  useEffect(()=>{
    SOCKET.on('updateVehicleEvent',data=>{
      dispatch(updateVehicleEvent(data))
    })
  },[])

  // delete vehicle
  useEffect(()=>{
    SOCKET.on('deleteVehicleEvent', _id => {
      dispatch(deleteVehicleEvent(_id))
    })
  },[])

  
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* header */}
      {location?.pathname?.split("/")[1] !== "user" && <Header />}
      {/* routes */}
      <div className="h-[93vh] overflow-y-auto flex gap-x-5 relative">
        {/* left side nav */}
        {location?.pathname?.split("/")[1] !== "user" && <div className="w-0 overflow-hidden shrink-0  md:relative absolute left-0 top-0 h-full z-50 md:w-56 md:pr-5  md:pb-3 transition-all ease-in-out duration-150" id="menu-container">
          {/* left list */}
          <div className="w-full mx-3 my-1.5 h-full bg-neutral-200 rounded-md overflow-hidden p-5 mr-3 flex flex-col justify-between">
            {/* menu list */}
            <div>
              <div className="text-left font-black text-neutral-500 mb-3 flex items-center gap-x-1.5">
                <div className="w-[24px] aspect-square rounded-full border border-neutral-500 flex items-center justify-center text-sm">
                  < FaCarAlt/>
                </div>
                <span>VM</span>
              </div>
              {
                menu.map((item)=>{
                  return (
                    <div className="mt-3 w-full bg-neutral-100 p-1.5 overflow-hidden flex items-center gap-x-1.5 cursor-pointer">
                <item.icon className="text-xl" />
                <span className="text-sm text-neutral-600">{item.text}</span>
              </div>
                  )
                })
              }
            </div>
            {/* controllers */}
            <div>
              {
                user 
                ?
                <>
                {/* settings */}
              <div className="w-full bg-neutral-50 p-1.5 rounded-md overflow-hidden flex items-center gap-x-1.5 cursor-pointer">
                <MdOutlineSettingsSuggest className="text-xl" />
                <span className="text-sm text-neutral-600">Settings</span>
              </div>
              {/* logout */}
              <div className="mt-3 w-full bg-neutral-50 p-1.5 rounded-md overflow-hidden flex items-center gap-x-1.5 cursor-pointer">
                <IoExitOutline className="text-xl" />
                <span className="text-sm text-neutral-600">Logout</span>
              </div>
                </>
                :
                <>
                {/* logout */}
              <NavLink to={"/user/login"} className="mt-3 w-full bg-neutral-50 p-1.5 rounded-md overflow-hidden flex items-center gap-x-1.5 cursor-pointer">
                <CiLogin className="text-xl" />
                <span className="text-sm text-neutral-600">Login</span>
              </NavLink>
              </>
              }
              
            </div>
          </div>
          </div>}
        
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
        {location?.pathname?.split("/")[1] !== "user" && <div className="overflow-hidden relative w-0 lg:w-72 h-full">
          {/* latest */}
          <div className="w-full h-full bg-neutral-100 p-5 rounded-md overflow-hidden mx-3 my-1.5">
            <h3 className="text-green-500 font-medium">Latest News</h3>
            {/* lists */}
            <div className="mt-3">
              {[...Array(3)].map((item,index)=>{
                return (
                  <div className="mb-3">
                    <div className="bg-white p-1.5 rounded-md shadow-md my-1.5 text-sm">
                      <p>Adipisicing elit. Corporis perspiciatis adipisci velit harum.</p>
                    </div>
                    <div className="flex items-center gap-x-1.5 text-neutral-500 text-sm">
                      <RiUser6Line/>
                      <div>by Addis</div>
                      <div>3 minutes agor</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          </div>}
        
      </div>
    </div>
  );
};

export default App;
