import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  materials:[],
  material:[],
};

export const rawMaterialReducer = createReducer(initialState, {
 
  postRawMaterialRequest: (state) => {
    state.materialsLoading = true;
  },

  postRawMaterialSuccess: (state,action) => {
    state.materialsLoading = false;
  },
  postRawMaterialFailed: (state,action) => {
    state.materialsLoading = false;
    state.error = action.payload;
  },

  getAllRawMaterialsRequest: (state) => {
    state.materialsLoading = true;
  },

  getAllRawMaterialsSuccess: (state,action) => {
    state.materialsLoading = false;
    state.materials = action.payload;
  },
  getAllRawMaterialsFailed: (state,action) => {
    state.materialsLoading = false;
    state.error = action.payload;
  },





  getMaterialsRequest: (state) => {
    state.materialsLoading = true;
  },

  getMaterialsSuccess: (state,action) => {
    state.materialsLoading = false;
    state.material = action.payload;
  },
  getMaterialsFailed: (state,action) => {
    state.materialsLoading = false;
    state.error = action.payload;
  },



  getHooksRequest: (state) => {
    state.hooksLoading = true;
  },

  getHooksSuccess: (state,action) => {
    state.hooksLoading = false;
    state.hooks = action.payload;
  },
  getHooksFailed: (state,action) => {
    state.hooksLoading = false;
    state.error = action.payload;
  },



  getClipsRequest: (state) => {
    state.clipsLoading = true;
  },

  getClipsSuccess: (state,action) => {
    state.clipsLoading = false;
    state.clips = action.payload;
  },
  getClipsFailed: (state,action) => {
    state.clipsLoading = false;
    state.error = action.payload;
  },



  getPrintsRequest: (state) => {
    state.printsLoading = true;
  },

  getPrintsSuccess: (state,action) => {
    state.printsLoading = false;
    state.prints = action.payload;
  },
  getPrintsFailed: (state,action) => {
    state.printsLoading = false;
    state.error = action.payload;
  },




  getMaterialsByCategoryRequest: (state) => {
    state.materialsLoading = true;
  },

  getMaterialsByCategorySuccess: (state,action) => {
    state.materialsLoading = false;
    state.materialsByCategory = action.payload;
  },
  getMaterialsByCategoryFailed: (state,action) => {
    state.materialsLoading = false;
    state.error = action.payload;
  },

});