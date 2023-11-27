import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const sampleReducer = createReducer(initialState, {
    setCustomer: (state, action) => {
    state.customer = action.payload;
  },

  postJobRequest: (state) => {
    state.jobLoading = true;
  },

  postJobSuccess: (state,action) => {
    state.jobLoading = false;
  },
  postJobFailed: (state,action) => {
    state.jobLoading = false;
    state.error = action.payload;
  },

  getAllJobsRequest: (state) => {
    state.jobLoading = true;
  },

  getAllJobsSuccess: (state,action) => {
    state.jobLoading = false;
    state.jobs = action.payload;
  },
  getAllJobsFailed: (state,action) => {
    state.jobLoading = false;
    state.error = action.payload;
  },
});
