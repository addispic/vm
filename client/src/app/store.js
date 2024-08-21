import { configureStore } from "@reduxjs/toolkit";

// reducers
import usersReducer from "../features/users/users.slice";

// store
export const store = configureStore({
  reducer: {
    // users reducer
    users: usersReducer,
  },
});
