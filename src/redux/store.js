import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeesSlice";
import userReducer from "./slices/userSlice";
import generalReducer from "./slices/generalSlice";

export default configureStore({
  reducer: {
    generalStore: generalReducer,
    userStore: userReducer,
    employeesStore: employeesReducer,
  },
});
