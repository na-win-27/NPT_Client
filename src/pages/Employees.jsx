import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";

import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";


const Employees = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");


  
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Employees" subtitle="Welcome to your Employees" />
      </FlexBetween>
    </Box>
  );
};

export default Employees;
