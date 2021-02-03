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
    SET_EMPLOYEES_LIST: (state, action) => {
      return {
        ...state,
        employeesList: action.payload,
      };
    },
    SET_EMPLOYEE_TO_EDIT: (state, action) => {
      return {
        ...state,
        employeeToEdit: action.payload,
      };
    },
    SET_EMPLOYEE_TO_VIEW: (state, action) => {
      return {
        ...state,
        employeeToView: action.payload,
      };
    },
    SET_EMPLOYEE_EDIT_MODE: (state, action) => {
      return {
        ...state,
        employeeEditMode: action.payload,
      };
    },
    SET_EMPLOYEE_DEPARTMENTS_LIST: (state, action) => {
      return {
        ...state,
        employeeDepartmentsList: action.payload,
      };
    },
    EXPAND_EMPLOYEE_DEPARTMENTS_LIST: (state, action) => {
      return {
        ...state,
        employeeDepartmentsList: [
          ...state.employeeDepartmentsList,
          action.payload,
        ],
      };
    },
    SET_EDITED_EMPLOYEE: (state, action) => {
      return {
        ...state,
        editedEmployee: action.payload,
      };
    },
  },
});

export const {
  SET_EMPLOYEES_LIST,
  SET_EMPLOYEE_EDIT_MODE,
  SET_EMPLOYEE_TO_EDIT,
  SET_EMPLOYEE_DEPARTMENTS_LIST,
  EXPAND_EMPLOYEE_DEPARTMENTS_LIST,
  SET_EDITED_EMPLOYEE,
  SET_EMPLOYEE_TO_VIEW,
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
