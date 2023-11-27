import axios from "axios";
import { server } from "../../server";


export const postRawMaterial= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "postRawMaterialRequest",
      });
      const { data } = await axios.post(`${server}/rawMaterial/create-material`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "postRawMaterialSuccess",
        payload: data.material,
      });
    } catch (error) {
      dispatch({
        type: "postRawMaterialFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getAllRawMaterials = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllRawMaterialsRequest",
      });
      const { data } = await axios.get(`${server}/rawMaterial/all-materials`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllRawMaterialsSuccess",
        payload: data.materials,
      });
    } catch (error) {
      dispatch({
        type: "getAllRawMaterialsFailed",
        payload: error.response.data.message,
      });
    }
  
  };



  export const getMaterials = () => async (dispatch) => {
    try {
      dispatch({
        type: "getMaterialsRequest",
      });
      const { data } = await axios.get(`${server}/rawMaterial/materials`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getMaterialsSuccess",
        payload: data.materials,
      });
    } catch (error) {
      dispatch({
        type: "getMaterialsFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getMaterialsByCategory = (category) => async (dispatch) => {
    try {
      dispatch({
        type: "getMaterialsByCategoryRequest",
      });
      const { data } = await axios.get(`${server}/rawMaterial/material?category=${category}`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getMaterialsByCategorySuccess",
        payload: data.materialsByCategory,
      });
    } catch (error) {
      dispatch({
        type: "getMaterialsByCategoryFailed",
        payload: error.response.data.message,
      });
    }
  
  };

  export const getHooks = () => async (dispatch) => {
    try {
      dispatch({
        type: "getHooksRequest",
      });
      const { data } = await axios.get(`${server}/rawMaterial/get-hooks`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getHooksSuccess",
        payload: data.hooks,
      });
    } catch (error) {
      dispatch({
        type: "getHooksFailed",
        payload: error.response.data.message,
      });
    }
  
  };




  export const getClips = () => async (dispatch) => {
    try {
      dispatch({
        type: "getClipsRequest",
      });
      const { data } = await axios.get(`${server}/rawMaterial/get-clips`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getClipsSuccess",
        payload: data.clips,
      });
    } catch (error) {
      dispatch({
        type: "getClipsFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getPrints = () => async (dispatch) => {
    try {
      dispatch({
        type: "getPrintsRequest",
      });
      const { data } = await axios.get(`${server}/rawMaterial/get-prints`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getPrintsSuccess",
        payload: data.prints,
      });
    } catch (error) {
      dispatch({
        type: "getPrintsFailed",
        payload: error.response.data.message,
      });
    }
  
  };