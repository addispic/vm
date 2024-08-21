import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// icons
// chat
import { IoChatbubblesSharp } from "react-icons/io5";
// hide
import { PiEyeSlashThin } from "react-icons/pi";
// show
import { PiEyeThin } from "react-icons/pi";

const Register = () => {
  // states
  // border decorator
  const [borderDecorator, setBorderDecorator] = useState("");
  // username
  const [username, setUsername] = useState("");
  // username error
  const [usernameError, setUsernameError] = useState("");
  // email
  const [email, setEmail] = useState("");
  // email error
  const [emailError, setEmailError] = useState("");
  //   password
  const [password, setPassword] = useState("");
  // is password
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  // password error
  const [passwordError, setPasswordError] = useState("");
  //   confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  //   is confirm password hide
  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(true);
  // confirm password error
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //   email validator
  const emailValidator = (email) => {
    let emailPattern =
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    return emailPattern.test(email);
  };

  // submit handler
  const formSubmitHandler = () => {
    // validator
    if (!username?.trim()) {
      setUsernameError("Username required.");
    } else {
      setUsernameError("");
    }
    if (!email?.trim()) {
      setEmailError("Email address required.");
    } else if (!emailValidator(email)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password required.");
    } else if (password?.length < 3) {
      setPasswordError("Too short password.");
    } else {
      setPasswordError("");
    }

    if(!confirmPassword){
        setConfirmPasswordError('Please confirm password')
    }else if(password && password !== confirmPassword){
        setConfirmPasswordError('Passwords not match.')
    }else {
        setConfirmPasswordError("")
    }

    // submitting
    if(username?.trim() && email?.trim() && emailValidator(email) && password && password === confirmPassword){
        console.log({username,email,password})
    }
  };


  return (
    <div>
      {/* header */}
      <header className="flex items-center justify-between mb-6">
        {/* title */}
        <div>
          <h1 className="text-xl text-green-500">Register</h1>
        </div>
        {/* site-logo */}
        <div className="md:hidden">
          <NavLink
            to={"/"}
            className={"flex items-center gap-x-0.5 text-green-400"}
          >
            <IoChatbubblesSharp className="text-lg text-green-400" />
            <div className="flex items-center font-black">
              <span className="text-green-400">addis</span>
              <span>Chat</span>
            </div>
          </NavLink>
        </div>
      </header>
      {/* form */}
      <div>
        {/* username */}
        <div className="mb-3">
          {/* input */}
          <div
            className={`p-2 border rounded-sm ${
              username ? "border-green-500" : ""
            } ${usernameError ? "border-red-400" : ""} ${
              borderDecorator === "username"
                ? "border-green-500 "
                : "border-gray-200"
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              onFocus={() => {
                setBorderDecorator("username");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
          </div>
          {/* username error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{usernameError}</span>
          </div>
        </div>

        {/* email */}
        <div className="mb-3">
          {/* input */}
          <div
            className={`p-2 border rounded-sm  ${
              email && !emailError ? "border-green-500" : ""
            } ${emailError ? "border-red-400" : ""} ${
              borderDecorator === "email"
                ? "border-green-500 "
                : "border-gray-200 "
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onFocus={() => {
                setBorderDecorator("email");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
          </div>
          {/* email error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{emailError}</span>
          </div>
        </div>

        {/* password */}
        <div className="mb-3">
          {/* input */}
          <div
            className={`p-2 border rounded-sm flex items-center gap-x-1.5 ${
              password && !passwordError ? "border-green-500" : ""
            } ${passwordError ? "border-red-400" : ""} ${
              borderDecorator === "password"
                ? "border-green-500 "
                : "border-gray-200 "
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type={`${isPasswordHide ? "password" : "text"}`}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onFocus={() => {
                setBorderDecorator("password");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
            <button
              onClick={() => {
                setIsPasswordHide(!isPasswordHide);
              }}
            >
              {isPasswordHide ? (
                <PiEyeSlashThin className="text-xl text-gray-500" />
              ) : (
                <PiEyeThin className="text-xl text-gray-500" />
              )}
            </button>
          </div>
          {/* password error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{passwordError}</span>
          </div>
        </div>

        {/* confirm password */}
        <div className="mb-7">
          {/* input */}
          <div
            className={`p-2 border rounded-sm flex items-center gap-x-1.5 ${confirmPassword && !confirmPasswordError ? "border-green-500" : ""} ${confirmPasswordError ? "border-red-400" : ""} ${
              borderDecorator ? "border-green-500" : "border-gray-200"
            }`}
          >
            <input
              className="w-full border-none focus:ring-0 focus:outline-none text-sm bg-transparent"
              type={`${isConfirmPasswordHide ? "password" : "text"}`}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              onFocus={() => {
                setBorderDecorator("confirm-password");
              }}
              onBlur={() => {
                setBorderDecorator("");
              }}
            />
            <button
              onClick={() => {
                setIsConfirmPasswordHide(!isConfirmPasswordHide);
              }}
            >
              {isConfirmPasswordHide ? (
                <PiEyeSlashThin className="text-xl cursor-pointer text-gray-500" />
              ) : (
                <PiEyeThin className="text-xl cursor-pointer text-gray-500" />
              )}
            </button>
          </div>
          {/* confirm password error */}
          <div className="text-xs text-red-600 overflow-hidden h-[16px]">
            <span>{confirmPasswordError}</span>
          </div>
        </div>

        {/* register button */}
        <div>
          <button
            className="w-full flex items-center justify-center bg-green-500 text-white rounded-sm p-2 transition-colors ease-in-out duration-150 hover:bg-green-400"
            onClick={() => {
              formSubmitHandler();
            }}
          >
            <span>Register</span>
          </button>
        </div>

        {/* login link */}
        <div className="mt-5">
          <NavLink
            to={"/user/login"}
            className={"text-xs text-green-500 hover:underline italic"}
          >
            <span>Have already an account ?</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
