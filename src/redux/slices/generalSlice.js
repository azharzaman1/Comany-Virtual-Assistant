import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addEmployeePopupState: false,
  employeeDetailedViewState: false,
  loadingState: false,
};

const generalSlice = createSlice({
  name: "sliceName",
  initialState,
  reducers: {
    addNewEmployeePopup: (state, action) => {
      return {
        ...state,
        addEmployeePopupState: action.payload,
      };
    },
    viewEmployeePopup: (state, action) => {
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
  addNewEmployeePopup,
  viewEmployeePopup,
  setLoading,
} = generalSlice.actions;

export const selectAddEmployeePopupState = (state) =>
  state.generalStore.addEmployeePopupState;
export const selectEmployeeDetailedViewState = (state) =>
  state.generalStore.employeeDetailedViewState;
export const selectLoadingState = (state) => state.generalStore.loadingState;

export default generalSlice.reducer;
