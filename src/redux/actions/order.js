 
import axios from "axios";
import { server } from "../../server";


export const setCustomer = (id) => (dispatch) => {
    const c=id;
  dispatch({
    type: "setCustomer",
    payload: c,
  });
};




export const postOrder= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "postOrderRequest",
      });
      const { data } = await axios.post(`${server}/order/create-order`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "postOrderSuccess",
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: "postOrderFailed",
        payload: error.response.data.message,
      });
    }
  
  };


  export const editOrder= (body) => async (dispatch) => {
    try {
      dispatch({
        type: "editOrderRequest",
      });
      const { data } = await axios.put(`${server}/order/edit-order`, body,{
        withCredentials: true,
      });
      dispatch({
        type: "editOrderSuccess",
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: "editOrderFailed",
        payload: error.response.data.message,
      });
    }
  
  };



  export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllOrdersRequest",
      });
      const { data } = await axios.get(`${server}/order/all-orders`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getAllOrdersSuccess",
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: "getAllOrdersFailed",
        payload: error.response.data.message,
      });
    }
  
  };



  export const getOrderById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getOrderRequest",
      });
      const { data } = await axios.get(`${server}/order/order?id=${id}`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "getOrderSuccess",
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: "getOrderFailed",
        payload: error.response.data.message,
      });
    }
  
  };