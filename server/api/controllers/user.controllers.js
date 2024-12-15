const bcryptjs = require("bcryptjs");
// models
// user
const User = require("../models/user.schema");

// utils
// user
const { MAX_AGE, errorHandler, generateToken } = require("../utils/user.utils");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({ _id: 1, username: 1, email: 1 });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(400).json({ error: "get all users failed" });
  }
};

// register
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    // generate token
    const token = generateToken(newUser._id);
    // set token on cookies
    res.cookie("token", token, {
      maxAge: MAX_AGE * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res
      .status(200)
      .json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser?.email,
      });
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    return res.status(400).json({ errors });
  }
};

// login
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim()) {
      throw new Error("username required");
    }

    if (!password) {
      throw new Error("password required");
    }

    // is user exist
    const isUserExist = await User.findOne({ username });
    if (!isUserExist) {
      throw new Error("username note exist");
    }

    // is password match
    const isPasswordMatch = bcryptjs.compareSync(
      password,
      isUserExist?.password
    );

    if (!isPasswordMatch) {
      throw new Error("incorrect password");
    }

    // token
    const token = generateToken(isUserExist?._id);

    // set cookie
    res.cookie("token", token, {
      maxAge: MAX_AGE * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res
      .status(200)
      .json({
        _id: isUserExist?._id,
        username: isUserExist?.username,
        email: isUserExist?.email,
      });
  } catch (err) {
    const errors = errorHandler(err);
    return res.status(400).json({ errors });
  }
};

// logout
const userLogout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    return res.status(200).json({ message: "user logged out" });
  } catch (err) {
    return res.status(400).json({ error: "user logout failed" });
  }
};

// auth checker
const authChecker = (req, res) => {
  return res.status(200).json({ user: req.user });
};

// exports
module.exports = {
  getAllUsers,
  userRegister,
  userLogin,
  userLogout,
  authChecker,
};
