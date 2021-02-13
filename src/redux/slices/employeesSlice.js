import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employeesList: [],
    employeeToEdit: {},
    employeeToView: {},
    employeeEditMode: false,
    employeeDepartmentsList: [],
    editedEmployee: {},
  },
  reducers: {
    setEmployeesList: (state, action) => {
      return {
        ...state,
        employeesList: action.payload,
      };
    },
    setEmployeeToEdit: (state, action) => {
      return {
        ...state,
        employeeToEdit: action.payload,
      };
    },
    setEmployeeToView: (state, action) => {
      return {
        ...state,
        employeeToView: action.payload,
      };
    },
    setEmployeeEditMode: (state, action) => {
      return {
        ...state,
        employeeEditMode: action.payload,
      };
    },
    setEmployeeDepartments: (state, action) => {
      return {
        ...state,
        employeeDepartmentsList: action.payload,
      };
    },
    expandDepartmentsList: (state, action) => {
      return {
        ...state,
        employeeDepartmentsList: [
          ...state.employeeDepartmentsList,
          action.payload,
        ],
      };
    },
    setEditedEmployee: (state, action) => {
      return {
        ...state,
        editedEmployee: action.payload,
      };
    },
  },
});

export const {
  setEmployeesList,
  setEmployeeEditMode,
  setEmployeeToEdit,
  setEmployeeDepartments,
  expandDepartmentsList,
  setEditedEmployee,
  setEmployeeToView,
} = employeesSlice.actions;

export const selectEmployeesList = (state) =>
  state.employeesStore.employeesList;
export const selectEmployeeToEdit = (state) =>
  state.employeesStore.employeeToEdit;
export const selectEmployeeToView = (state) =>
  state.employeesStore.employeeToView;
export const selectEmployeeEditMode = (state) =>
  state.employeesStore.employeeEditMode;
export const selectEmployeeDepartments = (state) =>
  state.employeesStore.employeeDepartmentsList;
export const selectEditedEmployee = (state) =>
  state.employeesStore.editedEmployee;

export default employeesSlice.reducer;
