import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addEmployeePopupState: false,
  employeeDetailedViewState: false,
  loadingState: true,
};

const generalSlice = createSlice({
  name: "sliceName",
  initialState,
  reducers: {
    SET_ADD_EMPLOYEE_POPUP: (state, action) => {
      return {
        ...state,
        addEmployeePopupState: action.payload,
      };
    },
    SET_VIEW_EMPLOYEE_POPUP: (state, action) => {
      return {
        ...state,
        employeeDetailedViewState: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loadingState: action.payload,
      };
    },
  },
});

export const {
  SET_ADD_EMPLOYEE_POPUP,
  SET_VIEW_EMPLOYEE_POPUP,
  setLoading,
} = generalSlice.actions;

export const selectAddEmployeePopupState = (state) =>
  state.generalStore.addEmployeePopupState;
export const selectEmployeeDetailedViewState = (state) =>
  state.generalStore.employeeDetailedViewState;
export const selectLoadingState = (state) => state.generalStore.loadingState;

export default generalSlice.reducer;
