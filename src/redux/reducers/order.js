import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const orderReducer = createReducer(initialState, {
    setCustomer: (state, action) => {
    state.customer = action.payload;
  },

  postOrderRequest: (state) => {
    state.orderLoading = true;
  },

  postOrderSuccess: (state,action) => {
    state.orderLoading = false;
    state.order=action.payload
  },
  postOrderFailed: (state,action) => {
    state.orderLoading = false;
    state.error = action.payload;
  },



  editOrderRequest: (state) => {
    state.orderLoading = true;
  },

  editOrderSuccess: (state,action) => {
    state.orderLoading = false;
    state.order=action.payload
  },
  editOrderFailed: (state,action) => {
    state.orderLoading = false;
    state.error = action.payload;
  },


  getAllOrdersRequest: (state) => {
    state.orderLoading = true;
  },

  getAllOrdersSuccess: (state,action) => {
    state.orderLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersFailed: (state,action) => {
    state.orderLoading = false;
    state.error = action.payload;
  },





  getOrderRequest: (state) => {
    state.orderLoading = true;
  },

  getOrderSuccess: (state,action) => {
    state.orderLoading = false;
    state.order= action.payload;
  },
  getOrderFailed: (state,action) => {
    state.orderLoading = false;
    state.error = action.payload;
  },
});
