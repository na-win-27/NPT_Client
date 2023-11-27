import axios from "axios";
import { server } from "../../server";


export const postHanger= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "postHangesRequest",
      });
      const { data } = await axios.post(`${server}/hanger/create-hanger`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "postHangerSuccess",
        payload: data.hanger,
      });
    } catch (error) {
      dispatch({
        type: "postHangerFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getAllHangers = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllHangersRequest",
      });
      const { data } = await axios.get(`${server}/hanger/all-hangers`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllHangersSuccess",
        payload: data.hangers,
      });
    } catch (error) {
      dispatch({
        type: "getAllHangersFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getHangerByCategory = (category) => async (dispatch) => {
    try {
      dispatch({
        type: "getHangersRequest",
      });
      const { data } = await axios.get(`${server}/hanger/getHangerByCategory?category=${category}`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getHangersSuccess",
        payload: data.hangers,
      });
    } catch (error) {
      dispatch({
        type: "getHangersFailed",
        payload: error.response.data.message,
      });
    }
  
  };