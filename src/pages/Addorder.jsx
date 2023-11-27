import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import AddOrderForm from "../components/AddOrderForm";
import { getAllHangers } from "../redux/actions/hanger.js";
import { useLocation } from "react-router";
import { getAllCustomers } from "../redux/actions/customer.js";
import {
  getMaterials,
  getHooks,
  getClips,
  getPrints,
} from "../redux/actions/rawMaterial.js";
import Store from "../redux/store";

const AddOrder = () => {
  const location = useLocation();
  React.useEffect(() => {
    Store.dispatch(getAllHangers());
    Store.dispatch(getMaterials());
    Store.dispatch(getHooks());
    Store.dispatch(getClips());
    Store.dispatch(getPrints());
    Store.dispatch(getAllCustomers());
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Header
          title={
            location.pathname === "/editOrder"
              ? "Edit Order Info"
              : "Add a New Order"
          }
        />

        <AddOrderForm
          mode={location.pathname === "/editOrder" ? "Edit" : "Add"}
          initialValues={
            location.pathname === "/editOrder" ? location.state.order : false
          }
          oppurtunity={location.state ? location.state.oppurtunity : null}
        />
      </Box>
    </Box>
  );
};

export default AddOrder;
