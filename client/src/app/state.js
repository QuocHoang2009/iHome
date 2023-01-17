import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "Home",
  isCollapsed: false,
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
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload.isCollapsed;
    },
    setSelected: (state, action) => {
      state.selected = action.payload.selected;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setHomes: (state, action) => {
      state.homes = action.payload.homes;
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
  setIsCollapsed,
  setSelected,
  setMode,
  setLogin,
  setLogout,
  setHomes,
  setCurrentHome,
  setRooms,
} = authSlice.actions;

export default authSlice.reducer;
