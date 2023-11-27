import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hangers:[]
};

export const hangerReducer = createReducer(initialState, {
 
 
  // get all users --- admin
  getAllHangersRequest: (state) => {
    state.hangersLoading = true;
  },

  getAllHangersSuccess: (state,action) => {
    state.hangersLoading = false;
    state.hangers = action.payload;
  },
  getAllHangersFailed: (state,action) => {
    state.hangersLoading = false;
    state.error = action.payload;
  },


  getHangersRequest: (state) => {
    state.hangersLoading = true;
  },

  getHangersSuccess: (state,action) => {
    state.hangersLoading = false;
    state.hangersByCategory = action.payload;
  },
  getHangersFailed: (state,action) => {
    state.hangersLoading = false;
    state.error = action.payload;
  },



  postHangerRequest: (state) => {
    state.hangersLoading = true;
  },

  postHangerSuccess: (state,action) => {
    state.hangersLoading = false;
  },
  postHangerFailed: (state,action) => {
    state.hangersLoading = false;
    state.error = action.payload;
  },
});