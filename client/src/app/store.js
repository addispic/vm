import { configureStore } from "@reduxjs/toolkit";

// reducers
// users
import usersReducer from "../features/users/users.slice";
// vehicles
import vehicleReducer from '../features/vehicles/vehicles.slice'

// store
export const store = configureStore({
  reducer: {
    // users reducer
    user: usersReducer,
    vehicles: vehicleReducer,
  },
});
