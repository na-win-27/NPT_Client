import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Store from "../redux/store.js";
import { postTask } from "../redux/actions/task.js";


const AddTaskForm = (props) => {
  const user = useSelector((state) => state.user.user);
  const [state, setstate] = React.useState();

  return (
    <>
      <TextField
        value={state}
        placeholder="Add a task"
        onChange={(e) => setstate(e.target.value)}
      />
      <Button
        style={{ marginTop: 10, width: 100 }}
        variant="contained"
        onClick={() => {
          props.done();
          Store.dispatch(
            postTask({
              task: state,
              date: Date(Date.now()).toString(),
              addedBy: user._id,
            })
          );
        }}
      >
        Confirm
      </Button>
    </>
  );
};

export default AddTaskForm;
