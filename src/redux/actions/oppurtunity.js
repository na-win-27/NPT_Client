import axios from "axios";
import { server } from "../../server";

export const setCustomer = (id) => (dispatch) => {
  const c = id;
  dispatch({
    type: "setCustomer",
    payload: c,
  });
};

export const setOppurtunityId = (id) => (dispatch) => {
  const c = id;
  dispatch({
    type: "setOppurtunity",
    payload: c,
  });
};

export const postOppurtunity = (body) => async (dispatch) => {
  try {
    dispatch({
      type: "postOppurtunityRequest",
    });
    const { data } = await axios.post(
      `${server}/oppurtunity/create-oppurtunity`,
      body,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "postOppurtunitySuccess",
      payload: data.oppurtunity,
    });
  } catch (error) {
    dispatch({
      type: "postOppurtunityFailed",
      payload: error.response.data.message,
    });
  }
};

export const editOppurtunity = (body) => async (dispatch) => {
  try {
    dispatch({
      type: "editOppurtunityRequest",
    });
    const { data } = await axios.put(
      `${server}/oppurtunity/edit-oppurtunity`,
      body,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "editOppurtunitySuccess",
      payload: data.oppurtunity,
    });
  } catch (error) {
    dispatch({
      type: "editOppurtunityFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllOppurtunities = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOppurtunitiesRequest",
    });
    const { data } = await axios.get(
      `${server}/oppurtunity/all-oppurtunities`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllOppurtunitiesSuccess",
      payload: data.oppurtunities,
    });
  } catch (error) {
    dispatch({
      type: "getAllOppurtunitiesFailed",
      payload: error.response.data.message,
    });
  }
};
