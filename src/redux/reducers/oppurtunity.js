import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const oppurtunityReducer = createReducer(initialState, {
  setOppurtunity: (state, action) => {
    state.oppurtunity = action.payload;
  },
  setCustomer: (state, action) => {
    state.customer = action.payload;
  },
  postOppurtunityRequest: (state) => {
    state.opurtunityLoading = true;
  },


  

  postOppurtunitySuccess: (state,action) => {
    state.opurtunityLoading = false;
    state.oppurtunity = action.payload;
  },
  postOppurtunityFailed: (state,action) => {
    state.opurtunityLoading = false;
    state.error = action.payload;
  },



  editOppurtunityRequest: (state) => {
    state.opurtunityLoading = true;
  },


  

  editOppurtunitySuccess: (state,action) => {
    state.opurtunityLoading = false;
    state.oppurtunity = action.payload;
  },
  editOppurtunityFailed: (state,action) => {
    state.opurtunityLoading = false;
    state.error = action.payload;
  },

  getAllOppurtunitiesRequest: (state) => {
    state.opurtunityLoading = true;
  },

  getAllOppurtunitiesSuccess: (state,action) => {
    state.opurtunityLoading = false;
    state.oppurtunities = action.payload;
  },
  getAllOppurtunitiesFailed: (state,action) => {
    state.opurtunityLoading = false;
    state.error = action.payload;
  },
});
