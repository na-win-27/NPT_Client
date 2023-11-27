import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import AddSampleForm from "../components/AddSampleForm";
import { useSelector } from "react-redux";
import Store from "../redux/store";
import { getAllCustomers } from "../redux/actions/customer.js";
import { getAllHangers } from "../redux/actions/hanger.js";
import { getAllUsers } from "../redux/actions/user.js";
import { getMaterials } from "../redux/actions/rawMaterial.js";

import { useLocation } from "react-router-dom";

const AddSample = (props) => {
  const location = useLocation();
  React.useEffect(() => {
    Store.dispatch(getAllHangers());
    Store.dispatch(getAllCustomers());
    Store.dispatch(getAllUsers());
    Store.dispatch(getMaterials());
  }, []);
  const cId = useSelector((state) => state.oppurtunity.customer);
  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Header
          title={
            location.pathname === "/editSample"
              ? "Edit Sample Info"
              : "Add a New Sample Request"
          }
        />
        <AddSampleForm
          mode={location.pathname === "/editSample" ? "Edit" : "Add"}
          initialValues={
            location.pathname === "/editSample" ? location.state.sample : false
          }
          oppurtunity={location.state ? location.state.oppurtunity : null}
          customer={cId}
        />
      </Box>
    </Box>
  );
};

export default AddSample;
