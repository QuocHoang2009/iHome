import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  currentHome: null,
  homes: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setHomes: (state, action) => {
      state.homes = action.payload.posts;
    },
    setCurrentHome: (state, action) => {
      state.home = action.payload.home;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setHomes,
  setCurrentHome,
} = authSlice.actions;
export default authSlice.reducer;
