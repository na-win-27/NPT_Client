import React, { useState } from "react";
import Store from "../redux/store";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Header from "../components/Header";
import dayjs from "dayjs";
import FlexBetween from "../components/FlexBetween";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/system";

import { getTaskByDate } from "../redux/actions/task";

import AddTaskForm from "../components/AddTaskForm";
import TasksBody from "../components/TasksBody";

const Tasks = () => {
  const [date, setdate] = useState(dayjs(Date(Date.now())));
  React.useEffect(() => {
    Store.dispatch(getTaskByDate(date));
  });

  const [modalOpen, setmodalOpen] = useState(false);
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setmodalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "lightgrey",
            border: "2px solid gray",
            p: 4,
          }}
        >
          <Header title="Add Task" />
          <AddTaskForm done={() => setmodalOpen(false)} />
        </Box>
      </Modal>
      <FlexBetween>
        <Header title="Tasks" />
        <Button onClick={() => setmodalOpen(true)}>Add Task</Button>
      </FlexBetween>

      <Box display="flex" margin="20px" flexDirection="column">
        <Box display="flex" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="DD-MM-YYYY"
                value={date}
                onChange={(newValue) => setdate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button onClick={() => Store.dispatch(getTaskByDate(date))}>
            Filter By Date
          </Button>
        </Box>
        <TasksBody />
      </Box>
    </>
  );
};

export default Tasks;
