import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// initial state
const initialState = {
  pageIndicator: "login",
};

// users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    pageIndicatorToggler: (state,action)=>{
        state.pageIndicator =  action.payload;
    }
  },
  extraReducers: (builder) => {},
});

// selectors
export const pageIndicatorSelector = (state) => state.users.pageIndicator;

// actions
export const {
    pageIndicatorToggler,
} = usersSlice.actions

// exports
export default usersSlice.reducer;
