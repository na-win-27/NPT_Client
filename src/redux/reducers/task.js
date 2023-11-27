import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const taskReducer = createReducer(initialState, {

    postTaskRequest: (state) => {
        state.taskLoading = true;
      },
    
      postTaskSuccess: (state,action) => {
        state.taskLoading = false;
      },
      postTaskFailed: (state,action) => {
        state.taskLoading = false;
        state.error = action.payload;
      },


      getAllTaskByDateRequest: (state) => {
        state.taskLoading = true;
      },
    
      getAllTaskByDateSuccess: (state,action) => {
        state.taskLoading = false;
        state.tasks=action.payload;
      },
      getAllTaskByDateFailed: (state,action) => {
        state.taskLoading = false;
        state.error = action.payload;
      },
})