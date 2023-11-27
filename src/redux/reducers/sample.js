import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const sampleReducer = createReducer(initialState, {
    setCustomer: (state, action) => {
    state.customer = action.payload;
  },

  postSampleRequest: (state) => {
    state.sampleLoading = true;
  },

  postSampleSuccess: (state,action) => {
    state.sampleLoading = false;
    state.sample=action.payload
  },
  postSampleFailed: (state,action) => {
    state.sampleLoading = false;
    state.error = action.payload;
  },


  editSampleRequest: (state) => {
    state.sampleLoading = true;
  },

  editSampleSuccess: (state,action) => {
    state.sampleLoading = false;
    state.sample=action.payload
  },
  editSampleFailed: (state,action) => {
    state.sampleLoading = false;
    state.error = action.payload;
  },


  getAllSamplesRequest: (state) => {
    state.sampleLoading = true;
  },

  getAllSamplesSuccess: (state,action) => {
    state.sampleLoading = false;
    state.samples = action.payload;
  },
  getAllSamplesFailed: (state,action) => {
    state.sampleLoading = false;
    state.error = action.payload;
  },


   LoadSampleRequest: (state) => {
    state.sampleLoading = true;
  },

  LoadSampleSuccess: (state,action) => {
    state.sampleLoading = false;
    state.sample = action.payload;
  },
  LoadSampleFail: (state,action) => {
    state.sampleLoading = false;
    state.error = action.payload;
  },




  sampleDeliveredRequest: (state) => {
    state.sampleLoading = true;
  },

  sampleDeliveredSuccess: (state,action) => {
    state.sampleLoading = false;
  },
  sampleDeliveredFail: (state,action) => {
    state.sampleLoading = false;
    state.error = action.payload;
  }
});
