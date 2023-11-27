import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import Store from "../redux/store.js";
import { postComment, markAsClosed } from "../redux/actions/task";

function Row(props) {
  const user = useSelector((state) => state.user.user);
  const theme = useTheme();
  const { row } = props;
  console.log(row)
  const [open, setOpen] = React.useState(false);
  const [comment, setcomment] = React.useState();
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor:
            row.status === "done"
              ? theme.palette.primary[100]
              : theme.palette.secondary[100],
        }}
      >
        <TableCell component="th" scope="row">
          {row.task}
        </TableCell>

        <TableCell align="center">{row.addedBy.name}</TableCell>

        <TableCell align="center">
          <TextField
            disabled={row.status === "done"}
            size="small"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            placeholder="Enter Comments"
          />
          <Button
            disabled={row.status === "done"}
            onClick={() => {
              if (comment == null) {
                alert("Enter Comment before processing");
              } else {
                Store.dispatch(
                  postComment({ comment: comment, user: user._id, id: row._id })
                );
              }
            }}
            variant="outlined"
            style={{ marginLeft: 5, marginTop: 4 }}
            size="small"
          >
            Add Comment
          </Button>
        </TableCell>
        <TableCell>
        {!(row.status==="done")?(
          <Button
            variant="outlined"
            disabled={row.status === "done"}
            onClick={() =>{
             
              Store.dispatch(markAsClosed(row._id))}}
            size="small"
          >
            Mark As Done
          </Button>):(<Typography>
            {row.closedBy.name} Has Closed it
            </Typography>)
            }
        </TableCell>

        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Comment
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="right">Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.comment.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell>{historyRow.user.name}</TableCell>
                      <TableCell align="right">{historyRow.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TasksBody = () => {
  const data = useSelector((state) => state.task.tasks);
  console.log(data);
  return data != null ? (
    <Box
      padding="15px"
      margin="20px"
      overflowY="scroll"
      height="100%"
      border="3px solid"
      borderColor="teal"
      borderRadius="5px"
    >
      <Header subtitle="List Of Tasks on :" />

      <Box marginTop="20px">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Task</TableCell>

                <TableCell align="center">Added By</TableCell>

                <TableCell align="center">Comment</TableCell>

                <TableCell align="center">Mark as Closed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <Row key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  ) : null;
};

export default TasksBody;
