import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  homes: [],
  currentHome: null,
  rooms: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setHomes: (state, action) => {
      state.homes = action.payload.friends;
    },
    setCurrentHome: (state, action) => {
      state.currentHome = action.payload.currentHome;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload.rooms;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setHomes,
  setCurrentHome,
  setRooms,
} = authSlice.actions;

export default authSlice.reducer;
