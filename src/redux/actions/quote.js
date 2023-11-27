
import axios from "axios";
import { server } from "../../server";


export const setCustomer = (id) => (dispatch) => {
    const c=id;
  dispatch({
    type: "setCustomer",
    payload: c,
  });
};



export const editQuote= (body) => async (dispatch) => {
  try {
    dispatch({
      type: "editQuoteRequest",
    });
    const { data } = await axios.put(`${server}/quote/edit-quote`, body,{
      withCredentials: true,
    });
    dispatch({
      type: "editQuoteSuccess",
      payload: data.quote,
    });
  } catch (error) {
    dispatch({
      type: "editQuoteFailed",
      payload: error.response.data.message,
    });
  }

};


export const postQuote= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "postQuoteRequest",
      });
      const { data } = await axios.post(`${server}/quote/create-quote`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "postQuoteSuccess",
        payload: data.quote,
      });
    } catch (error) {
      dispatch({
        type: "postQuoteFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const getAllQuotes = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllQuotesRequest",
      });
      const { data } = await axios.get(`${server}/quote/all-quotes`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllQuotesSuccess",
        payload: data.quotes,
      });
    } catch (error) {
      dispatch({
        type: "getAllQuotesFailed",
        payload: error.response.data.message,
      });
    }
  
  };



  export const getQuoteById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "LoadQuoteRequest",
      });
      const { data } = await axios.get(`${server}/quote/getQuote?id=${id}`, {
        withCredentials: true,
      });
      dispatch({
        type: "LoadQuoteSuccess",
        payload: data.quote,
      });
    } catch (error) {
      dispatch({
        type: "LoadQuoteFail",
        payload: error.response.data.message,
      });
    }
  };