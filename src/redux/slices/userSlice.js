import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loggedOutRecently: false,
    currentUserRole: "individual__user",
    currentUserInDB: "",
  },
  reducers: {
    SET_USER: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        loggedOutRecently: false,
      };
    },

    SET_CURRENT_USER_IN_DB: (state, action) => {
      return {
        ...state,
        currentUserInDB: action.payload,
      };
    },

    LOGED_OUT_RECENTLY: (state, action) => {
      return {
        ...state,
        loggedOutRecently: true,
      };
    },
    SET_USER_ROLE: (state, action) => {
      return {
        ...state,
        currentUserRole: action.payload,
      };
    },
  },
});

export const {
  SET_USER,
  LOGED_OUT_RECENTLY,
  SET_USER_ROLE,
  SET_CURRENT_USER_IN_DB,
} = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectLoggedOutState = (state) =>
  state.userStore.loggedOutRecently;
export const selectCurrentUserRole = (state) => state.userStore.currentUserRole;
export const selectCurrentUserInDB = (state) => state.userStore.currentUserInDB;

export default userSlice.reducer;
