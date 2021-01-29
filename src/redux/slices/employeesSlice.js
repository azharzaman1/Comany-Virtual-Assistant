import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employeesList: [],
  },
  reducers: {
    SET_EMPLOYEES_LIST: (state, action) => {
      return {
        ...state,
        employeesList: action.payload,
      };
    },
  },
});

export const { SET_EMPLOYEES_LIST } = employeesSlice.actions;

export const selectEmployeesList = (state) =>
  state.employeesStore.employeesList;

export default employeesSlice.reducer;
