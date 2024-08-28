import { configureStore } from "@reduxjs/toolkit";

// reducers
// users
import usersReducer from "../features/users/users.slice";
// posts
import postsReducer from "../features/posts/posts.slice";

// store
export const store = configureStore({
  reducer: {
    // users reducer
    user: usersReducer,
    posts: postsReducer,
  },
});
