import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeesSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    employeesStore: employeesReducer,
    userStore: userReducer,
  },
});
