import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import AddCustomerForm from "../components/AddCustomerFormC";
import { getAllUsers } from "../redux/actions/user.js";
import Store from "../redux/store";

const AddCustomer = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    Store.dispatch(getAllUsers());
  }, []);
  const location = useLocation();
  
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Header
          title={
            location.pathname === "/editCustomer"
              ? "Edit Customer Info"
              : "Add a New Customer"
          }
        />
        <AddCustomerForm
          mode={location.pathname === "/editCustomer" ? "Edit" : "Add"}
          initialValues={
            location.pathname === "/editCustomer"
              ? location.state.customerDetail
              : false
          }
        />
      </Box>
    </Box>
  );
};

export default AddCustomer;
