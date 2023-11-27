import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import AddQuoteForm from "../components/AddQuoteForm";
import { getAllHangers } from "../redux/actions/hanger.js";
import {
  getMaterials,
  getHooks,
  getClips,
  getPrints,
} from "../redux/actions/rawMaterial.js";
import { getAllCustomers } from "../redux/actions/customer.js";
import Store from "../redux/store";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import AddQuoteFormC from "../components/AddQuoteFormC";
const AddQuote = () => {
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
            location.pathname === "/editQuote"
              ? "Edit Quotation Info"
              : "Add a New Quote"
          }
        />

        <AddQuoteFormC
          mode={location.pathname === "/editQuote" ? "Edit" : "Add"}
          initialValues={
            location.pathname === "/editQuote" ? location.state.qDetail : false
          }
          oppurtunity={location.state ? location.state.oppurtunity : null}
        />
      </Box>
    </Box>
  );
};

export default AddQuote;
