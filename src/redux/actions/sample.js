
import axios from "axios";
import { server } from "../../server";


export const setCustomer = (id) => (dispatch) => {
    const c=id;
  dispatch({
    type: "setCustomer",
    payload: c,
  });
};




export const postSample= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "postSampleRequest",
      });
      const { data } = await axios.post(`${server}/sample/create-sample`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "postSampleSuccess",
        payload: data.sample,
      });
    } catch (error) {
      dispatch({
        type: "postSampleFailed",
        payload: error.response.data.message,
      });
    }
  
  };



  export const editSample= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "editSampleRequest",
      });
      const { data } = await axios.post(`${server}/sample/edit-sample`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "editSampleSuccess",
        payload: data.sample,
      });
    } catch (error) {
      dispatch({
        type: "editSampleFailed",
        payload: error.response.data.message,
      });
    }
  
  };






  export const getAllSamples = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllSamplesRequest",
      });
      const { data } = await axios.get(`${server}/sample/all-samples`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllSamplesSuccess",
        payload: data.samples,
      });
    } catch (error) {
      dispatch({
        type: "getAllSamplesFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getSampleById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "LoadSampleRequest",
      });
      const { data } = await axios.get(`${server}/sample/getsample?id=${id}`, {
        withCredentials: true,
      });
      dispatch({
        type: "LoadSampleSuccess",
        payload: data.sample,
      });
    } catch (error) {
      dispatch({
        type: "LoadSampleFail",
        payload: error.response.data.message,
      });
    }
  };


  export const sampleDelivered = ({id,body}) => async (dispatch) => {
    try {
      dispatch({
        type: "sampleDeliveredRequest",
      });
      const { data } = await axios.post(`${server}/sample/sampleDelivered?id=${id}`,body, {
        withCredentials: true,
      });
      dispatch({
        type: "sampleDeliveredSuccess",
        payload: data.sample,
      });
    } catch (error) {
      dispatch({
        type: "sampleDeliveredFail",
        payload: error.response.data.message,
      });
    }
  };