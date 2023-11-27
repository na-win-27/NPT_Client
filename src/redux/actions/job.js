
import axios from "axios";
import { server } from "../../server";


export const setCustomer = (id) => (dispatch) => {
    const c=id;
  dispatch({
    type: "setCustomer",
    payload: c,
  });
};


export const postJob= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "postJobRequest",
      });
      const { data } = await axios.post(`${server}/job/create-job`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "postJobSuccess",
        payload: data.job,
      });
    } catch (error) {
      dispatch({
        type: "postJobFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getAllJobs = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllJobsRequest",
      });
      const { data } = await axios.get(`${server}/job/all-jobs`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllJobsSuccess",
        payload: data.jobs,
      });
    } catch (error) {
      dispatch({
        type: "getAllJobsFailed",
        payload: error.response.data.message,
      });
    }
  
  };