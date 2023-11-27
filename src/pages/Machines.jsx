import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";

import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";


const Machines = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");


  
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Machines" subtitle="Welcome to your Machines" />
      </FlexBetween>
    </Box>
  );
};

export default Machines;
