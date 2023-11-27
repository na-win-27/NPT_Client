import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  users:[]
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogOutRequest: (state) => {
    state.loading = true;
  },
  LogOutSucess: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.user ={};
  },
  LogOutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },


  // get all users 
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state,action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  getAllUsersFailed: (state,action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});