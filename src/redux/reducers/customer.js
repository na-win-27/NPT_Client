import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  customers:[]
};

export const customerReducer = createReducer(initialState, {
 


  AddCustomerRequest: (state) => {
    state.customersLoading = true;
  },

  AddCustomerSuccess: (state,action) => {
    state.customersLoading = false;
    state.customer = action.payload;
  },
  AddCustomerFailed: (state,action) => {
    state.customersLoading = false;
    state.error = action.payload;
  },
 
  EditCustomerRequest: (state) => {
    state.customersLoading = true;
  },

  EditCustomerSuccess: (state,action) => {
    state.customersLoading = false;
    state.customer = action.payload;
  },
  EditCustomerFailed: (state,action) => {
    state.customersLoading = false;
    state.error = action.payload;
  },


  DeleteCustomerRequest: (state) => {
    state.customersLoading = true;
  },

  DeleteCustomerSuccess: (state,action) => {
    state.customersLoading = false;
    state.customer = action.payload;
  },
  DeleteCustomerFailed: (state,action) => {
    state.customersLoading = false;
    state.error = action.payload;
  },
 
  // get all users --- admin
  getAllCustomersRequest: (state) => {
    state.customersLoading = true;
  },

  getAllCustomersSuccess: (state,action) => {
    state.customersLoading = false;
    state.customers = action.payload;
  },
  getAllCustomersFailed: (state,action) => {
    state.customersLoading = false;
    state.error = action.payload;
  },


  getCustomerRequest: (state) => {
    state.customersLoading = true;
  },

  getCustomerSuccess: (state,action) => {
    state.customerLoading = false;
    state.customerDetail= action.payload;
  },
  getCustomerFailed: (state,action) => {
    state.customerLoading = false;
    state.error = action.payload;
  },

  setCustomerDetailId: (state,action) => {
    state.customerDetailId=action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});