import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const quoteReducer = createReducer(initialState, {
    setCustomer: (state, action) => {
    state.customer = action.payload;
  },

  postQuoteRequest: (state) => {
    state.quoteLoading = true;
  },

  postQuoteSuccess: (state,action) => {
    state.quoteLoading = false;
    state.quote=action.payload
  },
  postQuoteFailed: (state,action) => {
    state.quoteLoading = false;
    state.error = action.payload;
  },



  editQuoteRequest: (state) => {
    state.quoteLoading = true;
  },

  editQuoteSuccess: (state,action) => {
    state.quoteLoading = false;
    state.quote=action.payload
  },
  editQuoteFailed: (state,action) => {
    state.quoteLoading = false;
    state.error = action.payload;
  },



  getAllQuotesRequest: (state) => {
    state.quoteLoading = true;
  },

  getAllQuotesSuccess: (state,action) => {
    state.quoteLoading = false;
    state.quotes = action.payload;
  },
  getAllQuotesFailed: (state,action) => {
    state.quoteLoading = false;
    state.error = action.payload;
  },
  LoadQuoteRequest: (state) => {
    state.quoteLoading = true;
  },

  LoadQuoteSuccess: (state,action) => {
    state.quoteLoading = false;
    state.quote = action.payload;
  },
  LoadQuoteFail: (state,action) => {
    state.quoteLoading = false;
    state.error = action.payload;
  },
});
