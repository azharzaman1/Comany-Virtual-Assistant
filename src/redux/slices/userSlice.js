import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loggedOutRecently: false,
  },
  reducers: {
    SETUSER: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        loggedOutRecently: false,
      };
    },

    LOGOUT: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        loggedOutRecently: true,
      };
    },
  },
});

export const { SETUSER, LOGOUT } = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectLoggedOutState = (state) =>
  state.userStore.loggedOutRecently;

export default userSlice.reducer;
