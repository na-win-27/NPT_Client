import axios from "axios";
import { server } from "../../server";


export const addCustomer = (body) => async (dispatch) => {
  try {
    dispatch({
      type: "AddCustomerRequest",
    });
    const { data } = await axios.post(`${server}/customer/create-customer`, body,{
      withCredentials: true,
    });
    dispatch({
      type: "AddCustomerSuccess",
      payload: data.customer,
    });
  } catch (error) {
    dispatch({
      type: "AddCustomerFailed",
      payload: error.response.data.message,
    });
  }
};

export const editCustomer = (body) => async (dispatch) => {
  try {
    dispatch({
      type: "EditCustomerRequest",
    });
    
    const { data } = await axios.put(`${server}/customer/edit-customer`, body,{
      withCredentials: true,
    });
    dispatch({
      type: "EditCustomerSuccess",
      payload: data.customer,
    });
  } catch (error) {
    dispatch({
      type: "EditCustomerFailed",
      payload: error.response.data.message,
    });
  }
};


export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteCustomerRequest",
    });
    const { data } = await axios.delete(`${server}/customer/delete-customer?id=${id}`,{
      withCredentials: true,
    });
    dispatch({
      type: "DeleteCustomerSuccess",
      payload: data.customer,
    });
  } catch (error) {
    dispatch({
      type: "DeleteCustomerFailed",
      payload: error.response.data.message,
    });
  }
};



export const setCustomerId = (id) => async (dispatch) => {

  
    dispatch({
      type: "setCustomerDetailId",
      payload: id,
    });

};


export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCustomersRequest",
    });
    const { data } = await axios.get(`${server}/customer/all-customers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllCustomersSuccess",
      payload: data.customers,
    });
  } catch (error) {
    dispatch({
      type: "getAllCustomersFailed",
      payload: error.response.data.message,
    });
  }

};


export const getCustomerDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getCustomerRequest",
    });
    const { data } = await axios.get(`${server}/customer/customerDetail?id=${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getCustomerSuccess",
      payload: data.customer,
    });
  } catch (error) {
    dispatch({
      type: "getCustomerFailed",
      payload: error.response.data.message,
    });
  }
};