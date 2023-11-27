import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import AddOppurtunityForm from "../components/AddOppurtunityForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const AddOppurtunity = () => {
  const location = useLocation();

  const cId = location.state.customer ? location.state.customer : {};

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Header
          title={
            location.pathname === "/editOppurtunity"
              ? "Edit  Info"
              : "Add a New Oppurtunity"
          }
        />
        <AddOppurtunityForm
          customer={cId}
          mode={location.pathname === "/editOppurtunity" ? "Edit" : "Add"}
          initialValues={
            location.pathname === "/editOppurtunity"
              ? location.state.oppurtunityDetail
              : false
          }
        />
      </Box>
    </Box>
  );
};

export default AddOppurtunity;
