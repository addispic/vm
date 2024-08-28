import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// config
// socket
import {SOCKET} from '../../config';

// initial state
const initialState = {
  posts: null,
  isPostLoading: false,
  isNewPostUploading: false,
};

// get all posts
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    const response = await axios.get("/api/post/get-all-posts");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// add new post s
export const addNewPost = createAsyncThunk("posts/addNewPost", async (data) => {
  try {
    const response = await axios.post("/api/post/new-post", data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});
// slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // add new post
    addNewPostEvent: (state,action) => {
      state.posts?.unshift(action?.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // get all posts
      // pending
      .addCase(getAllPosts.pending, (state) => {
        state.isPostLoading = true;
        console.log("PENDING-GET-POSTS");
      })
      // fulfilled
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isPostLoading = false;
        if (action.payload?.posts) {
          state.posts = action.payload.posts;
        }
      })
      // rejected
      .addCase(getAllPosts.rejected, (state) => {
        state.isPostLoading = false;
        console.log("REJECTED-GET-POSTS");
      })

      // new post
      // pending
      .addCase(addNewPost.pending, (state) => {
        state.isNewPostUploading = true;
      })
      // fulfilled
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.isNewPostUploading = false;
        if(action.payload?.newPost){
          SOCKET.emit('addNewPost',action.payload?.newPost)
        }
      })
      // rejected
      .addCase(addNewPost.rejected, (state) => {
        state.isNewPostUploading = false;
        console.log("ADD-NEW-POST-REJECTED");
      });
  },
});

// actions
export const {
  addNewPostEvent,
} = postsSlice.actions
// selectors
// posts selector
export const postsSelector = (state) => state.posts.posts;

// exports
export default postsSlice.reducer;
