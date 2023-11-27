import axios from "axios";
import { server } from "../../server";

export const postTask = (body) => async (dispatch) => {
  try {
    dispatch({
      type: "postTaskRequest",
    });
    const { data } = await axios.post(`${server}/task/create-task`, body, {
      withCredentials: true,
    });
    dispatch({
      type: "postTaskSuccess",
      payload: data.todo,
    });
  } catch (error) {
    dispatch({
      type: "postTaskFailed",
      payload: error.response.data.message,
    });
  }
};

export const postComment = (par) => async (dispatch) => {
  try {
    
    dispatch({
      type: "postCommentRequest",
    });
    const body={comment: par.comment,user:par.user};
    const { data } = await axios.post(`${server}/task/addComment`, body, {
      withCredentials: true,
      params: { id: par.id },
    });
    dispatch({
      type: "postCommentSuccess",
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: "ppostCommentFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllTasksRequest",
    });
    const { data } = await axios.get(`${server}/task/all-tasks`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllTasksSuccess",
      payload: data.tasks,
    });
  } catch (error) {
    dispatch({
      type: "getAllTasksFailed",
      payload: error.response.data.message,
    });
  }
};

export const markAsClosed = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "markAsClosedRequest",
      });
      const { data } = await axios.get(`${server}/task/mark-closed`, {
        withCredentials: true,
        params:{
            id:id
        }
      });
  
      dispatch({
        type: "markAsClosedSuccess",
        payload: data.task,
      });
    } catch (error) {
      dispatch({
        type: "markAsClosedFailed",
        payload: error.response.data.message,
      });
    }
  };

export const getTaskByDate = (date) => async (dispatch) => {
  try {
    console.log(date);
    dispatch({
      type: "getAllTaskByDateRequest",
    });
    const { data } = await axios.get(`${server}/task/task-by-date`, {
      params: {
        date: date,
      },
      withCredentials: true,
    });

    dispatch({
      type: "getAllTaskByDateSuccess",
      payload: data.tasks,
    });
  } catch (error) {
    dispatch({
      type: "getAllTaskByDateFailed",
      payload: error.response.data.message,
    });
  }
};
