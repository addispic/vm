import React,{useState,useEffect} from "react";
import { Routes, Route,useLocation } from "react-router-dom";

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

const App = () => {
  // location
  const location = useLocation();
  console.log(location?.pathname?.split('/')[1]==="user")
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* header */}
      {
        location?.pathname?.split('/')[1] !== "user" && <Header />
      }
      {/* routes */}
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
  );
};

export default App;
