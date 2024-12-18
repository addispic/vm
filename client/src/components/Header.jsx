import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// icons
import { FaCar } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";

// slices
// user
import { userSelector, logout } from "../features/users/users.slice";

// components
// username
import Username from "../pages/user/user-sub-pages/Username";

const Header = () => {
  // dispatch
  const dispatch = useDispatch();
  // states from slices
  // user
  const user = useSelector(userSelector);

  // menu toggler
  const menuTogglerHandler = () => {
    let menuContainer = document.getElementById("menu-container")
    if(menuContainer?.classList.contains("absolute")){
      if(menuContainer?.classList.contains('w-0')){
        menuContainer?.classList.remove("w-0")
        menuContainer?.classList.add("w-56")
      }else{
        menuContainer?.classList.add("w-0")
        menuContainer?.classList.remove("w-56")
      }
    }
  }
  return (
    <header className="h-[7vh] bg-white shadow-md w-full">
      {/* container */}
      <div className="container-max-width flex items-center justify-between h-full">
        {/* logo */}
        <div className="flex items-center gap-1.5">
          {/* toggler */}
          <div onClick={menuTogglerHandler} className="md:hidden text-neutral-500 text-xl cursor-pointer">
            <RiMenu2Line />
          </div>
          <NavLink
            to={"/"}
            className={"flex items-center gap-x-0.5 text-green-500"}
          >
            <FaCar className="text-lg " />
            <div className="flex items-center font-black">
              <small className="md:hidden">VM</small>
              <span className="hidden md:inline-block">Vehicle Management</span>
            </div>
          </NavLink>
        </div>
        {/* actions */}
        <div>
          {user ? (
            <div className="flex items-center justify-end gap-x-3">
              {/* profile */}
              <div>
                <FaCircleUser className="text-2xl text-green-600"/>
              </div>
              {/* username */}
              <div className="text-sm">
                <Username _id={user?._id} />
              </div>

              {/* logout button */}
              <div>
                <button
                  className="px-3 py-0.5 rounded-sm bg-green-500 text-white text-sm transition-colors ease-in-out duration-150 hover:bg-green-400"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-3 justify-end">
              <NavLink
                className={
                  "px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50"
                }
                to={"/user/login"}
              >
                Login
              </NavLink>
              <NavLink
                className={
                  "px-3 py-0.5 rounded-sm bg-white text-green-500 text-sm transition-colors ease-in-out duration-150 hover:bg-gray-50"
                }
                to={"/user/register"}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
