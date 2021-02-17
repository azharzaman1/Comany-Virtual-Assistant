import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addEmployeePopupState: false,
  employeeDetailedViewState: false,
  loadingState: false,
  shrinkSidebar: false,
  activeSectionIndex: 0,
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
    setShrinkSideBar: (state, action) => {
      return {
        ...state,
        shrinkSidebar: action.payload,
      };
    },
    setActiveSectionI: (state, action) => {
      return {
        ...state,
        activeSectionIndex: action.payload,
      };
    },
  },
});

export const {
  addNewEmployeePopup,
  viewEmployeePopup,
  setLoading,
  setShrinkSideBar,
  setFetchUserDetails,
  setActiveSectionI,
} = generalSlice.actions;

export const selectAddEmployeePopupState = (state) =>
  state.generalStore.addEmployeePopupState;
export const selectEmployeeDetailedViewState = (state) =>
  state.generalStore.employeeDetailedViewState;
export const selectLoadingState = (state) => state.generalStore.loadingState;
export const selectSidebarState = (state) => state.generalStore.shrinkSidebar;
export const selectFetchUserDetails = (state) =>
  state.generalStore.fetchUserDetails;
export const selectActiveSectionIndex = (state) =>
  state.generalStore.activeSectionIndex;

export default generalSlice.reducer;
